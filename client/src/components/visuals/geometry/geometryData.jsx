// geometryData.jsx
// TÁCH RA TỪ: GeometryVisuals.jsx
// (di chuyển mã nguyên khối — không sửa nội dung)

import { useEffect, useState } from "react";
import {
  useInteractive,
  useFillSlots,
  slotLook,
  FillBar,
} from ".././interactiveFill";
import {
  CARD_STYLE,
  CAPTION_STYLE,
  captionText,
  svgFit,
  ngatDong,
} from ".././visualTheme";

export const P = {
  ink: "#1e293b",
  soft: "#64748b",
  grid: "#e2e8f0",
  blue: "#2563eb",
  blueSoft: "#dbeafe",
  amber: "#d97706",
  amberSoft: "#fef3c7",
  rose: "#db2777",
  roseSoft: "#fce7f3",
  green: "#059669",
  greenSoft: "#d1fae5",
  violet: "#7c3aed",
  paper: "#ffffff",
};

export const card = CARD_STYLE;

export const caption = CAPTION_STYLE;

export const num = (v, fb) => (Number.isFinite(Number(v)) ? Number(v) : fb);

export const clamp = (n, lo, hi) => Math.min(hi, Math.max(lo, n));

export const PLANE = {
  square: "Hình vuông",
  rectangle: "Hình chữ nhật",
  triangle: "Hình tam giác",
  rightTriangle: "Hình tam giác vuông",
  parallelogram: "Hình bình hành",
  rhombus: "Hình thoi",
  trapezoid: "Hình thang",
  circle: "Hình tròn",
  quad: "Hình tứ giác",
};

export const SHAPE_POINTS = {
  /**
   * 🔴 HÌNH VUÔNG PHẢI LÀ HÌNH VUÔNG THẬT. Bản cũ để [70,40]–[250,40]–[250,180]–[70,180]
   * = **180 × 140** — tức là một HÌNH CHỮ NHẬT dán nhãn "Hình vuông". Người dùng nhìn màn
   * hình rồi báo (bài `g1-c2-l5`: "diễn giải hình vuông nhưng lại đang vẽ hình chữ nhật"),
   * và lỗi này nằm ở **17 chỗ** của cả 5 lớp — trong đó có bài dạy "diện tích hình vuông =
   * cạnh × cạnh", nơi hình vẽ sai làm hỏng luôn ý niệm cạnh × cạnh.
   * Nay: 80→240 ngang và 30→190 dọc, đúng **160 × 160**.
   */
  square: [
    [80, 30],
    [240, 30],
    [240, 190],
    [80, 190],
  ],
  rectangle: [
    [50, 50],
    [270, 50],
    [270, 170],
    [50, 170],
  ],
  rightTriangle: [
    [80, 50],
    [80, 170],
    [200, 170],
  ],
  triangle: [
    [160, 30],
    [275, 185],
    [45, 185],
  ],
  parallelogram: [
    [95, 45],
    [280, 45],
    [225, 180],
    [40, 180],
  ],
  rhombus: [
    [160, 32],
    [280, 110],
    [160, 188],
    [40, 110],
  ],
  trapezoid: [
    [98, 45],
    [222, 45],
    [280, 180],
    [40, 180],
  ],
  /**
   * TỨ GIÁC THƯỜNG — cố ý KHÔNG vuông, KHÔNG đều, bốn cạnh dài ngắn khác nhau.
   * 🔴 VÌ SAO CẦN: bài Lớp 2 `g2-c5-l6` dạy "hình TỨ GIÁC ABCD" mà lấy hình chữ nhật
   * làm minh hoạ thì trẻ dễ hiểu sai thành "tứ giác = hình chữ nhật". Sách giáo khoa
   * cũng vẽ một tứ giác chung rồi mới nói "hình vuông, hình chữ nhật CŨNG LÀ hình tứ giác".
   */
  quad: [
    [66, 46],
    [252, 62],
    [272, 178],
    [46, 166],
  ],
};

export const FILL = {
  square: [P.blueSoft, P.blue],
  rectangle: [P.blueSoft, P.blue],
  rightTriangle: [P.roseSoft, P.rose],
  triangle: [P.roseSoft, P.rose],
  parallelogram: [P.amberSoft, P.amber],
  rhombus: [P.amberSoft, P.amber],
  trapezoid: [P.greenSoft, P.green],
  quad: [P.greenSoft, P.green],
  circle: [P.amberSoft, P.amber],
};

