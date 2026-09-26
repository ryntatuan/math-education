/**
 * SINH LẠI lời giải từng bước cho các slide do `tach-slide-don.mjs` tạo ra.
 *
 * Vì sao cần: lời giải do `columnSteps.js` sinh, mà bộ sinh có thể được sửa (ví dụ thêm mẹo
 * “nhân với 10 chỉ việc thêm chữ số 0” — bản đầu dùng tích riêng nên SAI cách dạy của SGK).
 * Chạy lại file này là mọi slide đã sinh được cập nhật theo bộ sinh MỚI NHẤT, không cần tách lại.
 *
 * Chạy: `node scratch/sua-loi-giai-tach.mjs` (xem trước) · `--ghi` (ghi thật)
 *
 * Nhận diện slide đã sinh: dòng `"text"` có dòng đầu là “Đặt tính rồi …” và có “Vậy … = …”.
 */
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { buocTinh } from "../client/src/components/visuals/columnSteps.js";

const GHI = process.argv.includes("--ghi");
const so = (s) =>
  Number(
    String(s)
      .replace(/[\u00a0 ]/g, "")
      .replace(",", "."),
  );

const fileDS = [];
for (const lop of [1, 2, 3, 4, 5]) {
  const dir = `client/src/data/grade${lop}`;
  for (const f of readdirSync(dir))
    if (/^g\d+c\d+\.js$/.test(f)) fileDS.push(`${dir}/${f}`);
}

let soSua = 0;
for (const file of fileDS) {
  const dong = readFileSync(file, "utf8").split("\n");
  let doi = false;
  for (let i = 0; i < dong.length; i++) {
    const m = /^(\s*)"text":\s*"((?:[^"\\]|\\.)*)",?\s*$/.exec(dong[i]);
    if (!m) continue;
    // giải mã chuỗi JSON để thao tác trên nội dung thật
    let chu;
    try {
      chu = JSON.parse(`"${m[2]}"`);
    } catch {
      continue;
    }
    const d = chu.split("\n");
    if (!/^Đặt tính rồi /.test(d[0]) || !/Vậy .*=/.test(chu)) continue;
    const mCalc = /Đặt tính rồi (?:tính|chia) (.+)$/.exec(d[0]);
    if (!mCalc) continue;
    const m2 = /^(\d[\d\u00a0 ]*)\s*([+\-−×:])\s*(\d[\d\u00a0 ]*)$/.exec(
      mCalc[1].trim(),
    );
    if (!m2) continue;
    const a = so(m2[1]);
    const b = so(m2[3]);
    const op = m2[2];
    const { buoc, ketLuan } = buocTinh(a, b, op);
    if (!ketLuan) continue;
    // giữ dòng ngữ cảnh (nhãn bảng cũ) nếu có: dòng không phải bước, không phải kết luận
    const nguCanh = d
      .slice(1)
      .filter((x) => !/^\d+\)/.test(x) && !/^Vậy /.test(x) && x.trim());
    const moi = [
      d[0],
      ...nguCanh,
      ...buoc.map((x, k) => `${k + 1}) ${x}`),
      `Vậy ${ketLuan}.`,
    ].join("\\n");
    dong[i] = `${m[1]}"text": "${moi}",`;
    soSua += 1;
    doi = true;
  }
  if (doi) {
    if (GHI) writeFileSync(file, dong.join("\n"), "utf8");
    console.log(`${file}: cập nhật lời giải`);
  }
}
console.log(
  `\nTổng ${soSua} slide được sinh lại lời giải.${GHI ? " ✅ ĐÃ GHI." : " (chạy thử — chưa ghi)"}`,
);
