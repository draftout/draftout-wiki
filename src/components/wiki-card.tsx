import Link from "fumadocs-core/link";
import type { CardProps } from "fumadocs-ui/components/card";
import { PixelFrame } from "@/design/PixelFrame";
export function WikiCard({
  children,
  title,
  description,
  icon,
  className,
  href,
  external,
  ...props
}: CardProps) {
  const Element = href ? Link : "div";
  return (
    <Element
      {...props}
      href={href}
      external={external}
      data-card
      className={`wiki-card pixel-frame-host @max-lg:col-span-full ${className ?? ""}`}
    >
      <PixelFrame kind="panel" />
      <div className="wiki-card-title">
        {icon}
        <h3>{title}</h3>
      </div>
      {description && <p>{description}</p>}
      <div>{children}</div>
    </Element>
  );
}
