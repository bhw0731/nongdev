// 포트폴리오 / 작업물
// 이미지는 public/works/ 폴더에 두고 절대 경로(/works/파일명.png)로 참조합니다.
// image: 리스트·상세 hero에 쓰이는 커버 이미지
// gallery: 상세 페이지에서 hero 아래에 세로로 펼쳐지는 추가 캡처들
export const works = [
  {
    id: 'autowant',
    name: 'Autowant 랜딩페이지',
    client: 'Autowant',
    category: '랜딩페이지',
    year: '2026',
    image: '/works/autowant1.png',
    gallery: [
      '/works/autowant2.png',
      '/works/autowant3.png',
      '/works/autowant4.png',
      '/works/autowant5.png',
      '/works/autowant6.png',
    ],
    summary: '제품 소개부터 문의 전환까지 한 흐름으로 설계한 단일 페이지 랜딩.',
    description:
      '히어로 비주얼, 제품 가치 제안, 핵심 기능 소개, 신뢰 강화 섹션, 문의 CTA까지 스크롤 한 번에 자연스럽게 이어지도록 정보 구조와 인터랙션을 설계했습니다. 데스크탑부터 모바일까지 동일한 임팩트가 유지되도록 반응형 그리드와 타이포 스케일을 잡았고, 문의 전환율을 끌어올리기 위해 CTA 배치와 스크롤 깊이별 콘텐츠 노출 순서를 세밀하게 다듬었습니다. 검색 노출(SEO)과 초기 로드 속도, 모바일 인터랙션 디테일까지 함께 최적화한 단일 페이지 작업입니다.',
    tags: ['React', 'Vite', 'Tailwind CSS', '반응형', 'SEO', '애니메이션'],
  },
]

export const findWork = (id) => works.find((w) => w.id === id)
