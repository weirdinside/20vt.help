"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState, useCallback } from "react";
import styles from "./PreviewModal.module.css";
import { copyLink } from "@/app/utils";
import SLogo from "../../Homepage/SLogo/SLogo";

export default function PreviewModal({
  activeModal,
  closeModal,
  data,
}: {
  activeModal: string;
  closeModal: () => void;
  data: ImageInfo;
}) {
  const [isCopying, setIsCopying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleCloseModal = useCallback(() => {
    closeModal();
  }, [closeModal]);

  function handleClickAwayClose(e: React.MouseEvent) {
    e.stopPropagation();
    const target = e.target as HTMLElement;

    if (target && target.classList.contains(styles["modal"])) {
      handleCloseModal();
    }
  }

  async function handleCopyLink() {
    copyLink(data!.photo_url).then(() => {
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

  useEffect(
    function listenForEsc() {
      function handleEscClose(e: KeyboardEvent) {
        if (e.key === "Escape") {
          handleCloseModal();
        }
      }
      window.addEventListener("keydown", handleEscClose);
      return () => {
        window.removeEventListener("keydown", handleEscClose);
      };
    },
    [handleCloseModal],
  );

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
         <div onClick={closeModal} className={styles["preview-modal__logo"]}>
            <SLogo color="#cf2a2a" inElement="landing" />
          </div>
        <div className={styles["image-container"]}>
          <div
            className={`${styles["image__loading"]} ${
              isLoading ? styles["active"] : ""
            }`}
          ></div>
          {/* THIS NEXT CODE IS SHITTY! THIS IS A SHITTY WORKAROUND!
          see more: https://github.com/vercel/next.js/discussions/18531*/}
          {data!.photo_url ? (
            <Image
              className={styles["image"]}
              loading="eager"
              onLoad={() => {
                setIsLoading(false);
              }}
              decoding="async"
              alt="modal-image"
              src={data!.photo_url}
              quality={100}
              width={0}
              height={0}
              sizes="100vw"
            />
          ) : null}
        </div>
        <div className={styles["image__text"]}>
          <h1 className={styles["image__wheelname"]}>
            {data!.wheel_brand} {data!.wheel_name}
          </h1>
          <p className={styles["image__cartype"]}>
            {data!.submitted_by ? `${data!.submitted_by}'s` : ""}{" "}
            {data!.subtype
              ? data!.car_type.slice(0, 2) +
                " " +
                data!.subtype +
                data!.car_type.slice(2, data?.car_type.length)
              : ""}
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
          {/* {data.photo_url ? (
            <Link
              href={`${data.photo_url}?download=${data.wheel_brand}-${
                data.wheel_name
              }_${data.car_type}${data.subtype}.${data.photo_url.slice(
                data.photo_url.lastIndexOf("."),
                data.photo_url.length,
              )}`}
            >
              <button
                className={`${styles["preview-modal__button"]} ${styles["download"]}`}
              ></button>
            </Link>
          ) : null} */}
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
