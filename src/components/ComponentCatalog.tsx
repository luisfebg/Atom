"use client";

import { useEffect, useId, useRef, useState } from "react";
import { colorTokens } from "./catalog/colors";
import { typeTokens } from "./catalog/typography";
import { CtaButton } from "./CtaButton";
import { GhostButton } from "./GhostButton";
import { TextLink } from "./TextLink";

type CatalogTab = "components" | "animations" | "assets";

export function ComponentCatalog() {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<CatalogTab>("components");
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

  return (
    <>
      <button
        ref={triggerRef}
        className="catalog-trigger"
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => {
          setTab("components");
          setOpen(true);
        }}
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
                  Shared UI components, motion, and colour/type assets.
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

            <div
              className="catalog-tabs"
              role="tablist"
              aria-label="Design system sections"
            >
              <button
                className={
                  tab === "components"
                    ? "catalog-tab catalog-tab-active"
                    : "catalog-tab"
                }
                type="button"
                role="tab"
                aria-selected={tab === "components"}
                id="catalog-tab-components"
                aria-controls="catalog-panel-components"
                onClick={() => setTab("components")}
              >
                Components
              </button>
              <button
                className={
                  tab === "animations"
                    ? "catalog-tab catalog-tab-active"
                    : "catalog-tab"
                }
                type="button"
                role="tab"
                aria-selected={tab === "animations"}
                id="catalog-tab-animations"
                aria-controls="catalog-panel-animations"
                onClick={() => setTab("animations")}
              >
                Animations
              </button>
              <button
                className={
                  tab === "assets" ? "catalog-tab catalog-tab-active" : "catalog-tab"
                }
                type="button"
                role="tab"
                aria-selected={tab === "assets"}
                id="catalog-tab-assets"
                aria-controls="catalog-panel-assets"
                onClick={() => setTab("assets")}
              >
                Assets
              </button>
            </div>

            <div className="catalog-modal-body">
              {tab === "components" ? (
                <div
                  role="tabpanel"
                  id="catalog-panel-components"
                  aria-labelledby="catalog-tab-components"
                >
                  <section className="catalog-group">
                    <h3>Buttons</h3>
                    <ul className="catalog-component-list">
                      <li className="catalog-component">
                        <div className="catalog-item-meta">
                          <p className="catalog-item-name">CTA</p>
                          <p className="catalog-item-description">
                            Primary dark-green pill action. Used for Pre order.
                          </p>
                          <p className="catalog-item-description">
                            CtaButton · .cta
                          </p>
                        </div>
                        <div className="catalog-component-preview">
                          <CtaButton href="#product">Pre order</CtaButton>
                        </div>
                      </li>
                      <li className="catalog-component">
                        <div className="catalog-item-meta">
                          <p className="catalog-item-name">Ghost button</p>
                          <p className="catalog-item-description">
                            Transparent outlined pill. Used for Watch video and
                            Menu.
                          </p>
                          <p className="catalog-item-description">
                            GhostButton · .btn-ghost
                          </p>
                        </div>
                        <div className="catalog-component-preview catalog-component-preview-on-dark">
                          <GhostButton href="#watch">Watch video</GhostButton>
                        </div>
                      </li>
                    </ul>
                  </section>

                  <section className="catalog-group">
                    <h3>Text links</h3>
                    <ul className="catalog-component-list">
                      <li className="catalog-component">
                        <div className="catalog-item-meta">
                          <p className="catalog-item-name">Text link</p>
                          <p className="catalog-item-description">
                            Inline action with arrow. Used for Learn more.
                          </p>
                          <p className="catalog-item-description">
                            TextLink · .text-link
                          </p>
                        </div>
                        <div className="catalog-component-preview">
                          <TextLink href="#product-more">Learn more</TextLink>
                        </div>
                      </li>
                      <li className="catalog-component">
                        <div className="catalog-item-meta">
                          <p className="catalog-item-name">Text link accent</p>
                          <p className="catalog-item-description">
                            Accent-coloured inline action. Used for See it in
                            action.
                          </p>
                          <p className="catalog-item-description">
                            TextLink variant=&quot;accent&quot; ·
                            .text-link-accent
                          </p>
                        </div>
                        <div className="catalog-component-preview catalog-component-preview-on-dark">
                          <TextLink href="#about-more" variant="accent">
                            See it in action
                          </TextLink>
                        </div>
                      </li>
                    </ul>
                  </section>
                </div>
              ) : null}

              {tab === "animations" ? (
                <div
                  role="tabpanel"
                  id="catalog-panel-animations"
                  aria-labelledby="catalog-tab-animations"
                >
                  <section className="catalog-group">
                    <h3>CTA press</h3>
                    <ul className="catalog-component-list">
                      <li className="catalog-component">
                        <div className="catalog-item-meta">
                          <p className="catalog-item-name">Click press + flash</p>
                          <p className="catalog-item-description">
                            On click, CTA briefly lightens, presses down, then
                            springs back. Animation: cta-press · .cta-click
                          </p>
                          <p className="catalog-item-description">
                            Built into CtaButton. Click to preview.
                          </p>
                        </div>
                        <div className="catalog-component-preview">
                          <CtaButton type="button">Pre order</CtaButton>
                        </div>
                      </li>
                    </ul>
                  </section>

                  <section className="catalog-group">
                    <h3>Ghost press</h3>
                    <ul className="catalog-component-list">
                      <li className="catalog-component">
                        <div className="catalog-item-meta">
                          <p className="catalog-item-name">Click press + flash</p>
                          <p className="catalog-item-description">
                            On click, ghost button briefly fills lighter, presses
                            down, then recovers. Animation: btn-ghost-press ·
                            .btn-ghost-click
                          </p>
                          <p className="catalog-item-description">
                            Built into GhostButton. Click to preview.
                          </p>
                        </div>
                        <div className="catalog-component-preview catalog-component-preview-on-dark">
                          <GhostButton type="button">Watch video</GhostButton>
                        </div>
                      </li>
                    </ul>
                  </section>
                </div>
              ) : null}

              {tab === "assets" ? (
                <div
                  role="tabpanel"
                  id="catalog-panel-assets"
                  aria-labelledby="catalog-tab-assets"
                >
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
                            <p className="catalog-item-description">
                              {token.usage}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </section>

                  <section className="catalog-group">
                    <h3>Typography</h3>
                    <ul className="catalog-type-list">
                      {typeTokens.map((token) => (
                        <li key={token.id} className="catalog-type">
                          <p
                            className={
                              token.role === "display"
                                ? "catalog-type-sample catalog-type-sample-display"
                                : "catalog-type-sample catalog-type-sample-body"
                            }
                          >
                            {token.sample}
                          </p>
                          <div className="catalog-item-meta">
                            <p className="catalog-item-name">{token.name}</p>
                            <p className="catalog-item-description">
                              {token.family} · {token.cssVar}
                            </p>
                            <p className="catalog-item-description">
                              {token.usage}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </section>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
