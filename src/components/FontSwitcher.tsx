"use client";

import { useEffect, useId, useRef, useState } from "react";

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
  const [open, setOpen] = useState(false);
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY) as SiteFontId | null;
    if (saved && siteFontOptions.some((option) => option.id === saved)) {
      setFontId(saved);
      document.documentElement.dataset.siteFont = saved;
    }
  }, []);

  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      triggerRef.current?.focus();
    };
  }, [open]);

  function selectFont(id: SiteFontId) {
    setFontId(id);
    document.documentElement.dataset.siteFont = id;
    window.localStorage.setItem(STORAGE_KEY, id);
    setOpen(false);
  }

  const activeLabel =
    siteFontOptions.find((option) => option.id === fontId)?.label ?? "Fonts";

  return (
    <>
      <div className="font-switcher font-switcher-desktop" role="region" aria-label="Font switcher">
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

      <button
        ref={triggerRef}
        className="font-switcher-trigger"
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen(true)}
      >
        Fonts
        <span className="font-switcher-trigger-current">{activeLabel}</span>
      </button>

      {open ? (
        <div
          className="font-switcher-backdrop"
          role="presentation"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setOpen(false);
            }
          }}
        >
          <div
            className="font-switcher-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
          >
            <header className="font-switcher-modal-header">
              <h2 id={titleId}>Choose a font</h2>
              <button
                ref={closeRef}
                className="font-switcher-modal-close"
                type="button"
                onClick={() => setOpen(false)}
              >
                Close
              </button>
            </header>
            <div className="font-switcher-modal-options" role="list">
              {siteFontOptions.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  role="listitem"
                  className={
                    fontId === option.id
                      ? "font-switcher-modal-option font-switcher-modal-option-active"
                      : "font-switcher-modal-option"
                  }
                  style={{ fontFamily: option.sampleFamily }}
                  aria-pressed={fontId === option.id}
                  onClick={() => selectFont(option.id)}
                >
                  <span className="font-switcher-modal-option-name">
                    {option.label}
                  </span>
                  <span className="font-switcher-modal-option-sample">
                    Small plays big
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
