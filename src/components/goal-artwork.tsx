import { ChevronRight } from "lucide-react";
import { createContext, use } from "react";
import { goalArtwork, type GoalArtwork } from "@/lib/goal-artwork";

/** Origin that serves `/goal-icons` - empty when the wiki runs on the Draftout website. */
export const GoalArtworkOrigin = createContext("");

function Artwork({ artwork }: { artwork: GoalArtwork }) {
  const origin = use(GoalArtworkOrigin);
  return (
    <img
      className="wiki-goal-icon"
      src={origin + artwork.path}
      width={32}
      height={32}
      loading="lazy"
      alt=""
    />
  );
}
export function GoalIcon({ title }: { title: string }) {
  const icon = goalArtwork(title)[0];
  return icon ? <Artwork artwork={icon} /> : null;
}
export function GoalVariants({ title }: { title: string }) {
  const variants = goalArtwork(title);
  if (variants.length < 2) return null;
  return (
    <details className="wiki-goal-variants">
      <summary>
        <ChevronRight className="wiki-variants-chevron" size={16} aria-hidden="true" />
        <span>{variants.length} variants</span>
      </summary>
      <ul>
        {variants.map((variant) => (
          <li key={variant.path}>
            <Artwork artwork={variant} />
            <span>{variant.label}</span>
          </li>
        ))}
      </ul>
    </details>
  );
}
