/**
 * Ô ĐIỀN TƯƠNG TÁC — logic + thanh chọn, dùng CHUNG cho mọi hình có ô “?”.
 *
 * 🔴 VÌ SAO CÓ FILE NÀY. Các slide “điền dấu vào ô trống” trước đây chỉ là HÌNH ĐỂ NHÌN:
 * chú thích ghi “bé tự điền dấu” nhưng giao diện **không có chỗ nào bấm** — trẻ không biết
 * thao tác thế nào (người dùng hỏi 2026-09-24). Nay bé BẤM vào ô “?”, chọn dấu, app chấm
 * NGAY: đúng thì ô xanh, sai thì ô đỏ và bé thử lại; có đếm số ô đã đúng và nút “Làm lại”.
 *
 * ⚠️ LUẬT DÙNG (React): gọi `useFillSlots(...)` ở ĐẦU một component RIÊNG, **không** gọi
 * trong nhánh `if (mode === …)` của `NumberScene`/`GroupScene` vì các hàm đó có nhiều
 * `return` sớm ⇒ số hook giữa các lần render sẽ lệch và React sẽ ném lỗi.
 *
 * `interactive` truyền bằng CONTEXT (`InteractiveContext`) để KHÔNG phải luồn prop qua
 * `VisualBlock`: chỉ slide bài học/quan sát mới cho bé trả lời; slide CÂU HỎI thì không
 * (ở đó bé trả lời bằng các lựa chọn của câu hỏi, cho bấm trên hình là trùng).
 */
import { createContext, useContext, useEffect, useRef, useState } from "react";

import fireConfetti from "../../utils/confettiHelper";
import soundManager from "../../utils/soundManager";

export const InteractiveContext = createContext(false);
export const useInteractive = () => useContext(InteractiveContext);

export function useFillSlots(answers = []) {
  const [picked, setPicked] = useState(() => answers.map(() => null));
  const [tries, setTries] = useState(() => answers.map(() => 0));
  /** Ô ĐẦU TIÊN bé phải làm — bỏ qua các ô đã in sẵn (hàng “mẫu”). */
  const [active, setActive] = useState(() =>
    answers.findIndex((a) => a !== null),
  );

  /**
   * `answers[i] === null` = ô đã IN SẴN (hàng mẫu) ⇒ KHÔNG tính vào tiến độ, KHÔNG cho bấm,
   * và không bao giờ bị coi là sai.
   */
  const soO = answers.filter((a) => a !== null).length;
  const solved = answers.map(
    (a, i) => a !== null && picked[i] !== null && picked[i] === a,
  );
  const done = soO > 0 && solved.filter(Boolean).length === soO;

  /** Bé chọn một giá trị cho Ô ĐANG CHỌN. Sai thì ghi nhận và giữ nguyên ô để thử lại. */
  const pick = (value) => {
    const i = active;
    if (i < 0 || i >= answers.length || answers[i] === null || solved[i])
      return;
    const next = picked.map((p, j) => (j === i ? value : p));
    setPicked(next);
    if (value !== answers[i]) {
      setTries(tries.map((t, j) => (j === i ? t + 1 : t)));
      return;
    }
    setActive(
      next.findIndex((p, j) => answers[j] !== null && p !== answers[j]),
    );
  };

  const reset = () => {
    setPicked(answers.map(() => null));
    setTries(answers.map(() => 0));
    setActive(answers.findIndex((a) => a !== null));
  };

  return { picked, tries, active, solved, done, soO, pick, reset, setActive };
}

/** Màu + nét của một ô theo trạng thái — dùng cho cả `<Tile>` lẫn chữ bên trong. */
export function slotLook(fill, i, laMau = false) {
  if (laMau)
    return {
      fill: "#dbeafe",
      stroke: "#2563eb",
      color: "#2563eb",
      dash: false,
    };
  if (fill.solved[i])
    return {
      fill: "#d1fae5",
      stroke: "#059669",
      color: "#047857",
      dash: false,
    };
  if (fill.picked[i] !== null)
    return {
      fill: "#ffe4e6",
      stroke: "#e11d48",
      color: "#be123c",
      dash: false,
    };
  if (fill.active === i)
    return { fill: "#f5f3ff", stroke: "#7c3aed", color: "#6d28d9", dash: true };
  return { fill: "#f8fafc", stroke: "#94a3b8", color: "#64748b", dash: true };
}

/**
 * Dải nút chọn + tiến độ + “Làm lại”, hiện NGAY DƯỚI hình.
 *
 * 🔴 CỠ NÚT TỰ CO THEO SỐ LỰA CHỌN (người dùng báo 2026-09-26). Trước đây mọi nút đều
 * `58×50 px · chữ 24` — hợp với 3 dấu `> < =`, nhưng bàn phím **0–9** (10 nút) thì mỗi nút
 * to hơn cả ĐỀ BÀI: ảnh người dùng gửi cho thấy cột đặt tính bé tí mà bàn phím chiếm nửa màn
 * hình, nhìn mất cân đối. Nay:
 *   • ≤ 4 lựa chọn (dấu so sánh, đáp án chữ): giữ nút TO như cũ — ngón tay bé dễ bấm.
 *   • ≥ 5 lựa chọn (bàn phím số, dải hình): nút gọn hơn nhưng **không dưới 44 px** — vẫn đạt
 *     chuẩn vùng chạm cho trẻ, mà nhường chỗ cho hình.
 *
 * `renderOption` (tuỳ chọn) cho phép nút là HÌNH VẼ thay vì chữ — dùng cho “hình thích hợp
 * đặt vào dấu ?” (bé chọn giữa các hình). `tenOption` là nhãn đọc màn hình của từng giá trị.
 * Nhờ vậy phần tiến độ/ chúc mừng/ “Làm lại” chỉ có MỘT bản, không phải chép lại.
 */
