import type { Metadata } from "next";
import {
  DM_Sans,
  Exo_2,
  Inter,
  Manrope,
  Michroma,
  Orbitron,
  Outfit,
  Plus_Jakarta_Sans,
  Rubik,
  Sora,
  Space_Grotesk,
  Syne,
  Unica_One,
} from "next/font/google";
import { FontSwitcher } from "@/components/FontSwitcher";
import "./globals.scss";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-option-inter",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-option-manrope",
  display: "swap",
});

const unicaOne = Unica_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-option-unica-one",
  display: "swap",
});

const michroma = Michroma({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-option-michroma",
  display: "swap",
});

const exo2 = Exo_2({
  subsets: ["latin"],
  variable: "--font-option-exo-2",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-option-plus-jakarta",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-option-space-grotesk",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-option-outfit",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-option-sora",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-option-syne",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-option-dm-sans",
  display: "swap",
});

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-option-orbitron",
  display: "swap",
});

const rubik = Rubik({
  subsets: ["latin"],
  variable: "--font-option-rubik",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Atom",
  description: "Atom",
  icons: {
    icon: [{ url: "/images/atom_logo_only.png", type: "image/png" }],
    apple: [{ url: "/images/atom_logo_only.png", type: "image/png" }],
  },
};

const fontVariables = [
  inter.variable,
  manrope.variable,
  unicaOne.variable,
  michroma.variable,
  exo2.variable,
  plusJakarta.variable,
  spaceGrotesk.variable,
  outfit.variable,
  sora.variable,
  syne.variable,
  dmSans.variable,
  orbitron.variable,
  rubik.variable,
].join(" ");

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={fontVariables} data-site-font="default">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Bpmf+Huninn&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
        <FontSwitcher />
      </body>
    </html>
  );
}
