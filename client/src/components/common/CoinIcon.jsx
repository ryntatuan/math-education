import coinGoldImg from '../../assets/coin-gold.svg'

export default function CoinIcon({ size = 18, className = '', style = {} }) {
  return (
    <img
      src={coinGoldImg}
      alt="Xu vàng"
      width={size}
      height={size}
      className={`coin-gold-icon ${className}`}
      style={{
        display: 'inline-block',
        verticalAlign: 'middle',
        objectFit: 'contain',
        flexShrink: 0,
        ...style,
      }}
    />
  )
}