export function FillBar({
  fill,
  options = [">", "<", "="],
  title = "Bé chọn dấu",
  hint = "Ô màu đỏ chưa đúng — bé đếm số chấm hai bên rồi so sánh lại nhé.",
  renderOption,
  tenOption,
}) {
  const xong = fill.solved.filter(Boolean).length;
  const tong = fill.soO;
  const conSai = fill.picked.some((p, i) => p !== null && !fill.solved[i]);
  /** Cỡ nút theo SỐ lựa chọn — xem ghi chú đầu `FillBar`. */
  const nhieuLuaChon = options.length >= 5;
  const coNut = nhieuLuaChon
    ? { minWidth: 44, minHeight: 44, fontSize: 20, padding: "0 4px" }
    : { minWidth: 58, minHeight: 50, fontSize: 24, padding: undefined };
  /**
   * CHÚC MỪNG khi bé làm đúng HẾT (người dùng yêu cầu 2026-09-25: cho đồng bộ với câu hỏi
   * và với mê cung). Dùng `useRef` chứ không `useState` để không thêm lần vẽ nào;
   * “Làm lại” rồi làm đúng lại thì kêu lại.
   */
  const daChucMung = useRef(false);
  useEffect(() => {
    if (tong > 0 && xong === tong) {
      if (!daChucMung.current) {
        daChucMung.current = true;
        soundManager.playCorrect();
        fireConfetti({ particleCount: 90, spread: 75, origin: { y: 0.6 } });
      }
    } else {
      daChucMung.current = false;
    }
  }, [xong, tong]);
  return (
    <div style={{ marginTop: 10 }}>
      {/* 🔴 BA HÀNG RIÊNG (người dùng báo 2026-09-26: “nhìn quá xấu và không cân đối”).
          Trước đây tiêu đề + nút + tiến độ + “Làm lại” nằm CHUNG một hàng flex-wrap, nên với
          4 lựa chọn thì nút “10” rơi xuống hàng dưới còn “0/4” và “Làm lại” chen ngay cạnh nút
          cuối — nhìn như lỗi. Nay: tiêu đề một hàng · NÚT CHỌN một hàng · tiến độ + “Làm lại”
          một hàng. Với mọi số lựa chọn (3 dấu, 4 đáp án, 10 chữ số) bố cục vẫn gọn và đều. */}
      <div
        style={{
          textAlign: "center",
          fontWeight: 800,
          fontSize: 14,
          color: "#475569",
          marginBottom: 6,
        }}
      >
        {fill.done ? "🎉 Bé làm đúng hết!" : `${title}:`}
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: nhieuLuaChon ? 8 : 10,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {options.map((o) => (
          <button
            key={String(o)}
            type="button"
            onClick={() => fill.pick(o)}
            disabled={fill.done}
            aria-label={`Chọn ${(tenOption && tenOption[o]) || o}`}
            style={{
              minWidth: coNut.minWidth,
              minHeight: coNut.minHeight,
              display: renderOption ? "flex" : undefined,
              alignItems: "center",
              justifyContent: "center",
              padding: renderOption ? 6 : coNut.padding,
              fontSize: coNut.fontSize,
              fontWeight: 900,
              borderRadius: 12,
              border: "2px solid #7c3aed",
              background: "#ede9fe",
              color: "#5b21b6",
              cursor: fill.done ? "default" : "pointer",
              opacity: fill.done ? 0.5 : 1,
            }}
          >
            {renderOption ? renderOption(o) : o}
          </button>
        ))}
      </div>
      <div
        style={{
          display: "flex",
          gap: 10,
          alignItems: "center",
          justifyContent: "center",
          marginTop: 8,
        }}
      >
        <span style={{ fontWeight: 800, fontSize: 14, color: "#0369a1" }}>
          {xong}/{tong}
        </span>
        <button
          type="button"
          onClick={fill.reset}
          style={{
            minHeight: 40,
            padding: "0 14px",
            fontSize: 13,
            fontWeight: 800,
            borderRadius: 10,
            border: "1.5px solid #94a3b8",
            background: "#f8fafc",
            color: "#334155",
            cursor: "pointer",
          }}
        >
          Làm lại
        </button>
      </div>
      {conSai && !fill.done && (
        <p
          style={{
            margin: "8px 0 0",
            textAlign: "center",
            fontWeight: 700,
            fontSize: 13,
            color: "#b45309",
          }}
        >
          {hint}
        </p>
      )}
    </div>
  );
}
