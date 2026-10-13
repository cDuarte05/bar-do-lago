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

export function IconWhatsApp() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M20.52 3.449A11.815 11.815 0 0 0 12.04 0C5.53 0 .23 5.3.23 11.81c0 2.08.543 4.112 1.574 5.902L.13 23.77l6.2-1.626a11.81 11.81 0 0 0 5.708 1.455h.005c6.509 0 11.81-5.3 11.81-11.81a11.77 11.77 0 0 0-3.333-8.34zM12.043 21.5h-.004a9.66 9.66 0 0 1-4.924-1.35l-.353-.21-3.68.965.982-3.59-.23-.368a9.665 9.665 0 0 1-1.48-5.137c0-5.337 4.345-9.68 9.688-9.68a9.63 9.63 0 0 1 6.84 2.84 9.64 9.64 0 0 1 2.835 6.845c-.002 5.337-4.346 9.685-9.674 9.685z" />
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
              <IconWhatsApp />
              <a
                href="https://wa.me/5541997489559"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.infoLink}
                aria-label="Falar pelo WhatsApp"
              >
                +55 41 99748-9559
              </a>
            </div>
          </div>

          <nav className={styles.nav} aria-label="Footer navigation">
            <Link to="/">{t('nav.home')}</Link>
            <Link to="/menu">{t('nav.menu')}</Link>
            <Link to="/contact">{t('nav.contact')}</Link>
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