import { Link } from "@tanstack/react-router";

export function NotFound() {
  return (
    <main className="draftout-wiki wiki-not-found" data-embedded="false">
      <h1>Page not found</h1>
      <p>This wiki page does not exist or has moved.</p>
      <Link to="/wiki/$" params={{ _splat: "" }}>
        Back to the wiki
      </Link>
    </main>
  );
}
