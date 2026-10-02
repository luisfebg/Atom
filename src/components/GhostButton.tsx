"use client";

import {
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  type MouseEvent,
  type ReactNode,
  useCallback,
  useState,
} from "react";

type SharedProps = {
  children: ReactNode;
  className?: string;
};

type GhostButtonAsLink = SharedProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children"> & {
    href: string;
  };

type GhostButtonAsButton = SharedProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
    href?: undefined;
  };

export type GhostButtonProps = GhostButtonAsLink | GhostButtonAsButton;

function ghostClassName(className?: string, clicking = false) {
  return ["btn-ghost", clicking ? "btn-ghost-click" : null, className]
    .filter(Boolean)
    .join(" ");
}

/** Transparent outlined pill button (e.g. Watch video, Menu). */
export function GhostButton(props: GhostButtonProps) {
  const { children, className, ...rest } = props;
  const [clicking, setClicking] = useState(false);

  const playClick = useCallback(() => {
    setClicking(false);
    requestAnimationFrame(() => setClicking(true));
  }, []);

  const onAnimationEnd = useCallback(() => {
    setClicking(false);
  }, []);

  if ("href" in rest && rest.href !== undefined) {
    const { onClick, ...linkRest } = rest;

    return (
      <a
        className={ghostClassName(className, clicking)}
        onClick={(event: MouseEvent<HTMLAnchorElement>) => {
          playClick();
          onClick?.(event);
        }}
        onAnimationEnd={onAnimationEnd}
        {...linkRest}
      >
        {children}
      </a>
    );
  }

  const buttonProps = rest as Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    "className" | "children"
  >;
  const { onClick, type = "button", ...buttonRest } = buttonProps;

  return (
    <button
      className={ghostClassName(className, clicking)}
      type={type}
      onClick={(event: MouseEvent<HTMLButtonElement>) => {
        playClick();
        onClick?.(event);
      }}
      onAnimationEnd={onAnimationEnd}
      {...buttonRest}
    >
      {children}
    </button>
  );
}
