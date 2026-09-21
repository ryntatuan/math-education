/**
 * Bộ vẽ HÌNH cho nhóm SỐ và ĐO LƯỜNG — Giai đoạn 1 của kế hoạch hình ảnh bài học.
 *
 * VÌ SAO CÓ FILE NÀY. `LessonPage.jsx` đã có sẵn `ClockGraphic` và `ShapeGraphic` (5 hình
 * cơ bản) đọc từ dữ liệu, nhưng phần lớn chương trình không có cách vẽ nào: trục số, khung
 * 10 ô, khối chục–đơn vị, bảng hàng, thước đo, tiền Việt Nam, bảng số liệu.
 * Kết quả đo trước khi làm: **0/2438 slide có hình** — xem `scratch/kiem-tra-hinh-anh.mjs`.
 *
 * NGUYÊN TẮC CHUNG CỦA CẢ BỘ
 *  1. Tất cả vẽ bằng SVG nội tuyến, dùng `viewBox` + `width="100%"` ⇒ co giãn theo khung
 *     chứa, không có toạ độ cứng. Không tải ảnh từ mạng nên app vẫn chạy offline.
 *  2. Mọi tham số đều TUỲ CHỌN có mặc định hợp lý — dữ liệu thiếu khoá thì vẫn vẽ được
 *     một hình mẫu, KHÔNG ném lỗi và KHÔNG để trắng khung (bài học cũ: một giá trị lạ
 *     làm `ShapeGraphic` im lặng không vẽ gì).
 *  3. Số liệu trên hình LẤY TỪ DỮ LIỆU, không viết cứng — để hình luôn khớp nội dung bài.
 */

import { CARD_STYLE, CAPTION_STYLE, svgFit, VUA_HINH } from "./visualTheme";

const PALETTE = {
  ink: "#1e293b",
  soft: "#64748b",
  line: "#94a3b8",
  blue: "#2563eb",
  blueSoft: "#dbeafe",
  amber: "#d97706",
  amberSoft: "#fef3c7",
  rose: "#db2777",
  roseSoft: "#fce7f3",
  green: "#059669",
  greenSoft: "#d1fae5",
  violet: "#7c3aed",
  violetSoft: "#ede9fe",
  paper: "#ffffff",
  grid: "#e2e8f0",
};

// Kiểu dáng dùng chung — xem `visualTheme.js` (không chép lại ở đây nữa).
const card = CARD_STYLE;
const caption = CAPTION_STYLE;

const clamp = (n, lo, hi) => Math.min(hi, Math.max(lo, n));
const num = (v, fallback) =>
  Number.isFinite(Number(v)) ? Number(v) : fallback;

/* ─────────────────────────────── TRỤC SỐ (TIA SỐ) ───────────────────────────────
 * Dùng ở lớp 1–3: so sánh số, đếm thêm, cộng trừ trên tia, làm tròn số.
 *   numberLine: { from, to, step, marks: [..], hops: [{from, to, label}], label }
 * `hops` vẽ một vòng cung nhảy từ mốc này sang mốc khác — đúng cách SGK dạy "đếm thêm".
 */
