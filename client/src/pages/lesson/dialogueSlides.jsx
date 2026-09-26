// dialogueSlides.jsx
// TÁCH RA TỪ: LessonPage.jsx
// (di chuyển mã nguyên khối — không sửa nội dung)

import {
  useState,
  useEffect,
  useRef,
} from "react";
import {
  motion,
} from "framer-motion";
import {
  Volume2,
  MessageCircle,
} from "lucide-react";
import soundManager from "../../utils/soundManager";
import speechHelper from "../../utils/speechHelper";
import fireConfetti from "../../utils/confettiHelper";
import ".././LessonPage.css";
import {
  ClockGraphic,
} from "./lessonGraphics.jsx";

export function DialogueScene({ content, onAnswerRecorded, isFullSlide = false }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [feedbackState, setFeedbackState] = useState(null);
  const [speaking, setSpeaking] = useState(false);
  const feedbackRef = useRef(null);

  // Auto-scroll feedback into view when revealed (above sticky bottom nav)
  useEffect(() => {
    if (feedbackState && feedbackRef.current) {
      setTimeout(() => {
        feedbackRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
      }, 120);
    }
  }, [feedbackState]);

  const characters = {
    nam: { name: "Bạn Nam", avatar: "👦" },
    mai: { name: "Bạn Mai", avatar: "👧" },
    robot: { name: "Bạn Rô-bốt", avatar: "🤖" },
    viet: { name: "Bạn Việt", avatar: "👦" },
    mi: { name: "Bạn Mi", avatar: "👧" },
    owl: { name: "Cú Mèo", avatar: "🦉" },
  };

  const handleSpeakDialogue = () => {
    if (speaking) {
      speechHelper.stop();
      setSpeaking(false);
      return;
    }
    const lines = [];
    if (content.title) lines.push(content.title);
    if (content.dialogueList) {
      content.dialogueList.forEach((d) => {
        lines.push(`${d.name || d.character}: "${d.text}"`);
      });
    }
    if (content.question) lines.push(`Câu hỏi: ${content.question}`);
    speechHelper.speak(
      lines.join(". "),
      () => setSpeaking(true),
      () => setSpeaking(false),
    );
  };

  const handleOptionClick = (opt) => {
    if (feedbackState) return;
    setSelectedOption(opt);
    const isCorrect =
      opt === content.correctAnswer ||
      (content.isTrue && (opt.includes("Đúng") || opt === true)) ||
      (!content.isTrue && (opt.includes("Sai") || opt === false));

    if (isCorrect) {
      soundManager.playCorrect();
      setFeedbackState("correct");
      fireConfetti();
      speechHelper.speak(
        content.explanation || "Chính xác! Bé rất thông minh!",
      );
      if (onAnswerRecorded) onAnswerRecorded(true);
    } else {
      soundManager.playWrong();
      setFeedbackState("wrong");
      speechHelper.speak(
        content.explanation || "Chưa đúng rồi, bé hãy quan sát kỹ lại nhé!",
      );
      if (onAnswerRecorded) onAnswerRecorded(false);
    }
  };

  return (
    <div
      className={`dialogue-scene-card ${isFullSlide ? "is-full-slide" : ""}`}
    >
      <div className="dialogue-header">
        <div className="concept-tag">
          <MessageCircle size={18} />
          <span>{content.badge || "Giao Lưu Lớp Học"}</span>
        </div>
        <button
          type="button"
          className={`lesson-mini-voice-btn ${speaking ? "is-playing" : ""}`}
          onClick={handleSpeakDialogue}
          title="Nghe đối thoại"
        >
          <Volume2 size={20} />
          <span>Nghe đối thoại</span>
        </button>
      </div>

      {content.title && <h2 className="concept-title">{content.title}</h2>}

      {/* Focus Graphic (e.g. Clock showing 12h) */}
      {content.focusGraphic && (
        <div className="dialogue-focus-graphic">
          {content.focusGraphic.type === "clock" && (
            <ClockGraphic
              hour={content.focusGraphic.hour}
              minute={content.focusGraphic.minute}
              frameColor={content.focusGraphic.frameColor || "#eab308"}
              shape={content.focusGraphic.shape || "circle"}
              timeText={content.focusGraphic.timeText}
              showLabels={content.focusGraphic.showLabels || false}
              size={content.focusGraphic.size || "md"}
            />
          )}
        </div>
      )}

      {/* Classroom Speech Bubbles Stream */}
      <div className="dialogue-bubbles-stream">
        {content.dialogueList?.map((item, idx) => {
          const char = characters[item.character] || {
            name: item.name,
            avatar: "💬",
          };
          const isLeft = idx % 2 === 0;
          return (
            <motion.div
              key={idx}
              className={`dialogue-item ${isLeft ? "align-left" : "align-right"}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.15 }}
            >
              <div className="dialogue-avatar-wrap">
                <span className="dialogue-avatar">{char.avatar}</span>
                <span className="dialogue-char-name">
                  {item.name || char.name}
                </span>
              </div>
              <div
                className={`dialogue-bubble ${isLeft ? "bubble-left" : "bubble-right"}`}
              >
                <p className="dialogue-text">"{item.text}"</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Interactive Question Section */}
      {content.question && (
        <div className="dialogue-interaction-box">
          <h4 className="dialogue-question-title">❓ {content.question}</h4>
          <div className="dialogue-options-row">
            {(content.options || ["Đúng rồi 👍", "Sai rồi 👎"]).map(
              (opt, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`dialogue-opt-btn ${selectedOption === opt ? (feedbackState === "correct" ? "opt-correct" : "opt-wrong") : ""}`}
                  onClick={() => handleOptionClick(opt)}
                  disabled={feedbackState !== null}
                >
                  {opt}
                </button>
              ),
            )}
          </div>

          {feedbackState && (
            <motion.div
              ref={feedbackRef}
              className={`dialogue-feedback-card ${feedbackState === "correct" ? "is-correct" : "is-wrong"}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div className="feedback-header">
                <span>
                  {feedbackState === "correct"
                    ? "🎉 Giỏi lắm! +10 Xu"
                    : "💡 Cùng xem lại nhé:"}
                </span>
              </div>
              <p className="feedback-body">{content.explanation}</p>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
}

export function DialogueSlide({ content, onAnswerRecorded }) {
  return (
    <DialogueScene
      content={content}
      onAnswerRecorded={onAnswerRecorded}
      isFullSlide={true}
    />
  );
}
