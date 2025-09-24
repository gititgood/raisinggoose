// /components/HeroSection.jsx — Server Component; image can be left or right; no cropping
import Image from 'next/image'
import RichText from './RichText'

export default function HeroSection({ title, copy, image, imagePosition = 'right' }) {
  const imageUrl = image?.asset?.url || null
  const isLeft = imagePosition === 'left'

  return (
    <section>
      <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto px-6 py-12 items-center">
        <div className={`relative w-full h-[400px] bg-gray-100 order-1 ${isLeft ? 'md:order-1' : 'md:order-2'}`}>
          {imageUrl && <Image src={imageUrl} alt={title || 'Hero'} fill className="object-contain" />}
        </div>
        <div className={`order-2 ${isLeft ? 'md:order-2' : 'md:order-1'}`}>
          {title && <h2 className="text-3xl font-bold mb-4">{title}</h2>}
          <RichText value={copy} />
        </div>
      </div>
    </section>
  )
}
