/**
 * DẠNG BÀI “GHÉP THẺ THÀNH PHÉP TÍNH ĐÚNG” — lấy ý từ Duolingo Math (ảnh người dùng gửi
 * 2026-09-28: `100 = ☐ ☐` với các thẻ “×”, “25”, “4”, “5”, “20”).
 *
 * VÌ SAO CẦN: đây là dạng “điền số/dấu vào ô trống” của chương trình nhưng KHÁC hẳn `bangTinh`/`cotTinh`:
 *   • bé không bị ép điền một số đúng duy nhất — bé TỰ CHỌN các thẻ để tạo ra một biểu thức đúng;
 *   • MỘT SỐ HOẶC MỘT DẤU MỘT THẺ (`"25"`, `"×"`), không bao giờ dính nhau kiểu `"25 ×"` —
 *     dính nhau thì bé hết đường ghép `4 × 25`, tức là “nhiều cách đúng” chỉ còn trên giấy;
 *   • chấm theo GIÁ TRỊ (`matchesTarget`) nên `25 × 4` và `4 × 25` đều đúng — không phải kê
 *     từng hoán vị vào `solutions` (kê thiếu một hoán vị là bé làm đúng mà bị báo sai);
 *   • có thẻ NHIỄU (số/dấu không dùng được) nên bé phải thật sự tính, không đoán.
 *
 * Dữ liệu: `{ question, target, slots, tiles: [...], solutions: [[...], ...], mascotHint }`
 *   • `tiles` — các thẻ trong khay; mỗi thẻ là MỘT số (`"25"`, `"1 000"`, `"0,5"`) hoặc MỘT
 *     dấu (`"+"`, `"−"`, `"×"`, `":"`). Cổng soạn bài chặn thẻ trộn số với dấu.
 *   • `solutions` — các cách đúng để CỔNG KIỂM (mỗi cách phải tính ra đúng `target`), không dùng
 *     khi chấm.
 *
 * BỐ CỤC theo ảnh Duolingo (người dùng gửi): (1) hàng đại diện `1 000 = [hộp]` — hộp chỉ là
 * khung MẪU, luôn để trống; (2) hàng Ô TRỐNG nằm DƯỚI, mỗi số/ký tự một ô — đây mới là chỗ hiện
 * số/ký tự bé đã chọn; (3) khay thẻ; (4) nút KIỂM TRA. Bấm thẻ để đặt vào ô trống đầu tiên;
 * bấm ô đã có thẻ để trả thẻ về khay.
 */
import { useState } from "react";
import { motion } from "framer-motion";
import { RotateCcw, Volume2 } from "lucide-react";
import speechHelper from "../../utils/speechHelper";
import { matchesTarget, oTrongDauTien, demODaDien } from "./answerLogic.js";

