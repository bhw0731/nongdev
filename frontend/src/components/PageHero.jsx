import Reveal from './Reveal.jsx'

export default function PageHero({ label, title, desc }) {
  return (
    <section className="page-hero">
      <div className="page-hero__bg" aria-hidden="true" />
      <div className="container-wide">
        <div className="page-hero__strip mono">
          <span className="page-hero__brand">nongdev studio_</span>
          <span className="page-hero__year">© EST. 2026</span>
        </div>
        <Reveal>
          {label && (
            <div className="page-hero__label-row mono">
              <span className="page-hero__label-mark" aria-hidden="true">§</span>
              <span className="page-hero__label-text">{label}</span>
              <span className="page-hero__label-rule" aria-hidden="true" />
            </div>
          )}
          <h1 className="page-hero__title">{title}</h1>
          {desc && <p className="page-hero__desc">{desc}</p>}
        </Reveal>
      </div>
    </section>
  )
}
