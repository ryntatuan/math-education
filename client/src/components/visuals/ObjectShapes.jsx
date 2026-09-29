/**
 * HÌNH DẠNG ĐỒ VẬT vẽ bằng hình học cơ bản — dùng cho `measureBoard` (Lớp 1 CĐ 7).
 *
 * 🔴 VÌ SAO PHẢI VẼ HÌNH THẬT, KHÔNG DÙNG THANH MÀU: bài học là "ĐO ĐỘ DÀI ĐỒ VẬT".
 * Một thanh chữ nhật ghi "Đoàn tàu" không cho bé biết đó là cái gì, cũng không dạy được
 * "đặt vạch 0 vào một ĐẦU của vật". Vật phải TRÔNG RA VẬT, và dài đúng số xăng-ti-mét.
 *
 * Cách vẽ: mọi hình vẽ trong hộp (0,0)-(w,h) — bề ngang là chiều dài vật (khi vật nằm ngang)
 * hoặc bề cao là chiều cao vật (khi vật đứng). `objectShapes.js` cho hệ số cao/rộng.
 * Nét vẽ dùng chung màu mực + nét dày theo kích thước nên hình nhỏ vẫn rõ.
 */

const S = "#1e293b"; // màu mực
const S2 = "#64748b";

/** Bánh xe — dùng cho xe cộ. */
function Wheels({ xs, r, y }) {
  return xs.map((x, i) => (
    <g key={i}>
      <circle
        cx={x}
        cy={y}
        r={r}
        fill="#334155"
        stroke={S}
        strokeWidth={r * 0.12}
      />
      <circle cx={x} cy={y} r={r * 0.42} fill="#cbd5e1" />
    </g>
  ));
}

function drawTrain(w, h) {
  const r = h * 0.2;
  const y = h - r;
  return (
    <>
      <rect
        x={w * 0.62}
        y={h * 0.16}
        width={w * 0.38}
        height={h * 0.64}
        rx={h * 0.08}
        fill="#3b82f6"
        stroke={S}
        strokeWidth={h * 0.03}
      />
      <rect
        x={w * 0.67}
        y={h * 0.24}
        width={w * 0.26}
        height={h * 0.2}
        rx={h * 0.04}
        fill="#dbeafe"
      />
      <rect
        x={0}
        y={h * 0.34}
        width={w * 0.66}
        height={h * 0.46}
        rx={h * 0.12}
        fill="#ef4444"
        stroke={S}
        strokeWidth={h * 0.03}
      />
      <rect
        x={w * 0.46}
        y={h * 0.04}
        width={w * 0.12}
        height={h * 0.32}
        rx={h * 0.04}
        fill="#1f2937"
      />
      <rect
        x={w * 0.43}
        y={h * 0.02}
        width={w * 0.18}
        height={h * 0.06}
        rx={h * 0.03}
        fill="#374151"
      />
      <circle
        cx={w * 0.58}
        cy={h * 0.42}
        r={h * 0.09}
        fill="#fde68a"
        stroke={S}
        strokeWidth={h * 0.02}
      />
      <circle
        cx={w * 0.06}
        cy={h * 0.5}
        r={h * 0.08}
        fill="#fef08a"
        stroke={S}
        strokeWidth={h * 0.02}
      />
      <Wheels xs={[w * 0.16, w * 0.42, w * 0.78]} r={r} y={y} />
    </>
  );
}

function drawMixerTruck(w, h) {
  const r = h * 0.19;
  const y = h - r;
  return (
    <>
      <rect
        x={0}
        y={h * 0.7}
        width={w}
        height={h * 0.12}
        rx={h * 0.04}
        fill="#475569"
      />
      <rect
        x={0}
        y={h * 0.2}
        width={w * 0.3}
        height={h * 0.54}
        rx={h * 0.08}
        fill="#3b82f6"
        stroke={S}
        strokeWidth={h * 0.03}
      />
      <rect
        x={w * 0.05}
        y={h * 0.26}
        width={w * 0.2}
        height={h * 0.18}
        rx={h * 0.04}
        fill="#dbeafe"
      />
      <circle
        cx={w * 0.68}
        cy={h * 0.36}
        r={h * 0.31}
        fill="#f59e0b"
        stroke={S}
        strokeWidth={h * 0.03}
      />
      <path
        d={`M ${w * 0.52} ${h * 0.2} L ${w * 0.84} ${h * 0.52} M ${w * 0.5} ${h * 0.34} L ${w * 0.86} ${h * 0.34}`}
        stroke="#b45309"
        strokeWidth={h * 0.035}
        fill="none"
      />
      <Wheels xs={[w * 0.16, w * 0.78]} r={r} y={y} />
    </>
  );
}

