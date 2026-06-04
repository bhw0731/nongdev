import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal.jsx'
import SectionHeader from '../components/SectionHeader.jsx'
import SectionNum from '../components/SectionNum.jsx'
import SectionNav from '../components/SectionNav.jsx'
import Sticker from '../components/Sticker.jsx'
import ServiceCard from '../components/ServiceCard.jsx'
import WorkCard from '../components/WorkCard.jsx'
import FaqAccordion from '../components/FaqAccordion.jsx'
import Icon from '../components/Icon.jsx'
import useDocumentMeta from '../hooks/useDocumentMeta.js'
import { openChannelTalk } from '../lib/channeltalk.js'
import { profile } from '../data/profile.js'
import { services } from '../data/services.js'
import { capabilities } from '../data/capabilities.js'
import { process } from '../data/process.js'
import { compareRows, benefits } from '../data/whyFullstack.js'
import { faq } from '../data/faq.js'
import { trust } from '../data/trust.js'
import { works } from '../data/works.js'
import { reviews } from '../data/reviews.js'
import './Home.css'

function Roller({ words }) {
  const [i, setI] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setI((p) => (p + 1) % words.length), 2600)
    return () => clearInterval(id)
  }, [words.length])
  return (
    <span className="hero-roller">
      <span className="hero-roller__word gradient-text" key={i}>
        {words[i]}
      </span>
    </span>
  )
}

function Hero() {
  return (
    <section className="hero-full">
      <div className="hero-full__bg" />
      <Sticker
        tone="lime"
        tilt={-6}
        style={{ position: 'absolute', top: '120px', right: '32px', zIndex: 5 }}
      >
        ★ AVAILABLE NOW ★
      </Sticker>
      <div className="container-wide hero-full__content">
        <div className="hero-full__text">
          <button type="button" className="avb-chip" onClick={openChannelTalk}>
            <span className="avb-dot" />
            이번 달 1건 신규 의뢰 접수 가능
            <span className="avb-chip-hint">· 평일 24시간 내 답변</span>
          </button>
          <h1 className="hero-full__title">
            <span translate="no">{profile.brand}</span>
            <Roller words={profile.roller} />
            <span className="hero-sub">{profile.heroSub}</span>
          </h1>
          <p className="hero-full__desc">
            기획부터 디자인, 개발, 배포까지 — 한 사람의 손에서 일관되게.
            <br />
            웹·앱·쇼핑몰을 원스톱으로 만들어 드립니다.
          </p>
          <div className="hero-actions">
            <button className="btn btn-primary btn-lg insert-coin" onClick={openChannelTalk}>
              <span className="insert-coin__cursor">▶</span> INSERT COIN — 1:1 상담
            </button>
            <Link className="btn btn-outline btn-lg" to="/portfolio">
              포트폴리오 보기
            </Link>
          </div>
        </div>

        <div className="crt-wrap" aria-hidden="true">
          <div className="crt-window">
            <div className="crt-header">
              <span className="crt-dot crt-dot--red" />
              <span className="crt-dot crt-dot--yellow" />
              <span className="crt-dot crt-dot--green" />
              <span className="crt-header-title mono">~/nongdev — zsh</span>
            </div>
            <div className="crt-body mono">
              <div className="crt-row"><span className="crt-prompt">$</span> nongdev init --client "당신"</div>
              <div className="crt-row crt-dim">→ 요구사항 정리 완료</div>
              <div className="crt-row crt-info">→ 기획 · 디자인 · 개발 · 배포 진행중…</div>
              <div className="crt-row crt-ok">✓ 제품이 완성되었습니다 (2.4s)</div>
              <div className="crt-row crt-dim"># 추가 비용 깜짝 청구 없음</div>
              <div className="crt-row"><span className="crt-prompt">$</span> deploy --to production<span className="crt-caret" /></div>
            </div>
          </div>
        </div>
      </div>

      <div className="scroll-hint" aria-hidden="true">
        <span className="mono">SCROLL</span>
        <span className="scroll-hint__line" />
      </div>
    </section>
  )
}

