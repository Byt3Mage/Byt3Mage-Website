export type Project = {
  name: string;
  subtitle: string;
  description: string;
  stack: string[];
  repo: string;
  wip?: boolean;
};

export const projects: Project[] = [
  {
    name: "xecs",
    subtitle: "eXtended ECS",
    description:
      "A mixed (table + sparse set) ECS / in-memory database designed for games, game engines, and high-performance computing applications.",
    stack: ["Rust"],
    repo: "https://github.com/Byt3Mage/xecs",
    wip: true,
  },
  {
    name: "hex",
    subtitle: "High-Performance Virtual Machine",
    description:
      "A statically-typed register-based virtual machine with stack and heap semantics. Async programming support in progress. Ships with a primary language implementation: TalkScript.",
    stack: ["Rust"],
    repo: "https://github.com/Byt3Mage/hex",
    wip: true,
  },
  {
    name: "UnrealFlecs",
    subtitle: "Unreal Engine ECS Plugin",
    description:
      "An Unreal Engine plugin integrating the Flecs ECS library into Unreal Engine. Continuously updated to match the latest stable Flecs version.",
    stack: ["C++"],
    repo: "https://github.com/Byt3Mage/UnrealFlecs",
    wip: false,
  },
];