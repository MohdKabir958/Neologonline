import { Neighborhood, ExpansionPhase } from "@/lib/types";

export const neighborhoods: Neighborhood[] = [
  { name: "HITEC City", status: "active" },
  { name: "Gachibowli", status: "active" },
  { name: "Kukatpally", status: "active" },
  { name: "Secunderabad", status: "active" },
  { name: "Tarnaka", status: "active" },
];

export const expansionPhases: ExpansionPhase[] = [
  {
    phase: "Phase 1: Q3 2026",
    date: "Q3 2026",
    area: "Manikonda & Puppalaguda",
    description:
      "Deploying high-density core rings to handle new tech startups and residential high-rises.",
    progress: 85,
    icon: "cable",
  },
  {
    phase: "Phase 2: Q4 2026",
    date: "Q4 2026",
    area: "Begumpet & Ameerpet",
    description:
      "Upgrading distribution switches and route trunks to 40G topology.",
    icon: "hub",
  },
  {
    phase: "Phase 3: Q1 2027",
    date: "Q1 2027",
    area: "Uppal East & Pocharam",
    description:
      "Surveying IT parks and metro transit grids for local ring route extensions.",
    icon: "bolt",
  },
];
