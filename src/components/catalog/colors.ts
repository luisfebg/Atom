export type ColorToken = {
  id: string;
  name: string;
  value: string;
  cssVar: string;
  usage: string;
};

/**
 * Site colour scheme.
 * Keep these in sync with the CSS variables on :root.
 */
export const colorTokens: ColorToken[] = [
  {
    id: "primary",
    name: "Primary",
    value: "#0B3B32",
    cssVar: "--color-primary",
    usage: "Borders, chrome, and strong fills.",
  },
  {
    id: "accent",
    name: "Accent",
    value: "#18D5A4",
    cssVar: "--color-accent",
    usage: "CTAs, highlights, and interactive emphasis.",
  },
  {
    id: "dark",
    name: "Dark",
    value: "#062720",
    cssVar: "--color-dark",
    usage: "Deep fills and high-contrast surfaces.",
  },
  {
    id: "background",
    name: "Background",
    value: "#F4F0E8",
    cssVar: "--color-background",
    usage: "Page and surface background.",
  },
  {
    id: "text",
    name: "Text",
    value: "#171A19",
    cssVar: "--color-text",
    usage: "Default body and UI text.",
  },
  {
    id: "text-on-dark",
    name: "Text on Dark",
    value: "#FFFFFF",
    cssVar: "--color-text-on-dark",
    usage: "Text on dark or primary fills.",
  },
];
