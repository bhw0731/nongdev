import Reveal from './Reveal.jsx'

export default function PageHero({ label, title, desc }) {
  return (
    <section className="page-hero">
      <div className="page-hero__bg" aria-hidden="true" />
      <div className="container-wide">
        <Reveal>
          {label && <span className="section-label">{label}</span>}
          <h1 className="page-hero__title">{title}</h1>
          {desc && <p className="page-hero__desc">{desc}</p>}
        </Reveal>
      </div>
    </section>
  )
}
