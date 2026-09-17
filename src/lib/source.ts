import { createWikiSource } from "./wiki-source";
import { defineDocs } from "fumadocs-mdx/macro";

export const docs = defineDocs({
  dir: "content/docs",
  docs: { async: true },
});

export const source = createWikiSource(docs);
