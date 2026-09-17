import { notFound } from "@tanstack/react-router";
import { getGoalIndex } from "./goals.server";
import { isGoalArticle } from "./goals";
import type { WikiSource } from "./wiki-source";

export async function loadWikiPage(source: WikiSource, slugs: string[]) {
  const page = source.getPage(slugs);
  if (!page) throw notFound();
  const goalIndex = slugs.length === 1 && slugs[0] === "goals";
  return {
    path: page.path,
    isHome: slugs.length === 0,
    goalArticle: isGoalArticle(slugs),
    title: page.data.title,
    description: page.data.description,
    pageTree: await source.serializePageTree(source.getPageTree()),
    goals: goalIndex ? await getGoalIndex(source) : [],
  };
}
export type WikiPageData = Awaited<ReturnType<typeof loadWikiPage>>;
