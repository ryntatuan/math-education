#!/usr/bin/env node
/**
 * Đưa nội dung bài học từ 5 file JS tĩnh lên DB — Giai đoạn 3, lát 3a.
 *
 * ════════════════════════════════════════════════════════════════════════════
 * CÁCH DÙNG
 *
 *   node scripts/migrate-content.mjs              # CHẠY THỬ — chỉ in báo cáo
 *   node scripts/migrate-content.mjs --sql        # sinh file .sql để dán vào SQL Editor
 *   node scripts/migrate-content.mjs --verify     # đối chiếu DB với file (không cần key)
 *   node scripts/migrate-content.mjs --apply      # ghi thẳng qua REST (cần key GHI)
 *
 * ════════════════════════════════════════════════════════════════════════════
 * VÌ SAO CÓ 3 CÁCH GHI, VÀ NÊN CHỌN CÁCH NÀO
 *
 * Kế hoạch 3a (mục 5) chỉ nói tới `--apply` với một key ghi qua biến môi trường.
 * Khi viết code mới thấy có đường KHÔNG CẦN KEY MẠNH NÀO CẢ, nên đã làm thêm:
 *
 *   `--sql`   sinh ra file .sql, bạn dán vào Supabase SQL Editor. SQL Editor chạy
 *             bằng quyền cao nhất sẵn rồi, nên KHÔNG phải tạo, cấp, hay dán bất kỳ
 *             khoá bí mật nào. Việc này bạn đã làm 7 lần với các migration.
 *   `--apply` ghi thẳng qua REST. Tiện khi phải chạy lại nhiều lần, nhưng đòi một
 *             key ghi — tức là bạn phải lấy một khoá rất mạnh ra khỏi trang quản trị
 *             Supabase và đặt vào biến môi trường. Rủi ro rò rỉ nằm ở bước đó.
 *
 * 👉 KHUYẾN NGHỊ: `--sql` cho lần migrate này (chạy 1 lần). `--apply` chỉ khi nào
 *    thật sự phải chạy đi chạy lại.
 *
 * ════════════════════════════════════════════════════════════════════════════
 * ĐỐI CHIẾU KHÔNG CẦN KEY MẠNH
 *
 * `--verify` đọc lại từ DB bằng đúng anon key đã có sẵn trong `.env.local`, vì RLS
 * cho phép đọc bài `published` + lớp + chương. Nên bước "ghi xong có đúng không"
 * không cần quyền gì đặc biệt. Bảng phiên bản thì anon không đọc được — bước đó
 * cần chạy SQL, xem cuối file `--sql` sinh ra.
 *
 * ════════════════════════════════════════════════════════════════════════════
 * NGUYÊN TẮC AN TOÀN
 *
 *  - Mặc định KHÔNG ghi gì. Phải gõ cờ mới ghi.
 *  - Kiểm TẤT CẢ slide trước. Chỉ cần 1 slide hỏng là DỪNG HẲN, không ghi nửa vời.
 *    Trạng thái nửa vời khó gỡ hơn nhiều so với chạy lại từ đầu.
 *  - KHÔNG bao giờ in key ra màn hình.
 *  - KHÔNG đụng tới `content_source` — việc bật/tắt nguồn nội dung là của migration
 *    `0011_bat_doc_noi_dung_tu_db.sql`, không phải của script dựng dữ liệu này.
 */

import fs from "node:fs";
import path from "node:path";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
const MUON_SQL = args.includes("--sql");
const MUON_GHI = args.includes("--apply");
const MUON_DOI_CHIEU = args.includes("--verify");

const { validateLesson } = await import(
  new URL("../admin/src/lib/contentSchema.js", import.meta.url)
);

// ─────────────────────── Nạp biến môi trường ───────────────────────

function napEnv() {
  for (const f of ["admin/.env.local", "client/.env.local"]) {
    const full = path.join(ROOT, f);
    if (!fs.existsSync(full)) continue;
    const env = {};
    for (const line of fs.readFileSync(full, "utf8").split(/\r?\n/)) {
      const m = line.match(/^\s*([A-Z_]+)\s*=\s*(.+?)\s*$/);
      if (m) env[m[1]] = m[2];
    }
    if (env.VITE_SUPABASE_URL?.startsWith("https://"))
      return { ...env, nguon: f };
  }
  return null;
}

const ENV = napEnv();
const URL_SB = ENV?.VITE_SUPABASE_URL;

const fail = (msg) => {
  console.error(`\n❌ ${msg}\n`);
  process.exit(1);
};

// ─────────────────────── Đọc và kiểm dữ liệu tĩnh ───────────────────────

