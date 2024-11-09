import React, { useEffect, useState, useRef } from "react";
import styles from "./Gallery.module.css";
import ClickableGalleryItem from "../ClickableGalleryItem/ClickableGalleryItem";
import { paginatedFetch } from "@/app/wheel-gallery/actions";

export default function Gallery({ loading, galleryRef, handleImageClick, images }) {

  return (
    <div ref={galleryRef} className={styles["gallery"]}>
      {loading ? <div className={styles['gallery__loading']}>
        <div className={styles["gallery__loading_fire"]}></div>
        <div className={styles["gallery__loading_fire"]}></div>
        <div className={styles["gallery__loading_fire"]}></div>
        <div className={styles["gallery__loading_fire"]}></div>
        <div className={styles["gallery__loading_fire"]}></div>
      </div> : null}
      {images.map((image, index) => {
        return (
          <ClickableGalleryItem
            handleImageClick={handleImageClick}
            key={index}
            imageInfo={image}
          ></ClickableGalleryItem>
        );
      })}
    </div>
  );
}
