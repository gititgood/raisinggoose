"use client";
import React, { useEffect, useMemo, useState } from "react";
import styles from "./page.module.css";

// -------------------------
// Default data (local fallback)
// -------------------------
const initialData = {
  name: "Goose",
  shortDesc: "Sweet, energetic, people-loving pup working on regulation and calm greetings.",
  about:
    "Goose is a social, affectionate dog who thrives on structured play, sniffy walks, and relationship-based training. He’s practicing excitement → regulation loops and learning to greet politely with a toy.",
  // Behavior & Temperament — GREEN
  stats: [
    { label: "Friendliness to People", score: 90 },
    { label: "Friendliness to Dogs", score: 82 },
    { label: "Calm in Public Settings", score: 58 },
    { label: "Noise Tolerance", score: 65 },
    { label: "Impulse Control", score: 52 },
    { label: "Handler Engagement", score: 78 },
    { label: "Playfulness", score: 88 },
    { label: "Adaptability (New Environments)", score: 70 },
    { label: "Body Handling Tolerance", score: 75 },
    { label: "Prey-Drive Control", score: 60 },
    { label: "Resource Sharing Comfort", score: 80 },
  ],
  // Obedience — YELLOW
  obedience: [
    { label: "Recall", score: 60 },
    { label: "Sit", score: 85 },
    { label: "Down", score: 78 },
    { label: "Stay / Duration", score: 55 },
    { label: "Leave It", score: 62 },
    { label: "Loose-Leash Walking", score: 68 },
    { label: "Mat / Place Settle", score: 57 },
  ],
  // Triggers
  triggers: [
    { label: "Uninvited petting in crowds", level: "moderate" },
    { label: "Fast approach by friendly dogs", level: "mild" },
    { label: "Delivery people while handler chats", level: "moderate" },
    { label: "Skateboards / scooters", level: "mild" },
    { label: "High-pitched squeals", level: "mild" },
  ],
  // Red Flags — RED (lower count → better)
  issues: [
    { title: "Over-excitement in greetings", count: 3, max: 10, period: "per week" },
    { title: "Over-stimulation (mouthing/clamp)", count: 1, max: 6, period: "per week" },
    { title: "Reactivity window", count: 0, max: 5, period: "per week" },
  ],
};

// Small UI helpers
function Section({ title, children }) {
  return (
    <section className={styles.card}>
      <h2 className={styles.h2}>{title}</h2>
      {children}
    </section>
  );
}

function Legend({ color, label }) {
  return (
    <div className={styles.legend}>
      <span className={styles.pill}>
        <span className={styles.dot} style={{ background: color }} /> {label}
      </span>
    </div>
  );
}

function ProgressBar({ value, color, ariaLabel }) {
  const v = Math.max(0, Math.min(100, Math.round(value)));
  return (
    <div className={styles.bar} role="progressbar" aria-valuenow={v} aria-valuemin={0} aria-valuemax={100} aria-label={ariaLabel}>
      <span className={styles.fill} style={{ width: `${v}%`, background: color }} />
    </div>
  );
}

function StatRow({ label, score, color, invert }) {
  const display = invert ? 100 - Math.max(0, Math.min(100, score)) : score;
  return (
    <div className={styles.stat}>
      <div className={styles.statTop}>
        <span className={styles.statName}>{label}</span>
        <span className={styles.statScore}>{Math.round(display)}/100{invert ? " (lower raw is better)" : ""}</span>
      </div>
      <ProgressBar value={display} color={color} ariaLabel={label} />
    </div>
  );
}