export function NumberLine({
  from = 0,
  to = 10,
  step = 1,
  marks = [],
  hops = [],
  label = "",
}) {
  const a = num(from, 0);
  const b = Math.max(num(to, a + 10), a + 1);
  const s = Math.max(num(step, 1), 1);
  /**
   * Đỉnh cung "nhảy" cao dần theo số nhịp: `hopH = 20 + i × 22` (22 thay vì 10 — chữ cỡ 15
   * cao 19 đơn vị nên hai nhãn cung cách nhau 10 đơn vị là **đè lên nhau**, đo được ở
   * `g1-c1-l12`: "đếm xuôi" ✕ "đếm ngược"). Nhịp thứ ba (bài `g2-c8-l2`) vì thế vươn lên
   * tận y = 10, mà nhãn cần thêm 15 đơn vị phía trên ⇒ **cao khung phải tăng theo**.
   */
  const hopHCaoNhat = hops.length ? 20 + (hops.length - 1) * 22 : 0;
  const H = hops.length ? Math.max(132, 82 + hopHCaoNhat) : 92;
  const padL = 26;
  /**
   * 🔴 Bên phải phải chừa chỗ cho NHÃN của mốc cuối, RỒI MỚI tới mũi tên.
   *
   * Số đo thật trước khi chữa (thẻ 336 px): nhãn "10" vượt qua mép trái mũi tên 2,3 px,
   * nhãn "100" vượt 4,3 px ⇒ số cuối nằm NGAY DƯỚI mũi tên, nhìn như bị đè lên.
   *
   * ⚠️ Mũi tên ở đây dùng `markerUnits` MẶC ĐỊNH (= `strokeWidth`), nên kích thước thật
   * là `markerWidth × strokeWidth` = 9 × 3 = **27 đơn vị**, và `refX` dịch 7 × 3 = **21**
   * đơn vị. Nghĩa là mép trái mũi tên nằm ở `x2 − 21` chứ KHÔNG phải `x2 − 7` — ước lượng
   * theo `markerWidth` trần sẽ chừa thiếu đúng 14 đơn vị và lại chồng như cũ.
   */
  const rongNhan = (v) => String(v).length * 8.6; // cỡ chữ 15 in đậm ⇒ ~8,6 đơn vị/chữ số
  const ticks = [];
  for (let v = a; v <= b + 1e-9; v += s) ticks.push(Math.round(v * 1e6) / 1e6);
  const nhanDau = ticks[0];
  const nhanCuoi = ticks[ticks.length - 1];
  const nuaNhan = Math.max(rongNhan(nhanCuoi), rongNhan(nhanDau)) / 2;
  const AIR = nuaNhan + 12 + 21; // nhãn + khe thở + thân mũi tên
  const padR = AIR + 10;
  /**
   * BỀ RỘNG TỰ TÍNH — để hình không bao giờ phải kéo ngang (xem `svgFit`).
   * Tính theo NHU CẦU THẬT của cặp nhãn kề nhau chứ không lấy một số tròn: trục 0→10
   * (11 nhãn 1 chữ số) chỉ cần ~220 đơn vị, còn trục 10→100 (nhãn 3 chữ số) cần ~330.
   * Kẹp trong [260, VUA_HINH] để hình nhỏ không bị dài ngoẵng, hình to không vượt vua.
   */
  const canRong = ticks.slice(0, -1).reduce((tong, t, i) => {
    const khe = (rongNhan(t) + rongNhan(ticks[i + 1])) / 2 + 6;
    return tong + khe;
  }, padL + padR);
  const W = clamp(Math.round(canRong), 260, VUA_HINH);
  const axisY = H - 40;
  const span = b - a;
  const x = (v) => padL + ((v - a) / span) * (W - padL - padR);
  const xMuiTen = W - padR + AIR; // điểm gắn mũi tên, nằm SAU nhãn cuối

  /**
   * NHÃN NÀO ĐƯỢC VẼ — chọn theo "mốc quan trọng" chứ không theo nhịp đều.
   *
   * 🔴 BẢN TRƯỚC SAI Ở HAI CHỖ, và cả hai đều là lỗi ĐO ĐƯỢC trên dữ liệu thật:
   *   1. `i % nhay === 0` cộng thêm luật "luôn vẽ mốc cuối" ⇒ ở trục 199→254 bước 1
   *      (56 mốc, bài `g2-c10-l10`) hai nhãn **253 và 254 chỉ cách nhau 3 px** — đè lên nhau.
   *   2. Nhịp đều không biết mốc nào là mốc BÀI HỌC đang nói tới: cùng trục đó, `marks`
   *      là 199 · 245 · 254, mà 245 rơi vào vị trí không chia hết cho nhịp ⇒ **mất nhãn**
   *      đúng ở con số cần đọc.
   *
   * NAY: vẽ TRƯỚC các mốc được đánh dấu + hai mốc đầu/cuối, RỒI mới thêm các mốc khác
   * nếu còn đủ chỗ (mỗi cặp nhãn kề nhau ≥ bề rộng một nhãn + 6 đơn vị).
   */
  const rongMoc = Math.max(...ticks.map(rongNhan));
  const canhNhan = rongMoc + 6;
  const markSet = new Set(marks.map((m) => num(m, NaN)));
  const coNhan = new Array(ticks.length).fill(false);
  ticks.forEach((t, i) => {
    if (markSet.has(t) || i === 0 || i === ticks.length - 1) coNhan[i] = true;
  });
  for (let i = 1; i < ticks.length - 1; i++) {
    if (coNhan[i]) continue;
    let vua = true;
    for (let j = i - 1; j >= 0 && vua; j--) {
      if (coNhan[j]) vua = x(ticks[i]) - x(ticks[j]) >= canhNhan;
    }
    for (let j = i + 1; j < ticks.length && vua; j++) {
      if (coNhan[j]) vua = x(ticks[j]) - x(ticks[i]) >= canhNhan;
    }
    if (vua) coNhan[i] = true;
  }

  return (
    <div style={card}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        {...svgFit(W)}
        role="img"
        aria-label="Trục số"
      >
        <defs>
          <marker
            id="nlArrow"
            markerWidth="9"
            markerHeight="9"
            refX="7"
            refY="4.5"
            orient="auto"
          >
            <path d="M0,1 L9,4.5 L0,8 Z" fill={PALETTE.line} />
          </marker>
        </defs>

        <line
          x1={padL - 12}
          y1={axisY}
          x2={xMuiTen}
          y2={axisY}
          stroke={PALETTE.line}
          strokeWidth="3"
          markerEnd="url(#nlArrow)"
        />

        {ticks.map((t, idx) => {
          const hit = markSet.has(t);
          return (
            <g key={t}>
              <line
                x1={x(t)}
                y1={axisY - (hit ? 11 : 7)}
                x2={x(t)}
                y2={axisY + (hit ? 11 : 7)}
                stroke={hit ? PALETTE.blue : PALETTE.line}
                strokeWidth={hit ? 3 : 2}
              />
              {coNhan[idx] && (
                <text
                  x={x(t)}
                  y={axisY + 30}
                  textAnchor="middle"
                  fontSize="15"
                  fontWeight={hit ? 800 : 600}
                  fill={hit ? PALETTE.blue : PALETTE.ink}
                >
                  {t}
                </text>
              )}
            </g>
          );
        })}

        {hops.map((h, i) => {
          const x1 = x(num(h.from, a));
          const x2 = x(num(h.to, a));
          /**
           * 🔴 ĐỪNG vẽ NỬA ĐƯỜNG TRÒN (bán kính = nửa dây cung). Nhịp dài bằng cả trục
           * (508 đơn vị) thì bán kính là 254 ⇒ đỉnh cung vẽ VỐNG RA NGOÀI khung: đo thật
           * trên thư viện hình, cung vươn tới **y = −161,1** trong khung cao **132** ⇒ bé
           * chỉ thấy một mẩu cung bị cắt. Nay dùng cung BẬC HAI nông, chiều cao cố định
           * (đỉnh cung ở nửa chiều cao điểm điều khiển). Nhịp thứ hai cao hơn để hai cung
           * không trùng lên nhau.
           */
          const hopH = 20 + i * 22;
          return (
            <g key={i}>
              <path
                d={`M${x1},${axisY - 12} Q${(x1 + x2) / 2},${axisY - 12 - hopH * 2} ${x2},${axisY - 12}`}
                fill="none"
                stroke={PALETTE.violet}
                strokeWidth="2.5"
                strokeDasharray="5 4"
              />
              {h.label && (
                <text
                  x={(x1 + x2) / 2}
                  y={axisY - 18 - hopH}
                  textAnchor="middle"
                  fontSize="15"
                  fontWeight="800"
                  fill={PALETTE.violet}
                >
                  {h.label}
                </text>
              )}
            </g>
          );
        })}
      </svg>
      {label && <span style={caption}>{label}</span>}
    </div>
  );
}

