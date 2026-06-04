import { useState } from 'react'
import Reveal from './Reveal.jsx'

export default function FaqAccordion({ items }) {
  const [open, setOpen] = useState(0)

  return (
    <div className="faq-list">
      {items.map((item, i) => {
        const isOpen = open === i
        return (
          <Reveal
            key={i}
            delay={i * 50}
            className={`faq-item${isOpen ? ' faq-item--open' : ''}`}
          >
            <button
              type="button"
              className="faq-q"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? -1 : i)}
            >
              <span className="faq-q-num mono">Q{String(i + 1).padStart(2, '0')}</span>
              <span className="faq-q-text">{item.q}</span>
              <span className="faq-q-icon">
                <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
              </span>
            </button>
            <div className="faq-a-wrap" style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}>
              <div className="faq-a-inner">
                <p className="faq-a">{item.a}</p>
              </div>
            </div>
          </Reveal>
        )
      })}
    </div>
  )
}
