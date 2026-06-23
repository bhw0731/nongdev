// F12 콘솔에 brand banner + STUDIO BRIEF 미러 출력
// 한 번만 출력하도록 모듈 스코프 플래그로 가드

const LIME = '#d8ff36'
const INK = '#14130e'
const DIM = '#8b8676'
const MONO = 'ui-monospace, SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace'

let printed = false

export function printConsoleBrand() {
  if (printed) return
  printed = true
  if (typeof window === 'undefined' || typeof console === 'undefined') return

  const ascii =
    '\n' +
    ' ███╗   ██╗  ██████╗  ███╗   ██╗  ██████╗  ██████╗  ███████╗ ██╗   ██╗\n' +
    ' ████╗  ██║ ██╔═══██╗ ████╗  ██║ ██╔════╝  ██╔══██╗ ██╔════╝ ██║   ██║\n' +
    ' ██╔██╗ ██║ ██║   ██║ ██╔██╗ ██║ ██║  ███╗ ██║  ██║ █████╗   ██║   ██║\n' +
    ' ██║╚██╗██║ ██║   ██║ ██║╚██╗██║ ██║   ██║ ██║  ██║ ██╔══╝   ╚██╗ ██╔╝\n' +
    ' ██║ ╚████║ ╚██████╔╝ ██║ ╚████║ ╚██████╔╝ ██████╔╝ ███████╗  ╚████╔╝ \n' +
    ' ╚═╝  ╚═══╝  ╚═════╝  ╚═╝  ╚═══╝  ╚═════╝  ╚═════╝  ╚══════╝   ╚═══╝  \n'

  console.log(
    `%c${ascii}`,
    `color: ${LIME}; font-family: ${MONO}; font-size: 12px; line-height: 1.05; font-weight: 700;`,
  )

  console.log(
    `%c  1인 풀스택 개발 스튜디오  %c · est. 2026 · seoul`,
    `color: ${LIME}; font-family: ${MONO}; font-size: 12px; letter-spacing: 0.06em;`,
    `color: ${DIM}; font-family: ${MONO}; font-size: 11px;`,
  )

  console.log(
    `\n%c  NONGDEV STUDIO  %c  studio brief — 프로젝트 진행 명세\n`,
    `background: ${LIME}; color: ${INK}; font-family: ${MONO}; font-weight: 900; font-size: 13px; padding: 6px 14px; letter-spacing: 0.32em;`,
    `color: ${DIM}; font-family: ${MONO}; font-size: 11px; padding: 4px 14px;`,
  )

  console.log(
    `%c  → 요구사항 정리                  · 완료\n` +
    `  → 기획 · 디자인 · 개발 · 배포   · 진행중\n` +
    `  ✓ 제품 완성                      · 2.4s\n` +
    `  # 추가 비용 없음                  · 고정\n`,
    `font-family: ${MONO}; font-size: 12px; line-height: 1.75;`,
  )

  console.log(
    `%c  ──────────────────────────────────────────────\n` +
    `  contact   bhw0731@gmail.com\n` +
    `  kmong     kmong.com/@nongdev\n` +
    `  source    github.com/bhw0731/nongdev\n`,
    `color: ${DIM}; font-family: ${MONO}; font-size: 11px; line-height: 1.7;`,
  )
}
