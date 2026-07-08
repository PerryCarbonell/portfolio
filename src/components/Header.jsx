import { useState, useEffect } from 'react'
import Overlay from './Overlay'

function useDateTime() {
  const [dt, setDt] = useState(new Date())
  useEffect(() => {
    const id = setInterval(() => setDt(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
  return dt
}

const DAYS   = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

function formatDateTime(d) {
  const pad  = n => String(n).padStart(2, '0')
  const day  = DAYS[d.getDay()]
  const date = d.getDate()
  const mon  = MONTHS[d.getMonth()]
  const yr   = String(d.getFullYear()).slice(2)
  const time = `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
  return `${day}, ${date} ${mon} '${yr}, ${time}`
}

export default function Header() {
  const dt = useDateTime()
  const [menuOpen,    setMenuOpen]    = useState(false)
  const [aboutOpen,   setAboutOpen]   = useState(false)
  const [journalOpen, setJournalOpen] = useState(false)

  return (
    <>
      <header>
        <div className="header-row">
          <button className="header-name" onClick={() => setMenuOpen(true)}>
            P. Carbonell
          </button>
          <div className="header-right">
            <span className="header-datetime">{formatDateTime(dt)}</span>
            <span className="header-wip">work-in-progress</span>
          </div>
        </div>
      </header>

      {/* Name submenu — dismiss is the animated close, so every nav goes through it */}
      {menuOpen && (
        <Overlay onClose={() => setMenuOpen(false)}>
          {dismiss => (
            <nav className="menu-nav">
              <button className="menu-nav-btn" onClick={dismiss}>
                P. Carbonell
              </button>
              <button className="menu-nav-btn" onClick={() => {
                dismiss()
                setAboutOpen(true)
              }}>About</button>
              <button className="menu-nav-btn" onClick={() => {
                dismiss()
                setJournalOpen(true)
              }}>Journal</button>
            </nav>
          )}
        </Overlay>
      )}

      {/* About overlay */}
      {aboutOpen && (
        <Overlay onClose={() => setAboutOpen(false)}>
          {dismiss => (
            <div className="about-content">
              <button className="menu-nav-btn" onClick={dismiss}>
                P. Carbonell
              </button>
              <p>Photographer</p>
              <p>SYD AUS</p>
              <p className="about-gap">Get in touch for shoots or zines</p>
              <a href="mailto:contactpcarbonell@gmail.com">
                contactpcarbonell@gmail.com
              </a>
            </div>
          )}
        </Overlay>
      )}

      {/* Journal overlay */}
      {journalOpen && (
        <Overlay onClose={() => setJournalOpen(false)}>
          {dismiss => (
            <div className="about-content">
              <button className="menu-nav-btn" onClick={dismiss}>
                P. Carbonell
              </button>
              <p>work in progress..<span className="dot-blink">.</span></p>
            </div>
          )}
        </Overlay>
      )}
    </>
  )
}