export function BuildExpressionSlide({ content, onDone }) {
  const slots = Number(content.slots) || 3;
  const tiles = content.tiles || [];

  /** Mỗi ô là `null` (trống) hoặc chỉ số thẻ trong khay — dùng chỉ số để hai thẻ giống nhau
   *  (ví dụ hai thẻ “10”) vẫn là hai vật khác nhau, trẻ bấm cái nào cũng được. */
  const [oDaDien, setODaDien] = useState(() => Array(slots).fill(null));
  const [daCham, setDaCham] = useState(false);
  const [dung, setDung] = useState(false);
  const [soLanSai, setSoLanSai] = useState(0);

  const daDungThe = new Set(oDaDien.filter((x) => x !== null));
  const soODaDien = demODaDien(oDaDien);
  const duODien = soODaDien === slots;

  const datThe = (iThe) => {
    if (daCham || daDungThe.has(iThe)) return;
    const viTri = oTrongDauTien(oDaDien);
    if (viTri < 0) return;
    const moi = [...oDaDien];
    moi[viTri] = iThe;
    setODaDien(moi);
  };

  const boThe = (viTri) => {
    if (daCham) return;
    const moi = [...oDaDien];
    moi[viTri] = null;
    setODaDien(moi);
  };

  /**
   * CHẤM — bé bấm KIỂM TRA, không tự chấm khi vừa điền hết ô.
   * Ảnh Duolingo có hẳn nút `KIỂM TRA` ở dưới cùng: điền xong bé vẫn kịp nhìn lại, sửa, rồi mới
   * chấm. (Bản trước tôi tự chấm ngay khi đủ ô — tiện nhưng lấy mất bước "xem lại".)
   */
  const kiemTra = () => {
    if (daCham || !duODien) return;
    const chuoi = oDaDien.map((i) => tiles[i]);
    const ok = matchesTarget(chuoi, content.target);
    setDaCham(true);
    setDung(ok);
    if (!ok) setSoLanSai((n) => n + 1);
    onDone?.({
      isCorrect: ok,
      bieuThuc: chuoi,
      soLanSai: soLanSai + (ok ? 0 : 1),
    });
  };

  const lamLai = () => {
    setODaDien(Array(slots).fill(null));
    setDaCham(false);
    setDung(false);
  };

  return (
    <div className="slide-quiz-card build-expr-card">
      <div className="quiz-header-banner">
        <span className="quiz-badge">🧩 Ghép thẻ thành phép tính đúng</span>
        <div className="quiz-header-actions">
          {daCham && !dung && (
            <button
              type="button"
              className="quiz-speak-btn"
              onClick={lamLai}
              title="Làm lại"
            >
              <RotateCcw size={18} />
            </button>
          )}
          <button
            type="button"
            className="quiz-speak-btn"
            onClick={() => speechHelper.speak(content.question)}
            title="Nghe đọc câu hỏi"
          >
            <Volume2 size={18} />
          </button>
        </div>
      </div>

      <h2 className="quiz-question">{content.question}</h2>

      {/* (1) HÀNG ĐẠI DIỆN — `1 000 = [ hộp ]`. Dùng CHUNG khung `.expr-frame` với hai dạng
       * “nhập kết quả” và “trục số” — ba dạng bài cùng một khung, sửa một chỗ là cả ba cùng đúng.
       * Hộp chỉ là khung MẪU, luôn để trống; số/ký tự bé chọn hiện ở HÀNG Ô bên dưới. */}
      <div className="expr-frame">
        <span className="expr-text">{content.target} =</span>
        <span className="expr-box" aria-hidden="true" />
      </div>

      {/* (2) HÀNG Ô TRỐNG — mỗi số/ký tự cần điền là MỘT ô. Bấm ô đã có thẻ để trả thẻ về khay. */}
      <div className="build-expr-slots">
        {oDaDien.map((iThe, i) => (
          <button
            key={i}
            type="button"
            className={`build-expr-slot ${iThe === null ? "is-empty" : ""} ${
              daCham ? (dung ? "is-correct" : "is-wrong") : ""
            }`}
            onClick={() => boThe(i)}
            disabled={daCham || iThe === null}
          >
            {iThe === null ? "" : tiles[iThe]}
          </button>
        ))}
      </div>

      {/* (3) KHAY THẺ — bấm thẻ để đặt vào ô trống đầu tiên.
       * Thẻ đã dùng thành Ô XÁM TRỐNG (như ảnh Duolingo): khay không nhảy chỗ, bé thấy ngay
       * thẻ nào đã tiêu. Chữ không hiện nữa nhưng VỊ TRÍ và KÍCH THƯỚC giữ nguyên. */}
      <div className="build-expr-bank">
        {tiles.map((t, i) => {
          const daDung = daDungThe.has(i);
          return (
            <button
              key={`${i}-${t}`}
              type="button"
              className={`build-expr-tile ${daDung ? "is-used" : ""}`}
              onClick={() => datThe(i)}
              disabled={daCham || daDung}
              aria-label={daDung ? "Thẻ đã dùng" : t}
            >
              {daDung ? "" : t}
            </button>
          );
        })}
      </div>

      {/* (4) NÚT KIỂM TRA — chỉ bấm được khi đã điền đủ ô (như ảnh Duolingo). */}
      <button
        type="button"
        className="quiz-check-btn build-expr-check"
        onClick={kiemTra}
        disabled={!duODien || daCham}
      >
        KIỂM TRA
      </button>

      {daCham && (
        <div
          className={`quiz-feedback quiz-feedback-${dung ? "correct" : "wrong"}`}
        >
          <span>
            {dung
              ? "🎉 Tuyệt vời! Bé ghép đúng rồi."
              : `😅 ${content.mascotHint || "Thử lại nhé — bấm nút làm lại để xếp lại thẻ."}`}
          </span>
        </div>
      )}

      {!daCham && (
        <p className="build-expr-hint">
          Bấm thẻ để đặt vào ô trống · bấm vào ô để trả thẻ về khay
        </p>
      )}
    </div>
  );
}