const NGUON = [
  ["grade1Data.js", "grade1Data"],
  ["grade2Data.js", "grade2Data"],
  ["grade3Data.js", "grade3Data"],
  ["grade4Data.js", "grade4Data"],
  ["grade5Data.js", "grade5Data"],
];

const grades = [];
const chapters = [];
const lessons = [];
const loi = [];

for (const [file, key] of NGUON) {
  const mod = await import(
    new URL(`../client/src/data/${file}`, import.meta.url)
  );
  const g = mod[key];
  grades.push({
    id: g.id,
    name: g.name,
    description: g.description ?? null,
    icon: g.icon ?? null,
    color: g.color ?? null,
    sort_order: grades.length,
  });

  g.chapters.forEach((ch, iCh) => {
    chapters.push({
      id: ch.id,
      grade_id: g.id,
      name: ch.name,
      description: ch.description ?? null,
      icon: ch.icon ?? null,
      color: ch.color ?? null,
      sort_order: iCh,
    });

    // 🔴 KHÔNG dùng `ch.totalLessons`. Đo được 5 chương khai sai số bài
    // (g2-c8 khai 10 thật 2 …). Số bài phải đếm từ mảng, không lấy từ metadata.
    ch.lessons.forEach((l, iL) => {
      const canhBao = validateLesson(l);
      if (canhBao.length) loi.push(...canhBao.map((c) => `${l.id}: ${c}`));

      lessons.push({
        id: l.id,
        chapter_id: ch.id,
        title: l.title,
        lesson_type: l.type ?? "learn",
        description: l.description ?? null,
        sort_order: iL,
        status: "published",
        payload: { slides: l.slides },
      });
    });
  });
}

const soSlide = lessons.reduce((s, l) => s + l.payload.slides.length, 0);

// ─────────────────────── Báo cáo ───────────────────────

console.log("═".repeat(70));
console.log("  MIGRATE NỘI DUNG BÀI HỌC — GĐ 3, lát 3a");
console.log("═".repeat(70));
console.log(
  `\n  Đọc từ file tĩnh:\n` +
    `    ${grades.length} lớp · ${chapters.length} chương · ` +
    `${lessons.length} bài · ${soSlide} slide`,
);

// Đối chiếu với con số đã đo bằng `scratch/inspect_content_shape.mjs`.
// Lệch nghĩa là hoặc nội dung đã đổi (tốt — cập nhật số), hoặc bộ đọc đã hỏng.
const MONG_DOI = { lop: 5, chuong: 51, bai: 460, slide: 2738 };
const lech =
  grades.length !== MONG_DOI.lop ||
  chapters.length !== MONG_DOI.chuong ||
  lessons.length !== MONG_DOI.bai ||
  soSlide !== MONG_DOI.slide;

console.log(
  lech
    ? `  ⚠️  LỆCH so với số đã đo (${MONG_DOI.lop}/${MONG_DOI.chuong}/${MONG_DOI.bai}/${MONG_DOI.slide}).\n` +
        `      Nội dung có thể vừa được sửa — kiểm lại trước khi ghi.`
    : `  ✅ khớp số đã đo (5/51/460/2712)`,
);

if (loi.length) {
  console.log(`\n❌ ${loi.length} LỖI NỘI DUNG — KHÔNG ghi gì cả:\n`);
  for (const l of loi.slice(0, 20)) console.log(`   ${l}`);
  if (loi.length > 20) console.log(`   … và ${loi.length - 20} lỗi nữa`);
  fail("Dừng trước khi ghi. Sửa nội dung rồi chạy lại.");
}
console.log("  ✅ tất cả slide hợp lệ");

if (!MUON_SQL && !MUON_GHI && !MUON_DOI_CHIEU) {
  console.log(
    "\n(Chạy thử nên chưa ghi gì.)\n" +
      "  Thêm --sql     để sinh file .sql dán vào SQL Editor  ← khuyến nghị\n" +
      "  Thêm --apply   để ghi thẳng qua REST (cần key ghi)\n" +
      "  Thêm --verify  để đối chiếu DB với file (không cần key)\n",
  );
  process.exit(0);
}

// ─────────────────────── Sinh SQL ───────────────────────

/** Bọc giá trị thành literal SQL an toàn. Nhân đôi nháy đơn là cách duy nhất cần. */
const lit = (v) =>
  v === null || v === undefined ? "NULL" : `'${String(v).replace(/'/g, "''")}'`;
const jsonLit = (v) => `'${JSON.stringify(v).replace(/'/g, "''")}'::jsonb`;

