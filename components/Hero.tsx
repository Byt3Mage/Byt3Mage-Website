"use client";

import { useEffect, useRef, useState } from "react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const ROLES = [
  "Systems Programmer",
  "Game Engine Developer",
  "Systems Solutions Architect",
];

const GLYPHS =
  "01アイウエオカキクケコサシスセソタチツテトナニヌネノ∅∃∀∇∆⊕⊗ABCDEF0123456789";

const SPECS = [
  { k: "ARCH",   v: "x86_64 / ARM",                     accent: true,  ok: false },
  { k: "LANG",   v: "C / C++ · Rust",                   accent: false, ok: false },
  { k: "DOMAIN", v: "Game Engines · Low-level Systems",  accent: false, ok: false },
  { k: "STATUS", v: "ONLINE ▪ BUILDING",                 accent: false, ok: true  },
];

// Boot overlay lines — spread over ~4s
const BOOT_LINES = [
  { t: 0,    text: "BYT3MAGE BIOS v2.4.1  © 2024 Byt3Corp",             color: "#DFFF00" },
  { t: 180,  text: "CPU: x86_64 @ 4.2GHz  [OK]",                         color: "#c8c8d8" },
  { t: 360,  text: "Initialising memory controller...",                   color: "#4a4a5a" },
  { t: 540,  text: "RAM: 32768MB DDR5  [OK]",                             color: "#c8c8d8" },
  { t: 780,  text: "Checking storage devices...",                         color: "#4a4a5a" },
  { t: 980,  text: "nvme0n1: 2TB NVMe SSD  [OK]",                        color: "#c8c8d8" },
  { t: 1160, text: "Loading kernel image..............",                  color: "#4a4a5a" },
  { t: 1500, text: "kernel: Loaded at 0xFFFFFFFF80000000",                color: "#00FFB2" },
  { t: 1700, text: "kernel: Mounting root filesystem  [OK]",              color: "#c8c8d8" },
  { t: 1900, text: "kernel: Initialising network interfaces...",          color: "#4a4a5a" },
  { t: 2100, text: "eth0: link up 1000Mbps  [OK]",                       color: "#c8c8d8" },
  { t: 2300, text: "systemd[1]: Starting identity.service...",            color: "#4a4a5a" },
  { t: 2650, text: "systemd[1]: Started identity.service  [OK]",         color: "#DFFF00" },
  { t: 2900, text: "systemd[1]: Reached target multi-user.target  [OK]", color: "#c8c8d8" },
  { t: 3150, text: "kernel: All systems nominal.",                         color: "#00FFB2" },
  { t: 3400, text: "",                                                     color: ""        },
  { t: 3500, text: "Welcome, operator.",                                   color: "#DFFF00" },
];

// Terminal lines with per-character typing
const TERM_LINES: { delay: number; text: string; html?: string; speed?: number }[] = [
  { delay: 200,  text: "▶ whoami",                                                    speed: 40  },
  { delay: 700,  text: "byt3mage // Ireoluwa Alayaki",                                speed: 18  },
  { delay: 1050, text: "",                                                             speed: 0   },
  { delay: 1100, text: "▶ cat ./profile.toml",                                        speed: 38  },
  { delay: 1520, text: "[identity]",                                                   speed: 22  },
  { delay: 1720, text: '  name    = "Byt3Mage"',                                      speed: 18  },
  { delay: 1920, text: '  focus   = "systems · engines · tools"',                     speed: 16  },
  { delay: 2150, text: "  years   = ∞",                                                speed: 20  },
  { delay: 2350, text: "",                                                             speed: 0   },
  { delay: 2400, text: "[stack]",                                                      speed: 22  },
  { delay: 2580, text: '  primary = ["C", "C++", "Rust"]',                            speed: 18  },
  { delay: 2800, text: '  target  = "bare metal"',                                    speed: 18  },
  { delay: 3050, text: "",                                                             speed: 0   },
  { delay: 3100, text: "▶ systemctl status byt3mage",                                 speed: 36  },
  { delay: 3560, text: "  ● byt3mage.service",                                        speed: 22  },
  { delay: 3760, text: "    Loaded: loaded (production-ready)",                        speed: 16  },
  { delay: 3960, text: "    Active: active (running) since epoch",                    speed: 16  },
  { delay: 4160, text: "",                                                             speed: 0   },
  { delay: 4200, text: "▶ _",                                                         speed: 0   },
];

