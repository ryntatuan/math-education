import { motion } from 'framer-motion'
import './ProgressBar.css'

export default function ProgressBar({
  value = 0,
  max = 100,
  variant = 'primary',
  size = 'md',
  showLabel = false,
  label,
  animated = true,
  className = '',
}) {
  const percent = Math.min(100, Math.max(0, (value / max) * 100))

  return (
    <div className={`progress-wrapper ${className}`}>
      {(showLabel || label) && (
        <div className="progress-label">
          <span>{label}</span>
          <span className="number">{Math.round(percent)}%</span>
        </div>
      )}
      <div className={`progress-track progress-${size}`}>
        <motion.div
          className={`progress-fill progress-fill-${variant}`}
          initial={animated ? { width: 0 } : false}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}

export function StarsDisplay({ stars = 0, maxStars = 3, size = 'md' }) {
  return (
    <div className={`stars-display stars-${size}`}>
      {Array.from({ length: maxStars }).map((_, i) => (
        <motion.span
          key={i}
          className={`star ${i < stars ? 'star-filled' : 'star-empty'}`}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: i * 0.15, type: 'spring', stiffness: 300 }}
        >
          ⭐
        </motion.span>
      ))}
    </div>
  )
}
