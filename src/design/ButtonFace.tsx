import type { ReactNode } from "react";
import { PixelFrame } from "./PixelFrame";
import "./game-button.css";
export function ButtonFace({
  children,
  icon,
  active = false,
}: {
  children?: ReactNode;
  icon?: ReactNode;
  active?: boolean;
}) {
  return (
    <>
      <PixelFrame kind={active ? "hovered" : "button"} fill className="game-button-frame" />
      {icon && (
        <span className="game-button-inline-icon" aria-hidden="true">
          {icon}
        </span>
      )}
      {children && <span className="game-button-label max-md:sr-only">{children}</span>}
    </>
  );
}