export const HUONG_CHU_DINH = {
  square: [
    [-1, -1],
    [1, -1],
    [1, 1],
    [-1, 1],
  ],
  rectangle: [
    [-1, -1],
    [1, -1],
    [1, 1],
    [-1, 1],
  ],
  rightTriangle: [
    [-1, -1],
    [-1, 1],
    [1, 1],
  ],
  parallelogram: [
    [-0.8, -0.8],
    [0.8, -0.8],
    [0.8, 0.8],
    [-0.8, 0.8],
  ],
  trapezoid: [
    [-0.8, -0.8],
    [0.8, -0.8],
    [0.8, 0.8],
    [-0.8, 0.8],
  ],
  rhombus: [
    [0, -1],
    [1, 0],
    [0, 1],
    [-1, 0],
  ],
  triangle: [
    [0, -1],
    [0.7, 0.7],
    [-0.7, 0.7],
  ],
  quad: [
    [-0.9, -0.7],
    [0.9, -0.5],
    [0.9, 0.8],
    [-0.9, 0.7],
  ],
};

export const ANGLE_DEF = {
  acute: { deg: 55, name: "Góc nhọn", color: P.rose, note: "bé hơn góc vuông" },
  right: { deg: 90, name: "Góc vuông", color: P.blue, note: "bằng góc vuông" },
  obtuse: {
    deg: 125,
    name: "Góc tù",
    color: P.amber,
    note: "lớn hơn góc vuông, bé hơn góc bẹt",
  },
  straight: {
    deg: 180,
    name: "Góc bẹt",
    color: P.violet,
    note: "bằng hai góc vuông",
  },
};

export const SOLID_NAME = {
  cube: "Khối lập phương",
  cuboid: "Khối hộp chữ nhật",
  compare: "Khối lập phương & Khối hộp chữ nhật",
  rubikOnTable: "Khối Rubik trên bàn",
  cylinder: "Khối trụ",
  sphere: "Khối cầu",
};

export const DO_VAT = {
  book: { ten: "Quyển sách", hinh: "Hình chữ nhật", mau: P.blue },
  clock: { ten: "Mặt đồng hồ", hinh: "Hình tròn", mau: P.amber },
  brick: { ten: "Viên gạch lát nền", hinh: "Hình vuông", mau: P.blue },
  roof: { ten: "Mái nhà", hinh: "Hình tam giác", mau: P.rose },
  window: { ten: "Cửa sổ", hinh: "Hình vuông", mau: P.blue },
  wheel: { ten: "Bánh xe", hinh: "Hình tròn", mau: P.ink },
  door: { ten: "Cửa ra vào", hinh: "Hình chữ nhật", mau: P.amber },
  board: { ten: "Mặt bàn", hinh: "Hình chữ nhật", mau: P.amber },
  ball: { ten: "Quả bóng", hinh: "Hình tròn", mau: P.rose },
  house: {
    ten: "Ngôi nhà",
    hinh: "Tam giác (mái) · chữ nhật (thân) · vuông (cửa sổ)",
    mau: P.violet,
  },
  boat: {
    ten: "Chiếc thuyền",
    hinh: "1 hình chữ nhật (thân) + 2 hình tam giác (buồm)",
    mau: P.blue,
  },
  fish: {
    ten: "Con cá",
    hinh: "1 hình thoi (thân) + 1 hình tam giác (đuôi)",
    mau: P.amber,
  },
};

export const MAU_HINH = {
  circle: ["#22c55e", "#15803d"],
  triangle: ["#38bdf8", "#0284c7"],
  square: ["#ef4444", "#b91c1c"],
  rectangle: ["#fb923c", "#c2410c"],
  rhombus: ["#a78bfa", "#6d28d9"],
};

export const TEN_HINH = {
  circle: "hình tròn",
  triangle: "hình tam giác",
  square: "hình vuông",
  rectangle: "hình chữ nhật",
  rhombus: "hình thoi",
};

export const mauCua = (k, mau) => (mau ? [mau, mau] : MAU_HINH[k] || MAU_HINH.square);
