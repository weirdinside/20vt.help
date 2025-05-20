import React from "react";
import styles from "../CompendiumArticle.module.css";

function Information({ children, activeClass }) {
  return (
    <div
      className={
        `${styles["index__list_information"]} ${
        styles[`${activeClass}`]}`
        }>
      {children}
    </div>
  );
}

export default Information;
