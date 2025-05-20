import React from "react";
import styles from "./CompendiumSettingsModal.module.css";

function CompendiumSettingsModal({
  clickSetting,
  closeModal,
  handleClickCheckbox,
  activeModal,
}) {
  return (
    <div
      onClick={(e) => {
        if (e.target.classList.contains(styles["modal"])) closeModal();
      }}
      className={`${styles["modal"]} ${
        activeModal === "settings" && styles["active"]
      }`}
      id="settings-modal"
    >
      <div className={styles["modal__container"]}>
        <a
          onClick={closeModal}
          className={styles["footer__logo"]}
          id="settings-close"
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
          <div className={styles["text_floater"]}>close settings</div>
        </a>
        <h2 className={styles["settings__title"]}>settings</h2>
        <div className={styles["settings__setting"]}>
          <p>automatically search part number on click</p>
          <label className={styles["settings__switch"]}>
            <input
              className={styles["settings__input"]}
              style={{ height: "0", width: "0" }}
              id="click-through-for-search"
              type="checkbox"
              checked={clickSetting}
              onChange={handleClickCheckbox}
              unchecked="true"
            />
            <span className={styles["slider"]}></span>
          </label>
        </div>
      </div>
    </div>
  );
}

export default CompendiumSettingsModal;
