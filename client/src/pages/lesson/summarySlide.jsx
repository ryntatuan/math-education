// summarySlide.jsx
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
import { SlideHead } from "./slideHead.jsx";

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
