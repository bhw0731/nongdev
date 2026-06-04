import { useEffect, useRef } from 'react'

// 데스크톱(정밀 포인터)에서만 동작하는 사각형 브루탈리즘 커서
export default function CursorFX() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return

    const mouse = { x: innerWidth / 2, y: innerHeight / 2 }
    const ring = { x: mouse.x, y: mouse.y }
    let raf

    const onMove = (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0) translate(-50%, -50%)`
      }
    }
    const loop = () => {
      ring.x += (mouse.x - ring.x) * 0.2
      ring.y += (mouse.y - ring.y) * 0.2
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%)`
      }
      raf = requestAnimationFrame(loop)
    }

    const isInteractive = (el) => el?.closest?.('a, button, input, textarea, select, [role="button"]')
    const onOver = (e) => { if (isInteractive(e.target)) ringRef.current?.classList.add('is-hover') }
    const onOut = (e) => { if (isInteractive(e.target)) ringRef.current?.classList.remove('is-hover') }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseover', onOver)
    window.addEventListener('mouseout', onOut)
    raf = requestAnimationFrame(loop)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      window.removeEventListener('mouseout', onOut)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div className="cursor-fx" aria-hidden="true">
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </div>
  )
}
