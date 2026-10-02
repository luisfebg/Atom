export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="site-footer-brand">
          <p className="site-footer-name">Atom</p>
          <p className="site-footer-tag">Tiny pad. Sticks on.</p>
        </div>

        <nav className="site-footer-nav" aria-label="Footer">
          <a href="#control">Control</a>
          <a href="#colours">Colours</a>
          <a href="#carry">Carry</a>
          <a href="#bag">Bag</a>
        </nav>

        <p className="site-footer-copy">
          © {new Date().getFullYear()} Atom. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
