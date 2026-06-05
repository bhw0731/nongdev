import { Link, useLocation } from 'react-router-dom'
import useDocumentMeta from '../hooks/useDocumentMeta.js'
import './Pages.css'

export default function NotFound() {
  useDocumentMeta('404 | nongdev', '요청하신 페이지를 찾을 수 없습니다.')
  const { pathname } = useLocation()
  return (
    <section className="section">
      <div className="container nf-wrap">
        <div className="nf-terminal mono">
          <div className="nf-line nf-line--cmd">
            <span className="nf-prompt">$</span> cat .{pathname}
          </div>
          <div className="nf-line nf-line--err">
            cat: .{pathname}: No such file or directory
          </div>
          <div className="nf-line nf-line--blank" />
          <div className="nf-line nf-line--cmd">
            <span className="nf-prompt">$</span> echo &quot;exit 404&quot;
          </div>
          <div className="nf-line">exit 404</div>
          <div className="nf-line nf-line--blank" />
          <div className="nf-line nf-line--cmd">
            <span className="nf-prompt">$</span> cd ~
            <span className="nf-cursor" />
          </div>
        </div>
        <h1 className="nf-title">페이지를 찾을 수 없어요</h1>
        <p className="nf-desc">
          요청하신 경로가 존재하지 않아요. 홈으로 돌아가서 다시 시작해보세요.
        </p>
        <Link className="btn btn-primary btn-lg" to="/">
          ▶ 홈으로 돌아가기
        </Link>
      </div>
    </section>
  )
}
