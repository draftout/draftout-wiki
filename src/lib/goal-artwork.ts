import catalogue from "./goal-catalogue.json";

export type GoalArtwork = { label: string; path: string };
const entries: Record<string, GoalArtwork[]> = catalogue;

export function goalArtwork(title: string): readonly GoalArtwork[] {
  return entries[title] ?? [];
}