/* ─────────────────────────────── KHUNG 10 Ô ───────────────────────────────
 * Cách SGK dạy "đếm thêm cho đủ 10" và "cộng qua 10". Bày sẵn từng ô vuông.
 *   tenFrame: { filled, total = 10, emoji = "🔴", extra = 0, label }
 * `extra` = số ô ĐƯỢC THÊM vào. Phần bù cho đủ khung vẽ trong khung (xanh lá),
 * phần dư vẽ thành nhóm riêng bên phải, có dấu "+" ở giữa ⇒ đọc thẳng thành "10 + 3".
 */
export function TenFrame({
  filled = 7,
  total = 10,
  emoji = "🔴",
  extra = 0,
  label = "",
}) {
  const t = clamp(num(total, 10), 1, 20);
  const f = clamp(num(filled, 0), 0, t);
  const e = clamp(num(extra, 0), 0, 40);
  /**
   * 🔴 `extra` CÓ THỂ LỚN HƠN số ô trống của khung — và bản cũ KẸP nó lại:
   * `const e = clamp(num(extra, 0), 0, t - f)`. Kẹp trong im lặng nên hình vẽ thiếu
   * mà không có lỗi nào hiện ra. Đo được 3 ca ở Lớp 2:
   *   `g2-c7-l1` filled 9, total 10, extra 3 — ý là 9 + 4 = 9 + 1 + 3, mà hình chỉ vẽ
   *      9 + 1 = 10 ⇒ bé KHÔNG thấy 3 quả còn lại, trong khi lời giảng nói "rồi 10 + 3";
   *   `g2-c2-l1` (mất 2) và `g2-c8-l6` (mất 4).
   * Người dùng nhìn màn hình rồi báo; cổng kiểm dữ liệu không thấy vì dữ liệu vẫn hợp lệ.
   *
   * Nay: phần bù đủ khung vẽ TRONG khung, phần dư vẽ thành NHÓM RIÊNG bên phải.
   * Mọi ca trước đây có `extra ≤ total − filled` giữ nguyên hình dạng cũ.
   */
  const vaoKhung = Math.min(e, t - f);
  const ngoaiKhung = e - vaoKhung;
  const perRow = t <= 10 ? 5 : 10;
  const rows = Math.ceil(t / perRow);
  /**
   * Cạnh một ô. 38 (khung 5 ô) và 34 (khung 10 ô) chọn theo số đo bề rộng: khung 5 ô
   * + nhóm dư 4 ô phải nằm trong `VUA_HINH` đơn vị, nếu không hình lại phải kéo ngang.
   * Con số 44 cũ cho ra 434 đơn vị — quá rộng so với 283 px thẻ hình trên điện thoại.
   */
  const cell = perRow === 10 ? 34 : 38;
  const khungW = perRow * cell + 4;
  const khungH = rows * cell + 4;
  const kheNhom = 28; // chừa chỗ cho dấu "+"
  /**
   * Số cột của NHÓM DƯ bị chặn bởi bề rộng còn lại — nhóm dư dài bao nhiêu cũng phải nằm
   * trong `VUA_HINH`. Bị chặn thì các ô xếp thêm HÀNG (hình cao lên) chứ không rộng ra.
   */
  const soCotToiDa = Math.max(
    1,
    Math.min(perRow, Math.floor((VUA_HINH - khungW - kheNhom) / cell)),
  );
  const soCotNhom = Math.min(ngoaiKhung, soCotToiDa);
  const soHangNhom = soCotNhom ? Math.ceil(ngoaiKhung / soCotNhom) : 0;
  const nhomW = ngoaiKhung ? soCotNhom * cell + 4 : 0;
  const nhomH = soHangNhom * cell + 4;
  const W = khungW + (ngoaiKhung ? kheNhom + nhomW : 0);
  const H = Math.max(khungH, nhomH);
  const lechKhung = (H - khungH) / 2; // canh giữa hai nhóm theo chiều dọc
  const lechNhom = (H - nhomH) / 2;
  const xNhom = khungW + kheNhom;

  return (
    <div style={card}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        {...svgFit(W)}
        role="img"
        aria-label="Khung 10 ô"
      >
        {Array.from({ length: t }).map((_, i) => {
          const r = Math.floor(i / perRow);
          const c = i % perRow;
          const daCo = i < f;
          const bu = i >= f && i < f + vaoKhung;
          const yGiua = lechKhung + r * cell + cell / 2;
          return (
            <g key={i}>
              <rect
                x={c * cell + 2}
                y={lechKhung + r * cell + 2}
                width={cell - 4}
                height={cell - 4}
                rx="7"
                fill={
                  daCo ? PALETTE.blueSoft : bu ? PALETTE.greenSoft : "#f8fafc"
                }
                stroke={PALETTE.line}
                strokeWidth="2"
              />
              {daCo || bu ? (
                <>
                  <circle
                    cx={c * cell + cell / 2}
                    cy={yGiua}
                    r={cell * 0.28}
                    fill={bu ? PALETTE.green : PALETTE.blue}
                  />
                  <text
                    x={c * cell + cell / 2}
                    y={yGiua + 5}
                    textAnchor="middle"
                    fontSize="15"
                  >
                    {emoji}
                  </text>
                </>
              ) : (
                <text
                  x={c * cell + cell / 2}
                  y={yGiua + 6}
                  textAnchor="middle"
                  fontSize="14"
                  fill={PALETTE.line}
                >
                  ○
                </text>
              )}
            </g>
          );
        })}

        {/* Nhóm ô CÒN LẠI — chỗ mà bản cũ làm mất. Dấu "+" để đọc thẳng thành "10 + 3". */}
        {ngoaiKhung > 0 && (
          <>
            <text
              x={khungW + kheNhom / 2}
              y={H / 2 + 11}
              textAnchor="middle"
              fontSize="30"
              fontWeight="800"
              fill={PALETTE.ink}
            >
              +
            </text>
            {Array.from({ length: ngoaiKhung }).map((_, i) => {
              const r = Math.floor(i / soCotNhom);
              const c = i % soCotNhom;
              const cx = xNhom + c * cell + cell / 2;
              const cy = lechNhom + r * cell + cell / 2;
              return (
                <g key={`n${i}`}>
                  <rect
                    x={xNhom + c * cell + 2}
                    y={lechNhom + r * cell + 2}
                    width={cell - 4}
                    height={cell - 4}
                    rx="7"
                    fill={PALETTE.greenSoft}
                    stroke={PALETTE.line}
                    strokeWidth="2"
                  />
                  <circle
                    cx={cx}
                    cy={cy}
                    r={cell * 0.28}
                    fill={PALETTE.green}
                  />
                  <text x={cx} y={cy + 5} textAnchor="middle" fontSize="15">
                    {emoji}
                  </text>
                </g>
              );
            })}
          </>
        )}
      </svg>
      {label && <span style={caption}>{label}</span>}
    </div>
  );
}

