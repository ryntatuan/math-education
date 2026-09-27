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
    <ellipse cx="-11" cy="4" rx="3.5" ry="2" fill={COLORS.cheeks} opacity="0.6" />
    <ellipse cx="11" cy="4" rx="3.5" ry="2" fill={COLORS.cheeks} opacity="0.6" />
    <circle cx="-6.5" cy="1" r="3" fill={COLORS.eye} />
    <circle cx="6.5" cy="1" r="3" fill={COLORS.eye} />
    <circle cx="-7.5" cy="0" r="1.2" fill="#ffffff" />
    <circle cx="5.5" cy="0" r="1.2" fill="#ffffff" />
    <path d="M -2.5 5 Q 0 8 2.5 5" fill="none" stroke={COLORS.mouth} strokeWidth="1.5" strokeLinecap="round" />
  </g>
);

export const NamGraphic = () => (
  <g className="char-nam">
    {/* Chân */}
    <rect x="-6" y="22" width="3.5" height="10" rx="1.5" fill={COLORS.skinShadow} />
    <rect x="2.5" y="22" width="3.5" height="10" rx="1.5" fill={COLORS.skinShadow} />
    <rect x="-7" y="30" width="6" height="4" rx="2" fill={COLORS.nam.shoes} />
    <rect x="1" y="30" width="6" height="4" rx="2" fill={COLORS.nam.shoes} />
    
    {/* Tay (Sau) */}
    <path d="M -8 5 Q -14 10 -11 17" fill="none" stroke={COLORS.skinShadow} strokeWidth="3.5" strokeLinecap="round" />
    <path d="M 8 5 Q 14 10 11 17" fill="none" stroke={COLORS.skinShadow} strokeWidth="3.5" strokeLinecap="round" />
    
    {/* Quần */}
    <path d="M -8.5 14 h 17 v 6 a 2 2 0 0 1 -2 2 h -3.5 v -3 h -3 v 3 h -3.5 a 2 2 0 0 1 -2 -2 z" fill={COLORS.nam.pants} />
    
    {/* Áo */}
    <rect x="-8.5" y="2" width="17" height="14" rx="3.5" fill={COLORS.nam.shirt} />
    <path d="M -4 2 Q 0 6 4 2" fill="none" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
    
    {/* Tay áo */}
    <path d="M -8 2 Q -12 6 -10 9" fill="none" stroke={COLORS.nam.shirt} strokeWidth="4.5" strokeLinecap="round" />
    <path d="M 8 2 Q 12 6 10 9" fill="none" stroke={COLORS.nam.shirt} strokeWidth="4.5" strokeLinecap="round" />

    {/* Đầu */}
    <g transform="translate(0, -13)">
      <circle cx="-14" cy="-2" r="3" fill={COLORS.skinShadow} />
      <circle cx="14" cy="-2" r="3" fill={COLORS.skinShadow} />
      <rect x="-14" y="-14" width="28" height="25" rx="12" fill={COLORS.skin} />
      <CuteFace />
      
      {/* Tóc Nam */}
      <path d="M -15 -2 C -18 -18 18 -18 15 -2 C 16 -12 10 -15 0 -15 C -10 -15 -16 -12 -15 -2 Z" fill={COLORS.nam.hair} />
      <path d="M -14 0 C -18 -20 18 -20 14 0 C 14 -12 5 -12 0 -8 C -5 -4 -14 -4 -14 0 Z" fill={COLORS.nam.hair} />
    </g>
  </g>
);

