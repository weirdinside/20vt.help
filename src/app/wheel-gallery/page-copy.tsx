"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import styles from "./WheelGallery.module.css";
import { useRouter, useSearchParams } from "next/navigation";
import Gallery from "../_components/Wheel Gallery/Gallery/Gallery";

import { paginatedFetch, getUniqueElements } from "./actions";

import SubmitModal from "../_components/Wheel Gallery/SubmitModal/SubmitModal";

import CheckboxSection from "../_components/Wheel Gallery/CheckboxSection/CheckboxSection";
import PreviewModal from "../_components/Wheel Gallery/PreviewModal/PreviewModal";

export default function WheelGallery() {
  // ---------------------------------------- //
  //            VARIABLE DECLARATION          //
  // ---------------------------------------- //
  const searchParams = useSearchParams();
  const router = useRouter();
  const galleryRef = useRef<HTMLDivElement>(null);

  // for handling the PreviewModal and AboutModal
  const [activeModal, setActiveModal] = useState("");
  const [clickedPhotoData, setClickedPhotoData] = useState<ImageInfo | {}>({});

  const [wheelBrands, setWheelBrands] = useState<string[]>([]);
  const [wheelSizes, setWheelSizes] = useState<number[]>([]);
  const [carTypes, setCarTypes] = useState<string[]>([]);

  // for handling the gallery state
  const [currentPage, setPage] = useState(0);
  const [images, setImages] = useState<object[]>([]);
  const [waitingForImages, setLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const [scrollTop, setScrollTop] = useState(0);

  const fullOptions = {
    car_type: carTypes,
    wheel_size: wheelSizes,
    wheel_brand: wheelBrands,
  };

  const [checkedOptions, setCheckedOptions] = useState<FilterOptions>({
    car_type: [],
    wheel_size: [],
    wheel_brand: [],
  });

  // ---------------------------------------- //
  //               EVENT HANDLERS             //
  // ---------------------------------------- //

  function handleImageClick(imageData: {
    approved: boolean;
    wheel_size: number;
    id: number;
    photo_url: string;
    wheel_brand: string;
    wheel_name: string;
    submitted_by: string;
    car_type: string;
  }) {
    setClickedPhotoData(imageData);
    setActiveModal("preview");
  }

  const closeModal = useCallback(() => {
    setActiveModal("");
  }, []);

  const copyUrl = useCallback(() => {
    const url = window.location.href;
    navigator.clipboard
      .writeText(url)
      .then(() => alert("URL copied to clipboard!"))
      .catch((err) => console.error("Failed to copy:", err));
  }, []);

  function clearOptions() {
    setPage(0);
    setCheckedOptions({ car_type: [], wheel_size: [], wheel_brand: [] });
  }

  async function toggleOption(category: keyof FilterOptions, value: string) {
    setCheckedOptions((previousOptions) => {
      const categoryOptions = previousOptions[category];
      const updatedCategoryOptions = categoryOptions.includes(value)
        ? categoryOptions.filter((option) => option !== value)
        : [...categoryOptions, value];
      return {
        ...previousOptions,
        [category]: updatedCategoryOptions,
      };
    });
  }

  const loadMoreData = useCallback(async () => {
    if (isFetching) return;
    setIsFetching(true);
    paginatedFetch({
      filters: checkedOptions,
      numItems: 25,
      page: currentPage + 1,
    })
      .then((data) => {
        if(data){
          if (data.length > 0) {
            setPage((prevPage) => prevPage + 1);
          }
          if (data.length <= 25) {
            setHasMore(false);
          } else if (data.length > 25) {
            setHasMore(true);
          }
          console.log("images set,", data, isFetching, currentPage);
          return setImages((prevImages) => [
            ...prevImages,
            ...data?.slice(0, 25),
          ]);
        }
      })
      .catch((error) => {
        console.error(`Error loading more data: ${error}`);
      })
      .finally(() => {
        setIsFetching(false);
      });
  }, [checkedOptions, currentPage, isFetching]);

  const onScroll = useCallback(async () => {
    const gallery = galleryRef.current;
    setScrollTop(gallery!.scrollTop);

    if (isFetching) return;
    if (
      gallery!.scrollTop + gallery!.offsetHeight >= gallery!.scrollHeight &&
      !isFetching
    ) {
      if (!hasMore) {
        return console.log("no more images to load");
      }
      await loadMoreData();
      return;
    }
  }, [currentPage, hasMore, isFetching, loadMoreData]);

  // ---------------------------------------- //
  //                   HOOKS                  //
  // ---------------------------------------- //

  // triggers onScroll to occur when the user reaches the end of the gallery field

  useEffect(
    function setScrollListener() {
      const gallery = galleryRef.current;
      gallery!.addEventListener("scroll", onScroll);
      return () => {
        gallery!.removeEventListener("scroll", onScroll);
      };
    },
    [onScroll],
  );

  // reads URL and sets state of checkedOptions array
  // the reason for disabling exhaustive-deps below is due to double loading. this will be fixed later

  useEffect(
    function readQueryOnLoad() {
      const parsedOptions: FilterOptions = {
        car_type: [],
        wheel_size: [],
        wheel_brand: [],
      };
      searchParams.forEach((value, key) => {
        const valuesArray = value.split(",").filter(Boolean);
        if (key in parsedOptions) {
          if (key === "wheel_size") {
            const tempArray: number[] = [];
            valuesArray.map((size) => {
              tempArray.push(parseInt(size));
            });
            parsedOptions['wheel_size'] = tempArray;
          } else {
            parsedOptions[key as keyof FilterOptions] = valuesArray;
          }
        }
      });
      setLoading(false);
      setCheckedOptions(parsedOptions);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [setLoading],
  );

  {
    /* whenever checkedOptions changes, the URL changes. this is for events
    after initial read of the site, so the last useEffect still has to exist */
  }

  useEffect(() => {
    async function setQueryAndUpdateImages() {
      setPage(0);
      setLoading(true);
      const queryParameters = Object.entries(checkedOptions)
        .map(([category, values]: [string, string[]]) => {
          const queryString = values.join(",");
          return values.length > 0 ? `${category}=${queryString}` : "";
        })
        .filter(Boolean)
        .join("&");
      router.push(`?${queryParameters}`);
      setImages([]);
      paginatedFetch({
        filters: checkedOptions,
        numItems: 25,
        page: 0,
      }).then((data) => {
        if (data) {
          if (data.length <= 25) {
            setHasMore(false);
          } else if (data.length > 25) {
            setHasMore(true);
          }
          setLoading(false);
          setImages(data?.slice(0, 25));
        }
        console.log("no data was returned");
      });
    }
    setQueryAndUpdateImages();
  }, [router, checkedOptions]);

  // sets the items in the filter options based on what is available,
  // ensuring that no 1D query will result in null

  useEffect(
    function setOptions() {
      getUniqueElements("wheel_size").then((res) => {
        setWheelSizes(res);
      });
      getUniqueElements("wheel_brand").then((res) => {
        setWheelBrands(res);
      });
      getUniqueElements("car_type").then((res) => {
        setCarTypes(res);
      });
    },
    [checkedOptions],
  );

  // ---------------------------------------- //
  //             COMPONENT RETURN             //
  // ---------------------------------------- //

  return (
    <div className={styles["page"]}>
      <header className={styles["header"]}>
        <h1 className={styles["header__title"]}>wheel gallery.</h1>
        <div
          onClick={() => {
            setActiveModal("submit");
          }}
          className={styles["header__submit-modal-trigger"]}
          id="submit-modal-trigger"
        >
          submit a wheel
        </div>
        <Link className={styles["header__logo"]} href="/">
          <div className={styles["logo__big-rhombus"]} id="big-rhombus"></div>
          <div
            className={styles["logo__small-rhombus-1"]}
            id="small-rhombus-1"
          ></div>
          <div
            className={styles["logo__small-rhombus-2"]}
            id="small-rhombus-2"
          ></div>
          <p className={styles["header__back"]}>back to 20vt.help</p>
        </Link>
      </header>
      <main className={styles["main"]}>
        <section className={styles["wheelfinder"]}>
          <form className={styles["wheelfinder__selector"]}>
            {Object.keys(checkedOptions).map(
              (category: keyof FilterOptions, index: number) => {
                return (
                  <CheckboxSection
                    key={index}
                    arrayName={category}
                    checkedOptions={checkedOptions}
                    toggleOption={toggleOption}
                    optionsArray={fullOptions[category as keyof FilterOptions]}
                  ></CheckboxSection>
                );
              },
            )}
          </form>
          <div className={styles["wheelfinder__button_section"]}>
            <button
              type="reset"
              className={styles["wheelfinder__button"]}
              id="wheelfinder-clear"
              onClick={clearOptions}
            >
              reset selection
            </button>
            <button onClick={copyUrl} className={styles["wheelfinder__button"]}>
              share results
            </button>
          </div>
        </section>
        <Gallery
          scrollTop={scrollTop}
          loading={waitingForImages}
          images={images}
          galleryRef={galleryRef}
          handleImageClick={handleImageClick}
        ></Gallery>
      </main>
      <footer className={styles["footer"]}>
        <p className={styles["footer__credits"]} id="site-credits-button">
          site credits_
        </p>
        <Link
          className={styles["footer__credits"]}
          href="/"
          id="back-home-button"
        >
          back to 20vt.help_
        </Link>
      </footer>
      <SubmitModal
        activeModal={activeModal}
        closeModal={closeModal}
      ></SubmitModal>
      <PreviewModal
        activeModal={activeModal}
        closeModal={closeModal}
        data={clickedPhotoData}
      ></PreviewModal>
    </div>
  );
}
