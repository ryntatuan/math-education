/**
 * THƯ VIỆN CHÈN SLIDE VÀO FILE DỮ LIỆU — dùng chung cho các script sinh nội dung.
 *
 * VÌ SAO TÁCH RA (2026-09-29): đã mắc **hai lỗi định dạng** khi chèn slide (thụt lề nhân đôi;
 * dấu `{` sát lề trái) và **một lỗi nhận mốc** (`"id":` có nháy vs `id:` không nháy — hai kiểu
 * file sống chung trong repo). Chép lại đoạn chèn sang script thứ hai là mở đường cho hai script
 * lệch nhau ⇒ một nguồn sự thật duy nhất ở đây.
 *
 * Bốn việc thư viện này lo:
 *   1. Nhận KIỂU ĐỊNH DẠNG của file (khoá có nháy hay không; mảng ngắn in một dòng hay không).
 *   2. Chuyển object JS thành chữ đúng định dạng đó (không cần prettier).
 *   3. Tìm MỐC CHÈN = dòng mở đầu slide `quiz` đầu tiên của từng bài (mốc an toàn, xem ghi chú cũ).
 *   4. Chèn từ CUỐI LÊN để chỉ số dòng phía trước không đổi, giữ nguyên kiểu xuống dòng của file.
 */
import fs from "node:fs";
import path from "node:path";

export const thutLe = (soCap) => "  ".repeat(soCap);

/** `json` = do JSON.stringify sinh (khoá có nháy); `prettier` = khoá không nháy khi hợp lệ. */
export const kieuFile = (raw) =>
  raw.includes('"type": "') ? "json" : "prettier";

const KHOA_DON_GIAN = /^[A-Za-z_$][A-Za-z0-9_$]*$/;

/** Object JS → chữ. Mảng ngắn in một dòng (kiểu prettier), mảng dài in từng phần tử một dòng. */
export function ser(value, cap, kieu) {
  const pad = thutLe(cap);
  if (Array.isArray(value)) {
    const mot = `[${value.map((v) => JSON.stringify(v)).join(", ")}]`;
    if (
      kieu === "prettier" &&
      mot.length <= 74 &&
      value.every((v) => typeof v !== "object" || v === null)
    )
      return mot;
    return `[\n${value.map((v) => thutLe(cap + 1) + ser(v, cap + 1, kieu)).join(",\n")}\n${pad}]`;
  }
  if (value && typeof value === "object") {
    const cap2 = Object.entries(value);
    if (!cap2.length) return "{}";
    const than = cap2
      .map(([k, v]) => {
        const khoa =
          kieu === "prettier" && KHOA_DON_GIAN.test(k) ? k : JSON.stringify(k);
        return thutLe(cap + 1) + khoa + ": " + ser(v, cap + 1, kieu);
      })
      .join(",\n");
    return `{\n${than}\n${pad}}`;
  }
  return JSON.stringify(value);
}

/** Slide (object JS) → chữ, đúng lề cấp 4 (trong `lessons[].slides[]`). */
export function vietSlide(slide, kieu) {
  return thutLe(4) + ser(slide, 4, kieu);
}

/** Đường dẫn file dữ liệu của một chương: `g2-c4` → `client/src/data/grade2/g2c4.js`. */
export function fileCuaChuong(idChuong) {
  const m = idChuong.match(/^g(\d)-c(\d+)$/);
  if (!m) return null;
  return `client/src/data/grade${m[1]}/g${m[1]}c${m[2]}.js`;
}

/**
 * Bổ sung slide cho từng bài của một chương.
 *
 * @param {object} chuong  chương (có `lessons[]`)
 * @param {(bai:object) => object[]|null} slidesCuaBai  hàm sinh slide cho MỘT bài
 * @param {{ ghi?: boolean, coiNhuDaCo?: (bai:object) => boolean }} tuyChon
 * @returns {{ soBai:number, soSlide:number, boQua:string[], khongSinhDuoc:string[] }}
 */
