import { useEffect, useState } from 'react'
import { openChannelTalk } from '../lib/channeltalk.js'

export default function QuickDock() {
  const [showTop, setShowTop] = useState(false)
  const [chatOpen, setChatOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onShow = () => setChatOpen(true)
    const onHide = () => setChatOpen(false)
    window.addEventListener('channeltalk:show', onShow)
    window.addEventListener('channeltalk:hide', onHide)
    return () => {
      window.removeEventListener('channeltalk:show', onShow)
      window.removeEventListener('channeltalk:hide', onHide)
    }
  }, [])

  // 채팅창이 열려 있으면 독을 숨겨 겹침을 방지
  if (chatOpen) return null

  return (
    <div className="qdock" aria-label="빠른 액션">
      <button type="button" className="qdock-btn" onClick={openChannelTalk}>
        <span className="qdock-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
          </svg>
        </span>
        <span className="qdock-label">1:1 상담</span>
      </button>

      <button
        type="button"
        className={`qdock-btn qdock-top${showTop ? ' is-visible' : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="맨 위로"
      >
        <span className="qdock-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </span>
        <span className="qdock-label">맨 위로</span>
      </button>
    </div>
  )
}
