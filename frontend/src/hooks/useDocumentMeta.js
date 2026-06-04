import { useEffect } from 'react'

const BASE_TITLE = 'nongdev'
const BASE_DESC =
  '기획부터 배포까지 끝까지 책임지는 1인 개발 스튜디오 nongdev. 웹·앱·쇼핑몰을 제대로 작동하는 제품으로 만들어 드립니다.'

// 라우트 진입 시 <title>과 description meta 를 페이지별로 업데이트.
// useDocumentMeta('포트폴리오 | nongdev', '실제로 진행한 웹·앱 프로젝트들...')
export default function useDocumentMeta(title, description) {
  useEffect(() => {
    document.title = title || BASE_TITLE
    if (description) {
      let el = document.querySelector('meta[name="description"]')
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute('name', 'description')
        document.head.appendChild(el)
      }
      el.setAttribute('content', description)
    }
  }, [title, description])
}

export { BASE_TITLE, BASE_DESC }