// 🔴 TỰ KIỂM BỘ SINH LITERAL TRƯỚC KHI GHI.
// Bọc rồi bóc ngược lại PHẢI ra đúng giá trị ban đầu. Đây là chỗ dễ sai nhất khi
// sinh SQL từ dữ liệu (nháy đơn trong chữ tiếng Việt, xuống dòng, dấu `\`), và sai
// ở đây thì hàng trăm KB SQL sẽ ghi vào DB một nội dung méo mó mà không có gì báo.
// Tự kiểm ở đây rẻ hơn nhiều so với phát hiện sau khi đã ghi.
{
  const hong = [];
  for (const l of lessons) {
    const s = jsonLit(l.payload);
    const trong = s.slice(1, s.lastIndexOf("'::jsonb"));
    try {
      const boc = trong.replace(/''/g, "'");
      if (JSON.stringify(JSON.parse(boc)) !== JSON.stringify(l.payload))
        hong.push(`${l.id} (bóc ra khác ban đầu)`);
    } catch {
      hong.push(`${l.id} (JSON hỏng sau khi bóc)`);
    }
  }
  const dsChuoi = [...grades, ...chapters, ...lessons]
    .map((x) => x.name ?? x.title)
    .filter((s) => typeof s === "string");
  for (const s of dsChuoi) {
    if (lit(s).slice(1, -1).replace(/''/g, "'") !== s)
      hong.push(`chuỗi sai: ${s.slice(0, 40)}`);
  }
  if (hong.length)
    fail(
      `Bộ sinh literal SQL hỏng ở ${hong.length} chỗ — ${hong.slice(0, 5).join(" · ")}`,
    );
  console.log(
    `  ✅ tự kiểm bộ sinh SQL: ${lessons.length} payload + ` +
      `${dsChuoi.length} chuỗi, bọc rồi bóc khớp hết`,
  );
}

