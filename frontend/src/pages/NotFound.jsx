import { Link } from 'react-router-dom'
import useDocumentMeta from '../hooks/useDocumentMeta.js'
import './Pages.css'

export default function NotFound() {
  useDocumentMeta('404 | nongdev', '요청하신 페이지를 찾을 수 없습니다.')
  return (
    <section className="section">
      <div className="container empty-state">
        <span className="notfound-code gradient-text mono">404</span>
        <h1>페이지를 찾을 수 없어요</h1>
        <p>주소가 잘못되었거나 삭제된 페이지입니다.</p>
        <Link className="btn btn-primary btn-lg" to="/">홈으로 돌아가기</Link>
      </div>
    </section>
  )
}
