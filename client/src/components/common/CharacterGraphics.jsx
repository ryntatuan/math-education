import React from "react";

// MÀU SẮC CHUẨN ĐỒNG BỘ
const COLORS = {
  skin: "#ffe4d6",
  skinShadow: "#f5c3a9",
  cheeks: "#ff8da1",
  eye: "#1e293b",
  mouth: "#9f1239",
  
  nam: {
    hair: "#27272a", // Đen nhánh
    shirt: "url(#grad-nam)",
    pants: "#1e3a8a",
    shoes: "#334155"
  },
  viet: {
    hair: "#451a03", // Nâu đen
    shirt: "url(#grad-viet)",
    pants: "#14532d",
    shoes: "#334155"
  },
  mai: {
    hair: "#3f2c25", // Nâu trầm
    shirt: "url(#grad-mai)",
    pants: "#831843",
    shoes: "#9f1239",
    bow: "#f43f5e"
  },
  mi: {
    hair: "#78350f", // Nâu sáng
    shirt: "url(#grad-mi)",
    pants: "#78350f",
    shoes: "#b45309",
    bow: "#f59e0b"
  },
  robot: {
    body: "url(#grad-robot)",
    dark: "#64748b",
    light: "#f1f5f9",
    accent: "#0ea5e9",
    eye: "#38bdf8"
  }
};

// ĐỊNH NGHĨA GRADIETNS DÙNG CHUNG
export const CharacterDefs = () => (
  <defs>
    <linearGradient id="grad-nam" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#3b82f6" />
      <stop offset="100%" stopColor="#2563eb" />
    </linearGradient>
    <linearGradient id="grad-viet" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#22c55e" />
      <stop offset="100%" stopColor="#16a34a" />
    </linearGradient>
    <linearGradient id="grad-mai" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#f472b6" />
      <stop offset="100%" stopColor="#db2777" />
    </linearGradient>
    <linearGradient id="grad-mi" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#fbbf24" />
      <stop offset="100%" stopColor="#d97706" />
    </linearGradient>
    <linearGradient id="grad-robot" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#cbd5e1" />
      <stop offset="100%" stopColor="#94a3b8" />
    </linearGradient>
  </defs>
);

// CÁC CHI TIẾT CHUNG TRÊN KHUÔN MẶT BÉ YÊU
const CuteFace = () => (
  <g>
    {/* Má hồng */}
    <ellipse cx="-12" cy="5" rx="5" ry="3.5" fill={COLORS.cheeks} opacity="0.5" />
    <ellipse cx="12" cy="5" rx="5" ry="3.5" fill={COLORS.cheeks} opacity="0.5" />
    
    {/* Mắt to tròn */}
    <circle cx="-11" cy="-1" r="4.5" fill={COLORS.eye} />
    <circle cx="11" cy="-1" r="4.5" fill={COLORS.eye} />
    
    {/* Đốm sáng trong mắt */}
    <circle cx="-12.5" cy="-2.5" r="1.8" fill="#ffffff" />
    <circle cx="-9.5" cy="0.5" r="0.8" fill="#ffffff" />
    <circle cx="9.5" cy="-2.5" r="1.8" fill="#ffffff" />
    <circle cx="12.5" cy="0.5" r="0.8" fill="#ffffff" />
    
    {/* Miệng cười tươi */}
    <path
      d="M -5 6 Q 0 12 5 6"
      fill="none"
      stroke={COLORS.mouth}
      strokeWidth="2"
      strokeLinecap="round"
    />
  </g>
);

const RobotFace = () => (
  <g>
    <rect x="-14" y="-4" width="10" height="7" rx="3.5" fill={COLORS.robot.eye} />
    <rect x="4" y="-4" width="10" height="7" rx="3.5" fill={COLORS.robot.eye} />
    <circle cx="-11" cy="-1.5" r="1.5" fill="#ffffff" opacity="0.8" />
    <circle cx="7" cy="-1.5" r="1.5" fill="#ffffff" opacity="0.8" />
    <path d="M -6 7 L 6 7" fill="none" stroke={COLORS.robot.accent} strokeWidth="2.5" strokeLinecap="round" />
  </g>
);

