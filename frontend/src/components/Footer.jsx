import { Link } from 'react-router-dom'

const cols = [
  {
    title: 'PACKAGES',
    links: [
      { label: 'STANDARD · 랜딩페이지', to: '/services#svc-standard' },
      { label: 'DELUXE · 웹 리뉴얼', to: '/services#svc-deluxe' },
      { label: 'PREMIUM · 풀스택', to: '/services#svc-premium' },
      { label: '전체 보기', to: '/services' },
    ],
  },
  {
    title: 'COMPANY',
    links: [
      { label: '소개', to: '/about' },
      { label: '포트폴리오', to: '/portfolio' },
      { label: '서비스', to: '/services' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container-wide footer-grid">
        <div className="footer-brand">
          <Link className="navbar-logo" to="/" translate="no">
            nong<span className="navbar-logo-accent">dev</span>
          </Link>
          <p>
            기획부터 배포까지 끝까지 책임지는 1인 개발 스튜디오.
            <br />
            작은 아이디어도 제대로 작동하는 제품으로.
          </p>
          <ul className="footer-contact mono">
            <li>
              <span>TEL</span>
              <a href="tel:+821075900186">010-7590-0186</a>
            </li>
            <li>
              <span>MAIL</span>
              <a href="mailto:bhw_2000@naver.com">bhw_2000@naver.com</a>
            </li>
          </ul>
        </div>

        {cols.map((col) => (
          <div key={col.title} className="footer-col">
            <h4>{col.title}</h4>
            <ul>
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link to={l.to}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="container-wide footer-prompt mono" aria-hidden="true">
        <span className="footer-prompt__path">nongdev@portfolio:~$</span>
      </div>

      <div className="container-wide footer-bottom">
        <span className="mono">© {new Date().getFullYear()} nongdev — all rights reserved.</span>
        <span className="footer-bottom-meta mono">built with React · made in Korea</span>
      </div>
    </footer>
  )
}
