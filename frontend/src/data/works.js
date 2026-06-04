// 포트폴리오 / 작업물 — 아래는 예시 템플릿입니다. 실제 작업물로 교체하세요.
// image: public/ 폴더에 이미지를 넣고 경로(예: '/works/shop.png')로 바꾸면 됩니다.
// 지금은 플레이스홀더(picsum)로 렌더링됩니다.
const ph = (seed) => `https://picsum.photos/seed/${seed}/900/600`

export const works = [
  {
    id: 'project-01',
    name: '온라인 편집샵 구축',
    client: '의류 브랜드',
    category: '쇼핑몰',
    year: '2024',
    image: ph('nong-shop'),
    summary: '상품·장바구니·결제·관리자까지 갖춘 풀스택 커머스.',
    description:
      '상품 카탈로그, 옵션/재고 관리, 장바구니, 결제(PG) 연동, 주문·배송 관리, 관리자 대시보드까지 커머스 전 과정을 구축한 예시 프로젝트입니다. 이 자리에 실제 진행하신 작업물 설명을 넣으세요.',
    tags: ['Next.js', 'TypeScript', 'Node.js', 'MySQL', 'PG연동', 'AWS'],
  },
  {
    id: 'project-02',
    name: '예약 · 고객 관리 시스템',
    client: '소상공인 / 스타트업',
    category: '웹앱',
    year: '2024',
    image: ph('nong-booking'),
    summary: '예약 캘린더, 고객 관리, 알림 자동화 웹 애플리케이션.',
    description:
      '예약 캘린더, 고객 데이터 관리, 알림톡/문자 자동 발송, 통계 대시보드를 갖춘 운영 도구 예시입니다. 실제 작업물 설명으로 교체하세요.',
    tags: ['React', 'Express', 'PostgreSQL', '알림 자동화', '대시보드'],
  },
  {
    id: 'project-03',
    name: '브랜드 소개 랜딩페이지',
    client: '뷰티 브랜드',
    category: '랜딩',
    year: '2023',
    image: ph('nong-landing'),
    summary: '브랜드 무드에 맞춘 전환 중심 반응형 랜딩페이지.',
    description:
      '브랜드 톤에 맞춘 반응형 랜딩페이지 예시입니다. 문의 폼, 애널리틱스, SEO 세팅을 포함했습니다. 실제 작업물로 교체하세요.',
    tags: ['React', 'Vite', '반응형', 'SEO', '애널리틱스'],
  },
  {
    id: 'project-04',
    name: '매물 검색 플랫폼',
    client: '중개 법인',
    category: '플랫폼',
    year: '2023',
    image: ph('nong-platform'),
    summary: '지도 기반 매물 검색·필터·문의 연결 플랫폼.',
    description:
      '지도 연동 매물 검색, 필터, 즐겨찾기, 상담 연결 흐름을 구현한 플랫폼 예시입니다. 실제 작업물로 교체하세요.',
    tags: ['Next.js', '지도 API', 'Node.js', 'MongoDB', 'RESTful API'],
  },
  {
    id: 'project-05',
    name: '실시간 주문 대시보드',
    client: '외식업',
    category: '웹앱',
    year: '2023',
    image: ph('nong-dashboard'),
    summary: 'QR 주문 → 주방 화면 → 매출 집계 실시간 연동.',
    description:
      'QR 주문, 주방 디스플레이(KDS), 매출 통계가 실시간으로 연동되는 운영 도구 예시입니다. 실제 작업물로 교체하세요.',
    tags: ['Node.js', 'Socket.io', 'SQLite', 'Chart.js', 'WebSocket'],
  },
  {
    id: 'project-06',
    name: '인터랙티브 제품 페이지',
    client: '가전 브랜드',
    category: '인터랙티브',
    year: '2024',
    image: ph('nong-interactive'),
    summary: '스크롤에 반응하는 몰입형 제품 소개 페이지.',
    description:
      '스크롤 인터랙션과 부드러운 애니메이션으로 제품을 소개하는 인터랙티브 페이지 예시입니다. 실제 작업물로 교체하세요.',
    tags: ['React', 'GSAP', 'ScrollTrigger', 'Three.js', '반응형'],
  },
]

export const findWork = (id) => works.find((w) => w.id === id)
