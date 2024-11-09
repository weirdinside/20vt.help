"use client";

import Link from "next/link";
import Image from "next/image";
import React, { ChangeEvent, useEffect, useState, useTransition } from "react";
import styles from "./PreviewModal.module.css";
import { copyLink } from "@/app/utils";

export default function PreviewModal({ activeModal, closeModal, data }) {
  const [isCopying, setIsCopying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function handleCloseModal() {
    closeModal();
  }

  function handleClickAwayClose(e: React.MouseEvent) {
    e.stopPropagation();
    if (e.target?.classList.contains(styles["modal"])) {
      handleCloseModal();
    }
  }

  async function handleCopyLink() {
    copyLink(data.photo_url).then((res) => {
      setIsCopying(true);
      return;
    });
    setTimeout(() => {
      setIsCopying(false);
    }, 2000);
  }

  useEffect(
    function setLoading() {
      setIsLoading(true);
    },
    [data],
  );

  useEffect(function listenForEsc() {
    function handleEscClose(e) {
      if (e.key === "Escape") {
        handleCloseModal();
      }
    }
    window.addEventListener("keydown", handleEscClose);
    return () => {
      window.removeEventListener("keydown", handleEscClose);
    };
  }, []);

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
        <div className={styles["image-container"]}>
          <div
            className={`${styles["image__loading"]} ${
              isLoading ? styles["active"] : ""
            }`}
          ></div>
          <Image
            className={styles["image"]}
            loading="eager"
            onLoad={() => {
              setIsLoading(false);
            }}
            decoding="async"
            alt="modal-image"
            src={data.photo_url}
            quality={100}
            width={0}
            height={0}
            sizes="100vw"
          />
        </div>
        <div className={styles["image__text"]}>
          <h1 className={styles["image__wheelname"]}>
            {data.wheel_brand} {data.wheel_name}
          </h1>
          <p className={styles["image__cartype"]}>
            {data.submitted_by ? `${data.submitted_by}'s` : ""} {data.car_type}
          </p>
        </div>
        <div className={styles["preview-modal__options"]}>
          {data?.submitted_by?.includes("@") ? (
            <Link
              target="_blank"
              href={`https://instagram.com/${data.submitted_by.slice(
                data.submitted_by.indexOf("@") + 1,
              )}`}
            >
              <button className={styles["preview-modal__button"]}>
                instagram link
              </button>
            </Link>
          ) : null}

          <button
            onClick={() => {
              handleCopyLink();
            }}
            className={styles["preview-modal__button"]}
          >
            copy image link
          </button>
        </div>
      </div>
      <div
        className={`${styles["preview-modal__copied"]} ${
          isCopying ? styles["active"] : ""
        }`}
      >
        <p className={styles["preview-modal__copied-text"]}>link copied!</p>
      </div>
    </div>
  );
}
