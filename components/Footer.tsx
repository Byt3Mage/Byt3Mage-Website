export default function Footer() {
  return (
    <footer
      style={{
        fontFamily: "'Space Mono', monospace",
        background: "#060608",
        borderTop: "1px solid rgba(255,255,255,0.07)",
        padding: "1.6rem 2rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Accent glow along the top border */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: -1,
          left: 0,
          right: 0,
          height: 1,
          background:
            "linear-gradient(90deg, transparent 0%, rgba(223,255,0,0.35) 30%, rgba(223,255,0,0.35) 70%, transparent 100%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: 880,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
          flexWrap: "wrap",
        }}
      >
        {/* Left — identity */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            fontSize: "0.78rem",
            color: "#4a4a5a",
          }}
        >
          <span style={{ color: "#DFFF00", letterSpacing: "0.02em" }}>
            &gt;_
          </span>
          <span>Byt3Mage</span>
          <div
            style={{
              width: 1,
              height: 12,
              background: "rgba(255,255,255,0.1)",
            }}
          />
          <span
            style={{
              fontSize: "0.65rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            Ireoluwa Alayaki
          </span>
        </div>

        {/* Right — status + year */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: "0.62rem",
            color: "#4a4a5a",
            letterSpacing: "0.1em",
          }}
        >
          <StatusDot />
          <div
            style={{
              width: 1,
              height: 10,
              background: "rgba(255,255,255,0.08)",
            }}
          />
          <span style={{ opacity: 0.5 }}>© {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
}

function StatusDot() {
  return (
    <>
      <style>{`
        @keyframes footerBlink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.3; }
        }
        .footer-status-dot {
          width: 5px; height: 5px;
          background: #00FFB2;
          border-radius: 50%;
          box-shadow: 0 0 5px #00FFB2;
          animation: footerBlink 2s ease-in-out infinite;
          flex-shrink: 0;
        }
      `}</style>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <span className="footer-status-dot" />
        <span>Available for work</span>
      </div>
    </>
  );
}