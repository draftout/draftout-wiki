import { WikiCard } from "./wiki-card";
import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    Card: WikiCard,
    ...components,
  } satisfies MDXComponents;
}
