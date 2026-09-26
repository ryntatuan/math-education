// lessonGraphics.jsx
// TÁCH RA TỪ: LessonPage.jsx
// (di chuyển mã nguyên khối — không sửa nội dung)

import {
  useState,
} from "react";
import {
  motion,
} from "framer-motion";
import {
  Volume2,
} from "lucide-react";
import soundManager from "../../utils/soundManager";
import speechHelper from "../../utils/speechHelper";
import ".././LessonPage.css";

export function ClockGraphic({
  hour = 12,
  minute = 0,
  showLabels = true,
  timeText = "",
  frameColor = "#3b82f6",
  shape = "circle",
  size = "md",
  roman = false,
}) {
  const isSm = size === "sm";
  const isLg = size === "lg";
  const svgSize = isSm ? 120 : isLg ? 220 : 165;
  const cx = 110;
  const cy = 110;
  const r = 88;

  // Mặt đồng hồ số La Mã — SGK Lớp 3 “Làm quen với chữ số La Mã” in mặt đồng hồ cổ
  // ghi I…XII, mà 12 số La Mã dài hơn số thường nên phải hạ cỡ chữ cho khỏi chồn vạch.
  const VI_TRI = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  const LA_MA = [
    "XII",
    "I",
    "II",
    "III",
    "IV",
    "V",
    "VI",
    "VII",
    "VIII",
    "IX",
    "X",
    "XI",
  ];
  const oSo = VI_TRI.map((v, i) => ({
    value: v,
    label: roman ? LA_MA[i] : String(v),
  }));
  const coSoLaMa = roman;

  const hourAngle = ((hour % 12) + minute / 60) * 30;
  const minuteAngle = minute * 6;
  const isSquare = shape === "square";
  const gradId = `clockFaceGrad-${hour}-${minute}-${shape}-${frameColor.replace("#", "")}${roman ? "-roman" : ""}`;

  return (
    <div className={`clock-graphic-container size-${size}`}>
      <div className="clock-svg-wrap">
        <svg
          viewBox="0 0 220 220"
          width={svgSize}
          height={svgSize}
          className="clock-svg"
        >
          <defs>
            <radialGradient id={gradId} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="85%" stopColor="#f8fafc" />
              <stop offset="100%" stopColor="#f1f5f9" />
            </radialGradient>
            <filter
              id="clockShadow"
              x="-10%"
              y="-10%"
              width="130%"
              height="130%"
            >
              <feDropShadow
                dx="0"
                dy="4"
                stdDeviation="6"
                floodOpacity="0.14"
              />
            </filter>
          </defs>

          {/* Clock Outer Rim */}
          {isSquare ? (
            <rect
              x={cx - r - 10}
              y={cy - r - 10}
              width={(r + 10) * 2}
              height={(r + 10) * 2}
              rx="28"
              fill="#ffffff"
              stroke={frameColor}
              strokeWidth="6"
              filter="url(#clockShadow)"
            />
          ) : (
            <circle
              cx={cx}
              cy={cy}
              r={r + 8}
              fill="#ffffff"
              stroke={frameColor}
              strokeWidth="6"
              filter="url(#clockShadow)"
            />
          )}

          {/* Clock Face Background */}
          {isSquare ? (
            <rect
              x={cx - r}
              y={cy - r}
              width={r * 2}
              height={r * 2}
              rx="20"
              fill={`url(#${gradId})`}
              stroke="#e2e8f0"
              strokeWidth="1.5"
            />
          ) : (
            <circle
              cx={cx}
              cy={cy}
              r={r}
              fill={`url(#${gradId})`}
              stroke="#e2e8f0"
              strokeWidth="1.5"
            />
          )}

          {/* 12 Hour Marks */}
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = i * 30 * (Math.PI / 180);
            const x1 = cx + (r - 4) * Math.sin(angle);
            const y1 = cy - (r - 4) * Math.cos(angle);
            const x2 = cx + (r - 12) * Math.sin(angle);
            const y2 = cy - (r - 12) * Math.cos(angle);
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={i % 3 === 0 ? "#475569" : "#94a3b8"}
                strokeWidth={i % 3 === 0 ? "3" : "2"}
                strokeLinecap="round"
              />
            );
          })}

          {/* 12 Numbers */}
          {oSo.map((o) => {
            const angle = (o.value === 12 ? 0 : o.value * 30) * (Math.PI / 180);
            const nx = cx + (r - 24) * Math.sin(angle);
            const ny = cy - (r - 24) * Math.cos(angle) + 5;
            return (
              <text
                key={o.value}
                x={nx}
                y={ny}
                textAnchor="middle"
                fontSize={
                  // Số La Mã dài hơn ("VIII") nên phải nhỏ hơn số thường, nhưng KHÔNG được
                  // nhỏ tới mức trẻ không đọc được — và vì mặt La Mã luôn cỡ lg nên
                  // 16 đơn vị ≈ 16 px trên màn hình (đo bằng `scratch/do-chu-hinh.mjs`).
                  coSoLaMa ? (isSm ? "14" : "17") : isSm ? "16" : "15"
                }
                fontWeight="800"
                fontFamily="var(--font-heading, sans-serif)"
                fill={
                  o.value === 12 ||
                  o.value === 3 ||
                  o.value === 6 ||
                  o.value === 9
                    ? "#0f172a"
                    : "#64748b"
                }
              >
                {o.label}
              </text>
            );
          })}

          {/* Hour Hand (Kim ngắn - Chỉ giờ) - Bold Orange */}
          <g transform={`rotate(${hourAngle}, ${cx}, ${cy})`}>
            <line
              x1={cx}
              y1={cy}
              x2={cx}
              y2={cy - 48}
              stroke="#ea580c"
              strokeWidth="6.5"
              strokeLinecap="round"
            />
            <polygon
              points={`${cx},${cy - 52} ${cx - 5},${cy - 42} ${cx + 5},${cy - 42}`}
              fill="#ea580c"
            />
          </g>

          {/* Minute Hand (Kim dài - Chỉ phút) - Deep Blue */}
          <g transform={`rotate(${minuteAngle}, ${cx}, ${cy})`}>
            <line
              x1={cx}
              y1={cy}
              x2={cx}
              y2={cy - 68}
              stroke="#0284c7"
              strokeWidth="4.5"
              strokeLinecap="round"
            />
            <polygon
              points={`${cx},${cy - 72} ${cx - 4},${cy - 62} ${cx + 4},${cy - 62}`}
              fill="#0284c7"
            />
          </g>

          {/* Center Pin */}
          <circle
            cx={cx}
            cy={cy}
            r="6"
            fill="#1e293b"
            stroke="#ffffff"
            strokeWidth="2"
          />
          <circle cx={cx} cy={cy} r="2.5" fill="#facc15" />
        </svg>
      </div>

      {/* Labels / Callouts */}
      {showLabels && (
        <div className="clock-labels-pill-row">
          <div className="clock-label-pill clock-label-hour">
            <span className="clock-dot-hour">🔴</span>
            <span>
              <strong>Kim ngắn:</strong> Chỉ <strong>GIỜ</strong> (chạy chậm)
            </span>
          </div>
          <div className="clock-label-pill clock-label-minute">
            <span className="clock-dot-minute">🔵</span>
            <span>
              <strong>Kim dài:</strong> Chỉ <strong>PHÚT</strong> (chạy nhanh)
            </span>
          </div>
        </div>
      )}

      {timeText && (
        <div className="clock-time-badge" style={{ borderColor: frameColor }}>
          <span>⏰ {timeText}</span>
        </div>
      )}
    </div>
  );
}