/* ─────────────────────── KHỐI CHỤC – ĐƠN VỊ (QUE TÍNH / KHỐI) ───────────────────────
 * Trực quan hoá "3 chục 4 đơn vị = 34". Mỗi chục là một thanh 10 ô; mỗi đơn vị một ô.
 *   baseTen: { tens, ones, label }
 */
export function BaseTenBlocks({ tens = 3, ones = 4, label = "" }) {
  const tn = clamp(num(tens, 0), 0, 9);
  const on = clamp(num(ones, 0), 0, 9);

  // 🔴 KÍCH THƯỚC Ô PHẢI LÀ MỘT HẰNG SỐ DÙNG CHUNG cho cả ô TRONG thanh chục LẪN ô
  // đơn vị. Đây là điểm sư phạm cốt lõi: trẻ phải thấy “1 ô trong thanh chục = 1 ô đơn vị”.
  // Bản cũ dùng rodW = 22 nhưng chia thanh chục thành 10 phần cao 13,2 ⇒ ô trong thanh bị
  // BẸP (22×11,2) trong khi ô đơn vị là 22×22 — trẻ không so sánh được gì.
  // Và khe giữa các ô trong thanh chỉ 2 đơn vị ⇒ sau khi phóng to gần như DÍNH LIỀN,
  // không đếm được 10 ô.
  const o = 15; // cạnh một ô vuông
  const khe = 3; // khe giữa hai ô — đủ rộng để đếm được ở mọi cỡ màn hình
  const kheThanh = 8; // khe giữa hai thanh chục
  const traiDoc = 8;
  const trenDoc = 8;

  const rodH = 10 * o + 9 * khe;
  const beRongThanh = tn * o + Math.max(0, tn - 1) * kheThanh;
  const xDonVi = traiDoc + beRongThanh + (tn && on ? kheThanh : 0);
  const beRongDonVi = on * o + Math.max(0, on - 1) * khe;
  const W = xDonVi + beRongDonVi + traiDoc;
  const H = trenDoc + rodH + 30;

  return (
    <div style={card}>
      <svg
        viewBox={`0 0 ${Math.max(W, 200)} ${H}`}
        // Khối này vốn rất cao (10 ô xếp dọc). Giới hạn chiều cao để nó không chiếm
        // trọn màn hình; SVG tự thu nhỏ và căn giữa theo `preserveAspectRatio` mặc định.
        {...svgFit(Math.max(W, 200), { maxHeight: 380 })}
        role="img"
        aria-label="Khối chục và đơn vị"
      >
        {Array.from({ length: tn }).map((_, i) =>
          Array.from({ length: 10 }).map((_, k) => (
            <rect
              key={`t${i}-${k}`}
              x={traiDoc + i * (o + kheThanh)}
              y={trenDoc + k * (o + khe)}
              width={o}
              height={o}
              rx="3.5"
              fill={PALETTE.amberSoft}
              stroke={PALETTE.amber}
              strokeWidth="1.6"
            />
          )),
        )}
        {Array.from({ length: tn }).map((_, i) => (
          <text
            key={`tl${i}`}
            x={traiDoc + i * (o + kheThanh) + o / 2}
            y={trenDoc + rodH + 20}
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={PALETTE.amber}
          >
            10
          </text>
        ))}
        {Array.from({ length: on }).map((_, i) => (
          <g key={`o${i}`}>
            <rect
              x={xDonVi + i * (o + khe)}
              y={trenDoc + rodH - o}
              width={o}
              height={o}
              rx="3.5"
              fill={PALETTE.blueSoft}
              stroke={PALETTE.blue}
              strokeWidth="1.6"
            />
            <text
              x={xDonVi + i * (o + khe) + o / 2}
              y={trenDoc + rodH + 20}
              textAnchor="middle"
              fontSize="15"
              fontWeight="700"
              fill={PALETTE.blue}
            >
              1
            </text>
          </g>
        ))}
      </svg>
      <span style={caption}>
        {tn} chục và {on} đơn vị = <b>{tn * 10 + on}</b>
        {label ? ` · ${label}` : ""}
      </span>
    </div>
  );
}

/* ─────────────────────────────── BẢNG HÀNG ───────────────────────────────
 * Dùng cho lớp 2–5: đọc/viết số, cấu tạo số, hàng của số thập phân.
 *   placeValue: { headers: ["Trăm","Chục","Đơn vị"], digits: [3,4,5], highlight: 1, label }
 */
