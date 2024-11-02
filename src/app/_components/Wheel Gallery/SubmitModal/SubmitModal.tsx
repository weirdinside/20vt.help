"use client";

import { ChangeEvent, useState, useRef, useTransition } from "react";
import { uploadImage } from "@/app/supabase/storage/client";
import { convertBlobUrlToFile } from "@/app/utils";
import styles from "./SubmitModal.module.css";
import SLogo from "@/app/_components/Homepage/SLogo/SLogo";

export default function SubmitModal({ activeModal, closeModal }) {
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      const newImageUrls = filesArray.map((file) => URL.createObjectURL(file));

      setImageUrls([...imageUrls, ...newImageUrls]);
    }
  };

  const [imageSubmitted, setSubmitted] = useState(false);

  const [isPending, startTransition] = useTransition();

  const handleClickUploadImagesButton = async () => {
    startTransition(async () => {
      let urls = [];
      for (const url of imageUrls) {
        const imageFile = await convertBlobUrlToFile(url);
        const { imageUrl, error } = await uploadImage({
          file: imageFile,
          bucket: "submitted-images",
        });
        if (error) {
          console.error(error);
          return;
        }
        urls.push(imageUrl);
      }
      console.log(urls);
      setImageUrls([]);
    });
  };

  return (
    <div
      className={`${styles["modal"]} ${
        activeModal === "submit" ? styles["active"] : null
      }`}
    >
      <div className={styles["submit"]}>
        <h1 className={styles["submit__heading"]}>
          submit a photo
          <div onClick={closeModal} className={styles["submit__heading_logo"]}>
            <SLogo color="white" inElement="landing" />
          </div>
        </h1>
        {imageSubmitted ? <form className={styles["submit__form"]}>
          <label className={styles["submit__label"]}>
            what kind of car?
            <select defaultValue={""} className={styles["submit__input"]}>
              <option
                className={styles["submit__input_option_placeholder"]}
                value=""
                disabled
              >
                select a car...
              </option>
              <option
                className={styles["submit__input_option"]}
                value="UrS4 sedan"
              >
                UrS4 sedan
              </option>
              <option
                className={styles["submit__input_option"]}
                value="UrS4 avant"
              >
                UrS4 avant
              </option>
              <option
                className={styles["submit__input_option"]}
                value="UrS6 sedan"
              >
                UrS6 sedan
              </option>
              <option
                className={styles["submit__input_option"]}
                value="UrS6 avant"
              >
                UrS6 avant
              </option>
              <option
                className={styles["submit__input_option"]}
                value="T44 sedan"
              >
                T44 sedan
              </option>
              <option
                className={styles["submit__input_option"]}
                value="T44 avant"
              >
                T44 avant
              </option>
              <option
                className={styles["submit__input_option"]}
                value="B3/B4 coupe"
              >
                B3/B4 coupe
              </option>
              <option
                className={styles["submit__input_option"]}
                value="B3/B4 sedan"
              >
                B3/B4 sedan
              </option>
              <option
                className={styles["submit__input_option"]}
                value="B3/B4 avant"
              >
                B3/B4 avant
              </option>
            </select>
          </label>
          <label className={styles["submit__label"]}>
            wheel type?*
            <input
              className={styles["submit__input"]}
              placeholder="BBS"
              required
              type="text"
            ></input>
          </label>
          <label className={styles["submit__label"]}>
            name/username*
            <input
              className={styles["submit__input"]}
              placeholder="ani / @95urs6"
              required
              type="text"
            ></input>
          </label>
          <label className={styles["submit__label"]}>
            wheel brand?*
            <input
              className={styles["submit__input"]}
              placeholder="CH-R"
              required
              type="text"
            ></input>
          </label>
          <label className={styles["submit__label"]}>
            upload photo(s)*
            <input
              ref={imageInputRef}
              onChange={handleImageChange}
              className={styles["submit__input_file"]}
              required
              multiple
              type="file"
              accept="image/png, image/jpeg, image/jpg, image/heic"
            ></input>
          </label>
          <div className={styles["submit__image-preview"]}></div>
          <button className={styles["submit__button"]} onClick={handleClickUploadImagesButton} disabled={isPending} >
            {isPending ? "submitting..." : "submit"}
          </button>
        </form> : <div>
          <p className={styles['submit__post_text']}>thanks for your contribution!</p>
          <div className={styles['submit__post_actions']}>
            <button className={styles['submit__button-i']}>submit another image</button>
            <button className={styles['submit__button']}>browse gallery</button>
          </div>
          </div>}
        
      </div>
    </div>
  );
}
