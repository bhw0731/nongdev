import { useEffect, useState } from 'react'
import { openChannelTalk } from '../lib/channeltalk.js'

function kstNow() {
  return new Intl.DateTimeFormat('ko-KR', {
    timeZone: 'Asia/Seoul',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(new Date())
}

export default function AvailabilityBar() {
  const [time, setTime] = useState(kstNow)

  useEffect(() => {
    const id = setInterval(() => setTime(kstNow()), 30000)
    return () => clearInterval(id)
  }, [])

  return (
    <button type="button" className="avb-bar" onClick={openChannelTalk} aria-label="이번 달 신규 의뢰 접수 가능 — 채팅 문의">
      <span className="avb-dot" />
      <span className="avb-bar-text">
        <strong>이번 달 1건 신규 의뢰 접수 가능</strong>
        <span className="avb-bar-sep">·</span>
        <span className="avb-bar-time mono">KST {time}</span>
      </span>
      <span className="avb-bar-cta">
        의뢰하기
        <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path
            fillRule="evenodd"
            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </span>
    </button>
  )
}