export function PlaceValueTable({
  headers = ["Trăm", "Chục", "Đơn vị"],
  digits = [3, 4, 5],
  highlight = -1,
  label = "",
}) {
  const hs =
    Array.isArray(headers) && headers.length
      ? headers
      : ["Trăm", "Chục", "Đơn vị"];
  const ds = Array.isArray(digits) ? digits.slice(0, hs.length) : [];
  const hi = num(highlight, -1);
  // 🔴 KHE DỌC giữa hộp tiêu đề và hộp chữ số. Bản cũ đặt hộp tiêu đề cao 38 (y 10→48) và
  // hộp chữ số bắt đầu đúng y = 48 ⇒ hai hộp CHẠM NHAU, nhìn như dính liền một khối.
  const KHE_DOC = 10;
  const yTieuDe = 8;
  const CAO_CHU_SO = 66;

  /**
   * 🔴 BỀ RỘNG CỘT DO TIÊU ĐỀ QUYẾT ĐỊNH, VÀ TIÊU ĐỀ DÀI THÌ NGẮT DÒNG.
   *
   * Bản cũ cứng `cellW = 96` cho mọi cột ⇒ bảng 8–9 hàng (số đến hàng triệu) rộng
   * **592–880 đơn vị**, gấp hơn 2 lần bề rộng thẻ hình trên điện thoại (283 px) nên bé
   * phải kéo ngang. Ca thật trong dữ liệu lớp 4: `g4-c1-l6` — 9 cột.
   *
   * Nay cột rộng theo TỪ DÀI NHẤT của tiêu đề (`nghìn`, `triệu` ≤ 5 chữ), phần còn lại
   * ngắt xuống dòng hai: "Trăm nghìn" → "Trăm" / "nghìn". Nhờ vậy 9 cột chỉ cần ~390 đơn
   * vị ⇒ chỉ phải cắt thành hai khối 5 + 4, chứ không phải kéo ngang.
   */
  /**
   * Cỡ chữ 14 in đậm tiếng Việt ⇒ **9,0 đơn vị một ký tự** — ĐO THẬT, không đoán.
   * 🔴 Bản đầu tôi ước 7,4 và hậu quả đo được ở bài `g4-c1-l6`: tiêu đề các cột ĐÈ LÊN NHAU
   * 15–21 px ("Trăm triệu" ✕ "Chục triệu" ✕ "Triệu" …), vì cột tính hẹp hơn chữ thật.
   *
   * Hai mức bề rộng: `nat1` = đủ cho tiêu đề trên MỘT dòng; `nat2` = chỉ cần đủ cho TỪ dài
   * nhất (phần còn lại ngắt xuống dòng hai). Còn ngân sách thì dùng một dòng; chật quá thì
   * co theo tỉ lệ nhưng không xuống dưới `nat2`, rồi `chiaKhoi` cắt thành nhiều khối.
   */
  const RONG_CHU_TIEU_DE = 9.5;
  const LE_O = 8;
  const khoa = (soKyTu) => Math.round(soKyTu * RONG_CHU_TIEU_DE + LE_O);
  const nat1 = hs.map((h) => khoa(String(h).length));
  const nat2 = hs.map((h) =>
    Math.max(
      40,
      khoa(
        Math.max(
          ...String(h)
            .split(/\s+/)
            .map((w) => w.length),
        ),
      ),
    ),
  );
  const nganSach = VUA_HINH - 16;
  const tong1 = nat1.reduce((a, b) => a + b, 0);
  const cotTuNhien =
    tong1 <= nganSach
      ? nat1
      : nat1.map((w, i) =>
          Math.max(nat2[i], Math.round((w * nganSach) / tong1)),
        );
  const soCotMoiKhoi = chiaKhoi(cotTuNhien, nganSach);
  const KHE_KHOI = 22;

  const khoi = [];
  let y = 0;
  for (let i0 = 0; i0 < hs.length; i0 += soCotMoiKhoi) {
    const cot = [];
    for (let c = i0; c < Math.min(i0 + soCotMoiKhoi, hs.length); c++)
      cot.push(c);
    let chay = 8;
    const mocX = cot.map((c) => {
      const x = chay;
      chay += cotTuNhien[c];
      return x;
    });
    const chu = cot.map((c) =>
      bocChu(hs[c], Math.floor((cotTuNhien[c] - LE_O) / RONG_CHU_TIEU_DE)),
    );
    const soDong = Math.max(...chu.map((d) => d.length));
    const caoTieuDe = soDong > 1 ? 60 : 40;
    const yChuSo = yTieuDe + caoTieuDe + KHE_DOC;
    const cao = yChuSo + CAO_CHU_SO + 8;
    khoi.push({
      cot,
      mocX,
      chu,
      rong: chay + 8,
      caoTieuDe,
      dav: yTieuDe + caoTieuDe / 2 + 5,
      yChuSo,
      cao,
      y,
    });
    y += cao + KHE_KHOI;
  }

  const W = Math.max(...khoi.map((k) => k.rong));
  const H = y - KHE_KHOI + 8;

  return (
    <div style={card}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        {...svgFit(W)}
        role="img"
        aria-label="Bảng hàng"
      >
        {khoi.map((k, ki) =>
          k.cot.map((c, j) => {
            /**
             * 🔴 BỀ RỘNG Ô = BỀ RỘNG CHÍNH CỘT ĐÓ (`cotTuNhien[c]`).
             * Bản đầu tôi lấy `k.rong − mocX[j] − 8` — tức "phần còn lại của cả khối" — nên
             * MỌI ô trong khối đều rộng bằng nhau và cùng kết thúc ở mép phải: đo được các ô
             * `x=8 w=280`, `x=64 w=224`, `x=120 w=168`… và chữ thì đè lên nhau.
             */
            const rongO = cotTuNhien[c] - 6;
            const giua = k.mocX[j] + rongO / 2;
            return (
              <g key={`${ki}-${c}`}>
                <rect
                  x={k.mocX[j]}
                  y={k.y + yTieuDe}
                  width={rongO}
                  height={k.caoTieuDe}
                  rx="8"
                  fill={PALETTE.violetSoft}
                  stroke={PALETTE.violet}
                  strokeWidth="2"
                />
                <text
                  x={giua}
                  y={k.y + k.dav}
                  textAnchor="middle"
                  fontSize="14"
                  fontWeight="800"
                  fill={PALETTE.violet}
                >
                  {k.chu[j].map((d, li) => (
                    <tspan key={li} x={giua} dy={li === 0 ? 0 : 20}>
                      {d}
                    </tspan>
                  ))}
                </text>
                <rect
                  x={k.mocX[j]}
                  y={k.y + k.yChuSo}
                  width={rongO}
                  height={CAO_CHU_SO}
                  rx="8"
                  fill={c === hi ? PALETTE.amberSoft : PALETTE.paper}
                  stroke={c === hi ? PALETTE.amber : PALETTE.grid}
                  strokeWidth={c === hi ? 3 : 2}
                />
                <text
                  x={giua}
                  y={k.y + k.yChuSo + 33 + 12}
                  textAnchor="middle"
                  fontSize="34"
                  fontWeight="800"
                  fill={c === hi ? PALETTE.amber : PALETTE.ink}
                >
                  {ds[c] ?? "–"}
                </text>
              </g>
            );
          }),
        )}
      </svg>
      {label && <span style={caption}>{label}</span>}
    </div>
  );
}

