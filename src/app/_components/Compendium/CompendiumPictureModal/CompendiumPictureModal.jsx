import React from "react";
import styles from './CompendiumPictureModal.module.css'

function CompendiumPictureModal({ activeModal, pictureModalData, closeModal }) {
  return (
    <div
      className={`${styles["modal"]} ${
        activeModal === "preview" && styles["active"]
      }`}
      id="compendium-picture-modal"
    >
      <div
        className={`${styles["modal__container"]} ${
          activeModal === "preview" && styles["active"]
        }`}
      >
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
          <div className={styles["text_floater"]}>close preview</div>
        </a>

        <img
          src={pictureModalData.imageSrc}
          className={styles["modal__preview_image"]}
        ></img>
        <p className={styles["modal__preview_text"]}>
          {pictureModalData.caption}
        </p>
      </div>
    </div>
  );
}

export default CompendiumPictureModal;
