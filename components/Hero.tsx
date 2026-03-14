"use client";

import { useEffect, useRef, useState } from "react";

const ROLES = [
  "Systems Programmer",
  "Game Engine Developer",
  "Systems Solutions Architect",
];

const GLYPHS =
  "01アイウエオカキクケコサシスセソタチツテトナニヌネノ∅∃∀∇∆⊕⊗ABCDEF0123456789";

const TERM_LINES: { delay: number; html: string }[] = [
  { delay: 200,  html: '<span class="prompt-sym">▶</span><span class="cmd">whoami</span>' },
  { delay: 600,  html: '<span class="val">byt3mage</span> <span class="comment">// Ireoluwa Alayaki</span>' },
  { delay: 900,  html: "" },
  { delay: 1000, html: '<span class="prompt-sym">▶</span><span class="cmd">cat</span> <span class="val2">./profile.toml</span>' },
  { delay: 1300, html: '<span class="key">[identity]</span>' },
  { delay: 1450, html: '  name    <span class="dim">=</span> <span class="val">"Byt3Mage"</span>' },
  { delay: 1580, html: '  focus   <span class="dim">=</span> <span class="val">"systems · engines · tools"</span>' },
  { delay: 1710, html: '  years   <span class="dim">=</span> <span class="val2">∞</span>' },
  { delay: 1850, html: "" },
  { delay: 1900, html: '<span class="key">[stack]</span>' },
  { delay: 2050, html: '  primary <span class="dim">=</span> [<span class="val">"C"</span>, <span class="val">"C++"</span>, <span class="val">"Rust"</span>]' },
  { delay: 2200, html: '  target  <span class="dim">=</span> <span class="val">"bare metal"</span>' },
  { delay: 2340, html: "" },
  { delay: 2380, html: '<span class="prompt-sym">▶</span><span class="cmd">systemctl</span> status byt3mage' },
  { delay: 2700, html: '  <span class="ok">● byt3mage.service</span>' },
  { delay: 2850, html: '    Loaded: loaded <span class="comment">(production-ready)</span>' },
  { delay: 2980, html: '    Active: <span class="ok">active (running)</span> <span class="comment">since epoch</span>' },
  { delay: 3100, html: "" },
  { delay: 3150, html: '<span class="prompt-sym">▶</span> <span class="cursor-blink"></span>' },
];