/* ─────────────────────────────── THƯỚC ĐO ───────────────────────────────
 * Dạy đo độ dài lớp 1–3. Vẽ vạch cm (và nửa cm), có thể khoanh đoạn đang đo.
 *   ruler: { lengthCm = 10, measure: { from: 0, to: 6 }, unit = "cm", label }
 */
export function Ruler({
  lengthCm = 10,
  measure = null,
  unit = "cm",
  label = "",
}) {
  const L = clamp(num(lengthCm, 10), 2, 30);
  /**
   * Số đơn vị viewBox cho mỗi cm — chọn để THƯỚC 30 cm (ca thật ở bài `g2-c11-l2`)
   * vẫn nằm trong `VUA_HINH`. Bản cũ dùng `520 / L` ⇒ thước 30 cm rộng **584 đơn vị**
   * và phải kéo ngang trên điện thoại.
   */
  const pxPerCm = clamp(296 / L, 11, 40);
  const W = Math.round(L * pxPerCm + 44);
  const H = 108;
  const y = 52;
  /**
   * Nhãn cm nào đủ chỗ thì vẽ. Thước 30 cm với 11 đơn vị mỗi cm không thể hiện đủ 31 con số
   * (mỗi số 2 chữ số đã ~17 đơn vị) ⇒ vẽ cách quãng. Vạch 0 và vạch cuối LUÔN được vẽ.
   */
  const nhanMoi = Math.max(1, Math.ceil(18 / pxPerCm));
  const mFrom = measure ? clamp(num(measure.from, 0), 0, L) : null;
  const mTo = measure ? clamp(num(measure.to, 0), 0, L) : null;
  /**
   * 🔴 NHÃN ĐƠN VỊ "cm" PHẢI NẰM CAO HƠN HÀNG SỐ. Bản cũ đặt chữ "cm" ở `y + 22` còn dãy
   * số ở `y + 30` — cách nhau 8 đơn vị trong khi chữ cao ~14 ⇒ **"cm" đè lên số cuối**
   * (đo được 9–13 px chồng nhau ở 6 bài: `g2-c5-l4`, `g3-c3-l1`, `g4-c5-l4`…). Khó thấy vì
   * "cm" màu hổ phách còn số màu mực. Nay "cm" nằm TRÊN thước, và vạch đo cũng nhấc lên
   * để chỗ cho nó.
   */
  const yDonVi = y - 6;
  const yDauDo = y - 22;
  const yChuDo = y - 30;

  return (
    <div style={card}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        {...svgFit(W)}
        role="img"
        aria-label="Thước đo"
      >
        <rect
          x="16"
          y={y}
          width={L * pxPerCm + 12}
          height="34"
          rx="5"
          fill="#fdf6e3"
          stroke={PALETTE.amber}
          strokeWidth="2.5"
        />
        {Array.from({ length: L * 2 + 1 }).map((_, i) => {
          const half = i % 2 === 1;
          const cm = i / 2;
          const X = 22 + cm * pxPerCm;
          return (
            <g key={i}>
              <line
                x1={X}
                y1={y}
                x2={X}
                y2={y + (half ? 9 : 16)}
                stroke={PALETTE.ink}
                strokeWidth={half ? 1.2 : 2}
              />
              {!half && (cm % nhanMoi === 0 || cm === L) && (
                <text
                  x={X}
                  y={y + 30}
                  textAnchor="middle"
                  fontSize="14"
                  fontWeight="700"
                  fill={PALETTE.ink}
                >
                  {cm}
                </text>
              )}
            </g>
          );
        })}
        <text
          x={W - 30}
          y={yDonVi}
          textAnchor="middle"
          fontSize="14"
          fontWeight="800"
          fill={PALETTE.amber}
        >
          {unit}
        </text>

        {mFrom !== null && mTo !== null && mTo !== mFrom && (
          <g>
            <line
              x1={22 + mFrom * pxPerCm}
              y1={yDauDo}
              x2={22 + mTo * pxPerCm}
              y2={yDauDo}
              stroke={PALETTE.rose}
              strokeWidth="5"
              strokeLinecap="round"
            />
            <text
              x={22 + ((mFrom + mTo) / 2) * pxPerCm}
              y={yChuDo}
              textAnchor="middle"
              fontSize="15"
              fontWeight="800"
              fill={PALETTE.rose}
            >
              {Math.round((mTo - mFrom) * 10) / 10} {unit}
            </text>
          </g>
        )}
      </svg>
      {label && <span style={caption}>{label}</span>}
    </div>
  );
}

