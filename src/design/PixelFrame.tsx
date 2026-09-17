import "./pixel-frame.css";

export function PixelFrame({
  kind = "panel",
  fill = false,
  className = "",
}: {
  kind?: "panel" | "button" | "hovered";
  fill?: boolean;
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={`pixel-frame ${className}`}
      data-texture={kind === "hovered" ? "button-hovered" : kind}
      data-fill={fill}
    >
      {["tl", "t", "tr", "l", "c", "r", "bl", "b", "br"].map((piece) => (
        <span key={piece} className={`pixel-frame-piece pixel-frame-${piece}`} />
      ))}
    </span>
  );
}
