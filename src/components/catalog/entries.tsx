import type { CatalogEntry } from "./types";

function TopBarPreview() {
  return (
    <div className="catalog-preview-frame">
      <div className="catalog-topbar-mock" aria-hidden="true">
        <span className="brand">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="brand-icon"
            src="/images/atom_logo_only.png"
            alt=""
            width={32}
            height={32}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="brand-title"
            src="/images/atom_title_only.png"
            alt=""
            width={88}
            height={20}
          />
        </span>
        <div className="catalog-topbar-mock-links">
          <span>Features</span>
          <span>About</span>
          <span>Support</span>
          <span className="cta">Pre order</span>
        </div>
      </div>
    </div>
  );
}

function CtaButtonPreview() {
  return (
    <div className="catalog-preview-frame catalog-preview-frame--center">
      <a className="cta" href="#get-started" onClick={(event) => event.preventDefault()}>
        Pre order
      </a>
    </div>
  );
}

function MenuTogglePreview() {
  return (
    <div className="catalog-preview-frame catalog-preview-frame--center">
      <button className="menu-toggle catalog-menu-toggle-demo" type="button">
        Menu
      </button>
    </div>
  );
}

/**
 * Register site components here.
 * Add a new entry whenever you create a reusable UI piece.
 */
export const catalogEntries: CatalogEntry[] = [
  {
    id: "topbar",
    name: "TopBar",
    category: "Navigation",
    description: "Sticky site header with brand, links, and CTA.",
    Preview: TopBarPreview,
  },
  {
    id: "cta-button",
    name: "CTA Button",
    category: "Actions",
    description: "Accent-filled call-to-action control.",
    Preview: CtaButtonPreview,
  },
  {
    id: "menu-toggle",
    name: "Menu Toggle",
    category: "Navigation",
    description: "Mobile nav open/close control.",
    Preview: MenuTogglePreview,
  },
];
