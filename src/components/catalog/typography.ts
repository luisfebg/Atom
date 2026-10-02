export type TypeToken = {
  id: string;
  name: string;
  family: string;
  cssVar: string;
  usage: string;
  sample: string;
  role: "display" | "body";
};

/**
 * Site typefaces.
 * Keep these in sync with next/font setup in app/layout.tsx and CSS variables.
 */
export const typeTokens: TypeToken[] = [
  {
    id: "display",
    name: "Manrope",
    family: "Manrope",
    cssVar: "--font-display",
    usage: "Headlines and display titles.",
    sample: "Tiny pad. Sticks on.",
    role: "display",
  },
  {
    id: "body",
    name: "Inter",
    family: "Inter",
    cssVar: "--font-body",
    usage: "Body copy and UI controls.",
    sample: "Clip Atom to a phone, tablet, or laptop.",
    role: "body",
  },
];
