import defaultMdxComponents from "fumadocs-ui/mdx";
import { GoalArtworkOrigin, GoalIcon, GoalVariants } from "./goal-artwork";
import { PageLinks } from "./page-links";
import { Suspense, createContext, use, useEffect, useMemo, type ComponentProps } from "react";
import { useFumadocsLoader } from "fumadocs-core/source/client";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { DocsBody, DocsDescription, DocsPage, DocsTitle } from "fumadocs-ui/layouts/docs/page";
import type * as PageTree from "fumadocs-core/page-tree";
import type { WikiCollection } from "@/lib/wiki-source";
import type { WikiPageData } from "@/lib/wiki-page.server";
import { WikiNavigation, WikiRepository, WikiMobileHeader } from "./wiki-navigation";
import { getMDXComponents } from "./mdx";
import { GoalIndex } from "./goal-index";
import { SectionCards } from "./section-cards";

const GoalHeadingsContext = createContext<ReadonlyMap<string, string>>(new Map());
const Heading = defaultMdxComponents.h2;
const NoNavTitle = () => null;

// Keep the heading component identity stable so TOC observers retain live nodes.
function GoalArticleHeading(props: ComponentProps<"h2">) {
  const headings = use(GoalHeadingsContext);
  const title = headings.get(props.id ?? "") ?? "";
  return (
    <>
      <Heading {...props}>
        <span className="wiki-goal-heading">
          <GoalIcon title={title} />
          {props.children}
        </span>
      </Heading>
      <GoalVariants title={title} />
    </>
  );
}

function Content({
  collection,
  data,
  tree,
  repositoryUrl,
}: {
  collection: WikiCollection;
  data: WikiPageData;
  tree: PageTree.Root;
  repositoryUrl: string;
}) {
  const { path, goals, isHome, goalArticle } = data;
  const page = collection.getPage(path);
  if (!page) throw new Error(`Unknown page: ${path}`);
  const { toc, structuredData } = use(page.load());
  const headings = useMemo(
    () => new Map(structuredData.headings.map((heading) => [heading.id, heading.content])),
    [structuredData.headings],
  );
  const goalToc = useMemo(
    () =>
      goalArticle
        ? toc.map((item) => ({
            ...item,
            title:
              item.depth === 2 ? (
                <span className="wiki-toc-goal">
                  <GoalIcon title={headings.get(item.url.slice(1)) ?? ""} />
                  <span>{item.title}</span>
                </span>
              ) : (
                item.title
              ),
          }))
        : toc,
    [goalArticle, toc, headings],
  );
  const MDX = page.body;
  const body = (
    <>
      <header className="wiki-article-header">
        <DocsTitle>{page.title}</DocsTitle>
        {page.description && <DocsDescription>{page.description}</DocsDescription>}
      </header>
      <GoalHeadingsContext value={headings}>
        <DocsBody className={goalArticle ? "wiki-goal-article" : undefined}>
          <MDX
            components={getMDXComponents({
              GoalIndex: () => <GoalIndex goals={goals} />,
              SectionCards: () => <SectionCards tree={tree} />,
              ...(goalArticle ? { h2: GoalArticleHeading } : {}),
            })}
          />
        </DocsBody>
      </GoalHeadingsContext>
      <footer className="wiki-article-footer">
        <PageLinks key={path} path={path} repositoryUrl={repositoryUrl} />
      </footer>
    </>
  );
  return isHome ? (
    <article className="wiki-home-article mx-auto flex w-full max-w-4xl flex-col gap-4 px-6 py-12 md:py-16">
      {body}
    </article>
  ) : (
    <DocsPage
      key={path}
      toc={goalToc}
      breadcrumb={{ includeRoot: true, includePage: true }}
      full={goalToc.length === 0}
      tableOfContent={{ enabled: goalToc.length > 0 }}
      tableOfContentPopover={{ enabled: goalToc.length > 0 }}
    >
      {body}
    </DocsPage>
  );
}

export function WikiView({
  collection,
  data,
  embedded = false,
  goalIconOrigin = "",
  repositoryUrl = "https://github.com/draftout/draftout-wiki",
}: {
  collection: WikiCollection;
  data: WikiPageData;
  embedded?: boolean;
  goalIconOrigin?: string;
  repositoryUrl?: string;
}) {
  useEffect(() => {
    const previous = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    return () => {
      window.history.scrollRestoration = previous;
    };
  }, []);
  const { pageTree } = useFumadocsLoader(data);
  const content = (
    <Suspense>
      <Content collection={collection} data={data} tree={pageTree} repositoryUrl={repositoryUrl} />
    </Suspense>
  );
  const MobileHeader = () => <WikiMobileHeader tree={pageTree} />;
  return (
    <GoalArtworkOrigin value={goalIconOrigin}>
      <div className="draftout-wiki" data-embedded={embedded} data-home={data.isHome}>
        <WikiNavigation tree={pageTree} />
        <div className="wiki-layout">
          {data.isHome ? (
            <>
              {content}
              <footer className="wiki-home-footer">
                <WikiRepository url={repositoryUrl} />
              </footer>
            </>
          ) : (
            <DocsLayout
              tree={pageTree}
              themeSwitch={{ enabled: false }}
              tabs={false}
              sidebar={{ collapsible: false, footer: <WikiRepository url={repositoryUrl} /> }}
              slots={{ navTitle: NoNavTitle, header: MobileHeader, searchTrigger: false }}
            >
              {content}
            </DocsLayout>
          )}
        </div>
      </div>
    </GoalArtworkOrigin>
  );
}
