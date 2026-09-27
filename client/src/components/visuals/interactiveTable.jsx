/**
 * BẢNG TÍNH — BẢNG CÓ Ô TRỐNG BÉ ĐIỀN ĐƯỢC (slide bài học + Luyện tập).
 *
 * 🔴 VÌ SAO CÓ FILE NÀY (yêu cầu người dùng 2026-09-25):
 *   “tất cả các dạng bài có điền vào ô trống KHÔNG được là slide tĩnh và đều có thể điền
 *    đáp án vào được; đảm bảo tất cả các dạng bài tập đều có đáp án để trẻ lựa chọn và
 *    tương tác”.
 *   Bản đầu tôi làm dang dạng `table` (bảng chỉ để NHÌN, ô `?` in cứng) — trẻ không bấm được
 *   gì. Nay dùng đúng bộ máy tương tác có sẵn (`useFillSlots` + `slotLook` + `FillBar`):
 *   bé bấm ô `?`, chọn số ở dải nút, app chấm NGAY (đúng → ô xanh, sai → ô đỏ, thử lại được),
 *   có đếm tiến độ và nút “Làm lại”.
 *
 * ⚠️ LUẬT REACT: `useFillSlots` PHẢI gọi ở đầu component, không gọi trong nhánh `if`
 * (xem ghi chú đầu `interactiveFill.jsx`).
 *
 * ⚠️ HỢP ĐỒNG DỮ LIỆU (có công cụ soát `scratch/soat-o-trong.mjs`):
 *   `rows`     — mảng các hàng; ô có giá trị = IN SẴN, ô `null` = Ô TRỐNG cần bé điền.
 *   `answers`  — đáp án của TỪNG ô trống, theo thứ tự đọc (trái → phải, trên → dưới).
 *                `answers.length` PHẢI bằng số ô `null` (sai số lượng thì bảng tự về dạng
 *                tĩnh để không sập, và công cụ soát sẽ báo lỗi dữ liệu).
 */

import { useEffect, useState } from "react";

import {
  useFillSlots,
  slotLook,
  FillBar,
  useInteractive,
} from "./interactiveFill";
import { CARD_STYLE, CAPTION_STYLE, svgFit, ngatDong } from "./visualTheme";
// Dùng CHUNG luật căn lề cột với bảng tĩnh (`CoreVisuals.Table`) — một luật, hai bộ vẽ.
import { columnAnchor } from "./tableAlignment";

const P = {
  ink: "#1e293b",
  soft: "#64748b",
  grid: "#e2e8f0",
  violet: "#7c3aed",
  paper: "#ffffff",
  head: "#4c1d95",
  headSoft: "#ede9fe",
};

const card = CARD_STYLE;
const caption = CAPTION_STYLE;
const _num = (v, fb) => (Number.isFinite(Number(v)) ? Number(v) : fb);

