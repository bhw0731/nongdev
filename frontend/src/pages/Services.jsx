import { useEffect, useState, useMemo } from 'react'
import { useLocation, Link } from 'react-router-dom'
import PageHero from '../components/PageHero.jsx'
import Reveal from '../components/Reveal.jsx'
import Icon from '../components/Icon.jsx'
import { openChannelTalk } from '../lib/channeltalk.js'
import useDocumentMeta from '../hooks/useDocumentMeta.js'
import { services, addOns } from '../data/services.js'
import { process } from '../data/process.js'
import './Pages.css'

const fmt = (n) => n.toLocaleString('ko-KR')

function TierCard({ svc, delay = 0 }) {
  // selected: { [addonId]: count }  (0 = 미선택, 1+ = 선택)
  const [selected, setSelected] = useState({})

  const optionsTotal = useMemo(() => {
    return addOns.reduce((sum, a) => {
      const n = selected[a.id] || 0
      return sum + n * a.price
    }, 0)
  }, [selected])

  const total = svc.basePrice + optionsTotal

  const toggle = (id) => {
    setSelected((s) => {
      const cur = s[id] || 0
      return { ...s, [id]: cur > 0 ? 0 : 1 }
    })
  }

  const inc = (id, max) => {
    setSelected((s) => {
      const cur = s[id] || 0
      return { ...s, [id]: Math.min(cur + 1, max) }
    })
  }

  const dec = (id) => {
    setSelected((s) => {
      const cur = s[id] || 0
      return { ...s, [id]: Math.max(cur - 1, 0) }
    })
  }

  return (
    <Reveal as="article" className={`tier-card${svc.highlight ? ' tier-card--reco' : ''}`} delay={delay}>
      <div className="tier-card__head mono">
        <span className="tier-card__dots">
          <span className="tier-card__dot tier-card__dot--r" />
          <span className="tier-card__dot tier-card__dot--y" />
          <span className="tier-card__dot tier-card__dot--g" />
        </span>
        <span className="tier-card__file">{svc.tier.toLowerCase()}.pkg.json</span>
      </div>

      <div className="tier-card__inner">
        {/* LEFT: package info */}
        <div className="tier-card__main">
          <div className="tier-card__tier mono">{svc.tier}</div>
          <div className="tier-card__name">{svc.ko}</div>
          <div className="tier-card__icon"><Icon name={svc.icon} /></div>

          <div className="tier-card__price-block">
            <div className="tier-card__price mono">{fmt(total)}원</div>
            <div
              className="tier-card__price-breakdown mono"
              style={{ visibility: optionsTotal > 0 ? 'visible' : 'hidden' }}
              aria-hidden={optionsTotal === 0}
            >
              base {fmt(svc.basePrice)} <span>+</span> 옵션 {fmt(optionsTotal)}
            </div>
          </div>

          <p className="tier-card__desc">{svc.desc}</p>

          <div className="tier-card__divider" />

          <div className="tier-card__section">
            <span className="tier-card__section-label mono">$ npm pkg show features</span>
            <ul className="tier-card__features mono">
              {svc.features.map((f) => (
                <li key={f} className="tier-card__feat is-yes">
                  <span className="tier-card__feat-mark">✓</span> {f}
                </li>
              ))}
              {svc.excluded.map((f) => (
                <li key={f} className="tier-card__feat is-no">
                  <span className="tier-card__feat-mark">✗</span> {f}
                </li>
              ))}
            </ul>
          </div>

          <div className="tier-card__divider" />

          <dl className="tier-card__specs mono">
            <div className="tier-card__spec">
              <dt>▸ pages</dt>
              <dd>{svc.pages}페이지</dd>
            </div>
            <div className="tier-card__spec">
              <dt>▸ extras</dt>
              <dd>{svc.extras}개</dd>
            </div>
            <div className="tier-card__spec">
              <dt>▸ days</dt>
              <dd>{svc.period}</dd>
            </div>
            <div className="tier-card__spec">
              <dt>▸ revisions</dt>
              <dd>{svc.revisions}회</dd>
            </div>
          </dl>
        </div>

        {/* RIGHT: addon options */}
        <aside className="tier-card__addons">
          <div className="tier-card__extras-head mono">
            + 추가 옵션 <span className="tier-card__extras-hint">(클릭하면 합산)</span>
          </div>
          <ul className="tier-card__addon-list mono">
            {addOns.map((a) => {
              const n = selected[a.id] || 0
              const on = n > 0
              const lineTotal = n * a.price
              return (
                <li key={a.id} className={`tier-card__addon${on ? ' is-on' : ''}`}>
                  {a.type === 'toggle' ? (
                    <button
                      type="button"
                      className="tier-card__addon-toggle"
                      onClick={() => toggle(a.id)}
                      aria-pressed={on}
                    >
                      <span className="tier-card__addon-check">{on ? '☑' : '☐'}</span>
                      <span className="tier-card__addon-label">{a.label}</span>
                      <span className="tier-card__addon-price">+{fmt(a.price)}원</span>
                    </button>
                  ) : (
                    <div className="tier-card__addon-count">
                      <div className="tier-card__addon-counter">
                        <button
                          type="button"
                          className="tier-card__cbtn"
                          onClick={() => dec(a.id)}
                          disabled={n === 0}
                          aria-label={`${a.label} 줄이기`}
                        >−</button>
                        <span className="tier-card__cval">{n}</span>
                        <button
                          type="button"
                          className="tier-card__cbtn"
                          onClick={() => inc(a.id, a.max)}
                          disabled={n >= a.max}
                          aria-label={`${a.label} 늘리기`}
                        >+</button>
                      </div>
                      <span className="tier-card__addon-label">{a.label}</span>
                      <span className="tier-card__addon-price">
                        {n > 0 ? `+${fmt(lineTotal)}원` : `+${fmt(a.price)}/${a.unit}`}
                      </span>
                    </div>
                  )}
                </li>
              )
            })}
          </ul>
        </aside>
      </div>
    </Reveal>
  )
}

export default function Services() {
  useDocumentMeta(
    '서비스 · 가격 | nongdev',
    'STANDARD · DELUXE · PREMIUM 3가지 패키지. 옵션을 클릭하면 가격이 실시간으로 합산됩니다.',
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
        title="패키지 선택"
        desc="3가지 패키지 중에서 골라주세요. 추가 옵션을 클릭하면 가격이 실시간으로 합산돼요."
      />

      <section className="section">
        <div className="container-wide">
          <Reveal className="tier-cmd mono">
            <span className="tier-cmd__prompt">$</span> npm pkg list @nongdev
            <span className="tier-cmd__cursor" />
          </Reveal>
          <div className="tier-grid">
            {services.map((s, i) => (
              <span key={s.id} id={s.id}>
                <TierCard svc={s} delay={i * 80} />
              </span>
            ))}
          </div>
          <p className="tier-note mono">
            * 표준 패키지 기준이며, 작업 범위가 다르면 우측 하단 1:1 상담에서 맞춤 견적 가능합니다.
          </p>
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