export const NamGraphic = () => (
  <g className="char-nam">
    {/* Chân */}
    <rect x="-10" y="30" width="7" height="18" rx="3.5" fill={COLORS.skinShadow} />
    <rect x="3" y="30" width="7" height="18" rx="3.5" fill={COLORS.skinShadow} />
    <path d="M -13 46 h 10 v 4 a 2 2 0 0 1 -2 2 h -6 a 2 2 0 0 1 -2 -2 z" fill={COLORS.nam.shoes} />
    <path d="M 0 46 h 10 v 4 a 2 2 0 0 1 -2 2 h -6 a 2 2 0 0 1 -2 -2 z" fill={COLORS.nam.shoes} />
    
    {/* Quần ngắn */}
    <path d="M -13 22 h 26 v 12 a 3 3 0 0 1 -3 3 h -7 a 2 2 0 0 1 -2 -2 v -5 h -2 v 5 a 2 2 0 0 1 -2 2 h -7 a 3 3 0 0 1 -3 -3 z" fill={COLORS.nam.pants} />
    
    {/* Tay (Sau) */}
    <rect x="-16" y="6" width="6" height="16" rx="3" fill={COLORS.skinShadow} transform="rotate(15, -16, 6)" />
    <rect x="10" y="6" width="6" height="16" rx="3" fill={COLORS.skinShadow} transform="rotate(-15, 10, 6)" />
    
    {/* Áo */}
    <path d="M -12 2 h 24 c 2 0 4 2 4 4 v 18 c 0 2 -2 3 -4 3 h -24 c -2 0 -4 -1 -4 -3 v -18 c 0 -2 2 -4 4 -4 z" fill={COLORS.nam.shirt} />
    <path d="M -5 2 Q 0 8 5 2" fill="none" stroke="#ffffff" strokeWidth="2" />
    
    {/* Tay áo */}
    <path d="M -16 2 h 6 v 8 a 3 3 0 0 1 -6 0 z" fill={COLORS.nam.shirt} transform="rotate(15, -16, 2)" />
    <path d="M 10 2 h 6 v 8 a 3 3 0 0 1 -6 0 z" fill={COLORS.nam.shirt} transform="rotate(-15, 10, 2)" />
    <circle cx="-17.5" cy="20" r="3" fill={COLORS.skin} />
    <circle cx="17.5" cy="20" r="3" fill={COLORS.skin} />

    {/* Đầu */}
    <g transform="translate(0, -18)">
      <circle cx="0" cy="-2" r="19" fill={COLORS.nam.hair} />
      <path d="M -17 -2 a 17 17 0 0 0 34 0 a 17 18 0 0 1 -34 0" fill={COLORS.skin} />
      <circle cx="0" cy="2" r="17" fill={COLORS.skin} />
      <circle cx="-17" cy="3" r="3" fill={COLORS.skinShadow} />
      <circle cx="17" cy="3" r="3" fill={COLORS.skinShadow} />
      
      <CuteFace />
      
      <path d="M -19 -2 C -19 -20 0 -24 0 -24 C -6 -18 -8 -10 -8 -4 C -8 -4 -14 -6 -19 -2" fill={COLORS.nam.hair} />
      <path d="M 19 -2 C 19 -20 0 -24 0 -24 C 8 -16 10 -10 10 -4 C 10 -4 15 -6 19 -2" fill={COLORS.nam.hair} />
      <path d="M -8 -4 C -2 -14 10 -14 14 -3 C 8 -8 0 -8 -8 -4" fill={COLORS.nam.hair} />
    </g>
  </g>
);

