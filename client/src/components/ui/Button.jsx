import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Button.css'

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconRight,
  fullWidth = false,
  disabled = false,
  loading = false,
  glow = false,
  bounce = true,
  onClick,
  className = '',
  ...props
}) {
  const [isPressed, setIsPressed] = useState(false)

  const classes = [
    'btn',
    `btn-${variant}`,
    `btn-${size}`,
    fullWidth && 'btn-full',
    glow && 'btn-glow',
    disabled && 'btn-disabled',
    loading && 'btn-loading',
    className,
  ].filter(Boolean).join(' ')

  return (
    <motion.button
      className={classes}
      onClick={disabled || loading ? undefined : onClick}
      whileHover={bounce && !disabled ? { scale: 1.02 } : {}}
      whileTap={bounce && !disabled ? { scale: 0.97 } : {}}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="btn-spinner" />
      ) : (
        <>
          {icon && <span className="btn-icon">{icon}</span>}
          <span className="btn-text">{children}</span>
          {iconRight && <span className="btn-icon-right">{iconRight}</span>}
        </>
      )}
    </motion.button>
  )
}