/* ─────────────────────────────── TIỀN VIỆT NAM ───────────────────────────────
 * Lớp 2 (CĐ 11) và lớp 3 (CĐ 13) có hẳn bài về tiền.
 *   money: { notes: [20000, 5000, 2000], label }
 */
const NOTE_STYLE = {
  500: { bg: "#fee2e2", bd: "#dc2626" },
  1000: { bg: "#ede9fe", bd: "#7c3aed" },
  2000: { bg: "#fce7f3", bd: "#db2777" },
  5000: { bg: "#fef3c7", bd: "#d97706" },
  10000: { bg: "#dcfce7", bd: "#16a34a" },
  20000: { bg: "#dbeafe", bd: "#2563eb" },
  50000: { bg: "#e0e7ff", bd: "#4f46e5" },
  100000: { bg: "#ccfbf1", bd: "#0d9488" },
  200000: { bg: "#ffe4e6", bd: "#e11d48" },
  500000: { bg: "#f3e8ff", bd: "#9333ea" },
};

export function Money({ notes = [20000, 5000], label = "" }) {
  const ds = (Array.isArray(notes) ? notes : [])
    .map((n) => num(n, 0))
    .filter((n) => n > 0)
    .slice(0, 6);
  const shown = ds.length ? ds : [20000];
  const total = shown.reduce((s, n) => s + n, 0);
  const thousands = (n) =>
    n >= 1000 ? `${(n / 1000).toLocaleString("vi-VN")} 000` : `${n}`;

  return (
    <div style={card}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 10,
          justifyContent: "center",
        }}
      >
        {shown.map((n, i) => {
          const st = NOTE_STYLE[n] || { bg: "#f1f5f9", bd: PALETTE.line };
          return (
            <div
              key={i}
              style={{
                background: st.bg,
                border: `2.5px solid ${st.bd}`,
                borderRadius: 12,
                padding: "12px 16px",
                minWidth: 116,
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontSize: 17,
                  fontWeight: 800,
                  color: st.bd,
                  whiteSpace: "nowrap",
                }}
              >
                {thousands(n)}
              </div>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: st.bd,
                  opacity: 0.85,
                }}
              >
                đồng
              </div>
            </div>
          );
        })}
      </div>
      <span style={caption}>
        Tổng: <b>{total.toLocaleString("vi-VN")} đồng</b>
        {label ? ` · ${label}` : ""}
      </span>
    </div>
  );
}

/* ─────────────────────────────── BẢNG SỐ LIỆU / BẢNG ĐƠN VỊ ───────────────────────────────
 * Lớp 2–5: biểu đồ tranh quy về bảng số liệu, bảng đơn vị đo, bảng thống kê.
 *   table: { headers: ["Đối tượng","Số lượng"], rows: [["Bóng đá", 12], ["Cầu lông", 8]], label }
 */
/**
 * Ngắt một chuỗi thành nhiều dòng vừa bề rộng ô.
 *
 * 🔴 VÌ SAO PHẢI TỰ NGẮT: SVG KHÔNG có tính năng tự xuống dòng như HTML — thẻ `<text>`
 * vẽ một dòng thẳng, chữ dài thì tràn ra ngoài ô và ĐÈ LÊN ô bên cạnh. Đã ĐO được thật
 * ở bài `g5-c4-l6`: ô "khoảng cách ban đầu : (v1 + v2)" dài ~33 ký tự, vẽ trong ô rộng
 * 132 px nên chữ chồng lên cột kế tiếp, không đọc được. Trước đó bảng luôn dùng bề rộng
 * cột CỐ ĐỊNH 132 px cho mọi nội dung, nên bảng nào có chữ dài cũng hỏng.
 *
 * Từ dài hơn cả ô (ví dụ tên không có dấu cách) thì cắt cứng để không tràn ra ngoài.
 */
function bocChu(giaTri, soKyTu) {
  const raw = String(giaTri ?? "")
    .replace(/\s+/g, " ")
    .trim();
  if (!raw) return [""];
  const gioiHan = Math.max(4, soKyTu);
  const dong = [];
  let cur = "";
  for (let tu of raw.split(" ")) {
    while (tu.length > gioiHan) {
      if (cur) {
        dong.push(cur);
        cur = "";
      }
      dong.push(tu.slice(0, gioiHan));
      tu = tu.slice(gioiHan);
    }
    const thu = cur ? `${cur} ${tu}` : tu;
    if (thu.length <= gioiHan) cur = thu;
    else {
      if (cur) dong.push(cur);
      cur = tu;
    }
  }
  if (cur) dong.push(cur);
  return dong.length ? dong : [""];
}

// Ước lượng bề rộng 1 ký tự ở cỡ chữ 15 đậm 700 (đủ dùng cho tiếng Việt có dấu).
const RONG_KY_TU = 7.6;
const LOT_O = 10; // lề trong mỗi ô
const CAO_DONG = 18;
/**
 * 🔴 CỘT HẸP NHẤT = 46 (bản cũ: 78).
 * Ở 78, bảng 10 cột ("Bảng các số 1→50", bài `g1-c6-l9`) rộng **792 đơn vị** và bảng chữ
 * số La Mã 12 cột (bài `g3-c8-l6`) rộng **948** — cả hai buộc bé kéo ngang trên điện thoại.
 * 46 đủ cho "VIII" hoặc "50" ở cỡ chữ 15 cộng lề hai bên.
 */
const COT_MIN = 46;
const COT_MAX = 300;
/**
 * 🔴 KHE GIỮA CÁC HÀNG. Bản cũ cộng dồn y liền mạch nên hàng tiêu đề CHẠM hàng đầu
 * tiên (không khe nào), trong khi giữa các CỘT lại có khe 4 — nhìn lệch và như dính.
 */
const KHE_HANG = 4;