export default function Hero() {
  const [roleIndex, setRoleIndex]   = useState(0);
  const [roleVisible, setRoleVisible] = useState(true);
  const [clock, setClock]           = useState("--:--:--");
  const [termStatus, setTermStatus] = useState(false);
  const [scrollHint, setScrollHint] = useState(false);

  /* reveal states */
  const [showBadge,  setShowBadge]  = useState(false);
  const [showSl,     setShowSl]     = useState(false);
  const [showName,   setShowName]   = useState(false);
  const [showHandle, setShowHandle] = useState(false);
  const [showDiv,    setShowDiv]    = useState(false);
  const [showRole,   setShowRole]   = useState(false);
  const [showRegs,   setShowRegs]   = useState(false);
  const [showCtas,   setShowCtas]   = useState(false);

  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const dropsRef   = useRef<number[]>([]);
  const frameRef   = useRef<number | null>(null);
  const termBodyRef = useRef<HTMLDivElement>(null);

  /* ── staggered reveals ── */
  useEffect(() => {
    const timers = [
      setTimeout(() => setShowBadge(true),  100),
      setTimeout(() => setShowSl(true),     200),
      setTimeout(() => setShowName(true),   150),
      setTimeout(() => setShowHandle(true), 350),
      setTimeout(() => setShowDiv(true),    500),
      setTimeout(() => setShowRole(true),   600),
      setTimeout(() => setShowRegs(true),   700),
      setTimeout(() => setShowCtas(true),   900),
      setTimeout(() => setTermStatus(true), 3200),
      setTimeout(() => setScrollHint(true), 2600),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  /* ── role rotator ── */
  useEffect(() => {
    const iv = setInterval(() => {
      setRoleVisible(false);
      setTimeout(() => {
        setRoleIndex((i) => (i + 1) % ROLES.length);
        setRoleVisible(true);
      }, 280);
    }, 2800);
    return () => clearInterval(iv);
  }, []);

  /* ── clock ── */
  useEffect(() => {
    const iv = setInterval(() => {
      const n = new Date();
      setClock(
        [n.getHours(), n.getMinutes(), n.getSeconds()]
          .map((v) => String(v).padStart(2, "0"))
          .join(":")
      );
    }, 1000);
    return () => clearInterval(iv);
  }, []);

  /* ── terminal line injector ── */
  useEffect(() => {
    const body = termBodyRef.current;
    if (!body) return;
    const timers = TERM_LINES.map(({ delay, html }) =>
      setTimeout(() => {
        const span = document.createElement("span");
        span.className = "hero-term-line";
        span.innerHTML = html || "&nbsp;";
        body.appendChild(span);
        body.scrollTop = body.scrollHeight;
      }, delay)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  /* ── glyph rain canvas ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const COL_W = 22;
    let W = 0, H = 0, cols = 0;

    const resize = () => {
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width = W;
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
      ctx.font = `11px "Space Mono", monospace`;
      for (let i = 0; i < cols; i++) {
        const x = i * COL_W + 4;
        const y = drops[i] * 18;
        const g = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        ctx.fillStyle = "rgba(223,255,0,0.5)";
        ctx.fillText(g, x, y);
        if (Math.random() > 0.5) {
          ctx.fillStyle = "rgba(223,255,0,0.15)";
          ctx.fillText(GLYPHS[Math.floor(Math.random() * GLYPHS.length)], x, y - 18);
        }
        drops[i] += 0.35 + Math.random() * 0.2;
        if (y > H && Math.random() > 0.975) drops[i] = Math.random() * -40;
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

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400&family=Syne:wght@400;700;800&display=swap');

        :root {
          --acc:  #DFFF00;
          --acc2: #00FFB2;
          --bg:   #060608;
          --bg2:  #0C0C10;
          --muted: #4a4a5a;
          --dimmed: #2a2a38;
          --txt:  #c8c8d8;
          --border: rgba(223,255,0,0.1);
        }

        /* ── keyframes ── */
        @keyframes hero-glitch-r {
          0%,87%,100% { opacity:0; transform:none; }
          88%  { opacity:.9; transform:translateX(4px); }
          89%  { opacity:.5; transform:translateX(-2px); }
          90%  { opacity:0; }
        }
        @keyframes hero-glitch-g {
          0%,87%,100% { opacity:0; transform:none; }
          88%  { opacity:.7; transform:translateX(-4px); }
          89.5%{ opacity:.4; transform:translateX(2px); }
          91%  { opacity:0; }
        }
        @keyframes hero-badge-sweep {
          0%,100% { transform:translateX(-100%); }
          50%     { transform:translateX(100%); }
        }
        @keyframes hero-pulse-dot {
          0%,100% { opacity:1; }
          50%     { opacity:.3; }
        }
        @keyframes hero-blink {
          0%,100% { opacity:1; }
          50%     { opacity:0; }
        }
        @keyframes hero-scroll-drop {
          0%   { top:-100%; }
          100% { top:100%; }
        }
        @keyframes hero-status-pulse {
          0%,100% { opacity:1; }
          50%     { opacity:.3; }
        }
        @keyframes hero-name-in {
          from { transform: translateY(100%); }
          to   { transform: translateY(0); }
        }

        /* ── terminal lines ── */
        .hero-term-line {
          display: block;
          white-space: pre;
          font-size: .72rem;
          line-height: 1.85;
          color: #c8c8d8;
        }
        .hero-term-line .prompt-sym { color: #DFFF00; margin-right: 6px; }
        .hero-term-line .cmd        { color: #00FFB2; }
        .hero-term-line .comment    { color: #4a4a5a; }
        .hero-term-line .key        { color: #C792EA; }
        .hero-term-line .val        { color: #DFFF00; }
        .hero-term-line .val2       { color: #82AAFF; }
        .hero-term-line .ok         { color: #C3E88D; }
        .hero-term-line .dim        { color: #4a4a5a; }
        .hero-term-line .cursor-blink {
          display: inline-block;
          width: 7px; height: 1em;
          background: #DFFF00;
          vertical-align: middle;
          margin-left: 2px;
          animation: hero-blink 1s step-end infinite;
        }

        /* ── name ghost layers ── */
        .hero-name-ghost {
          position: absolute; top: 0; left: 0;
          width: 100%; height: 100%;
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          pointer-events: none;
          opacity: 0;
        }
        .hero-name-ghost.r {
          color: #FF3366;
          clip-path: polygon(0 55%,100% 55%,100% 72%,0 72%);
          animation: hero-glitch-r 5s steps(1) infinite;
        }
        .hero-name-ghost.g {
          color: #00FFB2;
          clip-path: polygon(0 28%,100% 28%,100% 46%,0 46%);
          animation: hero-glitch-g 5s steps(1) infinite 0.5s;
        }
      `}</style>

      <section
        style={{
          fontFamily: "'Space Mono', monospace",
          background: "var(--bg)",
          minHeight: "100svh",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
          padding: "0 clamp(2rem,5vw,5rem)",
        }}
      >
        {/* ── glyph rain ── */}
        <canvas
          ref={canvasRef}
          aria-hidden
          style={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%",
            opacity: 0.3, pointerEvents: "none", zIndex: 0,
          }}
        />

        {/* ── scanlines ── */}
        <div
          aria-hidden
          style={{
            position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1,
            background: "repeating-linear-gradient(to bottom,transparent,transparent 3px,rgba(0,0,0,.12) 3px,rgba(0,0,0,.12) 4px)",
          }}
        />

        {/* ── vignette ── */}
        <div
          aria-hidden
          style={{
            position: "absolute", inset: 0, pointerEvents: "none", zIndex: 2,
            background: "radial-gradient(ellipse 90% 90% at 50% 50%,transparent 20%,rgba(6,6,8,.9) 100%)",
          }}
        />

        {/* ══════════ LEFT COLUMN ══════════ */}
        <div
          style={{
            position: "relative", zIndex: 10,
            display: "flex", flexDirection: "column", justifyContent: "center",
            paddingRight: "3rem",
            borderRight: "1px solid var(--border)",
            minHeight: "100svh",
          }}
        >
          {/* corner bracket — top left */}
          <svg
            aria-hidden
            width="28" height="28" viewBox="0 0 28 28" fill="none"
            style={{ position: "absolute", top: "1.5rem", left: 0, opacity: .25 }}
          >
            <path d="M2 24 L2 2 L24 2" stroke="#DFFF00" strokeWidth="1.5" strokeLinecap="square"/>
          </svg>

          {/* dividing glow on border */}
          <div
            aria-hidden
            style={{
              position: "absolute", right: -1, top: "20%", height: "60%", width: 1,
              background: "linear-gradient(to bottom,transparent,#DFFF00,transparent)",
              opacity: .35,
            }}
          />

          {/* available badge */}
          <div
            style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              fontSize: ".58rem", color: "var(--muted)",
              letterSpacing: ".14em", textTransform: "uppercase",
              border: "1px solid rgba(223,255,0,.12)",
              padding: ".3rem .8rem", borderRadius: 999,
              marginBottom: "1.4rem",
              position: "relative", overflow: "hidden",
              width: "fit-content",
              opacity: showBadge ? 1 : 0,
              transition: "opacity .4s",
            }}
          >
            <span
              aria-hidden
              style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(90deg,transparent,rgba(223,255,0,.04),transparent)",
                animation: "hero-badge-sweep 3s ease-in-out infinite",
              }}
            />
            <span
              style={{
                width: 6, height: 6, borderRadius: "50%",
                background: "var(--acc)",
                boxShadow: "0 0 6px var(--acc)",
                animation: "hero-pulse-dot 1.6s ease-in-out infinite",
                flexShrink: 0,
              }}
            />
            Available for interesting projects
          </div>

          {/* sys.identity label */}
          <p
            style={{
              fontSize: ".6rem", letterSpacing: ".2em",
              textTransform: "uppercase", color: "var(--muted)",
              marginBottom: "1.4rem",
              opacity: showSl ? 1 : 0,
              transform: showSl ? "none" : "translateY(8px)",
              transition: "opacity .4s, transform .4s",
            }}
          >
            // sys.identity
          </p>

          {/* name */}
          <div style={{ overflow: "hidden", marginBottom: ".3rem" }}>
            <h1
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 800,
                fontSize: "clamp(3.5rem,9vw,7rem)",
                color: "var(--acc)",
                letterSpacing: "-.04em",
                lineHeight: 0.95,
                textShadow: "0 0 80px rgba(223,255,0,.2)",
                transform: showName ? "translateY(0)" : "translateY(100%)",
                transition: "transform .7s cubic-bezier(.16,1,.3,1)",
                display: "block",
                position: "relative",
                margin: 0,
              }}
            >
              Byt3Mage
              <span className="hero-name-ghost r" aria-hidden>Byt3Mage</span>
              <span className="hero-name-ghost g" aria-hidden>Byt3Mage</span>
            </h1>
          </div>

          {/* handle */}
          <p
            style={{
              fontSize: "clamp(.55rem,1.1vw,.7rem)",
              color: "var(--muted)",
              letterSpacing: ".3em",
              textTransform: "uppercase",
              marginTop: ".5rem",
              marginBottom: "1.8rem",
              opacity: showHandle ? 1 : 0,
              transition: "opacity .4s .3s",
            }}
          >
            Ireoluwa Alayaki
          </p>

          {/* divider */}
          <div
            style={{
              display: "flex", alignItems: "center", gap: 10,
              marginBottom: "1.6rem",
              opacity: showDiv ? 1 : 0,
              transition: "opacity .4s .5s",
            }}
          >
            <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg,var(--border),transparent)" }}/>
            <div style={{ width: 5, height: 5, background: "var(--acc)", transform: "rotate(45deg)", opacity: .5 }}/>
            <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg,transparent,var(--border))" }}/>
          </div>

          {/* role rotator */}
          <div
            style={{
              height: "1.4rem", overflow: "hidden",
              marginBottom: "1.4rem",
              opacity: showRole ? 1 : 0,
              transition: "opacity .4s .55s",
            }}
          >
            <span
              style={{
                display: "block",
                fontSize: ".75rem",
                color: "var(--acc2)",
                letterSpacing: ".18em",
                textTransform: "uppercase",
                opacity: roleVisible ? 1 : 0,
                transform: roleVisible ? "translateY(0)" : "translateY(10px)",
                transition: "opacity .25s, transform .25s",
              }}
            >
              {ROLES[roleIndex]}
            </span>
          </div>

          {/* register-style specs */}
          <div
            style={{
              display: "flex", flexDirection: "column", gap: ".5rem",
              marginBottom: "2rem",
              opacity: showRegs ? 1 : 0,
              transition: "opacity .4s .7s",
            }}
          >
            {[
              { k: "ARCH",   v: <><span style={{ color: "var(--acc)", fontWeight: 700 }}>x86_64 / ARM</span></> },
              { k: "LANG",   v: <>C / C++ <span style={{ color: "var(--dimmed)" }}>·</span> Rust</> },
              { k: "DOMAIN", v: <>Game Engines <span style={{ color: "var(--dimmed)" }}>·</span> Low-level Systems</> },
              { k: "STATUS", v: <span style={{ color: "#C3E88D" }}>ONLINE ▪ BUILDING</span> },
            ].map(({ k, v }) => (
              <div key={k} style={{ display: "flex", alignItems: "center", fontSize: ".62rem" }}>
                <span style={{ color: "var(--muted)", letterSpacing: ".12em", textTransform: "uppercase", width: 70, flexShrink: 0 }}>
                  {k}
                </span>
                <span style={{ color: "var(--dimmed)", margin: "0 6px" }}>::</span>
                <span style={{ color: "var(--txt)", letterSpacing: ".06em" }}>{v}</span>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div
            style={{
              display: "flex", gap: ".8rem", flexWrap: "wrap",
              opacity: showCtas ? 1 : 0,
              transition: "opacity .4s .85s",
            }}
          >
            <a
              href="https://github.com/Byt3Mage"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: 7,
                fontFamily: "'Space Mono', monospace",
                fontSize: ".68rem", fontWeight: 700,
                letterSpacing: ".1em", textTransform: "uppercase",
                textDecoration: "none",
                padding: ".65rem 1.4rem", borderRadius: 3,
                background: "var(--acc)", color: "#060608",
                boxShadow: "0 0 18px rgba(223,255,0,.2)",
                transition: "transform .2s, box-shadow .2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 0 30px rgba(223,255,0,.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 0 18px rgba(223,255,0,.2)";
              }}
            >
              <GithubIcon />
              GitHub
            </a>
            <a
              href="#contact"
              style={{
                display: "inline-flex", alignItems: "center", gap: 7,
                fontFamily: "'Space Mono', monospace",
                fontSize: ".68rem",
                letterSpacing: ".1em", textTransform: "uppercase",
                textDecoration: "none",
                padding: ".65rem 1.4rem", borderRadius: 3,
                background: "transparent", color: "var(--txt)",
                border: "1px solid rgba(200,200,216,.15)",
                transition: "transform .2s, border-color .2s, color .2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.borderColor = "rgba(200,200,216,.35)";
                e.currentTarget.style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.borderColor = "rgba(200,200,216,.15)";
                e.currentTarget.style.color = "var(--txt)";
              }}
            >
              Get in touch
            </a>
          </div>

          {/* corner bracket — bottom left */}
          <svg
            aria-hidden
            width="28" height="28" viewBox="0 0 28 28" fill="none"
            style={{ position: "absolute", bottom: "1.5rem", left: 0, opacity: .25, transform: "scaleY(-1)" }}
          >
            <path d="M2 24 L2 2 L24 2" stroke="#DFFF00" strokeWidth="1.5" strokeLinecap="square"/>
          </svg>
        </div>

        {/* ══════════ RIGHT COLUMN — terminal ══════════ */}
        <div
          style={{
            position: "relative", zIndex: 10,
            display: "flex", flexDirection: "column", justifyContent: "center",
            paddingLeft: "3rem",
          }}
        >
          <div
            style={{
              background: "rgba(12,12,16,.85)",
              border: "1px solid rgba(223,255,0,.08)",
              borderRadius: 6,
              overflow: "hidden",
              maxWidth: 480,
              width: "100%",
            }}
          >
            {/* terminal title bar */}
            <div
              style={{
                display: "flex", alignItems: "center", gap: 6,
                padding: ".5rem .8rem",
                background: "rgba(223,255,0,.04)",
                borderBottom: "1px solid rgba(223,255,0,.07)",
              }}
            >
              {[
                { bg: "#FF5F57" },
                { bg: "#FEBC2E" },
                { bg: "#28C840" },
              ].map(({ bg }, i) => (
                <span key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: bg, opacity: .7 }}/>
              ))}
              <span
                style={{
                  marginLeft: "auto", marginRight: "auto",
                  fontSize: ".58rem", color: "var(--muted)",
                  letterSpacing: ".12em", textTransform: "uppercase",
                }}
              >
                byt3mage :: sysinfo
              </span>
            </div>

            {/* terminal body */}
            <div
              ref={termBodyRef}
              style={{
                padding: "1.2rem 1.2rem 1.4rem",
                minHeight: 320,
                overflowY: "auto",
              }}
            />

            {/* status bar */}
            <div
              style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: ".4rem 1.2rem",
                borderTop: "1px solid rgba(223,255,0,.06)",
                fontSize: ".58rem", color: "var(--muted)",
                letterSpacing: ".1em",
                opacity: termStatus ? 1 : 0,
                transition: "opacity .4s",
              }}
            >
              <span>
                <span
                  style={{
                    display: "inline-block", width: 5, height: 5, borderRadius: "50%",
                    background: "var(--acc2)", marginRight: 5,
                    animation: "hero-status-pulse 2s ease-in-out infinite",
                  }}
                />
                session active
              </span>
              <span style={{ fontVariantNumeric: "tabular-nums" }}>{clock}</span>
              <span>TTY/0</span>
            </div>
          </div>
        </div>

        {/* ── scroll hint ── */}
        <a
          href="#about"
          aria-label="Scroll down"
          style={{
            position: "absolute", bottom: "2rem", left: "50%",
            transform: "translateX(-50%)",
            display: "flex", flexDirection: "column", alignItems: "center", gap: 5,
            zIndex: 10, textDecoration: "none",
            opacity: scrollHint ? 1 : 0,
            transition: "opacity .4s 2.5s",
          }}
        >
          <span
            style={{
              fontSize: ".5rem", color: "var(--muted)",
              letterSpacing: ".2em", textTransform: "uppercase",
            }}
          >
            scroll
          </span>
          <div
            style={{
              width: 1, height: 30,
              background: "rgba(223,255,0,.12)",
              position: "relative", overflow: "hidden",
            }}
          >
            <span
              aria-hidden
              style={{
                position: "absolute", top: "-100%", left: 0,
                width: "100%", height: "100%",
                background: "linear-gradient(to bottom,transparent,#DFFF00)",
                animation: "hero-scroll-drop 2s ease-in-out infinite",
              }}
            />
          </div>
        </a>
      </section>
    </>
  );
}

function GithubIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
    </svg>
  );
}