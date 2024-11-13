"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import styles from "./WheelGallery.module.css";
import { useRouter, useSearchParams } from "next/navigation";

// actions
import { paginatedFetch, getUniqueElements } from "./actions";

// components
import Gallery from "../_components/Wheel Gallery/Gallery/Gallery";
import CheckboxSection from "../_components/Wheel Gallery/CheckboxSection/CheckboxSection";
// components -> modals
import SubmitModal from "../_components/Wheel Gallery/SubmitModal/SubmitModal";
import PreviewModal from "../_components/Wheel Gallery/PreviewModal/PreviewModal";

export default function WheelGallery() {
  // ---------------------------------------- //
  //            VARIABLE DECLARATION          //
  // ---------------------------------------- //

  const searchParams = useSearchParams();
  const router = useRouter();
  const galleryRef = useRef<HTMLDivElement>(null);

  // for handling the checkbox states

  // ___ holds the possible items for each column, so no single query yields zero results
  const [possibleFilters, setPossibleFilters] = useState<FilterOptions>({
    car_type: [],
    subtype: [],
    wheel_size: [],
    wheel_brand: [],
  });

  // ____ holds all checekd options
  const [checkedFilters, setCheckedFilters] = useState<FilterOptions>({
    car_type: [],
    subtype: [],
    wheel_size: [],
    wheel_brand: [],
  });

  const [subtypeFilters, setSTF] = useState<string[]>([]);

  // for handling the gallery state

  const [currentPage, setPage] = useState(0);
  const [images, setImages] = useState<object[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [fetchingMore, setIsFetchingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [scrollTop, setScrollTop] = useState(0);

  const [clickedPhotoData, setClickedPhotoData] = useState<ImageInfo | {}>({});

  // for handling modal state

  const [activeModal, setActiveModal] = useState<string>("");

  // ---------------------------------------- //
  //               EVENT HANDLERS             //
  // ---------------------------------------- //

  function handleImageClick(imageData: ImageInfo) {
    setClickedPhotoData(imageData);
    setActiveModal("preview");
  }

  // toggles a checkbox from the possibleFilters and sets it in the checkedFilters object

  function updateSubtypeOptions(car_typeFilters: string[]) {
    const chassisC4 = ["C4 sedan", "C4 avant"];
    const chassisC3 = ["C3 sedan", "C3 avant"];
    const subtypesC4 = ["S4", "S6"];
    const subtypesC3 = ["10v", "20v"];

    if (car_typeFilters.some((item) => chassisC3.includes(item))) {
      if (car_typeFilters.some((item) => chassisC4.includes(item))) {
        return possibleFilters.subtype;
      } else {
        return possibleFilters.subtype?.filter((item) =>
          subtypesC3.includes(item),
        );
      }
    } else if (car_typeFilters.some((item) => chassisC4.includes(item))) {
      return possibleFilters.subtype?.filter((item) =>
        subtypesC4.includes(item),
      );
    } else {
      return [];
    }
  }

  const loadMoreData = useCallback(async () => {
    if (isFetching) return;
    setIsFetchingMore(true);
    paginatedFetch({
      filters: checkedFilters,
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
        console.log('data loaded')
        setIsFetchingMore(false);
      });
  }, [checkedFilters, currentPage, isFetching]);

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

  async function toggleOption(category: keyof FilterOptions, value: string) {
    setCheckedFilters((prevFilters) => {
      const categoryOptions = prevFilters[category];
      const updatedCategoryOptions = categoryOptions!.includes(value)
        ? categoryOptions!.filter((option) => option !== value)
        : [...categoryOptions!, value];

      if (category === "car_type") {
        const subtypeOptions = updateSubtypeOptions(updatedCategoryOptions);
        return {
          ...prevFilters,
          [category]: updatedCategoryOptions,
          subtype: prevFilters.subtype.filter((item) =>
            subtypeOptions.includes(item),
          ),
        };
      }

      return {
        ...prevFilters,
        [category]: updatedCategoryOptions,
      };
    });
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
    setCheckedFilters({
      car_type: [],
      wheel_size: [],
      wheel_brand: [],
      subtype: [],
    });
  }

  const setSubtypeExclusion = useCallback(() => {
    setSTF(updateSubtypeOptions(checkedFilters.car_type));
  }, [checkedFilters.car_type, updateSubtypeOptions]);

  // ---------------------------------------- //
  //                   HOOKS                  //
  // ---------------------------------------- //

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

  useEffect(() => {
    if (checkedFilters && possibleFilters) {
      setSubtypeExclusion();
    }
  }, [checkedFilters, possibleFilters]);

  useEffect(
    function readQueryOnLoad() {
      const parsedOptions: FilterOptions = {
        car_type: [],
        wheel_size: [],
        wheel_brand: [],
        subtype: [],
      };

      searchParams.forEach((value, key) => {
        const valuesArray = value.split(",").filter(Boolean);
        if (key in parsedOptions) {
          if (key === "wheel_size") {
            const tempArray: number[] = [];
            valuesArray.map((size) => {
              tempArray.push(parseInt(size));
            });
            parsedOptions["wheel_size"] = tempArray;
          } else {
            parsedOptions[key as keyof FilterOptions] = valuesArray;
          }
        }
      });
      setIsFetching(false);

      setCheckedFilters(parsedOptions);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [setIsFetching],
  );

  useEffect(() => {
    async function setQueryAndUpdateImages() {
      setPage(0);
      setIsFetching(true);

      const queryParameters = Object.entries(checkedFilters)
        .map(([category, values]: [string, string[]]) => {
          const queryString = values.join(",");
          return values.length > 0 ? `${category}=${queryString}` : "";
        })
        .filter(Boolean)
        .join("&");

      router.push(`?${queryParameters}`);

      setImages([]);
      paginatedFetch({
        filters: checkedFilters,
        numItems: 25,
        page: 0,
      }).then((data) => {
        if (data) {
          if (data.length <= 25) {
            setHasMore(false);
          } else if (data.length > 25) {
            setHasMore(true);
          }
          setIsFetching(false);
          setImages(data?.slice(0, 25));
        } else {
          console.log("no data returned");
        }
      });
    }

    setQueryAndUpdateImages();
  }, [router, checkedFilters]);

  useEffect(() => {
    async function setOptions() {
      getUniqueElements("car_type").then((res) => {
        let tempArray: string[] = [];
        res.map((value) => {
          tempArray.push(value);
        });
        setPossibleFilters((prevFilters) => {
          return { ...prevFilters, car_type: [...tempArray] };
        });
      });
      getUniqueElements("wheel_size").then((res) => {
        let tempArray: number[] = [];
        res.map((value) => {
          tempArray.push(parseInt(value));
        });
        setPossibleFilters((prevFilters) => {
          return { ...prevFilters, wheel_size: [...tempArray] };
        });
      });
      getUniqueElements("wheel_brand").then((res) => {
        let tempArray: string[] = [];
        res.map((value) => {
          tempArray.push(value);
        });
        setPossibleFilters((prevFilters) => {
          return { ...prevFilters, wheel_brand: [...tempArray] };
        });
      });
      getUniqueElements("subtype").then((res) => {
        let tempArray: string[] = [];
        res.map((value) => {
          tempArray.push(value);
        });
        setPossibleFilters((prevFilters) => {
          return { ...prevFilters, subtype: [...tempArray] };
        });
      });
    }
    setOptions();
  }, [setPossibleFilters, checkedFilters]);

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
            <CheckboxSection
              key={1}
              arrayName={"car_type"}
              checkedFilters={checkedFilters}
              toggleOption={toggleOption}
              filtersArray={possibleFilters["car_type" as keyof FilterOptions]}
            ></CheckboxSection>

            {/* there needs to be another checkboxsection that appears here and will display 20v and 10v
          restrictively as well as s4/s6 restrictively based on the options selected */}
            <CheckboxSection
              key={4}
              arrayName={"subtype"}
              checkedFilters={checkedFilters}
              toggleOption={toggleOption}
              filtersArray={subtypeFilters}
            ></CheckboxSection>

            <CheckboxSection
              key={2}
              arrayName={"wheel_size"}
              checkedFilters={checkedFilters}
              toggleOption={toggleOption}
              filtersArray={
                possibleFilters["wheel_size" as keyof FilterOptions]
              }
            ></CheckboxSection>

            <CheckboxSection
              key={3}
              arrayName={"wheel_brand"}
              checkedFilters={checkedFilters}
              toggleOption={toggleOption}
              filtersArray={
                possibleFilters["wheel_brand" as keyof FilterOptions]
              }
            ></CheckboxSection>
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
          handleImageClick={handleImageClick}
          loading={isFetching}
          images={images}
          galleryRef={galleryRef}
        ></Gallery>
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
      </main>
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
