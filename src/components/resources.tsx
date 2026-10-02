import { resources, type ResourceId } from "@/lib/resources";

export function Resources({ ids }: { ids: ResourceId[] }) {
  return (
    <ul>
      {ids.map((id) => {
        const { url, title, description } = resources[id];
        return (
          <li key={id}>
            <a href={url}>{title}</a>
            {description ? `: ${description}.` : ""}
          </li>
        );
      })}
    </ul>
  );
}
