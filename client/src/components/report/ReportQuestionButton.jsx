import { useState } from "react";
import { Flag, X, CheckCircle2 } from "lucide-react";
import useAuthStore from "../../store/useAuthStore";
import { supabase, isSupabaseConfigured } from "../../services/supabaseClient";
import "./ReportQuestionButton.css";

/**
 * Nút "Báo lỗi câu hỏi" — Giai đoạn 2c.
 *
 * Ghi vào `support_tickets`. Khách (chưa đăng nhập) vẫn báo được — `child_id`
 * để NULL. Xem ghi chú về quyền ẩn danh ở đầu `0005_support_tickets.sql`.
 *
 * Cố ý chụp lại `questionText` và `correctAnswer` vào ticket: nội dung có thể
 * bị sửa về sau, còn ticket phải giữ đúng cái người dùng đã nhìn thấy.
 */

const TYPES = [
  { value: "wrong_answer", label: "Đáp án sai" },
  { value: "typo", label: "Sai chính tả / lỗi chữ" },
  { value: "unclear", label: "Câu hỏi khó hiểu" },
  { value: "other", label: "Khác" },
];

const MAX_MESSAGE = 1000;

export default function ReportQuestionButton({
  lessonId,
  slideIndex,
  questionText,
  correctAnswer,
}) {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState("wrong_answer");
  const [message, setMessage] = useState("");
  const [state, setState] = useState("idle"); // idle | sending | done | error
  const [error, setError] = useState(null);

  const close = () => {
    setOpen(false);
    // Đóng xong mới reset, để không thấy nội dung nhấp nháy lúc đang đóng
    setTimeout(() => {
      setState("idle");
      setError(null);
      setMessage("");
      setType("wrong_answer");
    }, 200);
  };

  const send = async () => {
    setState("sending");
    setError(null);

    try {
      if (!isSupabaseConfigured() || !supabase) {
        throw new Error("Chưa cấu hình kết nối");
      }

      const childId = useAuthStore.getState().activeChild?.id ?? null;
      const text = String(questionText ?? "").trim();
      if (!text) throw new Error("Không có nội dung câu hỏi để gửi");

      const { error: err } = await supabase.from("support_tickets").insert({
        child_id: childId,
        lesson_id: lessonId ?? null,
        slide_index: Number.isInteger(slideIndex) ? slideIndex : null,
        question_text: text.slice(0, 2000),
        correct_answer:
          correctAnswer == null ? null : String(correctAnswer).slice(0, 200),
        report_type: type,
        message: message.trim() ? message.trim().slice(0, MAX_MESSAGE) : null,
      });

      if (err) throw new Error(err.message);
      setState("done");
    } catch (e) {
      setState("error");
      setError(e.message);
    }
  };

  return (
    <>
      <button
        type="button"
        className="report-question-trigger"
        onClick={() => setOpen(true)}
        title="Báo lỗi câu hỏi"
        aria-label="Báo lỗi câu hỏi"
      >
        <Flag size={18} fill="currentColor" strokeWidth={1.6} />
      </button>

      {open && (
        <div className="report-modal-overlay" onClick={close}>
          <div
            className="report-modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="report-modal-close"
              onClick={close}
              aria-label="Đóng"
            >
              <X size={18} />
            </button>

            {state === "done" ? (
              <div className="report-modal-done">
                <CheckCircle2 size={44} className="report-done-icon" />
                <h3>Cảm ơn bạn!</h3>
                <p>
                  Báo lỗi đã được gửi. Chúng tôi sẽ kiểm tra và sửa lại câu hỏi
                  này.
                </p>
                <button
                  type="button"
                  className="report-btn report-btn-primary"
                  onClick={close}
                >
                  Đóng
                </button>
              </div>
            ) : (
              <>
                <h3 className="report-modal-title">Báo lỗi câu hỏi</h3>
                <p className="report-modal-sub">
                  Nội dung được gửi kèm để chúng tôi tìm đúng câu hỏi:
                </p>
                <div className="report-question-preview">
                  {String(questionText ?? "")}
                </div>

                <label className="report-label">Lỗi gì?</label>
                <div className="report-type-list">
                  {TYPES.map((t) => (
                    <button
                      key={t.value}
                      type="button"
                      className={`report-type-btn ${
                        type === t.value ? "active" : ""
                      }`}
                      onClick={() => setType(t.value)}
                      disabled={state === "sending"}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>

                <label className="report-label" htmlFor="report-message">
                  Mô tả thêm (không bắt buộc)
                </label>
                <textarea
                  id="report-message"
                  className="report-textarea"
                  rows={3}
                  maxLength={MAX_MESSAGE}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="VD: đáp án đúng phải là 12, không phải 13"
                  disabled={state === "sending"}
                />
                <div className="report-counter">
                  {message.length}/{MAX_MESSAGE}
                </div>

                {state === "error" && (
                  <div className="report-error">Không gửi được: {error}</div>
                )}

                <div className="report-modal-actions">
                  <button
                    type="button"
                    className="report-btn"
                    onClick={close}
                    disabled={state === "sending"}
                  >
                    Huỷ
                  </button>
                  <button
                    type="button"
                    className="report-btn report-btn-primary"
                    onClick={send}
                    disabled={state === "sending"}
                  >
                    {state === "sending" ? "Đang gửi…" : "Gửi báo lỗi"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
