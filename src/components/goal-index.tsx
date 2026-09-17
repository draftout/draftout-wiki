import { GoalIcon } from "./goal-artwork";
import { useId, useState } from "react";
import { Link } from "fumadocs-core/framework";
import type { GoalEntry } from "@/lib/goals";

export function GoalIndex({ goals }: { goals: GoalEntry[] }) {
  const [query, setQuery] = useState("");
  const id = useId();
  const normalized = query.trim().toLocaleLowerCase("en");
  const filtered = goals.filter((goal) => goal.title.toLocaleLowerCase("en").includes(normalized));
  return (
    <div className="wiki-goal-index not-prose">
      <label htmlFor={id} className="mb-2 block text-sm font-medium">
        Filter goals
      </label>
      <input
        id={id}
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search goal names…"
        className="w-full border bg-fd-secondary px-3 py-2 text-base outline-none focus-visible:ring-2 focus-visible:ring-fd-ring"
      />
      <p className="text-sm text-fd-muted-foreground" role="status">
        {filtered.length} {filtered.length === 1 ? "goal" : "goals"}
      </p>
      {filtered.length ? (
        <ul className="wiki-goal-grid">
          {filtered.map((goal) => (
            <li key={goal.url}>
              <Link href={goal.url} className="wiki-index-goal">
                <span className="wiki-index-artwork">
                  <GoalIcon title={goal.title} />
                </span>
                <span>{goal.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No goals match “{query}”. Try another name.</p>
      )}
    </div>
  );
}
