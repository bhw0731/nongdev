import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero.jsx'
import Reveal from '../components/Reveal.jsx'
import useDocumentMeta from '../hooks/useDocumentMeta.js'
import { works } from '../data/works.js'
import './Pages.css'

export default function Portfolio() {
  useDocumentMeta(
    '포트폴리오 | nongdev',
    'nongdev가 실제로 진행한 웹·앱·쇼핑몰 프로젝트 모음. 비슷한 작업이 필요하면 1:1 상담으로 문의해 주세요.',
  )
  const categories = useMemo(
    () => ['전체', ...Array.from(new Set(works.map((w) => w.category)))],
    [],
  )
  const [active, setActive] = useState('전체')
  const filtered = active === '전체' ? works : works.filter((w) => w.category === active)

  return (
    <>
      <PageHero
        label="PORTFOLIO"
        title="포트폴리오 & 작업물"
        desc="실제로 진행한 프로젝트들입니다. 비슷한 작업을 원하시면 상담으로 문의해 주세요."
      />

      <section className="section">
        <div className="container-wide">
          <div className="pf-index mono">
            <span>
              <span className="pf-index__k">INDEX</span>
              <span className="pf-index__sep">·</span>
              <span>{filtered.length} OF {works.length} WORKS</span>
            </span>
            <span className="pf-index__year">2022 — 2026</span>
          </div>

          <div className="filter-bar">
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                className={`filter-chip${active === c ? ' active' : ''}`}
                onClick={() => setActive(c)}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="pf-sheet">
            {filtered.map((w, i) => (
              <Reveal as="div" key={w.id} delay={(i % 3) * 70}>
                <Link className="pf-cell" to={`/portfolio/${w.id}`}>
                  <div className="pf-cell__image">
                    <span className="pf-cell__index mono" aria-hidden="true">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <img src={w.image} alt={w.name} loading="lazy" decoding="async" />
                  </div>
                  <div className="pf-cell__caption">
                    <div className="pf-cell__meta mono">
                      <span>{w.category}</span>
                      <span className="pf-cell__meta-sep">·</span>
                      <span>{w.year}</span>
                    </div>
                    <h3 className="pf-cell__name">{w.name}</h3>
                    <div className="pf-cell__client mono">{w.client}</div>
                    <div className="pf-cell__tags mono">
                      {w.tags.slice(0, 4).join(' · ')}
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="pf-empty mono">no works in this category</p>
          )}
        </div>
      </section>
    </>
  )
}