export function CalcFigures({ content, clockSize = "md" }) {
  return (
    <>
      {content.number !== null && content.number !== undefined && (
        <motion.div
          className="visual-number"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
        >
          <span className="number">{content.number}</span>
        </motion.div>
      )}

      {content.operation && (
        <motion.div
          className="visual-operation"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <span className="number op-num">{content.operation.left}</span>
          <span className="op-sign">{content.operation.sign}</span>
          <span className="number op-num">{content.operation.right}</span>
          <span className="op-sign">=</span>
          <span className="number op-result">{content.operation.result}</span>
        </motion.div>
      )}

      {content.clock && (
        <ClockGraphic
          hour={content.clock.hour}
          minute={content.clock.minute}
          showLabels={content.clock.showLabels !== false}
          timeText={content.clock.timeText}
          frameColor={content.clock.frameColor || "#3b82f6"}
          shape={content.clock.shape || "circle"}
          size={
            content.clock.size ||
            (content.clock.roman === true ? "lg" : clockSize)
          }
          roman={content.clock.roman === true}
        />
      )}

      {content.comparison && (
        <motion.div
          className="visual-operation"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <span className="number op-num">{content.comparison.left}</span>
          <span className="op-sign comparison-sign">
            {content.comparison.sign}
          </span>
          <span className="number op-num">{content.comparison.right}</span>
        </motion.div>
      )}
    </>
  );
}