export const VietGraphic = () => (
  <g className="char-viet">
    {/* Chân */}
    <rect x="-6" y="22" width="3.5" height="10" rx="1.5" fill={COLORS.skinShadow} />
    <rect x="2.5" y="22" width="3.5" height="10" rx="1.5" fill={COLORS.skinShadow} />
    <rect x="-7" y="30" width="6" height="4" rx="2" fill={COLORS.viet.shoes} />
    <rect x="1" y="30" width="6" height="4" rx="2" fill={COLORS.viet.shoes} />
    
    {/* Tay (Sau) */}
    <path d="M -8 5 Q -14 10 -11 17" fill="none" stroke={COLORS.skinShadow} strokeWidth="3.5" strokeLinecap="round" />
    <path d="M 8 5 Q 14 10 11 17" fill="none" stroke={COLORS.skinShadow} strokeWidth="3.5" strokeLinecap="round" />
    
    {/* Quần */}
    <path d="M -8.5 14 h 17 v 6 a 2 2 0 0 1 -2 2 h -3.5 v -3 h -3 v 3 h -3.5 a 2 2 0 0 1 -2 -2 z" fill={COLORS.viet.pants} />
    
    {/* Áo */}
    <rect x="-8.5" y="2" width="17" height="14" rx="3.5" fill={COLORS.viet.shirt} />
    <rect x="-8.5" y="8" width="17" height="3" fill="#ffffff" opacity="0.4" />
    
    {/* Tay áo */}
    <path d="M -8 2 Q -12 6 -10 9" fill="none" stroke={COLORS.viet.shirt} strokeWidth="4.5" strokeLinecap="round" />
    <path d="M 8 2 Q 12 6 10 9" fill="none" stroke={COLORS.viet.shirt} strokeWidth="4.5" strokeLinecap="round" />

    {/* Đầu */}
    <g transform="translate(0, -13)">
      <circle cx="-14" cy="-2" r="3" fill={COLORS.skinShadow} />
      <circle cx="14" cy="-2" r="3" fill={COLORS.skinShadow} />
      <rect x="-14" y="-14" width="28" height="25" rx="12" fill={COLORS.skin} />
      <CuteFace />
      
      {/* Tóc hai mái Việt */}
      <path d="M -15 3 C -18 -18 0 -22 0 -12 C -5 -12 -12 -6 -15 3 Z" fill={COLORS.viet.hair} />
      <path d="M 15 3 C 18 -18 0 -22 0 -12 C 5 -12 12 -6 15 3 Z" fill={COLORS.viet.hair} />
    </g>
  </g>
);

export const MaiGraphic = () => (
  <g className="char-mai">
    {/* Chân */}
    <rect x="-5" y="22" width="3" height="10" rx="1.5" fill={COLORS.skinShadow} />
    <rect x="2" y="22" width="3" height="10" rx="1.5" fill={COLORS.skinShadow} />
    <rect x="-6" y="30" width="5" height="4" rx="2" fill={COLORS.mai.shoes} />
    <rect x="1" y="30" width="5" height="4" rx="2" fill={COLORS.mai.shoes} />
    
    {/* Tay (Sau) */}
    <path d="M -8 5 Q -14 10 -11 17" fill="none" stroke={COLORS.skinShadow} strokeWidth="3" strokeLinecap="round" />
    <path d="M 8 5 Q 14 10 11 17" fill="none" stroke={COLORS.skinShadow} strokeWidth="3" strokeLinecap="round" />
    
    {/* Váy */}
    <path d="M -9 12 h 18 l 2 8 h -22 z" fill={COLORS.mai.pants} />
    
    {/* Áo */}
    <rect x="-8.5" y="2" width="17" height="11" rx="3" fill={COLORS.mai.shirt} />
    <path d="M -4 2 Q 0 6 4 2" fill="none" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
    
    {/* Tay áo */}
    <path d="M -8 2 Q -12 6 -10 9" fill="none" stroke={COLORS.mai.shirt} strokeWidth="4" strokeLinecap="round" />
    <path d="M 8 2 Q 12 6 10 9" fill="none" stroke={COLORS.mai.shirt} strokeWidth="4" strokeLinecap="round" />

    {/* Đầu */}
    <g transform="translate(0, -13)">
      {/* Tóc sau */}
      <path d="M -15 4 C -18 -20 18 -20 15 4 C 15 -10 10 -14 0 -14 C -10 -14 -15 -10 -15 4 Z" fill={COLORS.mai.hair} />
      
      {/* Tóc bím */}
      <path d="M -14 2 Q -20 10 -16 18 Q -12 16 -12 2 Z" fill={COLORS.mai.hair} />
      <path d="M 14 2 Q 20 10 16 18 Q 12 16 12 2 Z" fill={COLORS.mai.hair} />
      
      {/* Nơ bím */}
      <circle cx="-14" cy="4" r="2" fill={COLORS.mai.bow} />
      <path d="M -14 4 l -3 -2 v 4 z" fill={COLORS.mai.bow} />
      <circle cx="14" cy="4" r="2" fill={COLORS.mai.bow} />
      <path d="M 14 4 l 3 -2 v 4 z" fill={COLORS.mai.bow} />

      <circle cx="-14" cy="-2" r="3" fill={COLORS.skinShadow} />
      <circle cx="14" cy="-2" r="3" fill={COLORS.skinShadow} />
      <rect x="-14" y="-14" width="28" height="25" rx="12" fill={COLORS.skin} />
      <CuteFace />
      
      {/* Mái */}
      <path d="M -15 0 C -18 -20 18 -20 15 0 C 12 -8 4 -10 0 -10 C -4 -10 -12 -8 -15 0 Z" fill={COLORS.mai.hair} />
    </g>
  </g>
);

