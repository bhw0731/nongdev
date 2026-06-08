import { useState, useMemo } from 'react'
import { openChannelTalk } from '../lib/channeltalk.js'

// 옵션 기본값으로 초기화
function initFromDefaults(config) {
  const state = {}
  for (const opt of config.options) {
    state[opt.id] = opt.default
  }
  return state
}

// 천 단위 콤마
const fmt = (n) => n.toLocaleString('ko-KR')

// 옵션 값 → 가격·기간·라벨 산출
function computeBreakdown(config, state) {
  const lines = []
  let total = config.basePrice
  let weeksAdded = 0

  lines.push({ label: 'base', amount: config.basePrice, isBase: true })

  for (const opt of config.options) {
    const val = state[opt.id]
    if (opt.type === 'choice') {
      const choice = opt.choices.find((c) => c.value === val)
      if (choice && choice.delta > 0) {
        lines.push({
          label: `${opt.label}: ${choice.label}`,
          amount: choice.delta,
        })
        total += choice.delta
        weeksAdded += choice.weeks
      }
    } else if (opt.type === 'toggle' && val) {
      lines.push({ label: opt.label, amount: opt.delta })
      total += opt.delta
      weeksAdded += opt.weeks
    }
  }

  const periodMin = config.basePeriodWeeks.min + weeksAdded
  const periodMax = config.basePeriodWeeks.max + weeksAdded

  return { lines, total, periodMin, periodMax }
}

// 견적 요약을 채팅에 보낼 텍스트로 변환
function buildSummaryText(service, state, breakdown) {
  const lines = [`📦 ${service.ko} 견적 요청`, '─'.repeat(30)]
  for (const opt of service.config.options) {
    const v = state[opt.id]
    if (opt.type === 'choice') {
      const c = opt.choices.find((x) => x.value === v)
      if (c) lines.push(`· ${opt.label}: ${c.label}`)
    } else if (opt.type === 'toggle' && v) {
      lines.push(`· ${opt.label}: 포함`)
    }
  }
  lines.push('─'.repeat(30))
  lines.push(`총액: ${fmt(breakdown.total)}원 (기준)`)
  lines.push(`예상 기간: ${breakdown.periodMin}~${breakdown.periodMax}주`)
  lines.push('')
  lines.push('이 견적으로 상담 부탁드립니다 🙏')
  return lines.join('\n')
}