if (MUON_SQL) {
  const thuMuc = path.join(ROOT, "supabase", "content-seed");
  fs.mkdirSync(thuMuc, { recursive: true });

  const dau = `-- SINH TỰ ĐỘNG bởi scripts/migrate-content.mjs — ĐỪNG SỬA TAY.
-- Chạy trong Supabase SQL Editor, theo thứ tự tên file.
-- Chạy lại được nhiều lần (ON CONFLICT … DO UPDATE) nên không sinh dòng trùng.

`;

  // ── DỌN: xoá nội dung KHÔNG CÒN trong bộ file tĩnh ────────────────────────
  // 🔴 VÌ SAO CẦN FILE NÀY. Mọi INSERT bên dưới đều `ON CONFLICT (id) DO UPDATE`
  // — nghĩa là chỉ THÊM và SỬA, KHÔNG BAO GIỜ XOÁ. Nên khi một chương bị dựng lại
  // và bài cũ bị bỏ khỏi file tĩnh, những bài đó VẪN NẰM trong DB và vẫn hiện trên
  // app (đã đúng như vậy ở lần dựng lại lớp 1–3 năm 2026-09-21).
  // File này xoá ĐÚNG những id không còn trong file tĩnh, không đụng gì khác.
  //
  // ⚠️ KHÔNG dùng bảng tạm (TEMP TABLE) ở đây: SQL Editor có thể chạy mỗi câu trên
  // một kết nối khác nhau ⇒ bảng tạm "biến mất" giữa các câu. Dùng `VALUES` nội tuyến.
  // ⚠️ Tiến độ của bé (`completedLessons`) KHÔNG tham chiếu bảng nội dung, nên xoá
  // bài không làm mất tiến độ — chỉ những sao của bài đã bị xoá là không còn được tính.
  //
  // 🔴 `content_grades.id` là **INT**, còn `content_chapters.id` và `content_lessons.id`
  // là TEXT. Sinh `('1')` cho lớp thì Postgres báo `42883: operator does not exist:
  // text = integer` — đã mắc thật khi chạy file 00 lần đầu (2026-09-21). Nên lớp phải
  // sinh literal SỐ, không bọc nháy.
  const khoaValues = (ds, cot = "id", kieu = "text") =>
    ds
      .map((x) => `  (${kieu === "int" ? Number(x[cot]) : lit(x[cot])})`)
      .join(",\n");
  let don =
    dau +
    `-- DỌN nội dung không còn trong bộ file tĩnh. CHẠY FILE NÀY ĐẦU TIÊN.\n`;
  don += `-- Chỉ xoá id KHÔNG có trong danh sách dưới đây; chạy lại nhiều lần vô hại.\n\n`;
  don += `-- Bài học (xoá dây chuyền cả phiên bản và bản nháp của bài đó)\n`;
  don += `DELETE FROM public.content_lessons l\nWHERE NOT EXISTS (\n`;
  don += `  SELECT 1 FROM (VALUES\n${khoaValues(lessons)}\n) AS g(id) WHERE g.id = l.id\n);\n\n`;
  don += `-- Chương\n`;
  don += `DELETE FROM public.content_chapters c\nWHERE NOT EXISTS (\n`;
  don += `  SELECT 1 FROM (VALUES\n${khoaValues(chapters)}\n) AS g(id) WHERE g.id = c.id\n);\n\n`;
  don += `-- Lớp (khoá là SỐ nên literal không bọc nháy)\n`;
  don += `DELETE FROM public.content_grades r\nWHERE NOT EXISTS (\n`;
  don += `  SELECT 1 FROM (VALUES\n${khoaValues(grades, "id", "int")}\n) AS g(id) WHERE g.id = r.id\n);\n`;
  fs.writeFileSync(path.join(thuMuc, "00-don-noi-dung-cu.sql"), don, "utf8");

  // Lớp + chương: nhỏ, gộp chung một file.
  let s = dau + `-- Lớp và chương\n\n`;
  s += `INSERT INTO public.content_grades (id, name, description, icon, color, sort_order)\nVALUES\n`;
  s +=
    grades
      .map(
        (g) =>
          `  (${g.id}, ${lit(g.name)}, ${lit(g.description)}, ${lit(g.icon)}, ` +
          `${lit(g.color)}, ${g.sort_order})`,
      )
      .join(",\n") +
    `\nON CONFLICT (id) DO UPDATE SET\n` +
    `  name = EXCLUDED.name, description = EXCLUDED.description,\n` +
    `  icon = EXCLUDED.icon, color = EXCLUDED.color,\n` +
    `  sort_order = EXCLUDED.sort_order, updated_at = NOW();\n\n`;

  s += `INSERT INTO public.content_chapters\n  (id, grade_id, name, description, icon, color, sort_order)\nVALUES\n`;
  s +=
    chapters
      .map(
        (c) =>
          `  (${lit(c.id)}, ${c.grade_id}, ${lit(c.name)}, ${lit(c.description)}, ` +
          `${lit(c.icon)}, ${lit(c.color)}, ${c.sort_order})`,
      )
      .join(",\n") +
    `\nON CONFLICT (id) DO UPDATE SET\n` +
    `  grade_id = EXCLUDED.grade_id, name = EXCLUDED.name,\n` +
    `  description = EXCLUDED.description, icon = EXCLUDED.icon,\n` +
    `  color = EXCLUDED.color, sort_order = EXCLUDED.sort_order,\n` +
    `  updated_at = NOW();\n`;
  fs.writeFileSync(path.join(thuMuc, "01-lop-va-chuong.sql"), s, "utf8");

  // Bài học: tách theo lớp để mỗi file không quá lớn khi dán.
  const theoLop = new Map();
  for (const l of lessons) {
    const maLop = l.id.match(/^g(\d)-/)?.[1];
    if (!theoLop.has(maLop)) theoLop.set(maLop, []);
    theoLop.get(maLop).push(l);
  }

  let stt = 2;
  for (const [maLop, ds] of [...theoLop.entries()].sort()) {
    let t = dau + `-- Bài học Lớp ${maLop} — ${ds.length} bài\n\n`;
    t +=
      `INSERT INTO public.content_lessons\n` +
      `  (id, chapter_id, title, lesson_type, description, sort_order, status, payload, published_at)\nVALUES\n`;
    t +=
      ds
        .map(
          (l) =>
            `  (${lit(l.id)}, ${lit(l.chapter_id)}, ${lit(l.title)}, ` +
            `${lit(l.lesson_type)}, ${lit(l.description)}, ${l.sort_order}, ` +
            `'published', ${jsonLit(l.payload)}, NOW())`,
        )
        .join(",\n") +
      `\nON CONFLICT (id) DO UPDATE SET\n` +
      `  chapter_id = EXCLUDED.chapter_id, title = EXCLUDED.title,\n` +
      `  lesson_type = EXCLUDED.lesson_type, description = EXCLUDED.description,\n` +
      `  sort_order = EXCLUDED.sort_order, status = EXCLUDED.status,\n` +
      `  payload = EXCLUDED.payload, published_at = NOW(), updated_at = NOW();\n\n`;

    // Phiên bản 1 = chụp lại CHÍNH những dòng vừa ghi. Viết bằng SELECT để
    // KHÔNG phải chép lại toàn bộ JSON lần thứ hai vào file SQL (giảm một nửa
    // dung lượng file, và không có nguy cơ hai bản chép lệch nhau).
    t +=
      `-- Phiên bản 1 cho các bài của Lớp ${maLop}\n` +
      `INSERT INTO public.content_lesson_versions\n` +
      `  (lesson_id, version, title, description, lesson_type, payload)\n` +
      `SELECT id, 1, title, description, lesson_type, payload\n` +
      `FROM public.content_lessons\n` +
      `WHERE chapter_id LIKE ${lit(`g${maLop}-%`)}\n` +
      `ON CONFLICT (lesson_id, version) DO NOTHING;\n`;

    const ten = `${String(stt).padStart(2, "0")}-bai-lop-${maLop}.sql`;
    fs.writeFileSync(path.join(thuMuc, ten), t, "utf8");
    stt++;
  }

  // Cấu hình + đối chiếu, gộp một file cuối.
  let cuoi = dau + `-- Cấu hình và đối chiếu\n\n`;
  cuoi +=
    `-- Đánh dấu phiên bản nội dung = 1. CHỈ đặt khi đang nhỏ hơn 1, để chạy lại\n` +
    `-- không kéo lùi phiên bản mà admin đã publish sau đó.\n` +
    `UPDATE public.app_config\n` +
    `SET value = '1'::jsonb, updated_at = NOW()\n` +
    `WHERE key = 'content_version'\n` +
    `  AND COALESCE((value #>> '{}')::int, 0) < 1;\n\n`;
  cuoi +=
    `-- 🔴 KHÔNG đụng tới content_source. App phải tiếp tục đọc file tĩnh.\n` +
    `-- Kiểm để chắc chắn:\n` +
    `SELECT key, value FROM public.app_config\n` +
    `WHERE key IN ('content_source', 'content_version') ORDER BY key;\n` +
    `-- Mong đợi: content_source = "static" · content_version = 1\n\n`;
  cuoi +=
    `-- Đối chiếu số dòng (phải khớp ${grades.length} / ${chapters.length} / ${lessons.length}):\n` +
    `SELECT\n` +
    `  (SELECT COUNT(*) FROM public.content_grades)   AS so_lop,\n` +
    `  (SELECT COUNT(*) FROM public.content_chapters) AS so_chuong,\n` +
    `  (SELECT COUNT(*) FROM public.content_lessons)  AS so_bai,\n` +
    `  (SELECT COUNT(*) FROM public.content_lesson_versions) AS so_phien_ban;\n\n`;
  cuoi +=
    `-- Chương nào còn quá ít bài thì in ra (số bài là số THẬT, không phải metadata).\n` +
    `-- Mong đợi: 0 dòng. Danh sách này KHÔNG viết cứng theo id nên không lỗi thời khi\n` +
    `-- chương trình đổi — trước đây nó liệt kê 13 id cũ và đã sai sau lần dựng lại.\n` +
    `SELECT c.id, c.name, COUNT(l.id) AS so_bai\n` +
    `FROM public.content_chapters c\n` +
    `LEFT JOIN public.content_lessons l ON l.chapter_id = c.id\n` +
    `GROUP BY c.id, c.name\n` +
    `HAVING COUNT(l.id) < 3\n` +
    `ORDER BY c.id;\n`;
  fs.writeFileSync(
    path.join(thuMuc, "99-cau-hinh-va-doi-chieu.sql"),
    cuoi,
    "utf8",
  );

  /**
   * 🔴 DẤU VÂN TAY của bộ dữ liệu vừa sinh ra seed.
   *
   * VÌ SAO PHẢI CÓ. Ngày 2026-09-22 tôi sửa dữ liệu bài học ở hai vòng phát hành
   * (1.0.38, 1.0.39) nhưng **quên chạy lại `--sql`** ⇒ file seed trên đĩa vẫn là bản
   * CŨ. Người dùng dán đúng những file đó vào Supabase, và `--verify` báo **6 bài lệch
   * nội dung** — mất thêm một vòng dán tay. Lỗi im lặng: seed vẫn "hợp lệ", chỉ cũ.
   *
   * Nay mỗi lần sinh seed có ghi kèm dấu vân tay. Cổng `S-32` trong
   * `scripts/test-admin-portal.mjs` đọc lại dấu này rồi **tính lại từ dữ liệu hiện tại**;
   * lệch nhau ⇒ CỔNG ĐỎ kèm đúng câu cần chạy. Nhờ vậy không thể quên lần nữa.
   */
  const dauVanTay = createHash("sha256")
    .update(JSON.stringify(lessons.map((l) => [l.id, l.payload])))
    .digest("hex")
    .slice(0, 16);
  fs.writeFileSync(
    path.join(thuMuc, ".dau-van-tay.json"),
    JSON.stringify(
      {
        dauVanTay,
        bai: lessons.length,
        slide: soSlide,
        ghiLuc: new Date().toISOString(),
        cachTinh:
          "sha256(JSON.stringify(lessons.map(l => [l.id, l.payload]))).slice(0,16)",
      },
      null,
      2,
    ) + "\n",
    "utf8",
  );

  console.log(
    `\n✅ Đã sinh file SQL vào \`supabase/content-seed/\`:\n` +
      `   ${fs
        .readdirSync(thuMuc)
        .sort()
        .map((f) => "   " + f)
        .join("\n")}\n\n` +
      `   Chạy trong Supabase SQL Editor theo thứ tự tên file (00 → 01 … 06 → 99 → 100).\n` +
      `   🔴 ĐỪNG BỎ FILE 00: nó xoá những bài/chương đã bị bỏ khỏi file tĩnh. Seed chỉ\n` +
      `      upsert, nên thiếu bước 00 thì bài cũ (chủ đề sai) VẪN HIỆN trên app của bé.\n` +
      `   🔴 BƯỚC 100 LÀ BẮT BUỘC: seed chỉ GHI bài, KHÔNG tăng \`content_version\`\n` +
      `      (\`99-...\` cố ý chỉ đặt số 1 khi đang nhỏ hơn 1). Thiếu bước 100 thì máy các\n` +
      `      bé vẫn dùng cây đã cache và KHÔNG BAO GIỜ thấy nội dung mới.\n` +
      `      ⚠️ ĐỪNG gọi hàm \`bump_content_version()\` trong SQL Editor: \`0012\` đã bọc nó\n` +
      `      bằng chốt admin, mà SQL Editor không có JWT ⇒ \`42501\`. File 100 dùng SQL thô.\n` +
      `   Xong thì chạy: node scripts/migrate-content.mjs --verify\n`,
  );
  process.exit(0);
}

