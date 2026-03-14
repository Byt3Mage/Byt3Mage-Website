"use client";

import type { Project } from "@/lib/projects";

export default function ProjectCard({ project }: { project: Project }) {
  const { name, subtitle, description, stack, repo, wip } = project;

  return (
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
              fontFamily: "var(--font-mono)",
            }}
          >
            WIP
          </span>
        )}
      </div>

      {/* Subtitle */}
      <p
        style={{
          fontFamily: "var(--font-mono)",
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
          fontFamily: "var(--font-mono)",
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
                fontFamily: "var(--font-mono)",
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
  );
}