export function ShapeGraphic({ shape, label }) {
  if (shape === "square") {
    return (
      <div className="shape-graphic-card">
        <svg viewBox="0 0 160 160" width="140" height="140">
          <rect
            x="25"
            y="25"
            width="110"
            height="110"
            rx="8"
            fill="#dbeafe"
            stroke="#2563eb"
            strokeWidth="3"
          />
          <text
            x="80"
            y="85"
            textAnchor="middle"
            fill="#1e40af"
            fontWeight="800"
            fontSize="14"
          >
            Hình vuông
          </text>
        </svg>
        {label && <span className="shape-label-text">{label}</span>}
      </div>
    );
  }
  if (shape === "circle") {
    return (
      <div className="shape-graphic-card">
        <svg viewBox="0 0 160 160" width="140" height="140">
          <circle
            cx="80"
            cy="80"
            r="55"
            fill="#fef08a"
            stroke="#ca8a04"
            strokeWidth="3"
          />
          <text
            x="80"
            y="85"
            textAnchor="middle"
            fill="#854d0e"
            fontWeight="800"
            fontSize="14"
          >
            Hình tròn
          </text>
        </svg>
        {label && <span className="shape-label-text">{label}</span>}
      </div>
    );
  }
  if (shape === "triangle") {
    return (
      <div className="shape-graphic-card">
        <svg viewBox="0 0 160 160" width="140" height="140">
          <polygon
            points="80,20 20,135 140,135"
            fill="#fce7f3"
            stroke="#db2777"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <text
            x="80"
            y="105"
            textAnchor="middle"
            fill="#9d174d"
            fontWeight="800"
            fontSize="14"
          >
            Hình tam giác
          </text>
        </svg>
        {label && <span className="shape-label-text">{label}</span>}
      </div>
    );
  }
  if (shape === "rectangle") {
    return (
      <div className="shape-graphic-card">
        <svg viewBox="0 0 200 140" width="180" height="120">
          <rect
            x="20"
            y="25"
            width="160"
            height="90"
            rx="8"
            fill="#dcfce7"
            stroke="#16a34a"
            strokeWidth="3"
          />
          <text
            x="100"
            y="75"
            textAnchor="middle"
            fill="#15803d"
            fontWeight="800"
            fontSize="14"
          >
            Hình chữ nhật
          </text>
        </svg>
        {label && <span className="shape-label-text">{label}</span>}
      </div>
    );
  }
  if (shape === "cube") {
    return (
      <div className="shape-graphic-card">
        <svg viewBox="0 0 160 160" width="140" height="140">
          <polygon
            points="80,25 130,55 80,85 30,55"
            fill="#bae6fd"
            stroke="#0284c7"
            strokeWidth="2"
          />
          <polygon
            points="30,55 80,85 80,140 30,110"
            fill="#7dd3fc"
            stroke="#0284c7"
            strokeWidth="2"
          />
          <polygon
            points="80,85 130,55 130,110 80,140"
            fill="#38bdf8"
            stroke="#0284c7"
            strokeWidth="2"
          />
          <text
            x="80"
            y="155"
            textAnchor="middle"
            fill="#0369a1"
            fontWeight="800"
            fontSize="13"
          >
            Khối lập phương
          </text>
        </svg>
        {label && <span className="shape-label-text">{label}</span>}
      </div>
    );
  }
  return null;
}

