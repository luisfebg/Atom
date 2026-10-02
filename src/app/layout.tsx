import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Atom",
  description: "Atom",
  icons: {
    icon: [{ url: "/images/atom_logo_only.png", type: "image/png" }],
    apple: [{ url: "/images/atom_logo_only.png", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
