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
        src: "/images/controller-side-view.png",
        alt: "Side profile of Atom showing power button and USB-C port",
        width: 1254,
        height: 1254,
        objectPosition: "center",
      },
    ],
    sideCaptions: [
      {
        text: "Power on, play instantly.",
        y: "41%",
      },
      {
        text: "USB-C charging. Always ready.",
        y: "60%",
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
    title: "",
    overtitle: {
      line1: "A colour for every",
      line2: "playground",
    },
    body: "The same compact design, in a range of stunning finishes.",
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
  mobileImage,
  images,
  sideCaptions,
  priority = false,
  layout = "overlay",
  tone = "light",
  overlayClassName = "section-overlay",
  children,
}: {
  image: SectionImage;
  mobileImage?: SectionImage;
  images?: SectionImage[];
  sideCaptions?: { text: string; y: string }[];
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
          <div className="section-side-media">
            <SectionPhotoTile
              photo={rightPhoto}
              priority={priority}
              sizes="(max-width: 720px) 55vw, 28vw"
            />
            {sideCaptions && sideCaptions.length > 0 ? (
              <ul className="section-side-captions">
                {sideCaptions.map((caption) => (
                  <li
                    key={caption.text}
                    className="section-side-caption"
                    style={{ ["--callout-y" as string]: caption.y }}
                  >
                    <span
                      className="section-side-caption-line"
                      aria-hidden="true"
                    >
                      <span className="section-side-caption-dot" />
                      <span className="section-side-caption-dot" />
                    </span>
                    <span className="section-side-caption-text">
                      {caption.text}
                    </span>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
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
        ...(mobileImage
          ? {
              ["--section-aspect-mobile" as string]: `${mobileImage.width} / ${mobileImage.height}`,
            }
          : {}),
      }}
    >
      <Image
        className={
          mobileImage
            ? "section-photo section-photo-desktop"
            : "section-photo"
        }
        src={image.src}
        alt={image.alt}
        fill
        priority={priority}
        quality={100}
        sizes="100vw"
        unoptimized
      />
      {mobileImage ? (
        <Image
          className="section-photo section-photo-mobile"
          src={mobileImage.src}
          alt={mobileImage.alt}
          fill
          priority={priority}
          quality={100}
          sizes="100vw"
          unoptimized
        />
      ) : null}
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
          mobileImage={{
            src: "/images/mobile-hero-bg.png",
            alt: "Atom gamepad in forest green on a sunlit surface",
            width: 941,
            height: 1672,
          }}
        >
          <TopBar />
          <div className="hero-content">
            <div className="hero-copy">
              <p className="hero-overtitle">Small plays Big</p>
              <h1 className="hero-title">
                <span className="hero-title-line">A smaller way</span>
                <span className="hero-title-line">to play a bigger world.</span>
              </h1>
              <p className="hero-desc hero-desc-desktop">
                A pocket-size gamepad that clips to your screen. Play without
                hogging your hands or your desk.
              </p>
              <p className="hero-desc hero-desc-mobile">
                A premium, pocket-sized controller for all your games.
                Anywhere.
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
          </div>
          <div className="hero-mid-row">
            <Image
              className="hero-signature"
              src="/images/signature-gff.png"
              alt=""
              width={217}
              height={72}
              unoptimized
            />
            <Image
              className="hero-angled-view"
              src="/images/angled-view.png"
              alt="Atom gamepad at an angled view"
              width={280}
              height={280}
              unoptimized
            />
          </div>
          <p className="hero-tagline">
            <span className="hero-tagline-line" aria-hidden="true" />
            <span className="hero-tagline-copy">
              <span>Designed for</span>
              <span>real life.</span>
            </span>
          </p>
          <ul className="hero-highlights">
            <li>
              <Image
                className="hero-highlight-icon"
                src="/images/leaf.png"
                alt=""
                width={64}
                height={64}
                unoptimized
              />
              <span className="hero-highlight-copy">
                <span>Ultra</span>
                <span>portable</span>
              </span>
            </li>
            <li>
              <Image
                className="hero-highlight-icon"
                src="/images/controller.png"
                alt=""
                width={64}
                height={64}
                unoptimized
              />
              <span className="hero-highlight-copy">
                <span>Play</span>
                <span>anywhere</span>
              </span>
            </li>
            <li>
              <Image
                className="hero-highlight-icon"
                src="/images/connectivity.png"
                alt=""
                width={64}
                height={64}
                unoptimized
              />
              <span className="hero-highlight-copy">
                <span>Multidevice</span>
                <span>compatible</span>
              </span>
            </li>
            <li>
              <Image
                className="hero-highlight-icon"
                src="/images/battery.png"
                alt=""
                width={64}
                height={64}
                unoptimized
              />
              <span className="hero-highlight-copy">
                <span>All day</span>
                <span>battery</span>
              </span>
            </li>
          </ul>
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
            sideCaptions={
              "sideCaptions" in section ? section.sideCaptions : undefined
            }
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
              {section.title ? (
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
                  {"copyLayout" in section &&
                  section.copyLayout === "closing" ? (
                    <span className="section-subline" aria-hidden="true" />
                  ) : null}
                </h2>
              ) : null}
              {section.body ? <p>{section.body}</p> : null}
              {sectionAction(section)}
            </div>
            {section.id === "about" ? (
              <div className="about-rail" aria-hidden="true">
                <span className="about-rail-stop">
                  <span className="about-rail-dot" />
                  <span className="about-rail-label">AT HOME</span>
                </span>
                <span className="about-rail-stop">
                  <span className="about-rail-dot" />
                  <span className="about-rail-label">ON THE GO</span>
                </span>
                <span className="about-rail-stop">
                  <span className="about-rail-dot" />
                  <span className="about-rail-label">AT WORK</span>
                </span>
                <span className="about-rail-stop">
                  <span className="about-rail-dot" />
                  <span className="about-rail-label">ANYWHERE</span>
                </span>
              </div>
            ) : null}
          </SectionFrame>
        </section>
      ))}

      <SiteFooter />
    </main>
  );
}
