import React from "react";
import styles from "../../CompendiumContent.module.css";

function InformationHeading({
  children,
}: {
  children: React.ReactNode[] | React.ReactNode;
}) {
  return <h2 style={{margin: '10px auto'}} className={styles["information__heading"]}>{children}</h2>;
}

export default InformationHeading;
