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
  { delay: 200,  html: '<span class="h-ps">▶</span><span class="h-cmd">whoami</span>' },
  { delay: 600,  html: '<span class="h-val">byt3mage</span> <span class="h-cmt">// Ireoluwa Alayaki</span>' },
  { delay: 900,  html: "" },
  { delay: 1000, html: '<span class="h-ps">▶</span><span class="h-cmd">cat</span> <span class="h-val2">./profile.toml</span>' },
  { delay: 1300, html: '<span class="h-key">[identity]</span>' },
  { delay: 1450, html: '  name    <span class="h-dim">=</span> <span class="h-val">"Byt3Mage"</span>' },
  { delay: 1580, html: '  focus   <span class="h-dim">=</span> <span class="h-val">"systems · engines · tools"</span>' },
  { delay: 1710, html: '  years   <span class="h-dim">=</span> <span class="h-val2">∞</span>' },
  { delay: 1850, html: "" },
  { delay: 1900, html: '<span class="h-key">[stack]</span>' },
  { delay: 2050, html: '  primary <span class="h-dim">=</span> [<span class="h-val">"C"</span>, <span class="h-val">"C++"</span>, <span class="h-val">"Rust"</span>]' },
  { delay: 2200, html: '  target  <span class="h-dim">=</span> <span class="h-val">"bare metal"</span>' },
  { delay: 2340, html: "" },
  { delay: 2380, html: '<span class="h-ps">▶</span><span class="h-cmd">systemctl</span> status byt3mage' },
  { delay: 2700, html: '  <span class="h-ok">● byt3mage.service</span>' },
  { delay: 2850, html: '    Loaded: loaded <span class="h-cmt">(production-ready)</span>' },
  { delay: 2980, html: '    Active: <span class="h-ok">active (running)</span> <span class="h-cmt">since epoch</span>' },
  { delay: 3100, html: "" },
  { delay: 3150, html: '<span class="h-ps">▶</span> <span class="h-cursor"></span>' },
];

const SPECS = [
  { k: "ARCH",   v: "x86_64 / ARM",                    accent: true,  ok: false },
  { k: "LANG",   v: "C / C++ · Rust",                  accent: false, ok: false },
  { k: "DOMAIN", v: "Game Engines · Low-level Systems", accent: false, ok: false },
  { k: "STATUS", v: "ONLINE ▪ BUILDING",                accent: false, ok: true  },
];

