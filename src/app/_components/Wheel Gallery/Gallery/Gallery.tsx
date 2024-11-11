import React from "react";
import styles from "./Gallery.module.css";
import ClickableGalleryItem from "../ClickableGalleryItem/ClickableGalleryItem";

export default function Gallery({
  loading,
  galleryRef,
  handleImageClick,
  images,
}: {
  loading: boolean;
  galleryRef: React.RefObject<HTMLDivElement>;
  handleImageClick: (imageData: ImageInfo) => void;
  images: object[];
}) {
  return (
    <div ref={galleryRef} className={styles["gallery"]}>
      {loading ? (
        <div className={styles["gallery__loading"]}>
          <div className={styles["gallery__loading_fire"]}></div>
          <div className={styles["gallery__loading_fire"]}></div>
          <div className={styles["gallery__loading_fire"]}></div>
          <div className={styles["gallery__loading_fire"]}></div>
          <div className={styles["gallery__loading_fire"]}></div>
        </div>
      ) : null}
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
