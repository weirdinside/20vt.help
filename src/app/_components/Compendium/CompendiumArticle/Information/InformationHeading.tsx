import React from "react";
import styles from "../../Compendium.module.css";

function InformationHeading({
  children,
}: {
  children: React.ReactNode[] | React.ReactNode;
}) {
  return <h2 className={styles["information__heading"]}>{children}</h2>;
}

export default InformationHeading;
