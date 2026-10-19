"use client";

import { useEffect, useId, useRef, useState } from "react";

export const siteFontSet1 = [
  {
    id: "default",
    label: "Manrope + Inter",
    sampleFamily: "var(--font-option-manrope)",
  },
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

export const siteFontSet2 = [
  {
    id: "space-grotesk",
    label: "Space Grotesk",
    sampleFamily: "var(--font-option-space-grotesk)",
  },
  { id: "outfit", label: "Outfit", sampleFamily: "var(--font-option-outfit)" },
  { id: "sora", label: "Sora", sampleFamily: "var(--font-option-sora)" },
  { id: "syne", label: "Syne", sampleFamily: "var(--font-option-syne)" },
  { id: "dm-sans", label: "DM Sans", sampleFamily: "var(--font-option-dm-sans)" },
  { id: "orbitron", label: "Orbitron", sampleFamily: "var(--font-option-orbitron)" },
  { id: "rubik", label: "Rubik", sampleFamily: "var(--font-option-rubik)" },
] as const;

export const siteFontOptions = [...siteFontSet1, ...siteFontSet2] as const;

export type SiteFontId = (typeof siteFontOptions)[number]["id"];
export type FontSetTab = "set-1" | "set-2";

const STORAGE_KEY = "atom-site-font";
const SET_TAB_KEY = "atom-site-font-set";

function isFontId(value: string | null): value is SiteFontId {
  return !!value && siteFontOptions.some((option) => option.id === value);
}

function setForFont(id: SiteFontId): FontSetTab {
  return siteFontSet2.some((option) => option.id === id) ? "set-2" : "set-1";
}

export function FontSwitcher() {
  const [fontId, setFontId] = useState<SiteFontId>("default");
  const [activeSet, setActiveSet] = useState<FontSetTab>("set-1");
  const [open, setOpen] = useState(false);
  const [desktopOpen, setDesktopOpen] = useState(false);
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const desktopToggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (isFontId(saved)) {
      setFontId(saved);
      document.documentElement.dataset.siteFont = saved;
      setActiveSet(setForFont(saved));
      return;
    }

    const savedTab = window.localStorage.getItem(SET_TAB_KEY);
    if (savedTab === "set-1" || savedTab === "set-2") {
      setActiveSet(savedTab);
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

  function selectSet(tab: FontSetTab) {
    setActiveSet(tab);
    window.localStorage.setItem(SET_TAB_KEY, tab);
  }

  function selectFont(id: SiteFontId) {
    setFontId(id);
    document.documentElement.dataset.siteFont = id;
    window.localStorage.setItem(STORAGE_KEY, id);
    setActiveSet(setForFont(id));
    window.localStorage.setItem(SET_TAB_KEY, setForFont(id));
    setOpen(false);
  }

  const visibleFonts = activeSet === "set-1" ? siteFontSet1 : siteFontSet2;
  const activeLabel =
    siteFontOptions.find((option) => option.id === fontId)?.label ?? "Fonts";

  function renderSetTabs(className: string) {
    return (
      <div className={className} role="tablist" aria-label="Font sets">
        <button
          type="button"
          role="tab"
          className={
            activeSet === "set-1"
              ? "font-switcher-set-tab font-switcher-set-tab-active"
              : "font-switcher-set-tab"
          }
          aria-selected={activeSet === "set-1"}
          onClick={() => selectSet("set-1")}
        >
          Set 1
        </button>
        <button
          type="button"
          role="tab"
          className={
            activeSet === "set-2"
              ? "font-switcher-set-tab font-switcher-set-tab-active"
              : "font-switcher-set-tab"
          }
          aria-selected={activeSet === "set-2"}
          onClick={() => selectSet("set-2")}
        >
          Set 2
        </button>
      </div>
    );
  }

  return (
    <>
      <button
        ref={desktopToggleRef}
        className="font-switcher-toggle"
        type="button"
        aria-expanded={desktopOpen}
        aria-controls="font-switcher-desktop-panel"
        onClick={() => setDesktopOpen((value) => !value)}
      >
        {desktopOpen ? "Hide fonts" : "Fonts"}
      </button>

      {desktopOpen ? (
        <div
          id="font-switcher-desktop-panel"
          className="font-switcher font-switcher-desktop"
          role="region"
          aria-label="Font switcher"
        >
          {renderSetTabs("font-switcher-set-tabs")}
          <span className="font-switcher-divider" aria-hidden="true" />
          <p className="font-switcher-label">Fonts</p>
          <div className="font-switcher-options" role="list">
            {visibleFonts.map((option) => (
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
          <button
            className="font-switcher-desktop-close"
            type="button"
            onClick={() => {
              setDesktopOpen(false);
              desktopToggleRef.current?.focus();
            }}
          >
            Close
          </button>
        </div>
      ) : null}

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
            <div className="font-switcher-modal-options">
              {renderSetTabs("font-switcher-set-tabs font-switcher-set-tabs-modal")}
              <div className="font-switcher-modal-group" role="list">
                {visibleFonts.map((option) => (
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
        </div>
      ) : null}
    </>
  );
}
