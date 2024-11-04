import { login } from "./actions";
import styles from "./Login.module.css";

export default function Login() {
  return (
    <div className={styles["login"]}>
      <form className={styles['login__form']}>
        <h1 className={styles['login__form_heading']}>sign in</h1>
        <input placeholder="email" className={styles['login__form_input']} id="email" name="email" type="email" required />
        <input placeholder="password" className={styles['login__form_input']}  id="password" name="password" type="password" required />
        <button className={styles['login__form_button']} formAction={login}>sign in</button>
      </form>
    </div>
  );
}
