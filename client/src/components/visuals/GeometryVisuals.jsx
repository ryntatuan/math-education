// File này là PHẦN KHUNG (shell) — các slide/hình đã tách sang thư mục cùng tên.
/**
 * Bộ vẽ HÌNH HỌC — Giai đoạn 1 của kế hoạch hình ảnh bài học.
 *
 * `ShapeGraphic` cũ chỉ có 5 hình (vuông, tròn, tam giác, chữ nhật, lập phương) và KHÔNG
 * ghi được số đo cạnh — mà lớp 3 dạy chu vi/diện tích, lớp 4 dạy hình bình hành, hình thoi,
 * hình thang, góc, lớp 5 dạy hình tròn và hình khối. File này bù đúng chỗ đó.
 *
 * Nguyên tắc giống `CoreVisuals.jsx`: SVG nội tuyến + `viewBox` + `width="100%"`; mọi tham
 * số có mặc định; KHÔNG bao giờ để trắng khung vì một giá trị lạ.
 */
import { useEffect, useState } from "react";
import {
  useInteractive,
  useFillSlots,
  slotLook,
  FillBar,
} from "./interactiveFill";
import {
  CARD_STYLE,
  CAPTION_STYLE,
  captionText,
  svgFit,
  ngatDong,
} from "./visualTheme";
export { PlaneShape } from "./geometry/hinhPhang.jsx";
export { Angle, CircleParts } from "./geometry/gocTron.jsx";
export { ShapePicture, Solid } from "./geometry/hinhKhoi.jsx";
export { PatternRow, PointLine, ShapeJoin } from "./geometry/dayHinh.jsx";
export { SpatialScene } from "./geometry/khongGian.jsx";

