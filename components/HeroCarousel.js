'use client'
import { useEffect, useRef, useState } from 'react'
import { urlFor } from '@/lib/sanity.image'
import Image from 'next/image'

export default function HeroCarousel({
  slides = [],
  interval = 5000,
  alternate = true,          // flip image/copy sides on every other slide (desktop)
  minHeight = '56vh',        // visual height of the viewer; override if you like
}) {
  const [index, setIndex] = useState(0)
  const timerRef = useRef(null)
  const count = slides?.length || 0

  // autoplay
  useEffect(() => {
    if (count < 2) return
    clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setIndex(i => (i + 1) % count)
    }, interval)
    return () => clearInterval(timerRef.current)
  }, [count, interval])

  const goTo = (i) => setIndex(i)

  // Build a full-frame (no-crop) delivery URL
  const srcFor = (s) =>
    s?.image
      ? urlFor(s.image).width(1600).fit('max').auto('format').quality(80).url()
      : ''

  // Pass current index + minHeight to CSS via custom props
  const containerStyle = { ['--rg-index']: index, ['--rg-hero-min-h']: minHeight }

  if (count === 0) {
    return (
      <section className="rg-hero-carousel" style={containerStyle}>
        <div className="rg-slides">
          <div className="rg-slide rg-split">
            <div className="rg-media"><div className="rg-img-fallback">Add slides in Sanity → Carousel</div></div>
            <div className="rg-copy"><div className="rg-copy-inner"><h2 className="rg-h2">Raising Goose</h2><p className="rg-body">Your split carousel is ready once you publish a few slides.</p></div></div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section
      className="rg-hero-carousel"
      style={containerStyle}
      aria-roledescription="carousel"
      aria-label="Hero carousel (split layout)"
    >
      {/* Track (one slide at a time) */}
      <div className="rg-slides">
        {slides.map((s, i) => {
          const img = srcFor(s)
          const reverseOnDesktop = alternate && i % 2 === 1 ? 'rg-row-reverse' : ''
          return (
            <div
              key={s._key || i}
              className={`rg-slide rg-split ${reverseOnDesktop}`}
              role="group"
              aria-roledescription="slide"
              aria-label={`Slide ${i + 1} of ${count}`}
            >
              {/* IMAGE side — no crop, honest framing */}
              <div className="rg-media">
                {img ? (
                  <Image
                    src={img}
                    alt={s.alt || s.heading || 'Carousel image'}
                    className="rg-img"
                    width={800}
                    height={600}
                  />
                ) : (
                  <div className="rg-img-fallback">No image</div>
                )}
              </div>

              {/* COPY side */}
              <div className="rg-copy">
                <div className="rg-copy-inner">
                  {s.heading && <h2 className="rg-h2">{s.heading}</h2>}
                  {s.subheading && <p className="rg-sub">{s.subheading}</p>}
                  {!s.subheading && s.body && <p className="rg-body">{s.body}</p>}
                  {s.ctaHref && s.ctaLabel && (
                    <a className="rg-cta" href={s.ctaHref}>{s.ctaLabel} →</a>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* centered dots */}
      <div className="rg-nav-dots">
        {slides.map((_, i) => (
          <span
            key={i}
            role="button"
            tabIndex={0}
            aria-label={`Go to slide ${i + 1}`}
            className={i === index ? 'is-active' : ''}
            onClick={() => goTo(i)}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && goTo(i)}
          />
        ))}
      </div>
    </section>
  )
}