// ─────────────────────── Đối chiếu với DB (không cần key mạnh) ───────────────────────

if (MUON_DOI_CHIEU) {
  const anon = ENV?.VITE_SUPABASE_ANON_KEY;
  if (!URL_SB || !anon)
    fail(
      `Không thấy VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY trong .env.local`,
    );

  const doc = async (bang, select) => {
    const r = await fetch(`${URL_SB}/rest/v1/${bang}?select=${select}`, {
      headers: { apikey: anon, Authorization: `Bearer ${anon}` },
    });
    if (!r.ok)
      fail(`Đọc ${bang} thất bại — HTTP ${r.status}: ${await r.text()}`);
    return r.json();
  };

  console.log(
    "\nĐang đọc lại từ DB bằng anon key (không cần quyền gì đặc biệt)…\n",
  );

  const [dbGrades, dbChapters, dbLessons] = await Promise.all([
    doc("content_grades", "id"),
    doc("content_chapters", "id,grade_id"),
    doc(
      "content_lessons",
      "id,chapter_id,title,lesson_type,description,payload",
    ),
  ]);

  const ketQua = [];
  const soSanh = (nhan, that, mong) =>
    ketQua.push({ nhan, that, mong, dat: that === mong });

  soSanh("Số lớp", dbGrades.length, grades.length);
  soSanh("Số chương", dbChapters.length, chapters.length);
  soSanh("Số bài", dbLessons.length, lessons.length);

  const dbSlide = dbLessons.reduce(
    (s, l) => s + (l.payload?.slides?.length ?? 0),
    0,
  );
  soSanh("Số slide", dbSlide, soSlide);

  // So TỪNG BÀI, không chỉ đếm tổng — đếm tổng khớp mà nội dung lệch là chuyện
  // hoàn toàn có thể xảy ra.
  //
  // 🔴 PHẢI SẮP XẾP KHOÁ TRƯỚC KHI SO. PostgreSQL `jsonb` KHÔNG giữ thứ tự khoá
  // của object — nó lưu dạng chuẩn hoá (sắp theo độ dài khoá rồi theo byte). Nên
  // `JSON.stringify` của giá trị đọc về không bao giờ bằng `JSON.stringify` của
  // object gốc, DÙ NỘI DUNG Y HỆT.
  //
  // Đã mắc đúng lỗi này: lần chạy `--verify` đầu tiên báo **cả 362 bài** "có nội
  // dung khác" trong khi đếm số dòng đúng hết. Mọi thứ đều lệch thì cái thước là
  // chỗ đáng ngờ trước tiên — và đúng là thước hỏng, dữ liệu sạch.
  //
  // MẢNG thì giữ nguyên thứ tự: thứ tự slide là một phần nội dung, đổi thứ tự
  // nghĩa là nội dung khác.
  const chuanHoa = (v) => {
    if (Array.isArray(v)) return v.map(chuanHoa);
    if (v && typeof v === "object")
      return Object.fromEntries(
        Object.keys(v)
          .sort()
          .map((k) => [k, chuanHoa(v[k])]),
      );
    return v;
  };
  const bangNhau = (a, b) =>
    JSON.stringify(chuanHoa(a)) === JSON.stringify(chuanHoa(b));

  const theoId = new Map(dbLessons.map((l) => [l.id, l]));
  const thieu = [];
  const khac = [];
  for (const l of lessons) {
    const d = theoId.get(l.id);
    if (!d) {
      thieu.push(l.id);
      continue;
    }
    // Ghi rõ TRƯỜNG NÀO lệch, không chỉ ghi id. Lần trước chỉ có danh sách id nên
    // phải viết thêm script để tìm ra nguyên nhân — đắt hơn nhiều so với việc nói
    // thẳng ra ngay ở đây.
    const truongLech = [];
    if (d.title !== l.title) truongLech.push("title");
    if (d.lesson_type !== l.lesson_type) truongLech.push("lesson_type");
    if ((d.description ?? null) !== l.description)
      truongLech.push("description");
    if (!bangNhau(d.payload, l.payload)) truongLech.push("payload");
    if (truongLech.length) khac.push(`${l.id} (${truongLech.join(", ")})`);
  }
  soSanh("Bài bị thiếu", thieu.length, 0);
  soSanh("Bài có nội dung khác", khac.length, 0);

  // Số bài mỗi chương — 13 chương TỪNG MỎNG (ban đầu là 5 chương khai sai metadata,
  // sau đó là 13 chương được bổ sung bài ngày 2026-09-20).
  //
  // 🔴 KHÔNG hardcode số mong đợi nữa. Bản trước ghi cứng {g2-c8: 2, g2-c9: 2, …} nên
  //    khi bổ sung bài xong thì CHÍNH PHÉP KIỂM báo sai 5 dòng — thước hỏng, dữ liệu sạch.
  //    Nay lấy kỳ vọng từ FILE TĨNH, thêm bài vào chương nào cũng không phải sửa script.
  const demChuong = new Map();
  for (const l of dbLessons)
    demChuong.set(l.chapter_id, (demChuong.get(l.chapter_id) ?? 0) + 1);
  const demChuongFile = new Map();
  // Phía file tĩnh, `lessons` là mảng PHẲNG và mỗi phần tử mang `chapter_id`
  // (xem chỗ dựng `lessons.push({ …, chapter_id: ch.id, … })`). KHÔNG đếm qua
  // `chapters[].lessons` — mảng đó chỉ để duyệt lúc nạp, không phải nguồn số.
  for (const l of lessons)
    demChuongFile.set(l.chapter_id, (demChuongFile.get(l.chapter_id) ?? 0) + 1);

  const chuongTungMong = [
    "g2-c8",
    "g2-c9",
    "g2-c10",
    "g3-c9",
    "g3-c10",
    "g4-c3",
    "g4-c4",
    "g4-c5",
    "g4-c6",
    "g5-c1",
    "g5-c3",
    "g5-c4",
    "g5-c5",
  ];
  for (const c of chuongTungMong)
    soSanh(
      `Chương ${c} (từng mỏng — nay phải khớp file tĩnh)`,
      demChuong.get(c) ?? 0,
      demChuongFile.get(c) ?? 0,
    );

  // 🔴 Công tắc nguồn nội dung — kiểm GIÁ TRỊ HỢP LỆ, không bắt buộc một giá trị cụ thể.
  // Bản cũ bắt buộc phải = "static" (đúng cho lát 3a). Từ `0011` dự án đã CHUYỂN SANG
  // "remote" (app đọc nội dung từ DB) ⇒ giữ luật cũ thì `--verify` đỏ VĨNH VIỄN sau mỗi
  // lần bơm nội dung. Một dòng đỏ luôn đỏ sẽ dạy người đọc bỏ qua cả dòng đỏ thật.
  // `app_config` đọc được bằng anon key nên kiểm được ở đây, không cần quyền gì thêm.
  const cfg = await doc("app_config", "key,value");
  const giaTri = (k) => cfg.find((c) => c.key === k)?.value;

  const nguon = giaTri("content_source");
  ketQua.push({
    nhan: `content_source (${nguon === "remote" ? "app đọc DB" : "app đọc file tĩnh"})`,
    that: JSON.stringify(nguon),
    mong: '"remote" | "static"',
    dat: nguon === "remote" || nguon === "static",
  });

  const pb = giaTri("content_version");
  ketQua.push({
    nhan: "content_version (số nguyên ≥ 1)",
    that: JSON.stringify(pb),
    mong: "1",
    dat: Number.isInteger(pb) && pb >= 1,
  });

  console.log("  Chỉ số                                  DB      File    ");
  console.log("  " + "─".repeat(58));
  for (const k of ketQua)
    console.log(
      `  ${k.dat ? "✅" : "❌"} ${k.nhan.padEnd(36)} ` +
        `${String(k.that).padStart(5)}   ${String(k.mong).padStart(5)}`,
    );

  if (thieu.length)
    console.log(`\n  Bài thiếu: ${thieu.slice(0, 10).join(", ")}`);
  if (khac.length)
    console.log(`  Bài lệch nội dung: ${khac.slice(0, 10).join(", ")}`);
  // In đủ danh sách khi còn ít (đang sửa nội dung hàng loạt thì cần biết chính xác
  // bài nào lệch, không chỉ 10 bài đầu). Đông hơn 200 thì in theo lớp cho gọn mắt.
  if (khac.length > 10) {
    if (khac.length <= 200) console.log(`  Toàn bộ: ${khac.join(", ")}`);
    else {
      const theo = new Map();
      for (const id of khac) {
        const k = id.replace(/-l\d+$/, "");
        theo.set(k, (theo.get(k) ?? 0) + 1);
      }
      console.log(
        `  Lệch theo chương: ${[...theo].map(([k, v]) => `${k}=${v}`).join(" · ")}`,
      );
    }
  }

  const hong = ketQua.filter((k) => !k.dat);
  console.log(
    hong.length === 0
      ? `\n✅ KHỚP HOÀN TOÀN — ${lessons.length} bài, ${soSlide} slide.\n` +
          `   (Bảng phiên bản anon không đọc được — kiểm bằng file 99-…sql.)\n`
      : `\n❌ ${hong.length} chỉ số lệch. Xem bảng trên.\n`,
  );
  process.exit(hong.length === 0 ? 0 : 1);
}

