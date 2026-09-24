/**
 * Đếm quy mô nội dung THEO TỪNG LỚP (chương · bài · slide) từ file tĩnh.
 * Dùng để lập kế hoạch rà soát SGK: mỗi lớp bao nhiêu bài, bao nhiêu slide.
 */
import { grade1Data } from "../client/src/data/grade1Data.js";
import { grade2Data } from "../client/src/data/grade2Data.js";
import { grade3Data } from "../client/src/data/grade3Data.js";
import { grade4Data } from "../client/src/data/grade4Data.js";
import { grade5Data } from "../client/src/data/grade5Data.js";

const grades = [grade1Data, grade2Data, grade3Data, grade4Data, grade5Data];
let tongChuong = 0;
let tongBai = 0;
let tongSlide = 0;
grades.forEach((goi, i) => {
  const g = goi.chapters || [];
  const chuong = g.length;
  const bai = g.reduce((s, c) => s + (c.lessons?.length || 0), 0);
  const slide = g.reduce(
    (s, c) =>
      s + (c.lessons || []).reduce((t, l) => t + (l.slides?.length || 0), 0),
    0,
  );
  tongChuong += chuong;
  tongBai += bai;
  tongSlide += slide;
  console.log(
    `Lớp ${i + 1}: ${String(chuong).padStart(2)} chương · ${String(bai).padStart(3)} bài · ${String(slide).padStart(4)} slide`,
  );
});
console.log(
  `TỔNG   : ${tongChuong} chương · ${tongBai} bài · ${tongSlide} slide`,
);
