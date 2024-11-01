'use client'

import React from "react";
import styles from "./ScreenSizeWarning.module.css";
import Link from "next/link";

import rotateIcon from "../../../assets/icons/phone-rotate/rotate.png";
import phoneIcon from "../../../assets/icons/phone-rotate/phone.png";
import mouse from "../../../assets/icons/screen-size-increase/mouse.png";
import urlline from "../../../assets/icons/screen-size-increase/urlline.png";
import buttonsHttp from "../../../assets/icons/screen-size-increase/buttons-http.png";
import screenpng from "../../../assets/icons/screen-size-increase/screen.png";

function ScreenSizeWarning() {
  return (
    <div className={styles["ssw__container"]}>
      <div className={styles["ssw__warning"]}>
        <div className={styles["header__logo"]}>
          <div className={styles["logo__big-rhombus"]} id="big-rhombus"></div>
          <div className={styles["logo__small-rhombus-1"]} id="small-rhombus-1"></div>
          <div className={styles["logo__small-rhombus-2"]} id="small-rhombus-2"></div>
        </div>
        <h2 className={styles["ssw__title"]}>we're sorry...</h2>
        <Link href="/" className={styles["ssw__back"]}>go back to 20vt.help</Link>
        <p className={styles["ssw__body"]}>
          This part of the site doesn't work with your device's resolution.
        </p>
        <p className={styles["ssw__body"]}>
          If you are using a mobile device, try rotating it, and if you are on a
          computer, try increasing the window height!
        </p>
        <div className={styles["ssw__demo"]}>
          <div className={styles["ssw__demo-container"]}>
            <div className={styles["rotate-phone"]}>
              <img
                className={styles["rotateicon"]}
                alt="phone rotation icon"
                src={rotateIcon}
              ></img>
              <img
                className={styles["phoneicon"]}
                alt="phone rotation icon"
                src={phoneIcon}
              ></img>
            </div>
          </div>
          <div className={styles["ssw__demo-container"]}>
            <div className={styles["increase-screensize"]}>
              <img src={mouse} className={styles["ss__mouse"]}></img>
              <img src={urlline} className={styles["ss__urlline"]}></img>
              {/* <img src={buttonsHttp} className={styles["ss__buttons"]}></img> */}
              <img src={screenpng} className={styles["ss__screen"]}></img>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScreenSizeWarning;
