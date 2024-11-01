import { React, useEffect } from "react";
import styles from "../CompendiumArticle.module.css";

function TitleBox({ models, title, handleTitleClick, activeClass }) {

  function showModels(model) {
    return (
      <p key={model} className={styles["title-box__model"]}>
        {model}
      </p>
    );
  }

  return (
    <div onClick={handleTitleClick} className={styles["griditem__title-box"]}>
      <p className={styles["title-box__model-code"]}>Model code</p>
      <h2 className={styles["title-box__heading"]}>
        {title}
        <span
          className={`
            ${styles[`title-box__heading_tri`]} 
            ${styles[`${activeClass}`]}`}
        >
          &#9654;
        </span>
      </h2>
      {models.map((model) => {
        return showModels(model);
      })}
      {/* <p className={styles["title-box__model"]}>UrS4</p>
      <p className={styles["title-box__model"]}>UrS6</p> */}
    </div>
  );
}

export default TitleBox;