function drawRoller(w, h) {
  const r = h * 0.3;
  return (
    <>
      <rect
        x={0}
        y={h * 0.5}
        width={w}
        height={h * 0.14}
        rx={h * 0.04}
        fill="#475569"
      />
      <rect
        x={w * 0.3}
        y={h * 0.14}
        width={w * 0.42}
        height={h * 0.42}
        rx={h * 0.08}
        fill="#f59e0b"
        stroke={S}
        strokeWidth={h * 0.03}
      />
      <rect
        x={w * 0.35}
        y={h * 0.2}
        width={w * 0.32}
        height={h * 0.16}
        rx={h * 0.04}
        fill="#dbeafe"
      />
      <rect
        x={w * 0.32}
        y={0}
        width={w * 0.06}
        height={h * 0.2}
        fill="#78350f"
      />
      <circle
        cx={w * 0.14}
        cy={h - r}
        r={r}
        fill="#94a3b8"
        stroke={S}
        strokeWidth={h * 0.03}
      />
      <circle cx={w * 0.14} cy={h - r} r={r * 0.3} fill="#cbd5e1" />
      <circle
        cx={w * 0.86}
        cy={h - r * 0.86}
        r={r * 0.86}
        fill="#334155"
        stroke={S}
        strokeWidth={h * 0.03}
      />
      <circle cx={w * 0.86} cy={h - r * 0.86} r={r * 0.32} fill="#cbd5e1" />
    </>
  );
}

function drawBus(w, h) {
  const r = h * 0.18;
  const y = h - r;
  return (
    <>
      <rect
        x={0}
        y={h * 0.1}
        width={w}
        height={h * 0.66}
        rx={h * 0.12}
        fill="#f59e0b"
        stroke={S}
        strokeWidth={h * 0.03}
      />
      {[0.08, 0.38, 0.68].map((t, i) => (
        <rect
          key={i}
          x={w * t}
          y={h * 0.18}
          width={w * 0.24}
          height={h * 0.24}
          rx={h * 0.04}
          fill="#dbeafe"
        />
      ))}
      <rect x={0} y={h * 0.5} width={w} height={h * 0.07} fill="#ea580c" />
      <Wheels xs={[w * 0.2, w * 0.8]} r={r} y={y} />
    </>
  );
}

function drawCar(w, h) {
  const r = h * 0.2;
  const y = h - r;
  return (
    <>
      <rect
        x={0}
        y={h * 0.48}
        width={w}
        height={h * 0.32}
        rx={h * 0.1}
        fill="#ef4444"
        stroke={S}
        strokeWidth={h * 0.03}
      />
      <path
        d={`M ${w * 0.2} ${h * 0.5} L ${w * 0.34} ${h * 0.14} L ${w * 0.66} ${h * 0.14} L ${w * 0.8} ${h * 0.5} Z`}
        fill="#fca5a5"
        stroke={S}
        strokeWidth={h * 0.03}
      />
      <path
        d={`M ${w * 0.28} ${h * 0.46} L ${w * 0.37} ${h * 0.2} L ${w * 0.5} ${h * 0.2} L ${w * 0.5} ${h * 0.46} Z`}
        fill="#dbeafe"
      />
      <path
        d={`M ${w * 0.54} ${h * 0.2} L ${w * 0.64} ${h * 0.2} L ${w * 0.72} ${h * 0.46} L ${w * 0.54} ${h * 0.46} Z`}
        fill="#dbeafe"
      />
      <Wheels xs={[w * 0.22, w * 0.78]} r={r} y={y} />
    </>
  );
}

