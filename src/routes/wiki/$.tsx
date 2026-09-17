import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { docs, source } from "@/lib/source";
import { loadWikiPage } from "@/lib/wiki-page.server";
import { WikiView } from "@/components/wiki-view";

const serverLoader = createServerFn({ method: "GET" })
  .validator((slugs: string[]) => slugs)
  .handler(({ data }) => loadWikiPage(source, data));

export const Route = createFileRoute("/wiki/$")({
  loader: async ({ params }) => {
    const data = await serverLoader({ data: params._splat?.split("/").filter(Boolean) ?? [] });
    await docs.getPage(data.path)?.preload();
    return data;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `${loaderData.title} | Draftout Wiki` : "Draftout Wiki" },
      ...(loaderData?.description
        ? [{ name: "description", content: loaderData.description }]
        : []),
    ],
  }),
  component: () => (
    <WikiView
      collection={docs}
      data={Route.useLoaderData()}
      goalIconOrigin="https://draftoutmc.com"
    />
  ),
});
