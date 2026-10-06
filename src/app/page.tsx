import Image from "next/image";
import type { ReactNode } from "react";
import { TopBar } from "@/components/TopBar";
import { SiteFooter } from "@/components/SiteFooter";
import { CtaButton } from "@/components/CtaButton";
import { TextLink } from "@/components/TextLink";
import type { TextLinkVariant } from "@/components/TextLink";
import { GhostButton } from "@/components/GhostButton";

const infoSections = [
  {
    id: "product",
    title: "Take control anywhere",
    overtitle: {
      line1: "Pocket sized...",
      line2: "full of possibilities",
    },
    body: "Console-level control in a form that fits your pocket. ATOM is made for gamers who never want to be without their favourite games.",
    tone: "light" as const,
    layout: "triptych" as const,
    image: {
      src: "/images/section-2-hand.jpg",
      alt: "Atom gamepad held between fingers to show its tiny size",
      width: 512,
      height: 340,
    },
    images: [
      {
        src: "/images/section-2-hand.jpg",
        alt: "Atom gamepad held between fingers to show its tiny size",
        width: 512,
        height: 340,
        objectPosition: "center",
      },
      {
        src: "/images/section-2-side.jpg",
        alt: "Side profile of Atom showing power button and USB-C port",
        width: 510,
        height: 340,
        objectPosition: "center",
      },
    ],
    action: {
      href: "#product-more",
      label: "Learn more",
      style: "text-link" as const,
      variant: "default" as const,
    },
  },
  {
    id: "features",
    title: "In a range of stunning finishes.",
    overtitle: {
      line1: "A colour for every",
      line2: "playground",
    },
    body: "",
    tone: "light" as const,
    layout: "split" as const,
    image: {
      src: "/images/section-3.jpg",
      alt: "Atom gamepads in black, green, pink, and cream lined up together",
      width: 1292,
      height: 443,
    },
    action: {
      href: "#features-gallery",
      label: "Explore all colours",
      style: "button" as const,
    },
  },
  {
    id: "about",
    title: "Play more, carry less",
    overtitle: {
      line1: "Built for",
      line2: "what moves you",
    },
    body: "ATOM is designed to go wherever life takes you. Slip it in your pocket and you're always ready for the next game, the next journey, the next moment.",
    tone: "dark" as const,
    layout: "overlay" as const,
    image: {
      src: "/images/section-4.jpg",
      alt: "Atom gamepad tucked into a bag pocket beside phones",
      width: 1024,
      height: 278,
    },
    action: {
      href: "#about-more",
      label: "See it in action",
      style: "text-link" as const,
      variant: "accent" as const,
    },
  },
  {
    id: "support",
    title: {
      line1: "Secretly planning",
      line2: "world domination",
    },
    body: "A small controller for a much bigger world. Thanks for being a part of it.",
    tone: "dark" as const,
    layout: "overlay" as const,
    copyLayout: "closing" as const,
    image: {
      src: "/images/section-5.jpg",
      alt: "Traveler with a backpack overlooking misty mountain ranges",
      width: 1024,
      height: 275,
    },
  },
];

function sectionAction(section: (typeof infoSections)[number]) {
  if (!("action" in section) || !section.action) {
    return null;
  }

  if (section.action.style === "button") {
    return (
      <CtaButton
        className="info-section-action"
        href={section.action.href}
      >
        {section.action.label}
        <span className="cta-arrow" aria-hidden="true">
          →
        </span>
      </CtaButton>
    );
  }

  const variant: TextLinkVariant = section.action.variant ?? "default";

  return (
    <TextLink
      className="info-section-action"
      href={section.action.href}
      variant={variant}
    >
      {section.action.label}
    </TextLink>
  );
}

type SectionImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  objectPosition?: string;
};

function SectionPhotoTile({
  photo,
  priority = false,
  sizes,
}: {
  photo: SectionImage;
  priority?: boolean;
  sizes: string;
}) {
  return (
    <div
      className="section-photo-tile"
      style={{
        ["--section-photo-tile-ratio" as string]: `${photo.width} / ${photo.height}`,
      }}
    >
      <Image
        className="section-photo"
        src={photo.src}
        alt={photo.alt}
        fill
        priority={priority}
        quality={100}
        sizes={sizes}
        unoptimized
        style={
          photo.objectPosition
            ? { objectPosition: photo.objectPosition }
            : undefined
        }
      />
    </div>
  );
}