export const VietGraphic = () => (
  <g className="char-viet">
    {/* Chân */}
    <rect x="-10" y="30" width="7" height="18" rx="3.5" fill={COLORS.skinShadow} />
    <rect x="3" y="30" width="7" height="18" rx="3.5" fill={COLORS.skinShadow} />
    <path d="M -13 46 h 10 v 4 a 2 2 0 0 1 -2 2 h -6 a 2 2 0 0 1 -2 -2 z" fill={COLORS.viet.shoes} />
    <path d="M 0 46 h 10 v 4 a 2 2 0 0 1 -2 2 h -6 a 2 2 0 0 1 -2 -2 z" fill={COLORS.viet.shoes} />
    
    {/* Quần ngắn */}
    <path d="M -13 22 h 26 v 12 a 3 3 0 0 1 -3 3 h -7 a 2 2 0 0 1 -2 -2 v -5 h -2 v 5 a 2 2 0 0 1 -2 2 h -7 a 3 3 0 0 1 -3 -3 z" fill={COLORS.viet.pants} />
    
    {/* Áo thun */}
    <path d="M -12 2 h 24 c 2 0 4 2 4 4 v 18 c 0 2 -2 3 -4 3 h -24 c -2 0 -4 -1 -4 -3 v -18 c 0 -2 2 -4 4 -4 z" fill={COLORS.viet.shirt} />
    <rect x="-10" y="10" width="20" height="4" fill="#ffffff" opacity="0.5" />
    
    {/* Tay áo & Cánh tay */}
    <path d="M -16 2 h 6 v 8 a 3 3 0 0 1 -6 0 z" fill={COLORS.viet.shirt} transform="rotate(15, -16, 2)" />
    <path d="M 10 2 h 6 v 8 a 3 3 0 0 1 -6 0 z" fill={COLORS.viet.shirt} transform="rotate(-15, 10, 2)" />
    <rect x="-16" y="6" width="6" height="16" rx="3" fill={COLORS.skinShadow} transform="rotate(15, -16, 6)" />
    <rect x="10" y="6" width="6" height="16" rx="3" fill={COLORS.skinShadow} transform="rotate(-15, 10, 6)" />
    <circle cx="-17.5" cy="20" r="3" fill={COLORS.skin} />
    <circle cx="17.5" cy="20" r="3" fill={COLORS.skin} />

    {/* Đầu */}
    <g transform="translate(0, -18)">
      <circle cx="0" cy="-2" r="19" fill={COLORS.viet.hair} />
      <circle cx="0" cy="2" r="17" fill={COLORS.skin} />
      <circle cx="-17" cy="3" r="3" fill={COLORS.skinShadow} />
      <circle cx="17" cy="3" r="3" fill={COLORS.skinShadow} />
      <CuteFace />
      <path d="M -18 -4 Q 0 -18 18 -4 Q 0 -22 -18 -4 Z" fill={COLORS.viet.hair} />
      <path d="M -14 -6 L -10 2 L -6 -8 Z" fill={COLORS.viet.hair} />
      <path d="M 14 -6 L 10 2 L 6 -8 Z" fill={COLORS.viet.hair} />
    </g>
  </g>
);

export const MaiGraphic = () => (
  <g className="char-mai">
    {/* Chân */}
    <rect x="-8" y="30" width="5" height="18" rx="2.5" fill={COLORS.skinShadow} />
    <rect x="3" y="30" width="5" height="18" rx="2.5" fill={COLORS.skinShadow} />
    <path d="M -11 46 h 9 v 3 a 2 2 0 0 1 -2 2 h -5 a 2 2 0 0 1 -2 -2 z" fill={COLORS.mai.shoes} />
    <path d="M 2 46 h 9 v 3 a 2 2 0 0 1 -2 2 h -5 a 2 2 0 0 1 -2 -2 z" fill={COLORS.mai.shoes} />
    
    {/* Váy */}
    <path d="M -14 28 C -16 34 16 34 14 28 Z" fill={COLORS.mai.pants} />
    <path d="M -12 18 h 24 l 2 12 h -28 z" fill={COLORS.mai.pants} />
    
    {/* Cánh tay */}
    <rect x="-15" y="6" width="5" height="15" rx="2.5" fill={COLORS.skinShadow} transform="rotate(20, -15, 6)" />
    <rect x="10" y="6" width="5" height="15" rx="2.5" fill={COLORS.skinShadow} transform="rotate(-20, 10, 6)" />
    
    {/* Áo */}
    <path d="M -11 2 h 22 c 2 0 3 2 3 4 v 14 h -28 v -14 c 0 -2 1 -4 3 -4 z" fill={COLORS.mai.shirt} />
    <circle cx="-13" cy="6" r="5" fill={COLORS.mai.shirt} />
    <circle cx="13" cy="6" r="5" fill={COLORS.mai.shirt} />
    <circle cx="-17" cy="20" r="2.5" fill={COLORS.skin} />
    <circle cx="17" cy="20" r="2.5" fill={COLORS.skin} />

    {/* Đầu */}
    <g transform="translate(0, -18)">
      <path d="M -16 0 C -24 5 -26 15 -20 22 C -18 24 -14 22 -15 15 C -15 8 -12 4 -16 0" fill={COLORS.mai.hair} />
      <path d="M 16 0 C 24 5 26 15 20 22 C 18 24 14 22 15 15 C 15 8 12 4 16 0" fill={COLORS.mai.hair} />
      
      <circle cx="-16" cy="2" r="3" fill={COLORS.mai.bow} />
      <path d="M -16 2 l -4 -3 v 6 z" fill={COLORS.mai.bow} />
      <path d="M -16 2 l 4 -3 v 6 z" fill={COLORS.mai.bow} />
      <circle cx="16" cy="2" r="3" fill={COLORS.mai.bow} />
      <path d="M 16 2 l -4 -3 v 6 z" fill={COLORS.mai.bow} />
      <path d="M 16 2 l 4 -3 v 6 z" fill={COLORS.mai.bow} />

      <circle cx="0" cy="2" r="16" fill={COLORS.skin} />
      <CuteFace />
      <path d="M -16 -4 C -16 -20 16 -20 16 -4 C 16 -12 8 -12 0 -10 C -8 -12 -16 -12 -16 -4" fill={COLORS.mai.hair} />
    </g>
  </g>
);

