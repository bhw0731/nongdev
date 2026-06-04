import { useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import PageHero from '../components/PageHero.jsx'
import Reveal from '../components/Reveal.jsx'
import Icon from '../components/Icon.jsx'
import { openChannelTalk } from '../lib/channeltalk.js'
import useDocumentMeta from '../hooks/useDocumentMeta.js'
import { services } from '../data/services.js'
import { process } from '../data/process.js'
import './Pages.css'

export default function Services() {
  useDocumentMeta(
    '서비스 · 가격 | nongdev',
    '랜딩페이지·기업홈페이지·웹앱·쇼핑몰·앱·관리자 시스템 — nongdev의 작업 종류와 기준 가격 안내.',
  )
  const { hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1))
      if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'center' }), 100)
    }
  }, [hash])

  return (
    <>
      <PageHero
        label="SERVICES"
        title="제공 서비스 & 가격"
        desc="아래 금액은 기준 예시이며, 실제 견적은 작업 범위에 따라 상담에서 맞춰 드립니다."
      />

      <section className="section">
        <div className="container-wide svc-list">
          {services.map((s, i) => (
            <Reveal as="article" key={s.id} id={s.id} className="svc-row" delay={(i % 2) * 60}>
              <div className="svc-row__head">
                <span className="service-icon"><Icon name={s.icon} /></span>
              </div>
              <div className="svc-row__main">
                <h2 className="svc-row__title">
                  {s.ko} <span className="svc-row__en mono">{s.en}</span>
                </h2>
                <p className="svc-row__desc">{s.desc}</p>
                <ul className="svc-features">
                  {s.features.map((f) => (
                    <li key={f}><Icon name="shield" className="svc-feature-ic" />{f}</li>
                  ))}
                </ul>
              </div>
              <div className="svc-row__price">
                <span className="svc-price-amount">{s.price}</span>
                <span className="svc-price-period">작업기간 {s.period}</span>
                <button className="btn btn-primary btn-block" onClick={openChannelTalk}>
                  이 작업 문의하기
                </button>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section section-soft">
        <div className="container-wide">
          <Reveal className="section-header section-header--center">
            <span className="section-label">HOW WE WORK</span>
            <h2 className="section-title">진행 방식</h2>
          </Reveal>
          <div className="svc-process">
            {process.map((step) => (
              <Reveal key={step.num} className="svc-process-step">
                <span className="proc-step-num mono">{step.num}</span>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </Reveal>
            ))}
          </div>
          <div className="page-cta">
            <Link className="btn btn-outline btn-lg" to="/portfolio">작업물 보기</Link>
            <button className="btn btn-primary btn-lg" onClick={openChannelTalk}>1:1 상담 시작</button>
          </div>
        </div>
      </section>
    </>
  )
}