export default function Page() {
  const [data, setData] = useState(initialData);
  const [triggerLabel, setTriggerLabel] = useState("");
  const [triggerLevel, setTriggerLevel] = useState("moderate");

  // Colors
  const colors = useMemo(
    () => ({ behavior: "var(--ok)", obedience: "var(--warn)", redflag: "var(--bad)" }),
    []
  );

  // Load from API (if available) else localStorage else defaults
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/goose", { cache: "no-store" });
        if (res.ok) {
          const { data: server } = await res.json();
          if (!cancelled && server) {
            setData((d) => ({ ...d, ...server }));
            return;
          }
        }
      } catch {}
      // fallback to localStorage
      try {
        const saved = localStorage.getItem("goose_profile");
        if (!cancelled && saved) setData((d) => ({ ...d, ...JSON.parse(saved) }));
      } catch {}
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // Persist to localStorage for quick local drafts (server saves happen inside saveProfile)
  useEffect(() => {
    try {
      localStorage.setItem("goose_profile", JSON.stringify(data));
    } catch {}
  }, [data]);

  async function saveProfile(partial) {
    const next = { ...data, ...partial };
    setData(next);
    try {
      await fetch("/api/goose", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(next),
      });
    } catch {
      // fine to skip; localStorage already has it
    }
  }

  async function addTrigger() {
    const label = triggerLabel.trim();
    if (!label) return;
    const updated = [...(data.triggers || []), { label, level: triggerLevel }];
    await saveProfile({ triggers: updated });
    setTriggerLabel("");
    setTriggerLevel("mild");
  }

  async function removeTrigger(idx) {
    const updated = data.triggers.filter((_, i) => i !== idx);
    await saveProfile({ triggers: updated });
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.avatar}>
            {/* Replace with: <img src="/goose.jpg" alt="Goose" className={styles.avatarImg} /> */}
          </div>
          <div>
            <h1 className={styles.title}>{data.name}</h1>
            <p className={styles.tagline}>{data.shortDesc}</p>
          </div>
        </header>

        <Section title="Short Description">
          <p>{data.about}</p>
        </Section>

        {/* Behavior & Temperament (green) */}
        <Section title="Behavior & Temperament Stats">
          <Legend color={colors.behavior} label="Behavior (green)" />
          <div className={styles.grid}>
            {data.stats.map((s, idx) => (
              <div key={idx} className={styles.col6}>
                <StatRow label={s.label} score={s.score} color={colors.behavior} invert={s.invert} />
              </div>
            ))}
          </div>
        </Section>

        {/* Obedience (yellow) */}
        <Section title="Obedience Skills">
          <Legend color={colors.obedience} label="Obedience (yellow)" />
          <div className={styles.grid}>
            {data.obedience.map((s, idx) => (
              <div key={idx} className={styles.col6}>
                <StatRow label={s.label} score={s.score} color={colors.obedience} invert={s.invert} />
              </div>
            ))}
          </div>
        </Section>

        {/* Triggers */}
        <Section title="Known Triggers">
          <div className={styles.triggerForm}>
            <input
              className={styles.input}
              value={triggerLabel}
              onChange={(e) => setTriggerLabel(e.target.value)}
              placeholder="Trigger (e.g., Uninvited petting)"
            />
            <select
              className={styles.select}
              value={triggerLevel}
              onChange={(e) => setTriggerLevel(e.target.value)}
            >
              <option value="mild">mild</option>
              <option value="moderate">moderate</option>
              <option value="severe">severe</option>
            </select>
            <button className={styles.button} type="button" onClick={addTrigger}>
              Add Trigger
            </button>
          </div>

          <div className={styles.chips}>
            {(data.triggers || []).map((t, idx) => (
              <button
                key={`${t.label}-${idx}`}
                className={styles.chip}
                data-level={t.level}
                title="Click to remove"
                onClick={() => removeTrigger(idx)}
              >
                {t.label} {t.level ? <span style={{ opacity: 0.7 }}>({t.level})</span> : null}
              </button>
            ))}
          </div>
        </Section>

        {/* Red Flags / Focus Areas (red, lower is better) */}
        <Section title="Red Flags / Current Focus Areas">
          <Legend color={colors.redflag} label="Red Flags (red, lower count → better)" />
          <div className={styles.issues}>
            {data.issues.map((i, idx) => {
              const ratio = (i.count || 0) / Math.max(1, i.max || 1);
              const score = 100 - ratio * 100; // invert so fewer incidents → longer bar
              return (
                <article key={idx} className={styles.issue}>
                  <h3 className={styles.issueTitle}>{i.title}</h3>
                  <ProgressBar value={score} color={colors.redflag} ariaLabel={i.title} />
                  <p style={{ color: "var(--muted)", marginTop: 8 }}>
                    {i.count} of {i.max} {i.period || "per period"}
                  </p>
                </article>
              );
            })}
          </div>
        </Section>

        <Section title="Notes">
          <ul style={{ color: "var(--muted)", marginTop: 6, paddingLeft: 20 }}>
            <li>Edit <code>initialData</code> for defaults.</li>
            <li>Behavior bars = green; Obedience = yellow; Red Flags = red (lower is better).</li>
            <li>Image: replace the avatar div with an <code>&lt;img src="/goose.jpg" /&gt;</code>.</li>
          </ul>
        </Section>
      </div>
    </div>
  );
}
