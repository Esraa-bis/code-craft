import styles from "../assets/css/signForms.module.css";
function ResetPassword() {
  return (
    <>
      <section className={styles.signFormSection}>
        <div className={styles.container}>
          <h2>Reset your password</h2>
          <form
            id="ResetPasswordForm"
            method="post"
            action="auth/SignUp"
            className={styles.signform}
          >
            <div className={styles.formGroup}>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                className={styles.input}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className={styles.input}
                required
              />
            </div>

            <button type="submit">Save</button>
          </form>
        </div>
      </section>
    </>
  );
}
export default ResetPassword;
