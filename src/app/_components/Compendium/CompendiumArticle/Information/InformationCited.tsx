import React from "react";
import styles from "../CompendiumArticle.module.css";

function InformationCited({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) {
  return <p className={styles["information__cited"]}>{children}</p>;
}

export default InformationCited;
