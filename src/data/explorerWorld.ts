import type { LucideIcon } from "lucide-react";
import { Gamepad2, Zap, Bot, Tv, Briefcase, GraduationCap } from "lucide-react";

/**
 * What to render when a leaf place is opened. Several leaves intentionally
 * share a content key (e.g. every company without its own case study page
 * shows the shared Experience section) until scoped per-place content exists.
 */
export type WorldContentKey =
  | "experience"
  | "education"
  | "goldies"
  | "shockwave"
  | "ai-job-search"
  | "tv-time"
  | "home-about"
  | "placeholder";

export interface WorldPlace {
  id: string;
  label: string;
  icon?: LucideIcon;
  /** Present on places with no further depth — clicking opens this content. */
  contentKey?: WorldContentKey;
  /** Present on places with more inside (e.g. SciPlay -> its case studies). */
  children?: WorldPlace[];
}

export interface WorldLocation {
  id: string;
  label: string;
  country: "US" | "IN";
  lat: number;
  lng: number;
  /** Empty when the location skips the landing screen (see contentKey below). */
  places: WorldPlace[];
  /** Present only on locations with a single merged piece of content (Nashik). */
  contentKey?: WorldContentKey;
}

export const WORLD_LOCATIONS: WorldLocation[] = [
  {
    id: "austin",
    label: "Austin",
    country: "US",
    lat: 30.27,
    lng: -97.74,
    places: [
      {
        id: "sciplay",
        label: "SciPlay",
        children: [
          { id: "sciplay-role", label: "The Role", contentKey: "experience" },
          { id: "goldies", label: "Goldies Grand Match", icon: Gamepad2, contentKey: "goldies" },
          { id: "shockwave", label: "Shockwave", icon: Zap, contentKey: "shockwave" },
        ],
      },
      { id: "tv-time", label: "TV Time 2.0", icon: Tv, contentKey: "tv-time" },
      { id: "ai-job-search", label: "AI Job Search System", icon: Bot, contentKey: "ai-job-search" },
    ],
  },
  {
    id: "boston",
    label: "Boston",
    country: "US",
    lat: 42.36,
    lng: -71.06,
    places: [
      { id: "kayak", label: "Kayak", icon: Briefcase, contentKey: "experience" },
      {
        id: "northeastern",
        label: "Northeastern",
        icon: GraduationCap,
        children: [
          { id: "northeastern-degree", label: "The Degree", contentKey: "education" },
          { id: "apmc", label: "APMC", contentKey: "placeholder" },
          { id: "protothon", label: "Protothon", contentKey: "placeholder" },
        ],
      },
    ],
  },
  {
    id: "pune",
    label: "Pune",
    country: "IN",
    lat: 18.52,
    lng: 73.86,
    places: [
      { id: "pune-university", label: "Pune University", icon: GraduationCap, contentKey: "education" },
      { id: "testbook", label: "Testbook.com", icon: Briefcase, contentKey: "experience" },
    ],
  },
  {
    id: "mumbai",
    label: "Mumbai",
    country: "IN",
    lat: 19.08,
    lng: 72.88,
    places: [{ id: "newgen", label: "Newgen Software", icon: Briefcase, contentKey: "experience" }],
  },
  {
    id: "nashik",
    label: "Nashik",
    country: "IN",
    lat: 20.0,
    lng: 73.79,
    places: [],
    contentKey: "home-about",
  },
];

export const findLocation = (id: string) => WORLD_LOCATIONS.find((l) => l.id === id);

export const findPlace = (places: WorldPlace[], id: string): WorldPlace | undefined => {
  for (const p of places) {
    if (p.id === id) return p;
    if (p.children) {
      const found = findPlace(p.children, id);
      if (found) return found;
    }
  }
  return undefined;
};
