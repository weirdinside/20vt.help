"use client";

import React from "react";
import { useState } from "react";
import styles from "./NavItem.module.css";
import Marquee from "../../_general/Marquee/Marquee";

function NavItem({ title, description }) {
  const [isMousedOver, setMouseState] = useState(false);

  return (
    <div
      className="nav__item_container"
      onMouseEnter={() => {
        setMouseState(true);
      }}
      onMouseLeave={() => {
        setMouseState(false);
      }}
    >
      <h1 className={styles["nav__item"]}>
        {title}.<div className={styles["nav__item_hover-background"]}></div>
        <div className={styles["nav__item_description"]}>
          <Marquee
            trigger={isMousedOver}
            textContent={description}
            fontSize={15}
            fontFamily={"Work Sans"}
            pauseTime={600}
            scrollSpeed={1}
          ></Marquee>
        </div>
      </h1>
    </div>
  );
}

export default NavItem;
