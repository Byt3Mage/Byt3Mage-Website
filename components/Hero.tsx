"use client";

import { useEffect, useRef, useState } from "react";

const ROLES = [
  "Systems Programmer",
  "Game Engine Developer",
  "Tools & Framework Engineer",
];

const GLYPHS =
  "01アイウエオカキクケコサシスセソタチツテトナニヌネノ∅∃∀∇∆⊕⊗ABCDEF0123456789";

const SPECS = ["C / C++", "Rust", "Game Engines", "Low-level Systems"];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [roleVisible, setRoleVisible] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dropsRef  = useRef<number[]>([]);
  const frameRef  = useRef<number | null>(null);

  /* ── role rotator ─────────────────────────── */
  useEffect(() => {
    const iv = setInterval(() => {
      setRoleVisible(false);
      setTimeout(() => {
        setRoleIndex((i) => (i + 1) % ROLES.length);
        setRoleVisible(true);
      }, 300);
    }, 2800);
    return () => clearInterval(iv);
  }, []);

  /* ── glyph rain canvas ────────────────────── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const COL_W = 22;
    let W = 0, H = 0, cols = 0;

    const resize = () => {
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width  = W;
      canvas.height = H;
      cols = Math.ceil(W / COL_W);
      const prev = dropsRef.current;
      const next: number[] = [];
      for (let i = 0; i < cols; i++)
        next.push(prev[i] !== undefined ? prev[i] : Math.random() * -80);
      dropsRef.current = next;
    };

    const drawFrame = () => {
      const drops = dropsRef.current;

      ctx.fillStyle = "rgba(6,6,8,0.15)";
      ctx.fillRect(0, 0, W, H);

      ctx.font = `12px "Space Mono", monospace`;

      for (let i = 0; i < cols; i++) {
        const x = i * COL_W + 4;
        const y = drops[i] * 18;
        const g = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];

        ctx.fillStyle = "rgba(223,255,0,0.55)";
        ctx.fillText(g, x, y);

        if (Math.random() > 0.5) {
          ctx.fillStyle = "rgba(223,255,0,0.18)";
          ctx.fillText(
            GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
            x,
            y - 18
          );
        }

        drops[i] += 0.4 + Math.random() * 0.25;
        if (y > H && Math.random() > 0.975) drops[i] = Math.random() * -40;
      }

      /* subtle grid overlay */
      ctx.strokeStyle = "rgba(223,255,0,0.04)";
      ctx.lineWidth   = 0.5;
      const GS = 48;
      for (let x = 0; x < W; x += GS) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
      }
      for (let y = 0; y < H; y += GS) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
      }
    };

    const animate = () => {
      drawFrame();
      frameRef.current = requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener("resize", resize);
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  /* ── render ───────────────────────────────── */
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syne:wght@400;700;800&display=swap');

        :root {
          --acc:  #DFFF00;
          --acc2: #00FFB2;
          --bg:   #060608;
          --bg2:  #0C0C10;
          --muted: #4a4a5a;
          --hero-text: #c8c8d8;
          --hero-border: rgba(223,255,0,0.12);
        }

        @keyframes heroPulse {
          0%,100% { opacity:1; box-shadow:0 0 8px var(--acc),0 0 16px rgba(223,255,0,.4); }
          50%      { opacity:.4; box-shadow:0 0 4px var(--acc); }
        }
        @keyframes heroBadgeSweep {
          0%,100% { transform:translateX(-100%); }
          50%     { transform:translateX(100%); }
        }
        @keyframes heroNameIn {
          from { opacity:0; transform:translateY(30px) skewX(-3deg); }
          to   { opacity:1; transform:translateY(0) skewX(0); }
        }
        @keyframes heroFadeUp {
          from { opacity:0; transform:translateY(18px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes heroGlitch1 {
          0%,88%,100% { opacity:0; }
          89%,90%     { opacity:.8; transform:translateX(-4px); }
          91%,92%     { opacity:.6; transform:translateX(2px); }
        }
        @keyframes heroGlitch2 {
          0%,88%,100% { opacity:0; }
          89.5%,90.5% { opacity:.7; transform:translateX(4px); }
          91.5%       { opacity:0; }
        }
        @keyframes heroScrollDrop {
          0%   { top:-100%; }
          100% { top:100%; }
        }

        /* glitch pseudo-elements */
        .hero-name-glitch { position:relative; display:inline-block; }
        .hero-name-glitch::before,
        .hero-name-glitch::after {
          content: attr(data-text);
          position:absolute; top:0; left:0;
          width:100%; height:100%;
          pointer-events:none;
        }
        .hero-name-glitch::before {
          color:#00FFB2;
          clip-path:polygon(0 30%,100% 30%,100% 50%,0 50%);
          transform:translateX(-3px);
          animation:heroGlitch1 4s steps(1) infinite;
          opacity:0;
        }
        .hero-name-glitch::after {
          color:#FF3366;
          clip-path:polygon(0 55%,100% 55%,100% 75%,0 75%);
          transform:translateX(3px);
          animation:heroGlitch2 4s steps(1) infinite;
          opacity:0;
        }

        /* scroll track */
        .hero-scroll-track {
          width:1px; height:36px;
          background:rgba(223,255,0,.15);
          position:relative; overflow:hidden;
        }
        .hero-scroll-track::after {
          content:'';
          position:absolute; top:-100%; left:0;
          width:100%; height:100%;
          background:linear-gradient(to bottom,transparent,#DFFF00);
          animation:heroScrollDrop 2s ease-in-out infinite;
        }

        /* CTA hover handled inline — but define base transition once */
        .hero-cta-primary { transition: transform .2s ease, box-shadow .2s ease; }
        .hero-cta-outline  { transition: transform .2s ease, border-color .2s ease, color .2s ease; }
      `}</style>

      <section
        id="hero"
        style={{
          fontFamily: "'Space Mono', monospace",
          background: "var(--bg)",
          minHeight: "100svh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
          padding: "6rem 2rem 5rem",
          textAlign: "center",
        }}
      >
        {/* ── glyph rain ── */}
        <canvas
          ref={canvasRef}
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            opacity: 0.55,
            zIndex: 0,
          }}
        />

        {/* ── CRT scanlines ── */}
        <div
          aria-hidden
          style={{
            position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1,
            background:
              "repeating-linear-gradient(to bottom,transparent,transparent 3px,rgba(0,0,0,.18) 3px,rgba(0,0,0,.18) 4px)",
          }}
        />

        {/* ── radial vignette ── */}
        <div
          aria-hidden
          style={{
            position: "absolute", inset: 0, pointerEvents: "none", zIndex: 2,
            background:
              "radial-gradient(ellipse 80% 80% at 50% 50%,transparent 30%,rgba(6,6,8,.85) 100%)",
          }}
        />

        {/* ── corner brackets ── */}
        {(
          [
            { k: "tl", s: { top: 24, left: 24 } },
            { k: "tr", s: { top: 24, right: 24, transform: "scaleX(-1)" } },
            { k: "bl", s: { bottom: 24, left: 24, transform: "scaleY(-1)" } },
            { k: "br", s: { bottom: 24, right: 24, transform: "scale(-1,-1)" } },
          ] as const
        ).map(({ k, s }) => (
          <svg
            key={k}
            aria-hidden
            width="32" height="32" viewBox="0 0 32 32" fill="none"
            style={{ position: "absolute", zIndex: 5, opacity: 0.35, ...s }}
          >
            <path d="M2 28 L2 2 L28 2" stroke="#DFFF00" strokeWidth="1.5" strokeLinecap="square" />
          </svg>
        ))}

        {/* ── main content ── */}
        <div style={{ position: "relative", zIndex: 10, maxWidth: 800, width: "100%" }}>

          {/* badge */}
          <div
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              fontSize: ".65rem", color: "var(--muted)",
              letterSpacing: ".14em", textTransform: "uppercase",
              marginBottom: "2.2rem",
              border: "1px solid rgba(223,255,0,.15)",
              padding: ".38rem 1rem", borderRadius: 999,
              position: "relative", overflow: "hidden",
              animation: "heroFadeUp 1s .1s both",
            }}
          >
            <span
              aria-hidden
              style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(90deg,transparent,rgba(223,255,0,.04),transparent)",
                animation: "heroBadgeSweep 3s ease-in-out infinite",
              }}
            />
            <span
              style={{
                width: 7, height: 7, borderRadius: "50%",
                background: "var(--acc)",
                boxShadow: "0 0 8px var(--acc),0 0 16px rgba(223,255,0,.4)",
                animation: "heroPulse 1.6s ease-in-out infinite",
                flexShrink: 0,
              }}
            />
            Available for interesting projects
          </div>

          {/* name with glitch effect */}
          <div style={{ marginBottom: ".5rem" }}>
            <h1
              className="hero-name-glitch"
              data-text="Byt3Mage"
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 700,
                fontSize: "clamp(4rem,13vw,8.5rem)",
                color: "var(--acc)",
                letterSpacing: "-.04em",
                lineHeight: 0.9,
                textShadow:
                  "0 0 60px rgba(223,255,0,.35),0 0 120px rgba(223,255,0,.12)",
                animation: "heroNameIn .8s cubic-bezier(.16,1,.3,1) both",
              }}
            >
              Byt3Mage
            </h1>
            <p
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "clamp(.65rem,1.4vw,.8rem)",
                color: "var(--muted)",
                letterSpacing: ".25em",
                textTransform: "uppercase",
                marginTop: ".6rem",
                animation: "heroFadeUp 1s .3s both",
              }}
            >
              Ireoluwa Alayaki
            </p>
          </div>

          {/* separator */}
          <div
            style={{
              display: "flex", alignItems: "center", gap: 12,
              margin: "1.6rem auto", maxWidth: 340,
              animation: "heroFadeUp 1s .4s both",
            }}
          >
            <div style={{ flex: 1, height: 1,
              background: "linear-gradient(90deg,transparent,var(--hero-border),transparent)" }} />
            <div style={{ width: 5, height: 5, background: "var(--acc)",
              transform: "rotate(45deg)", opacity: .5 }} />
            <div style={{ flex: 1, height: 1,
              background: "linear-gradient(90deg,transparent,var(--hero-border),transparent)" }} />
          </div>

          {/* role rotator */}
          <div
            style={{
              height: "1.5rem", overflow: "hidden",
              marginBottom: "1.6rem",
              animation: "heroFadeUp 1s .5s both",
            }}
          >
            <span
              style={{
                display: "block",
                fontFamily: "'Space Mono', monospace",
                fontSize: ".78rem",
                color: "var(--acc2)",
                letterSpacing: ".18em",
                textTransform: "uppercase",
                opacity:    roleVisible ? 1 : 0,
                transform:  roleVisible ? "translateY(0)" : "translateY(10px)",
                transition: "opacity .28s ease, transform .28s ease",
              }}
            >
              {ROLES[roleIndex]}
            </span>
          </div>

          {/* tagline */}
          <p
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "clamp(1rem,2.2vw,1.2rem)",
              color: "var(--hero-text)",
              lineHeight: 1.65,
              marginBottom: "2.6rem",
              opacity: .8,
              animation: "heroFadeUp 1s .6s both",
            }}
          >
            Building high-performance systems, engines,
            <br />
            and developer tools at the metal.
          </p>

          {/* spec bar */}
          <div
            style={{
              display: "flex", justifyContent: "center", alignItems: "center",
              marginBottom: "2.6rem", flexWrap: "wrap",
              animation: "heroFadeUp 1s .65s both",
            }}
          >
            {SPECS.map((spec, i) => (
              <div
                key={spec}
                style={{
                  display: "flex", alignItems: "center", gap: 6,
                  fontSize: ".65rem", color: "var(--muted)",
                  letterSpacing: ".1em", textTransform: "uppercase",
                  padding: "0 14px",
                  borderLeft: i > 0 ? "1px solid rgba(255,255,255,.07)" : "none",
                }}
              >
                <span
                  style={{
                    width: 4, height: 4, borderRadius: "50%",
                    background: "var(--acc2)", opacity: .7, flexShrink: 0,
                  }}
                />
                {spec}
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div
            style={{
              display: "flex", gap: ".9rem",
              justifyContent: "center", flexWrap: "wrap",
              animation: "heroFadeUp 1s .75s both",
            }}
          >
            <a
              href="https://github.com/Byt3Mage"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-cta-primary"
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                fontFamily: "'Space Mono', monospace",
                fontSize: ".72rem", fontWeight: 700,
                letterSpacing: ".1em", textTransform: "uppercase",
                textDecoration: "none",
                padding: ".75rem 1.7rem", borderRadius: 4,
                background: "var(--acc)", color: "#060608",
                boxShadow:
                  "0 0 20px rgba(223,255,0,.25),0 0 40px rgba(223,255,0,.08)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform  = "translateY(-2px)";
                e.currentTarget.style.boxShadow  =
                  "0 0 30px rgba(223,255,0,.4),0 0 60px rgba(223,255,0,.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform  = "translateY(0)";
                e.currentTarget.style.boxShadow  =
                  "0 0 20px rgba(223,255,0,.25),0 0 40px rgba(223,255,0,.08)";
              }}
            >
              <GithubIcon />
              GitHub
            </a>

            <a
              href="#contact"
              className="hero-cta-outline"
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                fontFamily: "'Space Mono', monospace",
                fontSize: ".72rem",
                letterSpacing: ".1em", textTransform: "uppercase",
                textDecoration: "none",
                padding: ".75rem 1.7rem", borderRadius: 4,
                background: "transparent", color: "var(--hero-text)",
                border: "1px solid rgba(200,200,216,.18)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform   = "translateY(-2px)";
                e.currentTarget.style.borderColor = "rgba(200,200,216,.35)";
                e.currentTarget.style.color       = "#fff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform   = "translateY(0)";
                e.currentTarget.style.borderColor = "rgba(200,200,216,.18)";
                e.currentTarget.style.color       = "var(--hero-text)";
              }}
            >
              Get in touch
            </a>
          </div>
        </div>

        {/* ── scroll hint ── */}
        <a
          href="#about"
          aria-label="Scroll down"
          style={{
            position: "absolute", bottom: "2rem", left: "50%",
            transform: "translateX(-50%)",
            display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
            zIndex: 10, textDecoration: "none",
            animation: "heroFadeUp 1s 1.1s both",
          }}
        >
          <span
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: ".55rem", color: "var(--muted)",
              letterSpacing: ".2em", textTransform: "uppercase",
            }}
          >
            scroll
          </span>
          <div className="hero-scroll-track" />
        </a>
      </section>
    </>
  );
}

function GithubIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
    </svg>
  );
}