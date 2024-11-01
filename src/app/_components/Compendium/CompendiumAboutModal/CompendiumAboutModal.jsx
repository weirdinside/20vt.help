import React from "react";
import styles from "./CompendiumAboutModal.module.css";

function CompendiumAboutModal({ activeModal }) {
  return (
    <div
      className={`${styles["modal"]} ${
        activeModal === "compendium-about" && styles["active"]
      }`}
      id="compendium-about-modal"
    >
      <div className={styles["modal__container"]}>
        <p className={styles["information__cited"]}>
          site designed and administrated by Ani Bharadwaj
        </p>
        <p className={styles["information__cited"]}>
          design input from Rachad Nouiga, Ankit Venkatesh, Raamish Syed, Aaron
          Janci
        </p>
        <p className={styles["information__cited"]}>
          image map resizer code written by David J. Bradshaw
        </p>
      </div>
    </div>
  );
}

export default CompendiumAboutModal;
