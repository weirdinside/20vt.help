import React from "react";
import Link from "next/link";
import styles from "./CompendiumFooter.module.css";

export default function CompendiumFooter({ handleSettingsClick, handleCompendiumAboutClick }: {
  handleSettingsClick: ()=>void;
  handleCompendiumAboutClick: ()=>void;
}) {
  return (
    <footer className={styles["footer"]}>
      <p
        onClick={handleCompendiumAboutClick}
        className={styles["footer__credits"]}
        id="site-credits-button"
      >
        site credits
      </p>
      <Link className={styles["footer__credits"]} href="/">
        back to 20vt.help
      </Link>
      <p
        onClick={handleSettingsClick}
        className={styles["footer__site-settings"]}
      >
        settings
      </p>
    </footer>
  );
}
