// 왜 풀스택 개발인가 — 빌더 서비스 vs 풀스택 비교
export const compareRows = [
  {
    feature: '디자인 자유도',
    builder: { text: '템플릿 기반, 제한적', good: false },
    custom: { text: '완전한 커스터마이징 가능', good: true },
  },
  {
    feature: '월 구독료',
    builder: { text: '월 25,000원 ~ 50,000원', good: false },
    custom: { text: '도메인/호스팅만 (연 5만원~)', good: true },
  },
  {
    feature: '확장성',
    builder: { text: '플랫폼 종속, 마이그레이션 어려움', good: false },
    custom: { text: '소스코드 소유, 자유로운 확장', good: true },
  },
  {
    feature: 'SEO 최적화',
    builder: { text: '기본 수준, 깊은 제어 불가', good: false },
    custom: { text: 'SSR / 메타 / 스키마 완전 제어', good: true },
  },
  {
    feature: '성능 (속도)',
    builder: { text: '공용 인프라, 무거운 빌더 코드', good: false },
    custom: { text: '최적화된 코드, CDN 직접 설정', good: true },
  },
  {
    feature: '복잡한 기능',
    builder: { text: '플러그인 한계 / 외부 연동 제한', good: false },
    custom: { text: '결제·CRM·API 자유롭게 통합', good: true },
  },
  {
    feature: '데이터 소유권',
    builder: { text: '플랫폼 보관 (이전 어려움)', good: false },
    custom: { text: '본인 DB 완전 소유', good: true },
  },
  {
    feature: '초기 제작 속도',
    builder: { text: '빠름 (드래그앤드롭)', good: true },
    custom: { text: '설계 단계 필요', good: false },
  },
]

export const benefits = [
  {
    num: '01',
    title: '소스코드 완전 소유',
    highlight: '플랫폼에서 자유롭게',
    desc: '제작된 코드를 직접 소유하여, 플랫폼 종속 없이 언제든 이전·운영할 수 있습니다.',
  },
  {
    num: '02',
    title: '무한한 기능 확장',
    highlight: '필요한 기능 무엇이든',
    desc: 'PG 결제, CRM, ERP, 자체 API 등 어떤 외부 시스템이든 자유롭게 통합 가능합니다.',
  },
  {
    num: '03',
    title: '운영 비용 절감',
    highlight: '월 구독료 0원',
    desc: '도메인·호스팅 비용만 발생하여, 장기 운영 시 빌더 대비 수백만원 이상 절감됩니다.',
  },
  {
    num: '04',
    title: '브랜드 정체성 확립',
    highlight: '오직 당신만의 사이트',
    desc: '템플릿 한계 없이 비즈니스에 최적화된 고유한 디자인과 사용자 경험을 구현합니다.',
  },
]
