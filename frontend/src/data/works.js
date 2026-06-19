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
    summary: '브랜드 톤과 전환 흐름을 살린 반응형 랜딩페이지.',
    description:
      '메인 비주얼, 제품 소개 섹션, 문의 폼, 모바일 최적화까지 포함한 단일 페이지 랜딩 작업. 자세한 설명은 추후 업데이트 예정입니다.',
    tags: ['React', 'Vite', '반응형'],
  },
]

export const findWork = (id) => works.find((w) => w.id === id)
