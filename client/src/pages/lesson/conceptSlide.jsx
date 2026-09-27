// conceptSlide.jsx
// TÁCH RA TỪ: LessonPage.jsx
// (di chuyển mã nguyên khối — không sửa nội dung)

import { useState } from "react";
import { motion } from "framer-motion";
import { Lightbulb } from "lucide-react";
import MascotIcon from "../../components/common/MascotIcon";
import VisualBlocks from "../../components/visuals/VisualBlock";
import speechHelper from "../../utils/speechHelper";
import ".././LessonPage.css";
import { CalcFigures } from "./lessonGraphics.jsx";
import { DialogueScene } from "./dialogueSlides.jsx";
import { MultiVisualGallery } from "./lessonGraphics.jsx";
import { ShapeGraphic } from "./lessonGraphics.jsx";
import { SlideHead } from "./slideHead.jsx";
import { UniversalVisualGrid } from "./lessonGraphics.jsx";
import { coversAll } from "../../utils/textCompare";

export function ConceptSlide({ content }) {
  const [speaking, setSpeaking] = useState(false);

  /**
   * 🔴 BỎ KHỐI CHỮ TRÙNG NỘI DUNG (người dùng gửi ảnh 2026-09-27, slide “Làm quen” Lớp 1 Bài 1):
   * ô nhấn mạnh `rule` chỉ nhắc lại y hệt bốn dòng đã nằm trong `points` ⇒ bé đọc đúng một
   * thông tin hai lần, và phần đọc thành tiếng cũng đọc hai lần.
   *
   * Luật: bỏ khối NGẮN khi khối DÀI đã chứa trọn nội dung của nó (`coversAll`). Chiều ngược
   * lại thì KHÓA: bỏ khối dài vì khối ngắn nằm trong nó là mất thông tin.
   * Dữ liệu KHÔNG bị sửa — đây là luật hiển thị, nên cả 5 lớp đồng bộ ngay, không phải dán lại seed.
   */
  const pointsText = Array.isArray(content.points)
    ? content.points.join(" · ")
    : "";
  const stepsText = Array.isArray(content.steps)
    ? content.steps.map((s) => `${s.title ?? ""} ${s.desc ?? ""}`).join(" · ")
    : "";
  const ruleText = String(content.rule ?? "");
  const ruleLap = Boolean(
    ruleText &&
    ((pointsText && coversAll(pointsText, ruleText)) ||
      (stepsText && coversAll(stepsText, ruleText))),
  );
  const showRule = Boolean(ruleText) && !ruleLap;
  const showExplanation =
    Boolean(content.explanation) &&
    !(ruleText && coversAll(ruleText, content.explanation));

  const handleSpeak = () => {
    if (speaking) {
      speechHelper.stop();
      setSpeaking(false);
    } else {
      const parts = [content.title];
      // Đọc đúng những gì ĐANG HIỆN — không đọc khối đã bị bỏ vì trùng nội dung.
      if (showExplanation) parts.push(content.explanation);
      if (showRule) parts.push(ruleText);
      if (content.points) parts.push(content.points.join(". "));
      if (content.activityGrid) {
        content.activityGrid.forEach((item) => {
          parts.push(
            `${item.period || item.title || ""}: ${item.timeText || ""}. ${item.desc || ""}`,
          );
        });
      }
      if (content.gallery) {
        content.gallery.forEach((item) => {
          parts.push(`${item.label || ""}: ${item.timeText || ""}`);
        });
      }
      if (content.example) {
        const ex = content.example;
        const exText =
          ex.text ||
          `${ex.question ? ex.question + ". " : ""}${ex.explanation || ""}`;
        parts.push(`Ví dụ: ${exText}`);
      }
      const text = parts.filter(Boolean).join(". ");
      speechHelper.speak(
        text,
        () => setSpeaking(true),
        () => setSpeaking(false),
      );
    }
  };

  return (
    <div className="slide-concept-card">
      <SlideHead
        label={content.badge || "Khám Phá Cùng Bé"}
        icon={<Lightbulb size={17} />}
        speaking={speaking}
        onSpeak={handleSpeak}
        speakTitle="Nghe cô đọc bài học"
      />

      {content.title && <h2 className="concept-title">{content.title}</h2>}

      {/* 1. VISUAL HERO CENTER (Always prioritized first) */}
      <CalcFigures content={content} clockSize="lg" />

      {content.shape && (
        <ShapeGraphic shape={content.shape} label={content.shapeLabel} />
      )}

      {/* 1.5. EMOJI ITEMS */}
      {content.items && (
        <div className="visual-items">
          {content.items.map((item, i) => (
            <div key={i} className="visual-item-group">
              {item.label && <span className="visual-label">{item.label}</span>}
              <div
                className={`visual-emojis ${item.count <= 5 ? "single-row-emojis" : "ten-frame-emojis"}`}
              >
                {Array.from({ length: item.count || 1 }).map((_, j) => (
                  <motion.span
                    key={j}
                    className="visual-emoji"
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 15,
                      delay: j * 0.05,
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

      {/* Hình bổ sung — cùng bộ với slide "Hình ảnh", để một slide khái niệm cũng minh hoạ được. */}
      <VisualBlocks content={content} />

      {/* 1b. UNIVERSAL VISUAL GRID (1-1 Visual Mapping) */}
      {content.activityGrid && (
        <UniversalVisualGrid items={content.activityGrid} />
      )}

      {/* 1c. MULTI-VISUAL GALLERY */}
      {content.gallery && (
        <MultiVisualGallery
          title={content.galleryTitle}
          items={content.gallery}
        />
      )}

      {/* 1d. EMBEDDED DIALOGUE SCENE */}
      {content.dialogue && <DialogueScene content={content.dialogue} />}

      {/* 2. CONCISE EXPLANATION (Only when not redundant with rule) */}
      {showExplanation && (
        <p className="concept-explanation">{content.explanation}</p>
      )}

      {/* 3. STEP BY STEP CARDS */}
      {content.steps && (
        <div className="concept-steps-grid">
          {content.steps.map((step, i) => (
            <motion.div
              key={i}
              className="concept-step-card"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
            >
              <span className="concept-step-badge">Bước {i + 1}</span>
              <h4 className="concept-step-title">{step.title}</h4>
              <p className="concept-step-desc">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      )}

      {/* 4. HIGHLIGHTED RULE PILL / BANNER */}
      {showRule && (
        <motion.div
          className="concept-rule-box"
          initial={{ scale: 0.9, opacity: 0, y: 10 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{
            delay: 0.2,
            type: "spring",
            stiffness: 400,
            damping: 12,
          }}
        >
          <span className="concept-rule-icon">⭐</span>
          <p className="concept-rule-body">{content.rule}</p>
        </motion.div>
      )}

      {/* 5. FRIENDLY WORKED EXAMPLE (Warm speech bubble with mascot) */}
      {content.example && (
        <div className="concept-example-box">
          <span className="concept-example-mascot">
            <MascotIcon size={32} />
          </span>
          <div className="concept-example-body">
            <span className="concept-example-tag">Ví dụ cùng bé:</span>
            <p className="concept-example-text">
              {content.example.text ? (
                content.example.text
              ) : (
                <>
                  {content.example.question && (
                    <span>{content.example.question} </span>
                  )}
                  {content.example.explanation && (
                    <strong>👉 {content.example.explanation}</strong>
                  )}
                </>
              )}
            </p>
          </div>
        </div>
      )}

      {/* 6. BULLET POINTS */}
      {content.points && (
        <div className="concept-points-list">
          {content.points.map((pt, i) => (
            <div key={i} className="concept-point-item">
              <span className="concept-point-dot">✔</span>
              <span>{pt}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