export default function QuoteBuilder({ service }) {
  const config = service.config
  const [state, setState] = useState(() => initFromDefaults(config))
  const [openTip, setOpenTip] = useState(null)
  const [copied, setCopied] = useState(false)

  const breakdown = useMemo(() => computeBreakdown(config, state), [config, state])

  const updateOpt = (id, val) => setState((s) => ({ ...s, [id]: val }))

  const applyPreset = (preset) => {
    const base = initFromDefaults(config)
    setState({ ...base, ...config.presets[preset] })
  }

  const summaryText = buildSummaryText(service, state, breakdown)

  const onChat = async () => {
    try {
      await navigator.clipboard.writeText(summaryText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (e) {
      // 클립보드 실패 시도 무시
    }
    openChannelTalk()
  }

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(summaryText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (e) {}
  }

  return (
    <div className="qb">
      <div className="qb__head mono">
        <span className="qb__head-dots">
          <span className="qb__head-dot qb__head-dot--r" />
          <span className="qb__head-dot qb__head-dot--y" />
          <span className="qb__head-dot qb__head-dot--g" />
        </span>
        <span className="qb__head-file">{service.id}/quote.config</span>
      </div>

      <div className="qb__presets">
        <span className="qb__presets-label mono">▶ 처음이세요? 추천 프리셋:</span>
        <button type="button" className="qb__preset" onClick={() => applyPreset('minimal')}>
          🚀 최소
        </button>
        <button type="button" className="qb__preset qb__preset--reco" onClick={() => applyPreset('recommended')}>
          ⭐ 추천
        </button>
        <button type="button" className="qb__preset" onClick={() => applyPreset('premium')}>
          💎 프리미엄
        </button>
      </div>

      <div className="qb__grid">
        {/* LEFT: options */}
        <div className="qb__options">
          {config.options.map((opt) => (
            <div key={opt.id} className="qb__opt">
              <div className="qb__opt-head">
                <span className="qb__opt-label">{opt.label}</span>
                <button
                  type="button"
                  className="qb__opt-info"
                  onClick={() => setOpenTip(openTip === opt.id ? null : opt.id)}
                  aria-label={`${opt.label} 설명`}
                >
                  ⓘ
                </button>
                {opt.type === 'toggle' && opt.delta > 0 && (
                  <span className="qb__opt-delta mono">+{fmt(opt.delta)}원</span>
                )}
              </div>
              {openTip === opt.id && (
                <div className="qb__opt-tooltip mono">{opt.tooltip}</div>
              )}
              {opt.type === 'choice' ? (
                <div className="qb__opt-choices">
                  {opt.choices.map((c) => (
                    <button
                      key={c.value}
                      type="button"
                      className={`qb__choice${state[opt.id] === c.value ? ' is-on' : ''}`}
                      onClick={() => updateOpt(opt.id, c.value)}
                    >
                      <span className="qb__choice-radio" />
                      <span className="qb__choice-label">{c.label}</span>
                      {c.delta > 0 && <span className="qb__choice-delta mono">+{fmt(c.delta)}</span>}
                    </button>
                  ))}
                </div>
              ) : (
                <button
                  type="button"
                  className={`qb__toggle${state[opt.id] ? ' is-on' : ''}`}
                  onClick={() => updateOpt(opt.id, !state[opt.id])}
                  aria-pressed={state[opt.id]}
                >
                  <span className="qb__toggle-box">{state[opt.id] ? '☑' : '☐'}</span>
                  <span className="qb__toggle-label">{state[opt.id] ? '포함' : '미포함'}</span>
                </button>
              )}
            </div>
          ))}
        </div>

        {/* RIGHT: live quote */}
        <div className="qb__quote">
          <div className="qb__quote-head mono">// quote.json</div>
          <ul className="qb__quote-list mono">
            {breakdown.lines.map((l, idx) => (
              <li key={idx} className={`qb__quote-line${l.isBase ? ' is-base' : ''}`}>
                <span className="qb__quote-sign">{l.isBase ? ' ' : '+'}</span>
                <span className="qb__quote-label">{l.label}</span>
                <span className="qb__quote-amount">{fmt(l.amount)}</span>
              </li>
            ))}
          </ul>
          <div className="qb__quote-divider" />
          <div className="qb__quote-total mono">
            <span className="qb__total-label">total</span>
            <span className="qb__total-amount">{fmt(breakdown.total)}원</span>
          </div>

          <div className="qb__quote-meta">
            <div className="qb__meta-row mono">
              <span className="qb__meta-icon">⏱</span> 예상 기간
              <strong> {breakdown.periodMin}~{breakdown.periodMax}주</strong>
            </div>
            <div className="qb__meta-row mono">
              <span className="qb__meta-icon">💳</span> 결제
              <strong> 선금 {config.payment.down}% · 중도금 {config.payment.mid}% · 잔금 {config.payment.final}%</strong>
            </div>
          </div>

          <details className="qb__details">
            <summary className="qb__details-summary qb__details-summary--ok">
              <span className="qb__details-mark">✓</span> 포함된 것 ({config.included.length})
            </summary>
            <ul className="qb__details-list">
              {config.included.map((it) => (
                <li key={it}>· {it}</li>
              ))}
            </ul>
          </details>

          <details className="qb__details">
            <summary className="qb__details-summary qb__details-summary--no">
              <span className="qb__details-mark">✗</span> 별도 비용 ({config.excluded.length})
            </summary>
            <ul className="qb__details-list">
              {config.excluded.map((it) => (
                <li key={it}>· {it}</li>
              ))}
            </ul>
          </details>

          <div className="qb__actions">
            <button type="button" className="btn btn-primary btn-block" onClick={onChat}>
              ▶ 이 견적으로 상담 시작
            </button>
            <div className="qb__actions-row">
              <button type="button" className="btn btn-outline btn-sm" onClick={onCopy}>
                {copied ? '✓ 복사됨' : '📋 견적 복사'}
              </button>
            </div>
          </div>

          <p className="qb__disclaimer mono">
            * 기준 견적이며, 상세 요건에 따라 상담 후 확정됩니다.
          </p>
        </div>
      </div>
    </div>
  )
}
