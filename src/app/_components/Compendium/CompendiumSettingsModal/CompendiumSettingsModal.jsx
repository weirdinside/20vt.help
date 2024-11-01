import React from "react";
import styles from "./CompendiumSettingsModal.module.css";

function CompendiumSettingsModal({
  clickSetting,
  handleClickCheckbox,
  activeModal,
}) {
  return (
    <div
      className={`${styles["modal"]} ${
        activeModal === "settings" && styles["active"]
      }`}
      id="settings-modal"
    >
      <div className={styles["modal__container"]}>
        <h2 className={styles["settings__title"]}>settings</h2>
        <div className={styles["settings__setting"]}>
          <p>automatically search part number on click</p>
          <label className={styles["settings__switch"]}>
            <input
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
