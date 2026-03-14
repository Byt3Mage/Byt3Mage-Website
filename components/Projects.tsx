"use client";

import { projects } from "@/lib/projects";
import ProjectCard from "./ProjectCard";

export default function Projects() {
  return (
    <section
      id="projects"
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
            02
          </span>
          <h2
            style={{
              fontFamily: "'Space Mono', monospace",
              fontWeight: 800,
              fontSize: "clamp(2rem, 6vw, 3.2rem)",
              color: "#fff",
              letterSpacing: "-0.03em",
              lineHeight: 1,
            }}
          >
            Projects
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

        {/* Card grid — unified border approach */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1px",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 6,
            overflow: "hidden",
            background: "rgba(255,255,255,0.07)",
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          {projects.map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </div>

        {/* More link */}
        <div style={{ marginTop: "2rem", textAlign: "center" }}>
          <a
            href="https://github.com/Byt3Mage"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontFamily: "'Space Mono', monospace",
              fontSize: "0.7rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              textDecoration: "none",
              color: "#4a4a5a",
              padding: "0.65rem 1.5rem",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 3,
              background: "transparent",
              transition: "color 0.2s, border-color 0.2s, transform 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#DFFF00";
              e.currentTarget.style.borderColor = "rgba(223,255,0,0.22)";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#4a4a5a";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            More on GitHub →
          </a>
        </div>
      </div>
    </section>
  );
}