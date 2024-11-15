import React from "react";
import styles from "./Loading.module.css";

export default function Loading() {
  return (
    <div className={styles["page"]}>
      <h1 className={styles['loading__heading']}>loading...</h1>
      <div className={styles["loading"]}>
        <div className={styles["loading__fire"]}>1</div>
        <div className={styles["loading__fire"]}>2</div>
        <div className={styles["loading__fire"]}>3</div>
        <div className={styles["loading__fire"]}>4</div>
        <div className={styles["loading__fire"]}>5</div>
      </div>
    </div>
  );
}
