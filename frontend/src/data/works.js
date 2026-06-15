// 포트폴리오 / 작업물
// 이미지는 public/works/ 폴더에 두고 절대 경로(/works/파일명.png)로 참조합니다.
export const works = [
  {
    id: 'autowant',
    name: 'Autowant 랜딩페이지',
    client: '—',
    category: '랜딩페이지',
    year: '2026',
    image: '/works/autowant-landing-page.png',
    summary: '브랜드 톤과 전환 흐름을 살린 반응형 랜딩페이지.',
    description:
      '메인 비주얼, 제품 소개 섹션, 문의 폼, 모바일 최적화까지 포함한 단일 페이지 랜딩 작업. 자세한 설명은 추후 업데이트 예정입니다.',
    tags: ['React', 'Vite', '반응형'],
  },
]

export const findWork = (id) => works.find((w) => w.id === id)
