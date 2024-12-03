import React from "react";
import styles from "./ClickableGalleryItem.module.css";
import Image from "next/image";

export default function ClickableGalleryItem({
  handleImageClick,
  imageInfo,
}: {
  imageInfo: ImageInfo;
  handleImageClick: (arg0: ImageInfo) => void;
}) {
  function handleClick() {
    handleImageClick(imageInfo);
  }

  return (
    <div
      onClick={handleClick}
      key={imageInfo?.id}
      className={styles["gallery__item"]}
    >
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
          {imageInfo.submitted_by ? `${imageInfo.submitted_by}'s ` : ""}
          {imageInfo.car_type.length > 0
            ? `${imageInfo.car_type.slice(
                0,
                imageInfo.car_type.indexOf(" "),
              )} ${
                imageInfo.subtype ? imageInfo.subtype : ""
              } ${imageInfo.car_type.slice(
                imageInfo.car_type.indexOf(" ") + 1,
                imageInfo.car_type.length,
              )}`
            : ""}
        </p>
      </div>
    </div>
  );
}