function drawCrane(w, h) {
  const r = h * 0.15;
  const y = h - r;
  return (
    <>
      <rect
        x={0}
        y={h * 0.6}
        width={w * 0.55}
        height={h * 0.26}
        rx={h * 0.06}
        fill="#f59e0b"
        stroke={S}
        strokeWidth={h * 0.03}
      />
      <rect
        x={w * 0.3}
        y={h * 0.16}
        width={w * 0.9}
        height={h * 0.1}
        rx={h * 0.04}
        fill="#fbbf24"
        stroke={S}
        strokeWidth={h * 0.03}
      />
      <rect
        x={w * 0.22}
        y={h * 0.18}
        width={w * 0.1}
        height={h * 0.46}
        fill="#f59e0b"
        stroke={S}
        strokeWidth={h * 0.03}
      />
      <rect
        x={w * 0.24}
        y={h * 0.36}
        width={w * 0.06}
        height={h * 0.1}
        fill="#dbeafe"
      />
      <line
        x1={w * 0.94}
        y1={h * 0.24}
        x2={w * 0.94}
        y2={h * 0.42}
        stroke={S2}
        strokeWidth={h * 0.035}
      />
      <rect
        x={w * 0.9}
        y={h * 0.42}
        width={w * 0.08}
        height={h * 0.08}
        rx={h * 0.02}
        fill="#64748b"
      />
      <Wheels xs={[w * 0.12, w * 0.4]} r={r} y={y} />
    </>
  );
}

function drawPencil(w, h, color) {
  const bh = h * 0.52;
  const by = (h - bh) / 2;
  return (
    <>
      <rect
        x={0}
        y={by}
        width={w * 0.06}
        height={bh}
        rx={h * 0.05}
        fill="#f9a8d4"
        stroke={S}
        strokeWidth={h * 0.03}
      />
      <rect
        x={w * 0.055}
        y={by}
        width={w * 0.04}
        height={bh}
        fill="#cbd5e1"
        stroke={S}
        strokeWidth={h * 0.02}
      />
      <rect
        x={w * 0.09}
        y={by}
        width={w * 0.66}
        height={bh}
        fill={color || "#f59e0b"}
        stroke={S}
        strokeWidth={h * 0.03}
      />
      <path
        d={`M ${w * 0.75} ${by} L ${w * 0.93} ${by} L ${w} ${by + bh / 2} L ${w * 0.93} ${by + bh} L ${w * 0.75} ${by + bh} Z`}
        fill="#fde68a"
        stroke={S}
        strokeWidth={h * 0.03}
      />
      <path
        d={`M ${w * 0.93} ${by} L ${w} ${by + bh / 2} L ${w * 0.93} ${by + bh} Z`}
        fill="#475569"
      />
    </>
  );
}

function drawCrayon(w, h) {
  return (
    <>
      <rect
        x={0}
        y={h * 0.26}
        width={w * 0.76}
        height={h * 0.48}
        rx={h * 0.12}
        fill="#f472b6"
        stroke={S}
        strokeWidth={h * 0.03}
      />
      <path
        d={`M ${w * 0.74} ${h * 0.26} L ${w} ${h * 0.5} L ${w * 0.74} ${h * 0.74} Z`}
        fill="#f9a8d4"
        stroke={S}
        strokeWidth={h * 0.03}
      />
      <rect
        x={w * 0.08}
        y={h * 0.32}
        width={w * 0.5}
        height={h * 0.1}
        fill="#fdf2f8"
        opacity="0.8"
      />
    </>
  );
}

function drawPen(w, h) {
  const bh = h * 0.34;
  const by = (h - bh) / 2;
  return (
    <>
      <rect
        x={0}
        y={by}
        width={w * 0.84}
        height={bh}
        rx={bh * 0.4}
        fill="#2563eb"
        stroke={S}
        strokeWidth={h * 0.03}
      />
      <rect
        x={w * 0.1}
        y={by}
        width={w * 0.34}
        height={bh * 0.4}
        rx={bh * 0.2}
        fill="#60a5fa"
      />
      <rect x={w * 0.62} y={by} width={w * 0.22} height={bh} fill="#1e293b" />
      <path
        d={`M ${w * 0.84} ${by} L ${w * 0.97} ${by + bh / 2} L ${w * 0.84} ${by + bh} Z`}
        fill="#94a3b8"
        stroke={S}
        strokeWidth={h * 0.02}
      />
    </>
  );
}

function drawToothbrush(w, h) {
  return (
    <>
      <rect
        x={0}
        y={h * 0.4}
        width={w * 0.74}
        height={h * 0.2}
        rx={h * 0.09}
        fill="#0ea5e9"
        stroke={S}
        strokeWidth={h * 0.03}
      />
      <rect
        x={w * 0.7}
        y={h * 0.28}
        width={w * 0.3}
        height={h * 0.44}
        rx={h * 0.16}
        fill="#0284c7"
        stroke={S}
        strokeWidth={h * 0.03}
      />
      {[0.74, 0.8, 0.86, 0.92].map((t, i) => (
        <rect
          key={i}
          x={w * t}
          y={h * 0.14}
          width={w * 0.035}
          height={h * 0.16}
          rx={h * 0.02}
          fill="#f8fafc"
          stroke={S}
          strokeWidth={h * 0.015}
        />
      ))}
      <circle
        cx={w * 0.06}
        cy={h * 0.5}
        r={h * 0.055}
        fill="#e0f2fe"
        stroke={S}
        strokeWidth={h * 0.02}
      />
    </>
  );
}

