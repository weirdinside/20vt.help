"use client";

import Link from "next/link";
import React, { useEffect, useState, useTransition } from "react";
import styles from "./PreviewModal.module.css";
import GalleryItem from "../GalleryItem/GalleryItem";
import { copyLink } from "@/app/utils";

export default function PreviewModal({ activeModal, closeModal, data }) {
  const [imageData, setImageData] = useState({});
  const [isCopying, startCopying] = useTransition();

  function handleClickAwayClose(e) {
    e.stopPropagation();

    if (e.target.classList.contains(styles["modal"])) {
      closeModal();
    }
  }

  function handleCopyLink(){
    startCopying(()=>{
      copyLink(data.photo_url).then((res)=>{
        console.log(res)
      })
    })
    
  }

  useEffect(() => {
    function handleEscClose(e) {
      if (e.key === "Escape") {
        closeModal();
      }
    }
    window.addEventListener("keydown", handleEscClose);
    return () => {
      window.removeEventListener("keydown", handleEscClose);
    };
  });

  useEffect(() => {
    setImageData(data);
  }, [data]);



  return (
    <div
      onClick={handleClickAwayClose}
      className={`${styles["modal"]} ${
        activeModal === "preview" ? styles["active"] : ""
      }`}
    >
      <div
        className={`${styles["preview-modal"]} ${
          activeModal === "preview" ? styles["active"] : ""
        }`}
      >
        <GalleryItem imageInfo={imageData}></GalleryItem>
        <div className={styles["preview-modal__options"]}>
          {data.submitted_by?.includes('@') ? (
            <Link target="_blank" href={`https://instagram.com/${data.submitted_by.slice(data.submitted_by.indexOf("@") + 1)}`}>
            <button className={`${styles["preview-modal__button"]} ${styles['instagram']}`}>
              more from {data.submitted_by}
              <div className={styles['preview-modal__button-ib']}></div>
            </button>
            </Link>
          ) : null}

          <button disabled={isCopying} onClick={handleCopyLink} className={styles["preview-modal__button"]}>
            copy link
          </button>
        </div>
      </div>
      {/* <div className={`${styles['preview-modal__copied']} ${isCopying ? styles['active'] : ''}`}>URL copied</div> */}
    </div>
  );
}
