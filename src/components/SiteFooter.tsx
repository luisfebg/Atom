import Image from "next/image";

const productLinks = [
  { href: "#features", label: "Features" },
  { href: "#specifications", label: "Specifications" },
  { href: "#compare", label: "Compare" },
  { href: "#accessories", label: "Accessories" },
];

const supportLinks = [
  { href: "#setup-guides", label: "Setup Guides" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

const companyLinks = [
  { href: "#our-story", label: "Our story" },
  { href: "#sustainability", label: "Sustainability" },
  { href: "#press", label: "Press" },
  { href: "#careers", label: "Careers" },
];

const socialLinks = [
  {
    href: "#youtube",
    label: "YouTube",
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
        <path
          fill="currentColor"
          d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.5 31.5 0 0 0 0 12a31.5 31.5 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.5 31.5 0 0 0 24 12a31.5 31.5 0 0 0-.5-5.8zM9.8 15.5v-7l6.3 3.5-6.3 3.5z"
        />
      </svg>
    ),
  },
  {
    href: "#instagram",
    label: "Instagram",
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
        <path
          fill="currentColor"
          d="M12 7.2A4.8 4.8 0 1 0 12 16.8 4.8 4.8 0 0 0 12 7.2zm0 7.9a3.1 3.1 0 1 1 0-6.2 3.1 3.1 0 0 1 0 6.2zm6.1-8.2a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0zM12 2.2c2.7 0 3 0 4.1.1 2.1.1 3.4 1.4 3.5 3.5.1 1.1.1 1.4.1 4.1s0 3-.1 4.1c-.1 2.1-1.4 3.4-3.5 3.5-1.1.1-1.4.1-4.1.1s-3 0-4.1-.1c-2.1-.1-3.4-1.4-3.5-3.5C4.2 15 4.2 14.7 4.2 12s0-3 .1-4.1c.1-2.1 1.4-3.4 3.5-3.5 1.1-.1 1.4-.1 4.1-.1zm0-1.7C9.2.5 8.9.5 7.8.6 4.8.7 2.5 3 2.3 6c-.1 1.1-.1 1.4-.1 4.1s0 3 .1 4.1c.2 3 2.5 5.3 5.5 5.5 1.1.1 1.4.1 4.1.1s3 0 4.1-.1c3-.2 5.3-2.5 5.5-5.5.1-1.1.1-1.4.1-4.1s0-3-.1-4.1C21.6 3 19.3.7 16.3.6 15.2.5 14.9.5 12 .5z"
        />
      </svg>
    ),
  },
  {
    href: "#x",
    label: "X",
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
        <path
          fill="currentColor"
          d="M18.2 2H21l-6.6 7.5L22 22h-6.8l-4.5-6.1L5.3 22H2.5l7-8L2 2h7l4.1 5.6L18.2 2zm-1.2 18h1.9L7.1 4H5.1l11.9 16z"
        />
      </svg>
    ),
  },
  {
    href: "#tiktok",
    label: "TikTok",
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
        <path
          fill="currentColor"
          d="M19.6 7.6a6.5 6.5 0 0 1-3.8-1.2v7.3a5.7 5.7 0 1 1-4.9-5.6v2.9a2.8 2.8 0 1 0 2 2.7V2h2.9c.2 1.7 1.2 3.3 2.7 4.3a6.4 6.4 0 0 0 3.1 1v2.3z"
        />
      </svg>
    ),
  },
];

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div className="site-footer-column">
      <p className="site-footer-column-title">{title}</p>
      <ul>
        {links.map((link) => (
          <li key={link.href}>
            <a href={link.href}>{link.label}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="site-footer-main">
          <div className="site-footer-brand">
            <a className="site-footer-brand-mark" href="#top">
              <Image
                className="site-footer-logo"
                src="/images/atom_logo_only.png"
                alt=""
                width={56}
                height={56}
              />
              <Image
                className="site-footer-title"
                src="/images/atom_title_on_dark.png"
                alt="Atom"
                width={140}
                height={32}
              />
            </a>
            <p className="site-footer-tagline">Small plays big</p>
          </div>

          <nav className="site-footer-columns" aria-label="Footer">
            <FooterColumn title="Product" links={productLinks} />
            <FooterColumn title="Support" links={supportLinks} />
            <FooterColumn title="Company" links={companyLinks} />
          </nav>

          <div className="site-footer-social">
            <p className="site-footer-social-heading">Join our mission</p>
            <form className="site-footer-email" action="#newsletter">
              <label className="visually-hidden" htmlFor="footer-email">
                Email address
              </label>
              <input
                id="footer-email"
                type="email"
                name="email"
                placeholder="Email address"
                autoComplete="email"
                required
              />
              <button type="submit" aria-label="Subscribe">
                <span aria-hidden="true">→</span>
              </button>
            </form>
            <ul className="site-footer-social-links">
              {socialLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} aria-label={link.label}>
                    {link.icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="site-footer-sub">
          <p className="site-footer-copy">© 2026 ATOM. All rights reserved.</p>
          <nav className="site-footer-legal" aria-label="Legal">
            <a href="#privacy">Privacy</a>
            <a href="#terms">Terms</a>
            <a href="#cookies">Cookies</a>
          </nav>
          <p className="site-footer-language" aria-label="Language">
            EN
            <span aria-hidden="true">▾</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
