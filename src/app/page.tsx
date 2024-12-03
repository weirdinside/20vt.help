"use client";

import React, { useState } from "react";
import Link from "next/link";

import styles from "./Homepage.module.css";
import SLogo from "./_components/Homepage/SLogo/SLogo";
import AboutModal from "./_components/Homepage/AboutModal/AboutModal";
import NavItem from "./_components/Homepage/NavItem/NavItem";

export default function Homepage() {
  const [activeModal, setActiveModal] = useState<"about" | "">("");


  const closeModal = () => {
    setActiveModal("");
  };

  return (
    <div className={styles["page"]}>
      <div className={styles["page__container"]}>
        
        <header className={styles.header}>
          <h1 className={styles.header__title}>
            20vt <span className={styles.smalltext}>.help</span>
          </h1>
          <Link href="/">
            <SLogo color="#cf2a2a" inElement="landing" />
          </Link>
          <p
            onClick={() => {
              setActiveModal("about");
            }}
            className={styles["header__about-modal-trigger"]}
          >
            about this site
          </p>
        </header>
        <nav className={styles.nav}>

          <Link href="/wheel-gallery" style={{ textDecoration: "none" }}>
            <NavItem
              title="wheel gallery"
              description={
                "view and submit a plethora of wheel options on vintage Audis"
              }
            />
          </Link>
          <Link
            target="_blank"
            href="https://forums.quattroworld.com/s4s6/"
            style={{ textDecoration: "none" }}
          >
            <NavItem
              title="quattroworld (UrS4/6)"
              description={"browse older/source documentation for UrS4/UrS6"}
            ></NavItem>
          </Link>
          <Link
            target="_blank"
            href="https://forums.quattroworld.com/9080/"
            style={{ textDecoration: "none" }}
          >
            <NavItem
              title="quattroworld (B3/B4)"
              description={"browse older/source documentation for B3/B4 Audis"}
            ></NavItem>
          </Link>
          <Link
            target="_blank"
            href="https://www.facebook.com/groups/audiyachtclub"
            style={{ textDecoration: "none" }}
          >
            <NavItem
              title="audi yacht club"
              description={
                "join the premiere facebook group for the UrS4/UrS6 community"
              }
            ></NavItem>
          </Link>
          <Link
            target="_blank"
            href="https://www.motorgeek.com/"
            style={{ textDecoration: "none" }}
          >
            <NavItem
              title="motorgeek"
              description={"a forum populated by a ton of vintage audi nerds"}
            ></NavItem>
          </Link>
          <Link
            target="_blank"
            href="https://www.s2forum.com/"
            style={{ textDecoration: "none" }}
          >
            <NavItem
              title="s2forum"
              description={"one of the original 5 cylinder online forums for vintage audi"}
            ></NavItem>
          </Link>
          <Link
            target="_blank"
            href="https://theprojectpad.com/index.php"
            style={{ textDecoration: "none" }}
          >
            <NavItem
              title="the project pad"
              description={"a forum from and by old-school 5 cylinder enthusiasts, housing build threads and DIY writeups"}
            ></NavItem>
          </Link>
          <Link
            target="_blank"
            href="https://discord.gg/vwmbNcgm9H"
            style={{ textDecoration: "none" }}
          >
            <NavItem
              title="oldskool audi discord"
              description={"join the discord channel for old school audi nerds"}
            ></NavItem>
          </Link>
        </nav>
        <footer className="homepage__footer">
          <p className="homepage__footer_text"></p>
        </footer>
        <AboutModal closeModal={closeModal} activeModal={activeModal} />
      </div>
    </div>
  );


}
