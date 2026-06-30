import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import drinkImg from '@/assets/gallery-drink.jpg';
import foodImg from '@/assets/gallery-food.jpg';
import deckImg from '@/assets/gallery-deck.jpg';
import styles from './MenuSection.module.scss';

// Fixed data: category IDs, their display image, and ordered item keys.
// All human-readable text comes from i18n via t().
const CAT_IMAGES: Record<string, string> = {
  cervejas: drinkImg,
  chopp: drinkImg,
  bebidas: drinkImg,
  drinks: drinkImg,
  petiscos: foodImg,
  pratos: deckImg,
  sanduiches: foodImg,
};

const CAT_ORDER = ['cervejas', 'chopp', 'bebidas', 'drinks', 'petiscos', 'pratos', 'sanduiches'];

const CAT_ITEMS: Record<string, string[]> = {
  cervejas:   ['c_budweiser_600','c_eisenbahn_600','c_heineken_600','c_brahma_600','c_serramalte_600','c_original_600','c_spaten_600','c_stella_600','c_amstel_600','c_heineken_ln','c_malzbier','c_heineken_zero','c_budweiser_ln','c_sol','c_spaten_ln','c_eisenbahn_ln','c_stella_ln','c_corona','c_corona_cero','c_stella_gold'],
  chopp:      ['ch_bardolago','ch_brahma','ch_weiss','ch_stout','ch_ipa','ch_vinho','ch_roseta'],
  bebidas:    ['b_cocacola','b_guarana','b_fanta','b_sprite','b_schweppes','b_sprite_limao','b_fuze','b_gatorade','b_agua','b_agua_gas','b_suco_natural','b_suco_leite','b_delvalle','b_agua_coco','b_chocomilk','b_redbull','b_smirnoff_ice','b_cafe_filtrado','b_cafe_leite','b_expresso','b_cappuccino','b_capsulas'],
  drinks:     ['d_caipirinha','d_quentao','d_vodka_smirnoff','d_vodka_absolut','d_cachaca_ypioca','d_cachaca_salinas','d_cachaca_boaz','d_cachaca_seleta','d_steinhaeger','d_bacardi','d_jager','d_campari','d_martini','d_tequila','d_amarula','d_conhaque','d_underberg','d_jw_red','d_jw_black','d_jack','d_gin'],
  petiscos:   ['p_batata','p_frango','p_tilapia_milanesa','p_polenta','p_mandioca_bacon','p_mignon_aceb','p_frios','p_mignon_gorg','p_contra_file','p_onion_rings','p_quibe','p_bolinho_queijo','p_bolinho_mand','p_crispy_gouda','p_smiles_kids','p_bolinho_camarao','p_bolinho_bacal','p_camarao_milan','p_dadinho','p_bolinho_carne','p_bolinho_aipim','p_churros'],
  pratos:     ['pr_saladinha','pr_folhas','pr_caesars','pr_mignon_salad','pr_frango_manj','pr_bife_chorizo','pr_linguado','pr_lasanha_bolo','pr_lasanha_sugo','pr_panq_bolo','pr_panq_ricota','pr_panq_frango','pr_moqueca'],
  sanduiches: ['s_costela','s_cheese_burguer','s_cheese_salada','s_cheese_bacon','s_cheese_frango','s_cheddar_burguer','s_gorgonzola','s_pao_bolinho','s_cheese_mignon','s_misto_quente','s_bauru'],
};

// Categories that have a note block below the items list
const CATS_WITH_NOTES = ['sanduiches', 'pratos'];

export function MenuSection() {
  const { t } = useTranslation();
  const [active, setActive] = useState('cervejas');

  const itemKeys = CAT_ITEMS[active] ?? [];
  const catLabel = t(`menu.cats.${active}`);

  return (
    <section className={`section ${styles.menu}`}>
      <div className="container">
        <header className={styles.head}>
          <span className="eyebrow">{t('menu.eyebrow')}</span>
          <h1>{t('menu.title')}</h1>
          <p>{t('menu.intro')}</p>
        </header>

        {/* Tab bar */}
        <div className={styles.tabs} role="tablist">
          {CAT_ORDER.map((catId) => (
            <button
              key={catId}
              role="tab"
              aria-selected={active === catId}
              className={`${styles.tab} ${active === catId ? styles.tabActive : ''}`}
              onClick={() => setActive(catId)}
            >
              {t(`menu.cats.${catId}`)}
            </button>
          ))}
        </div>

        {/* Panel */}
        <div className={styles.panel} role="tabpanel">
          <div className={styles.panelCover}>
            <img src={CAT_IMAGES[active]} alt="" loading="lazy" />
            <h2>{catLabel}</h2>
          </div>

          <ul className={styles.items}>
            {itemKeys.map((key) => {
              const name  = t(`menu.items.${key}.n`);
              const price = t(`menu.items.${key}.p`);
              const desc  = t(`menu.items.${key}.d`, { defaultValue: '' });
              // Extract code prefix from key for display (optional cosmetic)
              return (
                <li key={key}>
                  <div className={styles.row}>
                    <span className={styles.name}>{name}</span>
                    <span className={styles.dots} aria-hidden="true" />
                    <span className={styles.price}>{price}</span>
                  </div>
                  {desc && <p>{desc}</p>}
                </li>
              );
            })}
          </ul>

          {CATS_WITH_NOTES.includes(active) && (
            <div className={styles.note}>
              {t(`menu.notes.${active}`)}
            </div>
          )}
        </div>

        <p className={styles.disclaimer}>{t('menu.disclaimer')}</p>
      </div>
    </section>
  );
}