export const MiGraphic = () => (
  <g className="char-mi">
    {/* Chân */}
    <rect x="-5" y="22" width="3" height="10" rx="1.5" fill={COLORS.skinShadow} />
    <rect x="2" y="22" width="3" height="10" rx="1.5" fill={COLORS.skinShadow} />
    <rect x="-6" y="30" width="5" height="4" rx="2" fill={COLORS.mi.shoes} />
    <rect x="1" y="30" width="5" height="4" rx="2" fill={COLORS.mi.shoes} />
    
    {/* Tay (Sau) */}
    <path d="M -8 5 Q -14 10 -11 17" fill="none" stroke={COLORS.skinShadow} strokeWidth="3" strokeLinecap="round" />
    <path d="M 8 5 Q 14 10 11 17" fill="none" stroke={COLORS.skinShadow} strokeWidth="3" strokeLinecap="round" />
    
    {/* Yếm */}
    <rect x="-8.5" y="2" width="17" height="12" rx="3.5" fill={COLORS.mi.shirt} />
    <path d="M -8.5 12 h 17 v 8 a 2 2 0 0 1 -2 2 h -3.5 v -3 h -3 v 3 h -3.5 a 2 2 0 0 1 -2 -2 z" fill={COLORS.mi.pants} />
    <rect x="-6" y="5" width="12" height="7" rx="1.5" fill={COLORS.mi.pants} />
    <rect x="-6" y="2" width="2" height="5" fill={COLORS.mi.pants} />
    <rect x="4" y="2" width="2" height="5" fill={COLORS.mi.pants} />
    <circle cx="-5" cy="8" r="1.2" fill={COLORS.mi.bow} />
    <circle cx="5" cy="8" r="1.2" fill={COLORS.mi.bow} />
    
    {/* Tay áo */}
    <path d="M -8 2 Q -12 6 -10 9" fill="none" stroke={COLORS.mi.shirt} strokeWidth="4" strokeLinecap="round" />
    <path d="M 8 2 Q 12 6 10 9" fill="none" stroke={COLORS.mi.shirt} strokeWidth="4" strokeLinecap="round" />

    {/* Đầu */}
    <g transform="translate(0, -13)">
      <circle cx="-14" cy="-2" r="3" fill={COLORS.skinShadow} />
      <circle cx="14" cy="-2" r="3" fill={COLORS.skinShadow} />
      
      {/* Tóc sau gáy ngang vai */}
      <path d="M -15 8 C -20 -15 20 -15 15 8 C 15 -5 10 -12 0 -12 C -10 -12 -15 -5 -15 8 Z" fill={COLORS.mi.hair} />
      
      <rect x="-14" y="-14" width="28" height="25" rx="12" fill={COLORS.skin} />
      <CuteFace />
      
      {/* Mái */}
      <path d="M -15 2 C -20 -15 20 -15 15 2 C 12 -8 4 -10 0 -10 C -4 -10 -12 -8 -15 2 Z" fill={COLORS.mi.hair} />
      
      {/* Nơ kẹp tóc lệch */}
      <circle cx="10" cy="-6" r="1.5" fill={COLORS.mi.bow} />
      <path d="M 10 -6 l 2.5 -2 v 4 z" fill={COLORS.mi.bow} />
      <path d="M 10 -6 l -2.5 -2 v 4 z" fill={COLORS.mi.bow} />
    </g>
  </g>
);

