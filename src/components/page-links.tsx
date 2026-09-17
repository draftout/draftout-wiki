import { useState } from "react";
import { Check, Link, Code } from "lucide-react";
export function PageLinks({ path, repositoryUrl }: { path: string; repositoryUrl: string }) {
  const [copied, setCopied] = useState(false);
  const [failed, setFailed] = useState(false);
  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setFailed(false);
    } catch {
      setFailed(true);
    }
  }
  return (
    <div className="wiki-page-links not-prose">
      <button type="button" onClick={copyLink}>
        {copied ? <Check size={15} /> : <Link size={15} />}
        {failed ? "Copy unavailable" : copied ? "Link copied" : "Copy link"}
      </button>
      <a
        href={`${repositoryUrl}/blob/main/content/docs/${path.split("/").map(encodeURIComponent).join("/")}`}
        target="_blank"
        rel="noreferrer"
      >
        <Code size={15} />
        View source
      </a>
      <span className="sr-only" role="status">
        {failed
          ? "Could not copy. Copy the address from your browser."
          : copied
            ? "Page link copied."
            : ""}
      </span>
    </div>
  );
}
