// 구현 가능 기능 — 사용자가 실제 쓰는 모습으로 설명
export const capabilities = [
  {
    icon: 'auth',
    title: '회원가입 · 로그인',
    desc: '카카오·구글·네이버로 한 번에 가입. 비밀번호 찾기, 자동 로그인, 본인 인증까지 안전하게.',
    tags: ['Kakao', 'Google', 'Naver', 'OAuth', 'JWT'],
  },
  {
    icon: 'payment',
    title: '결제 시스템',
    desc: '신용카드·계좌이체·간편결제(카카오페이·토스)까지. 정기 결제, 환불 처리도 포함.',
    tags: ['Toss', 'PortOne', 'KakaoPay', 'Stripe'],
  },
  {
    icon: 'chat',
    title: '실시간 채팅 · 알림',
    desc: '메시지가 오자마자 바로 뜨고, 새 알림이 화면에 즉시 표시되는 실시간 기능.',
    tags: ['WebSocket', 'Socket.IO', 'SSE'],
  },
  {
    icon: 'ai',
    title: 'AI 기능 연동',
    desc: 'ChatGPT·Claude 같은 AI를 우리 서비스 안에서 동작하게. 챗봇, 자동 요약, 번역 등.',
    tags: ['OpenAI', 'Claude', 'Gemini'],
  },
  {
    icon: 'upload',
    title: '사진 · 파일 업로드',
    desc: '큰 사진도 자동으로 줄여서 빠르게 보여주기. 동영상·문서까지 안전하게 보관.',
    tags: ['AWS S3', 'Cloudinary', 'Sharp', 'CDN'],
  },
  {
    icon: 'dashboard',
    title: '관리자 대시보드',
    desc: '매출·방문자·주문 현황을 차트와 그래프로 한눈에. 엑셀로 내보내기까지.',
    tags: ['Recharts', 'Chart.js', 'Excel Export'],
  },
  {
    icon: 'search',
    title: '검색 · 자동완성',
    desc: '타이핑하는 동안 추천어가 뜨고, 오타가 있어도 결과를 찾아주는 똑똑한 검색.',
    tags: ['Elasticsearch', 'Algolia', 'Fuse.js'],
  },
  {
    icon: 'push',
    title: '푸시 알림',
    desc: '앱·웹에서 "새 메시지 도착" 같은 알림을 보내서, 사용자가 다시 들어오게.',
    tags: ['FCM', 'Web Push', 'OneSignal'],
  },
  {
    icon: 'seo',
    title: '구글 검색 노출',
    desc: '구글에서 우리 사이트가 잘 보이도록 최적화. 로딩 속도, 메타 정보, 사이트맵까지.',
    tags: ['Next.js SSR', 'Sitemap', 'OG Image', 'Core Web Vitals'],
  },
]
