import CoinIcon from '../common/CoinIcon'
import './Badge.css'

export default function Badge({
  children,
  variant = 'default',
  size = 'md',
  icon,
  className = '',
}) {
  const classes = [
    'badge',
    `badge-${variant}`,
    `badge-${size}`,
    className,
  ].filter(Boolean).join(' ')

  const coinSize = size === 'sm' ? 14 : size === 'lg' ? 22 : 18
  const resolvedIcon =
    (variant === 'coin' && (!icon || icon === '🪙')) || icon === '🪙'
      ? <CoinIcon size={coinSize} />
      : icon

  return (
    <span className={classes}>
      {resolvedIcon && <span className="badge-icon">{resolvedIcon}</span>}
      {children}
    </span>
  )
}
