// Google Analytics 4 — VITE_GA_ID 가 설정돼 있을 때만 작동.
// 설정 안 되어 있으면 아무 일도 안 함(개발/로컬 안전).

let booted = false

export function bootAnalytics(gaId) {
  if (!gaId || booted) return
  booted = true
  const s = document.createElement('script')
  s.async = true
  s.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`
  document.head.appendChild(s)
  window.dataLayer = window.dataLayer || []
  function gtag() {
    window.dataLayer.push(arguments)
  }
  window.gtag = gtag
  gtag('js', new Date())
  // 페이지뷰는 라우트 변경 시 수동 전송
  gtag('config', gaId, { send_page_view: false })
}

export function trackPageview(path) {
  if (typeof window === 'undefined' || !window.gtag) return
  window.gtag('event', 'page_view', { page_path: path })
}
