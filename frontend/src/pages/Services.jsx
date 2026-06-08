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

function buildPackageMessage(svc) {
  const lines = [
    `📦 ${svc.tier} 패키지 문의 (${svc.price})`,
    '─'.repeat(30),
    `· 종류: ${svc.ko}`,
    `· 페이지 수: ${svc.pages}페이지`,
    `· 기능 추가: ${svc.extras}개`,
    `· 작업일: 약 ${svc.period}`,
    `· 수정 횟수: ${svc.revisions}회`,
    '─'.repeat(30),
    '이 패키지로 상담 부탁드립니다 🙏',
  ]
  return lines.join('\n')
}

function TierCard({ svc, delay = 0 }) {
  const onInstall = async () => {
    const msg = buildPackageMessage(svc)
    try {
      await navigator.clipboard.writeText(msg)
    } catch (e) {
      // ignore
    }
    openChannelTalk()
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

      {svc.highlight && (
        <div className="tier-card__ribbon mono">⭐ RECOMMENDED</div>
      )}

      <div className="tier-card__body">
        <div className="tier-card__tier mono">{svc.tier}</div>
        <div className="tier-card__name">{svc.ko}</div>
        <div className="tier-card__icon"><Icon name={svc.icon} /></div>
        <div className="tier-card__price mono">{svc.price}</div>
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

      <button className="btn btn-primary btn-block tier-card__cta" onClick={onInstall}>
        ▶ install {svc.tier.toLowerCase()}
      </button>
    </Reveal>
  )
}

export default function Services() {
  useDocumentMeta(
    '서비스 · 가격 | nongdev',
    'STANDARD · DELUXE · PREMIUM 3가지 패키지. 랜딩페이지부터 풀스택 홈페이지까지.',
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
        desc="3가지 패키지 중에서 골라주세요. 클릭하면 견적표가 자동 복사돼서 채팅이 열려요."
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
            * 표준 패키지 기준이며, 작업 범위가 다르면 상담에서 맞춤 견적 가능합니다.
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
