import Icon from './Icon.jsx'

export default function ServiceCard({ service, asLink, href }) {
  const Tag = asLink ? 'a' : 'div'
  return (
    <Tag className="service-card" href={href}>
      <div className="service-icon-wrap">
        <span className="service-icon">
          <Icon name={service.icon} />
        </span>
      </div>
      <h3 className="service-title-en">{service.en}</h3>
      <span className="service-title-ko">{service.ko}</span>
      <p className="service-desc">{service.desc}</p>
      <div className="service-shine" />
    </Tag>
  )
}
