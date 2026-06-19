// 포트폴리오 / 작업물
// 이미지는 public/works/ 폴더에 두고 절대 경로(/works/파일명.png)로 참조합니다.
export const works = []

export const findWork = (id) => works.find((w) => w.id === id)
