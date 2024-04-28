import styles from "../assets/css/signForms.module.css";

function EmailCode() {
  return (
    <section className={`${styles.signFormSection}`}>
      <div className={`${styles.container}`}>
        <h2>Confirmation Code</h2>

        <form
          id="forgotPasswordForm"
          method="post"
          api="auth/logIn"
          className={`${styles.signform}`}
        >
          <div className={`${styles.formGroup}`}>
            <label htmlFor="Confirmation Code">Code</label>
            <input
              type="number"
              id="Confirmation Code"
              name="Confirmation Code"
              className={`${styles.input}`}
              required
            />
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>
    </section>
  );
}
export default EmailCode;
