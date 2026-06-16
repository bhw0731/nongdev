import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal.jsx'
import SectionHeader from '../components/SectionHeader.jsx'
import SectionNum from '../components/SectionNum.jsx'
import SectionNav from '../components/SectionNav.jsx'
import ServiceCard from '../components/ServiceCard.jsx'
import WorkCard from '../components/WorkCard.jsx'
import FaqAccordion from '../components/FaqAccordion.jsx'
import Icon from '../components/Icon.jsx'
import useDocumentMeta from '../hooks/useDocumentMeta.js'
import { openChannelTalk } from '../lib/channeltalk.js'
import { profile } from '../data/profile.js'
import { services } from '../data/services.js'
import { process } from '../data/process.js'
import { compareRows } from '../data/whyFullstack.js'
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
              <div className="crt-row"><span className="crt-prompt">$</span> deploy --to production</div>
            </div>
          </div>
        </div>
      </div>

      <div className="scroll-hint mono" aria-hidden="true">
        <span className="scroll-hint__prompt">$</span>
        <span>./scroll --down</span>
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
  { type: 'out', text: '↓ 아래 프롬프트에 직접 명령어를 입력해보세요.' },
  { type: 'out', text: '   예: help · services · portfolio · contact' },
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
          'EST. 2026 · 기획부터 배포까지 한 사람의 손에서.',
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
            {!input && cmds.length === 0 && (
              <span className="intro-term__placeholder mono" aria-hidden="true">
                여기에 입력해보세요 — 예: <strong>help</strong>
              </span>
            )}
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
  return (
    <section id="why" className="section why-section">
      <SectionNum num="03" />
      <div className="container-wide">
        <SectionHeader
          title="왜 풀스택 개발이어야 할까요?"
          desc={'여러 사람을 거치지 않는다는 건 단순히 빠른 게 아닙니다.\n같은 작업, 다른 결과를 만듭니다.'}
          center
        />

        <Reveal as="div" className="why-table">
          <div className="why-meta mono">
            <span className="why-meta__k">SPEC</span>
            <span className="why-meta__rule" aria-hidden="true" />
            <span className="why-meta__v">SAME JOB · DIFFERENT OUTCOME</span>
          </div>

          <div className="why-row why-row--head mono">
            <div className="why-cell why-cell--num">N°</div>
            <div className="why-cell why-cell--label">기준</div>
            <div className="why-cell why-cell--bad">
              <span className="why-col-mark why-col-mark--bad" aria-hidden="true">✗</span>
              <span className="why-col-title">다수 외주 (분업)</span>
            </div>
            <div className="why-cell why-cell--good">
              <span className="why-col-mark why-col-mark--good" aria-hidden="true">✓</span>
              <span className="why-col-title">풀스택 (1인)</span>
            </div>
          </div>

          {compareRows.map((row, i) => {
            const quoted = row.bad.startsWith('"') && row.bad.endsWith('"')
            return (
              <Reveal as="div" key={row.label} className="why-row" delay={i * 60}>
                <div className="why-cell why-cell--num mono">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div className="why-cell why-cell--label">{row.label}</div>
                <div className="why-cell why-cell--bad">
                  {quoted ? (
                    <span className="why-quote">
                      {row.bad.slice(1, -1)}
                    </span>
                  ) : row.bad}
                </div>
                <div className="why-cell why-cell--good">
                  <span className="why-good-val">{row.good}</span>
                </div>
              </Reveal>
            )
          })}

          <div className="why-row why-row--foot mono">
            <div className="why-cell why-cell--num">→</div>
            <div className="why-cell why-cell--label">RESULT</div>
            <div className="why-cell why-cell--bad">시간·비용·신뢰 손실</div>
            <div className="why-cell why-cell--good">
              <span className="why-good-val">한 번에, 명확하게</span>
            </div>
          </div>
        </Reveal>
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

// --- Capabilities: interactive mini-demos ---

function AuthDemo() {
  const [email, setEmail] = useState('')
  const [pw, setPw] = useState('')
  const [done, setDone] = useState(false)
  const submit = (e) => {
    e.preventDefault()
    setDone(true)
    setTimeout(() => { setDone(false); setEmail(''); setPw('') }, 2400)
  }
  return (
    <form className="demo-auth" onSubmit={submit}>
      <label className="demo-label">이메일</label>
      <input type="email" className="demo-input" placeholder="you@example.com"
        value={email} onChange={(e) => setEmail(e.target.value)} disabled={done} />
      <label className="demo-label">비밀번호</label>
      <input type="password" className="demo-input" placeholder="••••••••"
        value={pw} onChange={(e) => setPw(e.target.value)} disabled={done} />
      <button type="submit" className={`demo-btn${done ? ' is-success' : ''}`} disabled={done}>
        {done ? '✓ 로그인 성공' : '로그인'}
      </button>
    </form>
  )
}

function PaymentDemo() {
  const [card, setCard] = useState('')
  const [exp, setExp] = useState('')
  const [cvv, setCvv] = useState('')
  const formatCard = (v) => v.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim()
  const formatExp = (v) => {
    const d = v.replace(/\D/g, '').slice(0, 4)
    return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d
  }
  const brand = (() => {
    const d = card.replace(/\s/g, '')
    if (d.startsWith('4')) return 'VISA'
    if (d.startsWith('5')) return 'MASTER'
    if (d.startsWith('3')) return 'AMEX'
    return ''
  })()
  return (
    <div className="demo-payment">
      <label className="demo-label">카드 번호</label>
      <div className="demo-payment__card">
        <input type="text" className="demo-input demo-input--mono"
          placeholder="0000 0000 0000 0000" value={card}
          onChange={(e) => setCard(formatCard(e.target.value))}
          maxLength={19} inputMode="numeric" />
        {brand && <span className="demo-payment__brand mono">{brand}</span>}
      </div>
      <div className="demo-payment__row">
        <div>
          <label className="demo-label">만료일</label>
          <input type="text" className="demo-input demo-input--mono" placeholder="MM/YY"
            value={exp} onChange={(e) => setExp(formatExp(e.target.value))}
            maxLength={5} inputMode="numeric" />
        </div>
        <div>
          <label className="demo-label">CVV</label>
          <input type="password" className="demo-input demo-input--mono" placeholder="•••"
            value={cvv} onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
            maxLength={3} inputMode="numeric" />
        </div>
      </div>
      <button type="button" className="demo-btn">₩49,000 결제하기</button>
    </div>
  )
}

const CHAT_SCRIPT = [
  { from: 'them', text: '안녕하세요, 쇼핑몰 만들고 싶어요' },
  { from: 'me',   text: '안녕하세요! 어떤 제품 판매하세요?' },
  { from: 'them', text: '의류·악세사리예요. 결제 연동 필수!' },
  { from: 'me',   text: '토스페이먼츠로 가능합니다 ✨' },
]

function ChatDemo() {
  const [shown, setShown] = useState(1)
  const [typing, setTyping] = useState(false)
  const bodyRef = useRef(null)
  useEffect(() => {
    let t
    const advance = () => {
      setShown((s) => {
        const next = s >= CHAT_SCRIPT.length ? 1 : s + 1
        if (next < CHAT_SCRIPT.length) {
          setTyping(true)
          t = setTimeout(() => setTyping(false), 700)
        } else {
          setTyping(false)
        }
        return next
      })
    }
    const id = setInterval(advance, 2400)
    return () => { clearInterval(id); clearTimeout(t) }
  }, [])
  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight
  }, [shown, typing])
  return (
    <div className="demo-chat" ref={bodyRef}>
      {CHAT_SCRIPT.slice(0, shown).map((m, i) => (
        <div key={i} className={`demo-chat__msg demo-chat__msg--${m.from}`}>{m.text}</div>
      ))}
      {typing && (
        <div className="demo-chat__msg demo-chat__msg--them demo-chat__msg--typing" aria-label="typing">
          <span /><span /><span />
        </div>
      )}
    </div>
  )
}

