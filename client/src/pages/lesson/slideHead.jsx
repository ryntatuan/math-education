// slideHead.jsx
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

export function SlideHead({
  label,
  icon = null,
  speaking,
  onSpeak,
  speakTitle,
  children = null,
}) {
  return (
    <div className="slide-head">
      <span className="slide-head-tag">
        {icon}
        <span>{label}</span>
      </span>
      <div className="slide-head-actions">
        {/* Thứ tự CỐ ĐỊNH: nút loa TRƯỚC, các nút phụ (cờ báo lỗi) SAU ⇒ cờ nằm ngoài cùng
            bên phải. Người dùng đã yêu cầu đổi lại thứ tự này. */}
        <button
          type="button"
          className={`lesson-mini-voice-btn is-icon ${speaking ? "is-playing" : ""}`}
          onClick={onSpeak}
          title={speakTitle}
          aria-label={speakTitle}
        >
          <Volume2 size={20} />
        </button>
        {children}
      </div>
    </div>
  );
}
