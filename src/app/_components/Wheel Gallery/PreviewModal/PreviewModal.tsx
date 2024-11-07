"use client";

import React, { useEffect, useState } from "react";
import styles from "./PreviewModal.module.css";
import GalleryItem from "../GalleryItem/GalleryItem";

export default function PreviewModal({ activeModal, closeModal, data }) {
  const [imageData, setImageData] = useState({});

  useEffect(() => {
    setImageData(data);
  }, [data]);

  return (
    <div
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
      </div>
    </div>
  );
}
