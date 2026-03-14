"use client";

import { useEffect, useState } from "react";

const links = [
  { href: "#about",    label: "about"    },
  { href: "#projects", label: "projects" },
  { href: "#skills",   label: "skills"   },
  { href: "#contact",  label: "contact"  },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: "rgba(8,8,8,0.85)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: `1px solid ${scrolled ? "rgba(223,255,0,0.1)" : "var(--border)"}`,
        transition: "border-color var(--transition)",
      }}
    >
      {/* Desktop row */}
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "0 2rem",
          height: 56,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <a
          href="#hero"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.9rem",
            fontWeight: 600,
            letterSpacing: "0.04em",
            transition: "color var(--transition)",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text)")}
        >
          <span style={{ color: "var(--accent)" }}>&gt;_</span> Byt3Mage
        </a>

        {/* Desktop links */}
        <ul
          style={{
            display: "flex",
            gap: "2.5rem",
            listStyle: "none",
          }}
          className="nav-desktop-links"
        >
          {links.map(({ href, label }) => (
            <li key={href}>
              <NavLink href={href}>{label}</NavLink>
            </li>
          ))}
        </ul>

        {/* Hamburger */}
        <button
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
          aria-expanded={open}
          style={{
            display: "none",
            flexDirection: "column",
            gap: 5,
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 4,
          }}
          className="nav-hamburger"
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                display: "block",
                width: 22,
                height: 1.5,
                background: "var(--text-muted)",
                borderRadius: 1,
                transition: "all var(--transition)",
                transformOrigin: "center",
                transform:
                  open
                    ? i === 0
                      ? "translateY(6.5px) rotate(45deg)"
                      : i === 2
                      ? "translateY(-6.5px) rotate(-45deg)"
                      : "scaleX(0)"
                    : "none",
                opacity: open && i === 1 ? 0 : 1,
              }}
            />
          ))}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            borderTop: "1px solid var(--border)",
            padding: "1rem 2rem",
          }}
        >
          {links.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.85rem",
                color: "var(--text-muted)",
                letterSpacing: "0.06em",
                transition: "color var(--transition)",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--accent)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--text-muted)")
              }
            >
              {label}
            </a>
          ))}
        </div>
      )}

      {/* Responsive CSS injected once */}
      <style>{`
        @media (max-width: 768px) {
          .nav-desktop-links { display: none !important; }
          .nav-hamburger { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: "0.78rem",
        color: "var(--text-muted)",
        letterSpacing: "0.08em",
        textTransform: "lowercase",
        transition: "color var(--transition)",
        position: "relative",
        paddingBottom: 2,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = "var(--accent)";
        (e.currentTarget.querySelector(".underline") as HTMLElement).style.transform =
          "scaleX(1)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = "var(--text-muted)";
        (e.currentTarget.querySelector(".underline") as HTMLElement).style.transform =
          "scaleX(0)";
      }}
    >
      {children}
      <span
        className="underline"
        style={{
          position: "absolute",
          bottom: -2,
          left: 0,
          right: 0,
          height: 1,
          background: "var(--accent)",
          transform: "scaleX(0)",
          transformOrigin: "left",
          transition: "transform var(--transition)",
        }}
      />
    </a>
  );
}