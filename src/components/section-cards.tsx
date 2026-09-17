import { Cards } from "fumadocs-ui/components/card";
import type * as PageTree from "fumadocs-core/page-tree";
import { WikiCard } from "./wiki-card";
import { WIKI_BASE_URL } from "@/lib/wiki-source";

export function wikiSections(tree: PageTree.Root) {
  return tree.children.flatMap((node) =>
    node.type === "folder" && node.root
      ? [
          {
            url: `${WIKI_BASE_URL}/${node.$id}`,
            name: node.name,
            description: node.description,
            icon: node.icon,
          },
        ]
      : [],
  );
}

export function SectionCards({ tree }: { tree: PageTree.Root }) {
  return (
    <Cards>
      {wikiSections(tree).map((section) => (
        <WikiCard key={section.url} href={section.url} title={section.name} icon={section.icon}>
          {section.description}
        </WikiCard>
      ))}
    </Cards>
  );
}
