"use client";
import React, { useState } from "react";
import Link from "next/link";
import styles from "./WheelGallery.module.css";

import CheckboxSection from "../_components/Wheel Gallery/CheckboxSection/CheckboxSection";

const wheelSizes = ['15"', '16"', '17"', '18"', '19"', '20"'];
const carTypes = [
  "T44 sedan",
  "T44 avant",
  "S2 avant",
  "S4 sedan",
  "S4 avant",
  "S6 sedan",
  "S6 avant",
];
const wheelBrands = [
  "ABT",
  "Audi",
  "Avant Garde",
  "BBS",
  "Fifteen52",
  "Fikse",
  "HRE",
  "Mercedes",
  "Ronal",
  "OZ",
];

function WheelGallery() {
  const [checkedOptions, setCheckedOptions] = useState([]);
  const [query, setQuery] = useState([]);

  function clearOptions(){
    setCheckedOptions([]);
  }

  function toggleOption(value) {
    setCheckedOptions((previousOptions) => {
      if (previousOptions.includes(value)) {
        return previousOptions.filter((option) => option !== value);
      } else {
        return [...previousOptions, value];
      }
    });
  }

  return (
    <div className={styles["page"]}>
      <header className={styles["header"]}>
        <h1 className={styles["header__title"]}>wheel gallery.</h1>
        <p
          className={styles["header__submit-modal-trigger"]}
          id="submit-modal-trigger"
        >
          submit a wheel
        </p>
        <Link className={styles["header__logo"]} href="/">
          <div className={styles["logo__big-rhombus"]} id="big-rhombus"></div>
          <div
            className={styles["logo__small-rhombus-1"]}
            id="small-rhombus-1"
          ></div>
          <div
            className={styles["logo__small-rhombus-2"]}
            id="small-rhombus-2"
          ></div>
          <p className={styles["header__back"]}>back to 20vt.help</p>
        </Link>
      </header>
      <main className={styles["main"]}>
        <section className={styles["wheelfinder"]}>
          <form className={styles["wheelfinder__selector"]}>
            <CheckboxSection
              checkedOptions={checkedOptions}
              toggleOption={toggleOption}
              optionsArray={carTypes}
            ></CheckboxSection>
            <CheckboxSection
              checkedOptions={checkedOptions}
              toggleOption={toggleOption}
              optionsArray={wheelSizes}
            ></CheckboxSection>
            <CheckboxSection
              checkedOptions={checkedOptions}
              toggleOption={toggleOption}
              optionsArray={wheelBrands}
            ></CheckboxSection>
          </form>
          <button
            type="reset"
            className={styles["wheelfinder__reset"]}
            id="wheelfinder-clear"
            onClick={clearOptions}
          >
            reset selection
          </button>
        </section>
        <section className={styles["gallery"]}>
          <ul id="gallery-grid" className={styles["gallery__grid"]}></ul>
        </section>
      </main>
      <footer className={styles["footer"]}>
        <p className={styles["footer__credits"]} id="site-credits-button">
          site credits_
        </p>
        <Link
          className={styles["footer__credits"]}
          href="/"
          id="back-home-button"
        >
          back to 20vt.help_
        </Link>
      </footer>
    </div>
  );
}

export default WheelGallery;
