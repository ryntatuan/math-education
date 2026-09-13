import mascotOwlImg from '../../assets/mascot-owl.svg'

export default function MascotIcon({ size = 28, className = '', style = {} }) {
  return (
    <img
      src={mascotOwlImg}
      alt="Cú Mèo Toán Vui"
      width={size}
      height={size}
      className={`mascot-owl-icon ${className}`}
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
