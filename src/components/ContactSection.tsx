import { useTranslation } from "react-i18next";
import styles from "./ContactSection.module.scss";

export function ContactSection() {
  const { t } = useTranslation();
  return (
    <section className={`section ${styles.contact}`} id="contact">
      <div className={`container ${styles.grid}`}>
        <div className={styles.infoContent}>
          <span className="eyebrow">{t("contact.eyebrow")}</span>
          <h2>{t("contact.title")}</h2>
          <dl className={styles.list}>
            <div>
              <dt>{t("contact.address")}</dt>
              <dd>{t("contact.addressLine")}</dd>
            </div>
            <div>
              <dt>{t("contact.hours")}</dt>
              <dd>{t("contact.hoursLine")}</dd>
            </div>
            <div>
              <dt>{t("contact.phone")}</dt>
              <dd>
                <a href="tel:+5511999999999">(41) 99748-9559</a>
              </dd>
            </div>
          </dl>
        </div>
        <div className={styles.mapContainer}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115236.11084897302!2d-49.371475924163725!3d-25.500761831403068!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94dce3d9114ab0cf%3A0xf1bdb4c65725b5a9!2sBar%20do%20Lago%20do%20Parque%20Barigui!5e0!3m2!1spt-BR!2sbr!4v1778811667156!5m2!1spt-BR!2sbr"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={t("contact.title")}
          ></iframe>
        </div>
      </div>
    </section>
  );
}