function drawScrewdriver(w, h) {
  return (
    <>
      <rect
        x={0}
        y={h * 0.2}
        width={w * 0.42}
        height={h * 0.6}
        rx={h * 0.24}
        fill="#dc2626"
        stroke={S}
        strokeWidth={h * 0.03}
      />
      {[0.06, 0.12, 0.18].map((t, i) => (
        <rect
          key={i}
          x={w * t}
          y={h * 0.28}
          width={w * 0.04}
          height={h * 0.44}
          fill="#b91c1c"
        />
      ))}
      <rect
        x={w * 0.4}
        y={h * 0.44}
        width={w * 0.48}
        height={h * 0.12}
        fill="#94a3b8"
        stroke={S}
        strokeWidth={h * 0.03}
      />
      <path
        d={`M ${w * 0.86} ${h * 0.42} L ${w} ${h * 0.44} L ${w} ${h * 0.56} L ${w * 0.86} ${h * 0.58} Z`}
        fill="#cbd5e1"
        stroke={S}
        strokeWidth={h * 0.03}
      />
    </>
  );
}

function drawGamepad(w, h) {
  return (
    <>
      <rect
        x={0}
        y={h * 0.18}
        width={w}
        height={h * 0.64}
        rx={h * 0.3}
        fill="#334155"
        stroke={S}
        strokeWidth={h * 0.03}
      />
      <rect
        x={w * 0.16}
        y={h * 0.44}
        width={w * 0.12}
        height={h * 0.12}
        fill="#94a3b8"
      />
      <rect
        x={w * 0.28}
        y={h * 0.32}
        width={w * 0.12}
        height={h * 0.12}
        fill="#94a3b8"
      />
      <circle cx={w * 0.62} cy={h * 0.4} r={h * 0.09} fill="#ef4444" />
      <circle cx={w * 0.76} cy={h * 0.52} r={h * 0.09} fill="#22c55e" />
    </>
  );
}

function drawWatch(w, h) {
  return (
    <>
      <rect
        x={w * 0.24}
        y={0}
        width={w * 0.52}
        height={h * 0.3}
        rx={w * 0.1}
        fill="#2563eb"
        stroke={S}
        strokeWidth={w * 0.06}
      />
      <rect
        x={w * 0.24}
        y={h * 0.7}
        width={w * 0.52}
        height={h * 0.3}
        rx={w * 0.1}
        fill="#2563eb"
        stroke={S}
        strokeWidth={w * 0.06}
      />
      <rect
        x={0}
        y={h * 0.22}
        width={w}
        height={h * 0.56}
        rx={w * 0.26}
        fill="#cbd5e1"
        stroke={S}
        strokeWidth={w * 0.07}
      />
      <rect
        x={w * 0.13}
        y={h * 0.28}
        width={w * 0.74}
        height={h * 0.44}
        rx={w * 0.16}
        fill="#0f172a"
      />
      <rect
        x={w * 0.9}
        y={h * 0.44}
        width={w * 0.14}
        height={h * 0.12}
        rx={w * 0.04}
        fill="#94a3b8"
        stroke={S}
        strokeWidth={w * 0.04}
      />
    </>
  );
}

function drawPhone(w, h) {
  return (
    <>
      <rect
        x={0}
        y={0}
        width={w}
        height={h}
        rx={w * 0.2}
        fill="#1f2937"
        stroke={S}
        strokeWidth={w * 0.07}
      />
      <rect
        x={w * 0.09}
        y={h * 0.06}
        width={w * 0.82}
        height={h * 0.8}
        rx={w * 0.12}
        fill="#60a5fa"
      />
      <circle cx={w * 0.5} cy={h * 0.92} r={w * 0.1} fill="#94a3b8" />
    </>
  );
}

