import React from 'react'
import { motion } from 'framer-motion'
import './KnowledgeRadarChart.css'

export default function KnowledgeRadarChart({ skills }) {
  // 5 domains matching SKILL_DOMAINS in ParentDashboard
  const domains = [
    { key: 'numbers', label: 'Số học', icon: '🔢', fullLabel: 'Số học & Nhận biết số' },
    { key: 'operations', label: 'Cộng & Trừ', icon: '➕', fullLabel: 'Phép tính Cộng & Trừ' },
    { key: 'multiplication', label: 'Nhân & Chia', icon: '✖️', fullLabel: 'Phép tính Nhân & Chia' },
    { key: 'geometry', label: 'Hình học', icon: '📐', fullLabel: 'Hình học & Không gian' },
    { key: 'measurement', label: 'Đo lường', icon: '📏', fullLabel: 'Đại lượng & Đo lường' },
  ]

  const size = 320
  const center = size / 2
  const maxRadius = 110
  const levels = [0.2, 0.4, 0.6, 0.8, 1.0]

  // Map scores from skills
  const scores = domains.map((d) => {
    const found = skills.find((s) => s.id === d.key)
    return found ? found.percent || (found.completedCount > 0 ? 70 : 15) : 15
  })

  // Calculate coordinates for 5 vertices
  const getCoordinates = (index, valuePercent) => {
    const angle = (Math.PI * 2 / 5) * index - Math.PI / 2
    const r = (valuePercent / 100) * maxRadius
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
    }
  }

  // Create polygon points for data
  const dataPoints = scores
    .map((score, i) => {
      const { x, y } = getCoordinates(i, Math.max(score, 10))
      return `${x},${y}`
    })
    .join(' ')

  return (
    <div className="radar-chart-card">
      <div className="radar-header">
        <div className="radar-title-group">
          <h3>📊 Bản Đồ Năng Lực Toán Học</h3>
          <p>Biểu đồ phân tích 5 trụ cột năng lực toán học dựa trên kết quả thực tế của bé</p>
        </div>
      </div>

      <div className="radar-visual-wrapper">
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="radar-svg">
          <defs>
            <radialGradient id="radarGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#20C997" stopOpacity="0.45" />
              <stop offset="70%" stopColor="#20C997" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#0CA678" stopOpacity="0.05" />
            </radialGradient>
            <filter id="radarShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="rgba(32, 201, 151, 0.4)" />
            </filter>
          </defs>

          {/* Web Background Grid Rings */}
          {levels.map((lvl, idx) => {
            const ringPoints = domains
              .map((_, i) => {
                const { x, y } = getCoordinates(i, lvl * 100)
                return `${x},${y}`
              })
              .join(' ')
            return (
              <polygon
                key={idx}
                points={ringPoints}
                fill={idx === levels.length - 1 ? '#F8F9FA' : 'none'}
                stroke="#E9ECEF"
                strokeWidth={idx === levels.length - 1 ? 1.5 : 1}
              />
            )
          })}

          {/* Radial Spokes from center */}
          {domains.map((_, i) => {
            const { x, y } = getCoordinates(i, 100)
            return (
              <line
                key={i}
                x1={center}
                y1={center}
                x2={x}
                y2={y}
                stroke="#DEE2E6"
                strokeWidth="1"
                strokeDasharray="3 3"
              />
            )
          })}

          {/* Filled Data Polygon */}
          <motion.polygon
            points={dataPoints}
            fill="url(#radarGlow)"
            stroke="#12B886"
            strokeWidth="3"
            filter="url(#radarShadow)"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />

          {/* Data Points Dots */}
          {scores.map((score, i) => {
            const { x, y } = getCoordinates(i, Math.max(score, 10))
            return (
              <g key={i}>
                <circle cx={x} cy={y} r="5.5" fill="#20C997" stroke="white" strokeWidth="2.5" />
                <text
                  x={x}
                  y={y - 10}
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight="800"
                  fill="#087F5B"
                  fontFamily="var(--font-number)"
                >
                  {score}%
                </text>
              </g>
            )
          })}

          {/* Axis Labels outside */}
          {domains.map((d, i) => {
            const angle = (Math.PI * 2 / 5) * i - Math.PI / 2
            const labelRadius = maxRadius + 32
            const lx = center + labelRadius * Math.cos(angle)
            const ly = center + labelRadius * Math.sin(angle)

            return (
              <g key={d.key}>
                <text
                  x={lx}
                  y={ly}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontSize="12"
                  fontWeight="700"
                  fill="#343A40"
                  fontFamily="var(--font-heading)"
                >
                  {d.icon} {d.label}
                </text>
              </g>
            )
          })}
        </svg>

        {/* Legend Summary */}
        <div className="radar-legend-list">
          {domains.map((d, i) => {
            const sc = scores[i]
            const colorClass = sc >= 80 ? 'green' : sc >= 50 ? 'yellow' : 'gray'
            return (
              <div key={d.key} className="radar-legend-item">
                <span className="legend-icon">{d.icon}</span>
                <div className="legend-info">
                  <span className="legend-title">{d.fullLabel}</span>
                  <div className="legend-bar-wrap">
                    <div
                      className={`legend-bar-fill ${colorClass}`}
                      style={{ width: `${sc}%` }}
                    />
                  </div>
                </div>
                <span className={`legend-score number ${colorClass}`}>{sc}%</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
