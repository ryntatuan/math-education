import { motion } from 'framer-motion'
import './Card.css'

export default function Card({
  children,
  variant = 'default',
  hoverable = true,
  glowColor,
  onClick,
  className = '',
  ...props
}) {
  const classes = [
    'card',
    `card-${variant}`,
    hoverable && 'card-hoverable',
    onClick && 'card-clickable',
    className,
  ].filter(Boolean).join(' ')

  return (
    <motion.div
      className={classes}
      onClick={onClick}
      whileHover={hoverable ? { y: -4 } : {}}
      whileTap={onClick ? { scale: 0.98 } : {}}
      style={glowColor ? { '--glow-color': glowColor } : {}}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export function CardHeader({ children, className = '' }) {
  return <div className={`card-header ${className}`}>{children}</div>
}

export function CardBody({ children, className = '' }) {
  return <div className={`card-body ${className}`}>{children}</div>
}

export function CardFooter({ children, className = '' }) {
  return <div className={`card-footer ${className}`}>{children}</div>
}
