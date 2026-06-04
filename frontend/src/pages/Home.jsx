import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal.jsx'
import SectionNum from '../components/SectionNum.jsx'
import SectionNav from '../components/SectionNav.jsx'
import useDocumentMeta from '../hooks/useDocumentMeta.js'
import { openChannelTalk } from '../lib/channeltalk.js'
import { works } from '../data/works.js'
import { reviews } from '../data/reviews.js'
import './Home.css'

/* ---------- MARQUEE (유지 — 시각 휴식) ---------- */
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

/* ---------- ARCADE HERO ---------- */
function ArcadeHero() {
  return (
    <section id="start" className="arcade-hero">
      <div className="scanlines" aria-hidden="true" />
      <div className="container-wide arcade-hero__inner">
        <span className="arcade-hero__file mono">// NONGDEV.EXE</span>
        <h1 className="arcade-hero__brand">
          nong<span className="navbar-logo-accent">dev</span>
          <span className="navbar-logo-caret">_</span>
        </h1>
        <p className="arcade-hero__sub mono">&gt;&gt; SELECT YOUR PROJECT</p>
        <p className="arcade-hero__desc">
          기획부터 배포까지, 한 사람의 손에서 끝까지.
          <br />
          웹·앱·쇼핑몰을 제대로 작동하는 제품으로.
        </p>
        <button className="btn btn-primary btn-lg insert-coin" onClick={openChannelTalk}>
          <span className="insert-coin__cursor">▶</span> INSERT COIN — 1:1 상담
        </button>
      </div>
      <div className="scroll-down mono" aria-hidden="true">
        SCROLL ↓
      </div>
    </section>
  )
}

/* ---------- STAGE CARD ---------- */
function StageCard({ work, index }) {
  return (
    <Link to={`/portfolio/${work.id}`} className="stage-card">
      <div className="stage-card__bar">
        <span className="stage-card__num mono">STAGE {String(index + 1).padStart(2, '0')}</span>
        <span className="stage-card__cat mono">{work.category}</span>
      </div>
      <div className="stage-card__image">
        <img src={work.image} alt={work.name} loading="lazy" decoding="async" />
        <div className="stage-card__overlay">
          <span className="mono">▶ LOAD</span>
        </div>
      </div>
      <div className="stage-card__meta">
        <h3 className="stage-card__title">{work.name}</h3>
        <p className="stage-card__client mono">{work.client}</p>
      </div>
    </Link>
  )
}

function StageCardSoon() {
  return (
    <div className="stage-card stage-card--soon" aria-hidden="true">
      <div className="stage-card__bar">
        <span className="stage-card__num mono">STAGE ??</span>
        <span className="stage-card__cat mono">???</span>
      </div>
      <div className="stage-card__image stage-card__image--soon">
        <span className="mono blink">
          NEW STAGE
          <br />
          LOADING...
        </span>
      </div>
      <div className="stage-card__meta">
        <h3 className="stage-card__title mono">??? ???</h3>
        <p className="stage-card__client mono">[ CLASSIFIED ]</p>
      </div>
    </div>
  )
}

function StageSelect() {
  return (
    <section id="stages" className="section stage-select">
      <SectionNum num="02" />
      <div className="container-wide">
        <div className="arcade-section-head">
          <span className="section-label">STAGE SELECT</span>
          <h2 className="section-title">▶ 어떤 스테이지부터 볼까요?</h2>
          <p className="section-desc">
            실제로 진행한 프로젝트들. 클릭하면 상세 정보가 열려요.
          </p>
        </div>
        <div className="stage-grid">
          {works.map((w, i) => (
            <Reveal key={w.id} delay={(i % 3) * 70}>
              <StageCard work={w} index={i} />
            </Reveal>
          ))}
          <Reveal delay={(works.length % 3) * 70}>
            <StageCardSoon />
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ---------- HIGH SCORES (Reviews) ---------- */
function HighScores() {
  return (
    <section id="scores" className="section high-scores">
      <SectionNum num="03" />
      <div className="container-wide">
        <div className="arcade-section-head">
          <span className="section-label">HIGH SCORES</span>
          <h2 className="section-title">고객 후기</h2>
          <p className="section-desc">
            실제로 함께 일한 분들의 한 줄 평. 사람마다 결과는 다를 수 있어요.
          </p>
        </div>
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
                  <td className="hs-score">{'★'.repeat(r.rating)}</td>
                  <td className="hs-player">{r.author}</td>
                  <td className="hs-comment">"{r.content}"</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
      </div>
    </section>
  )
}

/* ---------- PLAYER 2 JOIN (Closing CTA) ---------- */
function PlayerTwoJoin() {
  return (
    <section id="join" className="player-two">
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
    '기획부터 배포까지 끝까지 책임지는 1인 개발 스튜디오 nongdev. 웹·앱·쇼핑몰을 제대로 작동하는 제품으로.',
  )
  return (
    <div className="home">
      <SectionNav />
      <ArcadeHero />
      <Marquee />
      <StageSelect />
      <HighScores />
      <PlayerTwoJoin />
    </div>
  )
}