function drawPencilCase(w, h) {
  return (
    <>
      <rect
        x={0}
        y={h * 0.14}
        width={w}
        height={h * 0.72}
        rx={h * 0.26}
        fill="#0ea5e9"
        stroke={S}
        strokeWidth={h * 0.03}
      />
      <rect x={0} y={h * 0.44} width={w} height={h * 0.07} fill="#075985" />
      <circle
        cx={w * 0.9}
        cy={h * 0.47}
        r={h * 0.07}
        fill="#fbbf24"
        stroke={S}
        strokeWidth={h * 0.025}
      />
    </>
  );
}

function drawRuler(w, h) {
  const n = 10;
  return (
    <>
      <rect
        x={0}
        y={h * 0.28}
        width={w}
        height={h * 0.44}
        rx={h * 0.08}
        fill="#fef3c7"
        stroke="#d97706"
        strokeWidth={h * 0.05}
      />
      {Array.from({ length: n + 1 }).map((_, i) => (
        <line
          key={i}
          x1={(w * i) / n}
          y1={h * 0.32}
          x2={(w * i) / n}
          y2={h * (i % 5 === 0 ? 0.52 : 0.45)}
          stroke={S}
          strokeWidth={h * 0.03}
        />
      ))}
    </>
  );
}

function drawEraser(w, h) {
  return (
    <>
      <rect
        x={0}
        y={h * 0.3}
        width={w}
        height={h * 0.5}
        rx={h * 0.14}
        fill="#f9a8d4"
        stroke={S}
        strokeWidth={h * 0.03}
      />
      <path
        d={`M ${h * 0.14} ${h * 0.3} h ${w - h * 0.28} a ${h * 0.14} ${h * 0.14} 0 0 1 0 ${h * 0.02} h ${-(w - h * 0.28)} Z`}
        fill="#f472b6"
      />
      <rect
        x={w * 0.24}
        y={h * 0.52}
        width={w * 0.52}
        height={h * 0.16}
        rx={h * 0.05}
        fill="#fdf2f8"
      />
    </>
  );
}

function drawPaperclip(w, h) {
  const t = h * 0.14;
  return (
    <>
      <rect
        x={t / 2}
        y={t / 2}
        width={w - t}
        height={h - t}
        rx={h * 0.34}
        fill="none"
        stroke="#94a3b8"
        strokeWidth={t}
      />
      <path
        d={`M ${w * 0.78} ${h * 0.3} L ${w * 0.78} ${h * 0.66} Q ${w * 0.78} ${h * 0.82} ${w * 0.6} ${h * 0.82} L ${w * 0.3} ${h * 0.82} Q ${w * 0.18} ${h * 0.82} ${w * 0.18} ${h * 0.66} L ${w * 0.18} ${h * 0.34}`}
        fill="none"
        stroke="#94a3b8"
        strokeWidth={t * 0.8}
      />
    </>
  );
}

function drawGiraffe(w, h) {
  return (
    <>
      {[0.14, 0.34, 0.6, 0.78].map((t, i) => (
        <rect
          key={i}
          x={w * t}
          y={h * 0.66}
          width={w * 0.1}
          height={h * 0.34}
          rx={w * 0.04}
          fill="#fbbf24"
          stroke={S}
          strokeWidth={w * 0.05}
        />
      ))}
      <rect
        x={w * 0.06}
        y={h * 0.42}
        width={w * 0.88}
        height={h * 0.28}
        rx={h * 0.08}
        fill="#fbbf24"
        stroke={S}
        strokeWidth={w * 0.05}
      />
      <rect
        x={w * 0.1}
        y={h * 0.06}
        width={w * 0.26}
        height={h * 0.4}
        rx={h * 0.06}
        fill="#fbbf24"
        stroke={S}
        strokeWidth={w * 0.05}
      />
      <rect
        x={w * 0.02}
        y={0}
        width={w * 0.42}
        height={h * 0.1}
        rx={h * 0.04}
        fill="#f59e0b"
        stroke={S}
        strokeWidth={w * 0.05}
      />
      <line
        x1={w * 0.14}
        y1={0}
        x2={w * 0.14}
        y2={h * 0.04}
        stroke={S}
        strokeWidth={w * 0.05}
      />
      <line
        x1={w * 0.3}
        y1={0}
        x2={w * 0.3}
        y2={h * 0.04}
        stroke={S}
        strokeWidth={w * 0.05}
      />
      {[0.3, 0.5, 0.7].map((t, i) => (
        <circle key={i} cx={w * t} cy={h * 0.55} r={w * 0.06} fill="#d97706" />
      ))}
    </>
  );
}

