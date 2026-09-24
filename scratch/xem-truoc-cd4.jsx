/**
 * Trang XEM TRƯỚC các cảnh của Chủ đề 4 (Lớp 1) — chỉ để nhìn, không thuộc app.
 * Chạy: xem lệnh trong ghi chú của hội thoại (esbuild + node), KHÔNG import vào app.
 */
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import fs from "node:fs";
import path from "node:path";
import { SpatialScene } from "../client/src/components/visuals/GeometryVisuals.jsx";

const scenes = [
  [
    "maisCastle",
    {},
    "Lâu đài bạn Mai (SGK tr.94) — nền: 5 KHỐI LẬP PHƯƠNG · đáp án (a)=5, (b)=2",
  ],
  [
    "lettersTHC",
    {},
    "Chữ T, H, C bằng khối lập phương (tr.94) — T=5, H=7, C=5",
  ],
  [
    "movieRows",
    { front: 4, back: 6 },
    "Hai hàng bạn cùng quay về phía ti vi (tr.97) — hàng sau 6, hàng trước 4 ⇒ 10 bạn",
  ],
  [
    "brickRows",
    {},
    "Ba hàng viên gạch (tr.97) — trên cùng 2 · giữa 3 · dưới cùng 4 ⇒ cả ba hàng 9",
  ],
  [
    "solidSort",
    { round: 1 },
    "Sáu hình A–G như SGK tr.100 — vòng 1: “Những hình nào là KHỐI LẬP PHƯƠNG?” (A, C, E)",
  ],
  [
    "solidSort",
    { round: 2 },
    "Sáu hình A–G như SGK tr.100 — vòng 2: “Những hình nào là KHỐI HỘP CHỮ NHẬT?” (B, G)",
  ],
  [
    "diceFaces",
    {},
    "Xúc xắc (SGK tr.100) — (a) mặt trước 5 chấm, (b) mặt bên phải 6 chấm, (c) mặt trên 3 chấm",
  ],
  [
    "cubeWalls",
    {},
    "So sánh hai hình (SGK tr.101): hình trái 8 khối · hình phải 4×2 = 8 khối ⇒ bằng nhau (đáp án b)",
  ],
  ["dollCatTable", {}, "Búp bê ở TRÊN bàn · mèo ở DƯỚI gầm bàn (tr.96)"],
  [
    "rabbitQueue",
    {},
    "3 thỏ: nâu TRƯỚC · khoang GIỮA · xám SAU — cà rốt ở bên trái (tr.96)",
  ],
  ["trainCars", {}, "Đoàn tàu: đầu máy bên trái, toa 1·2·3·4 (tr.96)"],
  [
    "trainCars",
    { hideNumbers: true },
    "Đoàn tàu — chế độ HỎI: ẩn số toa (dùng cho câu hỏi vị trí)",
  ],
  [
    "rabbitTurtleLeftRight",
    {},
    "Trái – Phải (tr.98): thỏ bên trái · rùa bên phải — HAI HÌNH RIÊNG như SGK",
  ],
  [
    "kidsLeftRight",
    {},
    "Trái – Phải (tr.98): Mai – Nam – Rô-bốt, trái sang phải",
  ],
  [
    "trafficLight",
    {},
    "Cột đèn giao thông (tr.96) — chế độ HỎI: chỉ ghi vị trí (không lộ màu)",
  ],
  [
    "trafficLight",
    { showColors: true },
    "Cột đèn giao thông (tr.96) — chế độ DẠY: mỗi đèn một dòng, đúng thứ tự trên→dưới",
  ],
  [
    "cubeComposite2x2",
    {},
    "Từ 8 khối nhỏ xếp thành khối lập phương lớn (tr.100–101)",
  ],
  [
    "patternSequence",
    { kind: "shape" },
    "Chuỗi quy luật HÌNH (hoạt động bổ sung) — đáp án: khối lập phương",
  ],
  [
    "patternSequence",
    { kind: "color" },
    "Chuỗi quy luật MÀU (hoạt động bổ sung) — đáp án: màu xanh",
  ],
  ["topBottom", {}, "CẢNH CŨ (đang có) — trên/dưới, để so sánh"],
];

const batches = [
  [0, 6],
  [6, 11],
  [11, 15],
];

const body = renderToStaticMarkup(
  <>
    {batches.map(([tu, den], b) => (
      <div className="batch" key={b}>
        {scenes.slice(tu, den).map(([mode, props, title], i) => (
          <div className="cell" key={i}>
            <h3>
              {tu + i + 1}. {title}
            </h3>
            <div className="phone">
              <SpatialScene mode={mode} {...props} />
            </div>
          </div>
        ))}
      </div>
    ))}
  </>,
);

const html = `<!doctype html>
<html lang="vi"><head><meta charset="utf-8">
<title>Xem trước cảnh Chủ đề 4 — Lớp 1</title>
<style>
  *{box-sizing:border-box}
  body{margin:0;background:#f1f5f9;font-family:"Segoe UI",system-ui,sans-serif;color:#0f172a}
  h1{font-size:19px;margin:0;padding:16px 16px 4px}
  p.lead{margin:0;padding:0 16px 14px;color:#475569;font-size:13px}
  .batch{width:1240px;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px;padding:0 16px 26px;align-items:start}
  .cell{background:#fff;border:1px solid #e2e8f0;border-radius:12px;padding:12px;display:block;overflow:hidden}
  .cell h3{font-size:13px;margin:0 0 10px;color:#334155;font-weight:700;line-height:1.35}
  .phone{width:375px;max-width:100%}
</style></head>
<body>
<h1>Xem trước 15 cảnh — Chủ đề 4, Lớp 1 (11 cảnh mới + 1 cảnh cũ)</h1>
<p class="lead">Mỗi cảnh đặt trong khung rộng 375 px (≈ màn điện thoại). Chưa có nội dung bài học — đây chỉ là phần HÌNH.</p>
${body}
</body></html>`;

// Lưu ý: sau khi bundle sang CJS, `import.meta.url` là `undefined` ⇒ dùng `__dirname`.
const out = path.join(__dirname, "xem-truoc-cd4.html");
fs.writeFileSync(out, html, "utf8");
console.log("DA GHI: " + out + " (" + html.length + " ky tu)");
