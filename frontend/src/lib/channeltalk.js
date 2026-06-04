// 채널톡(ChannelTalk) Web SDK 연동 헬퍼
// 공식 로더(https://developers.channel.io)를 모듈로 감싼 형태입니다.

function loadScript() {
  const w = window
  if (w.ChannelIO) return
  const ch = function () {
    ch.c(arguments)
  }
  ch.q = []
  ch.c = function (args) {
    ch.q.push(args)
  }
  w.ChannelIO = ch

  function l() {
    if (w.ChannelIOInitialized) return
    w.ChannelIOInitialized = true
    const s = document.createElement('script')
    s.type = 'text/javascript'
    s.async = true
    s.src = 'https://cdn.channel.io/plugin/ch-plugin-web.js'
    const first = document.getElementsByTagName('script')[0]
    if (first && first.parentNode) {
      first.parentNode.insertBefore(s, first)
    } else {
      document.head.appendChild(s)
    }
  }

  if (document.readyState === 'complete') {
    l()
  } else {
    w.addEventListener('DOMContentLoaded', l)
    w.addEventListener('load', l)
  }
}

// 채널톡 위젯을 부팅합니다. 플러그인 키가 없으면 조용히 건너뜁니다.
export function bootChannelTalk(pluginKey) {
  if (!pluginKey) {
    console.warn(
      '[채널톡] VITE_CHANNELTALK_PLUGIN_KEY 가 설정되지 않아 위젯을 띄우지 않습니다. frontend/.env 를 확인하세요.',
    )
    return
  }
  loadScript()
  // 채팅창 라이트/다크를 사이트 현재 테마와 맞춤
  const appearance =
    document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'
  // hideChannelButtonOnBoot: 채널톡 기본 초록 버튼을 숨김.
  // 채팅은 우측 하단 퀵독의 "1:1 상담" 버튼(openChannelTalk)으로만 엽니다.
  window.ChannelIO('boot', { pluginKey, hideChannelButtonOnBoot: true, appearance })

  // 채팅창 열림/닫힘을 전역 이벤트로 알림 → 퀵독이 듣고 숨김 처리(겹침 방지)
  window.ChannelIO('onShowMessenger', () =>
    window.dispatchEvent(new Event('channeltalk:show')),
  )
  window.ChannelIO('onHideMessenger', () =>
    window.dispatchEvent(new Event('channeltalk:hide')),
  )
}

// "작업 의뢰하기" 버튼 등에서 채팅창을 직접 엽니다.
export function openChannelTalk() {
  if (window.ChannelIO) {
    window.ChannelIO('showMessenger')
  } else {
    // 위젯이 아직 없으면(키 미설정 등) 메일 문의로 안내
    window.location.href = 'mailto:bhw0731@gmail.com?subject=작업 의뢰 문의'
  }
}
