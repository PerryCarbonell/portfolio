import { useState, useEffect } from 'react'

const DURATION = 1100

export { DURATION }

export default function Overlay({ onClose, children }) {
  const [closing, setClosing] = useState(false)

  function dismiss() {
    if (closing) return
    setClosing(true)
    setTimeout(onClose, DURATION)
  }

  useEffect(() => {
    const h = e => { if (e.key === 'Escape') dismiss() }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [closing])

  return (
    <div className={`overlay${closing ? ' closing' : ''}`} onClick={dismiss}>
      <div className="overlay-content" onClick={e => e.stopPropagation()}>
        {/* Pass dismiss down so child buttons can trigger the animated close */}
        {typeof children === 'function' ? children(dismiss) : children}
      </div>
    </div>
  )
}
