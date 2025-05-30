import React from "react";
import styles from "../CompendiumArticle.module.css";

function Information({ ref, children, activeClass }) {
  return (
    <div
      ref={ref}
      className={`${styles["index__list_information"]} ${
        styles[`${activeClass}`]
      }`}
    >
      {children}
    </div>
  );
}

export default Information;
