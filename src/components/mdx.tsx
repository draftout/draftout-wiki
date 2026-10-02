import { WikiCard } from "./wiki-card";
import { Resources } from "./resources";
import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    Card: WikiCard,
    Resources,
    ...components,
  } satisfies MDXComponents;
}