const SEARCH_ITEMS = [
  '쇼핑몰 제작', '랜딩페이지', '관리자 대시보드', '예약 시스템',
  '결제 연동', '회원 관리', '커뮤니티', '리뷰 시스템', '챗봇 연동',
]

function SearchDemo() {
  const [q, setQ] = useState('')
  const query = q.trim()
  const matches = query ? SEARCH_ITEMS.filter((s) => s.includes(query)).slice(0, 5) : []
  return (
    <div className="demo-search">
      <div className="demo-search__field">
        <span className="demo-search__icon" aria-hidden="true">🔍</span>
        <input type="text" className="demo-input"
          placeholder="찾고 있는 기능을 입력해보세요"
          value={q} onChange={(e) => setQ(e.target.value)} />
      </div>
      {matches.length > 0 && (
        <ul className="demo-search__dropdown">
          {matches.map((m) => {
            const idx = m.indexOf(query)
            return (
              <li key={m} className="demo-search__item">
                {m.slice(0, idx)}
                <strong>{m.slice(idx, idx + query.length)}</strong>
                {m.slice(idx + query.length)}
              </li>
            )
          })}
        </ul>
      )}
      {query && matches.length === 0 && (
        <div className="demo-search__empty mono">no results</div>
      )}
      {!query && (
        <p className="demo-search__hint mono">예: "쇼핑", "예약", "회원"</p>
      )}
    </div>
  )
}

const AI_RESPONSES = [
  'Next.js + Tailwind으로 빠르게 구축 가능합니다. 일정 약 2주, 비용 ₩199,000부터.',
  '결제는 토스페이먼츠 / 포트원 추천드려요. 정기 결제·환불 처리까지 함께 만듭니다.',
  'PostgreSQL로 사용자·주문·재고 데이터를 한 번에 설계해드릴 수 있어요.',
]

