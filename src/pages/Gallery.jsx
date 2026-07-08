import { useState, useEffect, useRef } from 'react'
import Lightbox from '../components/Lightbox'

/*
 * ─── HOW TO ADD PHOTOS ────────────────────────────────────────────────────────
 * 1. Drop your image files into /public/images/
 * 2. Add entries to the PHOTOS array below.
 *
 * Each entry can be:
 *   { src: '/images/your-photo.jpg', alt: 'description' }          ← single full-width photo
 *   { row: [ {src, alt}, {src, alt}, {src, alt} ] }                ← row of 3 side-by-side photos
 *
 * Images are displayed in the order they appear in the array.
 * ─────────────────────────────────────────────────────────────────────────────
 */
const PHOTOS = [
  { src: '/images/mardi kisses.JPG', alt: 'Mardi Kisses' },
]

// Scroll-fade hook using IntersectionObserver
function useScrollReveal() {
  const refs = useRef([])
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target) // animate once
          }
        })
      },
      { threshold: 0.12 }
    )
    refs.current.forEach(el => { if (el) observer.observe(el) })
    return () => observer.disconnect()
  }, [])
  return refs
}

export default function Gallery() {
  const [lightbox, setLightbox] = useState(null) // { src, alt }
  const refs = useScrollReveal()
  let refIndex = 0

  return (
    <>
      <div className="gallery">
        {PHOTOS.map((item, i) => {
          if (item.row) {
            // Row of 2 or 3 — determined by how many items you put in the array
            const ri = refIndex++
            return (
              <div
                key={i}
                className="photo-item"
                ref={el => (refs.current[ri] = el)}
              >
                <div className="photo-row">
                  {item.row.map((photo, j) => (
                    <img
                      key={j}
                      src={photo.src}
                      alt={photo.alt}
                      loading="lazy"
                      onClick={() => setLightbox(photo)}
                    />
                  ))}
                </div>
              </div>
            )
          }

          // Single full-width photo
          const ri = refIndex++
          return (
            <div
              key={i}
              className="photo-item"
              ref={el => (refs.current[ri] = el)}
              onClick={() => setLightbox(item)}
            >
              <img src={item.src} alt={item.alt} loading="lazy" />
            </div>
          )
        })}
      </div>

      {lightbox && (
        <Lightbox
          src={lightbox.src}
          alt={lightbox.alt}
          onClose={() => setLightbox(null)}
        />
      )}
    </>
  )
}
