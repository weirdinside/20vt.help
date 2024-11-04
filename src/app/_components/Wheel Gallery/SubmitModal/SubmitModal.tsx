"use client";

import { ChangeEvent, useState, useRef, useTransition } from "react";
import { uploadImage } from "@/app/supabase/storage/client";
import { convertBlobUrlToFile, getRandomInt } from "@/app/utils";
import styles from "./SubmitModal.module.css";
import SLogo from "@/app/_components/Homepage/SLogo/SLogo";
import { createSupabaseClient } from "@/app/supabase/client";
import { wheelSizes, carTypes } from "@/app/constants";

export default function SubmitModal({  activeModal, closeModal }) {
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [wheelSize, setWheelSize] = useState("");
  const [carType, setCarType] = useState("");
  const [wheelBrand, setWheelBrand] = useState("");
  const [wheelName, setWheelName] = useState("");
  const [username, setUsername] = useState("");
  const [imageSubmitted, setSubmitted] = useState(false);
  const [isPending, startTransition] = useTransition();

  const isFormValid = () =>
    [wheelSize, carType, wheelBrand, wheelName, username].every(Boolean) &&
    imageUrls.length > 0;

  const handleInputChange =
    (setter) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setter(e.target.value);

  const clearAllFields = () => {
    setWheelSize("");
    setCarType("");
    setWheelBrand("");
    setWheelName("");
    setUsername("");
    setImageUrls([]);
    if (imageInputRef.current) imageInputRef.current.value = null;
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImageUrls = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );
      setImageUrls(newImageUrls);
    }
  };

  const handleSubmit = async () => {
    if (!isFormValid()) return;

    startTransition(async () => {
      try {
        const urls = await Promise.all(
          imageUrls.map(async (url) => {
            const imageFile = await convertBlobUrlToFile(url);
            const { imageUrl, error } = await uploadImage({
              file: imageFile,
              bucket: "submitted-images",
            });
            if (error) throw new Error(`Upload error: ${error.message}`);
            return imageUrl;
          })  
        );

        const convertedWheelSize = parseInt(wheelSize.replace('"', ""));
        const rowsToInsert = urls.map((imageUrl) => ({
          photo_url: imageUrl,
          wheel_brand: wheelBrand,
          wheel_size: convertedWheelSize,
          wheel_name: wheelName,
          submitted_by: username,
          car_type: carType,
          approved: false,
        }));

        const supabase = createSupabaseClient();
        const { error: insertError } = await supabase
          .from("images")
          .insert(rowsToInsert);

        if (insertError) throw new Error(`Insert error: ${insertError.message}`);

        clearAllFields();
        setSubmitted(true);
      } catch (error) {
        console.error("Error in submit:", error);
      }
    });
  };

  const renderImageList = () => (
    <div
      style={imageUrls.length ? { minHeight: "200px" } : {}}
      className={styles["submit__post_photo-list"]}
    >
      {imageUrls.map((image, index) => (
        <div
          key={index}
          className={styles["submit__post_photo"]}
          style={{ rotate: `${getRandomInt(5)}deg` }}
        >
          <div
            style={{ backgroundImage: `url(${image})` }}
            className={styles["submit__post_photo_image"]}
          />
        </div>
      ))}
    </div>
  );

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        if (e.target.classList.contains(styles["modal"])) closeModal();
      }}
      className={`${styles["modal"]} ${
        activeModal === "submit" ? styles["active"] : ""
      }`}
    >
      <div className={styles["submit"]}>
        <h1 className={styles["submit__heading"]}>
          submit a photo
          <div onClick={closeModal} className={styles["submit__heading_logo"]}>
            <SLogo color="white" inElement="landing" />
          </div>
        </h1>
        {!imageSubmitted ? (
          <form className={styles["submit__form"]}>
            <label className={styles["submit__label"]}>
              what kind of car?*
              <select
                required
                onChange={handleInputChange(setCarType)}
                value={carType}
                className={styles["submit__input"]}
              >
                <option value="" disabled>
                  select a car...
                </option>
                {carTypes.map((car)=>{
                  return(
                    <option
                    className={styles["submit__input_option"]}
                    value={car}
                  >{car}</option>
                  )
                })}
              </select>
            </label>
            <label className={styles["submit__label"]}>
              what size of wheel?*
              <select
                required
                onChange={handleInputChange(setWheelSize)}
                value={wheelSize}
                className={styles["submit__input"]}
              >
                <option value="" disabled>
                  select a size...
                </option>
                {wheelSizes.map((size)=>{
                  return(
                    <option
                    className={styles["submit__input_option"]}
                    value={size}
                  >{size}</option>
                  )
                })}
              </select>
            </label>
            <label className={styles["submit__label"]}>
              wheel brand?*
              <input
                onChange={handleInputChange(setWheelBrand)}
                value={wheelBrand}
                placeholder="BBS"
                required
                type="text"
                className={styles["submit__input"]}
              />
            </label>
            <label className={styles["submit__label"]}>
              wheel name?*
              <input
                onChange={handleInputChange(setWheelName)}
                value={wheelName}
                placeholder="CH-R"
                required
                type="text"
                className={styles["submit__input"]}
              />
            </label>
            <label className={styles["submit__label"]}>
              name/username*
              <input
                onChange={handleInputChange(setUsername)}
                value={username}
                placeholder="ani / @95urs6"
                required
                type="text"
                className={styles["submit__input"]}
              />
            </label>
            <label className={styles["submit__label"]}>
              upload photo(s)*
              <input
                ref={imageInputRef}
                onChange={handleImageChange}
                required
                multiple
                type="file"
                accept="image/png, image/jpeg, image/jpg, image/heic"
                className={styles["submit__input_file"]}
              />
            </label>
            {renderImageList()}
            <div className={styles["submit__button_container"]}>
              <button
                type="button"
                className={styles["submit__button-i"]}
                onClick={clearAllFields}
              >
                reset form
              </button>
              <button
                type="button"
                className={styles["submit__button"]}
                onClick={handleSubmit}
                disabled={!isFormValid()}
              >
                {isPending ? "submitting..." : "submit"}
              </button>
            </div>
          </form>
        ) : (
          <div>
            <p className={styles["submit__post_text"]}>
              thanks for your contribution!
            </p>
            {renderImageList()}
            <div className={styles["submit__button_container"]}>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setImageUrls([]);
                }}
                className={styles["submit__button-i"]}
              >
                submit another image
              </button>
              <button
                onClick={() => {
                  closeModal();
                  clearAllFields();
                  setSubmitted(false);
                }}
                className={styles["submit__button"]}
              >
                browse gallery
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
