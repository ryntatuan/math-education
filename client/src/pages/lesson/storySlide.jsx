// storySlide.jsx
// TÁCH RA TỪ: LessonPage.jsx
// (di chuyển mã nguyên khối — không sửa nội dung)

import {
  useState,
} from "react";
import {
  motion,
} from "framer-motion";
import {
  Sparkles,
} from "lucide-react";
import MascotIcon from "../../components/common/MascotIcon";
import VisualBlocks from "../../components/visuals/VisualBlock";
import {
  faceOf,
} from "../../data/mascotFaces";
import speechHelper from "../../utils/speechHelper";
import ".././LessonPage.css";
import {
  CalcFigures,
} from "./lessonGraphics.jsx";
import {
  SlideHead,
} from "./slideHead.jsx";

export function StorySlide({ content }) {
  const [speaking, setSpeaking] = useState(false);
  // 🔴 Trước đây chổ này tự viết chuỗi if/else chỉ nhận 3 giá trị. Đo được: 93 slide
  // mang `celebrate` rơi về mặt mặc định 😊, và `thinking` lệch mặt với bong bóng
  // linh vật (🧐). Nay tra từ vựng chung nên mọi biểu cảm đều ra đúng mặt của nó.
  const moodEmoji = faceOf(content.mascotMood);

  const handleSpeak = () => {
    if (speaking) {
      speechHelper.stop();
      setSpeaking(false);
    } else {
      speechHelper.speak(
        content.text,
        () => setSpeaking(true),
        () => setSpeaking(false),
      );
    }
  };

  return (
    <div className="slide-story-card">
      <SlideHead
        label="Bài học"
        icon={<Sparkles size={17} />}
        speaking={speaking}
        onSpeak={handleSpeak}
        speakTitle="Nghe đọc nội dung"
      />

      <motion.div
        className="story-mascot-hero"
        animate={{ y: [0, -10, 0], rotate: [-2, 2, -2] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="story-owl-emoji">
          <MascotIcon size={52} />
        </span>
        <span className="story-mood-badge">{moodEmoji}</span>
      </motion.div>

      <div className="story-dialog-bubble">
        <p className="story-dialog-text">{content.text}</p>
      </div>

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

      {/* 🔴 CÂU CHUYỆN CŨNG PHẢI MANG ĐƯỢC HÌNH. Câu mở bài hay hỏi "…đó là hình gì nhỉ?"
          (Lớp 1 CĐ 2) mà chỉ có emoji nhỏ trong chữ thì trẻ không thấy đồ vật để đoán.
          Người dùng báo ở bài `g1-c2-l4`: "mô tả quyển sách quá nhỏ, trẻ không thể nhìn thấy".
          Trước đây slide "bài học" không gọi `VisualBlocks` nên dữ liệu có hình cũng không vẽ. */}
      {/* Mặt đồng hồ cỡ md trong slide bài học (trước là sm ⇒ chữ số quá nhỏ). */}
      <CalcFigures content={content} clockSize="md" />
      <VisualBlocks content={content} />
    </div>
  );
}
