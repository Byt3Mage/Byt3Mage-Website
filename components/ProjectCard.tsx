"use client";

import type { Project } from "@/lib/projects";

export default function ProjectCard({ project }: { project: Project }) {
  const { name, subtitle, description, stack, repo, wip } = project;

  return (
    <>
      <style>{`
        .proj-card {
          background: #0e0e12;
          padding: 1.6rem 1.5rem;
          display: flex;
          flex-direction: column;
          position: relative;
          overflow: hidden;
          transition: background 0.22s ease;
          cursor: default;
        }
        .proj-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: #DFFF00;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s ease;
        }
        .proj-card:hover { background: #121218; }
        .proj-card:hover::before { transform: scaleX(1); }
        .proj-card:hover .proj-name {
          color: #DFFF00;
          text-shadow: 0 0 16px rgba(223,255,0,0.25);
        }
        .proj-card:hover .proj-repo { color: #DFFF00; opacity: 1; }
        .proj-card:hover .proj-repo-arrow { transform: translateX(3px); }

        .proj-name {
          font-family: 'Space Mono', monospace;
          font-size: 0.95rem;
          font-weight: 700;
          color: #c8c8d8;
          letter-spacing: -0.01em;
          transition: color 0.22s ease, text-shadow 0.22s ease;
          line-height: 1.2;
        }
        .proj-repo {
          font-family: 'Space Mono', monospace;
          font-size: 0.65rem;
          color: #4a4a5a;
          text-decoration: none;
          opacity: 0.6;
          transition: color 0.2s ease, opacity 0.2s ease;
          display: flex;
          align-items: center;
          gap: 4px;
          flex-shrink: 0;
        }
        .proj-repo-arrow {
          display: inline-block;
          transition: transform 0.2s ease;
        }
      `}</style>

      <article className="proj-card">
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 8,
            marginBottom: "0.35rem",
          }}
        >
          <h3 className="proj-name">{name}</h3>
          {wip && (
            <span
              style={{
                fontSize: "0.55rem",
                letterSpacing: "0.14em",
                padding: "0.2rem 0.55rem",
                background: "rgba(223,255,0,0.06)",
                border: "1px solid rgba(223,255,0,0.22)",
                color: "#DFFF00",
                borderRadius: 3,
                textTransform: "uppercase" as const,
                flexShrink: 0,
                marginTop: 2,
                fontFamily: "'Space Mono', monospace",
              }}
            >
              WIP
            </span>
          )}
        </div>

        {/* Subtitle */}
        <p
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "0.68rem",
            color: "#4a4a5a",
            letterSpacing: "0.06em",
            marginBottom: "1rem",
            textTransform: "uppercase",
          }}
        >
          {subtitle}
        </p>

        {/* Description */}
        <p
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "0.78rem",
            color: "#4a4a5a",
            lineHeight: 1.75,
            flexGrow: 1,
            marginBottom: "1.4rem",
          }}
        >
          {description}
        </p>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: "1rem",
            borderTop: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          {/* Stack tags */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
            {stack.map((tag) => (
              <span
                key={tag}
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "0.6rem",
                  color: "#4a4a5a",
                  padding: "0.15rem 0.5rem",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: 2,
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Repo link */}
          <a
            href={repo}
            target="_blank"
            rel="noopener noreferrer"
            className="proj-repo"
          >
            GitHub <span className="proj-repo-arrow">→</span>
          </a>
        </div>
      </article>
    </>
  );
}