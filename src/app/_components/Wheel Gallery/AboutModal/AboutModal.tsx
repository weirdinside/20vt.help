'use client'

import React from "react";
import Link from "next/link";
import styles from "./AboutModal.module.css";

interface AboutModalProps {
  activeModal: string;
  closeModal: () => void;
}

function AboutModal({ activeModal, closeModal }: AboutModalProps) {

  return (
    <div
      className={`${styles["modal"]} ${
        activeModal === "about" && styles["modal_opened"]
      }`}
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
          ></div>
          <div
            className={styles["logo__small-rhombus-1"]}
            id="small-rhombus-1"
          ></div>
          <div
            className={styles["logo__small-rhombus-2"]}
            id="small-rhombus-2"
          ></div>
          <div className={styles["text_floater"]}>back to 20vt.help</div>
        </a>
        <p className={styles["footer__text"]}>
         website developed, designed and administrated by ani bharadwaj <Link href="https://instagram.com/95urs6">(@95UrS6) with development input from salil pathare</Link>
        </p>
        <p className={styles["footer__text"]}>
        <br />
        </p>
        <p className={styles["footer__text"]}>
         design input from phil jolicoeur, ankit venkatesh, michael ku, raamish syed and rachad nouiga
        </p>
        <br />
        <p className={styles["footer__text"]}>
         made possible thanks to the contributors of images to the gallery, and the best community of car enthusiasts to ever exist
        </p>
      </div>
    </div>
  );
}

export default AboutModal;
