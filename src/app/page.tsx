"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import styles from "./Homepage.module.css";
import SLogo from "./_components/Homepage/SLogo/SLogo";
import AboutModal from "./_components/Homepage/AboutModal/AboutModal";
import NavItem from "./_components/Homepage/NavItem/NavItem";

export default function Homepage() {
  const router = useRouter();
  const [activeModal, setActiveModal] = useState<"about" | "">("");
  const [isLoading, setIsLoading] = useState(false);

  function openLink(page: string) {
    setIsLoading(true);
    setTimeout(() => {
      router.push(`/${page}`);
    }, 2000);
  }

  const closeModal = () => {
    setActiveModal("");
  };

  return (
    <div className={styles["page"]}>
      <div
          className={`${styles["page__loading"]} ${
            isLoading ? styles["active"] : null
          }`}
        >
          <div
            className={`${styles["page__loading_firingorder"]} ${
              isLoading ? styles["active"] : null
            }`}
          >
            <div className={styles["page__loading_fire"]}></div>
            <div className={styles["page__loading_fire"]}></div>
            <div className={styles["page__loading_fire"]}></div>
            <div className={styles["page__loading_fire"]}></div>
            <div className={styles["page__loading_fire"]}></div>
          </div>
          <div
            className={`${styles["page__loading_background"]} ${
              isLoading ? styles["active"] : null
            }`}
          ></div>
        </div>
      <div className={styles["page__container"]}>
        
        <header className={styles.header}>
          <h1 className={styles.header__title}>
            20vt <span className={styles.smalltext}>.help</span>
          </h1>
          <Link href="/">
            <SLogo inElement="landing" />
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
          <div
            onClick={() => {
              openLink("compendium");
            }}
          >
            <NavItem
              title="compendium"
              description={"an information resource for C4 audi owners"}
            />
          </div>

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
              title="quattroworld forum"
              description={"browse older/source documentation for UrS4/UrS6"}
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
