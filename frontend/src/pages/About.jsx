import PageHero from '../components/PageHero.jsx'
import Reveal from '../components/Reveal.jsx'
import { Link } from 'react-router-dom'
import useDocumentMeta from '../hooks/useDocumentMeta.js'
import { openChannelTalk } from '../lib/channeltalk.js'
import { profile } from '../data/profile.js'
import {
  SiReact, SiNextdotjs, SiVuedotjs, SiTypescript, SiTailwindcss, SiThreedotjs,
  SiNodedotjs, SiExpress, SiPython, SiMysql, SiPostgresql, SiMongodb,
  SiFlutter, SiVercel, SiDocker, SiGithubactions,
} from 'react-icons/si'
import { FaAws } from 'react-icons/fa'
import { FiCode, FiLayers, FiSmartphone, FiServer, FiBriefcase, FiCalendar } from 'react-icons/fi'
import './Pages.css'

const TECH = {
  React:          { Icon: SiReact,         color: '#61DAFB' },
  'Next.js':      { Icon: SiNextdotjs,     color: 'currentColor' },
  Vue:            { Icon: SiVuedotjs,      color: '#4FC08D' },
  TypeScript:     { Icon: SiTypescript,    color: '#3178C6' },
  'Tailwind CSS': { Icon: SiTailwindcss,   color: '#06B6D4' },
  'Three.js':     { Icon: SiThreedotjs,    color: 'currentColor' },
  'Node.js':      { Icon: SiNodedotjs,     color: '#5FA04E' },
  Express:        { Icon: SiExpress,       color: 'currentColor' },
  Python:         { Icon: SiPython,        color: '#3776AB' },
  MySQL:          { Icon: SiMysql,         color: '#4479A1' },
  PostgreSQL:     { Icon: SiPostgresql,    color: '#4169E1' },
  MongoDB:        { Icon: SiMongodb,       color: '#47A248' },
  'React Native': { Icon: SiReact,         color: '#61DAFB' },
  Flutter:        { Icon: SiFlutter,       color: '#02569B' },
  AWS:            { Icon: FaAws,           color: '#FF9900' },
  Vercel:         { Icon: SiVercel,        color: 'currentColor' },
  Docker:         { Icon: SiDocker,        color: '#2496ED' },
  'CI/CD':        { Icon: SiGithubactions, color: '#2088FF' },
}

const GROUP_ICON = {
  FRONTEND: FiLayers,
  BACKEND:  FiServer,
  MOBILE:   FiSmartphone,
  INFRA:    FiCode,
}

const STATS = [
  { num: '18+',  label: 'TECHS' },
  { num: '4',    label: 'DOMAINS' },
  { num: '~1H',  label: 'RESPONSE' },
  { num: '1',    label: 'OWNER' },
]

const PRINCIPLES = [
  {
    num: '01',
    title: '솔직한 견적',
    desc: '작업 시작 전 모든 비용과 일정을 명확히 합의합니다. 진행 중 깜짝 청구 없이.',
  },
  {
    num: '02',
    title: '인수 가능한 코드',
    desc: '6개월 뒤 본인이 보거나 다른 개발자가 이어받아도 막힘없이 동작하도록 작성합니다.',
  },
  {
    num: '03',
    title: '신뢰가 먼저',
    desc: '한 번의 큰 거래보다, 다시 찾아올 수 있는 관계를 우선합니다.',
  },
]

function SectionHead({ num, label, rule = true }) {
  return (
    <div className="about-head mono">
      <span className="about-head__num">{num}</span>
      <span className="about-head__label">{label}</span>
      {rule && <span className="about-head__rule" aria-hidden="true" />}
    </div>
  )
}

