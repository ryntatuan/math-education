// summarySlide.jsx
// TÁCH RA TỪ: LessonPage.jsx
// (di chuyển mã nguyên khối — không sửa nội dung)

import {
  useState,
} from "react";
import {
  motion,
} from "framer-motion";
import {
  Award,
} from "lucide-react";
import speechHelper from "../../utils/speechHelper";
import ".././LessonPage.css";
import {
  SlideHead,
} from "./slideHead.jsx";

export function SummarySlide({ content }) {
  const [speaking, setSpeaking] = useState(false);

  const handleSpeak = () => {
    if (speaking) {
      speechHelper.stop();
      setSpeaking(false);
    } else {
      const fullText = `${content.title}. ${content.points ? content.points.join(". ") : ""}`;
      speechHelper.speak(
        fullText,
        () => setSpeaking(true),
        () => setSpeaking(false),
      );
    }
  };

  return (
    <div className="slide-summary-card">
      <SlideHead
        label="Tổng kết"
        icon={<Award size={17} />}
        speaking={speaking}
        onSpeak={handleSpeak}
        speakTitle="Nghe đọc tổng kết"
      />

      <h2 className="summary-title">{content.title}</h2>

      <div className="summary-points">
        {content.points.map((point, i) => (
          <motion.div
            key={i}
            className="summary-point"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.15 }}
          >
            <span className="point-bullet">⭐</span>
            <span className="point-text">{point}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
