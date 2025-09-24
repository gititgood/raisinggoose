// HeroImage.jsx (server component is fine)
import Image from "next/image";

export default function HeroImage({ title, description, imageUrl, priority = true }) {
  return (
    <section className="relative bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h2>
          <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-line">{description}</p>
        </div>

        {/* Fixed-height box; image shrinks to fit inside */}
        <div className="relative w-full rounded-2xl overflow-hidden shadow-md bg-gray-100"
             style={{ height: 400 }}>
          <Image
            src={imageUrl}
            alt={title ?? "Hero image"}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-contain"
            priority={priority}
          />
        </div>
      </div>
    </section>
  );
}
