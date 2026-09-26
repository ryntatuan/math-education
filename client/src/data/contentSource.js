import { supabase, isSupabaseConfigured } from "../services/supabaseClient";
import { grade1Data } from "./grade1Data.js";
import { grade2Data } from "./grade2Data.js";
import { grade3Data } from "./grade3Data.js";
import { grade4Data } from "./grade4Data.js";
import { grade5Data } from "./grade5Data.js";
import { cayHopLe, demCay, dungCay } from "./dungCayNoiDung.js";
import { stripTextbookRefsInTree } from "../utils/stripTextbookRefs.js";

/**
 * Nguồn nội dung bài học — Giai đoạn 3, lát 3d.
 *
 * Thứ tự ưu tiên, và vì sao:
 *   1. `localStorage` (đọc ĐỒNG BỘ lúc nạp module) — app mở được ngay, offline vẫn có
 *      nội dung mới nhất đã tải lần trước. Cùng cách `rewardService` đang làm.
 *   2. DB (nếu `content_source = "remote"`) — tải ở nền rồi thay vào.
 *   3. File tĩnh trong bundle — lưới an toàn CUỐI CÙNG, luôn có sẵn.
 *
 * ══════════════════════════════════════════════════════════════════════════════
 * 🔴 QUYẾT ĐỊNH — ĐỔI NGUỒN NHƯNG KHÔNG "ĐỔI NÓNG" GIỮA PHIÊN
 *
 * Cây mới được ghi vào biến trong bộ nhớ, KHÔNG phát sự kiện để React render lại.
 * Nghĩa là nó có hiệu lực ở lần ĐỌC KẾ SAU (bé đi sang bài khác, hoặc mở lại app).
 *
 * Vì sao không đổi nóng: nếu đang trong bài mà cây đổi, cách duy nhất để React đọc
 * lại là **tháo ra dựng lại** cây giao diện (đổi `key`). Bé đang học dở **bị đẩy về
 * slide 1** — giữa bài, vì một thao tác của admin mà bé không biết. Đổi lấy việc
 * "nội dung mới xuất hiện sớm hơn vài phút" là không đáng.
 *
 * Muốn nội dung mới ngay thì mở lại app — `content_version` đã tăng nên lần mở sau
 * sẽ thấy nội dung mới. Chính xác hơn về mặt kỹ thuật và không hại trải nghiệm.
 * ══════════════════════════════════════════════════════════════════════════════
 *
 * 🔴 VÌ SAO KHÔNG DÙNG CHUNG FILE VỚI `curriculum.js`: `curriculum.js` là chỗ công
 * khai hàm tra cứu cho cả app. Trộn phần tải mạng vào đó là để mọi màn hình kéo theo
 * cả tầng mạng khi chỉ cần đọc dữ liệu. Tách ra thì `curriculum.js` không có phụ
 * thuộc nào, còn chỗ nào cần tải thì tự gọi.
 */

const TINH = [grade1Data, grade2Data, grade3Data, grade4Data, grade5Data];
const CACHE_KEY = "toan-vui-content";

/**
 * 🔴 CHẾ ĐỘ DEV — MÁY DEV LUÔN DÙNG DỮ LIỆU TRONG REPO (`npm run dev`).
 *
 * VÌ SAO CẦN: máy dev đang bật `content_source = "remote"` trong DB (bản các bé đang
 * dùng), nên khi thử bài vừa sửa thì app **lấy cây từ DB (bản CŨ) và thay vào ngay sau
 * khung hình đầu** — người sửa tưởng mã không ăn, hoặc tệ hơn là "sửa xong mà app không
 * đổi". Muốn thử đúng thì phải đi chặn request + xoá cache bằng tay, rất dễ quên.
 *
 * NAY: ở `DEV`, nội dung LUÔN lấy từ file tĩnh trong repo ⇒ **sửa file là thấy ngay**.
 * Muốn thử lại luồng tải từ DB ngay trên máy dev thì đặt cờ:
 *     localStorage.setItem("toan-vui-nguon", "db")
 * (xoá cờ ⇒ quay về file tĩnh).
 *
 * ⚠️ `import.meta.env.DEV` = `false` khi build production ⇒ **bản chạy thật của các bé
 * KHÔNG bị ảnh hưởng gì** — đây là lý do phải ràng vào `DEV` chứ không phải cờ trong DB.
 */
const EP_DUNG_FILE_TINH = (() => {
  try {
    if (import.meta?.env?.DEV !== true) return false;
    return localStorage.getItem("toan-vui-nguon") !== "db";
  } catch {
    return false;
  }
})();

/** Cây đang dùng. Khởi đầu là file tĩnh. */
let grades = TINH;
/** `"static"` | `"db"` | `"cache"` — chỉ để chẩn đoán, không ảnh hưởng logic. */
let nguon = "static";
/** Số `content_version` của cây đang dùng. `null` = đang dùng file tĩnh. */
let phienBan = null;

