import { useState } from 'react'
import Reveal from './Reveal.jsx'

export default function FaqAccordion({ items }) {
  const [open, setOpen] = useState(0)

  return (
    <div className="faq-md">
      <div className="faq-md__head">
        <span className="faq-md__dots">
          <span className="faq-md__dot faq-md__dot--r" />
          <span className="faq-md__dot faq-md__dot--y" />
          <span className="faq-md__dot faq-md__dot--g" />
        </span>
        <span className="faq-md__file mono">
          nongdev/faq.md
          <span className="faq-md__file-meta"> · {items.length} questions</span>
        </span>
      </div>
      <div className="faq-md__body mono">
        {items.map((item, i) => {
          const isOpen = open === i
          return (
            <Reveal key={i} delay={i * 40} className={`faq-md__item${isOpen ? ' is-open' : ''}`}>
              <button
                type="button"
                className="faq-md__q"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? -1 : i)}
              >
                <span className="faq-md__hash">#</span>
                <span className="faq-md__qid">Q{String(i + 1).padStart(2, '0')}</span>
                <span className="faq-md__sep">·</span>
                <span className="faq-md__qtext">{item.q}</span>
                <span className="faq-md__toggle" aria-hidden="true">
                  {isOpen ? '[ - ]' : '[ + ]'}
                </span>
              </button>
              <div className="faq-md__a-wrap" style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}>
                <div className="faq-md__a-inner">
                  <p className="faq-md__a">
                    <span className="faq-md__gt">&gt;</span>
                    <span className="faq-md__atext">{item.a}</span>
                  </p>
                </div>
              </div>
            </Reveal>
          )
        })}
      </div>
    </div>
  )
}
