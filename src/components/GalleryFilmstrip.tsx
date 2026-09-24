import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import deckImg from '@/assets/gallery-deck.jpg';
import frenteImg from '@/assets/gallery-frente.jpg';
import mesasImg from '@/assets/gallery-deck-mesas.jpg';
import pontaImg from '@/assets/gallery-deck-ponta.jpg';
import giganteImg from '@/assets/imagem-gigante.jpg';
import deckWebp from '@/assets/gallery-deck.webp';
import frenteWebp from '@/assets/gallery-frente.webp';
import mesasWebp from '@/assets/gallery-deck-mesas.webp';
import pontaWebp from '@/assets/gallery-deck-ponta.webp';
import giganteWebp from '@/assets/imagem-gigante.webp';
import styles from './GalleryFilmstrip.module.scss';

type Slide = { id: string; jpg: string; webp: string };

const SLIDES: Slide[] = [
  { id: 'frente', jpg: frenteImg, webp: frenteWebp },
  { id: 'gigante', jpg: giganteImg, webp: giganteWebp },
  { id: 'mesas', jpg: mesasImg, webp: mesasWebp },
  { id: 'ponta', jpg: pontaImg, webp: pontaWebp },
  { id: 'deck', jpg: deckImg, webp: deckWebp },
];

const AUTOPLAY_MS = 5000;

/**
 * Native CSS scroll-snap carousel. The browser owns scroll position and
 * touch/swipe behaviour — we only read scrollLeft to know which slide is
 * active, and call scrollTo() to move. This avoids the class of bugs that
 * come from hand-rolling transform math and touch tracking.
 */
export function GalleryFilmstrip() {
  const { t } = useTranslation();
  const trackRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const autoplayTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isProgrammaticScroll = useRef(false);

  const scrollToIndex = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const total = SLIDES.length;
    const clamped = ((index % total) + total) % total;
    isProgrammaticScroll.current = true;
    track.scrollTo({ left: clamped * track.clientWidth, behavior: 'smooth' });
    setCurrent(clamped);
    // Scroll-end detection is unreliable across browsers, so we release the
    // "programmatic" flag after the smooth-scroll animation has had time to finish.
    window.setTimeout(() => {
      isProgrammaticScroll.current = false;
    }, 500);
  }, []);

  const next = useCallback(() => scrollToIndex(current + 1), [current, scrollToIndex]);
  const prev = useCallback(() => scrollToIndex(current - 1), [current, scrollToIndex]);

  // Keep `current` in sync when the user swipes/drags the track directly.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let raf = 0;
    function onScroll() {
      if (isProgrammaticScroll.current) return;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (!track) return;
        const index = Math.round(track.scrollLeft / track.clientWidth);
        setCurrent((prevIndex) => (index !== prevIndex ? index : prevIndex));
      });
    }

    track.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      track.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Autoplay
  useEffect(() => {
    if (paused) return;
    autoplayTimer.current = setTimeout(() => {
      scrollToIndex(current + 1);
    }, AUTOPLAY_MS);
    return () => {
      if (autoplayTimer.current) clearTimeout(autoplayTimer.current);
    };
  }, [current, paused, scrollToIndex]);

  // Pause autoplay while the user is interacting; resume shortly after.
  const handleInteractionStart = useCallback(() => {
    setPaused(true);
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
  }, []);

  const handleInteractionEnd = useCallback(() => {
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => setPaused(false), 1200);
  }, []);

  useEffect(() => {
    return () => {
      if (resumeTimer.current) clearTimeout(resumeTimer.current);
      if (autoplayTimer.current) clearTimeout(autoplayTimer.current);
    };
  }, []);

  return (
    <section
      className={`section ${styles.filmstrip}`}
      aria-roledescription="carousel"
      aria-label={t('gallery.title')}
      onMouseEnter={handleInteractionStart}
      onMouseLeave={handleInteractionEnd}
    >
      <header className={styles.head}>
        <span className="eyebrow">{t('gallery.eyebrow')}</span>
        <h2>{t('gallery.title')}</h2>
      </header>

      <div className={styles.stage}>
        <div
          ref={trackRef}
          className={styles.track}
          onTouchStart={handleInteractionStart}
          onTouchEnd={handleInteractionEnd}
          onPointerDown={handleInteractionStart}
          onPointerUp={handleInteractionEnd}
        >
          {SLIDES.map((slide, i) => (
            <div className={styles.slide} key={slide.id}>
              <picture>
                <source srcSet={slide.webp} type="image/webp" />
                <img
                  src={slide.jpg}
                  alt=""
                  loading={i < 2 ? 'eager' : 'lazy'}
                  fetchPriority={i === 0 ? 'high' : 'auto'}
                  decoding="async"
                  draggable={false}
                />
              </picture>
            </div>
          ))}
        </div>

        <button
          type="button"
          className={`${styles.arrow} ${styles.arrowPrev}`}
          onClick={prev}
          aria-label="Foto anterior"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <button
          type="button"
          className={`${styles.arrow} ${styles.arrowNext}`}
          onClick={next}
          aria-label="Próxima foto"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      <div className={styles.dots} role="tablist" aria-label="Selecionar foto">
        {SLIDES.map((slide, i) => (
          <button
            type="button"
            key={slide.id}
            role="tab"
            aria-selected={i === current}
            aria-label={`Foto ${i + 1}`}
            className={`${styles.dot} ${i === current ? styles.dotActive : ''}`}
            onClick={() => scrollToIndex(i)}
          />
        ))}
      </div>
    </section>
  );
}