export default function About() {
  useDocumentMeta(
    '소개 | nongdev',
    'nongdev 소개·보유 기술·경력. 기획부터 배포까지 한 사람의 손에서 일관되게 책임지는 1인 개발 스튜디오입니다.',
  )

  return (
    <>
      <PageHero
        label="ABOUT"
        title="아이디어를 현실로 만드는 개발 파트너"
        desc={profile.introDesc}
      />

      {/* §01 — INTRODUCTION */}
      <section className="section">
        <div className="container-wide">
          <SectionHead num="01" label="INTRODUCTION" />
          <h2 className="about-title">한 사람이 끝까지</h2>

          <Reveal className="about-bio">
            <p className="about-bio__paragraph">
              여러 회사와 프로젝트를 거치며 한 가지를 깨달았습니다.
              작은 사이트 하나도 결국 디자이너 → 퍼블리셔 → 프론트 → 백엔드 → 배포까지
              여러 단계를 거치는 동안 의도가 흐릿해진다는 것.
              처음부터 끝까지 한 사람이 잡으면 더 빠르고, 더 정확하고,
              더 솔직하게 만들 수 있다는 가정에서 nongdev를 시작했습니다.
            </p>
            <blockquote className="about-bio__quote">
              <span className="about-bio__quote-text">
                복잡한 과정 없이, 결과물로 말합니다.
              </span>
              <cite className="about-bio__quote-cite mono">— nongdev</cite>
            </blockquote>
          </Reveal>

          <Reveal as="dl" className="about-stats mono" delay={120}>
            {STATS.map((s) => (
              <div key={s.label} className="about-stats__row">
                <dt className="about-stats__num">{s.num}</dt>
                <dd className="about-stats__label">{s.label}</dd>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* §02 — SKILLS */}
      <section className="section section-soft">
        <div className="container-wide">
          <SectionHead num="02" label="SKILLS" />
          <h2 className="about-title">기술 스택</h2>

          <div className="skill-groups">
            {profile.skills.map((g, i) => {
              const GroupIcon = GROUP_ICON[g.group] || FiCode
              return (
                <Reveal key={g.group} className="skill-group" delay={i * 70}>
                  <div className="skill-group__head">
                    <GroupIcon className="skill-group__head-icon" aria-hidden="true" />
                    <h3 className="skill-group__title mono">{g.group}</h3>
                  </div>
                  <div className="skill-grid">
                    {g.items.map((s) => {
                      const tech = TECH[s]
                      return (
                        <div key={s} className="skill-chip">
                          {tech?.Icon ? (
                            <tech.Icon
                              className="skill-chip__icon"
                              style={{ color: tech.color }}
                              aria-hidden="true"
                            />
                          ) : (
                            <span className="skill-chip__icon skill-chip__icon--dot" aria-hidden="true" />
                          )}
                          <span className="skill-chip__label">{s}</span>
                        </div>
                      )
                    })}
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* §03 — PRINCIPLES */}
      <section className="section">
        <div className="container-wide">
          <SectionHead num="03" label="PRINCIPLES" />
          <h2 className="about-title">일하는 원칙</h2>

          <div className="about-principles">
            {PRINCIPLES.map((p, i) => (
              <Reveal as="article" key={p.num} className="about-principle" delay={i * 80}>
                <span className="about-principle__num mono">{p.num}</span>
                <h3 className="about-principle__title">{p.title}</h3>
                <p className="about-principle__desc">{p.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* §04 — CAREER */}
      <section className="section section-soft">
        <div className="container-wide">
          <SectionHead num="04" label="CAREER" />
          <h2 className="about-title">경력</h2>

          <div className="timeline">
            {profile.career.map((c, i) => (
              <Reveal as="div" key={i} className="timeline-item" delay={i * 80}>
                <div className="timeline-marker" aria-hidden="true">
                  <FiBriefcase />
                </div>
                <div className="timeline-body">
                  <div className="timeline-meta mono">
                    <FiCalendar className="timeline-meta__icon" aria-hidden="true" />
                    <span className="timeline-period">{c.period}</span>
                  </div>
                  <h3 className="timeline-title">{c.title}</h3>
                  <p className="timeline-desc">{c.desc}</p>
                </div>
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