function drawZebra(w, h) {
  return (
    <>
      {[0.14, 0.3, 0.58, 0.72].map((t, i) => (
        <rect
          key={i}
          x={w * t}
          y={h * 0.62}
          width={w * 0.07}
          height={h * 0.38}
          fill="#e2e8f0"
          stroke={S}
          strokeWidth={h * 0.03}
        />
      ))}
      <rect
        x={w * 0.06}
        y={h * 0.42}
        width={w * 0.72}
        height={h * 0.3}
        rx={h * 0.12}
        fill="#f8fafc"
        stroke={S}
        strokeWidth={h * 0.03}
      />
      {[0.2, 0.34, 0.48, 0.62].map((t, i) => (
        <line
          key={i}
          x1={w * t}
          y1={h * 0.44}
          x2={w * t}
          y2={h * 0.7}
          stroke="#1f2937"
          strokeWidth={h * 0.05}
        />
      ))}
      <path
        d={`M ${w * 0.74} ${h * 0.48} L ${w * 0.86} ${h * 0.16} L ${w * 0.99} ${h * 0.16} L ${w * 0.9} ${h * 0.5} Z`}
        fill="#f8fafc"
        stroke={S}
        strokeWidth={h * 0.03}
      />
      <line
        x1={w * 0.8}
        y1={h * 0.2}
        x2={w * 0.72}
        y2={h * 0.34}
        stroke={S}
        strokeWidth={h * 0.03}
      />
      <path
        d={`M ${w * 0.1} ${h * 0.46} q ${-w * 0.1} ${h * 0.14} 0 ${h * 0.3}`}
        fill="none"
        stroke={S}
        strokeWidth={h * 0.04}
      />
    </>
  );
}

function drawKid(w, h, color, girl) {
  const shirt = color || "#3b82f6";
  const cx = w * 0.5;
  const r = h * 0.135;
  const hy = h * 0.14;
  const sw = Math.max(1.4, h * 0.014);
  const toc = "#4b2e1e";
  return (
    <>
      {/* tóc DÀI của bạn gái: hai mái rủ xuống hai bên, vẽ TRƯỚC để không che mặt */}
      {girl && (
        <>
          <rect
            x={cx - r * 1.15}
            y={hy - r * 0.35}
            width={r * 0.5}
            height={r * 1.7}
            rx={r * 0.25}
            fill={toc}
          />
          <rect
            x={cx + r * 0.65}
            y={hy - r * 0.35}
            width={r * 0.5}
            height={r * 1.7}
            rx={r * 0.25}
            fill={toc}
          />
        </>
      )}
      {/* cổ */}
      <rect
        x={cx - w * 0.035}
        y={hy}
        width={w * 0.07}
        height={h * 0.09}
        fill="#fcd9b0"
        stroke={S}
        strokeWidth={sw * 0.8}
      />
      {/* thân + tay + chân */}
      <rect
        x={cx - w * 0.19}
        y={h * 0.27}
        width={w * 0.38}
        height={h * 0.33}
        rx={h * 0.05}
        fill={shirt}
        stroke={S}
        strokeWidth={sw}
      />
      <rect
        x={cx - w * 0.3}
        y={h * 0.3}
        width={w * 0.11}
        height={h * 0.26}
        rx={h * 0.05}
        fill="#fcd9b0"
        stroke={S}
        strokeWidth={sw * 0.8}
      />
      <rect
        x={cx + w * 0.19}
        y={h * 0.3}
        width={w * 0.11}
        height={h * 0.26}
        rx={h * 0.05}
        fill="#fcd9b0"
        stroke={S}
        strokeWidth={sw * 0.8}
      />
      <rect
        x={cx - w * 0.17}
        y={h * 0.6}
        width={w * 0.14}
        height={h * 0.31}
        rx={h * 0.03}
        fill="#1d4ed8"
        stroke={S}
        strokeWidth={sw}
      />
      <rect
        x={cx + w * 0.03}
        y={h * 0.6}
        width={w * 0.14}
        height={h * 0.31}
        rx={h * 0.03}
        fill="#1d4ed8"
        stroke={S}
        strokeWidth={sw}
      />
      <rect
        x={cx - w * 0.19}
        y={h * 0.9}
        width={w * 0.18}
        height={h * 0.08}
        rx={h * 0.03}
        fill="#1f2937"
      />
      <rect
        x={cx + w * 0.01}
        y={h * 0.9}
        width={w * 0.18}
        height={h * 0.08}
        rx={h * 0.03}
        fill="#1f2937"
      />
      {/* đầu + tóc */}
      <circle
        cx={cx}
        cy={hy}
        r={r}
        fill="#fcd9b0"
        stroke={S}
        strokeWidth={sw}
      />
      <path
        d={`M ${cx - r} ${hy - r * 0.1} a ${r} ${r} 0 0 1 ${2 * r} 0 Z`}
        fill={toc}
      />
      {girl && (
        <>
          <circle
            cx={cx - r * 0.8}
            cy={hy - r * 0.95}
            r={r * 0.32}
            fill="#ec4899"
          />
          <circle
            cx={cx + r * 0.8}
            cy={hy - r * 0.95}
            r={r * 0.32}
            fill="#ec4899"
          />
        </>
      )}
      {/* mắt + miệng */}
      <circle
        cx={cx - r * 0.36}
        cy={hy + r * 0.12}
        r={Math.max(0.8, r * 0.1)}
        fill={S}
      />
      <circle
        cx={cx + r * 0.36}
        cy={hy + r * 0.12}
        r={Math.max(0.8, r * 0.1)}
        fill={S}
      />
      <path
        d={`M ${cx - r * 0.32} ${hy + r * 0.5} q ${r * 0.32} ${r * 0.3} ${r * 0.64} 0`}
        fill="none"
        stroke={S}
        strokeWidth={Math.max(0.9, r * 0.12)}
        strokeLinecap="round"
      />
    </>
  );
}

