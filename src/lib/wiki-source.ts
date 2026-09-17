import { loader, type PageData } from "fumadocs-core/source";
import { resolveWikiIcon } from "./wiki-icons";
import type { MacroAsyncDocsCollection } from "fumadocs-mdx/runtime/macro";

export type WikiCollection = MacroAsyncDocsCollection<
  PageData & { title: string; description?: string }
>;
export const WIKI_BASE_URL = "/wiki";
export function createWikiSource(collection: WikiCollection) {
  return loader({
    source: collection.toFumadocsSource(),
    baseUrl: WIKI_BASE_URL,
    icon: resolveWikiIcon,
  });
}
export type WikiSource = ReturnType<typeof createWikiSource>;