export const RobotGraphic = () => (
  <g className="char-robot">
    {/* Bánh xe / Chân */}
    <rect x="-6" y="22" width="4" height="10" rx="1" fill={COLORS.robot.dark} />
    <rect x="2" y="22" width="4" height="10" rx="1" fill={COLORS.robot.dark} />
    <rect x="-8" y="28" width="8" height="5" rx="2" fill={COLORS.robot.accent} />
    <rect x="0" y="28" width="8" height="5" rx="2" fill={COLORS.robot.accent} />
    
    {/* Cánh tay */}
    <path d="M -10 6 Q -15 10 -12 16" fill="none" stroke={COLORS.robot.dark} strokeWidth="3" strokeLinecap="round" />
    <path d="M 10 6 Q 15 10 12 16" fill="none" stroke={COLORS.robot.dark} strokeWidth="3" strokeLinecap="round" />
    <circle cx="-12" cy="17" r="2.5" fill={COLORS.robot.accent} />
    <circle cx="12" cy="17" r="2.5" fill={COLORS.robot.accent} />
    
    {/* Thân máy */}
    <rect x="-10" y="2" width="20" height="18" rx="4" fill={COLORS.robot.body} />
    <rect x="-6" y="6" width="12" height="8" rx="2" fill={COLORS.robot.dark} />
    <path d="M -2 10 Q 0 12 2 10" fill="none" stroke="#f43f5e" strokeWidth="2" strokeLinecap="round" />
    
    {/* Đầu */}
    <g transform="translate(0, -12)">
      <rect x="-1" y="-18" width="2" height="6" fill={COLORS.robot.dark} />
      <circle cx="0" cy="-18" r="2.5" fill={COLORS.robot.accent} />
      
      <rect x="-13" y="-12" width="26" height="20" rx="5" fill={COLORS.robot.body} />
      <rect x="-10" y="-8" width="20" height="12" rx="3" fill="#1e293b" />
      
      {/* Khuôn mặt Robot */}
      <rect x="-6.5" y="-5" width="4" height="4" rx="1.5" fill={COLORS.robot.eye} />
      <rect x="2.5" y="-5" width="4" height="4" rx="1.5" fill={COLORS.robot.eye} />
      <path d="M -2 0 Q 0 2 2 0" fill="none" stroke={COLORS.robot.eye} strokeWidth="1.5" strokeLinecap="round" />
      
      <ellipse cx="-8" cy="0" rx="1.5" ry="1" fill={COLORS.cheeks} opacity="0.8" />
      <ellipse cx="8" cy="0" rx="1.5" ry="1" fill={COLORS.cheeks} opacity="0.8" />
      
      {/* Tai robot */}
      <rect x="-15" y="-4" width="2" height="6" rx="1" fill={COLORS.robot.accent} />
      <rect x="13" y="-4" width="2" height="6" rx="1" fill={COLORS.robot.accent} />
    </g>
  </g>
);

/* ─────────────────────────────────────────────────────────────
   COMPONENT CHÍNH - RENDER NHÂN VẬT DỰA VÀO TÊN VÀ KIỂU
   ───────────────────────────────────────────────────────────── */

export function CharacterAvatar({ name, size = 48, className = "" }) {
  let charKey = (name || "nam").toLowerCase();
  if (charKey.includes("rô") || charKey.includes("robot")) charKey = "robot";
  else if (charKey.includes("nam")) charKey = "nam";
  else if (charKey.includes("việt") || charKey.includes("viet")) charKey = "viet";
  else if (charKey.includes("mai")) charKey = "mai";
  else if (charKey.includes("mi")) charKey = "mi";
  else charKey = "nam";

  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 100 100" 
      className={`character-avatar ${className}`}
      style={{ overflow: "visible" }}
    >
      <CharacterDefs />
      
      <circle cx="50" cy="50" r="48" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="2" />
      
      <clipPath id={`clip-${charKey}-${size}`}>
        <circle cx="50" cy="50" r="48" />
      </clipPath>
      
      <g clipPath={`url(#clip-${charKey}-${size})`}>
        {/* Scale 2.5x to focus perfectly on the face and upper shoulders */}
        <g transform="translate(50, 76) scale(2.5)">
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
      {/* Center in a 60x90 canvas. Height is roughly 60 units, so translate(30, 45) is optimal. */}
      <g transform="translate(30, 45)">
        {charKey === "nam" && <NamGraphic />}
        {charKey === "viet" && <VietGraphic />}
        {charKey === "mai" && <MaiGraphic />}
        {charKey === "mi" && <MiGraphic />}
        {charKey === "robot" && <RobotGraphic />}
      </g>
    </svg>
  );
}
