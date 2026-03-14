"use client";

import React from "react";

const contactLinks = [
  {
    label: "Email",
    value: "alayakiire@gmail.com",
    href: "mailto:alayakiire@gmail.com",
    icon: <EmailIcon />,
  },
  {
    label: "GitHub",
    value: "@Byt3Mage",
    href: "https://github.com/Byt3Mage",
    icon: <GithubIcon />,
  },
  {
    label: "X / Twitter",
    value: "@i_alayaki",
    href: "https://x.com/i_alayaki",
    icon: <XIcon />,
  },
];

export default function Contact() {
  return (
    <>
      <style>{`
        @keyframes contactBlink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.3; }
        }

        .contact-item {
          display: grid;
          grid-template-columns: 28px 74px 1fr auto;
          align-items: center;
          gap: 16px;
          padding: 1.1rem 1.4rem;
          background: #0e0e12;
          border: 1px solid rgba(255,255,255,0.07);
          border-left: 2px solid transparent;
          text-decoration: none;
          position: relative;
          overflow: hidden;
          transition: border-color 0.22s ease, background 0.22s ease, transform 0.22s ease;
          cursor: pointer;
        }
        .contact-item:first-child { border-radius: 6px 6px 0 0; }
        .contact-item:last-child  { border-radius: 0 0 6px 6px; }

        .contact-item::after {
          content: '';
          position: absolute;
          top: 0; left: -100%; bottom: 0;
          width: 60%;
          background: linear-gradient(90deg, transparent, rgba(223,255,0,0.03), transparent);
          transition: left 0.4s ease;
          pointer-events: none;
        }
        .contact-item:hover::after { left: 140%; }

        .contact-item:hover {
          border-color: rgba(223,255,0,0.25);
          border-left-color: #DFFF00;
          background: rgba(223,255,0,0.025);
          transform: translateX(3px);
        }
        .contact-item:hover .ci-icon  { color: #DFFF00; }
        .contact-item:hover .ci-value { color: #DFFF00; }
        .contact-item:hover .ci-arrow { opacity: 1; transform: translateX(0); }

        .ci-icon {
          color: #4a4a5a;
          display: flex;
          align-items: center;
          transition: color 0.22s ease;
          flex-shrink: 0;
        }
        .ci-label {
          font-family: 'Space Mono', monospace;
          font-size: 0.6rem;
          color: #4a4a5a;
          letter-spacing: 0.16em;
          text-transform: uppercase;
        }
        .ci-value {
          font-family: 'Space Mono', monospace;
          font-size: 0.82rem;
          color: #c8c8d8;
          transition: color 0.22s ease;
        }
        .ci-arrow {
          font-size: 0.75rem;
          color: #DFFF00;
          opacity: 0;
          transform: translateX(-6px);
          transition: opacity 0.22s ease, transform 0.22s ease;
        }
      `}</style>

      <section
        id="contact"
        style={{
          fontFamily: "'Space Mono', monospace",
          background: "#060608",
          padding: "6rem 2rem",
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
              "radial-gradient(circle, rgba(223,255,0,0.03) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            maxWidth: 780,
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
              }}
            >
              04
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
              Contact
            </h2>
            {/* Trailing line */}
            <div
              style={{
                flex: 1,
                height: 1,
                background:
                  "linear-gradient(90deg, rgba(255,255,255,0.08), transparent)",
                marginLeft: 8,
                alignSelf: "center",
              }}
            />
          </div>

          {/* Intro */}
          <p
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "0.82rem",
              color: "#4a4a5a",
              lineHeight: 1.85,
              marginBottom: "3rem",
              maxWidth: 540,
            }}
          >
            Interested in collaborating or want to discuss a{" "}
            <span style={{ color: "#00FFB2" }}>wild project idea?</span>
            <br />
            I&apos;m always open to conversations about interesting problems.
          </p>

          {/* Terminal prompt */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontSize: "0.65rem",
              color: "#4a4a5a",
              letterSpacing: "0.1em",
              marginBottom: "1.5rem",
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: 6,
                height: 6,
                background: "#DFFF00",
                borderRadius: "50%",
                boxShadow: "0 0 6px #DFFF00",
                animation: "contactBlink 1.4s ease-in-out infinite",
                flexShrink: 0,
              }}
            />
            byt3mage@portfolio:~$ select_channel
          </div>

          {/* Contact list */}
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {contactLinks.map(({ label, value, href, icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="contact-item"
              >
                <span className="ci-icon">{icon}</span>
                <span className="ci-label">{label}</span>
                <span className="ci-value">{value}</span>
                <span className="ci-arrow" aria-hidden>→</span>
              </a>
            ))}
          </div>

          {/* Status footer */}
          <div
            style={{
              marginTop: "2.5rem",
              display: "flex",
              alignItems: "center",
              gap: 10,
              fontSize: "0.62rem",
              color: "#4a4a5a",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                background: "#00FFB2",
                borderRadius: "50%",
                boxShadow: "0 0 6px #00FFB2",
                flexShrink: 0,
                animation: "contactBlink 2s ease-in-out infinite",
              }}
            />
            response time &lt; 24h &nbsp;·&nbsp; open to remote &nbsp;·&nbsp; UTC+1
          </div>
        </div>
      </section>
    </>
  );
}

function EmailIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622 5.91-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}