function drawPodium(w, h) {
  return (
    <>
      <rect
        x={0}
        y={h * 0.22}
        width={w}
        height={h * 0.78}
        fill="#e2e8f0"
        stroke={S}
        strokeWidth={w * 0.06}
      />
      <rect
        x={0}
        y={h * 0.22}
        width={w}
        height={h * 0.12}
        fill="#cbd5e1"
        stroke={S}
        strokeWidth={w * 0.06}
      />
    </>
  );
}

function drawRabbit(w, h) {
  return (
    <>
      <ellipse
        cx={w * 0.42}
        cy={h * 0.62}
        rx={w * 0.34}
        ry={h * 0.3}
        fill="#f8fafc"
        stroke={S}
        strokeWidth={h * 0.04}
      />
      <circle
        cx={w * 0.74}
        cy={h * 0.38}
        r={h * 0.2}
        fill="#f8fafc"
        stroke={S}
        strokeWidth={h * 0.04}
      />
      <ellipse
        cx={w * 0.68}
        cy={h * 0.09}
        rx={w * 0.06}
        ry={h * 0.13}
        fill="#f8fafc"
        stroke={S}
        strokeWidth={h * 0.035}
      />
      <ellipse
        cx={w * 0.8}
        cy={h * 0.09}
        rx={w * 0.06}
        ry={h * 0.13}
        fill="#f8fafc"
        stroke={S}
        strokeWidth={h * 0.035}
      />
      <circle
        cx={w * 0.06}
        cy={h * 0.66}
        r={h * 0.11}
        fill="#f1f5f9"
        stroke={S}
        strokeWidth={h * 0.03}
      />
      <circle cx={w * 0.79} cy={h * 0.34} r={h * 0.025} fill={S} />
    </>
  );
}

function drawFox(w, h) {
  return (
    <>
      <ellipse
        cx={w * 0.46}
        cy={h * 0.6}
        rx={w * 0.32}
        ry={h * 0.26}
        fill="#f97316"
        stroke={S}
        strokeWidth={h * 0.04}
      />
      <path
        d={`M ${w * 0.6} ${h * 0.55} L ${w * 0.68} ${h * 0.2} L ${w * 0.82} ${h * 0.18} L ${w * 0.84} ${h * 0.55} Z`}
        fill="#fb923c"
        stroke={S}
        strokeWidth={h * 0.04}
      />
      <path
        d={`M ${w * 0.68} ${h * 0.2} L ${w * 0.62} ${h * 0.06} L ${w * 0.74} ${h * 0.16} Z`}
        fill="#f97316"
        stroke={S}
        strokeWidth={h * 0.03}
      />
      <path
        d={`M ${w * 0.82} ${h * 0.18} L ${w * 0.88} ${h * 0.04} L ${w * 0.9} ${h * 0.22} Z`}
        fill="#f97316"
        stroke={S}
        strokeWidth={h * 0.03}
      />
      <path
        d={`M ${w * 0.14} ${h * 0.6} q ${-w * 0.14} ${-h * 0.3} ${w * 0.04} ${-h * 0.34} q ${w * 0.02} ${h * 0.3} ${w * 0.08} ${h * 0.34} Z`}
        fill="#fdba74"
        stroke={S}
        strokeWidth={h * 0.035}
      />
      <circle cx={w * 0.86} cy={h * 0.34} r={h * 0.03} fill={S} />
    </>
  );
}

