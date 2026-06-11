import { useTranslation } from 'react-i18next';
import drinkImg from '@/assets/gallery-drink.jpg';
import foodImg from '@/assets/gallery-food.jpg';
import deckImg from '@/assets/gallery-deck.jpg';
import styles from './MenuSection.module.scss';

type Item = { key: string; price: string };
const CATS: { id: 'drinks' | 'appetizers' | 'mains'; img: string; items: Item[] }[] = [
  {
    id: 'drinks',
    img: drinkImg,
    items: [
      { key: 'd1', price: 'R$ 38' },
      { key: 'd2', price: 'R$ 42' },
      { key: 'd3', price: 'R$ 46' },
    ],
  },
  {
    id: 'appetizers',
    img: foodImg,
    items: [
      { key: 'a1', price: 'R$ 89' },
      { key: 'a2', price: 'R$ 36' },
      { key: 'a3', price: 'R$ 44' },
    ],
  },
  {
    id: 'mains',
    img: deckImg,
    items: [
      { key: 'm1', price: 'R$ 78' },
      { key: 'm2', price: 'R$ 96' },
      { key: 'm3', price: 'R$ 72' },
    ],
  },
];

export function MenuSection() {
  const { t } = useTranslation();
  return (
    <section className={`section ${styles.menu}`}>
      <div className="container">
        <header className={styles.head}>
          <span className="eyebrow">{t('menu.eyebrow')}</span>
          <h1>{t('menu.title')}</h1>
          <p>{t('menu.intro')}</p>
        </header>

        <div className={styles.cats}>
          {CATS.map((cat) => (
            <article key={cat.id} className={styles.card}>
              <div className={styles.cover}>
                <img src={cat.img} alt="" loading="lazy" />
                <h2>{t(`menu.categories.${cat.id}`)}</h2>
              </div>
              <ul className={styles.items}>
                {cat.items.map((it) => (
                  <li key={it.key}>
                    <div className={styles.row}>
                      <span className={styles.name}>{t(`menu.items.${it.key}.n`)}</span>
                      <span className={styles.dots} aria-hidden="true" />
                      <span className={styles.price}>{it.price}</span>
                    </div>
                    <p>{t(`menu.items.${it.key}.d`)}</p>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
