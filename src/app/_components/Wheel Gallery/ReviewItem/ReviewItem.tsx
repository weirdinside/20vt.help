import GalleryItem from "../GalleryItem/GalleryItem";
import styles from "./ReviewItem.module.css";
import { carTypes, wheelSizes } from "@/app/constants";
import React, { useState, useTransition } from "react";
import { updateImageData } from "@/app/wheel-gallery/review/actions";
import { setApproved } from "@/app/wheel-gallery/review/actions";
import { deleteEntry, deleteImage } from "@/app/wheel-gallery/review/actions";

export default function ReviewItem({
  triggerRefetch,
  data,
}: {
  triggerRefetch: () => void;
  data: ImageInfo;
}) {
  const [editMode, setEditMode] = useState(false);
  const [isDeleting, startDeleting] = useTransition();
  const [isApproving, startApproving] = useTransition();

  const subtypeC3 = ["10v", "20v"];
  const subtypeC4 = ["S4", "S6"];

  const [imageData, setImageData] = useState({
    approved: data.approved,
    car_type: data.car_type,
    id: data.id,
    wheel_brand: data.wheel_brand,
    wheel_name: data.wheel_name,
    wheel_size: data.wheel_size,
    subtype: data.subtype,
    username: data.submitted_by,
  });

  function setInitialData() {
    setImageData({
      approved: data.approved,
      car_type: data.car_type,
      id: data.id,
      subtype: data.subtype,
      wheel_brand: data.wheel_brand,
      wheel_name: data.wheel_name,
      wheel_size: data.wheel_size,
      username: data.submitted_by,
    });
  }

  async function handleDelete() {
    startDeleting(() => {
      deleteEntry({ id: data.id })
        .then((data) => {
          if (data) {
            return deleteImage({ url: data.photo_url });
          }
          return null;
        })
        .then(() => {
          triggerRefetch();
        })
        .catch((err) => {
          console.error("Error in handleDelete:", err.message);
        });
    });
  }

  function handleDataChange({
    category,
    value,
  }: {
    category: string;
    value: string | number;
  }) {
    setImageData((previous) => ({
      ...previous,
      [category]: value,
    }));
  }

  async function handleApprove() {
    startApproving(() => {
      setApproved(data.id)
        .then(() => {
          triggerRefetch();
        })
        .catch((err) => {
          console.error("Error in handleApprove: ", err);
        });
    });
  }

  function handleConfirmEdit() {
    startApproving(() => {
      updateImageData({
        id: imageData.id,
        car_type: imageData.car_type,
        subtype: imageData.subtype,
        wheel_size: imageData.wheel_size,
        wheel_brand: imageData.wheel_brand,
        wheel_name: imageData.wheel_name,
      })
        .then(() => {
          setEditMode(false);
          triggerRefetch();
        })
        .catch((err) => {
          console.error("Error in handleConfirmEdit", err);
        });
    });
  }

  return (
    <div className={styles["review-item__container"]}>
      <div
        className={`${styles["review-item__loading"]} ${
          isApproving || isDeleting ? styles["active"] : null
        }`}
      >
        <div
          className={`${styles["page__loading_fire"]} ${
            isApproving || isDeleting ? styles["active"] : null
          }`}
        ></div>
        <div
          className={`${styles["page__loading_fire"]} ${
            isApproving || isDeleting ? styles["active"] : null
          }`}
        ></div>
        <div
          className={`${styles["page__loading_fire"]} ${
            isApproving || isDeleting ? styles["active"] : null
          }`}
        ></div>
        <div
          className={`${styles["page__loading_fire"]} ${
            isApproving || isDeleting ? styles["active"] : null
          }`}
        ></div>
        <div
          className={`${styles["page__loading_fire"]} ${
            isApproving || isDeleting ? styles["active"] : null
          }`}
        ></div>
      </div>
      <div className={styles["review-item__galleryitem"]}>
        <GalleryItem imageInfo={data} />
      </div>
      <div className={styles["review-item__sidebar"]}>
        {editMode ? (
          <>
            <form className={styles["edit__form"]}>
              <select
                onChange={(e) => {
                  handleDataChange({
                    category: "car_type",
                    value: e.target.value,
                  });
                }}
                value={imageData.car_type}
                className={styles["edit__form_select"]}
              >
                {carTypes.map((car) => {
                  return (
                    <option key={car} value={car}>
                      {car}
                    </option>
                  );
                })}
              </select>
              {imageData.car_type.includes("C3") ? (
                <select
                  onChange={(e) => {
                    handleDataChange({
                      category: "subtype",
                      value: e.target.value,
                    });
                  }}
                  value={imageData.subtype}
                  className={styles["edit__form_select"]}
                >
                  {subtypeC3.map((type) => {
                    return (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    );
                  })}
                </select>
              ) : null}
               {imageData.car_type.includes("C4") ? (
                <select
                  onChange={(e) => {
                    handleDataChange({
                      category: "subtype",
                      value: e.target.value,
                    });
                  }}
                  value={imageData.subtype}
                  className={styles["edit__form_select"]}
                >
                  {subtypeC4.map((type) => {
                    return (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    );
                  })}
                </select>
              ) : null}
              <select
                onChange={(e) => {
                  handleDataChange({
                    category: "wheel_size",
                    value: parseInt(e.target.value),
                  });
                }}
                value={imageData.wheel_size}
                className={styles["edit__form_select"]}
              >
                {wheelSizes.map((size) => {
                  return (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  );
                })}
              </select>
              <input
                onChange={(e) => {
                  handleDataChange({
                    category: "wheel_brand",
                    value: e.target.value,
                  });
                }}
                value={imageData.wheel_brand}
                placeholder="wheel brand"
                className={styles["edit__form_input"]}
              ></input>
              <input
                onChange={(e) => {
                  handleDataChange({
                    category: "wheel_name",
                    value: e.target.value,
                  });
                }}
                value={imageData.wheel_name}
                placeholder="wheel name"
                className={styles["edit__form_input"]}
              ></input>
              <input
                onChange={(e) => {
                  handleDataChange({
                    category: "username",
                    value: e.target.value,
                  });
                }}
                value={imageData.username}
                placeholder="username"
                className={styles["edit__form_input"]}
              ></input>
              <div className={styles["edit__form_buttons"]}>
                <button
                  onClick={() => {
                    setInitialData();
                  }}
                  type="button"
                  className={styles["edit__form_button"]}
                >
                  revert
                </button>
                <button
                  onClick={() => {
                    handleConfirmEdit();
                  }}
                  type="button"
                  className={styles["edit__form_button"]}
                >
                  confirm
                </button>
              </div>
            </form>
          </>
        ) : (
          <>
            {" "}
            <button
              onClick={() => {
                handleDelete();
              }}
              className={styles["review-item__button"]}
            >
              {isDeleting ? "deleting..." : "delete"}
            </button>
            <button
              onClick={() => {
                setInitialData();
                setEditMode(true);
              }}
              className={styles["review-item__button"]}
            >
              edit
            </button>
            <button
              onClick={() => {
                handleApprove();
              }}
              className={styles["review-item__button"]}
            >
              {isApproving ? "approving..." : "approve"}
            </button>{" "}
          </>
        )}
      </div>
    </div>
  );
}