let loadPromise = null;
let lastLoadedAt = 0;

/** Chặn gọi lại liên tục khi có nhiều chỗ cùng gọi, hoặc khi bật/tắt tab nhanh.
 *  Để NGẮN (5s) như `rewardService`: lần gọi này chỉ đọc 2 khoá của `app_config`
 *  (rất nhẹ), còn tải cả cây chỉ xảy ra khi số phiên bản ĐÃ ĐỔI. */
const MIN_REFRESH_MS = 5_000;

// 🔴 `layGrades` là CHỐT DUY NHẤT mà mọi màn hình đọc cây nội dung (qua `curriculum.js`)
// ⇒ lọc nhãn SGK ở đây là đủ cho cả app, không phải sửa 170 chuỗi trong file dữ liệu.
// Kết quả được NHỚ theo chính đối tượng cây ⇒ mỗi cây chỉ duyệt một lần, không duyệt lại
// ở mỗi lần render (bảng có 460 bài · 2774 slide).
let cayGocDaSach = null;
let cayDaSach = null;
export const layGrades = () => {
  if (cayGocDaSach !== grades) {
    cayGocDaSach = grades;
    cayDaSach = stripTextbookRefsInTree(grades);
  }
  return cayDaSach;
};
export const layNguon = () => nguon;
export const layPhienBan = () => phienBan;

// ── Thông báo khi nguồn nội dung vừa đổi ────────────────────────────────────────
//
// 🔴 ĐO RỒI MỚI LÀM PHẦN NÀY. Bản đầu tôi định "ghi vào bộ nhớ rồi thôi, lần đọc
// sau sẽ thấy". Nhưng thử thật thì lộ ra: bé mở app VÀO THẲNG một bài (deep link,
// hoặc tải lại trang đang ở trong bài) thì trang render trước khi bản mới tải xong
// — nên phải mở **HAI lần** mới thấy nội dung vừa sửa. Đi một vòng (trang chủ →
// bài) thì được ngay, vì `LessonPage` đọc cây lúc render.
//
// Nên khi bản mới về thì **báo cho app render lại** — NHƯNG chỉ khi KHÔNG có bài nào
// đang mở. Đang học dở mà cây đổi thì bé bị đẩy về slide 1 (xem quyết định C2), nên
// trường hợp đó vẫn giữ nguyên hành vi cũ: đổi trong bộ nhớ, hiệu lực ở lần đọc sau.
let nguoiNghe = new Set();
let dangTrongBaiHoc = false;

/** `LessonPage` tự khai lúc vào/ra — nơi duy nhất có trạng thái đang học. */
export function baoDangTrongBaiHoc(co) {
  dangTrongBaiHoc = co;
}

/** Đăng ký nghe. Trả về hàm huỷ đăng ký (dùng thẳng làm cleanup của `useEffect`). */
export function ngheNoiDung(fn) {
  nguoiNghe.add(fn);
  return () => nguoiNghe.delete(fn);
}

function phatThayDoi() {
  if (dangTrongBaiHoc) return;
  for (const fn of nguoiNghe) fn();
}

function docCache() {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return;
    const goi = JSON.parse(raw);
    if (!cayHopLe(goi?.grades)) return;
    grades = goi.grades;
    nguon = "cache";
    phienBan = Number.isFinite(goi.version) ? goi.version : null;
  } catch {
    // Cache hỏng -> dùng file tĩnh. Không cần làm gì thêm: đây là lưới an toàn.
  }
}

function ghiCache(cay, version) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ version, grades: cay }));
  } catch {
    // 🔴 Hết dung lượng localStorage là chuyện CÓ THẬT ở đây: cả cây nội dung
    // ~800 KB. Bỏ qua thì lần sau phải tải lại — chậm hơn, nhưng vẫn đúng.
  }
}

function xoaCache() {
  try {
    localStorage.removeItem(CACHE_KEY);
  } catch {
    /* không quan trọng */
  }
}

// 🔴 Nạp cache NGAY khi module được import — đây là điều kiện để `layGrades()` trả về
// đúng ngay từ lần gọi đầu tiên, tức là từ khung hình đầu tiên. Đọc bất đồng bộ thì
// màn hình đầu tiên luôn hiện file tĩnh rồi mới đổi sang nội dung đã cache — nhìn
// như nội dung bị "nhảy".
//
// ⚠️ Ở chế độ dev (ép dùng file tĩnh) thì **KHÔNG** đọc cache: cache là cây tải từ DB,
// đọc nó lên là lại thấy bản cũ ngay từ khung hình đầu — đúng cái bẫy vừa nói ở trên.
if (!EP_DUNG_FILE_TINH) docCache();
else if (import.meta?.env?.DEV) {
  // eslint-disable-next-line no-console
  console.info(
    "[nội dung] CHẾ ĐỘ DEV: dùng file tĩnh trong repo ⇒ sửa dữ liệu là thấy ngay. " +
      'Muốn thử luồng DB: localStorage.setItem("toan-vui-nguon", "db") rồi tải lại.',
  );
}