export function BangTinh({
  headers = ["Phép tính", "Kết quả"],
  rows = [],
  answers = [],
  options = [],
  label = "",
  title = "Bé chọn số điền vào ô ?",
  hint = "Ô viền đứt là chỗ bé điền. Ô đỏ là chưa đúng — bé thử lại nhé.",
  onDone,
}) {
  const interactive = useInteractive();
  const hang = Array.isArray(rows) ? rows : [];
  const soOTong = hang.reduce(
    (a, r) => a + (Array.isArray(r) ? r.filter((c) => c === null).length : 0),
    0,
  );
  const dungHopDong = Array.isArray(answers) && answers.length === soOTong;
  const dapAn = dungHopDong ? answers : [];

  const fill = useFillSlots(dapAn);
  const [reported, setReported] = useState(false);

  /** Bàn giao cho trang Luyện tập (nếu có) — PHẢI trong `useEffect`, xem `interactiveDotCards`. */
  useEffect(() => {
    if (dungHopDong && fill.done && !reported && typeof onDone === "function") {
      setReported(true);
      onDone();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fill.done, dungHopDong]);

  const _soCot = Math.max(2, headers.length);
  // 🔴 ĐO ĐƯỢC (2026-09-26): khung 340 trong thẻ ~306 px ⇒ tỉ lệ 0,9 ⇒ hàng cao 28 đơn vị
  // chỉ còn ~18 px, ô “?” bấm không nổi và chữ bé hơn hẳn dãy nút (nút 44–50 px).
  // Nay khung hẹp lại (300) để tự phóng to + hàng cao 52 ⇒ ô “?” ≈ 45 px, chữ 19 đơn vị ≈ 19 px.
  //
  // ⚠️ ĐỪNG "cho đồng bộ" mà giãn khung như bảng TĨNH (`Table` nay giãn tới 368): bảng này
  // có Ô BẤM ĐƯỢC, kích thước ô tính theo đơn vị viewBox rồi nhân tỉ lệ. Khung 368 làm tỉ lệ
  // trên điện thoại tụt còn 283/368 = 0,77 ⇒ hàng 56 đơn vị chỉ còn ~43 px, HỤT chuẩn vùng
  // chạm 44 px của trẻ. Giãn cho đẹp mà bấm không nổi là đánh đổi sai.
  const W = 300;
  const le = 12;
  const rongBang = W - le * 2;
  const rongCot0 = Math.round(rongBang * 0.58);
  const rongCot1 = rongBang - rongCot0;
  // Cùng luật căn lề với bảng tĩnh: cột NHÃN là chữ thì căn trái, là giá trị thì căn giữa.
  const leCot0 = columnAnchor(hang, 0);

  /* ── NGẮT DÒNG NHÃN — SVG KHÔNG tự xuống dòng, mà cột nhãn chỉ rộng 174 đơn vị.
     🔴 ĐÃ ĐO trên trang `scratch/visual-fit.html`:
        • nhãn "Số gồm 3 chục và 7 đơn vị" rộng **234 đơn vị** ⇒ tràn sang cột đáp án
          (3 cặp chữ chồng nhau ở `g1-c6-l4`);
        • tiêu đề "Mấy chữ số ở phần thập phân" rộng **261 đơn vị** (1 cặp ở `g5-c2-l1`).
     ⚠️ ĐỔI CĂN LỀ KHÔNG CHỮA ĐƯỢC lỗi này (đã thử: căn giữa thì hết chồng ở `g1-c6-l4` nhưng
     vẫn chồng ở `g5-c2-l1`, và lại quay về kiểu "thụt ra thụt vào" người dùng đã báo).
     Đúng cách là NGẮT DÒNG, và cột hẹp quá thì HẠ CỠ CHỮ tiêu đề. */
  const soKyTuVua = (rong, coChu) =>
    Math.max(6, Math.floor((rong - 14) / (coChu * 0.54)));

  /**
   * Một cỡ chữ cho CẢ HAI tiêu đề cột (hai cỡ khác nhau nhìn lệch). Thang cỡ chữ đi TỪNG bậc
   * vì cột nhãn chỉ rộng 174 đơn vị mà tiêu đề thật hay sát ngưỡng: "Đọc chục và đơn vị" (18 ký tự)
   * ở cỡ 18 cần 175 đơn vị — **hụt đúng 1 đơn vị** nên bị ngắt thành "vị" một dòng riêng; hạ xuống
   * cỡ 16 thì vừa một dòng. Ưu tiên 1–2 dòng, chỉ nhận 3 dòng khi không còn cách nào.
   */
  const chonTieuDe = () => {
    const thu = (co) => ({
      co,
      d0: ngatDong(headers[0], soKyTuVua(rongCot0, co)),
      d1: ngatDong(headers[1] ?? "", soKyTuVua(rongCot1, co)),
    });
    const ung = [18, 17, 16, 15, 14, 13].map(thu);
    const soDong = (x) => Math.max(x.d0.length, x.d1.length);
    // Ít dòng nhất trước (một tiêu đề gãy làm đôi ở chữ "vị" trông rất vụn), rồi mới tới cỡ chữ LỚN nhất
    // đạt được số dòng đó. Không bao giờ hạ cỡ chữ chỉ để được nhiều dòng hơn.
    const itNhat = Math.min(...ung.map(soDong));
    return ung.find((x) => soDong(x) === itNhat);
  };
  const { co: coChuDau, d0: dongDau0, d1: dongDau1 } = chonTieuDe();
  const dongNhan = hang.map((r) =>
    ngatDong(String(r[0] ?? ""), soKyTuVua(rongCot0, 19)),
  );
  const CAO_DONG = 20;
  const soDongDau = Math.max(dongDau0.length, dongDau1.length);
  const soDongNhan = Math.max(1, ...dongNhan.map((d) => d.length));
  const caoDau = 12 + soDongDau * CAO_DONG; // 1 dòng ⇒ 32 đơn vị (bản cũ: 34)
  // 56 đơn vị ⇒ ô “?” cao 46 đơn vị ≈ **47 px** (đo bằng `scratch/do-can-doi-hinh.mjs`);
  // để 52 thì chỉ được 42,8 px — dưới chuẩn vùng chạm 44 px của trẻ. Nhãn 2 dòng vẫn vừa 56.
  const caoHang = Math.max(56, soDongNhan * CAO_DONG + 16);
  const H = caoDau + hang.length * caoHang + 10;

  let k = -1; // đếm ô trống theo thứ tự đọc

  return (
    <div style={card}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        {...svgFit(W)}
        role="img"
        aria-label={headers.join(" và ")}
      >
        {/* Dải tiêu đề */}
        <rect
          x={le}
          y="4"
          width={rongBang}
          height={caoDau}
          rx="8"
          fill={P.headSoft}
        />
        <text
          x={leCot0 === "start" ? le + 10 : le + rongCot0 / 2}
          y={4 + caoDau / 2 - ((dongDau0.length - 1) * CAO_DONG) / 2 + 6}
          textAnchor={leCot0}
          fontSize={coChuDau}
          fontWeight="800"
          fill={P.head}
        >
          {dongDau0.map((dong, i) => (
            <tspan
              key={i}
              x={leCot0 === "start" ? le + 10 : le + rongCot0 / 2}
              dy={i === 0 ? 0 : CAO_DONG}
            >
              {dong}
            </tspan>
          ))}
        </text>
        <text
          x={le + rongCot0 + rongCot1 / 2}
          y={4 + caoDau / 2 - ((dongDau1.length - 1) * CAO_DONG) / 2 + 6}
          textAnchor="middle"
          fontSize={coChuDau}
          fontWeight="800"
          fill={P.head}
        >
          {dongDau1.map((dong, i) => (
            <tspan
              key={i}
              x={le + rongCot0 + rongCot1 / 2}
              dy={i === 0 ? 0 : CAO_DONG}
            >
              {dong}
            </tspan>
          ))}
        </text>

        {hang.map((r, i) => {
          const y = 4 + caoDau + i * caoHang;
          return (
            <g key={i}>
              <rect
                x={le}
                y={y}
                width={rongBang}
                height={caoHang}
                fill={i % 2 ? "#f8fafc" : P.paper}
                stroke={P.grid}
                strokeWidth="1"
              />
              <line
                x1={le + rongCot0}
                y1={y}
                x2={le + rongCot0}
                y2={y + caoHang}
                stroke={P.grid}
                strokeWidth="1"
              />
              <text
                x={leCot0 === "start" ? le + 10 : le + rongCot0 / 2}
                y={
                  y +
                  caoHang / 2 -
                  ((dongNhan[i].length - 1) * CAO_DONG) / 2 +
                  6
                }
                textAnchor={leCot0}
                fontSize="19"
                fontWeight="700"
                fill={P.ink}
              >
                {dongNhan[i].map((dong, li) => (
                  <tspan
                    key={li}
                    x={leCot0 === "start" ? le + 10 : le + rongCot0 / 2}
                    dy={li === 0 ? 0 : CAO_DONG}
                  >
                    {dong}
                  </tspan>
                ))}
              </text>
              {(() => {
                const cell = r[1];
                const cy = y + caoHang / 2;
                if (cell !== null)
                  return (
                    <text
                      x={le + rongCot0 + rongCot1 / 2}
                      y={cy + 6}
                      textAnchor="middle"
                      fontSize="19"
                      fontWeight="800"
                      fill={P.ink}
                    >
                      {String(cell ?? "")}
                    </text>
                  );
                k += 1;
                const oTrong = k;
                const laODangLam = interactive && dungHopDong;
                const look = laODangLam
                  ? slotLook(fill, oTrong)
                  : {
                      fill: "#fffbeb",
                      stroke: "#f59e0b",
                      color: "#b45309",
                      dash: true,
                    };
                const hien =
                  laODangLam && fill.picked[oTrong] !== null
                    ? String(fill.picked[oTrong])
                    : "?";
                return (
                  <g
                    onClick={() => laODangLam && fill.setActive(oTrong)}
                    style={{ cursor: laODangLam ? "pointer" : "default" }}
                  >
                    <rect
                      x={le + rongCot0 + 8}
                      y={y + 5}
                      width={rongCot1 - 16}
                      height={caoHang - 10}
                      rx="9"
                      fill={look.fill}
                      stroke={look.stroke}
                      strokeWidth="2.4"
                      strokeDasharray={look.dash ? "6 4" : undefined}
                    />
                    <text
                      x={le + rongCot0 + rongCot1 / 2}
                      y={cy + 8}
                      textAnchor="middle"
                      fontSize="24"
                      fontWeight="900"
                      fill={look.color}
                    >
                      {hien}
                    </text>
                  </g>
                );
              })()}
            </g>
          );
        })}
        <rect
          x={le}
          y="4"
          width={rongBang}
          height={caoDau + hang.length * caoHang}
          rx="8"
          fill="none"
          stroke="#c7d2fe"
          strokeWidth="1.6"
        />
      </svg>

      {interactive && dungHopDong ? (
        <FillBar
          fill={fill}
          options={options.length ? options : [1, 2, 3, 4, 5]}
          title={title}
          hint={hint}
        />
      ) : (
        label && <span style={{ ...caption, color: P.ink }}>{label}</span>
      )}
      {interactive && dungHopDong && label && (
        <span style={{ ...caption, color: P.soft, marginTop: 4 }}>
          {ngatDong(label, 46)[0]}
        </span>
      )}
    </div>
  );
}

export default BangTinh;
