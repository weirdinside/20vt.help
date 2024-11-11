'use client'

import React from "react";
import styles from "./AboutModal.module.css";

interface AboutModalProps {
  activeModal: "about" | ""; 
  closeModal: () => void;
}

function AboutModal({ activeModal, closeModal }: AboutModalProps) {

  function Mailto({ email="", subject = "", body = "", children }: {email: string, subject: string, body: string, children: string}) {
    let params = subject || body ? "?" : "";
    if (subject) params += `subject=${encodeURIComponent(subject)}`;
    if (body) params += `${subject ? "&" : ""}body=${encodeURIComponent(body)}`;
    return <a href={`mailto:${email}${params}`}>{children}</a>;
  }

  return (
    <div
      className={`${styles["modal"]} ${
        activeModal === "about" && styles["modal_opened"]
      }`}
    >
      <div className={styles["modal__container"]}>
        <a
          onClick={closeModal}
          className={styles["footer__logo"]}
          id="about-close"
        >
          <div
            className={`${styles["logo__big-rhombus"]} ${styles["in_footer"]}`}
            id="big-rhombus"
          ></div>
          <div
            className={styles["logo__small-rhombus-1"]}
            id="small-rhombus-1"
          ></div>
          <div
            className={styles["logo__small-rhombus-2"]}
            id="small-rhombus-2"
          ></div>
          <div className={styles["text_floater"]}>back to 20vt.help</div>
        </a>
        <p className={styles["footer__text"]}>
          Back in 2017, I bought my first UrS from a guy in Long Island. I drove
          it like it owed me money, I drove it across the country five or six
          times, and with it, climbed mountains I didn't think were surmountable
          by a thirty year old car. I broke it (and then I owed it money),
          learned to fix it, and then kept driving it like it owed me money.
          <br />
          <br />
          Since then, I've owned four different UrS cars, and gotten help from
          the greatest community of enthusiasts I've had the privilege of being
          a part of. This website is my way of paying it forward to the next
          generation of owners of UrS cars, and making an accessible resource
          for the current owners who have helped me time and time again. <br />
          <br />- Ani Bharadwaj{" "}
          <Mailto email="ani@20vt.help" subject="20vt.help - contact" body="">
            ani@20vt.help
          </Mailto>
          ,<br />
          <span className={styles["about__small-text"]}>
            mechanical object enthusiast, & creator of 20vt.help
            <br />
            still daily driving a 1995 Audi S6 avant
          </span>
        </p>
        <br />
      </div>
    </div>
  );
}

export default AboutModal;
