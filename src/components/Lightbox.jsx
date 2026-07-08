import { useState, useEffect } from 'react'

export default function Lightbox({ src, alt, onClose }) {
  const [closing, setClosing] = useState(false)

  function dismiss() {
    if (closing) return
    setClosing(true)
    setTimeout(onClose, 1100)
  }

  useEffect(() => {
    const h = e => { if (e.key === 'Escape') dismiss() }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [closing])

  return (
    <div className={`lightbox-overlay${closing ? ' closing' : ''}`} onClick={dismiss}>
      <img src={src} alt={alt} onClick={e => e.stopPropagation()} />
    </div>
  )
}
