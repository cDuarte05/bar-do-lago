import heroImg from '@/assets/hero-lake.jpg';
import vistaImg from '@/assets/vista.jpg';
import { useTranslation } from 'react-i18next';
import { Link } from '@tanstack/react-router';
import { ContactSection } from './ContactSection';
import { GalleryFilmstrip } from './GalleryFilmstrip';
import styles from './HomeSections.module.scss';

export function HomeSections() {
  const { t } = useTranslation();
  return (
    <>
      <section className={styles.hero} aria-label="Hero">
        <img src={heroImg} alt="" className={styles.heroBg} fetchPriority="high" />
        <div className={styles.heroOverlay} />
        <div className={`container ${styles.heroContent}`}>
          <span className={styles.heroEyebrow}>{t('hero.eyebrow')}</span>
          <h1>{t('hero.title')}</h1>
          <p>{t('hero.subtitle')}</p>
        </div>
        <a href="#story" className={styles.scroll} aria-label={t('hero.scroll')}>
          <span>{t('hero.scroll')}</span>
          <span className={styles.scrollLine} />
        </a>
      </section>

      <section className={`section ${styles.story}`} id="story">
        <div className={`container ${styles.storyGrid}`}>
          <div className={styles.storyImage}>
            <img src={vistaImg} alt="" loading="lazy" width={1200} height={1400} />
          </div>
          <div className={styles.storyText}>
            <span className="eyebrow">{t('story.eyebrow')}</span>
            <h2>{t('story.title')}</h2>
            <p>{t('story.p1')}</p>
            <p>{t('story.p2')}</p>
          </div>
        </div>
      </section>

      <GalleryFilmstrip />

      <ContactSection />
    </>
  );
}
