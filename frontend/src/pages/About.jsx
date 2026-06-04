import PageHero from '../components/PageHero.jsx'
import Reveal from '../components/Reveal.jsx'
import { Link } from 'react-router-dom'
import useDocumentMeta from '../hooks/useDocumentMeta.js'
import { openChannelTalk } from '../lib/channeltalk.js'
import { profile } from '../data/profile.js'
import './Pages.css'

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
            {profile.skills.map((g, i) => (
              <Reveal key={g.group} className="skill-group" delay={i * 70}>
                <h3 className="skill-group__title mono">{g.group}</h3>
                <div className="skill-tags">
                  {g.items.map((s) => (
                    <span key={s} className="skill-tag">{s}</span>
                  ))}
                </div>
              </Reveal>
            ))}
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
                <span className="timeline-period mono">{c.period}</span>
                <div className="timeline-content">
                  <h3>{c.title}</h3>
                  <p>{c.desc}</p>
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
