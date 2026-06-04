import { useEffect } from 'react'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'
import QuickDock from './QuickDock.jsx'
import AvailabilityBar from './AvailabilityBar.jsx'
import ReadingProgress from './ReadingProgress.jsx'
import CursorFX from './CursorFX.jsx'
import { bootChannelTalk } from '../lib/channeltalk.js'
import { bootAnalytics } from '../lib/analytics.js'
import './Layout.css'

export default function Layout({ children }) {
  useEffect(() => {
    bootChannelTalk(import.meta.env.VITE_CHANNELTALK_PLUGIN_KEY)
    bootAnalytics(import.meta.env.VITE_GA_ID)
  }, [])

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main">본문 바로가기</a>
      <CursorFX />
      <ReadingProgress />
      <AvailabilityBar />
      <Navbar />
      <main id="main" className="main-content" tabIndex={-1}>{children}</main>
      <Footer />
      <QuickDock />
    </div>
  )
}