export function boSungChuong(chuong, slidesCuaBai, tuyChon = {}) {
  const { ghi = false } = tuyChon;
  const file = fileCuaChuong(chuong.id);
  const ra = { soBai: 0, soSlide: 0, boQua: [], khongSinhDuoc: [] };
  if (!file || !fs.existsSync(file)) {
    for (const b of chuong.lessons || []) ra.khongSinhDuoc.push(b.id);
    return ra;
  }

  const raw = fs.readFileSync(file, "utf8");
  const kieu = kieuFile(raw);
  const eol = raw.includes("\r\n") ? "\r\n" : "\n";
  const dong = raw.split(/\r?\n/);
  const vungChen = [];

  /** Nhận CẢ `id:` lẫn `"id":` — hai kiểu file đang sống chung trong repo. */
  const mocBaiCua = (id) => new RegExp(`^\\s{6}(?:"id"|id):\\s*"${id}"`);
  const laDauBaiKe = /^\s{6}(?:"id"|id):\s*"g\d-c\d+-l\d+"/;
  const laTypeQuiz = /^\s{10}(?:"type"|type):\s*"quiz",?\s*$/;

  for (const bai of chuong.lessons || []) {
    if (tuyChon.coiNhuDaCo?.(bai)) {
      ra.boQua.push(bai.id);
      continue;
    }
    const slides = slidesCuaBai(bai);
    if (!slides || slides.length === 0) {
      ra.khongSinhDuoc.push(bai.id);
      continue;
    }
    const moc = dong.findIndex((l) => mocBaiCua(bai.id).test(l));
    if (moc < 0) {
      ra.khongSinhDuoc.push(bai.id);
      continue;
    }
    let chen = -1;
    /**
     * MỐC CHÈN: slide `quiz` đầu tiên là mốc an toàn nhất (chuỗi “type: quiz” hiếm và dễ thấy).
     * ⚠️ Một số bài KHÔNG có quiz nào (bài khái niệm) ⇒ trước đây bị bỏ qua oan. Nay lùi về
     * mốc phụ: slide `summary`; bài cũng không có summary thì chèn vào CUỐI mảng slides.
     */
    let mocPhu = -1;
    let mocCuoiCung = -1;
    for (let i = moc + 1; i < dong.length; i += 1) {
      if (/^\s{8}\{$/.test(dong[i])) {
        if (laTypeQuiz.test(dong[i + 1] ?? "")) {
          chen = i;
          break;
        }
        if (
          /^\s{10}(?:"type"|type):\s*"summary"/.test(dong[i + 1] ?? "") &&
          mocPhu < 0
        )
          mocPhu = i;
        mocCuoiCung = i;
      }
      if (laDauBaiKe.test(dong[i])) break;
    }
    if (chen < 0) chen = mocPhu >= 0 ? mocPhu : mocCuoiCung;
    if (chen < 0) {
      ra.khongSinhDuoc.push(bai.id);
      continue;
    }
    vungChen.push({
      viTri: chen,
      chu: slides.map((s) => vietSlide(s, kieu)).join("," + eol) + ",",
    });
    ra.soBai += 1;
    ra.soSlide += slides.length;
  }

  if (!vungChen.length) return ra;
  for (const v of [...vungChen].sort((a, b) => b.viTri - a.viTri))
    dong.splice(v.viTri, 0, ...v.chu.split(eol));
  const moi = dong.join(eol);
  if (ghi) fs.writeFileSync(file, moi, "utf8");
  return ra;
}

/** Đọc toàn bộ chương của 5 lớp (cùng thứ tự với app). */
export async function layTatCaChuong() {
  const ra = [];
  for (let n = 1; n <= 5; n += 1) {
    const mod = await import(
      new URL(`../client/src/data/grade${n}Data.js`, import.meta.url).href
    );
    const data = Object.values(mod).find((v) => v && Array.isArray(v.chapters));
    for (const c of data.chapters) ra.push(c);
  }
  return ra;
}

/** Số TẤT ĐỊNH theo chuỗi seed — cùng bài thì lần nào cũng ra cùng số. */
export function ngauNhien(seed) {
  let s = 0;
  for (const ch of seed) s = (s * 31 + ch.charCodeAt(0)) % 2147483647;
  return () => {
    s = (s * 1103515245 + 12345) % 2147483648;
    return s / 2147483648;
  };
}

/** Trộn 4 phương án cho một câu hỏi: đáp án đúng + 3 giá trị khác, đều > 0, không trùng. */
export function bonPhuongAn(dung, khac = []) {
  const hay = new Set([dung]);
  for (const t of [...khac, dung + 1, dung - 1, dung + 2, dung - 2]) {
    if (hay.size >= 4) break;
    if (!Number.isFinite(t) || t <= 0 || t === dung) continue;
    if ([...hay].some((h) => h === t)) continue;
    hay.add(t);
  }
  const ds = [...hay].sort((a, b) => a - b);
  return ds.length >= 3 ? { options: ds, answer: dung } : null;
}

export { path };
