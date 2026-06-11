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

// 기술 → { Icon, color } 매핑. 다크모드에서 안 보이는 검정 계열은 currentColor 사용.
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

      <section className="section section-soft">
        <div className="container-wide">
          <Reveal className="section-header">
            <span className="section-label">SKILLS</span>
            <h2 className="section-title">기술 스택</h2>
          </Reveal>
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

      <section className="section">
        <div className="container-wide">
          <Reveal className="section-header">
            <span className="section-label">CAREER</span>
            <h2 className="section-title">경력</h2>
          </Reveal>
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
