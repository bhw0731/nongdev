import Reveal from './Reveal.jsx'

export default function SectionHeader({ label, title, desc, center = false }) {
  return (
    <Reveal className={`section-header${center ? ' section-header--center' : ''}`}>
      {label && <span className="section-label">{label}</span>}
      <h2 className="section-title">{title}</h2>
      {desc && <p className="section-desc">{desc}</p>}
    </Reveal>
  )
}