function drawBook(w, h) {
  return (
    <>
      <rect
        x={0}
        y={h * 0.1}
        width={w}
        height={h * 0.8}
        rx={h * 0.08}
        fill="#7c3aed"
        stroke={S}
        strokeWidth={h * 0.035}
      />
      <rect
        x={0}
        y={h * 0.1}
        width={w * 0.16}
        height={h * 0.8}
        fill="#5b21b6"
      />
      <line
        x1={w * 0.32}
        y1={h * 0.34}
        x2={w * 0.86}
        y2={h * 0.34}
        stroke="#ede9fe"
        strokeWidth={h * 0.055}
      />
      <line
        x1={w * 0.32}
        y1={h * 0.55}
        x2={w * 0.86}
        y2={h * 0.55}
        stroke="#ede9fe"
        strokeWidth={h * 0.055}
      />
      <line
        x1={w * 0.32}
        y1={h * 0.76}
        x2={w * 0.68}
        y2={h * 0.76}
        stroke="#ede9fe"
        strokeWidth={h * 0.055}
      />
    </>
  );
}

function drawSquirrel(w, h) {
  return (
    <>
      <ellipse
        cx={w * 0.5}
        cy={h * 0.62}
        rx={w * 0.28}
        ry={h * 0.26}
        fill="#b45309"
        stroke={S}
        strokeWidth={h * 0.04}
      />
      <circle
        cx={w * 0.3}
        cy={h * 0.32}
        r={h * 0.18}
        fill="#b45309"
        stroke={S}
        strokeWidth={h * 0.04}
      />
      <path
        d={`M ${w * 0.6} ${h * 0.7} q ${w * 0.34} ${-h * 0.1} ${w * 0.28} ${-h * 0.46} q ${-w * 0.04} ${-h * 0.2} ${-w * 0.16} ${-h * 0.12} q ${-w * 0.1} ${h * 0.3} ${-w * 0.24} ${h * 0.42} Z`}
        fill="#d97706"
        stroke={S}
        strokeWidth={h * 0.04}
      />
      <path
        d={`M ${w * 0.24} ${h * 0.16} L ${w * 0.22} ${h * 0.04} L ${w * 0.32} ${h * 0.14} Z`}
        fill="#b45309"
        stroke={S}
        strokeWidth={h * 0.03}
      />
      <circle cx={w * 0.24} cy={h * 0.3} r={h * 0.03} fill={S} />
    </>
  );
}

const DRAW = {
  train: drawTrain,
  mixerTruck: drawMixerTruck,
  roller: drawRoller,
  bus: drawBus,
  car: drawCar,
  crane: drawCrane,
  pencil: drawPencil,
  crayon: drawCrayon,
  pen: drawPen,
  toothbrush: drawToothbrush,
  screwdriver: drawScrewdriver,
  gamepad: drawGamepad,
  watch: drawWatch,
  phone: drawPhone,
  pencilCase: drawPencilCase,
  book: drawBook,
  ruler: drawRuler,
  eraser: drawEraser,
  paperclip: drawPaperclip,
  giraffe: drawGiraffe,
  zebra: drawZebra,
  kid: drawKid,
  podium: drawPodium,
  rabbit: drawRabbit,
  fox: drawFox,
  squirrel: drawSquirrel,
};

/**
 * Vẽ một đồ vật trong hộp (x, y, w, h). `kind` lạ ⇒ về hình hộp chữ nhật có bo góc
 * (vẫn nói đúng ĐỘ DÀI, chỉ là không nhận ra đồ vật) — không bao giờ để trắng khung.
 */
export function ObjectShape({
  kind,
  x = 0,
  y = 0,
  w = 40,
  h = 20,
  color,
  girl = false,
}) {
  const fn = DRAW[kind];
  return (
    <g transform={`translate(${x},${y})`}>
      {fn ? (
        fn(w, h, color, girl)
      ) : (
        <rect
          x={0}
          y={h * 0.25}
          width={w}
          height={h * 0.5}
          rx={h * 0.18}
          fill={color || "#93c5fd"}
          stroke={S}
          strokeWidth={h * 0.05}
        />
      )}
    </g>
  );
}
