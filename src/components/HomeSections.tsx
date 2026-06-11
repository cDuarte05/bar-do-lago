import heroImg from '@/assets/hero-lake.jpg';
import storyImg from '@/assets/story.jpg';
import drinkImg from '@/assets/gallery-drink.jpg';
import foodImg from '@/assets/gallery-food.jpg';
import deckImg from '@/assets/gallery-deck.jpg';
import { useTranslation } from 'react-i18next';
import { Link } from '@tanstack/react-router';
import { ContactSection } from './ContactSection';
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
          <Link to="/contact" className="btn btn--primary">
            {t('nav.reserve')}
          </Link>
        </div>
        <a href="#story" className={styles.scroll} aria-label={t('hero.scroll')}>
          <span>{t('hero.scroll')}</span>
          <span className={styles.scrollLine} />
        </a>
      </section>

      <section className={`section ${styles.story}`} id="story">
        <div className={`container ${styles.storyGrid}`}>
          <div className={styles.storyImage}>
            <img src={storyImg} alt="" loading="lazy" width={1200} height={1400} />
          </div>
          <div className={styles.storyText}>
            <span className="eyebrow">{t('story.eyebrow')}</span>
            <h2>{t('story.title')}</h2>
            <p>{t('story.p1')}</p>
            <p>{t('story.p2')}</p>
          </div>
        </div>
      </section>

      <section className={`section ${styles.gallery}`}>
        <div className="container">
          <header className={styles.galleryHead}>
            <span className="eyebrow">{t('gallery.eyebrow')}</span>
            <h2>{t('gallery.title')}</h2>
          </header>
          <div className={styles.galleryGrid}>
            <figure className={styles.tall}><img src={deckImg} alt="" loading="lazy" /></figure>
            <figure><img src={drinkImg} alt="" loading="lazy" /></figure>
            <figure><img src={foodImg} alt="" loading="lazy" /></figure>
          </div>
        </div>
      </section>

      <ContactSection />
    </>
  );
}
