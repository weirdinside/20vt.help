import { redirect } from "next/navigation";
import styles from "./Admin.module.css";
import { logout } from "../login/actions";
import { fetchAllUnapprovedImages } from "@/app/supabase/storage/client";
import UnapprovedGalleryItem from "@/app/_components/Wheel Gallery/UnapprovedGalleryItem/UnapprovedGalleryItem";
import { createClient } from "@/app/supabase/auth/server";

export default async function Admin() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/wheel-gallery/login");
  }

  let now = new Date().getHours();

  function greetingTime() {
    if (now >= 0 && now < 12) {
      return "good morning";
    }
    if (now >= 12 && now <= 15) {
      return "good afternoon";
    }
    if (now > 15 && now <= 23) {
      return "good evening";
    }
  }

  const unapprovedImages = await fetchAllUnapprovedImages();

  return (
    <div className={styles["admin"]}>
      <div className={styles["admin__content"]}>
        <div className={styles["admin__header"]}>
          <h1 className={styles["admin__header_heading"]}>
            {greetingTime()},{" "}
            <span className={styles["heading_username"]}>
              {data.user.email}!
              <div className={styles["heading_username_background"]}></div>
            </span>
          </h1>
          <button onClick={logout} className={styles["admin__header_logout"]}>
            log out
          </button>
        </div>
        <section className={styles["admin__main"]}>
          <p className={styles["admin__main_text"]}></p>
          {unapprovedImages.length > 0 ? (
            <UnapprovedGalleryItem
              data={unapprovedImages[0]}
            ></UnapprovedGalleryItem>
          ) : (
            <p>no images for review</p>
          )}
        </section>
      </div>
    </div>
  );
}