const marqueeWords = [
  'WEB DEVELOPMENT',
  'APP DEVELOPMENT',
  'UI/UX DESIGN',
  'PUBLISHING',
  'BRANDING',
  'CONSULTING',
]

function MarqueeGroup() {
  return (
    <span className="marquee__group">
      {marqueeWords.map((w, i) => (
        <span className="marquee__item" key={i}>
          <span className="marquee__star">✦</span>
          <span className={`marquee__word${i % 2 ? ' marquee__word--outline' : ''}`}>{w}</span>
        </span>
      ))}
    </span>
  )
}

function MarqueeRow({ reverse }) {
  return (
    <div className={`marquee__row${reverse ? ' marquee__row--rev' : ''}`}>
      <div className="marquee__track">
        {[0, 1, 2].map((g) => (
          <MarqueeGroup key={g} />
        ))}
      </div>
    </div>
  )
}

function Marquee() {
  return (
    <div className="marquee" aria-hidden="true">
      <MarqueeRow />
      <MarqueeRow reverse />
    </div>
  )
}

function Intro() {
  return (
    <section id="intro" className="section intro-section">
      <SectionNum num="01" />
      <Sticker
        tone="accent"
        tilt={4}
        style={{ position: 'absolute', bottom: 30, right: 28, zIndex: 2 }}
      >
        ★ 1H REPLY ★
      </Sticker>
      <div className="container-wide intro-grid">
        <Reveal className="intro-left">
          <span className="section-label">WHO WE ARE</span>
          <h2 className="intro-title">{profile.introTitle}</h2>
          <p className="intro-desc">{profile.introDesc}</p>
          <div className="intro-techs">
            {profile.techs.map((t) => (
              <span key={t} className="intro-tech-badge">{t}</span>
            ))}
          </div>
        </Reveal>
        <Reveal className="intro-right" delay={150}>
          <div className="intro-image-stack">
            <div className="intro-img-deco" />
            <div className="intro-card intro-card--code">
              <div className="intro-card__head">
                <span className="intro-card__dots">
                  <span className="intro-card__dot intro-card__dot--r" />
                  <span className="intro-card__dot intro-card__dot--y" />
                  <span className="intro-card__dot intro-card__dot--g" />
                </span>
                <span className="intro-card__file">how-we-make.js</span>
              </div>
              <pre className="intro-code">
<span className="tk-com">{`// nongdev 작업 흐름`}</span>
{`\n`}<span className="tk-key">const</span> <span className="tk-fn">makeProduct</span> = <span className="tk-key">async</span> {`(idea) => {`}
{`\n  `}<span className="tk-key">const</span> spec   = <span className="tk-fn">research</span>{`(idea)`}
{`\n  `}<span className="tk-key">const</span> design = <span className="tk-fn">craft</span>{`(spec)`}
{`\n  `}<span className="tk-key">const</span> app    = <span className="tk-fn">build</span>{`(design)`}
{`\n  `}<span className="tk-key">return</span> <span className="tk-fn">deploy</span>{`(app)`}
{`\n}`}
{`\n\n`}<span className="tk-com">{`// 한 사람의 손에서 끝까지`}</span>
              </pre>
            </div>
            <div className="intro-card intro-card--metric">
              <span className="intro-metric__label">STATUS</span>
              <div className="intro-metric__row">
                <span className="intro-metric__pulse" />
                ONLINE · 24H
              </div>
              <span className="intro-metric__label">RESPONSE</span>
              <span className="intro-metric__big">≈ 1H</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function ServicesPreview() {
  return (
    <section id="services" className="section services-section">
      <SectionNum num="02" />
      <div className="container-wide">
        <SectionHeader label="SERVICES" title={'필요한 결과물,\n바로 만들어드립니다'} />
        <div className="services-grid">
          {services.map((s, i) => (
            <Reveal key={s.id} delay={(i % 3) * 80}>
              <ServiceCard service={s} asLink href={`/services#${s.id}`} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function WhyFullstack() {
  return (
    <section id="why" className="section why-section">
      <SectionNum num="03" />
      <div className="container-wide">
        <SectionHeader
          label="WHY FULL-STACK"
          title="왜 풀스택 개발이어야 할까요?"
          desc={'아임웹, Wix 같은 빌더는 간편하지만 한계가 명확합니다.\n비즈니스가 성장할수록 커스텀 개발의 가치가 빛납니다.'}
          center
        />
        <Reveal className="compare-table">
          <div className="compare-head">
            <div className="compare-cell compare-cell--feature" />
            <div className="compare-cell compare-cell--builder">
              <span className="compare-tag compare-tag--gray">빌더 서비스</span>
              <h3>아임웹 / Wix</h3>
            </div>
            <div className="compare-cell compare-cell--custom">
              <span className="compare-tag compare-tag--brand" translate="no">nongdev</span>
              <h3>풀스택 개발</h3>
              <span className="compare-recommended">RECOMMENDED</span>
            </div>
          </div>
          {compareRows.map((row) => (
            <div className="compare-row" key={row.feature}>
              <div className="compare-cell compare-cell--feature">{row.feature}</div>
              <div className="compare-cell">
                <span className={`compare-mark compare-mark--${row.builder.good ? 'good' : 'bad'}`}>
                  {row.builder.good ? '✓' : '✕'}
                </span>
                <span className="compare-text">{row.builder.text}</span>
              </div>
              <div className={`compare-cell${row.custom.good ? ' compare-cell--winner' : ''}`}>
                <span className={`compare-mark compare-mark--${row.custom.good ? 'good' : 'bad'}`}>
                  {row.custom.good ? '✓' : '✕'}
                </span>
                <span className="compare-text">{row.custom.text}</span>
              </div>
            </div>
          ))}
        </Reveal>

        <div className="why-benefits">
          <Reveal className="why-benefits-head">
            <span className="section-label">KEY BENEFITS</span>
            <h3>풀스택 개발이 비즈니스에 주는 4가지 가치</h3>
          </Reveal>
          <div className="why-cards">
            {benefits.map((b, i) => (
              <Reveal key={b.num} className="why-card" delay={i * 80}>
                <span className="why-card-num mono">{b.num}</span>
                <h4>{b.title}</h4>
                <span className="why-card-highlight">{b.highlight}</span>
                <p>{b.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function ProcessSection() {
  return (
    <section id="process" className="section proc-section">
      <SectionNum num="04" />
      <div className="container-wide">
        <SectionHeader label="HOW WE WORK" title={'아이디어부터\n런칭까지, 네 단계로'} />
        <ol className="proc-list">
          {process.map((step, i) => (
            <Reveal as="li" key={step.num} className="proc-step" delay={i * 80}>
              <div className="proc-step-num mono">{step.num}</div>
              <div className="proc-step-body">
                <div className="proc-step-tag mono">{step.tag}</div>
                <h3 className="proc-step-title">{step.title}</h3>
                <p className="proc-step-desc">{step.desc}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}

function Capabilities() {
  return (
    <section id="capabilities" className="section caps-section">
      <SectionNum num="05" />
      <div className="container-wide">
        <SectionHeader
          label="WHAT I CAN BUILD"
          title={'이런 기능들,\n다 만들어드릴 수 있어요'}
          desc={'복잡한 기술 용어 대신, 사용자가 실제로 쓰는 모습으로 설명드려요.\n어떤 게 필요한지 모르시겠으면 1:1 상담에서 같이 정해드립니다.'}
        />
        <div className="caps-grid">
          {capabilities.map((c, i) => (
            <Reveal as="article" key={c.title} className="caps-card" delay={(i % 3) * 70}>
              <div className="caps-card-icon"><Icon name={c.icon} /></div>
              <h3 className="caps-card-title">{c.title}</h3>
              <p className="caps-card-desc">{c.desc}</p>
              <ul className="caps-card-tags">
                {c.tags.map((t) => (
                  <li key={t} className="caps-card-tag">{t}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Works() {
  return (
    <section id="works" className="section works-section">
      <SectionNum num="06" />
      <div className="container-wide">
        <Reveal className="section-header-row">
          <div>
            <span className="section-label">WORKS</span>
            <h2 className="section-title">최근 프로젝트</h2>
          </div>
          <Link className="view-all" to="/portfolio">
            전체 보기
            <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </Reveal>
        <div className="works-grid">
          {works.slice(0, 6).map((w, i) => (
            <Reveal key={w.id} delay={(i % 3) * 80}>
              <WorkCard work={w} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function ReviewsSection() {
  return (
    <section id="reviews" className="section high-scores">
      <SectionNum num="07" />
      <div className="container-wide">
        <SectionHeader
          label="HIGH SCORES"
          title="고객 후기"
          desc={'실제로 함께 일한 분들이 남겨주신 후기입니다.\n사람마다 결과는 다를 수 있어요.'}
        />
        <Reveal className="hs-frame">
          <table className="hs-table mono">
            <thead>
              <tr>
                <th>RANK</th>
                <th>SCORE</th>
                <th>PLAYER</th>
                <th className="hs-th-comment">COMMENT</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((r, i) => (
                <tr key={r.id}>
                  <td className="hs-rank">{String(i + 1).padStart(2, '0')}</td>
                  <td className="hs-score" aria-label={`별점 ${r.rating}점`}>
                    {'★'.repeat(r.rating)}
                  </td>
                  <td className="hs-player">{r.author}</td>
                  <td className="hs-comment">&ldquo;{r.content}&rdquo;</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
      </div>
    </section>
  )
}

function FaqSection() {
  return (
    <section id="faq" className="section faq-section">
      <SectionNum num="08" />
      <div className="container">
        <SectionHeader
          label="FAQ"
          title="자주 묻는 질문"
          desc={'계약 전에 가장 많이 받는 질문들을 모았습니다.\n더 궁금한 점은 1:1 상담으로 편하게 물어봐주세요.'}
          center
        />
        <FaqAccordion items={faq} />
      </div>
    </section>
  )
}

function Trust() {
  return (
    <section id="trust" className="section trust-section">
      <SectionNum num="09" />
      <Sticker
        tone="ink"
        tilt={-5}
        style={{ position: 'absolute', top: 30, right: 28, zIndex: 2 }}
      >
        ★ NO HIDDEN COSTS ★
      </Sticker>
      <div className="trust-grid-bg" aria-hidden="true" />
      <div className="container-wide">
        <SectionHeader
          label="// OUR PROMISE"
          title="안심하고 맡기세요"
          desc="계약부터 사후 관리까지, 외주에서 불안할 수 있는 부분을 먼저 약속으로 정리했습니다."
          center
        />
        <div className="trust-items">
          {trust.map((t, i) => (
            <Reveal key={t.title} className="trust-item" delay={(i % 3) * 70}>
              <div className="trust-item__icon"><Icon name={t.icon} /></div>
              <h3 className="trust-item__title">{t.title}</h3>
              <p className="trust-item__desc">{t.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function ClosingCTA() {
  return (
    <section className="player-two">
      <div className="container player-two__inner">
        <Reveal>
          <span className="player-two__label mono blink">▶ PRESS TO START</span>
          <h2 className="player-two__title">PLAYER 2 JOIN?</h2>
          <p className="player-two__desc">
            다음 STAGE의 주인공이 될 수 있어요.
            <br />
            간단한 아이디어만 있어도 OK.
          </p>
          <button className="btn btn-primary btn-lg" onClick={openChannelTalk}>
            ▶ 1:1 상담 시작하기
          </button>
          <p className="player-two__hint mono">
            평일 24시간 내 답변 · 보통 1시간 내
          </p>
        </Reveal>
      </div>
    </section>
  )
}

export default function Home() {
  useDocumentMeta(
    'nongdev | 1인 개발 스튜디오',
    '기획부터 배포까지 끝까지 책임지는 1인 개발 스튜디오 nongdev. 웹·앱·쇼핑몰을 제대로 작동하는 제품으로 만들어 드립니다.',
  )
  return (
    <div className="home">
      <SectionNav />
      <Hero />
      <Marquee />
      <Intro />
      <ServicesPreview />
      <WhyFullstack />
      <ProcessSection />
      <Capabilities />
      <Works />
      <ReviewsSection />
      <FaqSection />
      <Trust />
      <ClosingCTA />
    </div>
  )
}
