import Link from "next/link";
import styles from "./not-found.module.css";
import NavItem from "./_components/Homepage/NavItem/NavItem";

export default function NotFound() {
  return (
    <div className={styles["page"]}>
      <div className={styles["notfound__container"]}>
        <h1 className={styles["notfound__title"]}>whoops!</h1>
        <p className={styles["notfound__description"]}>
          turns out whatever was here is gone (or was never here to begin with).
        </p>
        <p className={styles["notfound__description"]}>
          were you looking for...
        </p>
        <nav className={styles.nav}>
          <Link href="/" style={{ textDecoration: "none" }}>
            <NavItem title="the homepage" description={""} />
          </Link>
          <Link href="/wheel-gallery" style={{ textDecoration: "none" }}>
            <NavItem
              title="the wheel gallery"
              description={
                "view and submit a plethora of wheel options on vintage Audis"
              }
            />
          </Link>
        </nav>
      </div>
      <Link href="/"></Link>
    </div>
  );
}
