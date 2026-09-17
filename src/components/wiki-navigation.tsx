import type { ReactNode } from "react";
import type * as PageTree from "fumadocs-core/page-tree";
import { useDocsLayout } from "fumadocs-ui/layouts/docs";
import { Link } from "@tanstack/react-router";
import { usePathname } from "fumadocs-core/framework";
import { useSearchContext } from "fumadocs-ui/contexts/search";
import { Search, House, GitFork, ArrowUpRight, PanelLeft } from "lucide-react";
import { ButtonFace } from "@/design/ButtonFace";
import { wikiSections } from "./section-cards";
import { WIKI_BASE_URL } from "@/lib/wiki-source";

export function WikiSearch() {
  const { setOpenSearch, enabled } = useSearchContext();
  if (!enabled) return null;
  return (
    <button
      type="button"
      className="game-button pixel-frame-align-content wiki-search"
      data-appearance="raised"
      data-icon-layout="inline"
      onClick={() => setOpenSearch(true)}
      aria-label="Search wiki"
    >
      <ButtonFace icon={<Search />}>Search wiki</ButtonFace>
    </button>
  );
}
export function WikiNavigation({ tree, sidebar }: { tree: PageTree.Root; sidebar?: ReactNode }) {
  const pathname = usePathname();
  const links = [
    { url: WIKI_BASE_URL, name: "Overview", icon: <House /> },
    ...wikiSections(tree).map(({ url, name, icon }) => ({ url, name, icon })),
  ];
  return (
    <nav className="wiki-sections" aria-label="Wiki sections">
      <div className="wiki-section-links">
        {links.map(({ url, name, icon }) => {
          const home = url === WIKI_BASE_URL;
          const active = home ? pathname.replace(/\/$/, "") === url : pathname.startsWith(url);
          return (
            <Link
              key={url}
              to={url}
              activeOptions={{ exact: home }}
              className="game-button pixel-frame-align-content"
              data-appearance="raised"
              data-icon-layout="inline"
              aria-current={active ? "page" : undefined}
            >
              <ButtonFace active={active} icon={icon}>
                {name}
              </ButtonFace>
            </Link>
          );
        })}
      </div>
      <div className="wiki-header-search">
        <WikiSearch />
        {sidebar}
      </div>
    </nav>
  );
}
export function WikiRepository({ url }: { url: string }) {
  return (
    <a className="wiki-repository" href={url} target="_blank" rel="noreferrer">
      <GitFork size={18} />
      Contribute on GitHub
      <ArrowUpRight size={14} />
    </a>
  );
}
export function WikiMobileHeader({ tree }: { tree: PageTree.Root }) {
  const { slots } = useDocsLayout();
  const Trigger = slots.sidebar.trigger;
  return (
    <header id="nd-subnav" className="wiki-mobile-header">
      <WikiNavigation
        tree={tree}
        sidebar={
          <Trigger
            className="game-button pixel-frame-align-content wiki-sidebar-toggle"
            data-icon-layout="only"
            data-appearance="raised"
            aria-label="Open wiki sidebar"
            title="Open wiki sidebar"
          >
            <ButtonFace icon={<PanelLeft />} />
          </Trigger>
        }
      />
    </header>
  );
}
