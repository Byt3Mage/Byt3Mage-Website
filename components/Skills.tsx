"use client";

import { primaryLanguage, languages, tools, competencies } from "@/lib/skills";

export default function Skills() {
  return (
    <>
      <style>{`
        .skills-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem 2.5rem;
        }
        @media (max-width: 768px) {
          .skills-grid { grid-template-columns: 1fr !important; }
        }

        /* pill */
        .sk-pill {
          display: inline-block;
          padding: 0.28rem 0.75rem;
          font-family: 'Space Mono', monospace;
          font-size: 0.72rem;
          background: #0e0e12;
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 3px;
          color: #4a4a5a;
          transition: border-color 0.18s, color 0.18s;
          cursor: default;
          position: relative;
          overflow: hidden;
        }
        .sk-pill::before {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(223,255,0,0.04);
          opacity: 0;
          transition: opacity 0.18s;
          pointer-events: none;
        }
        .sk-pill:hover { border-color: rgba(223,255,0,0.22); color: #DFFF00; }
        .sk-pill:hover::before { opacity: 1; }

        /* competency item */
        .sk-comp {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 0.6rem 0;
          border-bottom: 1px solid rgba(255,255,255,0.04);
          font-family: 'Space Mono', monospace;
          font-size: 0.8rem;
          color: #4a4a5a;
          list-style: none;
          transition: color 0.18s, padding-left 0.18s;
          cursor: default;
        }
        .sk-comp:last-child { border-bottom: none; }
        .sk-comp::before {
          content: '//';
          font-size: 0.65rem;
          color: #DFFF00;
          opacity: 0.35;
          flex-shrink: 0;
          transition: opacity 0.18s;
          font-family: 'Space Mono', monospace;
        }
        .sk-comp:hover { color: #c8c8d8; padding-left: 4px; }
        .sk-comp:hover::before { opacity: 0.8; }
      `}</style>

      <section
        id="skills"
        style={{
          fontFamily: "'Space Mono', monospace",
          background: "#060608",
          padding: "6rem clamp(1rem, 4vw, 3rem)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Dot-grid background */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle, rgba(223,255,0,0.025) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            maxWidth: "100%",
            margin: "0 auto",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Section header */}
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 16,
              marginBottom: "3.5rem",
            }}
          >
            <span
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "0.65rem",
                color: "#DFFF00",
                letterSpacing: "0.2em",
                opacity: 0.7,
                padding: "2px 8px",
                border: "1px solid rgba(223,255,0,0.2)",
                borderRadius: 3,
                flexShrink: 0,
              }}
            >
              03
            </span>
            <h2
              style={{
                fontFamily: "'Space Mono', monospace",
                fontWeight: 700,
                fontSize: "clamp(2rem, 6vw, 3.2rem)",
                color: "#fff",
                letterSpacing: "-0.03em",
                lineHeight: 1,
              }}
            >
              Skills
            </h2>
            <div
              style={{
                flex: 1,
                height: 1,
                background:
                  "linear-gradient(90deg, rgba(255,255,255,0.08), transparent)",
                alignSelf: "center",
              }}
            />
          </div>

          {/* Grid */}
          <div className="skills-grid">

            {/* Primary language */}
            <div>
              <GroupLabel>Primary Language</GroupLabel>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "1.1rem 1.4rem",
                  background: "#0e0e12",
                  border: "1px solid rgba(223,255,0,0.22)",
                  borderLeft: "3px solid #DFFF00",
                  borderRadius: 4,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Subtle corner glow */}
                <div
                  aria-hidden
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(135deg, transparent 60%, rgba(223,255,0,0.04))",
                    pointerEvents: "none",
                  }}
                />
                <span
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: "1.05rem",
                    fontWeight: 700,
                    color: "#DFFF00",
                    textShadow: "0 0 20px rgba(223,255,0,0.3)",
                  }}
                >
                  {primaryLanguage.name}
                </span>
                <span
                  style={{
                    fontSize: "0.58rem",
                    color: "#DFFF00",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    border: "1px solid rgba(223,255,0,0.3)",
                    padding: "0.22rem 0.6rem",
                    borderRadius: 3,
                    background: "rgba(223,255,0,0.05)",
                  }}
                >
                  {primaryLanguage.level}
                </span>
              </div>
            </div>

            {/* Languages */}
            <div>
              <GroupLabel>{languages.title}</GroupLabel>
              <PillList items={languages.items} />
            </div>

            {/* Competencies */}
            <div>
              <GroupLabel>Core Competencies</GroupLabel>
              <ul style={{ padding: 0 }}>
                {competencies.map((c) => (
                  <li key={c} className="sk-comp">{c}</li>
                ))}
              </ul>
            </div>

            {/* Tools */}
            <div>
              <GroupLabel>{tools.title}</GroupLabel>
              <PillList items={tools.items} />
            </div>

          </div>

        </div>
      </section>
    </>
  );
}

/* ── Sub-components ── */

function GroupLabel({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        fontSize: "0.6rem",
        color: "#DFFF00",
        letterSpacing: "0.2em",
        textTransform: "uppercase",
        marginBottom: "1rem",
        opacity: 0.65,
      }}
    >
      <span
        style={{
          display: "block",
          width: 3,
          height: 3,
          background: "#DFFF00",
          borderRadius: "50%",
          flexShrink: 0,
        }}
      />
      {children}
    </div>
  );
}

function PillList({ items }: { items: string[] }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.45rem" }}>
      {items.map((item) => (
        <span key={item} className="sk-pill">
          {item}
        </span>
      ))}
    </div>
  );
}