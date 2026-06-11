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

const TERM_INITIAL = [
  { type: 'out', text: 'nongdev terminal — v1.0' },
  { type: 'out', text: 'Type "help" to see what you can do.' },
  { type: 'spacer' },
]

function IntroTerminal() {
  const [history, setHistory] = useState(TERM_INITIAL)
  const [input, setInput] = useState('')
  const [cmds, setCmds] = useState([])
  const [cmdIdx, setCmdIdx] = useState(-1)
  const bodyRef = useRef(null)
  const inputRef = useRef(null)

  const append = (entries) => setHistory((h) => [...h, ...entries])

  const runCommand = (raw) => {
    const trimmed = raw.trim()
    const cmd = trimmed.toLowerCase()
    if (trimmed) {
      setCmds((c) => [...c, trimmed])
    }
    setCmdIdx(-1)

    if (!trimmed) {
      append([{ type: 'cmd', text: '' }])
      return
    }
    if (cmd === 'clear' || cmd === 'cls') {
      setHistory([])
      return
    }

    const cmdRow = { type: 'cmd', text: trimmed }
    let output

    switch (cmd) {
      case 'help':
        output = [
          'Available commands:',
          '  help              사용 가능한 명령어',
          '  whoami            nongdev 소개',
          '  services          제공 서비스 + 가격',
          '  portfolio         최근 프로젝트 목록',
          '  stack             사용 기술 스택',
          '  contact           1:1 상담 시작 (ChannelTalk)',
          '  ls                파일 목록',
          '  cat readme.md     README 보기',
          '  clear             터미널 비우기',
          '',
          'tip: ↑/↓ 화살표로 이전 명령어 불러오기',
        ].join('\n')
        break
      case 'whoami':
      case 'about':
        output = [
          'nongdev — 1인 풀스택 개발 스튜디오',
          '2022 — NOW · 외주 50건+ 진행',
          '',
          profile.introDesc,
        ].join('\n')
        break
      case 'services':
      case 'pricing':
        output = [
          'TIER       PRICE      DELIVERY   DESCRIPTION',
          '────────── ────────── ────────── ──────────────────────────',
          ...services.map(
            (s) =>
              `${s.tier.padEnd(10)} ₩${String(s.basePrice.toLocaleString('ko-KR')).padEnd(9)} ${s.period.padEnd(10)} ${s.ko}`,
          ),
          '',
          '→ 자세히: 상단 [SERVICES] 메뉴',
        ].join('\n')
        break
      case 'portfolio':
      case 'works':
        output = [
          'Recent works:',
          ...works.slice(0, 5).map(
            (w, i) => `  ${String(i + 1).padStart(2, '0')}. ${w.name}  —  ${w.category} · ${w.year}`,
          ),
          '',
          '→ 전체 보기: 상단 [PORTFOLIO] 메뉴',
        ].join('\n')
        break
      case 'stack':
      case 'tech':
        output = [
          'Tech stack:',
          ...profile.skills.map((g) => `  ${g.group.padEnd(10)} ${g.items.join(' · ')}`),
        ].join('\n')
        break
      case 'contact':
      case 'chat':
        openChannelTalk()
        output = 'Opening ChannelTalk...\n→ 평균 응답시간 ~1시간'
        break
      case 'ls':
        output = 'README.md   services/    portfolio/   about.md\nstack.json  contact.sh   .secrets'
        break
      case 'cat readme.md':
      case 'cat readme':
      case 'readme':
        output = [
          '# nongdev',
          '',
          '1인 풀스택 개발 스튜디오입니다.',
          '웹·앱·쇼핑몰을 한 사람의 손에서 끝까지 완성합니다.',
          '',
          '## Available',
          '- 신규 작업 1슬롯 · 평균 응답 ~1시간',
          '',
          '## Contact',
          '- ChannelTalk: 우측 하단 채팅',
          '- 또는 "contact" 명령어를 실행하세요',
        ].join('\n')
        break
      case 'cat .secrets':
        output = 'permission denied: 그게 보일 리가...'
        break
      case 'sudo hire nongdev':
        openChannelTalk()
        output = '[sudo] password for nongdev: ********\n✓ Authentication successful.\n→ ChannelTalk으로 채용 협상 시작.'
        break
      case 'echo $brand':
        output = profile.brand
        break
      case 'date':
        output = new Date().toString()
        break
      default:
        output = `nongdev: command not found: ${trimmed}\nType "help" for available commands.`
    }

    const isErr = output.startsWith('nongdev: command') || output.startsWith('permission')
    append([cmdRow, { type: isErr ? 'err' : 'out', text: output }, { type: 'spacer' }])
  }

  const handleKey = (e) => {
    if (e.key === 'Enter') {
      runCommand(input)
      setInput('')
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (cmds.length === 0) return
      const newIdx = cmdIdx === -1 ? cmds.length - 1 : Math.max(0, cmdIdx - 1)
      setCmdIdx(newIdx)
      setInput(cmds[newIdx])
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (cmdIdx === -1) return
      const newIdx = cmdIdx + 1
      if (newIdx >= cmds.length) {
        setCmdIdx(-1)
        setInput('')
      } else {
        setCmdIdx(newIdx)
        setInput(cmds[newIdx])
      }
    } else if (e.key === 'Tab') {
      e.preventDefault()
      const known = ['help', 'whoami', 'services', 'portfolio', 'stack', 'contact', 'ls', 'cat readme.md', 'clear']
      const match = known.find((k) => k.startsWith(input.toLowerCase()) && k !== input.toLowerCase())
      if (match) setInput(match)
    }
  }

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight
  }, [history])

  return (
    <div className="intro-term" onClick={() => inputRef.current?.focus()}>
      <div className="intro-term__head">
        <span className="intro-term__dots">
          <span className="intro-term__dot intro-term__dot--r" />
          <span className="intro-term__dot intro-term__dot--y" />
          <span className="intro-term__dot intro-term__dot--g" />
        </span>
        <span className="intro-term__title mono">guest@nongdev — bash</span>
      </div>
      <div className="intro-term__body mono" ref={bodyRef}>
        {history.map((h, i) => {
          if (h.type === 'cmd') {
            return (
              <div key={i} className="intro-term__row intro-term__row--cmd">
                <span className="intro-term__prompt">guest@nongdev</span>
                <span className="intro-term__sep">:</span>
                <span className="intro-term__path">~</span>
                <span className="intro-term__dollar">$</span>
                <span>{h.text}</span>
              </div>
            )
          }
          if (h.type === 'spacer') return <div key={i} className="intro-term__spacer" />
          return (
            <pre
              key={i}
              className={`intro-term__row intro-term__row--${h.type === 'err' ? 'err' : 'out'}`}
            >
              {h.text}
            </pre>
          )
        })}
        <div className="intro-term__row intro-term__row--input">
          <span className="intro-term__prompt">guest@nongdev</span>
          <span className="intro-term__sep">:</span>
          <span className="intro-term__path">~</span>
          <span className="intro-term__dollar">$</span>
          <span className="intro-term__inputbox">
            <span className="intro-term__typed">{input}</span>
            <span className="intro-term__caret" aria-hidden="true" />
            <input
              ref={inputRef}
              className="intro-term__input mono"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              spellCheck={false}
              autoCapitalize="off"
              autoCorrect="off"
              aria-label="terminal input"
            />
          </span>
        </div>
      </div>
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
          <p className="intro-tip mono">
            → 우측 터미널에 직접 입력해보세요. <code>help</code> 로 시작.
          </p>
          <div className="intro-techs">
            {profile.techs.map((t) => (
              <span key={t} className="intro-tech-badge">{t}</span>
            ))}
          </div>
        </Reveal>
        <Reveal className="intro-right" delay={150}>
          <IntroTerminal />
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
  const totalSteps = Math.max(splitFlow.length, fullstackLayers.length)
  const [step, setStep] = useState(0)
  const [typingIdx, setTypingIdx] = useState(-1)
  const sectionRef = useRef(null)

  useEffect(() => {
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setStep(totalSteps)
      setTypingIdx(-1)
      return
    }
    const el = sectionRef.current
    if (!el) {
      setStep(totalSteps)
      return
    }
    let cancelled = false
    let triggered = false
    let timer

    const playStep = (i) => {
      if (cancelled || i >= totalSteps) return
      setTypingIdx(i)
      timer = setTimeout(() => {
        if (cancelled) return
        setTypingIdx(-1)
        setStep(i + 1)
        timer = setTimeout(() => playStep(i + 1), 320)
      }, 480)
    }

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !triggered) {
            triggered = true
            obs.unobserve(el)
            timer = setTimeout(() => playStep(0), 450)
          }
        })
      },
      { threshold: 0.18, rootMargin: '0px 0px -50px 0px' },
    )
    obs.observe(el)
    return () => {
      cancelled = true
      obs.disconnect()
      clearTimeout(timer)
    }
  }, [totalSteps])

  const railScale = Math.min(1, step / totalSteps)

  return (
    <section id="why" className="section why-section" ref={sectionRef}>
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
                {splitFlow.map((m, i) => {
                  const shown = i < step
                  const typing = i === typingIdx
                  if (!shown && !typing) return null
                  return (
                    <li
                      key={m.role}
                      className={`fs-chat__row${typing ? ' is-typing' : ''}${shown ? ' is-shown' : ''}`}
                    >
                      <span className="fs-chat__avatar" data-r={i}>{m.avatar}</span>
                      <div className="fs-chat__body">
                        <div className="fs-chat__meta mono">
                          <span className="fs-chat__role">{m.role}</span>
                          <span className="fs-chat__tag">{m.tag}</span>
                        </div>
                        <div className="fs-chat__msg">
                          {typing ? (
                            <span className="fs-chat__dots fs-chat__dots--big">
                              <span /><span /><span />
                            </span>
                          ) : (
                            <>
                              {m.msg}
                              {m.waiting && (
                                <span className="fs-chat__dots">
                                  <span /><span /><span />
                                </span>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    </li>
                  )
                })}
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
            <div className="fs-stack" style={{ '--rail-scale': railScale }}>
              {fullstackLayers.map((l, i) => {
                if (i >= step) return null
                return (
                  <div key={l.layer} className="fs-stack__layer">
                    <div className="fs-stack__layer-main">
                      <span className="fs-stack__layer-name">{l.layer}</span>
                      <span className="fs-stack__layer-tech mono">{l.tech}</span>
                    </div>
                    <span className="fs-stack__owner mono">
                      <span className="fs-stack__owner-check">✓</span> nongdev
                    </span>
                  </div>
                )
              })}
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

const PKG_JSON_LINES = [
  '{',
  '  "name": "@nongdev/portfolio",',
  '  "version": "1.0.0",',
  '  "description": "1인 풀스택 개발 스튜디오 — 기획부터 배포까지",',
  '  "author": "nongdev <bhw0731@gmail.com>",',
  '  "tiers": ["STANDARD", "DELUXE", "PREMIUM"],',
  '  "scripts": {',
  '    "consult":   "channeltalk open",',
  '    "build":     "design + code + deploy",',
  '    "deliver":   "one developer, end-to-end"',
  '  },',
  '  "stack": {',
  '    "frontend": ["React", "TypeScript", "Next.js"],',
  '    "backend":  ["Node.js", "Express", "PostgreSQL"],',
  '    "mobile":   ["React Native", "Flutter"],',
  '    "infra":    ["Vercel", "AWS", "Docker"]',
  '  },',
  '  "availability": "1 slot",',
  '  "responseTime": "~1h",',
  '  "license": "MIT"',
  '}',
]

const README_LINES = [
  '# nongdev',
  '',
  '> 1인 풀스택 개발 스튜디오',
  '> 기획부터 배포까지 한 사람의 손에서.',
  '',
  '## What I build',
  '',
  '- 웹사이트 · 랜딩페이지',
  '- 쇼핑몰 (커머스)',
  '- 웹앱 · 관리자 시스템',
  '- 모바일 앱 (React Native / Flutter)',
  '',
  '## Why fullstack',
  '',
  '여러 외주를 거치지 않고 한 사람과만 소통하면 됩니다.',
  '',
  '- 커뮤니케이션 비용 0',
  '- 책임 소재 명확',
  '- 즉시 반영 가능',
  '- 전체 맥락 이해',
  '',
  '## How it works',
  '',
  '1. ChannelTalk으로 1:1 상담',
  '2. 요구사항 정리 (24h 이내)',
  '3. 패키지 선택 (`STANDARD` / `DELUXE` / `PREMIUM`)',
  '4. 시안 → 수정 → 최종 전달',
  '5. 배포 & 안정화',
  '',
  '## Contact',
  '',
  '- ChannelTalk: 우측 하단 채팅',
  '- 평균 응답: 1시간 이내',
]

function tokenizeJson(line) {
  const tokens = []
  let i = 0
  while (i < line.length) {
    const c = line[i]
    if (c === '"') {
      let j = i + 1
      while (j < line.length) {
        if (line[j] === '\\') { j += 2; continue }
        if (line[j] === '"') break
        j++
      }
      const str = line.slice(i, j + 1)
      let k = j + 1
      while (k < line.length && /\s/.test(line[k])) k++
      tokens.push({ type: line[k] === ':' ? 'key' : 'str', value: str })
      i = j + 1
    } else if (/\d/.test(c) || (c === '-' && /\d/.test(line[i + 1] || ''))) {
      let j = i + 1
      while (j < line.length && /[\d.]/.test(line[j])) j++
      tokens.push({ type: 'num', value: line.slice(i, j) })
      i = j
    } else if (/[a-z]/i.test(c)) {
      let j = i + 1
      while (j < line.length && /[a-z]/i.test(line[j])) j++
      const word = line.slice(i, j)
      tokens.push({
        type: (word === 'true' || word === 'false' || word === 'null') ? 'bool' : 'text',
        value: word,
      })
      i = j
    } else {
      let j = i + 1
      while (
        j < line.length &&
        line[j] !== '"' &&
        !/[\da-z]/i.test(line[j]) &&
        !(line[j] === '-' && /\d/.test(line[j + 1] || ''))
      ) j++
      tokens.push({ type: 'text', value: line.slice(i, j) })
      i = j
    }
  }
  return tokens
}

function renderJsonLine(line) {
  if (!line) return ' '
  return tokenizeJson(line).map((t, i) =>
    t.type === 'text'
      ? <span key={i}>{t.value}</span>
      : <span key={i} className={`jstk-${t.type}`}>{t.value}</span>
  )
}

function renderInlineMd(text, keyBase) {
  const parts = text.split(/(`[^`]+`)/g)
  return parts.map((p, i) => {
    const k = `${keyBase}-${i}`
    if (p.length >= 2 && p.startsWith('`') && p.endsWith('`')) {
      return <span key={k} className="mdtk-code">{p.slice(1, -1)}</span>
    }
    return <span key={k}>{p}</span>
  })
}

function renderMarkdownLine(line, idx) {
  if (!line) return ' '
  if (line.startsWith('### ')) return <span className="mdtk-h3">{line}</span>
  if (line.startsWith('## ')) return <span className="mdtk-h2">{line}</span>
  if (line.startsWith('# ')) return <span className="mdtk-h1">{line}</span>
  if (line.startsWith('> ')) return <span className="mdtk-quote">{line}</span>
  if (line.startsWith('- ') || line.startsWith('* ')) {
    return (
      <>
        <span className="mdtk-bullet">{line.slice(0, 2)}</span>
        {renderInlineMd(line.slice(2), idx)}
      </>
    )
  }
  const olMatch = line.match(/^(\d+\. )/)
  if (olMatch) {
    return (
      <>
        <span className="mdtk-bullet">{olMatch[1]}</span>
        {renderInlineMd(line.slice(olMatch[1].length), idx)}
      </>
    )
  }
  return renderInlineMd(line, idx)
}

function Capabilities() {
  const [activeTab, setActiveTab] = useState('caps')
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
    if (activeTab === 'package') return PKG_JSON_LINES.map((_, i) => String(i + 1))
    if (activeTab === 'readme') return README_LINES.map((_, i) => String(i + 1))
    const arr = []
    arr.push('1', '2')
    capabilities.forEach((_, i) => arr.push(String(i + 3)))
    arr.push(String(capabilities.length + 3), String(capabilities.length + 4))
    return arr
  }, [activeTab])

  const TAB_LANG = { caps: 'TypeScript', package: 'JSON', readme: 'Markdown' }

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
  if (activeTab === 'caps') {
    if (phase === 'comment') {
      statusCol = Math.max(1, comment.length + 1)
    } else if (phase === 'exports') {
      statusLine = 2 + Math.max(1, revealCount)
    } else if (phase !== 'idle') {
      statusLine = capabilities.length + 4
    }
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
            {[
              { id: 'caps', icon: '⚛', name: 'capabilities.ts' },
              { id: 'package', icon: '📦', name: 'package.json' },
              { id: 'readme', icon: '📄', name: 'README.md' },
            ].map((t) => (
              <button
                key={t.id}
                type="button"
                className={`caps-ide__tab${activeTab === t.id ? ' is-active' : ''}`}
                onClick={() => setActiveTab(t.id)}
              >
                <span className="caps-ide__tab-icon">{t.icon}</span>
                {t.name}
                {activeTab === t.id && <span className="caps-ide__tab-x" aria-hidden="true">×</span>}
              </button>
            ))}
          </div>
          {/* editor area: gutter + code */}
          <div className="caps-ide__editor">
            <div className="caps-ide__gutter mono" aria-hidden="true">
              {lineNumbers.map((n, idx) => (
                <span
                  key={idx}
                  className={`caps-ide__lineno${activeTab === 'caps' && parseInt(n, 10) === statusLine ? ' is-active' : ''}`}
                >
                  {n}
                </span>
              ))}
            </div>
            <div className="caps-ide__code mono">
              {activeTab === 'caps' && (
              <>
              <div className="caps-line caps-line--com">
                {comment || ' '}
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
              </>
              )}
              {activeTab === 'package' && (
                <div className="caps-ide__plain">
                  {PKG_JSON_LINES.map((line, i) => (
                    <div key={i} className="caps-line">{renderJsonLine(line)}</div>
                  ))}
                </div>
              )}
              {activeTab === 'readme' && (
                <div className="caps-ide__plain">
                  {README_LINES.map((line, i) => (
                    <div key={i} className="caps-line">{renderMarkdownLine(line, i)}</div>
                  ))}
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
              <span className="caps-ide__status-item">{TAB_LANG[activeTab]}</span>
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

function FaqSection() {
  return (
    <section id="faq" className="section faq-section">
      <SectionNum num="07" />
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
      <SectionNum num="08" />
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
      <FaqSection />
      <Trust />
      <ClosingCTA />
    </div>
  )
}
