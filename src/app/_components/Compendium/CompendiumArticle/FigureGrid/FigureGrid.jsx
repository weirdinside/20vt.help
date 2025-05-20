import React from "react";
import styles from "../../CompendiumContent.module.css"

function FigureGrid({ children }) {
  return (
    <div className={styles["figure__grid-container"]}>
      <div className={styles["figure__grid"]}>{children}</div>
    </div>
  );
}

export default FigureGrid;