// ─────────────────────── Ghi thẳng qua REST ───────────────────────

if (MUON_GHI) {
  const keyGhi = process.env.SUPABASE_WRITE_KEY;
  if (!URL_SB) fail("Không thấy VITE_SUPABASE_URL trong .env.local");
  if (!keyGhi)
    fail(
      "Thiếu biến môi trường SUPABASE_WRITE_KEY.\n" +
        "   Đặt key có quyền ghi rồi chạy lại. TRÊN POWERSHELL:\n" +
        '     $env:SUPABASE_WRITE_KEY = "..."\n' +
        "   Hoặc dùng `--sql` để khỏi phải dùng key nào.",
    );

  const ghi = async (bang, rows, nhan) => {
    const r = await fetch(`${URL_SB}/rest/v1/${bang}`, {
      method: "POST",
      headers: {
        apikey: keyGhi,
        Authorization: `Bearer ${keyGhi}`,
        "Content-Type": "application/json",
        // merge-duplicates = upsert theo khoá chính → chạy lại không sinh dòng trùng.
        // return=minimal = KHÔNG đọc lại dòng vừa ghi. Đây đúng bài học từ GĐ 2c:
        // muốn trả về dòng vừa ghi thì PostgREST phải đọc lại, và bước đọc lại bị
        // policy SELECT chi phối → báo lỗi rất dễ chẩn đoán nhầm thành lỗi RLS.
        Prefer: "resolution=merge-duplicates,return=minimal",
      },
      body: JSON.stringify(rows),
    });
    if (!r.ok)
      fail(
        `Ghi ${bang} thất bại — HTTP ${r.status}: ${(await r.text()).slice(0, 400)}`,
      );
    console.log(`  ✅ ${nhan}: ${rows.length} dòng`);
  };

  console.log("\nĐang ghi vào DB…\n");
  await ghi("content_grades", grades, "Lớp");
  await ghi("content_chapters", chapters, "Chương");
  await ghi("content_lessons", lessons, "Bài");

  // Phiên bản 1. Ghi theo lô để không mở một request quá lớn.
  const versions = lessons.map((l) => ({
    lesson_id: l.id,
    version: 1,
    title: l.title,
    description: l.description,
    lesson_type: l.lesson_type,
    payload: l.payload,
  }));
  for (let i = 0; i < versions.length; i += 50) {
    await ghi(
      "content_lesson_versions",
      versions.slice(i, i + 50),
      `Phiên bản 1 (lô ${i / 50 + 1})`,
    );
  }

  console.log(
    `\n✅ Xong. Chạy \`node scripts/migrate-content.mjs --verify\` để đối chiếu.\n` +
      `   Script này KHÔNG đụng tới content_source — muốn app đọc nội dung từ DB thì\n` +
      `   bật bằng migration \`0011_bat_doc_noi_dung_tu_db.sql\`.\n`,
  );
  process.exit(0);
}
