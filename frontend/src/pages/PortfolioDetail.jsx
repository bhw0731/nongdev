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
  const indexNum = String(idx + 1).padStart(2, '0')

  return (
    <article className="pf-detail">
      <div className="container-wide">
        <Link className="pf-detail__back mono" to="/portfolio">
          ← INDEX
        </Link>

        <Reveal>
          <div className="pf-detail__head">
            <span className="pf-detail__num mono">{indexNum}</span>
            <span className="pf-detail__crumb mono">
              {work.category} <span className="pf-detail__sep">·</span> {work.year}
            </span>
          </div>
          <h1 className="pf-detail__title">{work.name}</h1>
          <p className="pf-detail__summary">{work.summary}</p>
        </Reveal>

        <Reveal as="div" className="pf-detail__spec mono">
          <div className="pf-detail__spec-row">
            <span className="pf-detail__spec-k">CLIENT</span>
            <span className="pf-detail__spec-v">{work.client}</span>
          </div>
          <div className="pf-detail__spec-row">
            <span className="pf-detail__spec-k">CATEGORY</span>
            <span className="pf-detail__spec-v">{work.category}</span>
          </div>
          <div className="pf-detail__spec-row">
            <span className="pf-detail__spec-k">YEAR</span>
            <span className="pf-detail__spec-v">{work.year}</span>
          </div>
          <div className="pf-detail__spec-row">
            <span className="pf-detail__spec-k">STACK</span>
            <span className="pf-detail__spec-v">{work.tags.length} TECH</span>
          </div>
        </Reveal>

        <Reveal className="pf-detail__hero">
          <img src={work.image} alt={work.name} />
        </Reveal>

        <div className="pf-detail__body">
          <Reveal className="pf-detail__main">
            <h2 className="pf-detail__h2 mono">ABOUT THE PROJECT</h2>
            <p className="pf-detail__desc">{work.description}</p>
          </Reveal>

          <Reveal as="aside" className="pf-detail__aside" delay={100}>
            <div>
              <h3 className="pf-detail__h3 mono">STACK</h3>
              <ul className="pf-detail__stack mono">
                {work.tags.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
            <button
              type="button"
              className="btn btn-primary btn-block"
              onClick={openChannelTalk}
            >
              비슷한 작업 문의하기
            </button>
          </Reveal>
        </div>

        <Link className="pf-detail__next" to={`/portfolio/${next.id}`}>
          <div className="pf-detail__next-left">
            <span className="pf-detail__next-k mono">NEXT WORK</span>
            <strong className="pf-detail__next-name">{next.name}</strong>
          </div>
          <span className="pf-detail__next-arrow" aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  )
}
