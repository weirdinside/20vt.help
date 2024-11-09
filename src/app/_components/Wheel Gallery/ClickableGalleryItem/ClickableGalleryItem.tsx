import React, {useEffect, useState} from "react";
import styles from "./ClickableGalleryItem.module.css";
import Image from 'next/image';

export default function ClickableGalleryItem({ handleImageClick, imageInfo }) {

  function handleClick(){
    handleImageClick(imageInfo);
  }

  return (
    <div onClick={handleClick} key={imageInfo?.id} className={styles["gallery__item"]}>
      <div className={styles["gallery__item_frame"]}>
        <p className={styles["gallery__item_description_size"]}>
          {imageInfo?.wheel_size}"
        </p>
      </div>
      <div className={styles["gallery__item_photo_container"]}>
        <Image
          loading="lazy"
          decoding="sync"
          alt="modal-image"
          fill={true}
          placeholder="blur"
          src={imageInfo.photo_url}
          blurDataURL={imageInfo.photo_url}
          quality={100}
          sizes="50vw, 100vw"
          objectFit="cover"
        />
      </div>
      <div className={styles["gallery__item_description"]}>
        <p className={styles["gallery__item_description_name"]}>
          {imageInfo?.wheel_brand} {imageInfo?.wheel_name}
        </p>
        <p className={styles["gallery__item_description_user"]}>
          {imageInfo?.submitted_by
            ? `${imageInfo?.submitted_by}'s ${imageInfo?.car_type}`
            : `${imageInfo?.car_type}`}
        </p>
      </div>
    </div>
  );
}