/**
 * Chia các cột thành NHIỀU KHỐI xếp chồng, mỗi khối nằm gọn trong `nganSach` đơn vị.
 *
 * 🔴 VÌ SAO PHẢI CẮT KHỐI: bảng 12 cột (chữ số La Mã I…XII) và bảng 10 cột không thể thu
 * hẹp thêm — cột hẹp nhất là 46 đơn vị, 12 cột đã 552, mà thẻ hình trên điện thoại chỉ cho
 * ~380. Trước đây hình phải kéo ngang; nay cắt thành hai khối 6 + 6 xếp dọc, khối rộng nhất
 * chỉ còn 276 đơn vị.
 *
 * Ưu tiên SỐ KHỐI ÍT NHẤT: lấy `ceil(tổng / ngân sách)` khối rồi chia cột cho đều. Nếu cách
 * chia đều vẫn có khối vượt ngân sách (các cột rộng hẹp khác nhau) thì giảm dần số cột/khối.
 */
function chiaKhoi(rongCot, nganSach) {
  const n = rongCot.length;
  if (!n) return 1;
  const tong = rongCot.reduce((a, w) => a + w, 0);
  let moiKhoi = Math.ceil(n / Math.max(1, Math.ceil(tong / nganSach)));
  const vua = (p) => {
    for (let i = 0; i < n; i += p) {
      if (rongCot.slice(i, i + p).reduce((a, w) => a + w, 0) > nganSach)
        return false;
    }
    return true;
  };
  while (moiKhoi > 1 && !vua(moiKhoi)) moiKhoi--;
  return moiKhoi;
}

export function Table({ headers = [], rows = [], label = "" }) {
  const hs = Array.isArray(headers) ? headers : [];
  const rs = Array.isArray(rows) ? rows : [];
  const soCot = Math.max(
    hs.length,
    ...rs.map((r) => (Array.isArray(r) ? r.length : 0)),
    1,
  );

  // Bề rộng mỗi cột = vừa đủ cho nội dung DÀI NHẤT của cột đó (trong khoảng cho phép).
  const beRongCot = Array.from({ length: soCot }, (_, c) => {
    let dai = String(hs[c] ?? "").length;
    for (const r of rs) {
      const o = Array.isArray(r) ? r : [r];
      dai = Math.max(dai, String(o[c] ?? "").length);
    }
    return clamp(Math.round(dai * RONG_KY_TU) + LOT_O * 2, COT_MIN, COT_MAX);
  });

  const soCotMoiKhoi = chiaKhoi(beRongCot, VUA_HINH - 12);
  const KHE_KHOI = 22;

  const khoi = [];
  let yKhoi = 0;
  for (let i0 = 0; i0 < soCot; i0 += soCotMoiKhoi) {
    const cot = [];
    for (let c = i0; c < Math.min(i0 + soCotMoiKhoi, soCot); c++) cot.push(c);

    const mocX = [];
    let chay = 6;
    for (const c of cot) {
      mocX.push(chay);
      chay += beRongCot[c];
    }

    const gioiHan = cot.map((c) =>
      Math.floor((beRongCot[c] - LOT_O * 2) / RONG_KY_TU),
    );
    const hang = [];
    hang.push({
      o: cot.map((c, j) => bocChu(hs[c], gioiHan[j])),
      dauBang: true,
    });
    for (const r of rs) {
      const o = Array.isArray(r) ? r : [r];
      hang.push({
        o: cot.map((c, j) => bocChu(o[c], gioiHan[j])),
        dauBang: false,
      });
    }

    // Mỗi dòng cao theo ô có nhiều dòng chữ nhất.
    const caoHang = hang.map(
      (h) => Math.max(...h.o.map((d) => d.length)) * CAO_DONG + LOT_O * 2,
    );
    let y = 6;
    const hangVe = hang.map((h, i) => {
      const node = { ...h, y, cao: caoHang[i] };
      y += caoHang[i] + KHE_HANG;
      return node;
    });
    const cao = y - KHE_HANG + 6; // bỏ khe cuối, cộng lề dưới

    khoi.push({ cot, mocX, hangVe, rong: chay + 6, y: yKhoi, cao });
    yKhoi += cao + KHE_KHOI;
  }

  const W = Math.max(...khoi.map((k) => k.rong));
  const H = yKhoi - KHE_KHOI + 6;

  return (
    <div style={card}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        {...svgFit(W)}
        role="img"
        aria-label="Bảng số liệu"
      >
        {khoi.map((k, ki) =>
          k.hangVe.map((h, ri) =>
            h.o.map((dong, j) => {
              const x = k.mocX[j];
              const rong = beRongCot[k.cot[j]] - 4;
              const giua = x + rong / 2;
              const yHang = k.y + h.y;
              const yDongDau =
                yHang + h.cao / 2 - ((dong.length - 1) * CAO_DONG) / 2 + 5;
              return (
                <g key={`${ki}-${ri}-${j}`}>
                  <rect
                    x={x}
                    y={yHang}
                    width={rong}
                    height={h.cao}
                    rx={h.dauBang ? 7 : 6}
                    fill={
                      h.dauBang
                        ? PALETTE.greenSoft
                        : ri % 2
                          ? "#f8fafc"
                          : PALETTE.paper
                    }
                    stroke={h.dauBang ? PALETTE.green : PALETTE.grid}
                    strokeWidth={h.dauBang ? 2 : 1.6}
                  />
                  <text
                    x={giua}
                    y={yDongDau}
                    textAnchor="middle"
                    fontSize={h.dauBang ? 14 : 15}
                    fontWeight={h.dauBang ? 800 : 700}
                    fill={h.dauBang ? PALETTE.green : PALETTE.ink}
                  >
                    {dong.map((ln, li) => (
                      <tspan key={li} x={giua} dy={li === 0 ? 0 : CAO_DONG}>
                        {ln}
                      </tspan>
                    ))}
                  </text>
                </g>
              );
            }),
          ),
        )}
      </svg>
      {label && <span style={caption}>{label}</span>}
    </div>
  );
}
