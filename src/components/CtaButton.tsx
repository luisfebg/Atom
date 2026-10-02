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

type CtaButtonAsLink = SharedProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children"> & {
    href: string;
  };

type CtaButtonAsButton = SharedProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
    href?: undefined;
  };

export type CtaButtonProps = CtaButtonAsLink | CtaButtonAsButton;

function ctaClassName(className?: string, clicking = false) {
  return ["cta", clicking ? "cta-click" : null, className]
    .filter(Boolean)
    .join(" ");
}

/** Primary dark-green pill CTA (e.g. Pre order). */
export function CtaButton(props: CtaButtonProps) {
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
        className={ctaClassName(className, clicking)}
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
  const { onClick, ...buttonRest } = buttonProps;

  return (
    <button
      className={ctaClassName(className, clicking)}
      type="button"
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
