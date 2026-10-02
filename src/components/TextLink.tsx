import type { AnchorHTMLAttributes, ReactNode } from "react";

export type TextLinkVariant = "default" | "accent" | "on-media";

type TextLinkProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "className" | "children"
> & {
  children: ReactNode;
  href: string;
  variant?: TextLinkVariant;
  className?: string;
  showArrow?: boolean;
};

function textLinkClassName(variant: TextLinkVariant, className?: string) {
  const classes = ["text-link"];

  if (variant === "accent") {
    classes.push("text-link-accent");
  } else if (variant === "on-media") {
    classes.push("text-link-on-media");
  }

  if (className) {
    classes.push(className);
  }

  return classes.join(" ");
}

/** Inline text action with optional arrow (e.g. Learn more, See it in action). */
export function TextLink({
  children,
  href,
  variant = "default",
  className,
  showArrow = true,
  ...rest
}: TextLinkProps) {
  return (
    <a
      className={textLinkClassName(variant, className)}
      href={href}
      {...rest}
    >
      {children}
      {showArrow ? (
        <span className="text-link-arrow" aria-hidden="true">
          →
        </span>
      ) : null}
    </a>
  );
}
