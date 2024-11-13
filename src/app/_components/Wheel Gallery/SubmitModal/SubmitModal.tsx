"use client";

import { ChangeEvent, useState, useRef, useTransition, useEffect } from "react";
import { uploadImage } from "@/app/supabase/storage/client";
import { convertBlobUrlToFile, getRandomInt } from "@/app/utils";
import styles from "./SubmitModal.module.css";
import SLogo from "@/app/_components/Homepage/SLogo/SLogo";
import { createSupabaseClient } from "@/app/supabase/client";
import { wheelSizes, carTypes } from "@/app/constants";

export default function SubmitModal({
  activeModal,
  closeModal,
}: {
  activeModal: string;
  closeModal: () => void;
}) {
  // ---------------------------------------- //
  //            VARIABLES / STATES            //
  // ---------------------------------------- //

  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const imageInputRef = useRef<HTMLInputElement>(null);
  const submitModalRef = useRef<HTMLFormElement>(null);
  const honeypotRef = useRef<HTMLInputElement>(null);

  const [shadowPosition, setShadowPosition] = useState("");

  const [wheelSize, setWheelSize] = useState("");
  const [imageList, setImageList] = useState(<></>);
  const [carType, setCarType] = useState("");
  const [subType, setSubType] = useState("");
  const [wheelBrand, setWheelBrand] = useState("");
  const [wheelName, setWheelName] = useState("");
  const [username, setUsername] = useState("");
  const [imageSubmitted, setSubmitted] = useState(false);
  const [isPending, startTransition] = useTransition();

  // ---------------------------------------- //
  //               EVENT HANDLERS             //
  // ---------------------------------------- //

  function isFormValid() {
    const validFields = [wheelSize, carType, wheelBrand, wheelName];

    if (carType.includes("C4") || carType.includes("C3")) {
      validFields.push(subType);
    }

    return (
      validFields.every(Boolean) &&
      imageUrls.length > 0 &&
      !honeypotRef?.current?.checked
    );
  }

  const handleInputChange =
    (setter: (value: string) => void) =>
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>{
      const sanitizedInput = e.target.value.replace(/[^a-zA-Z0-9 ]/g, "");
      setter(sanitizedInput);

    }


  const clearAllFields = () => {
    setWheelSize("");
    setCarType("");
    setWheelBrand("");
    setWheelName("");
    setUsername("");
    if (imageInputRef.current) imageInputRef.current.value = "";
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImageUrls = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file),
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
            const { imageUrl, error }: { imageUrl: string; error: string } =
              await uploadImage({
                file: imageFile,
                bucket: "submitted-images",
              });
            if (error) throw new Error(`Upload error: ${error}`);
            return imageUrl;
          }),
        );

        let convertedSubType = null;
        if (subType !== "") {
          convertedSubType = subType;
        }

        const convertedWheelSize = parseInt(wheelSize.replace('"', ""));
        const rowsToInsert = urls.map((imageUrl) => ({
          photo_url: imageUrl,
          wheel_brand: wheelBrand.trim(),
          wheel_size: convertedWheelSize,
          wheel_name: wheelName.trim(),
          submitted_by: username,
          car_type: carType,
          subtype: convertedSubType,
          approved: false,
        }));

        const supabase = createSupabaseClient();

        const { error: insertError } = await supabase
          .from("images")
          .insert(rowsToInsert);

        if (insertError) {
          const convertedUrls = imageUrls.map((url) => {
            return url.slice(url.lastIndexOf("/") + 1);
          });
          await supabase.storage
            .from("submitted-images")
            .remove([...convertedUrls]);
          throw new Error(`Insert error: ${insertError.message}`);
        }

        clearAllFields();
        setSubmitted(true);
      } catch (error) {
        console.error("Error in submit:", error);
      }
    });
  };

  function scrollCheck() {
    if (!submitModalRef || !submitModalRef.current) return;
    const submitForm = submitModalRef.current;
    const containerHeight = submitForm.offsetHeight;
    const scrollHeight = submitForm!.scrollHeight;
    const scrollPosition = submitForm!.scrollTop;
    if (scrollHeight > containerHeight) {
      if (scrollPosition < 10) {
        return setShadowPosition("bottom");
      } else if (scrollHeight - scrollPosition - containerHeight < 10) {
        return setShadowPosition("top");
      } else {
        return setShadowPosition("center");
      }
    }
    return setShadowPosition("");
  }

  // ---------------------------------------- //
  //                   HOOKS                  //
  // ---------------------------------------- //

  useEffect(() => {
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

    setImageList(renderImageList());
  }, [imageUrls]);

  useEffect(() => {
    const submitForm = submitModalRef.current;
    submitForm!.addEventListener("scroll", () => {
      scrollCheck();
    });
    window.addEventListener("resize", () => {
      scrollCheck();
    });
    return () => {
      submitForm!.removeEventListener("scroll", () => {
        scrollCheck();
      });
      window.removeEventListener("resize", () => {
        scrollCheck();
      });
    };
  }, [submitModalRef]);

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        const target = e.target as HTMLElement;
        if (target && target.classList.contains(styles["modal"])) closeModal();
      }}
      className={`${styles["modal"]} ${
        activeModal === "submit" ? styles["active"] : ""
      }`}
    >
      <div className={styles["submit"]}>
        <div className={styles["submit__shadow"]}>
          {shadowPosition === "bottom" || shadowPosition === "center" ? (
            <div className={styles["shadow__bottom"]}></div>
          ) : null}
          {shadowPosition === "top" || shadowPosition === "center" ? (
            <div className={styles["shadow__top"]}></div>
          ) : null}
        </div>
        {isPending ? (
          <div className={styles["submit__loading"]}>
            <div className={styles["loading_fire"]}></div>
            <div className={styles["loading_fire"]}></div>
            <div className={styles["loading_fire"]}></div>
            <div className={styles["loading_fire"]}></div>
            <div className={styles["loading_fire"]}></div>
          </div>
        ) : null}

        <h1 className={styles["submit__heading"]}>
          submit a photo
          <div onClick={closeModal} className={styles["submit__heading_logo"]}>
            <SLogo color="white" inElement="landing" />
            <p className={styles["submit__heading_logo_text"]}>x</p>
          </div>
        </h1>
        {!imageSubmitted ? (
          <form ref={submitModalRef} className={styles["submit__form"]}>
            <label className={styles["submit__label"]}>
              what chassis?*
              <select
                required
                onChange={(e) => {
                  setSubType("");
                  setCarType(e.target.value);
                }}
                value={carType}
                className={styles["submit__input"]}
              >
                <option value="" disabled>
                  select a car...
                </option>
                {carTypes.map((car, index) => {
                  return (
                    <option
                      key={index}
                      className={styles["submit__input_option"]}
                      value={car}
                    >
                      {car}
                    </option>
                  );
                })}
              </select>
            </label>
            {carType.includes("C4") ? (
              <label className={styles["submit__label"]}>
                what model?*
                <select
                  onChange={handleInputChange(setSubType)}
                  value={subType}
                  className={styles["submit__input"]}
                >
                  <option value="" disabled>
                    select a car...
                  </option>
                  <option value="S4">S4</option>
                  <option value="S6">S6</option>
                </select>
              </label>
            ) : null}

            {carType.includes("C3") ? (
              <label className={styles["submit__label"]}>
                what model?*
                <select
                  onChange={handleInputChange(setSubType)}
                  value={subType}
                  className={styles["submit__input"]}
                >
                  <option value="" disabled>
                    select a car...
                  </option>
                  <option value="10v">10v</option>
                  <option value="20v">20v</option>
                </select>
              </label>
            ) : null}
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
                {wheelSizes.map((size, index) => {
                  return (
                    <option
                      key={index}
                      className={styles["submit__input_option"]}
                      value={size}
                    >
                      {size}
                    </option>
                  );
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
              name/username
              <input
                onChange={handleInputChange(setUsername)}
                value={username}
                placeholder="ani / @95urs6"
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
            <input
              ref={honeypotRef}
              type="checkbox"
              name="contact_me_by_fax"
              tabIndex={-1}
              style={{
                visibility: "hidden",
                opacity: "0",
                position: "absolute",
                zIndex: "-20",
                pointerEvents: "none",
              }}
              autoComplete="off"
            />
            {imageList}
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
            {imageList}
            <div className={styles["submit__button_container"]}>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setImageUrls([]);
                }}
                className={styles["submit__button-i"]}
              >
                submit again
              </button>
              <button
                onClick={() => {
                  closeModal();
                  clearAllFields();
                  setImageUrls([]);
                  setSubmitted(false);
                }}
                className={styles["submit__button"]}
              >
                gallery
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
