// visualSlide.jsx
// TÁCH RA TỪ: LessonPage.jsx
// (di chuyển mã nguyên khối — không sửa nội dung)

import { useState } from "react";
import { motion } from "framer-motion";
import VisualBlocks from "../../components/visuals/VisualBlock";
import speechHelper from "../../utils/speechHelper";
import ".././LessonPage.css";
import { CalcFigures } from "./lessonGraphics.jsx";
import { SlideHead } from "./slideHead.jsx";
// Luật bỏ chữ đã được HÌNH nói lại (xem đầu file đó: 95 slide vừa có `text` vừa có bảng trùng nhau).
import { planVisualText, withoutFigureLabel } from "./slideDedupe.js";

export function VisualSlide({ content }) {
  const [speaking, setSpeaking] = useState(false);

  // `text` nhiều dòng = DÒNG ĐẦU là tiêu đề, các dòng sau là LỜI GIẢI TỪNG BƯỚC.
  // Trước đây cả khối được vẽ vào `<h2>` ⇒ lời giải từng bước bị dồn thành một dòng tiêu đề
  // to đậm (người dùng góp ý 2026-09-26: “không chỉ cho bé thấy làm sao để ra kết quả”).
  const { title, steps, hideCaption } = planVisualText(content);
  /** Nội dung đưa xuống bộ vẽ hình — bỏ nhãn nếu nhãn đã được nâng lên làm tiêu đề. */
  const figureContent = hideCaption ? withoutFigureLabel(content) : content;

  const handleSpeak = () => {
    if (speaking) {
      speechHelper.stop();
      setSpeaking(false);
    } else {
      // Đọc đúng những gì ĐANG HIỆN (không đọc dòng đã bỏ vì trùng với hình).
      speechHelper.speak(
        [title, ...steps].filter(Boolean).join(". "),
        () => setSpeaking(true),
        () => setSpeaking(false),
      );
    }
  };

  return (
    <div className="slide-visual-card">
      <SlideHead
        label="Quan sát"
        speaking={speaking}
        onSpeak={handleSpeak}
        speakTitle="Nghe đọc nội dung"
      />

      {title && <h2 className="slide-visual-text">{title}</h2>}

      {steps.length > 0 && (
        <p className="slide-visual-steps">{steps.join("\n")}</p>
      )}

      {content.items && (
        <div className="visual-items">
          {content.items.map((item, i) => (
            <div key={i} className="visual-item-group">
              {item.count > 0 && (
                <span className="visual-count-badge">{item.count}</span>
              )}
              {item.label && <span className="visual-label">{item.label}</span>}
              <div
                className={`visual-emojis ${item.count <= 5 ? "single-row-emojis" : "ten-frame-emojis"}`}
              >
                {Array.from({ length: item.count }).map((_, j) => (
                  <motion.span
                    key={j}
                    className="visual-emoji"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      delay: j * 0.1,
                      type: "spring",
                      stiffness: 300,
                    }}
                  >
                    {item.emoji}
                  </motion.span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <CalcFigures content={figureContent} />

      {/* Hình bổ sung: trục số, khung 10 ô, khối chục–đơn vị, bảng hàng, thước, tiền,
          bảng số liệu, hình phẳng, góc, hình tròn, hình khối, phân số, sơ đồ đoạn thẳng,
          sơ đồ chuyển động, biểu đồ cột và biểu đồ quạt. */}
      <VisualBlocks content={figureContent} />
    </div>
  );
}
