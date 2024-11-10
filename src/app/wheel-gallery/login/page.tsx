import { login } from "./actions";
import { redirect } from "next/navigation";
import { createClient } from "@/app/supabase/auth/server";
import Link from "next/link";

import styles from "./Login.module.css";

import ImageStack from "@/app/_components/Wheel Gallery/ImageStack/ImageStack";

export default async function Login() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (data?.user) {
    redirect("/wheel-gallery/review");
  }

  if(error){
    console.error(error)
  }

  return (
    <div className={styles["login"]}>
      <form className={styles["login__form"]}>
        <div className={styles["login__photo-stack"]}>
          <ImageStack></ImageStack>
        </div>
        <h1 className={styles["login__form_heading"]}>sign in</h1>
        <input
          placeholder="email"
          className={styles["login__form_input"]}
          id="email"
          name="email"
          type="email"
          required
        />
        <input
          placeholder="password"
          className={styles["login__form_input"]}
          id="password"
          name="password"
          type="password"
          required
        />
        <div className={styles["login__form_actions"]}>
          <Link href="/wheel-gallery">
          <button className={styles["login__form_button"]}>gallery</button>
          </Link>
         
          <button className={styles["login__form_button"]} formAction={login}>
            sign in
          </button>
        </div>
      </form>
    </div>
  );
}
