"use client";

import { fetchAllUnapprovedImages } from "@/app/supabase/storage/client";
import { logout } from "@/app/wheel-gallery/login/actions";
import styles from './ReviewPage.module.css'
import React, { useEffect, useState } from "react";
import { greetingTime } from "@/app/utils";

import ReviewGallery from "../ReviewGallery/ReviewGallery";

export default function ReviewPage({ userData }) {

  return (
    <div className={styles["admin"]}>
      <div className={styles["admin__content"]}>
        <div className={styles["admin__header"]}>
          <h1 className={styles["admin__header_heading"]}>
            {greetingTime()}, 
            <span className={styles["heading__username"]}>
              {" "}{userData.user.email}!
              <div className={styles["heading__username_background"]}></div>
            </span>
          </h1>
          <button onClick={logout} className={styles["admin__header_logout"]}>
            log out
          </button>
        </div>
        <section className={styles["admin__main"]}>
          <p className={styles["admin__main_text"]}></p>
          <ReviewGallery></ReviewGallery>
        </section>
      </div>
    </div>
  );
}