const HERO_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400&family=Syne:wght@400;700;800&display=swap');

  :root {
    --hero-bg:     #060608;
    --hero-muted:  #4a4a5a;
    --hero-txt:    #c8c8d8;
    --hero-border: rgba(223,255,0,0.1);
  }

  @keyframes h-glitch-r {
    0%,87%,100%{opacity:0;transform:none}
    88%{opacity:.9;transform:translateX(4px)}
    89%{opacity:.5;transform:translateX(-2px)}
    90%{opacity:0}
  }
  @keyframes h-glitch-g {
    0%,87%,100%{opacity:0;transform:none}
    88%{opacity:.7;transform:translateX(-4px)}
    89.5%{opacity:.4;transform:translateX(2px)}
    91%{opacity:0}
  }
  @keyframes h-sweep  { 0%,100%{transform:translateX(-100%)} 50%{transform:translateX(100%)} }
  @keyframes h-pulse  { 0%,100%{opacity:1} 50%{opacity:.3} }
  @keyframes h-blink  { 0%,100%{opacity:1} 50%{opacity:0} }
  @keyframes h-drop   { 0%{top:-100%} 100%{top:100%} }

  /* ── terminal line colours ── */
  .h-line {
    display: block;
    white-space: pre;
    font-family: 'Space Mono', monospace;
    font-size: .72rem;
    line-height: 1.85;
    color: var(--hero-txt);
  }
  .h-ps   { color: var(--accent); margin-right: 6px; }
  .h-cmd  { color: var(--accent-secondary); }
  .h-cmt  { color: var(--hero-muted); }
  .h-key  { color: #C792EA; }
  .h-val  { color: var(--accent); }
  .h-val2 { color: #82AAFF; }
  .h-ok   { color: #C3E88D; }
  .h-dim  { color: var(--hero-muted); }
  .h-cursor {
    display: inline-block;
    width: 7px; height: 1em;
    background: var(--accent);
    vertical-align: middle;
    margin-left: 2px;
    animation: h-blink 1s step-end infinite;
  }

  /* ── name glitch ghosts ── */
  .h-ghost {
    position: absolute; top: 0; left: 0;
    width: 100%; height: 100%;
    font-family: 'Syne', sans-serif;
    font-weight: 800;
    font-size: inherit;
    letter-spacing: inherit;
    line-height: inherit;
    pointer-events: none;
    opacity: 0;
  }
  .h-ghost-r {
    color: #FF3366;
    clip-path: polygon(0 55%,100% 55%,100% 72%,0 72%);
    animation: h-glitch-r 5s steps(1) infinite;
  }
  .h-ghost-g {
    color: #00FFB2;
    clip-path: polygon(0 28%,100% 28%,100% 46%,0 46%);
    animation: h-glitch-g 5s steps(1) infinite .5s;
  }

  /* ── mobile: wrap long terminal lines instead of overflow ── */
  @media (max-width: 767px) {
    .h-line {
      font-size: .64rem;
      white-space: pre-wrap;
      word-break: break-all;
    }
  }
`;

export default function Hero() {
  const [roleIndex,   setRoleIndex]   = useState(0);
  const [roleVisible, setRoleVisible] = useState(true);
  const [clock,       setClock]       = useState("--:--:--");
  const [termStatus,  setTermStatus]  = useState(false);
  const [scrollHint,  setScrollHint]  = useState(false);
  const [isMobile,    setIsMobile]    = useState(false);

  const [show, setShow] = useState({
    badge: false, sl: false, name: false, handle: false,
    div: false, role: false, regs: false, ctas: false, term: false,
  });

  const canvasRef   = useRef<HTMLCanvasElement>(null);
  const dropsRef    = useRef<number[]>([]);
  const frameRef    = useRef<number | null>(null);
  const termBodyRef = useRef<HTMLDivElement>(null);

  /* ── detect mobile breakpoint ── */
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  /* ── staggered reveals ── */
  useEffect(() => {
    const seq: [keyof typeof show, number][] = [
      ["badge",  100], ["sl",   200], ["name", 150],
      ["handle", 350], ["div",  500], ["role", 600],
      ["regs",   700], ["ctas", 900], ["term", 400],
    ];
    const timers = seq.map(([key, delay]) =>
      setTimeout(() => setShow((s) => ({ ...s, [key]: true })), delay)
    );
    const t1 = setTimeout(() => setTermStatus(true), 3200);
    const t2 = setTimeout(() => setScrollHint(true), 2600);
    return () => { timers.forEach(clearTimeout); clearTimeout(t1); clearTimeout(t2); };
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

  /* ── live clock ── */
  useEffect(() => {
    const tick = () => {
      const n = new Date();
      setClock(
        [n.getHours(), n.getMinutes(), n.getSeconds()]
          .map((v) => String(v).padStart(2, "0"))
          .join(":")
      );
    };
    tick();
    const iv = setInterval(tick, 1000);
    return () => clearInterval(iv);
  }, []);

  /* ── terminal line injector ── */
  useEffect(() => {
    const body = termBodyRef.current;
    if (!body) return;
    body.innerHTML = "";
    const timers = TERM_LINES.map(({ delay, html }) =>
      setTimeout(() => {
        const span = document.createElement("span");
        span.className = "h-line";
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
      canvas.width  = W;
      canvas.height = H;
      cols = Math.ceil(W / COL_W);
      const prev = dropsRef.current;
      dropsRef.current = Array.from({ length: cols }, (_, i) =>
        prev[i] !== undefined ? prev[i] : Math.random() * -80
      );
    };

    const drawFrame = () => {
      const drops = dropsRef.current;
      ctx.fillStyle = "rgba(6,6,8,0.15)";
      ctx.fillRect(0, 0, W, H);
      ctx.font = `11px "Space Mono", monospace`;
      for (let i = 0; i < cols; i++) {
        const x = i * COL_W + 4;
        const y = drops[i] * 18;
        ctx.fillStyle = "rgba(223,255,0,0.5)";
        ctx.fillText(GLYPHS[Math.floor(Math.random() * GLYPHS.length)], x, y);
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

  /* ── fade helper ── */
  const fade = (visible: boolean, extraDelay = "0s"): React.CSSProperties => ({
    opacity:   visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(10px)",
    transition: `opacity .4s ${extraDelay}, transform .4s ${extraDelay}`,
  });

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: HERO_CSS }} />

      {/* ════════════════ SECTION ════════════════ */}
      <section
        style={{
          fontFamily: "'Space Mono', monospace",
          background: "var(--hero-bg)",
          minHeight: "100svh",
          position: "relative",
          overflow: isMobile ? "visible" : "hidden",
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          alignItems: isMobile ? "start" : "center",
          padding: isMobile
            ? "5rem 1.5rem 5rem"          /* mobile: generous top/bottom breathing room */
            : "0 clamp(2rem, 5vw, 5rem)", /* desktop: horizontal padding only */
          rowGap: isMobile ? "2.5rem" : 0,
        }}
      >
        {/* glyph rain */}
        <canvas
          ref={canvasRef}
          aria-hidden
          style={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%",
            opacity: isMobile ? 0.15 : 0.3,
            pointerEvents: "none", zIndex: 0,
          }}
        />

        {/* scanlines */}
        <div aria-hidden style={{
          position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1,
          background: "repeating-linear-gradient(to bottom,transparent,transparent 3px,rgba(0,0,0,.12) 3px,rgba(0,0,0,.12) 4px)",
        }}/>

        {/* vignette */}
        <div aria-hidden style={{
          position: "absolute", inset: 0, pointerEvents: "none", zIndex: 2,
          background: "radial-gradient(ellipse 90% 90% at 50% 50%,transparent 20%,rgba(6,6,8,.9) 100%)",
        }}/>

        {/* ════════════ LEFT — IDENTITY ════════════ */}
        <div style={{
          position: "relative", zIndex: 10,
          display: "flex", flexDirection: "column", justifyContent: "center",
          borderRight:   isMobile ? "none" : "1px solid var(--hero-border)",
          borderBottom:  isMobile ? "1px solid var(--hero-border)" : "none",
          paddingRight:  isMobile ? 0 : "3rem",
          paddingBottom: isMobile ? "2.5rem" : 0,
          minHeight:     isMobile ? "auto" : "100svh",
        }}>
          {/* top-left corner bracket */}
          <svg aria-hidden width="28" height="28" viewBox="0 0 28 28" fill="none"
            style={{ position: "absolute", top: isMobile ? 0 : "1.5rem", left: 0, opacity: .25 }}>
            <path d="M2 24 L2 2 L24 2" stroke="#DFFF00" strokeWidth="1.5" strokeLinecap="square"/>
          </svg>

          {/* right-border vertical glow — desktop only */}
          {!isMobile && (
            <div aria-hidden style={{
              position: "absolute", right: -1, top: "20%", height: "60%", width: 1,
              background: "linear-gradient(to bottom,transparent,#DFFF00,transparent)",
              opacity: .35,
            }}/>
          )}

          {/* available badge */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            fontSize: ".58rem", color: "var(--hero-muted)",
            letterSpacing: ".14em", textTransform: "uppercase",
            border: "1px solid rgba(223,255,0,.12)",
            padding: ".3rem .8rem", borderRadius: 999,
            marginBottom: "1.4rem",
            marginTop: isMobile ? ".25rem" : 0,
            position: "relative", overflow: "hidden",
            width: "fit-content",
            ...fade(show.badge),
          }}>
            <span aria-hidden style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(90deg,transparent,rgba(223,255,0,.04),transparent)",
              animation: "h-sweep 3s ease-in-out infinite",
            }}/>
            <span style={{
              width: 6, height: 6, borderRadius: "50%",
              background: "var(--accent)", boxShadow: "0 0 6px var(--accent)",
              animation: "h-pulse 1.6s ease-in-out infinite", flexShrink: 0,
            }}/>
            Available for interesting projects
          </div>

          {/* sys label */}
          <p style={{
            fontSize: ".6rem", letterSpacing: ".2em",
            textTransform: "uppercase", color: "var(--hero-muted)",
            marginBottom: "1.2rem",
            ...fade(show.sl),
          }}>
            // sys.identity
          </p>

          {/* name */}
          <div style={{ overflow: "hidden", marginBottom: ".3rem" }}>
            <h1 style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: isMobile ? "clamp(3rem, 18vw, 5rem)" : "clamp(3.5rem, 9vw, 7rem)",
              color: "var(--accent)",
              letterSpacing: "-.04em",
              lineHeight: 0.95,
              textShadow: "0 0 80px rgba(223,255,0,.2)",
              transform: show.name ? "translateY(0)" : "translateY(100%)",
              transition: "transform .7s cubic-bezier(.16,1,.3,1)",
              display: "block",
              position: "relative",
              margin: 0,
            }}>
              Byt3Mage
              <span className="h-ghost h-ghost-r" aria-hidden>Byt3Mage</span>
              <span className="h-ghost h-ghost-g" aria-hidden>Byt3Mage</span>
            </h1>
          </div>

          {/* handle */}
          <p style={{
            fontSize: isMobile ? ".6rem" : "clamp(.55rem, 1.1vw, .7rem)",
            color: "var(--hero-muted)",
            letterSpacing: ".3em", textTransform: "uppercase",
            marginTop: ".5rem", marginBottom: "1.6rem",
            ...fade(show.handle, ".1s"),
          }}>
            Ireoluwa Alayaki
          </p>

          {/* divider */}
          <div style={{
            display: "flex", alignItems: "center", gap: 10,
            marginBottom: "1.4rem",
            ...fade(show.div, ".2s"),
          }}>
            <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg,var(--border),transparent)" }}/>
            <div style={{ width: 5, height: 5, background: "var(--acc)", transform: "rotate(45deg)", opacity: .5 }}/>
            <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg,transparent,var(--border))" }}/>
          </div>

          {/* role rotator */}
          <div style={{
            height: "1.4rem", overflow: "hidden",
            marginBottom: "1.4rem",
            ...fade(show.role, ".25s"),
          }}>
            <span style={{
              display: "block",
              fontSize: isMobile ? ".65rem" : ".75rem",
              color: "var(--accent-secondary)",
              letterSpacing: ".18em", textTransform: "uppercase",
              opacity:    roleVisible ? 1 : 0,
              transform:  roleVisible ? "translateY(0)" : "translateY(10px)",
              transition: "opacity .25s, transform .25s",
            }}>
              {ROLES[roleIndex]}
            </span>
          </div>

          {/* register specs */}
          <div style={{
            display: "flex", flexDirection: "column",
            gap: isMobile ? ".55rem" : ".5rem",
            marginBottom: "2rem",
            ...fade(show.regs, ".35s"),
          }}>
            {SPECS.map(({ k, v, accent, ok }) => (
              <div key={k} style={{
                display: "flex", alignItems: "flex-start",
                fontSize: isMobile ? ".6rem" : ".62rem",
              }}>
                <span style={{
                  color: "var(--hero-muted)", letterSpacing: ".12em",
                  textTransform: "uppercase",
                  width: isMobile ? 58 : 70, flexShrink: 0,
                }}>
                  {k}
                </span>
                <span style={{ color: "var(--text-dimmed)", margin: "0 6px", flexShrink: 0 }}>::</span>
                <span style={{
                  color:      ok ? "#C3E88D" : accent ? "var(--accent)" : "var(--hero-txt)",
                  fontWeight: accent ? 700 : 400,
                  letterSpacing: ".06em",
                  lineHeight: 1.4,
                  wordBreak: "break-word",
                }}>
                  {v}
                </span>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div style={{
            display: "flex",
            gap: ".8rem",
            flexWrap: "nowrap",
            width: isMobile ? "100%" : "auto",
            ...fade(show.ctas, ".5s"),
          }}>
            {/* primary */}
            <a
              href="https://github.com/Byt3Mage"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center",
                justifyContent: "center", gap: 7,
                fontFamily: "'Space Mono', monospace",
                fontSize: ".68rem", fontWeight: 700,
                letterSpacing: ".1em", textTransform: "uppercase",
                textDecoration: "none",
                padding: ".7rem 1.4rem",
                minHeight: 48, /* WCAG tap target */
                borderRadius: 3,
                background: "var(--accent)", color: "#060608",
                boxShadow: "0 0 18px rgba(223,255,0,.2)",
                transition: "transform .2s, box-shadow .2s",
                flex: isMobile ? 1 : "none",
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

            {/* outline */}
            <a
              href="#contact"
              style={{
                display: "inline-flex", alignItems: "center",
                justifyContent: "center", gap: 7,
                fontFamily: "'Space Mono', monospace",
                fontSize: ".68rem",
                letterSpacing: ".1em", textTransform: "uppercase",
                textDecoration: "none",
                padding: ".7rem 1.4rem",
                minHeight: 48,
                borderRadius: 3,
                background: "transparent", color: "var(--hero-txt)",
                border: "1px solid rgba(200,200,216,.15)",
                transition: "transform .2s, border-color .2s, color .2s",
                flex: isMobile ? 1 : "none",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.borderColor = "rgba(200,200,216,.35)";
                e.currentTarget.style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.borderColor = "rgba(200,200,216,.15)";
                e.currentTarget.style.color = "var(--hero-txt)";
              }}
            >
              Get in touch
            </a>
          </div>

          {/* bottom-left corner bracket — desktop only */}
          {!isMobile && (
            <svg aria-hidden width="28" height="28" viewBox="0 0 28 28" fill="none"
              style={{ position: "absolute", bottom: "1.5rem", left: 0, opacity: .25, transform: "scaleY(-1)" }}>
              <path d="M2 24 L2 2 L24 2" stroke="#DFFF00" strokeWidth="1.5" strokeLinecap="square"/>
            </svg>
          )}
        </div>

        {/* ════════════ RIGHT — TERMINAL ════════════ */}
        <div style={{
          position: "relative", zIndex: 10,
          display: "flex", flexDirection: "column", justifyContent: "center",
          paddingLeft: isMobile ? 0 : "3rem",
          opacity: show.term ? 1 : 0,
          transform: show.term ? "translateY(0)" : "translateY(16px)",
          transition: "opacity .5s .3s, transform .5s .3s",
        }}>
          <div style={{
            background: "rgba(12,12,16,.9)",
            border: "1px solid rgba(223,255,0,.08)",
            borderRadius: 6,
            overflow: "hidden",
            width: "100%",
            maxWidth: isMobile ? "100%" : 480,
          }}>
            {/* title bar */}
            <div style={{
              display: "flex", alignItems: "center", gap: 6,
              padding: ".5rem .8rem",
              background: "rgba(223,255,0,.04)",
              borderBottom: "1px solid rgba(223,255,0,.07)",
            }}>
              {["#FF5F57", "#FEBC2E", "#28C840"].map((bg, i) => (
                <span key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: bg, opacity: .7 }}/>
              ))}
              <span style={{
                marginLeft: "auto", marginRight: "auto",
                fontSize: ".58rem", color: "var(--hero-muted)",
                letterSpacing: ".12em", textTransform: "uppercase",
              }}>
                byt3mage :: sysinfo
              </span>
            </div>

            {/* body */}
            <div
              ref={termBodyRef}
              style={{
                padding: "1.1rem 1.1rem 1.3rem",
                minHeight: isMobile ? 180 : 300,
                maxHeight: isMobile ? 220 : 360,
                overflowY: "auto",
                overflowX: "hidden",
                overscrollBehavior: "contain",
              }}
            />

            {/* status bar */}
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: ".4rem 1.1rem",
              borderTop: "1px solid rgba(223,255,0,.06)",
              fontSize: ".58rem", color: "var(--hero-muted)",
              letterSpacing: ".1em",
              opacity: termStatus ? 1 : 0,
              transition: "opacity .4s",
            }}>
              <span>
                <span style={{
                  display: "inline-block", width: 5, height: 5, borderRadius: "50%",
                  background: "var(--accent-secondary)", marginRight: 5,
                  animation: "h-pulse 2s ease-in-out infinite",
                }}/>
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
            position: "absolute",
            bottom: isMobile ? "1rem" : "2rem",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex", flexDirection: "column", alignItems: "center", gap: 5,
            zIndex: 10, textDecoration: "none",
            opacity: scrollHint ? 1 : 0,
            transition: "opacity .4s",
          }}
        >
          <span style={{
            fontSize: ".5rem", color: "var(--hero-muted)",
            letterSpacing: ".2em", textTransform: "uppercase",
          }}>
            scroll
          </span>
          <div style={{
            width: 1, height: isMobile ? 20 : 30,
            background: "rgba(223,255,0,.12)",
            position: "relative", overflow: "hidden",
          }}>
            <span aria-hidden style={{
              position: "absolute", top: "-100%", left: 0,
              width: "100%", height: "100%",
              background: "linear-gradient(to bottom,transparent,#DFFF00)",
              animation: "h-drop 2s ease-in-out infinite",
            }}/>
          </div>
        </a>
      </section>
    </>
  );
}

function GithubIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
    </svg>
  );
}