export function UniversalVisualGrid({ items = [], onCardClick }) {
  const [activeIdx, setActiveIdx] = useState(null);

  const handleCardClick = (item, idx) => {
    setActiveIdx(idx);
    soundManager.playClick();
    if (onCardClick) {
      onCardClick(item, idx);
    } else {
      const textToSpeak = `${item.period || item.title || ""}: ${item.timeText || ""}. ${item.desc || ""}`;
      speechHelper.speak(textToSpeak);
    }
  };

  return (
    <div className="universal-visual-grid">
      {items.map((item, idx) => (
        <motion.div
          key={idx}
          className={`visual-grid-card ${activeIdx === idx ? "is-active" : ""}`}
          onClick={() => handleCardClick(item, idx)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {item.period && (
            <div
              className="visual-card-period-tag"
              style={{ borderLeftColor: item.clock?.frameColor || "#3b82f6" }}
            >
              <span>{item.period}</span>
            </div>
          )}
          {item.clock && (
            <div className="visual-card-clock">
              <ClockGraphic
                hour={item.clock.hour}
                minute={item.clock.minute}
                shape={item.clock.shape || "circle"}
                frameColor={item.clock.frameColor || "#3b82f6"}
                showLabels={false}
                size="sm"
              />
            </div>
          )}
          {item.timeText && (
            <div
              className="visual-card-time-pill"
              style={{ borderColor: item.clock?.frameColor || "#cbd5e1" }}
            >
              ⏰ {item.timeText}
            </div>
          )}
          {item.desc && <p className="visual-card-desc">{item.desc}</p>}
          <div className="visual-card-tap-hint">
            <Volume2 size={13} />
            <span>Chạm để nghe</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export function MultiVisualGallery({ title, items = [] }) {
  const [activeId, setActiveId] = useState(null);

  const handleItemClick = (item, idx) => {
    setActiveId(idx);
    soundManager.playClick();
    const text = `${item.label || ""}: ${item.timeText || item.title || ""}`;
    speechHelper.speak(text);
  };

  return (
    <div className="multi-visual-gallery-wrap">
      {title && <h3 className="gallery-section-title">{title}</h3>}
      <div className="multi-visual-gallery">
        {items.map((item, idx) => (
          <motion.div
            key={idx}
            className={`gallery-card ${activeId === idx ? "is-selected" : ""}`}
            onClick={() => handleItemClick(item, idx)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            {item.badge && (
              <span className="gallery-card-badge">{item.badge}</span>
            )}
            {item.clock && (
              <ClockGraphic
                hour={item.clock.hour}
                minute={item.clock.minute}
                frameColor={item.clock.frameColor || "#3b82f6"}
                shape={item.clock.shape || "circle"}
                showLabels={false}
                size="sm"
              />
            )}
            {item.label && <h4 className="gallery-card-label">{item.label}</h4>}
            {item.timeText && (
              <div className="gallery-card-time">⏰ {item.timeText}</div>
            )}
            <div className="gallery-card-speak-badge">
              <Volume2 size={12} />
              <span>Chạm nghe</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
