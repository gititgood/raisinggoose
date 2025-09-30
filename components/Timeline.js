'use client';

import Image from 'next/image';
import clsx from 'clsx';
import { Permanent_Marker } from "next/font/google";

const permanentMarker = Permanent_Marker({
  subsets: ["latin"],
  weight: "400",
});

export default function Timeline({ entries, titleLinkHref }) {
  return (
    <section className="rg-container my-10">
      <div className="mb-6 flex items-baseline justify-between">
        <h2 className="text-2xl font-semibold" style={{ color: '#8b0000' }}>
          Goose Timeline
        </h2>
        {titleLinkHref && (
          <a
            href={titleLinkHref}
            className="text-sm underline hover:no-underline"
            style={{ color: '#8b0000' }}
          >
            View full timeline →
          </a>
        )}
      </div>

      {/* Desktop / tablet grid */}
      <div className="hidden sm:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {entries?.map((e, idx) => (
          <PolaroidCard key={e._id} entry={e} rotateIndex={idx} />
        ))}
      </div>

      {/* Mobile horizontal scroll with snap */}
      <div className="sm:hidden -mx-4 px-4 overflow-x-auto snap-x snap-mandatory flex gap-4">
        {entries?.map((e, idx) => (
          <div key={e._id} className="snap-start shrink-0 w-64">
            <PolaroidCard entry={e} rotateIndex={idx} />
          </div>
        ))}
      </div>
    </section>
  );
}

function PolaroidCard({ entry, rotateIndex }) {
  const w = entry?.image?.asset?.metadata?.dimensions?.width || 1080;
  const h = entry?.image?.asset?.metadata?.dimensions?.height || 1350;

  const rotation = ['-rotate-1', 'rotate-1', '-rotate-2', 'rotate-2'][rotateIndex % 4];

  const AgeOverlay = (
    <span
      className={`absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 text-xs font-semibold bg-white/90 shadow-md whitespace-nowrap ${permanentMarker.className}`}
      style={{ fontSize: '1.5rem' }}
    >
      {entry?.ageLabel}
    </span>
  );

  return (
    <figure
      className={clsx(
        'group relative bg-white border border-neutral-200 shadow-lg p-3 pb-10',
        'transition-transform duration-200 hover:-translate-y-0.5',
        rotation
      )}
      style={{ borderColor: '#8b000020' }}
    >
      <div className="relative overflow-hidden rounded-sm bg-neutral-100">
        <Image
          src={entry?.image?.asset?.url || ''}
          alt={entry?.image?.alt || entry?.ageLabel || 'Goose timeline photo'}
          width={w}
          height={h}
          className="h-auto w-full object-cover"
          sizes="(max-width: 640px) 256px, (max-width: 1024px) 33vw, 25vw"
        />
      </div>

      {entry?.linkHref ? (
        <a href={entry.linkHref} aria-label={entry?.ageLabel}>
          {AgeOverlay}
        </a>
      ) : (
        AgeOverlay
      )}
    </figure>
  );
}
