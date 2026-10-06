"use client";

import { useEffect, useState } from "react";

export const siteFontOptions = [
  { id: "default", label: "Manrope + Inter", sampleFamily: "var(--font-option-manrope)" },
  { id: "manrope", label: "Manrope", sampleFamily: "var(--font-option-manrope)" },
  { id: "inter", label: "Inter", sampleFamily: "var(--font-option-inter)" },
  { id: "unica-one", label: "Unica One", sampleFamily: "var(--font-option-unica-one)" },
  { id: "michroma", label: "Michroma", sampleFamily: "var(--font-option-michroma)" },
  { id: "bpmf-huninn", label: "Bpmf Huninn", sampleFamily: "var(--font-option-bpmf-huninn)" },
  { id: "exo-2", label: "Exo 2", sampleFamily: "var(--font-option-exo-2)" },
  {
    id: "plus-jakarta",
    label: "Plus Jakarta",
    sampleFamily: "var(--font-option-plus-jakarta)",
  },
] as const;

export type SiteFontId = (typeof siteFontOptions)[number]["id"];

const STORAGE_KEY = "atom-site-font";

export function FontSwitcher() {
  const [fontId, setFontId] = useState<SiteFontId>("default");

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY) as SiteFontId | null;
    if (saved && siteFontOptions.some((option) => option.id === saved)) {
      setFontId(saved);
      document.documentElement.dataset.siteFont = saved;
    }
  }, []);

  function selectFont(id: SiteFontId) {
    setFontId(id);
    document.documentElement.dataset.siteFont = id;
    window.localStorage.setItem(STORAGE_KEY, id);
  }

  return (
    <div className="font-switcher" role="region" aria-label="Font switcher">
      <p className="font-switcher-label">Fonts</p>
      <div className="font-switcher-options" role="list">
        {siteFontOptions.map((option) => (
          <button
            key={option.id}
            type="button"
            role="listitem"
            className={
              fontId === option.id
                ? "font-switcher-option font-switcher-option-active"
                : "font-switcher-option"
            }
            style={{ fontFamily: option.sampleFamily }}
            aria-pressed={fontId === option.id}
            onClick={() => selectFont(option.id)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
