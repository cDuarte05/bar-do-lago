import { useEffect, useState } from 'react';
import { Link, useLocation } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from './LanguageSwitcher';
import logo from '@/assets/logo.png';
import styles from './Header.module.scss';

export function Header() {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const overHero = pathname === '/' && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <header className={`${styles.header} ${overHero ? styles.transparent : styles.solid}`}>
      <div className={styles.inner}>
        <Link to="/" className={styles.brand} aria-label="Bar do Lago">
          <img src={logo} alt="" width={36} height={36} />
          <span>Bar do Lago</span>
        </Link>

        <nav className={`${styles.nav} ${open ? styles.navOpen : ''}`}>
          <Link to="/" activeOptions={{ exact: true }} activeProps={{ className: styles.active }}>
            {t('nav.home')}
          </Link>
          <Link to="/menu" activeProps={{ className: styles.active }}>
            {t('nav.menu')}
          </Link>
          <a href="/#contact">
            {t('nav.contact')}
          </a>
        </nav>

        <div className={styles.right}>
          <LanguageSwitcher />
          <a href="/#contact" className="btn btn--primary">
            {t('nav.reserve')}
          </a>
          <button
            className={styles.burger}
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
            aria-expanded={open}
          >
            <span /><span /><span />
          </button>
        </div>
      </div>
    </header>
  );
}