// CSS -------------------------------------------------------------------------

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400&family=Syne:wght@400;700;800;900&display=swap');

  :root {
    --hero-bg:      #060608;
    --hero-muted:   #4a4a5a;
    --hero-txt:     #c8c8d8;
    --hero-border:  rgba(223,255,0,0.1);
    --acc:          #DFFF00;
    --acc2:         #00FFB2;
  }

  /* ── Keyframes ── */
  @keyframes h-blink   { 0%,100%{opacity:1} 50%{opacity:0} }
  @keyframes h-pulse   { 0%,100%{opacity:1} 50%{opacity:.3} }
  @keyframes h-sweep   { 0%,100%{transform:translateX(-100%)} 50%{transform:translateX(100%)} }
  @keyframes h-drop    { 0%{top:-100%} 100%{top:100%} }
  @keyframes h-flicker { 0%,19%,21%,23%,25%,54%,56%,100%{opacity:1} 20%,22%,24%,55%{opacity:.4} }
  @keyframes h-scanmove{ 0%{background-position:0 0} 100%{background-position:0 100%} }
  @keyframes h-grain   { 0%,100%{transform:translate(0,0)} 10%{transform:translate(-1%,-1%)} 20%{transform:translate(1%,0)} 30%{transform:translate(0,1%)} 40%{transform:translate(-1%,1%)} 50%{transform:translate(1%,-1%)} 60%{transform:translate(0,0)} 70%{transform:translate(-1%,0)} 80%{transform:translate(1%,1%)} 90%{transform:translate(0,-1%)} }

  @keyframes h-glitch-r{
    0%,87%,100%{opacity:0;transform:none}
    88%{opacity:.9;transform:translateX(4px) skewX(-2deg)}
    89%{opacity:.5;transform:translateX(-3px)}
    90%{opacity:0}
  }
  @keyframes h-glitch-g{
    0%,87%,100%{opacity:0;transform:none}
    88%{opacity:.7;transform:translateX(-4px) skewX(2deg)}
    89.5%{opacity:.4;transform:translateX(2px)}
    91%{opacity:0}
  }
  @keyframes boot-out {
    0%   { opacity:1; clip-path:inset(0 0 0 0); }
    60%  { opacity:1; clip-path:inset(0 0 0 0); }
    75%  { opacity:1; clip-path:inset(0 0 98% 0); }
    85%  { opacity:0; clip-path:inset(0 0 100% 0); }
    100% { opacity:0; clip-path:inset(0 0 100% 0); pointer-events:none; }
  }
  @keyframes hud-spin {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
  @keyframes signal-fill {
    from { height: 0%; }
    to   { height: var(--fill); }
  }
  @keyframes ripple {
    0%   { transform:scale(0); opacity:.6; }
    100% { transform:scale(3); opacity:0; }
  }
  @keyframes charge {
    0%   { box-shadow: 0 0 0px rgba(223,255,0,0); }
    50%  { box-shadow: 0 0 20px rgba(223,255,0,.5), 0 0 40px rgba(223,255,0,.2); }
    100% { box-shadow: 0 0 18px rgba(223,255,0,.2); }
  }

  /* ── Boot overlay ── */
  .boot-overlay {
    position: fixed;
    inset: 0;
    background: #020204;
    z-index: 9999;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 3rem clamp(1.5rem, 5vw, 6rem);
    animation: boot-out 0.6s ease-in forwards;
    animation-delay: 4.2s;
  }
  .boot-line {
    font-family: 'Space Mono', monospace;
    font-size: clamp(.6rem, 1.1vw, .72rem);
    line-height: 2;
    letter-spacing: .04em;
    opacity: 0;
    transition: opacity .1s;
  }
  .boot-progress {
    position: absolute;
    bottom: 2rem;
    left: clamp(1.5rem, 5vw, 6rem);
    right: clamp(1.5rem, 5vw, 6rem);
    height: 1px;
    background: rgba(223,255,0,.1);
    overflow: hidden;
  }
  .boot-progress-fill {
    height: 100%;
    background: #DFFF00;
    box-shadow: 0 0 8px #DFFF00;
    transition: width 3.8s cubic-bezier(.4,0,.2,1);
  }

  /* ── Noise grain ── */
  .hero-grain {
    position: absolute;
    inset: -20%;
    width: 140%;
    height: 140%;
    opacity: .028;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
    background-size: 180px 180px;
    animation: h-grain 0.4s steps(1) infinite;
    pointer-events: none;
    z-index: 3;
  }

  /* ── Scanlines ── */
  .hero-scanlines {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 2;
    background: repeating-linear-gradient(
      to bottom,
      transparent,
      transparent 2px,
      rgba(0,0,0,.18) 2px,
      rgba(0,0,0,.18) 4px
    );
    animation: h-flicker 8s ease-in-out infinite;
  }

  /* ── Name ghosts ── */
  .h-ghost {
    position: absolute; top: 0; left: 0;
    width: 100%; height: 100%;
    font-family: 'Syne', sans-serif;
    font-weight: 900;
    font-size: inherit;
    letter-spacing: inherit;
    line-height: inherit;
    pointer-events: none;
    opacity: 0;
    user-select: none;
  }
  .h-ghost-r {
    color: #FF3366;
    clip-path: polygon(0 55%,100% 55%,100% 72%,0 72%);
    animation: h-glitch-r 6s steps(1) infinite;
  }
  .h-ghost-g {
    color: #00FFB2;
    clip-path: polygon(0 20%,100% 20%,100% 40%,0 40%);
    animation: h-glitch-g 6s steps(1) infinite .5s;
  }

  /* ── HUD ring ── */
  .hud-ring {
    width: 38px; height: 38px;
    border: 1px solid rgba(223,255,0,.15);
    border-top-color: rgba(223,255,0,.6);
    border-right-color: rgba(223,255,0,.3);
    border-radius: 50%;
    animation: hud-spin 4s linear infinite;
    position: relative;
    flex-shrink: 0;
  }
  .hud-ring::after {
    content: '';
    position: absolute;
    inset: 4px;
    border-radius: 50%;
    border: 1px solid rgba(223,255,0,.08);
    border-bottom-color: rgba(223,255,0,.4);
    animation: hud-spin 2.5s linear infinite reverse;
  }

  /* ── Terminal ── */
  .h-line {
    display: block;
    white-space: pre;
    font-family: 'Space Mono', monospace;
    font-size: .72rem;
    line-height: 1.85;
    color: var(--hero-txt);
  }
  .h-cursor-inline {
    display: inline-block;
    width: 7px; height: .85em;
    background: var(--acc);
    vertical-align: middle;
    margin-left: 1px;
    animation: h-blink 1s step-end infinite;
  }

  /* ── CTA ripple ── */
  .cta-primary {
    position: relative;
    overflow: hidden;
  }
  .cta-ripple {
    position: absolute;
    width: 60px; height: 60px;
    border-radius: 50%;
    background: rgba(223,255,0,.35);
    top: 50%; left: 50%;
    margin: -30px 0 0 -30px;
    animation: ripple .5s ease-out forwards;
    pointer-events: none;
  }

  /* ── Signal bar ── */
  .signal-bar {
    width: 3px;
    border-radius: 2px;
    background: rgba(223,255,0,.15);
    position: relative;
    overflow: hidden;
  }
  .signal-bar::after {
    content: '';
    position: absolute;
    bottom: 0; left: 0; right: 0;
    background: var(--acc);
    box-shadow: 0 0 6px var(--acc);
    animation: signal-fill .8s ease-out forwards;
    animation-delay: var(--delay, 0s);
    height: 0%;
  }

  /* ── Hex counter ── */
  .hex-counter {
    font-family: 'Space Mono', monospace;
    font-size: .5rem;
    color: rgba(223,255,0,.2);
    letter-spacing: .1em;
    user-select: none;
  }

  @media (max-width: 767px) {
    .h-line { font-size: .64rem; white-space: pre-wrap; word-break: break-all; }
  }
`;

// ─── Component ────────────────────────────────────────────────────────────────

export default function Hero() {
  const [roleIndex,    setRoleIndex]    = useState(0);
  const [roleVisible,  setRoleVisible]  = useState(true);
  const [clock,        setClock]        = useState("--:--:--");
  const [termStatus,   setTermStatus]   = useState(false);
  const [scrollHint,   setScrollHint]   = useState(false);
  const [isMobile,     setIsMobile]     = useState(false);
  const [bootDone,     setBootDone]     = useState(false);
  const [hexAddr,      setHexAddr]      = useState("0x00000000");

  const [show, setShow] = useState({
    badge: false, sl: false, name: false, handle: false,
    div: false, role: false, regs: false, ctas: false, term: false,
  });

  const canvasRef   = useRef<HTMLCanvasElement>(null);
  const dropsRef    = useRef<number[]>([]);
  const frameRef    = useRef<number | null>(null);
  const termBodyRef = useRef<HTMLDivElement>(null);
  const bootRef     = useRef<HTMLDivElement>(null);
  const bootLinesRef= useRef<(HTMLSpanElement | null)[]>([]);
  const bootFillRef = useRef<HTMLDivElement>(null);

  /* ── mobile ── */
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  /* ── boot sequence ── */
  useEffect(() => {
    // show boot lines
    const timers: ReturnType<typeof setTimeout>[] = [];
    BOOT_LINES.forEach(({ t, text, color }, i) => {
      timers.push(setTimeout(() => {
        const el = bootLinesRef.current[i];
        if (el) {
          el.textContent = text;
          el.style.color = color;
          el.style.opacity = "1";
        }
      }, t));
    });
    // fill progress bar
    timers.push(setTimeout(() => {
      if (bootFillRef.current) bootFillRef.current.style.width = "100%";
    }, 50));
    // mark boot done after animation
    timers.push(setTimeout(() => setBootDone(true), 4900));
    return () => timers.forEach(clearTimeout);
  }, []);

  /* ── staggered reveals (after boot) ── */
  useEffect(() => {
    if (!bootDone) return;
    const seq: [keyof typeof show, number][] = [
      ["badge", 100], ["sl", 200], ["name", 150],
      ["handle", 350], ["div", 500], ["role", 600],
      ["regs", 700], ["ctas", 900], ["term", 400],
    ];
    const timers = seq.map(([key, delay]) =>
      setTimeout(() => setShow((s) => ({ ...s, [key]: true })), delay)
    );
    const t1 = setTimeout(() => setTermStatus(true), 3200);
    const t2 = setTimeout(() => setScrollHint(true), 2600);
    return () => { timers.forEach(clearTimeout); clearTimeout(t1); clearTimeout(t2); };
  }, [bootDone]);

  /* ── role rotator ── */
  useEffect(() => {
    const iv = setInterval(() => {
      setRoleVisible(false);
      setTimeout(() => { setRoleIndex((i) => (i + 1) % ROLES.length); setRoleVisible(true); }, 280);
    }, 2800);
    return () => clearInterval(iv);
  }, []);

  /* ── live clock ── */
  useEffect(() => {
    const tick = () => {
      const n = new Date();
      setClock([n.getHours(), n.getMinutes(), n.getSeconds()].map((v) => String(v).padStart(2, "0")).join(":"));
    };
    tick();
    const iv = setInterval(tick, 1000);
    return () => clearInterval(iv);
  }, []);

  /* ── hex address counter ── */
  useEffect(() => {
    if (!bootDone) return;
    const iv = setInterval(() => {
      const val = Math.floor(Math.random() * 0xFFFFFFFF);
      setHexAddr("0x" + val.toString(16).toUpperCase().padStart(8, "0"));
    }, 120);
    return () => clearInterval(iv);
  }, [bootDone]);

  /* ── terminal typed output ── */
  useEffect(() => {
    if (!bootDone) return;
    const body = termBodyRef.current;
    if (!body) return;
    body.innerHTML = "";
    const allTimers: ReturnType<typeof setTimeout>[] = [];

    TERM_LINES.forEach(({ delay, text, speed = 22 }) => {
      if (!text) {
        allTimers.push(setTimeout(() => {
          const span = document.createElement("span");
          span.className = "h-line";
          span.innerHTML = "&nbsp;";
          body.appendChild(span);
          body.scrollTop = body.scrollHeight;
        }, delay));
        return;
      }

      // create the line span immediately at delay, then type chars
      allTimers.push(setTimeout(() => {
        const span = document.createElement("span");
        span.className = "h-line";
        body.appendChild(span);

        // colour the prompt marker
        const isPrompt = text.startsWith("▶");
        let charIndex = 0;

        const typeChar = () => {
          if (charIndex <= text.length) {
            const current = text.slice(0, charIndex);
            span.innerHTML = isPrompt
              ? `<span style="color:#DFFF00">${current.slice(0, 1)}</span><span style="color:#00FFB2">${current.slice(1)}</span>`
              : current;
            if (charIndex < text.length) {
              span.innerHTML += `<span class="h-cursor-inline"></span>`;
            }
            charIndex++;
            body.scrollTop = body.scrollHeight;
            if (charIndex <= text.length) {
              allTimers.push(setTimeout(typeChar, speed + Math.random() * 10));
            }
          }
        };
        typeChar();
      }, delay));
    });

    return () => allTimers.forEach(clearTimeout);
  }, [bootDone]);

  /* ── glyph rain ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const COL_W = 22;
    let W = 0, H = 0, cols = 0;

    const resize = () => {
      W = canvas.offsetWidth; H = canvas.offsetHeight;
      canvas.width = W; canvas.height = H;
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

    const animate = () => { drawFrame(); frameRef.current = requestAnimationFrame(animate); };
    resize();
    window.addEventListener("resize", resize);
    animate();
    return () => {
      window.removeEventListener("resize", resize);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  /* ── CTA ripple ── */
  const handleCtaClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const btn = e.currentTarget;
    const ripple = document.createElement("span");
    ripple.className = "cta-ripple";
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 500);
  };

  /* ── fade helper ── */
  const fade = (visible: boolean, extraDelay = "0s"): React.CSSProperties => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(10px)",
    transition: `opacity .4s ${extraDelay}, transform .4s ${extraDelay}`,
  });

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* ══════════════ BOOT OVERLAY ══════════════ */}
      <div className="boot-overlay" ref={bootRef}>
        {/* corner brackets */}
        <CornerBracket pos="tl" />
        <CornerBracket pos="tr" />
        <CornerBracket pos="bl" />
        <CornerBracket pos="br" />

        <div style={{ marginBottom: "1.5rem" }}>
          <span style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: ".55rem",
            color: "rgba(223,255,0,.3)",
            letterSpacing: ".3em",
            textTransform: "uppercase",
          }}>
            — initialising —
          </span>
        </div>

        {BOOT_LINES.map((_, i) => (
          <span
            key={i}
            ref={(el) => { bootLinesRef.current[i] = el; }}
            className="boot-line"
          />
        ))}

        <div className="boot-progress">
          <div ref={bootFillRef} className="boot-progress-fill" style={{ width: "0%" }} />
        </div>
      </div>

      {/* ══════════════ HERO SECTION ══════════════ */}
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
            ? "5rem 1.5rem 5rem"
            : "0 clamp(2rem, 5vw, 5rem)",
          rowGap: isMobile ? "2.5rem" : 0,
          opacity: bootDone ? 1 : 0,
          transition: "opacity .4s .1s",
        }}
      >
        {/* glyph rain */}
        <canvas ref={canvasRef} aria-hidden style={{
          position: "absolute", inset: 0, width: "100%", height: "100%",
          opacity: isMobile ? 0.15 : 0.3, pointerEvents: "none", zIndex: 0,
        }} />

        {/* noise grain */}
        <div className="hero-grain" aria-hidden />

        {/* scanlines */}
        <div className="hero-scanlines" aria-hidden />

        {/* vignette */}
        <div aria-hidden style={{
          position: "absolute", inset: 0, pointerEvents: "none", zIndex: 2,
          background: "radial-gradient(ellipse 90% 90% at 50% 50%,transparent 20%,rgba(6,6,8,.85) 100%)",
        }} />

        {/* ══════ LEFT — IDENTITY ══════ */}
        <div style={{
          position: "relative", zIndex: 10,
          display: "flex", flexDirection: "column", justifyContent: "center",
          borderRight:   isMobile ? "none" : "1px solid var(--hero-border)",
          borderBottom:  isMobile ? "1px solid var(--hero-border)" : "none",
          paddingRight:  isMobile ? 0 : "3rem",
          paddingBottom: isMobile ? "2.5rem" : 0,
          minHeight:     isMobile ? "auto" : "100svh",
        }}>
          {/* corner brackets — desktop */}
          {!isMobile && <>
            <CornerBracket pos="tl" style={{ position: "absolute", top: "1.5rem", left: 0 }} />
            <CornerBracket pos="bl" style={{ position: "absolute", bottom: "1.5rem", left: 0 }} />
          </>}

          {/* signal bars — left edge decoration */}
          {!isMobile && (
            <div style={{
              position: "absolute", left: -18, top: "50%",
              transform: "translateY(-50%)",
              display: "flex", flexDirection: "column",
              alignItems: "center", gap: 3,
            }}>
              {[{ h: 8, fill: 20, delay: ".1s" }, { h: 14, fill: 55, delay: ".2s" }, { h: 20, fill: 80, delay: ".3s" }, { h: 26, fill: 100, delay: ".4s" }].map((bar, i) => (
                <div
                  key={i}
                  className="signal-bar"
                  style={{
                    height: bar.h,
                    "--fill": `${bar.fill}%`,
                    "--delay": bar.delay,
                  } as React.CSSProperties}
                />
              ))}
            </div>
          )}

          {/* right-border glow — desktop */}
          {!isMobile && (
            <div aria-hidden style={{
              position: "absolute", right: -1, top: "20%", height: "60%", width: 1,
              background: "linear-gradient(to bottom,transparent,#DFFF00,transparent)",
              opacity: .3,
            }} />
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
            }} />
            <span style={{
              width: 6, height: 6, borderRadius: "50%",
              background: "var(--acc)", boxShadow: "0 0 6px var(--acc)",
              animation: "h-pulse 1.6s ease-in-out infinite", flexShrink: 0,
            }} />
            Available for interesting projects
          </div>

          {/* sys label */}
          <p style={{
            fontSize: ".6rem", letterSpacing: ".2em",
            textTransform: "uppercase", color: "var(--hero-muted)",
            marginBottom: "1.2rem",
            ...fade(show.sl),
          }}>
            {`// sys.identity`}
          </p>

          {/* HUD row: ring + hex counter */}
          <div style={{
            display: "flex", alignItems: "center", gap: 12,
            marginBottom: "1rem",
            ...fade(show.name, ".05s"),
          }}>
            <div className="hud-ring" />
            <span className="hex-counter">{hexAddr}</span>
          </div>

          {/* NAME — interactive scramble */}
          <div style={{ overflow: "visible", marginBottom: ".3rem" }}>
            <h1
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 900,
                fontSize: isMobile ? "clamp(3rem,18vw,5rem)" : "clamp(3.5rem,9vw,7rem)",
                color: "var(--acc)",
                letterSpacing: "-.04em",
                lineHeight: 0.95,
                textShadow: "0 0 80px rgba(223,255,0,.2)",
                transform: show.name ? "translateY(0)" : "translateY(100%)",
                transition: "transform .7s cubic-bezier(.16,1,.3,1), text-shadow .3s",
                display: "block",
                position: "relative",
                margin: 0,
                cursor: "default",
                userSelect: "none",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.textShadow = "0 0 120px rgba(223,255,0,.45), 0 0 40px rgba(223,255,0,.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.textShadow = "0 0 80px rgba(223,255,0,.2)";
              }}
            >
              Byt3Mage
              <span className="h-ghost h-ghost-r" aria-hidden>Byt3Mage</span>
              <span className="h-ghost h-ghost-g" aria-hidden>Byt3Mage</span>
            </h1>
          </div>

          {/* handle */}
          <p style={{
            fontSize: isMobile ? ".6rem" : "clamp(.55rem,1.1vw,.7rem)",
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
            <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg,var(--hero-border),transparent)" }} />
            <div style={{ width: 5, height: 5, background: "var(--acc)", transform: "rotate(45deg)", opacity: .4 }} />
            <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg,transparent,var(--hero-border))" }} />
          </div>

          {/* role rotator */}
          <div style={{ height: "1.4rem", overflow: "hidden", marginBottom: "1.4rem", ...fade(show.role, ".25s") }}>
            <span style={{
              display: "block",
              fontSize: isMobile ? ".65rem" : ".75rem",
              color: "var(--acc2)",
              letterSpacing: ".18em", textTransform: "uppercase",
              opacity:   roleVisible ? 1 : 0,
              transform: roleVisible ? "translateY(0)" : "translateY(10px)",
              transition: "opacity .25s, transform .25s",
            }}>
              {ROLES[roleIndex]}
            </span>
          </div>

          {/* specs */}
          <div style={{
            display: "flex", flexDirection: "column",
            gap: isMobile ? ".55rem" : ".5rem",
            marginBottom: "2rem",
            ...fade(show.regs, ".35s"),
          }}>
            {SPECS.map(({ k, v, accent, ok }) => (
              <div key={k} style={{ display: "flex", alignItems: "flex-start", fontSize: isMobile ? ".6rem" : ".62rem" }}>
                <span style={{
                  color: "var(--hero-muted)", letterSpacing: ".12em",
                  textTransform: "uppercase",
                  width: isMobile ? 58 : 70, flexShrink: 0,
                }}>{k}</span>
                <span style={{ color: "var(--hero-muted)", margin: "0 6px", flexShrink: 0 }}>::</span>
                <span style={{
                  color: ok ? "#C3E88D" : accent ? "var(--acc)" : "var(--hero-txt)",
                  fontWeight: accent ? 700 : 400,
                  letterSpacing: ".06em",
                  lineHeight: 1.4, wordBreak: "break-word",
                }}>{v}</span>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div style={{
            display: "flex", gap: ".8rem", flexWrap: "nowrap",
            width: isMobile ? "100%" : "auto",
            ...fade(show.ctas, ".5s"),
          }}>
            <a
              href="https://github.com/Byt3Mage"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-primary"
              onClick={handleCtaClick}
              style={{
                display: "inline-flex", alignItems: "center",
                justifyContent: "center", gap: 7,
                fontFamily: "'Space Mono', monospace",
                fontSize: ".68rem", fontWeight: 700,
                letterSpacing: ".1em", textTransform: "uppercase",
                textDecoration: "none",
                padding: ".7rem 1.4rem", minHeight: 48,
                borderRadius: 3,
                background: "var(--acc)", color: "#060608",
                boxShadow: "0 0 18px rgba(223,255,0,.2)",
                transition: "transform .2s, box-shadow .2s",
                flex: isMobile ? 1 : "none",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 0 30px rgba(223,255,0,.45), 0 0 60px rgba(223,255,0,.1)";
                e.currentTarget.style.animation = "charge .3s ease-out";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 0 18px rgba(223,255,0,.2)";
                e.currentTarget.style.animation = "";
              }}
            >
              <GithubIcon />
              GitHub
            </a>

            <a
              href="#contact"
              style={{
                display: "inline-flex", alignItems: "center",
                justifyContent: "center", gap: 7,
                fontFamily: "'Space Mono', monospace",
                fontSize: ".68rem",
                letterSpacing: ".1em", textTransform: "uppercase",
                textDecoration: "none",
                padding: ".7rem 1.4rem", minHeight: 48,
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
        </div>

        {/* ══════ RIGHT — TERMINAL ══════ */}
        <div style={{
          position: "relative", zIndex: 10,
          display: "flex", flexDirection: "column", justifyContent: "center",
          paddingLeft: isMobile ? 0 : "3rem",
          opacity: show.term ? 1 : 0,
          transform: show.term ? "translateY(0)" : "translateY(16px)",
          transition: "opacity .5s .3s, transform .5s .3s",
        }}>
          {/* corner brackets — desktop */}
          {!isMobile && <>
            <CornerBracket pos="tr" style={{ position: "absolute", top: "1.5rem", right: 0 }} />
            <CornerBracket pos="br" style={{ position: "absolute", bottom: "1.5rem", right: 0 }} />
          </>}

          <div style={{
            background: "rgba(10,10,14,.95)",
            border: "1px solid rgba(223,255,0,.1)",
            borderRadius: 6,
            overflow: "hidden",
            width: "100%",
            maxWidth: isMobile ? "100%" : 480,
            boxShadow: "0 0 40px rgba(0,0,0,.6), inset 0 1px 0 rgba(223,255,0,.05)",
          }}>
            {/* title bar */}
            <div style={{
              display: "flex", alignItems: "center", gap: 6,
              padding: ".5rem .8rem",
              background: "rgba(223,255,0,.03)",
              borderBottom: "1px solid rgba(223,255,0,.07)",
            }}>
              {["#FF5F57","#FEBC2E","#28C840"].map((bg, i) => (
                <span key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: bg, opacity: .75 }} />
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
                  background: "var(--acc2)", marginRight: 5,
                  animation: "h-pulse 2s ease-in-out infinite",
                }} />
                session active
              </span>
              <span style={{ fontVariantNumeric: "tabular-nums" }}>{clock}</span>
              <span>TTY/0</span>
            </div>
          </div>
        </div>

        {/* scroll hint */}
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
          <span style={{ fontSize: ".5rem", color: "var(--hero-muted)", letterSpacing: ".2em", textTransform: "uppercase" }}>
            scroll
          </span>
          <div style={{ width: 1, height: isMobile ? 20 : 30, background: "rgba(223,255,0,.12)", position: "relative", overflow: "hidden" }}>
            <span aria-hidden style={{
              position: "absolute", top: "-100%", left: 0,
              width: "100%", height: "100%",
              background: "linear-gradient(to bottom,transparent,#DFFF00)",
              animation: "h-drop 2s ease-in-out infinite",
            }} />
          </div>
        </a>
      </section>
    </>
  );
}

// ─── Corner Bracket SVG ───────────────────────────────────────────────────────

function CornerBracket({ pos, style }: { pos: "tl"|"tr"|"bl"|"br"; style?: React.CSSProperties }) {
  const transforms: Record<string, string> = {
    tl: "none",
    tr: "scaleX(-1)",
    bl: "scaleY(-1)",
    br: "scale(-1,-1)",
  };
  return (
    <svg
      aria-hidden
      width="24" height="24" viewBox="0 0 28 28" fill="none"
      style={{ opacity: .3, transform: transforms[pos], ...style }}
    >
      <path d="M2 24 L2 2 L24 2" stroke="#DFFF00" strokeWidth="1.5" strokeLinecap="square" />
    </svg>
  );
}

// ─── Github Icon ──────────────────────────────────────────────────────────────

function GithubIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
    </svg>
  );
}