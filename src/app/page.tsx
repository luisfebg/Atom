import Image from "next/image";
import type { ReactNode } from "react";
import { TopBar } from "@/components/TopBar";
import { SiteFooter } from "@/components/SiteFooter";

const infoSections = [
  {
    id: "control",
    title: "Take control anywhere",
    body: "Clip Atom to a phone, tablet, or laptop and keep your thumbs in the game — couch, commute, or café table.",
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
      href: "#control-more",
      label: "Learn more",
      style: "text-link" as const,
    },
  },
  {
    id: "colours",
    title: "A colour for every playground",
    body: "From quiet forest tones to loud accent pops, pick a finish that matches how you play and where you take it.",
    tone: "light" as const,
    layout: "split" as const,
    image: {
      src: "/images/section-3.jpg",
      alt: "Atom gamepads in black, green, pink, and cream lined up together",
      width: 1292,
      height: 443,
    },
    action: {
      href: "#colours-gallery",
      label: "Explore all colours",
      style: "button" as const,
    },
  },
  {
    id: "carry",
    title: "Play more, carry less",
    body: "No extra case bulk. Atom stays tiny in your pocket and ready the moment your screen needs a pad.",
    tone: "dark" as const,
    layout: "overlay" as const,
    image: {
      src: "/images/section-4.jpg",
      alt: "Atom gamepad tucked into a bag pocket beside phones",
      width: 1024,
      height: 278,
    },
    action: {
      href: "#watch",
      label: "See it in action",
      style: "text-link-accent" as const,
    },
  },
];

function actionClassName(
  style: "text-link" | "text-link-accent" | "button",
  tone: "light" | "dark",
) {
  if (style === "button") {
    return "cta";
  }
  if (style === "text-link-accent") {
    return "text-link text-link-accent";
  }
  return tone === "dark" ? "text-link text-link-on-media" : "text-link";
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
              <div className="hero-copy-bloom" aria-hidden="true">
                <Image
                  className="hero-copy-bloom-photo"
                  src="/images/section-1.jpg"
                  alt=""
                  fill
                  priority
                  quality={100}
                  sizes="100vw"
                  unoptimized
                />
              </div>
              <h1 className="hero-title">Tiny pad. Sticks on.</h1>
              <p>
                A pocket-size gamepad that clips to your screen. Play without
                hogging your hands or your desk.
              </p>
              <div className="hero-actions">
                <a className="btn-ghost" href="#watch">
                  Watch video
                </a>
                <a className="cta cta-accent" href="#control">
                  Discover Atom
                </a>
              </div>
            </div>
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
            <div className="info-section-copy info-section-copy-narrow">
              <h2>{section.title}</h2>
              <p>{section.body}</p>
              <a
                className={`info-section-action ${actionClassName(section.action.style, section.tone)}`}
                href={section.action.href}
              >
                {section.action.label}
                {section.action.style !== "button" ? (
                  <span className="text-link-arrow" aria-hidden="true">
                    →
                  </span>
                ) : null}
              </a>
            </div>
          </SectionFrame>
        </section>
      ))}

      <section className="media-section" aria-label="Atom on the trail">
        <SectionFrame
          image={{
            src: "/images/section-5.jpg",
            alt: "Traveler with a backpack overlooking misty mountain ranges",
            width: 1024,
            height: 275,
          }}
        />
      </section>

      <SiteFooter />
    </main>
  );
}
