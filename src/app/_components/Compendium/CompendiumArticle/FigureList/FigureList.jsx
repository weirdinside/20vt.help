import React from "react";
import styles from "../CompendiumArticle.module.css";

function FigureList({ children }) {
  return <div className={styles["information__figure_grid"]}>{children}</div>;
}

export default FigureList;
