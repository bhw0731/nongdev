import { useParams, Link } from 'react-router-dom'
import Reveal from '../components/Reveal.jsx'
import useDocumentMeta from '../hooks/useDocumentMeta.js'
import { openChannelTalk } from '../lib/channeltalk.js'
import { works, findWork } from '../data/works.js'
import './Pages.css'

export default function PortfolioDetail() {
  const { id } = useParams()
  const work = findWork(id)

  useDocumentMeta(
    work ? `${work.name} | nongdev` : '프로젝트 | nongdev',
    work?.summary || 'nongdev 포트폴리오 프로젝트 상세.',
  )

  if (!work) {
    return (
      <section className="section">
        <div className="container empty-state">
          <h1>프로젝트를 찾을 수 없어요</h1>
          <p>주소가 바뀌었거나 삭제된 프로젝트일 수 있습니다.</p>
          <Link className="btn btn-primary" to="/portfolio">포트폴리오로 돌아가기</Link>
        </div>
      </section>
    )
  }

  const idx = works.findIndex((w) => w.id === id)
  const next = works[(idx + 1) % works.length]

  return (
    <article className="detail">
      <section className="detail-hero">
        <div className="container-wide">
          <Link className="detail-back" to="/portfolio">← 포트폴리오</Link>
          <Reveal>
            <span className="section-label">{work.category} · {work.year}</span>
            <h1 className="detail-title">{work.name}</h1>
            <p className="detail-client">{work.client}</p>
          </Reveal>
        </div>
      </section>

      <div className="container-wide">
        <Reveal className="detail-image">
          <img src={work.image} alt={work.name} />
        </Reveal>

        <div className="detail-body">
          <Reveal className="detail-main">
            <h2>프로젝트 소개</h2>
            <p>{work.description}</p>
            <p className="detail-summary">{work.summary}</p>
          </Reveal>
          <Reveal className="detail-side" delay={100}>
            <h3>사용 기술</h3>
            <div className="detail-tags">
              {work.tags.map((t) => (
                <span key={t} className="detail-tag">{t}</span>
              ))}
            </div>
            <button className="btn btn-primary btn-block" onClick={openChannelTalk}>
              비슷한 작업 문의하기
            </button>
          </Reveal>
        </div>

        <Link className="detail-next" to={`/portfolio/${next.id}`}>
          <span>다음 프로젝트</span>
          <strong>{next.name} →</strong>
        </Link>
      </div>
    </article>
  )
}