export const MiGraphic = () => (
  <g className="char-mi">
    {/* Chân */}
    <rect x="-8" y="30" width="5" height="18" rx="2.5" fill={COLORS.skinShadow} />
    <rect x="3" y="30" width="5" height="18" rx="2.5" fill={COLORS.skinShadow} />
    <path d="M -11 46 h 9 v 3 a 2 2 0 0 1 -2 2 h -5 a 2 2 0 0 1 -2 -2 z" fill={COLORS.mi.shoes} />
    <path d="M 2 46 h 9 v 3 a 2 2 0 0 1 -2 2 h -5 a 2 2 0 0 1 -2 -2 z" fill={COLORS.mi.shoes} />
    
    {/* Quần yếm */}
    <path d="M -13 22 h 26 v 10 a 3 3 0 0 1 -3 3 h -7 a 2 2 0 0 1 -2 -2 v -4 h -2 v 4 a 2 2 0 0 1 -2 2 h -7 a 3 3 0 0 1 -3 -3 z" fill={COLORS.mi.pants} />
    <rect x="-9" y="12" width="18" height="12" rx="2" fill={COLORS.mi.pants} />
    <rect x="-9" y="2" width="3" height="12" fill={COLORS.mi.pants} />
    <rect x="6" y="2" width="3" height="12" fill={COLORS.mi.pants} />
    <circle cx="-7.5" cy="14" r="2" fill={COLORS.mi.bow} />
    <circle cx="7.5" cy="14" r="2" fill={COLORS.mi.bow} />
    
    <rect x="-15" y="6" width="5" height="15" rx="2.5" fill={COLORS.skinShadow} transform="rotate(20, -15, 6)" />
    <rect x="10" y="6" width="5" height="15" rx="2.5" fill={COLORS.skinShadow} transform="rotate(-20, 10, 6)" />
    <path d="M -11 2 h 22 c 2 0 3 2 3 4 v 16 h -28 v -16 c 0 -2 1 -4 3 -4 z" fill={COLORS.mi.shirt} />
    
    <path d="M -15 2 h 5 v 8 a 2 2 0 0 1 -5 0 z" fill={COLORS.mi.shirt} transform="rotate(20, -15, 2)" />
    <path d="M 10 2 h 5 v 8 a 2 2 0 0 1 -5 0 z" fill={COLORS.mi.shirt} transform="rotate(-20, 10, 2)" />
    <circle cx="-17" cy="20" r="2.5" fill={COLORS.skin} />
    <circle cx="17" cy="20" r="2.5" fill={COLORS.skin} />

    {/* Đầu */}
    <g transform="translate(0, -18)">
      <circle cx="0" cy="-2" r="18" fill={COLORS.mi.hair} />
      <path d="M -18 -2 v 10 a 6 6 0 0 0 12 0 v -10 z" fill={COLORS.mi.hair} />
      <path d="M 6 -2 v 10 a 6 6 0 0 0 12 0 v -10 z" fill={COLORS.mi.hair} />
      
      <circle cx="0" cy="2" r="16" fill={COLORS.skin} />
      <CuteFace />
      <path d="M -16 -4 C -16 -20 16 -20 16 -4 C 16 -10 4 -12 -16 -4" fill={COLORS.mi.hair} />
      
      <circle cx="10" cy="-10" r="3" fill={COLORS.mi.bow} />
      <path d="M 10 -10 l -4 -3 v 6 z" fill={COLORS.mi.bow} />
      <path d="M 10 -10 l 4 -3 v 6 z" fill={COLORS.mi.bow} />
    </g>
  </g>
);