function AIDemo() {
  const [text, setText] = useState('')
  const [running, setRunning] = useState(false)
  const [idx, setIdx] = useState(0)
  const run = () => {
    if (running) return
    setRunning(true)
    const target = AI_RESPONSES[idx]
    setText('')
    let i = 0
    const tick = () => {
      i++
      setText(target.slice(0, i))
      if (i < target.length) {
        setTimeout(tick, 22)
      } else {
        setRunning(false)
        setIdx((p) => (p + 1) % AI_RESPONSES.length)
      }
    }
    setTimeout(tick, 240)
  }
  return (
    <div className="demo-ai">
      <div className="demo-ai__prompt">
        <span className="demo-ai__prompt-tag mono">PROMPT</span>
        쇼핑몰 만들고 싶은데 추천해줘
      </div>
      <div className="demo-ai__response">
        {text || <span className="demo-ai__placeholder">↓ 클릭하면 AI가 답변을 생성해요</span>}
        {running && <span className="demo-ai__caret" aria-hidden="true" />}
      </div>
      <button type="button" className="demo-btn" onClick={run} disabled={running}>
        {running ? '생성 중…' : '응답 생성'}
      </button>
    </div>
  )
}

const FAKE_FILES = [
  { name: 'product-01.jpg',   size: '1.2 MB', icon: '🖼' },
  { name: 'banner-hero.png',  size: '320 KB', icon: '🖼' },
  { name: 'invoice-2026.pdf', size: '54 KB',  icon: '📄' },
]

function UploadDemo() {
  const [files, setFiles] = useState([])
  const [progress, setProgress] = useState(0)
  const simulate = () => {
    setFiles(FAKE_FILES)
    setProgress(0)
    let p = 0
    const id = setInterval(() => {
      p += 9
      if (p >= 100) { setProgress(100); clearInterval(id) }
      else setProgress(p)
    }, 70)
  }
  return (
    <div className="demo-upload">
      <button type="button" className="demo-upload__zone"
        onClick={simulate}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => { e.preventDefault(); simulate() }}>
        <span className="demo-upload__icon" aria-hidden="true">📁</span>
        <span>파일을 끌어다 놓거나 클릭</span>
      </button>
      {files.length > 0 && (
        <>
          <ul className="demo-upload__list mono">
            {files.map((f, i) => (
              <li key={i}>
                <span>{f.icon} {f.name}</span>
                <span className="demo-upload__size">{f.size}</span>
              </li>
            ))}
          </ul>
          <div className="demo-upload__bar" aria-hidden="true">
            <span style={{ width: `${progress}%` }} />
          </div>
        </>
      )}
    </div>
  )
}

const DEMO_CARDS = [
  { id: 'auth',    cat: 'identity',     title: 'Auth',    sub: '회원가입 · 로그인',   tags: ['NextAuth', 'JWT', 'OAuth'],          Demo: AuthDemo },
  { id: 'payment', cat: 'commerce',     title: 'Payment', sub: '결제 시스템',         tags: ['토스페이먼츠', 'PortOne', 'Stripe'], Demo: PaymentDemo },
  { id: 'chat',    cat: 'realtime',     title: 'Chat',    sub: '실시간 채팅 · 알림',  tags: ['Socket.IO', 'WebSocket', '알림톡'],   Demo: ChatDemo },
  { id: 'search',  cat: 'discovery',    title: 'Search',  sub: '검색 · 자동완성',     tags: ['Algolia', 'Meilisearch', 'PG FTS'],   Demo: SearchDemo },
  { id: 'ai',      cat: 'intelligence', title: 'AI',      sub: 'AI 기능 연동',        tags: ['OpenAI', 'Claude', 'LangChain'],      Demo: AIDemo },
  { id: 'upload',  cat: 'storage',      title: 'Upload',  sub: '파일 · 이미지 업로드', tags: ['S3', 'Cloudinary', 'Resize'],         Demo: UploadDemo },
]

function Capabilities() {
  return (
    <section id="capabilities" className="section caps-section">
      <SectionNum num="05" />
      <div className="container-wide">
        <SectionHeader
          title={'이런 기능들,\n다 만들어드릴 수 있어요'}
          desc={'직접 만져보세요. 입력하거나 클릭하면 실제로 동작합니다.'}
        />
        <div className="demo-grid">
          {DEMO_CARDS.map((d, i) => (
            <Reveal
              as="article"
              key={d.id}
              className="demo-card"
              delay={i * 60}
            >
              <header className="demo-card__head">
                <div className="demo-card__meta mono">
                  <span className="demo-card__num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="demo-card__cat">{d.cat}</span>
                </div>
                <h3 className="demo-card__title">{d.title}</h3>
                <p className="demo-card__sub">{d.sub}</p>
              </header>
              <div className="demo-card__body">
                <d.Demo />
              </div>
              <footer className="demo-card__tags mono">
                {d.tags.join('   ·   ')}
              </footer>
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
