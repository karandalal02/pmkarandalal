import {
  Home,
  User,
  Briefcase,
  FolderKanban,
  GraduationCap,
  Wrench,
  Users,
  Mail,
  Gamepad2,
  Zap,
  Bot,
  Tv,
  type LucideIcon,
} from "lucide-react";

export const SECTION_ICONS: Record<string, LucideIcon> = {
  home: Home,
  about: User,
  experience: Briefcase,
  projects: FolderKanban,
  education: GraduationCap,
  skills: Wrench,
  mentorship: Users,
  contact: Mail,
};

export const CASE_STUDY_ICONS: Record<string, LucideIcon> = {
  goldies: Gamepad2,
  shockwave: Zap,
  "ai-job-search": Bot,
  "tv-time": Tv,
};
