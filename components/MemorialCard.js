'use client';
import React from "react";
import { motion } from "framer-motion";
// If you use Sanity Portable Text for the body copy, uncomment below and install:
// import { PortableText } from "@portabletext/react";

/**
 * MemorialCard
 *
 * V5: Enlarged and lowered polaroid-style photos arranged along an arc.
 * Reduced gap between the images and headline/text.
 * Headline and body now use the hero section font via the `font-hero` utility class.
 */

export default function MemorialCard(props) {
  const {
    images = [
      { url: "/images/sami-1.jpg", alt: "Sami 1" },
      { url: "/images/sami-2.jpg", alt: "Sami 2" },
      { url: "/images/sami-3.jpg", alt: "Sami 3" },
    ],
    title = "In Loving Memory of Sami",
    body = "Forever running ahead, forever waiting back at the gate. Thank you for teaching us patience, joy, and quiet courage.",
    mode = "inline",
    cardBG = "#FFFFFF",
    className = "",
    accentColor = "#8b0000",
    __layout,
  } = props
  const overlayClasses =
    "md:absolute md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2";
  const wrapperClasses = mode === "overlay" ? `${overlayClasses} pointer-events-none md:pointer-events-auto` : "";

  const angles = Array.isArray(__layout?.angles) && __layout.angles.length === 3 ? __layout.angles : [210, 270, 330];
  const radius = typeof __layout?.radius === 'number' ? __layout.radius : 220;
  const verticalOffset = typeof __layout?.verticalOffset === 'number' ? __layout.verticalOffset : 60;

  return (
    <div className={`relative z-20 ${wrapperClasses} ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mx-auto w-full max-w-[48rem]"
      >
        <div className="relative  bg-white/95 ring-1 ring-neutral-900/5">
          <div
            style={{ borderColor: accentColor }}
          >
            <div className="rounded-[22px] outline outline-1 outline-white/60">
              <div className="relative rounded-2xl bg-white p-5 sm:p-7">
                {/* Three polaroids */}
                <div className="relative mx-auto hidden h-[400px] max-w-[48rem] md:block">
                  {images.slice(0, 3).map((img, i) => {
                    const theta = (angles[i] * Math.PI) / 180;
                    const x = Math.cos(theta) * radius;
                    const y = Math.sin(theta) * radius + verticalOffset;
                    const rotation = [-10, 0, 10][i];
                    return (
                      <Polaroid
                        key={i}
                        img={img}
                        style={{
                          position: "absolute",
                          left: "50%",
                          top: "50%",
                          transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) rotate(${rotation}deg)`,
                        }}
                        accentColor={accentColor}
                      />
                    );
                  })}
                </div>

                {/* Mobile layout: stacked with offsets */}
                <div className="md:hidden">
                  <div className="flex flex-col items-center gap-4">
                    {images.slice(0, 3).map((img, i) => (
                      <Polaroid
                        key={i}
                        img={img}
                        className={
                          i === 0
                            ? "-rotate-3 -translate-x-2"
                            : i === 1
                            ? "rotate-0"
                            : "rotate-3 translate-x-2"
                        }
                        accentColor={accentColor}
                        size="large"
                      />
                    ))}
                  </div>
                </div>

                {/* Headline & body */}
                <div className="mt-4 text-center">
                  <h3
                    className="font-hero text-2xl font-semibold tracking-wide sm:text-3xl"
                    style={{ color: accentColor }}
                  >
                    {title}
                  </h3>
                  <div className="font-hero mx-auto mt-2 max-w-prose text-sm leading-relaxed text-neutral-700 sm:text-base">
                    {(() => {
                      const isReactElement = body && typeof body === 'object' && body.$$typeof;
                      if (isReactElement) return body; // already a React node (e.g., <PortableText />)
                      if (Array.isArray(body)) {
                        // Portable Text blocks provided directly
                        try {
                          // Lazy require to avoid bundling if unused
                          const { PortableText } = require('@portabletext/react');
                          return <PortableText value={body} />;
                        } catch {
                          return <p>{`/* PortableText not installed. Install @portabletext/react or pass a rendered node. */`}</p>;
                        }
                      }
                      return <p>{body}</p>;
                    })()}
                  </div>
                  <div className="mt-4 flex items-center justify-center gap-2">
                    <span className="h-px w-10" style={{ backgroundColor: `${accentColor}30` }} />
                    <span className="h-px w-24" style={{ backgroundColor: `${accentColor}20` }} />
                    <span className="h-px w-10" style={{ backgroundColor: `${accentColor}30` }} />
                  </div>
                </div>

                <div
                  className="pointer-events-none absolute -inset-6 -z-10 rounded-3xl blur-2xl"
                  style={{
                    background:
                      "radial-gradient(60% 60% at 50% 40%, rgba(255,250,243,0.9) 0%, rgba(255,250,243,0.45) 50%, rgba(255,250,243,0) 100%)",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function Polaroid({ img, className = "", style, accentColor = "#8b0000", size = "large" }) {
  const width = size === "large" ? 190 : 156;
  const height = size === "large" ? "h-52" : "h-40";
  return (
    <div
      className={`polaroid pointer-events-auto select-none rounded-[14px] bg-white p-2 shadow-xl ring-1 ring-neutral-900/5 ${className}`}
      style={{ width, ...style }}
    >
      <div className="overflow-hidden rounded-[10px]">
        <img
          src={img?.url}
          alt={img?.alt || "Memorial photo"}
          className={`${height} w-full object-cover`}
          draggable={false}
        />
      </div>
      {img?.label && (
        <div
          className="mt-2 rounded-[8px] border px-2 py-1 text-center text-[11px] font-medium text-neutral-700"
          style={{ borderColor: accentColor }}
        >
          {img.label}
        </div>
      )}
    </div>
  );
}
