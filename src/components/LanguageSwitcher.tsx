import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './LanguageSwitcher.module.scss';

const LANGS = [
  { code: 'pt-BR', label: 'PT' },
  { code: 'en-US', label: 'EN' },
  { code: 'es', label: 'ES' },
];

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const current = LANGS.find((l) => l.code === i18n.language) ?? LANGS[0];

  return (
    <div className={styles.wrap} onMouseLeave={() => setOpen(false)}>
      <button
        className={styles.trigger}
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {current.label} <span className={styles.caret}>▾</span>
      </button>
      {open && (
        <ul className={styles.menu} role="listbox">
          {LANGS.map((l) => (
            <li key={l.code}>
              <button
                className={l.code === current.code ? styles.active : ''}
                onClick={() => {
                  i18n.changeLanguage(l.code);
                  setOpen(false);
                }}
              >
                {l.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
