// slideHead.jsx
// TÁCH RA TỪ: LessonPage.jsx
// (di chuyển mã nguyên khối — không sửa nội dung)

import {
  Volume2,
} from "lucide-react";
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
