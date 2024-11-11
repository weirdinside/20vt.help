import React from "react";
import styles from "./GalleryItem.module.css";
import Image from "next/image";

export default function GalleryItem({
  imageInfo,
}: {
  imageInfo: ImageInfo;
}) {
  return (
    <div key={imageInfo?.id} className={styles["gallery__item"]}>
      <div className={styles["gallery__item_frame"]}>
        <p className={styles["gallery__item_description_size"]}>
          {imageInfo?.wheel_size}"
        </p>
      </div>
      <div className={styles["gallery__item_photo_container"]}>
        <Image
          loading="eager"
          decoding="sync"
          alt="modal-image"
          fill={true}
          placeholder="blur"
          src={imageInfo.photo_url}
          blurDataURL={imageInfo.photo_url}
          quality={100}
          objectFit="cover"
        />
      </div>

      <div className={styles["gallery__item_description"]}>
        <p className={styles["gallery__item_description_name"]}>
          {imageInfo?.wheel_brand} {imageInfo?.wheel_name}
        </p>

        <p className={styles["gallery__item_description_user"]}>
          {imageInfo?.submitted_by
            ? `${imageInfo?.submitted_by}'s ${imageInfo.car_type.slice(0,2)} ${imageInfo?.subtype} ${imageInfo.car_type.slice(3, imageInfo.car_type.length)}`
            : `${imageInfo.car_type.slice(0,2)} ${imageInfo?.subtype} ${imageInfo.car_type.slice(3, imageInfo.car_type.length)}`}
        </p>
      </div>
    </div>
  );
}
