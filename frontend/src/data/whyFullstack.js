// 왜 풀스택 개발인가 — "분업 외주" vs "풀스택 1인" 비교
export const splitFlow = [
  {
    role: '디자이너',
    tag: '#design',
    avatar: 'D',
    msg: '시안 드렸어요. 코딩은 퍼블리셔분께 전달 부탁드려요.',
  },
  {
    role: '퍼블리셔',
    tag: '#frontend',
    avatar: 'F',
    msg: 'API 연동은 백엔드 담당자분께 문의해주세요.',
  },
  {
    role: '백엔드',
    tag: '#backend',
    avatar: 'B',
    msg: 'DB 스키마는 다시 회의 후 결정해야 할 것 같아요.',
  },
  {
    role: '배포 담당',
    tag: '#deploy',
    avatar: 'O',
    msg: '도메인 권한 요청드렸는데 답변 대기 중입니다…',
    waiting: true,
  },
]

export const splitStats = [
  { label: '담당자', value: '4명+' },
  { label: '회의', value: '주 3회' },
  { label: '핸드오프 지연', value: '평균 3일' },
]

export const fullstackLayers = [
  { layer: 'Frontend', tech: 'React · Vite' },
  { layer: 'Backend', tech: 'Node · Express' },
  { layer: 'Database', tech: 'PostgreSQL · Mongo' },
  { layer: 'Deploy', tech: 'Vercel · Render · AWS' },
]

export const fullstackStats = [
  { label: '담당자', value: '1명' },
  { label: '회의', value: '1:1' },
  { label: '의사결정', value: '즉시' },
]

export const benefits = [
  {
    num: '01',
    title: '커뮤니케이션 비용 0',
    highlight: '1:1 직접 소통',
    desc: '디자이너 → 퍼블리셔 → 프론트 → 백엔드 핸드오프가 없습니다. 한 사람과만 이야기하면 끝입니다.',
  },
  {
    num: '02',
    title: '책임 소재 명확',
    highlight: '처음부터 끝까지 한 사람',
    desc: '문제가 생겨도 "그건 다른 담당자에게…"라는 답을 들을 일이 없습니다. 끝까지 책임집니다.',
  },
  {
    num: '03',
    title: '즉시 반영 가능',
    highlight: '회의 없이 바로 수정',
    desc: '한 줄 바꾸려고 3명에게 컨펌받지 않습니다. 의견 주신 직후 반영하고 바로 확인하실 수 있어요.',
  },
  {
    num: '04',
    title: '전체 맥락 이해',
    highlight: '디자인부터 인프라까지',
    desc: '프론트가 백엔드를, 백엔드가 인프라를 이해합니다. 부분 최적화가 아닌 전체 최적화가 가능합니다.',
  },
]
