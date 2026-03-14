import React from "react";

export default function About() {
  return (
    <section
      id="about"
      style={{
        fontFamily: "var(--font-mono)",
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
              fontFamily: "var(--font-mono)",
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
            01
          </span>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "clamp(2rem, 6vw, 3.2rem)",
              color: "#fff",
              letterSpacing: "-0.03em",
              lineHeight: 1,
            }}
          >
            About
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

        <div className="about-body">

          {/* Bio — full width */}
          <div className="about-bio" style={{ gridColumn: "1 / -1" }}>
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "clamp(1.1rem, 2.5vw, 1.35rem)",
                color: "#fff",
                lineHeight: 1.5,
                marginBottom: "1.4rem",
                letterSpacing: "-0.02em",
              }}
            >
              <span style={{ color: "#DFFF00" }}>Mechanical Engineer</span> by training.{" "}
              <span style={{ color: "#00FFB2" }}>Systems Programmer</span> by trade.
            </p>
            <div
              style={{
                fontSize: "0.8rem",
                color: "#4a4a5a",
                lineHeight: 1.9,
                maxWidth: 640,
                display: "flex",
                flexDirection: "column",
                gap: "0.9rem",
              }}
            >
              <p>
                Started in gameplay programming — writing the systems that make games feel alive.
                Became obsessed with what&apos;s underneath: how engines work, how memory moves,
                how tools shape the way developers think. That obsession pulled me further down the stack.
              </p>
              <p>
                Now I split my time between engine architecture, developer tooling, and framework
                design. I&apos;ve touched backend web development along the way and I&apos;m always
                looking for the next interesting problem to pull apart.
              </p>
            </div>
          </div>

          {/* Timeline */}
          <div>
            <GroupLabel>Origin</GroupLabel>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {[
                { year: "BSc",  role: "Mechanical Engineering",  sub: "Foundation in systems thinking" },
                { year: "→",    role: "Gameplay Programming",    sub: "First steps in software" },
                { year: "→",    role: "Systems & Tools",         sub: "Engines, allocators, build systems" },
                { year: "now",  role: "Byt3Mage",                sub: "Building at the metal", accent: true },
              ].map(({ year, role, sub, accent }) => (
                <div key={role} className="tl-item">
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.6rem",
                      color: "#DFFF00",
                      opacity: 0.5,
                      letterSpacing: "0.08em",
                      padding: "0.8rem 0 0.7rem",
                      textAlign: "right",
                      alignSelf: "start",
                    }}
                  >
                    {year}
                  </span>
                  <div className="tl-body" style={{ padding: "0.7rem 0 0.7rem 0" }}>
                    <div
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.78rem",
                        color: accent ? "#DFFF00" : "#c8c8d8",
                        lineHeight: 1.3,
                        marginBottom: 2,
                      }}
                    >
                      {role}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.65rem",
                        color: "#4a4a5a",
                        letterSpacing: "0.05em",
                      }}
                    >
                      {sub}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Traits */}
          <div>
            <GroupLabel>Traits</GroupLabel>
            <div>
              {[
                "Curious — always pulling things apart",
                "Opinionated — holds positions, changes them with evidence",
                "Cross-domain — Mech Eng → game dev → systems",
                "Builder — learning happens by making",
                "Backend experience — not just the metal layer",
              ].map((trait) => (
                <div key={trait} className="trait">{trait}</div>
              ))}
            </div>
          </div>

          {/* Blog CTA */}
          <a href="#blog" className="about-blog">
            <div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.6rem",
                  color: "#DFFF00",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  opacity: 0.65,
                  marginBottom: 3,
                }}
              >
                Writing
              </div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.82rem",
                  color: "#c8c8d8",
                }}
              >
                Thoughts on systems, engines &amp; the craft of programming
              </div>
            </div>
            <span
              className="blog-arrow"
              style={{ fontSize: "0.75rem", color: "#DFFF00" }}
            >
              →
            </span>
          </a>

        </div>
      </div>
    </section>
  );
}

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
        marginBottom: "1.2rem",
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