/** Bóc giá trị thật khỏi JSONB của `app_config` (số trần, hoặc `{value: n}`). */
function bocJsonb(raw) {
  if (raw == null) return null;
  return typeof raw === "object" && "value" in raw ? raw.value : raw;
}

/**
 * Tải nội dung. Không bao giờ ném lỗi: mất mạng, chưa chạy migration, bảng rỗng —
 * tất cả đều rơi về cache hoặc file tĩnh, và app vẫn chạy.
 *
 * @returns {Promise<"static"|"unchanged"|"db"|false>}
 */
export function taiNoiDung({ force = false } = {}) {
  // ── DEV: ép dùng file tĩnh, KHÔNG gọi DB ──────────────────────────────────
  //
  // ⚠️ KHÔNG gọi `phatThayDoi()` ở đây: trong chế độ này nguồn KHÔNG BAO GIỜ đổi (không
  // đọc cache, không nạp DB) nên chẳng có gì để báo — và cổng S-25 đếm số lời gọi báo
  // thay đổi (nó canh đúng 2 nhánh: nạp từ DB và quay về nội dung tĩnh). Thêm một lời gọi
  // thứ ba là làm hỏng chính phép kiểm đó.
  if (EP_DUNG_FILE_TINH) {
    xoaCache();
    return Promise.resolve("static");
  }

  if (!force && Date.now() - lastLoadedAt < MIN_REFRESH_MS)
    return Promise.resolve("unchanged");
  if (loadPromise) return loadPromise;
  if (!isSupabaseConfigured() || !supabase) return Promise.resolve(false);

  loadPromise = (async () => {
    try {
      const { data: cfg, error: cfgErr } = await supabase
        .from("app_config")
        .select("key, value")
        .in("key", ["content_source", "content_version"]);

      if (cfgErr || !Array.isArray(cfg)) return false;

      const byKey = Object.fromEntries(cfg.map((r) => [r.key, r.value]));
      const congTac = bocJsonb(byKey.content_source);
      const version = Number(bocJsonb(byKey.content_version));

      // ── VAN AN TOÀN ──
      // 🔴 Không phải chỉ "không bật": đang dùng cây từ DB mà công tắc bị gạt về
      // `static` thì phải QUAY LẠI file tĩnh và XOÁ cache. Nếu chỉ "không tải thêm"
      // thì app vẫn dùng cây DB cũ — công tắc thành vô dụng, mà đây lại là thứ duy
      // nhất để tắt GĐ 3 khi có sự cố.
      if (congTac !== "remote") {
        if (nguon !== "static") {
          grades = TINH;
          nguon = "static";
          phienBan = null;
          xoaCache();
          lastLoadedAt = Date.now();
          phatThayDoi();
          return "static";
        }
        lastLoadedAt = Date.now();
        return "static";
      }

      // Cùng số phiên bản và đang dùng cây remote ⇒ không tải lại ~800 KB.
      if (nguon !== "static" && phienBan != null && version === phienBan) {
        lastLoadedAt = Date.now();
        return "unchanged";
      }

      const [g, c, l] = await Promise.all([
        supabase
          .from("content_grades")
          .select("id,name,description,icon,color,age_range,sort_order")
          .order("sort_order"),
        supabase
          .from("content_chapters")
          .select("id,grade_id,name,description,icon,color,sort_order")
          .order("sort_order"),
        supabase
          .from("content_lessons")
          .select(
            "id,chapter_id,title,lesson_type,description,sort_order,payload",
          )
          .order("sort_order"),
      ]);

      const loi = g.error || c.error || l.error;
      if (loi) {
        // Giữ nguyên thứ đang có; KHÔNG xoá cache — dữ liệu cũ vẫn tốt hơn file tĩnh
        // nếu admin vừa sửa mà mạng đang hỏng.
        return false;
      }

      const cay = dungCay(g.data, c.data, l.data);
      if (!cayHopLe(cay)) return false;

      grades = cay;
      nguon = "db";
      phienBan = Number.isFinite(version) ? version : null;
      ghiCache(cay, phienBan);
      lastLoadedAt = Date.now();
      phatThayDoi();

      if (import.meta.env.DEV) {
        const d = demCay(cay);
        console.log(
          `[nội dung] đọc từ DB: ${d.lop} lớp · ${d.chuong} chương · ${d.bai} bài · ` +
            `${d.slide} slide · phiên bản ${phienBan}`,
        );
      }
      return "db";
    } catch {
      return false;
    } finally {
      // Cho phép gọi lại lần sau (nút thử lại, hoặc lần khởi động kế tiếp).
      loadPromise = null;
    }
  })();

  return loadPromise;
}