export const RobotGraphic = () => (
  <g className="char-robot">
    <rect x="-8" y="30" width="5" height="12" rx="2" fill={COLORS.robot.dark} />
    <rect x="3" y="30" width="5" height="12" rx="2" fill={COLORS.robot.dark} />
    <path d="M -11 42 h 11 v 6 a 3 3 0 0 1 -11 0 z" fill={COLORS.robot.accent} />
    <path d="M 0 42 h 11 v 6 a 3 3 0 0 1 -11 0 z" fill={COLORS.robot.accent} />
    
    <rect x="-16" y="8" width="6" height="14" rx="3" fill={COLORS.robot.dark} transform="rotate(30, -16, 8)" />
    <rect x="10" y="8" width="6" height="14" rx="3" fill={COLORS.robot.dark} transform="rotate(-30, 10, 8)" />
    <path d="M -23 20 a 4 4 0 1 0 8 0 h -2 a 2 2 0 1 1 -4 0 z" fill={COLORS.robot.accent} />
    <path d="M 15 20 a 4 4 0 1 1 8 0 h -2 a 2 2 0 1 0 -4 0 z" fill={COLORS.robot.accent} />
    
    <rect x="-14" y="4" width="28" height="26" rx="6" fill={COLORS.robot.body} />
    <rect x="-9" y="10" width="18" height="14" rx="3" fill={COLORS.robot.dark} />
    <rect x="-7" y="12" width="14" height="10" rx="2" fill="#1e293b" />
    <path d="M 0 18 C 0 18 -3 15 -3 13.5 A 1.5 1.5 0 0 1 0 13.5 A 1.5 1.5 0 0 1 3 13.5 C 3 15 0 18 0 18" fill="#f43f5e" />
    
    <g transform="translate(0, -16)">
      <rect x="-1.5" y="-24" width="3" height="8" fill={COLORS.robot.dark} />
      <circle cx="0" cy="-24" r="3.5" fill={COLORS.robot.accent} />
      <circle cx="0" cy="-24" r="1.5" fill="#ffffff" />
      <rect x="-16" y="-16" width="32" height="24" rx="5" fill={COLORS.robot.body} />
      <rect x="-19" y="-6" width="3" height="8" rx="1.5" fill={COLORS.robot.accent} />
      <rect x="16" y="-6" width="3" height="8" rx="1.5" fill={COLORS.robot.accent} />
      <rect x="-14" y="-13" width="28" height="18" rx="3" fill="#1e293b" />
      <RobotFace />
    </g>
  </g>
);

/* ─────────────────────────────────────────────────────────────
   COMPONENT CHÍNH - RENDER NHÂN VẬT DỰA VÀO TÊN VÀ KIỂU
   ───────────────────────────────────────────────────────────── */

export function CharacterAvatar({ name, size = 48, className = "" }) {
  // Normalize string for safety (e.g. "Rô-bốt" -> "robot")
  let charKey = (name || "nam").toLowerCase();
  if (charKey.includes("rô") || charKey.includes("robot")) charKey = "robot";
  else if (charKey.includes("nam")) charKey = "nam";
  else if (charKey.includes("việt") || charKey.includes("viet")) charKey = "viet";
  else if (charKey.includes("mai")) charKey = "mai";
  else if (charKey.includes("mi")) charKey = "mi";
  else charKey = "nam"; // default fallback

  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 100 100" 
      className={`character-avatar ${className}`}
      style={{ overflow: "visible" }}
    >
      <CharacterDefs />
      
      {/* Vòng tròn nền Avatar */}
      <circle cx="50" cy="50" r="48" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="2" />
      
      {/* Clip path để ẩn phần thân bị tràn khỏi vòng tròn */}
      <clipPath id={`clip-${charKey}-${size}`}>
        <circle cx="50" cy="50" r="48" />
      </clipPath>
      
      {/* Vẽ nhân vật, scale to lên để lấy phần đầu + vai */}
      <g clipPath={`url(#clip-${charKey}-${size})`}>
        <g transform="translate(50, 75) scale(1.6)">
          {charKey === "nam" && <NamGraphic />}
          {charKey === "viet" && <VietGraphic />}
          {charKey === "mai" && <MaiGraphic />}
          {charKey === "mi" && <MiGraphic />}
          {charKey === "robot" && <RobotGraphic />}
        </g>
      </g>
    </svg>
  );
}

export function CharacterFullBody({ name, width = 60, height = 90 }) {
  let charKey = (name || "nam").toLowerCase();
  if (charKey.includes("rô") || charKey.includes("robot")) charKey = "robot";
  else if (charKey.includes("nam")) charKey = "nam";
  else if (charKey.includes("việt") || charKey.includes("viet")) charKey = "viet";
  else if (charKey.includes("mai")) charKey = "mai";
  else if (charKey.includes("mi")) charKey = "mi";
  else charKey = "nam";

  return (
    <svg width={width} height={height} viewBox="0 0 60 90" className="character-full" style={{ overflow: "visible" }}>
      <CharacterDefs />
      {/* Đặt tâm nhân vật vào giữa khung */}
      <g transform="translate(30, 40)">
        {charKey === "nam" && <NamGraphic />}
        {charKey === "viet" && <VietGraphic />}
        {charKey === "mai" && <MaiGraphic />}
        {charKey === "mi" && <MiGraphic />}
        {charKey === "robot" && <RobotGraphic />}
      </g>
    </svg>
  );
}
