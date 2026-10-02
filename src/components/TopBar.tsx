"use client";

import Image from "next/image";
import { useState } from "react";
import { BagIcon } from "@/components/BagIcon";
import { ComponentCatalog } from "@/components/ComponentCatalog";
import { CtaButton } from "@/components/CtaButton";
import { GhostButton } from "@/components/GhostButton";

const links = [
  { href: "#control", label: "Control" },
  { href: "#colours", label: "Colours" },
  { href: "#carry", label: "Carry" },
];

export function TopBar() {
  const [open, setOpen] = useState(false);

  function close() {
    setOpen(false);
  }

  return (
    <header className="topbar">
      <a className="brand" href="#top" onClick={close}>
        <Image
          className="brand-icon"
          src="/images/atom_logo_only.png"
          alt=""
          width={72}
          height={72}
          priority
        />
        <Image
          className="brand-title"
          src="/images/atom_title_on_dark.png"
          alt="Atom"
          width={200}
          height={46}
          priority
        />
      </a>

      <div className="topbar-end">
        <div className={open ? "topbar-options open" : "topbar-options"}>
          <div className="topbar-menu-bloom" aria-hidden="true">
            <Image
              className="topbar-menu-bloom-photo"
              src="/images/section-1.jpg"
              alt=""
              fill
              sizes="100vw"
              unoptimized
            />
          </div>
          <div className="topbar-menu-body">
            <ComponentCatalog />
            <nav id="primary-nav" className="primary-nav" aria-label="Primary">
              {links.map((link) => (
                <a key={link.href} href={link.href} onClick={close}>
                  {link.label}
                </a>
              ))}
              <a className="bag-button" href="#bag" aria-label="Bag" onClick={close}>
                <BagIcon />
              </a>
              <CtaButton href="#control" onClick={close}>
                Pre order
              </CtaButton>
            </nav>
          </div>
        </div>

        <GhostButton
          className="menu-toggle"
          type="button"
          aria-expanded={open}
          aria-controls="primary-nav"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? "Close" : "Menu"}
        </GhostButton>
      </div>
    </header>
  );
}
