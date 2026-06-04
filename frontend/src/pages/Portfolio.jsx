import { useMemo, useState } from 'react'
import PageHero from '../components/PageHero.jsx'
import Reveal from '../components/Reveal.jsx'
import WorkCard from '../components/WorkCard.jsx'
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
          <div className="filter-bar">
            {categories.map((c) => (
              <button
                key={c}
                className={`filter-chip${active === c ? ' active' : ''}`}
                onClick={() => setActive(c)}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="works-grid">
            {filtered.map((w, i) => (
              <Reveal key={w.id} delay={(i % 3) * 70}>
                <WorkCard work={w} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
