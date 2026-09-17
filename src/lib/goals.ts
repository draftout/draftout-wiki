export type GoalEntry = { title: string; url: string };

export function isGoalArticle(slugs: readonly string[]) {
  return slugs[0] === "goals" && slugs.length > 1;
}
