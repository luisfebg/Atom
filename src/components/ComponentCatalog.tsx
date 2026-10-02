"use client";

import { useEffect, useId, useRef, useState } from "react";
import { colorTokens } from "./catalog/colors";
import { catalogEntries } from "./catalog/entries";
import { mixinEntries } from "./catalog/mixins";

export function ComponentCatalog() {
  const [open, setOpen] = useState(false);
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

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

  const categories = Array.from(
    new Set(catalogEntries.map((entry) => entry.category ?? "General")),
  );

  return (
    <>
      <button
        ref={triggerRef}
        className="catalog-trigger"
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen(true)}
      >
        Components
      </button>

      {open ? (
        <div
          className="catalog-backdrop"
          role="presentation"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setOpen(false);
            }
          }}
        >
          <div
            className="catalog-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
          >
            <header className="catalog-modal-header">
              <div>
                <p className="catalog-modal-eyebrow">Library</p>
                <h2 id={titleId}>Design system</h2>
                <p className="catalog-modal-lead">
                  Colour scheme, mixins, and components used across the site.
                  Extend the registries as you build.
                </p>
              </div>
              <button
                ref={closeRef}
                className="catalog-close"
                type="button"
                onClick={() => setOpen(false)}
              >
                Close
              </button>
            </header>

            <div className="catalog-modal-body">
              <section className="catalog-group">
                <h3>Colour scheme</h3>
                <ul className="catalog-swatch-list">
                  {colorTokens.map((token) => (
                    <li key={token.id} className="catalog-swatch">
                      <span
                        className="catalog-swatch-chip"
                        style={{ background: token.value }}
                        aria-hidden="true"
                      />
                      <div className="catalog-item-meta">
                        <p className="catalog-item-name">{token.name}</p>
                        <p className="catalog-item-description">
                          {token.value} · {token.cssVar}
                        </p>
                        <p className="catalog-item-description">{token.usage}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="catalog-group">
                <h3>Mixins</h3>
                <ul className="catalog-list">
                  {mixinEntries.map((entry) => {
                    const Preview = entry.Preview;

                    return (
                      <li key={entry.id} className="catalog-item">
                        <div className="catalog-item-meta">
                          <p className="catalog-item-name">{entry.name}</p>
                          <p className="catalog-item-description">
                            {entry.description}
                          </p>
                          <p className="catalog-item-code">.{entry.className}</p>
                        </div>
                        <div className="catalog-item-preview">
                          <Preview />
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </section>

              {categories.map((category) => {
                const entries = catalogEntries.filter(
                  (entry) => (entry.category ?? "General") === category,
                );

                return (
                  <section key={category} className="catalog-group">
                    <h3>{category}</h3>
                    <ul className="catalog-list">
                      {entries.map((entry) => {
                        const Preview = entry.Preview;

                        return (
                          <li key={entry.id} className="catalog-item">
                            <div className="catalog-item-meta">
                              <p className="catalog-item-name">{entry.name}</p>
                              {entry.description ? (
                                <p className="catalog-item-description">
                                  {entry.description}
                                </p>
                              ) : null}
                            </div>
                            <div className="catalog-item-preview">
                              <Preview />
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </section>
                );
              })}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
