import { useTranslation } from 'react-i18next';
import logo from '@/assets/alligator-logo.png';
import styles from './Footer.module.scss';

export function Footer() {
  const { t } = useTranslation();
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <img src={logo} alt="" width={28} height={28} />
          <span>Bar do Lago</span>
        </div>
        <div className={styles.meta}>
          <span>© {new Date().getFullYear()} Bar do Lago. {t('footer.rights')}</span>
          <span>{t('footer.credit')}</span>
          <div className={styles.socials}>
            <a href="#" aria-label="Instagram">Instagram</a>
            <a href="#" aria-label="Facebook">Facebook</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
