export type SkillCategory = {
  title: string;
  items: string[];
};

export const primaryLanguage = {
  name: "Rust",
  level: "Expert",
};

export const languages: SkillCategory = {
  title: "Languages",
  items: ["C", "C++", "C#", "Go", "Python", "TypeScript", "JavaScript"],
};

export const tools: SkillCategory = {
  title: "Tools & Frameworks",
  items: [
    "Unreal Engine",
    "Unity",
    "SDL",
    "Raylib",
    "Tauri",
    "NodeJS",
    "Svelte",
    "PostgreSQL",
    "MySQL",
    "SQLite",
    "NumPy",
    "Pandas",
  ],
};

export const competencies: string[] = [
  "Systems Programming",
  "Game Engine Development",
  "Game Development",
  "AI / ML",
  "AI-Assisted Programming",
  "Tool & Framework Development",
  "Backend Web Development",
  "Systems Architecture",
  "Technical Writing & Documentation",
];