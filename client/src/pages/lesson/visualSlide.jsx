// visualSlide.jsx
// TÁCH RA TỪ: LessonPage.jsx
// (di chuyển mã nguyên khối — không sửa nội dung)

import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Volume2,
  Sparkles,
  Award,
  Lightbulb,
  MessageCircle,
  LogIn,
} from "lucide-react";
import Button from "../../components/ui/Button";
import GoogleIcon from "../../components/common/GoogleIcon";
import ProgressBar, { StarsDisplay } from "../../components/ui/ProgressBar";
import ReportQuestionButton from "../../components/report/ReportQuestionButton";
import { recordAttempt } from "../../services/attemptService";
import MascotIcon from "../../components/common/MascotIcon";
import CoinIcon from "../../components/common/CoinIcon";
import VisualBlocks from "../../components/visuals/VisualBlock";
import { InteractiveContext } from "../../components/visuals/interactiveFill";
import useUserStore from "../../store/useUserStore";
import useProgressStore from "../../store/useProgressStore";
import useAuthStore from "../../store/useAuthStore";
import { getReward } from "../../services/rewardService";
import curriculum from "../../data/curriculum";
import {
  baoDangTrongBaiHoc,
  ngheNoiDung,
  taiNoiDung,
} from "../../data/contentSource";
import { faceOf } from "../../data/mascotFaces";
import soundManager from "../../utils/soundManager";
import speechHelper from "../../utils/speechHelper";
import fireConfetti from "../../utils/confettiHelper";
import {
  logLessonOpen,
  logSlideReach,
  logLessonDone,
} from "../../services/appEvents";
import ".././LessonPage.css";
import { CalcFigures } from "./lessonGraphics.jsx";
import { SlideHead } from "./slideHead.jsx";

export function VisualSlide({ content }) {
  const [speaking, setSpeaking] = useState(false);

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

  // `text` nhiều dòng = DÒNG ĐẦU là tiêu đề, các dòng sau là LỜI GIẢI TỪNG BƯỚC.
  // Trước đây cả khối được vẽ vào `<h2>` ⇒ lời giải từng bước bị dồn thành một dòng tiêu đề
  // to đậm (người dùng góp ý 2026-09-26: “không chỉ cho bé thấy làm sao để ra kết quả”).
  const [dongTieuDe, ...dongGiai] = String(content.text ?? "").split("\n");

  return (
    <div className="slide-visual-card">
      <SlideHead
        label="Quan sát"
        speaking={speaking}
        onSpeak={handleSpeak}
        speakTitle="Nghe đọc nội dung"
      />

      <h2 className="slide-visual-text">{dongTieuDe}</h2>

      {dongGiai.length > 0 && (
        <p className="slide-visual-steps">{dongGiai.join("\n")}</p>
      )}

      {content.items && (
        <div className="visual-items">
          {content.items.map((item, i) => (
            <div key={i} className="visual-item-group">
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

      <CalcFigures content={content} />

      {/* Hình bổ sung: trục số, khung 10 ô, khối chục–đơn vị, bảng hàng, thước, tiền,
          bảng số liệu, hình phẳng, góc, hình tròn, hình khối, phân số, sơ đồ đoạn thẳng,
          sơ đồ chuyển động, biểu đồ cột và biểu đồ quạt. */}
      <VisualBlocks content={content} />
    </div>
  );
}
