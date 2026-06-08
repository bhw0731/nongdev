import { useEffect, useMemo, useRef, useState } from 'react'
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
import { splitFlow, splitStats, fullstackLayers, fullstackStats, benefits } from '../data/whyFullstack.js'
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

const STACK_CHIPS = [
  'React', 'TypeScript', 'Next.js', 'Node.js', 'Python', 'Flutter',
  'PostgreSQL', 'Vercel', 'AWS', 'Docker', 'Figma', 'Git',
]
const NOW_BUILDING = { type: '쇼핑몰 · 풀스택', day: 4, total: 12, note: '결제 연동 작업중' }

function Hero() {
  const [barFilled, setBarFilled] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setBarFilled(true), 400)
    return () => clearTimeout(t)
  }, [])
  const pct = Math.round((NOW_BUILDING.day / NOW_BUILDING.total) * 100)

  return (
    <section className="hero-full">
      <div className="hero-full__bg" />
      <div className="container-wide hero-full__content">
        <div className="hero-bento">
          {/* TITLE — biggest cell */}
          <div className="hero-bento__cell hero-bento__cell--title">
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

          {/* AVAILABILITY */}
          <button
            type="button"
            className="hero-bento__cell hero-bento__cell--avail"
            onClick={openChannelTalk}
          >
            <span className="bento-tag mono">AVAILABILITY</span>
            <div className="bento-avail">
              <span className="bento-avail__dot" aria-hidden="true" />
              <div>
                <div className="bento-avail__big">1 slot</div>
                <div className="bento-avail__sub mono">신규 작업 가능</div>
              </div>
            </div>
            <div className="bento-avail__meta mono">
              평균 응답 <strong>~1시간</strong> · 클릭하면 상담 시작
            </div>
          </button>

          {/* NOW BUILDING */}
          <div className="hero-bento__cell hero-bento__cell--now">
            <span className="bento-tag mono">NOW BUILDING</span>
            <div className="bento-now__head">
              <span className="bento-now__icon" aria-hidden="true">🔨</span>
              <span className="bento-now__type">{NOW_BUILDING.type}</span>
            </div>
            <div className="bento-now__progress mono">
              <span>Day {NOW_BUILDING.day} / {NOW_BUILDING.total}</span>
              <span className="bento-now__pct">{pct}%</span>
            </div>
            <div className="bento-now__bar" aria-hidden="true">
              <span style={{ width: barFilled ? `${pct}%` : '0%' }} />
            </div>
            <div className="bento-now__caption mono">{NOW_BUILDING.note}</div>
          </div>

          {/* STACK */}
          <div className="hero-bento__cell hero-bento__cell--stack">
            <span className="bento-tag mono">STACK</span>
            <div className="bento-stack">
              {STACK_CHIPS.map((t) => (
                <span key={t} className="bento-stack__chip mono">{t}</span>
              ))}
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
        <SectionHeader title={'필요한 결과물,\n바로 만들어드립니다'} />
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
          title="왜 풀스택 개발이어야 할까요?"
          desc={'여러 사람을 거치지 않는다는 건 단순히 빠른 게 아닙니다.\n오해도, 핸드오프 비용도, 책임 분산도 없습니다.'}
          center
        />
        <div className="fs-compare">
          {/* LEFT — 외주 분업의 혼란 */}
          <Reveal as="div" className="fs-col fs-col--bad">
            <div className="fs-col__head">
              <span className="fs-col__mark mono">✗</span>
              <div>
                <div className="fs-col__title">다수 외주 (분업)</div>
                <div className="fs-col__sub mono">multi-vendor handoff</div>
              </div>
            </div>
            <div className="fs-chat">
              <div className="fs-chat__topbar mono">
                <span className="fs-chat__topbar-icon">#</span> project-channel · 4명
              </div>
              <ul className="fs-chat__list">
                {splitFlow.map((m, i) => (
                  <Reveal as="li" key={m.role} className="fs-chat__row" delay={i * 80}>
                    <span className="fs-chat__avatar" data-r={i}>{m.avatar}</span>
                    <div className="fs-chat__body">
                      <div className="fs-chat__meta mono">
                        <span className="fs-chat__role">{m.role}</span>
                        <span className="fs-chat__tag">{m.tag}</span>
                      </div>
                      <div className="fs-chat__msg">
                        {m.msg}
                        {m.waiting && <span className="fs-chat__dots"><span /><span /><span /></span>}
                      </div>
                    </div>
                  </Reveal>
                ))}
              </ul>
            </div>
            <dl className="fs-stat fs-stat--bad mono">
              {splitStats.map((s) => (
                <div key={s.label} className="fs-stat__row">
                  <dt>{s.label}</dt>
                  <dd>{s.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          {/* RIGHT — 풀스택 1인 */}
          <Reveal as="div" className="fs-col fs-col--good" delay={120}>
            <div className="fs-col__head">
              <span className="fs-col__mark mono">✓</span>
              <div>
                <div className="fs-col__title">풀스택 (1인)</div>
                <div className="fs-col__sub mono">nongdev · single owner</div>
              </div>
            </div>
            <div className="fs-stack">
              {fullstackLayers.map((l, i) => (
                <Reveal as="div" key={l.layer} className="fs-stack__layer" delay={i * 80}>
                  <div className="fs-stack__layer-main">
                    <span className="fs-stack__layer-name">{l.layer}</span>
                    <span className="fs-stack__layer-tech mono">{l.tech}</span>
                  </div>
                  <span className="fs-stack__owner mono">
                    <span className="fs-stack__owner-check">✓</span> nongdev
                  </span>
                </Reveal>
              ))}
            </div>
            <dl className="fs-stat fs-stat--good mono">
              {fullstackStats.map((s) => (
                <div key={s.label} className="fs-stat__row">
                  <dt>{s.label}</dt>
                  <dd>{s.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <div className="why-benefits">
          <Reveal className="why-benefits-head">
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
        <SectionHeader title={'아이디어부터\n런칭까지, 네 단계로'} />
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
  const [comment, setComment] = useState('')
  const [revealCount, setRevealCount] = useState(0)
  const [phase, setPhase] = useState('idle')
  const [userInteracted, setUserInteracted] = useState(false)
  const sectionRef = useRef(null)

  const maxLen = useMemo(() => Math.max(...capabilities.map((c) => c.module.length)), [])
  const padModule = (m) => m + ' '.repeat(maxLen - m.length)
  const headerComment = useMemo(
    () => `// ${capabilities.length} modules · 0 hidden dependencies`,
    [],
  )
  const lineNumbers = useMemo(() => {
    const arr = []
    arr.push('1', '2')
    capabilities.forEach((_, i) => arr.push(String(i + 3)))
    arr.push(String(capabilities.length + 3), String(capabilities.length + 4))
    return arr
  }, [])

  // start typing when IDE enters viewport (with delay so Reveal fade-in completes first)
  useEffect(() => {
    const el = sectionRef.current
    let startTimer
    const trigger = () => {
      startTimer = setTimeout(() => {
        setPhase((p) => (p === 'idle' ? 'comment' : p))
      }, 600)
    }
    if (!el) {
      trigger()
      return () => clearTimeout(startTimer)
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            trigger()
            obs.unobserve(el)
          }
        })
      },
      { threshold: 0.2, rootMargin: '0px 0px -60px 0px' },
    )
    obs.observe(el)
    return () => {
      obs.disconnect()
      clearTimeout(startTimer)
    }
  }, [])

  // phase: comment — single-fire animation loop (avoids React rerender issues)
  useEffect(() => {
    if (phase !== 'comment') return
    let cancelled = false
    let i = 0
    let timer
    const tick = () => {
      if (cancelled) return
      if (i < headerComment.length) {
        i++
        setComment(headerComment.slice(0, i))
        timer = setTimeout(tick, 28)
      } else {
        timer = setTimeout(() => {
          if (!cancelled) setPhase('exports')
        }, 280)
      }
    }
    timer = setTimeout(tick, 60)
    return () => {
      cancelled = true
      clearTimeout(timer)
    }
  }, [phase, headerComment])

  // phase: exports — single-fire reveal loop
  useEffect(() => {
    if (phase !== 'exports') return
    let cancelled = false
    let i = 0
    let timer
    const tick = () => {
      if (cancelled) return
      if (i < capabilities.length) {
        i++
        setRevealCount(i)
        timer = setTimeout(tick, 140)
      } else {
        timer = setTimeout(() => {
          if (!cancelled) setPhase('browse')
        }, 400)
      }
    }
    timer = setTimeout(tick, 100)
    return () => {
      cancelled = true
      clearTimeout(timer)
    }
  }, [phase])

  // demo auto-click — open Payment row once (only if user hasn't clicked yet)
  useEffect(() => {
    if (phase !== 'browse' || userInteracted) return
    const t = setTimeout(() => {
      setOpenIdx((cur) => (cur === null ? 1 : cur))
    }, 700)
    return () => clearTimeout(t)
  }, [phase, userInteracted])

  const handleLineClick = (i) => {
    setUserInteracted(true)
    setOpenIdx(openIdx === i ? null : i)
  }

  // status bar position
  let statusLine = 1
  let statusCol = 1
  if (phase === 'comment') {
    statusCol = Math.max(1, comment.length + 1)
  } else if (phase === 'exports') {
    statusLine = 2 + Math.max(1, revealCount)
  } else if (phase !== 'idle') {
    statusLine = capabilities.length + 3
  }

  return (
    <section id="capabilities" className="section caps-section">
      <SectionNum num="05" />
      <div className="container-wide">
        <SectionHeader
          title={'이런 기능들,\n다 만들어드릴 수 있어요'}
          desc={'각 줄을 클릭하면 자세한 설명과 사용 가능한 기술 스택이 펼쳐져요.'}
        />
        <div ref={sectionRef}>
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
                <span
                  key={idx}
                  className={`caps-ide__lineno${parseInt(n, 10) === statusLine ? ' is-active' : ''}`}
                >
                  {n}
                </span>
              ))}
            </div>
            <div className="caps-ide__code mono">
              <div className="caps-line caps-line--com">
                {comment || ' '}
                {phase === 'comment' && <span className="caps-caret" aria-hidden="true" />}
              </div>
              <div className="caps-spacer" />
              {capabilities.map((c, i) => {
                const isRevealed =
                  (phase === 'exports' && i < revealCount) ||
                  phase === 'browse' ||
                  phase === 'done'
                const showCaretHere = phase === 'exports' && i === revealCount - 1
                const isOpen = openIdx === i
                return (
                  <div
                    key={c.title}
                    className={`caps-block${isOpen ? ' is-open' : ''}${isRevealed ? ' is-revealed' : ''}`}
                  >
                    <button
                      type="button"
                      className="caps-line caps-line--export"
                      aria-expanded={isOpen}
                      onClick={() => handleLineClick(i)}
                    >
                      <span className="caps-kw">export</span>{' '}
                      <span className="caps-brace">{'{'}</span>{' '}
                      <span className="caps-name">{padModule(c.module)}</span>{' '}
                      <span className="caps-brace">{'}'}</span>{' '}
                      <span className="caps-kw">from</span>{' '}
                      <span className="caps-str">'@nongdev/{c.pkg}'</span>{' '}
                      <span className="caps-com">// {c.title}</span>
                      {showCaretHere && <span className="caps-caret" aria-hidden="true" />}
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
              {(phase === 'browse' || phase === 'done') && (
                <div className="caps-line caps-line--caret">
                  <span className="caps-caret" aria-hidden="true" />
                </div>
              )}
            </div>
          </div>
          {/* status bar */}
          <div className="caps-ide__statusbar mono">
            <span className="caps-ide__status-left">
              <span className="caps-ide__status-item">⎇ main</span>
              <span className="caps-ide__status-item">⚙ 0 errors · 0 warnings</span>
            </span>
            <span className="caps-ide__status-right">
              <span className="caps-ide__status-item">Ln {statusLine}, Col {statusCol}</span>
              <span className="caps-ide__status-item">UTF-8</span>
              <span className="caps-ide__status-item">TypeScript</span>
            </span>
          </div>
        </Reveal>
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
