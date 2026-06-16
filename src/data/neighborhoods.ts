import { Neighborhood, ExpansionPhase } from "@/lib/types";

export const neighborhoods: Neighborhood[] = [
  { name: "Tarnaka", status: "active" },
  { name: "Begumpet", status: "active" },
  { name: "Hitech City", status: "active" },
  { name: "Gachibowli", status: "active" },
  { name: "Banjara Hills", status: "active" },
  { name: "Jubilee Hills", status: "active" },
  { name: "Secunderabad", status: "active" },
  { name: "Kukatpally", status: "active" },
];

export const expansionPhases: ExpansionPhase[] = [
  {
    phase: "Phase 1: Q3 2024",
    date: "Q3 2024",
    area: "Banjara Hills Ext.",
    description:
      "Laying high-density fiber trunks to support high-end residential demand. 85% completion.",
    progress: 85,
    icon: "cable",
  },
  {
    phase: "Phase 2: Q4 2024",
    date: "Q4 2024",
    area: "Uppal East",
    description:
      "Extending core network rings to the eastern corridor. Permitting in progress.",
    icon: "hub",
  },
  {
    phase: "Phase 3: Q1 2025",
    date: "Q1 2025",
    area: "Manikonda",
    description:
      "Surveying the high-growth IT hub for comprehensive last-mile connectivity.",
    icon: "bolt",
  },
];