function SectionFrame({
  image,
  images,
  priority = false,
  layout = "overlay",
  tone = "light",
  overlayClassName = "section-overlay",
  children,
}: {
  image: SectionImage;
  images?: SectionImage[];
  priority?: boolean;
  layout?: "overlay" | "split" | "triptych";
  tone?: "light" | "dark";
  overlayClassName?: string;
  children?: ReactNode;
}) {
  if (layout === "triptych" && images && images.length >= 2) {
    const [leftPhoto, rightPhoto] = images;

    return (
      <div
        className={`section-frame section-frame-triptych section-frame-split-${tone}`}
        style={{
          ["--section-photo-ratio" as string]: `${leftPhoto.width} / ${leftPhoto.height}`,
        }}
      >
        <div className="section-photo-pane section-photo-pane-hand">
          <SectionPhotoTile
            photo={leftPhoto}
            priority={priority}
            sizes="(max-width: 720px) 55vw, 35vw"
          />
        </div>
        <div className="section-copy-pane">{children}</div>
        <div className="section-photo-pane section-photo-pane-side">
          <SectionPhotoTile
            photo={rightPhoto}
            priority={priority}
            sizes="(max-width: 720px) 100vw, 35vw"
          />
        </div>
      </div>
    );
  }

  if (layout === "split") {
    return (
      <div
        className={`section-frame section-frame-split section-frame-split-${tone}`}
        style={{
          ["--section-photo-ratio" as string]: `${image.width} / ${image.height}`,
        }}
      >
        <div className="section-copy-pane">{children}</div>
        <div className="section-photo-pane">
          <Image
            className="section-photo section-photo-right"
            src={image.src}
            alt={image.alt}
            fill
            priority={priority}
            quality={100}
            sizes="(max-width: 720px) 100vw, 70vw"
            unoptimized
          />
        </div>
      </div>
    );
  }

  return (
    <div
      className="section-frame section-frame-overlay"
      style={{
        ["--section-aspect" as string]: `${image.width} / ${image.height}`,
      }}
    >
      <Image
        className="section-photo"
        src={image.src}
        alt={image.alt}
        fill
        priority={priority}
        quality={100}
        sizes="100vw"
        unoptimized
      />
      {children ? (
        <div className={overlayClassName}>{children}</div>
      ) : null}
    </div>
  );
}

export default function Home() {
  return (
    <main id="top">
      <section className="hero">
        <SectionFrame
          priority
          image={{
            src: "/images/section-1.jpg",
            alt: "Atom gamepad in forest green on a sunlit surface",
            width: 1024,
            height: 395,
          }}
        >
          <TopBar />
          <div className="hero-content">
            <div className="hero-copy">
              <p className="hero-overtitle">Small plays Big</p>
              <h1 className="hero-title">A smaller way to play a bigger world</h1>
              <p>
                A pocket-size gamepad that clips to your screen. Play without
                hogging your hands or your desk.
              </p>
              <div className="hero-actions">
                <a className="cta cta-accent" href="#product">
                  Discover Atom
                  <span className="cta-arrow" aria-hidden="true">
                    →
                  </span>
                </a>
                <GhostButton href="#watch">
                  <span className="btn-ghost-play" aria-hidden="true">
                    <svg
                      viewBox="0 0 24 24"
                      width="18"
                      height="18"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="M10 8.5v7l6-3.5-6-3.5z" />
                    </svg>
                  </span>
                  Watch video
                </GhostButton>
              </div>
            </div>
            <ul className="hero-highlights">
              <li>
                <span>Ultra</span>
                <span>portable</span>
              </li>
              <li>
                <span>Play</span>
                <span>anywhere</span>
              </li>
              <li>
                <span>Multidevice</span>
                <span>compatible</span>
              </li>
              <li>
                <span>All day</span>
                <span>battery</span>
              </li>
            </ul>
          </div>
        </SectionFrame>
      </section>

      {infoSections.map((section) => (
        <section
          key={section.id}
          id={section.id}
          className={
            section.tone === "dark"
              ? "info-section info-section-media info-section-on-dark"
              : "info-section info-section-media info-section-on-light"
          }
        >
          <SectionFrame
            image={section.image}
            images={"images" in section ? section.images : undefined}
            layout={section.layout}
            tone={section.tone}
            overlayClassName="section-overlay section-overlay-center"
          >
            <div
              className={
                "copyLayout" in section && section.copyLayout === "closing"
                  ? "info-section-copy info-section-closing"
                  : "info-section-copy info-section-copy-narrow"
              }
            >
              {"overtitle" in section && section.overtitle ? (
                <p className="section-overtitle">
                  <span>{section.overtitle.line1}</span>
                  <span>{section.overtitle.line2}</span>
                </p>
              ) : null}
              <h2>
                {typeof section.title === "string" ? (
                  section.title
                ) : (
                  <>
                    <span className="section-title-line">
                      {section.title.line1}
                    </span>
                    <span className="section-title-line">
                      {section.title.line2}
                    </span>
                  </>
                )}
                {"copyLayout" in section && section.copyLayout === "closing" ? (
                  <span className="section-subline" aria-hidden="true" />
                ) : null}
              </h2>
              {section.body ? <p>{section.body}</p> : null}
              {sectionAction(section)}
            </div>
          </SectionFrame>
        </section>
      ))}

      <SiteFooter />
    </main>
  );
}
