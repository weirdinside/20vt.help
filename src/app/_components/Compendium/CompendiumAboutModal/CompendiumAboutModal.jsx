import React from "react";
import styles from "./CompendiumAboutModal.module.css";

function CompendiumAboutModal({ activeModal, closeModal }) {
  return (
    <div
      onClick={(e) => {
        if (e.target.classList.contains(styles["modal"])) closeModal();
      }}
      className={`${styles["modal"]} ${
        activeModal === "compendium-about" && styles["active"]
      }`}
      id="compendium-about-modal"
    >
      <div className={styles["modal__container"]}>
        <a
          onClick={closeModal}
          className={styles["footer__logo"]}
          id="about-close"
        >
          <div
            className={`${styles["logo__big-rhombus"]} ${styles["in_footer"]}`}
            id="big-rhombus"
          />
          <div
            className={styles["logo__small-rhombus-1"]}
            id="small-rhombus-1"
          />
          <div
            className={styles["logo__small-rhombus-2"]}
            id="small-rhombus-2"
          />
          <div className={styles["text_floater"]}>close</div>
        </a>
        <p className={styles["information__cited"]}>
          site designed, developed and administrated by Ani Bharadwaj
        </p>
        <br/>
        <p className={styles["information__cited"]}>
          with information originally documented by the UrS4/UrS6 community at quattroworld.com
        </p>
        <br/>
        <p className={styles["information__cited"]}>
          design input from Rachad Nouiga, Ankit Venkatesh, Raamish Syed, Aaron
          Janci
        </p>
        <br/>
        <p className={styles["information__cited"]}>
          image map resizer code written by David J. Bradshaw
        </p>
        <br/>
        <p className={styles["information__cited"]}>
          in memory of Zak Kennedy (1979 - 2025)
        </p>
      </div>
    </div>
  );
}

export default CompendiumAboutModal;
