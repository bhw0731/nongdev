// Y2K 스티커 뱃지 — 화면 여백에 살짝 기울어져 붙는 작은 라벨
export default function Sticker({
  children,
  tone = 'lime',
  tilt = -3,
  className = '',
  style = {},
}) {
  return (
    <span
      className={`sticker sticker--${tone} mono ${className}`.trim()}
      style={{ ...style, transform: `rotate(${tilt}deg)` }}
      aria-hidden="true"
    >
      {children}
    </span>
  )
}
