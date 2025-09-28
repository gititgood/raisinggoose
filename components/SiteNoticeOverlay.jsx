"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";

export default function SiteNoticeOverlay({ data, storageBaseKey = "rg_site_notice", forceOpen = false }) {
  const enabled = !!data?.enabled;
  const version = data?.version || "v1";
  const accent = data?.accentHex || "#8b0000";
  const title = data?.title || "Under construction";
  const message = data?.message || "I’m actively building this site. Thanks for your patience!";
  const imgUrl = data?.image?.asset?.url || "";
  const imgAlt = data?.image?.alt || "Notice";

  const storageKey = useMemo(() => `${storageBaseKey}_${version}`, [storageBaseKey, version]);

  // Build a single, stable dep key (array length never changes)
  const effectKey = `${enabled ? 1 : 0}|${storageKey}|${forceOpen ? 1 : 0}`;

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    if (forceOpen) { setOpen(true); return; }
    const dismissed = typeof window !== "undefined" && window.localStorage.getItem(storageKey);
    if (!dismissed) setOpen(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [effectKey]); // <— single dependency, length never changes

  const close = () => {
    setOpen(false);
    try { window.localStorage.setItem(storageKey, "dismissed"); } catch {}
  };

  if (!enabled || !open) return null;

  return (
    <div role="dialog" aria-modal="true" aria-labelledby="site-notice-title"
         className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={close} aria-hidden="true" />
      <div className="relative w-full max-w-md rounded-2xl bg-white shadow-xl ring-2" style={{ borderColor: accent }}>
        <button aria-label="Close notice" onClick={close}
                className="absolute right-2 top-2 rounded-md p-2 transition hover:bg-black/5">✕</button>

        <div className="flex gap-4 p-5 sm:p-6">
          {imgUrl ? (
            <div className="shrink-0">
              <Image
                src={imgUrl}
                alt={imgAlt}
                width={64}
                height={64}
                className="h-16 w-16 rounded-lg object-cover ring-1 ring-black/5"
              />
            </div>
          ) : null}

          <div className="min-w-0">
            <h2 id="site-notice-title" className="mb-1 text-lg font-semibold" style={{ color: accent }}>
              {title}
            </h2>
            <p className="text-sm text-neutral-700">{message}</p>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <button onClick={close}
                      className="rounded-xl px-4 py-2 text-sm font-medium text-white"
                      style={{ backgroundColor: accent }}>
                Got it
              </button>
              <span className="text-xs text-neutral-500">You’ll only see this once per device.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
