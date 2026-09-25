/**
 * IN GỌN NỘI DUNG MỘT CHƯƠNG — để rà soát nhanh mà không phải đọc cả nghìn dòng JSON.
 *
 *   node scratch/in-gon-chuong.mjs g1-c5        (một chương)
 *   node scratch/in-gon-chuong.mjs g1-c5 g1-c6  (nhiều chương)
 *   node scratch/in-gon-chuong.mjs --lop 2      (cả một lớp)
 *
 * Mỗi slide in MỘT dòng: số thứ tự · kiểu · chữ/đề bài (rút gọn) · lựa chọn + đáp án ·
 * các khoá hình đang dùng · MỌI CON SỐ xuất hiện trong slide (để đối chiếu với SGK).
 * Mọi con số được in ra để phép soát số liệu không phải mở file.
 */
import { HINH_KEYS } from "../client/src/components/visuals/visualKeys.js";
import fs from "node:fs";

/** Dòng in ra: vừa ra màn hình, vừa (nếu có `--ra <file>`) ghi bằng fs ⇒ KHÔNG hỏng dấu tiếng Việt. */
const dongRa = [];
const inRa = (s = "") => {
  dongRa.push(s);
  console.log(s);
};

const NGUON = [
  ["grade1Data.js", "grade1Data"],
  ["grade2Data.js", "grade2Data"],
  ["grade3Data.js", "grade3Data"],
  ["grade4Data.js", "grade4Data"],
  ["grade5Data.js", "grade5Data"],
];

const KHOA = new Set([
  ...HINH_KEYS,
  "planeShapes",
  "items",
  "shape",
  "clock",
  "operation",
  "comparison",
]);
const KHOA_CHU = new Set([
  "text",
  "question",
  "title",
  "rule",
  "explanation",
  "mascotHint",
  "badge",
]);

const args = process.argv.slice(2);
const canLop = args.includes("--lop");
const lopCan = canLop ? Number(args[args.indexOf("--lop") + 1]) : null;
const raFile = args.includes("--ra") ? args[args.indexOf("--ra") + 1] : null;
const chuongCan = args.filter((a) => /^g\d-c\d+$/.test(a));

const rut = (s, n = 120) =>
  String(s ?? "")
    .replace(/\s+/g, " ")
    .slice(0, n);

for (const [file, key] of NGUON) {
  const mod = await import(
    new URL(`../client/src/data/${file}`, import.meta.url)
  );
  const g = mod[key];
  if (lopCan && Number(g.id.replace("grade", "")) !== lopCan) continue;
  for (const ch of g.chapters ?? []) {
    if (chuongCan.length && !chuongCan.includes(ch.id)) continue;
    let soSlide = 0;
    for (const bai of ch.lessons ?? []) {
      inRa(`\n${bai.id} — ${bai.title}`);
      inRa(`   (${bai.description ?? ""}) · ${bai.slides.length} slide`);
      bai.slides.forEach((s, i) => {
        soSlide++;
        const c = s.content ?? {};
        const chu = [
          "text",
          "question",
          "title",
          "rule",
          "explanation",
          "mascotHint",
        ]
          .map((k) => c[k])
          .filter(Boolean)
          .join(" | ");
        const khoaHinh = [...KHOA].filter(
          (k) => c[k] !== undefined && c[k] !== null,
        );
        // Mọi con số trong slide (kể cả số nằm trong hình) — để đối chiếu SGK
        const so = [
          ...new Set(
            (
              JSON.stringify(c).match(/(?<![\w.])\d+(?:[.,]\d+)?(?![\w])/g) ??
              []
            ).filter((x) => x.length <= 6),
          ),
        ];
        const chon = Array.isArray(c.options)
          ? ` · chọn [${c.options.map((o) => String(o)).join(" / ")}] → ĐÚNG: ${c.answer}`
          : "";
        const diem = Array.isArray(c.points)
          ? ` · gạch đầu dòng: ${c.points.length}`
          : "";
        inRa(
          `  ${i + 1}. [${s.type}] ${rut(chu)}${chon}${diem}` +
            (khoaHinh.length ? ` · HÌNH: ${khoaHinh.join(",")}` : "") +
            (so.length ? ` · số: ${so.join(" ")}` : ""),
        );
      });
    }
    inRa(`\n>>> ${ch.id}: ${ch.lessons.length} bài · ${soSlide} slide`);
  }
}

if (raFile) {
  fs.writeFileSync(raFile, dongRa.join("\n"), "utf8");
  console.log(`\n(đã ghi ${raFile})`);
}
