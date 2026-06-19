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
    summary: '스크롤 한 번으로 끝까지 보게 되는, 문의로 자연스럽게 이어지는 한 페이지 사이트.',
    description:
      '맨 위 큰 이미지로 시선을 끌고, 어떤 서비스인지 한눈에 보이도록 소개한 뒤, 신뢰가 가는 정보와 함께 마지막 문의 버튼까지 자연스럽게 이어지는 한 페이지짜리 사이트를 만들었습니다. 컴퓨터에서 보든 스마트폰에서 보든 똑같이 예쁘게 보이도록 작업했고, 사람들이 화면을 내릴수록 점점 관심을 갖고 문의를 남기도록 보여주는 순서와 버튼 위치를 다듬었습니다. 구글에 검색했을 때 잘 노출되도록 했고, 첫 화면이 빨리 떠서 답답함 없이 볼 수 있도록 가볍게 만들었습니다.',
    tags: ['React', 'Vite', 'Tailwind CSS', '반응형', 'SEO', '애니메이션'],
  },
]

export const findWork = (id) => works.find((w) => w.id === id)
