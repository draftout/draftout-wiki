import type { WikiSource } from "./wiki-source";
import { isGoalArticle, type GoalEntry } from "./goals";

export async function getGoalIndex(source: WikiSource): Promise<GoalEntry[]> {
  const articles = source.getPages().filter((page) => isGoalArticle(page.slugs));
  const groups = await Promise.all(
    articles.map(async (page) => {
      const { toc, structuredData } = await page.data.load();
      const headings = new Map(
        structuredData.headings.map((heading) => [heading.id, heading.content]),
      );
      return toc
        .filter((heading) => heading.depth === 2)
        .map((heading) => {
          const title = headings.get(heading.url.slice(1));
          if (!title) throw new Error(`Missing goal title: ${page.url}${heading.url}`);
          return { title, url: `${page.url}${heading.url}` };
        });
    }),
  );
  return groups.flat().sort((a, b) => a.title.localeCompare(b.title, "en", { numeric: true }));
}
