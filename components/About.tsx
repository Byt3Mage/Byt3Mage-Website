export default function About() {
  return (
    <>
      <style>{`
        .about-body {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2.5rem 3.5rem;
          align-items: start;
        }
        @media (max-width: 768px) {
          .about-body { grid-template-columns: 1fr; }
          .about-bio, .about-blog { grid-column: 1 !important; }
        }

        /* timeline */
        .tl-item {
          display: grid;
          grid-template-columns: 48px 1fr;
          gap: 0 14px;
          position: relative;
        }
        .tl-item + .tl-item .tl-body {
          border-top: 1px solid rgba(255,255,255,0.04);
        }
        .tl-item::before {
          content: '';
          position: absolute;
          left: 48px; top: 0; bottom: 0;
          width: 1px;
          background: rgba(255,255,255,0.06);
        }
        .tl-item:first-child::before { top: 50%; }
        .tl-item:last-child::before  { bottom: 50%; }
        .tl-item::after {
          content: '';
          position: absolute;
          left: calc(48px + 7px); top: 50%;
          transform: translateY(-50%);
          width: 5px; height: 5px;
          border-radius: 50%;
          background: #0e0e12;
          border: 1px solid rgba(223,255,0,0.3);
        }

        /* traits */
        .trait {
          display: flex; align-items: baseline; gap: 10px;
          padding: 0.55rem 0;
          border-bottom: 1px solid rgba(255,255,255,0.04);
          font-family: 'Space Mono', monospace;
          font-size: 0.78rem; color: #4a4a5a;
          transition: color 0.18s, padding-left 0.18s;
          cursor: default;
        }
        .trait:last-child { border-bottom: none; }
        .trait::before {
          content: '//';
          font-size: 0.6rem; color: #DFFF00; opacity: 0.35;
          flex-shrink: 0; transition: opacity 0.18s;
          font-family: 'Space Mono', monospace;
        }
        .trait:hover { color: #c8c8d8; padding-left: 4px; }
        .trait:hover::before { opacity: 0.8; }

        /* blog cta */
        .about-blog {
          grid-column: 1 / -1;
          padding: 1.2rem 1.5rem;
          background: #0e0e12;
          border: 1px solid rgba(255,255,255,0.07);
          border-left: 2px solid #DFFF00;
          border-radius: 4px;
          display: flex; align-items: center;
          justify-content: space-between; gap: 1rem;
          flex-wrap: wrap; text-decoration: none;
          transition: border-color 0.2s, background 0.2s;
          position: relative; overflow: hidden;
        }
        .about-blog::after {
          content: '';
          position: absolute; top: 0; left: -100%; bottom: 0; width: 60%;
          background: linear-gradient(90deg, transparent, rgba(223,255,0,0.03), transparent);
          transition: left 0.4s ease; pointer-events: none;
        }
        .about-blog:hover::after { left: 140%; }
        .about-blog:hover { border-color: rgba(223,255,0,0.25); background: rgba(223,255,0,0.02); }
        .about-blog:hover .blog-arrow { transform: translateX(3px); }
        .blog-arrow { transition: transform 0.2s; flex-shrink: 0; }
      `}</style>

      <section
        id="about"
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
              01
            </span>
            <h2
              style={{
                fontFamily: "'Syne', sans-serif",
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
                  fontFamily: "'Syne', sans-serif",
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
                ].map(({ year, role, sub, accent }, i, arr) => (
                  <div key={role} className="tl-item">
                    <span
                      style={{
                        fontFamily: "'Space Mono', monospace",
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
                          fontFamily: "'Space Mono', monospace",
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
                          fontFamily: "'Space Mono', monospace",
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
                    fontFamily: "'Space Mono', monospace",
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
                    fontFamily: "'Space Mono', monospace",
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
    </>
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