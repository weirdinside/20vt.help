"use client";

import { fetchAllUnapprovedImages } from "@/app/supabase/storage/client";
import { logout } from "@/app/wheel-gallery/login/actions";
import styles from './ReviewPage.module.css'
import React, { useEffect, useState, useTransition } from "react";
import { greetingTime } from "@/app/utils";

import ReviewGallery from "../ReviewGallery/ReviewGallery";

export default function ReviewPage({ userData }) {

  const [loggingOut, setLoggingOut] = useTransition();

  function handleLogout(){
    setLoggingOut(()=>{
      logout()
    })
  }

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
          <button onClick={handleLogout} className={styles["admin__header_logout"]}>
            {loggingOut ? 'logging out..' : 'log out'}
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
