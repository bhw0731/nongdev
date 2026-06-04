import { Link } from 'react-router-dom'

export default function WorkCard({ work }) {
  return (
    <Link className="work-card" to={`/portfolio/${work.id}`}>
      <div className="work-image">
        <img src={work.image} alt={work.name} loading="lazy" decoding="async" />
        <div className="work-dimmed" />
        <div className="work-tags-hover">
          <span>{work.tags.join(' · ')}</span>
        </div>
        <span className="work-cat">{work.category}</span>
      </div>
      <div className="work-meta">
        <span className="work-client">{work.client}</span>
        <h3 className="work-name">{work.name}</h3>
      </div>
    </Link>
  )
}
