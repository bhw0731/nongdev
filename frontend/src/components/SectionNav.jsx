import { useEffect, useState } from 'react'

const sections = [
  { id: 'start', num: '01', label: 'START' },
  { id: 'stages', num: '02', label: 'STAGES' },
  { id: 'scores', num: '03', label: 'SCORES' },
  { id: 'join', num: '04', label: 'JOIN' },
]

// 우측 사이드에 떠 있는 섹션 네비 (scroll spy)
// 채팅창이 열리면 자동 숨김.
export default function SectionNav() {
  const [active, setActive] = useState(null)
  const [chatOpen, setChatOpen] = useState(false)

  // IntersectionObserver 로 화면 중앙(가로 stripe)에 들어온 섹션을 active 로
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: '-45% 0px -45% 0px' },
    )
    sections.forEach((s) => {
      const el = document.getElementById(s.id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
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

  if (chatOpen) return null

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (!el) return
    const y = el.getBoundingClientRect().top + window.scrollY - 80
    window.scrollTo({ top: y, behavior: 'smooth' })
  }

  return (
    <nav className="section-nav" aria-label="섹션 네비게이션">
      <ul>
        {sections.map((s) => {
          const isActive = active === s.id
          return (
            <li key={s.id}>
              <button
                type="button"
                className={`section-nav__item${isActive ? ' is-active' : ''}`}
                onClick={() => scrollTo(s.id)}
                aria-label={`${s.num} ${s.label}로 이동`}
              >
                <span className="section-nav__label mono">{s.label}</span>
                <span className="section-nav__num mono">{s.num}</span>
                <span className="section-nav__dot" aria-hidden="true" />
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
