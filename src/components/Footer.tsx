import { useTranslation } from 'react-i18next';
import { Link } from '@tanstack/react-router';
import logo from '@/assets/logo.png';
import styles from './Footer.module.scss';

function IconInstagram() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function IconFacebook() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function IconMapPin() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function IconClock() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

export function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.accentBar} />

      <div className={styles.body}>
        <div className={`container ${styles.grid}`}>

          <div className={styles.brand}>
            <img src={logo} alt="Bar do Lago" width={48} height={48} />
            <p className={styles.brandName}>Bar do Lago</p>
            <p className={styles.tagline}>Parque Barigui · Curitiba</p>
            <div className={styles.socials}>
              <a href="https://instagram.com/bardolago___" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className={styles.socialLink}>
                <IconInstagram />
              </a>
              <a href="https://facebook.com/bardolago" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className={styles.socialLink}>
                <IconFacebook />
              </a>
            </div>
          </div>

          <div className={styles.info}>
            <div className={styles.infoItem}>
              <IconMapPin />
              <span>{t('contact.addressLine')}</span>
            </div>
            <div className={styles.infoItem}>
              <IconClock />
              <span>{t('contact.hoursLine')}</span>
            </div>
            <div className={styles.infoItem}>
              <a href="tel:+5541999999999" className={styles.infoLink}>+55 41 99999-9999</a>
            </div>
            <div className={styles.infoItem}>
              <a href="mailto:reservas@bardolago.com" className={styles.infoLink}>reservas@bardolago.com</a>
            </div>
          </div>

          <nav className={styles.nav} aria-label="Footer navigation">
            <Link to="/">{t('nav.home')}</Link>
            <Link to="/menu">{t('nav.menu')}</Link>
            <Link to="/contact">{t('nav.contact')}</Link>
            <Link to="/contact" className={styles.reserveBtn}>{t('nav.reserve')}</Link>
          </nav>

        </div>
      </div>

      <div className={styles.bottom}>
        <div className={`container ${styles.bottomInner}`}>
          <span>© {year} Bar do Lago. {t('footer.rights')}</span>
          {t('footer.credit') && <span className={styles.credit}>{t('footer.credit')}</span>}
        </div>
      </div>
    </footer>
  );
}