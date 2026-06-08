import { useEffect, useMemo, useState } from 'react'
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
        [ STATUS: AVAILABLE ]
      </Sticker>
      <div className="container-wide hero-full__content">
        <div className="hero-full__text">
          <button type="button" className="avb-chip" onClick={openChannelTalk}>
            <span className="avb-dot" />
            <span className="avb-chip-tag">[INFO]</span>
            availability: 1 slot
            <span className="avb-chip-hint">· response ~1h</span>
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
            <button className="btn btn-primary btn-lg" onClick={openChannelTalk}>
              1:1 상담 시작하기
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

      <div className="scroll-hint mono" aria-hidden="true">
        <span className="scroll-hint__prompt">$</span>
        <span>./scroll --down</span>
        <span className="scroll-hint__cursor" />
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
        [ REPLY: ~1H ]
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
        <Reveal className="svc-terminal">
          <div className="svc-terminal__head">
            <span className="svc-terminal__dots">
              <span className="svc-terminal__dot svc-terminal__dot--r" />
              <span className="svc-terminal__dot svc-terminal__dot--y" />
              <span className="svc-terminal__dot svc-terminal__dot--g" />
            </span>
            <span className="svc-terminal__file mono">package.json</span>
          </div>
          <div className="svc-terminal__body mono">
            <div className="svc-line svc-line--cmd">
              <span className="svc-prompt">$</span> npm install @nongdev/services
            </div>
            <div className="svc-spacer" />
            {services.map((s, i) => {
              const pkgId = s.id.replace(/^svc-/, '')
              return (
                <Reveal as="div" key={s.id} className="svc-line svc-line--pkg" delay={i * 60}>
                  <a className="svc-pkg-link" href={`/services#${s.id}`}>
                    <span className="svc-add">+</span>
                    <span className="svc-name">@nongdev/{pkgId}</span>
                    <span className="svc-version">@latest</span>
                    <span className="svc-ko">{s.ko}</span>
                    <span className="svc-meta">
                      {s.price} <span className="svc-meta-sep">·</span> {s.period}
                    </span>
                  </a>
                </Reveal>
              )
            })}
            <div className="svc-spacer" />
            <div className="svc-line svc-line--ok">
              + added {services.length} packages, 0 vulnerabilities found
            </div>
            <div className="svc-line svc-line--cmd">
              <span className="svc-prompt">$</span>
              <span className="svc-cursor" />
            </div>
          </div>
        </Reveal>
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
        <Reveal className="diff-terminal">
          <div className="diff-terminal__head">
            <span className="diff-terminal__dots">
              <span className="diff-terminal__dot diff-terminal__dot--r" />
              <span className="diff-terminal__dot diff-terminal__dot--y" />
              <span className="diff-terminal__dot diff-terminal__dot--g" />
            </span>
            <span className="diff-terminal__file mono">builders...nongdev.diff</span>
          </div>
          <div className="diff-terminal__body mono">
            <div className="diff-line diff-line--cmd">
              <span className="diff-prompt">$</span> git diff builders...nongdev
            </div>
            <div className="diff-spacer" />
            <div className="diff-line diff-line--header">
              <span className="diff-meta-old">--- a/builders</span>
            </div>
            <div className="diff-line diff-line--header">
              <span className="diff-meta-new">+++ b/nongdev</span>
            </div>
            <div className="diff-spacer" />
            {compareRows.map((row, i) => {
              const isTradeoff = row.builder.good && !row.custom.good
              return (
                <Reveal as="div" key={row.feature} className="diff-block" delay={i * 50}>
                  <div className="diff-line diff-line--hunk">
                    @@ {row.feature} @@{isTradeoff && <span className="diff-tradeoff"> ⚠ trade-off</span>}
                  </div>
                  <div className="diff-line diff-line--del">
                    <span className="diff-sign">-</span> {row.builder.text}
                  </div>
                  <div className="diff-line diff-line--add">
                    <span className="diff-sign">+</span> {row.custom.text}
                  </div>
                </Reveal>
              )
            })}
            <div className="diff-spacer" />
            <div className="diff-line diff-line--ok">
              ✓ 8 features · 7 improvements · 1 trade-off
            </div>
            <div className="diff-line diff-line--cmd">
              <span className="diff-prompt">$</span>
              <span className="diff-cursor" />
            </div>
          </div>
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
  const durations = ['1d', '2d', '7d', '1d']
  return (
    <section id="process" className="section proc-section">
      <SectionNum num="04" />
      <div className="container-wide">
        <SectionHeader label="HOW WE WORK" title={'아이디어부터\n런칭까지, 네 단계로'} />
        <Reveal className="ci-pipeline">
          <div className="ci-pipeline__head">
            <span className="ci-pipeline__icon">⚙</span>
            <span className="ci-pipeline__file mono">.github/workflows/client-project.yml</span>
            <span className="ci-pipeline__status mono">
              <span className="ci-pipeline__status-dot" /> passing
            </span>
          </div>
          <div className="ci-pipeline__sub mono">
            Run #42 · main · triggered by nongdev
          </div>
          <ol className="ci-stages">
            {process.map((step, i) => (
              <Reveal as="li" key={step.num} className="ci-stage" delay={i * 120}>
                <div className="ci-stage__rail" aria-hidden="true">
                  <span className="ci-stage__node">
                    <span className="ci-stage__check">✓</span>
                  </span>
                </div>
                <div className="ci-stage__card">
                  <div className="ci-stage__head">
                    <span className="ci-stage__num mono">JOB {step.num}</span>
                    <span className="ci-stage__tag mono">{step.tag}</span>
                    <span className="ci-stage__time mono">~{durations[i]}</span>
                  </div>
                  <h3 className="ci-stage__title">{step.title}</h3>
                  <p className="ci-stage__desc">{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </ol>
          <div className="ci-pipeline__footer mono">
            ✓ Run completed · 4/4 jobs passed · total ~11d
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function Capabilities() {
  const [openIdx, setOpenIdx] = useState(null)
  const maxLen = Math.max(...capabilities.map((c) => c.module.length))
  const padModule = (m) => m + ' '.repeat(maxLen - m.length)
  // 각 캡 항목이 차지하는 줄 수: 헤더(// 9 modules) 1줄 + 공백 1줄 + 항목당 1줄 + 펼침 시 추가
  const lineNumbers = useMemo(() => {
    const arr = []
    arr.push('1', '2')
    capabilities.forEach((_, i) => arr.push(String(i + 3)))
    arr.push(String(capabilities.length + 3), String(capabilities.length + 4))
    return arr
  }, [])

  return (
    <section id="capabilities" className="section caps-section">
      <SectionNum num="05" />
      <div className="container-wide">
        <SectionHeader
          label="WHAT I CAN BUILD"
          title={'이런 기능들,\n다 만들어드릴 수 있어요'}
          desc={'각 줄을 클릭하면 자세한 설명과 사용 가능한 기술 스택이 펼쳐져요.'}
        />
        <Reveal className="caps-ide">
          {/* IDE title bar */}
          <div className="caps-ide__titlebar">
            <span className="caps-ide__win-dots">
              <span className="caps-ide__win-dot caps-ide__win-dot--r" />
              <span className="caps-ide__win-dot caps-ide__win-dot--y" />
              <span className="caps-ide__win-dot caps-ide__win-dot--g" />
            </span>
            <span className="caps-ide__title mono">nongdev — Visual Studio Code</span>
          </div>
          {/* tabs */}
          <div className="caps-ide__tabs mono">
            <span className="caps-ide__tab is-active">
              <span className="caps-ide__tab-icon">⚛</span>
              capabilities.ts
              <span className="caps-ide__tab-x">×</span>
            </span>
            <span className="caps-ide__tab">
              <span className="caps-ide__tab-icon">📦</span>
              package.json
            </span>
            <span className="caps-ide__tab">
              <span className="caps-ide__tab-icon">📄</span>
              README.md
            </span>
          </div>
          {/* editor area: gutter + code */}
          <div className="caps-ide__editor">
            <div className="caps-ide__gutter mono" aria-hidden="true">
              {lineNumbers.map((n, idx) => (
                <span key={idx} className="caps-ide__lineno">{n}</span>
              ))}
            </div>
            <div className="caps-ide__code mono">
              <div className="caps-line caps-line--com">// {capabilities.length} modules · 0 hidden dependencies</div>
              <div className="caps-spacer" />
              {capabilities.map((c, i) => {
                const isOpen = openIdx === i
                return (
                  <div key={c.title} className={`caps-block${isOpen ? ' is-open' : ''}`}>
                    <button
                      type="button"
                      className="caps-line caps-line--export"
                      aria-expanded={isOpen}
                      onClick={() => setOpenIdx(isOpen ? null : i)}
                    >
                      <span className="caps-kw">export</span>{' '}
                      <span className="caps-brace">{'{'}</span>{' '}
                      <span className="caps-name">{padModule(c.module)}</span>{' '}
                      <span className="caps-brace">{'}'}</span>{' '}
                      <span className="caps-kw">from</span>{' '}
                      <span className="caps-str">'@nongdev/{c.pkg}'</span>{' '}
                      <span className="caps-com">// {c.title}</span>
                    </button>
                    <div className="caps-detail" style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}>
                      <div className="caps-detail__inner">
                        <p className="caps-detail__desc">→ {c.desc}</p>
                        <div className="caps-detail__tags">
                          {c.tags.map((t) => (
                            <span key={t} className="caps-detail__tag">[{t}]</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
              <div className="caps-spacer" />
            </div>
          </div>
          {/* status bar */}
          <div className="caps-ide__statusbar mono">
            <span className="caps-ide__status-left">
              <span className="caps-ide__status-item">⎇ main</span>
              <span className="caps-ide__status-item">⚙ 0 errors · 0 warnings</span>
            </span>
            <span className="caps-ide__status-right">
              <span className="caps-ide__status-item">Ln {capabilities.length + 2}, Col 1</span>
              <span className="caps-ide__status-item">UTF-8</span>
              <span className="caps-ide__status-item">TypeScript</span>
            </span>
          </div>
        </Reveal>
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
    <section id="reviews" className="section reviews-section">
      <SectionNum num="07" />
      <div className="container-wide">
        <SectionHeader
          label="REVIEWS"
          title="고객 후기"
          desc={'실제로 함께 일한 분들이 남겨주신 후기입니다.\n사람마다 결과는 다를 수 있어요.'}
        />
        <div className="reviews-grid">
          {reviews.map((r, i) => (
            <Reveal as="figure" key={r.id} className="review-card" delay={(i % 3) * 70}>
              <div className="review-stars" aria-label={`별점 ${r.rating}점`}>
                <span className="review-stars__fill">{'★★★★★'.slice(0, r.rating)}</span>
                <span className="review-stars__empty">{'★★★★★'.slice(r.rating)}</span>
              </div>
              <blockquote className="review-quote">&ldquo;{r.content}&rdquo;</blockquote>
              <figcaption className="review-meta">
                <strong>{r.author}</strong>
                <span className="mono">{r.project}</span>
              </figcaption>
            </Reveal>
          ))}
        </div>
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
        [ COSTS: NO HIDDEN ]
      </Sticker>
      <div className="trust-grid-bg" aria-hidden="true" />
      <div className="container-wide">
        <SectionHeader
          label="// OUR PROMISE"
          title="안심하고 맡기세요"
          desc="계약부터 사후 관리까지, 외주에서 불안할 수 있는 부분을 먼저 약속으로 정리했습니다."
          center
        />
        <Reveal className="trust-jest">
          <div className="trust-jest__topbar mono">
            <span className="trust-jest__topbar-prompt">$</span> jest src/promises.test.ts
            <span className="trust-jest__topbar-cursor" />
          </div>
          <div className="trust-jest__head mono">
            <span className="trust-jest__pass">PASS</span>
            <span className="trust-jest__file">src/promises.test.ts</span>
            <span className="trust-jest__time">(0.42s)</span>
          </div>
          <div className="trust-jest__suite mono">
            <div className="trust-jest__describe">
              <span className="trust-jest__describe-arrow">▼</span> Trust contract
            </div>
            <ul className="trust-jest__tests">
              {trust.map((t, i) => (
                <Reveal as="li" key={t.title} className="trust-jest__test" delay={i * 50}>
                  <span className="trust-jest__check">✓</span>
                  <span className="trust-jest__name">{t.title}</span>
                  <span className="trust-jest__duration">({(i + 1) * 2}ms)</span>
                  <div className="trust-jest__desc">{t.desc}</div>
                </Reveal>
              ))}
            </ul>
          </div>
          <div className="trust-jest__footer mono">
            <div className="trust-jest__footer-row">
              <span className="trust-jest__footer-label">Test Suites:</span>
              <span><strong className="trust-jest__pass-text">1 passed</strong>, 1 total</span>
            </div>
            <div className="trust-jest__footer-row">
              <span className="trust-jest__footer-label">Tests:</span>
              <span><strong className="trust-jest__pass-text">{trust.length} passed</strong>, {trust.length} total</span>
            </div>
            <div className="trust-jest__footer-row">
              <span className="trust-jest__footer-label">Snapshots:</span>
              <span>0 total</span>
            </div>
            <div className="trust-jest__footer-row">
              <span className="trust-jest__footer-label">Time:</span>
              <span>0.42s</span>
            </div>
            <div className="trust-jest__footer-msg">Ran all test suites. <span className="trust-jest__success">✓ green</span></div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function ClosingCTA() {
  return (
    <section className="closing-cta">
      <div className="container closing-cta__inner">
        <Reveal>
          <div className="closing-cta__cmd mono">
            <span className="closing-cta__prompt">$</span>
            <span> ./start --project &quot;your idea&quot;</span>
            <span className="closing-cta__cursor" />
          </div>
          <h2>프로젝트, 가볍게 시작해볼까요?</h2>
          <p>간단한 아이디어만 있어도 OK. 가능 여부와 예상 견적을 빠르게 알려드릴게요.</p>
          <div className="hero-actions" style={{ justifyContent: 'center' }}>
            <button className="btn btn-primary btn-lg" onClick={openChannelTalk}>
              ▶ 1:1 상담 시작하기
            </button>
            <Link className="btn btn-outline btn-lg" to="/portfolio">
              <span className="mono">cat</span> 포트폴리오
            </Link>
          </div>
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
