// /components/ImageOverlaySection.jsx — Server Component; up to 4 images, iPhone 15 Pro aspect, overlay text with color
import RichText from './RichText'
import Image from 'next/image'

function overlayPositionClasses(pos) {
  switch (pos) {
    case 'top-left': return 'items-start justify-start text-left';
    case 'top-right': return 'items-start justify-end text-right';
    case 'bottom-left': return 'items-end justify-start text-left';
    case 'bottom-right': return 'items-end justify-end text-right';
    default: return 'items-center justify-center text-center';
  }
}

export function ImageOverlaySection({ images = [], overlayMode = 'global', overlay, overlayColor = '#ffffff', overlayBg = '#00000080', overlayAlign = 'center', overlayLink }) {
  const aspect = 'aspect-[16/9]'

  function MaybeLink({ link, children }) {
    const href = link?.href
    if (!href) return children
    const newTab = link?.newTab
    return (
      <a href={href} target={newTab ? '_blank' : undefined} rel={newTab ? 'noopener noreferrer' : undefined} className="group">
        {children}
      </a>
    )
  }

  if ((!images || images.length === 0) && overlayMode === 'global' && overlay) {
    return (
      <section className="bg-transparent">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <MaybeLink link={overlayLink}>
            <div className={`relative w-full ${aspect} overflow-hidden bg-gray-200 flex ${overlayPositionClasses(overlayAlign)} p-6`}>
              <div className="px-4 py-3" style={{ color: overlayColor, background: overlayBg }}>
                <RichText value={overlay} />
              </div>
            </div>
          </MaybeLink>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-transparent">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="relative overflow-hidden">
          <div className="flex gap-0 w-full">
            {(images || []).map((img, i) => {
              const url = img?.url
              if (!url) return null

              const perText = overlayMode === 'per-image' ? (img.perOverlay || null) : null
              const perColor = img.perOverlayColor || overlayColor
              const perBg = img.perOverlayBg || overlayBg
              const perAlign = img.perOverlayAlign || overlayAlign
              const perLink = img.perLink

              return (
                <div key={i} className={`relative flex-1 ${aspect} bg-gray-200`}>
                  <Image
                    src={url}
                    alt={`Overlay ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width:768px) 100vw, 25vw"
                    priority={i === 0}
                  />

                  {overlayMode === 'global' && i === 0 && overlay?.length > 0 && (
                    <MaybeLink link={overlayLink}>
                      <div className={`absolute inset-0 flex ${overlayPositionClasses(overlayAlign)} p-6`}>
                        <div className="px-4 py-3" style={{ color: overlayColor, background: overlayBg }}>
                          <RichText value={overlay} />
                        </div>
                      </div>
                    </MaybeLink>
                  )}

                  {overlayMode === 'per-image' && perText?.length > 0 && (
                    <MaybeLink link={perLink}>
                      <div className={`absolute inset-0 flex ${overlayPositionClasses(perAlign)} p-6`}>
                        <div className="px-4 py-3" style={{ color: perColor, background: perBg }}>
                          <RichText value={perText} />
                        </div>
                      </div>
                    </MaybeLink>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
