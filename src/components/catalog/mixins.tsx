import type { ComponentType } from "react";

export type MixinEntry = {
  id: string;
  name: string;
  description: string;
  className: string;
  Preview: ComponentType;
};

function FocusRingPreview() {
  return (
    <div className="catalog-preview-frame catalog-preview-frame--center">
      <button className="mixin-focus-ring catalog-mixin-demo" type="button">
        Focus me
      </button>
    </div>
  );
}

function InvertOnHoverPreview() {
  return (
    <div className="catalog-preview-frame catalog-preview-frame--center">
      <button className="mixin-invert-hover catalog-mixin-demo" type="button">
        Hover me
      </button>
    </div>
  );
}

function UnderlineLinkPreview() {
  return (
    <div className="catalog-preview-frame catalog-preview-frame--center">
      <a
        className="mixin-underline-link"
        href="#top"
        onClick={(event) => event.preventDefault()}
      >
        Underline link
      </a>
    </div>
  );
}

function HairlineRulePreview() {
  return (
    <div className="catalog-preview-frame">
      <p className="catalog-mixin-label">Above</p>
      <div className="mixin-hairline" />
      <p className="catalog-mixin-label">Below</p>
    </div>
  );
}

/**
 * Register reusable style mixins here.
 * Each mixin is a shared CSS class you can apply across components.
 */
export const mixinEntries: MixinEntry[] = [
  {
    id: "focus-ring",
    name: "Focus Ring",
    description: "Accent outline for keyboard focus.",
    className: "mixin-focus-ring",
    Preview: FocusRingPreview,
  },
  {
    id: "invert-hover",
    name: "Invert on Hover",
    description: "Swap primary and accent fill on hover and focus.",
    className: "mixin-invert-hover",
    Preview: InvertOnHoverPreview,
  },
  {
    id: "underline-link",
    name: "Underline Link",
    description: "Offset underline that appears on hover and focus.",
    className: "mixin-underline-link",
    Preview: UnderlineLinkPreview,
  },
  {
    id: "hairline",
    name: "Hairline Rule",
    description: "1px primary divider used between sections.",
    className: "mixin-hairline",
    Preview: HairlineRulePreview,
  },
];
