"use client";

import React, { useState } from "react";
import Link from "next/link";

import styles from "./Homepage.module.css";
import SLogo from "./_components/Homepage/SLogo/SLogo";
import AboutModal from "./_components/Homepage/AboutModal/AboutModal";
import NavItem from "./_components/Homepage/NavItem/NavItem";

import zk from "./assets/zk.png";

export default function Homepage({
  backgroundImage,
}: {
  backgroundImage: string;
}) {
  const [activeModal, setActiveModal] = useState<"about" | "">("");
  const [isOtherOpen, setOtherOpen] = useState<boolean>(false);

  const closeModal = () => {
    setActiveModal("");
  };

  return (
    <div
      style={{ backgroundImage: `url(${backgroundImage})` }}
      className={styles["page"]}
    >
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
          <Link href="/compendium" style={{ textDecoration: "none" }}>
            <NavItem
              title="compendium"
              description={
                "an index of information and DIYs for C4 Audi owners"
              }
            />
          </Link>
          <Link href="/wheel-gallery" style={{ textDecoration: "none" }}>
            <NavItem
              title="wheel gallery"
              description={
                "view and submit a plethora of wheel options on vintage Audis"
              }
            />
          </Link>
          <Link href="/" style={{ textDecoration: "none", opacity: "0.5" }}>
            <NavItem
              title="blog* (coming soon)"
              description={"updates on the website and other C4 related stuff"}
            />
          </Link>
          <Link href="/" style={{ textDecoration: "none", opacity: "0.5" }}>
            <NavItem
              title="builds* (coming soon)"
              description={
                "see the works in progress of the community and post about your own"
              }
            />
          </Link>
          <div className={styles["other-links"]}>
            <div
              onClick={() => {
                setOtherOpen((prev) => !prev);
              }}
              className={styles["link-cta"]}
            >
              <div className={styles["link-cta__background"]} />
              other resources...{" "}
              <span
                style={{ fontFamily: "monospace" }}
                className={`${styles["link-cta__arrow"]} ${
                  isOtherOpen && styles["open"]
                }`}
              >
                ▶
              </span>
            </div>
            <div
              className={`${styles["link-list"]} ${
                isOtherOpen && styles["open"]
              }`}
            >
              <Link
                target="_blank"
                href="https://forums.quattroworld.com/s4s6/"
                style={{ textDecoration: "none" }}
              >
                <NavItem
                  title="quattroworld (UrS4/6)"
                  description={
                    "browse older/source documentation for UrS4/UrS6"
                  }
                />
              </Link>
              <Link
                target="_blank"
                href="https://forums.quattroworld.com/9080/"
                style={{ textDecoration: "none" }}
              >
                <NavItem
                  title="quattroworld (B3/B4)"
                  description={
                    "browse older/source documentation for B3/B4 Audis"
                  }
                />
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
                />
              </Link>
              <Link
                target="_blank"
                href="https://www.motorgeek.com/"
                style={{ textDecoration: "none" }}
              >
                <NavItem
                  title="motorgeek"
                  description={
                    "a forum populated by a ton of vintage audi nerds"
                  }
                />
              </Link>
              <Link
                target="_blank"
                href="https://www.s2forum.com/"
                style={{ textDecoration: "none" }}
              >
                <NavItem
                  title="s2forum"
                  description={
                    "one of the original 5 cylinder online forums for vintage audi"
                  }
                />
              </Link>
              <Link
                target="_blank"
                href="https://theprojectpad.com/index.php"
                style={{ textDecoration: "none" }}
              >
                <NavItem
                  title="the project pad"
                  description={
                    "a forum from and by old-school 5 cylinder enthusiasts, housing build threads and DIY writeups"
                  }
                />
              </Link>
              <Link
                target="_blank"
                href="https://discord.gg/vwmbNcgm9H"
                style={{ textDecoration: "none" }}
              >
                <NavItem
                  title="oldskool audi discord"
                  description={
                    "join the discord channel for old school audi nerds"
                  }
                />
              </Link>
            </div>
          </div>
          {/* <div
              style={{
                backgroundColor: "white",
                height: "1px",
                width: "100%",
                margin: "10px 0",
              }}
              className={styles["line"]}
            /> */}
          <Link
            target="_blank"
            href="https://www.gofundme.com/f/celebrate-zak-kennedy-support-marcia-snyder/"
            style={{ textDecoration: "none" }}
            className={styles["in-memory"]}
          >
            <div className={styles["nav__item_hover-background"]} />

            <div className={styles["memtext"]}>
              <img src={zk.src} className={styles["in-memory-bg"]} />
              <p className={styles["memory-subtext"]}> in memory of</p>
              <h2 className={styles["memory-text"]}>Zak Kennedy</h2>
              <p className={styles["memory-subtext"]}>1979-2025</p>
            </div>
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
