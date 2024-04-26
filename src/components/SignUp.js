import { Link } from "react-router-dom";
import styles from "../css/signForms.module.css"; // Assuming correct path to CSS module

function SignIn() {
  return (
    <section className={styles.signFormSection}>
      <div className={styles.container}>
        <h2>Sign Up</h2>
        {/* Sign in with Google button */}
        <button type="button" className={styles.loginWithGoogleBtn}>
          Sign Up with Google
        </button>
        {/* Sign up form */}
        <form id="signUpForm" method="post" action="auth/SignUp" className={styles.signform}>
          <div className={styles.formGroup}>
            <label htmlFor="firstName">First Name:</label>
            <input type="text" id="firstName" name="firstName" className={styles.input} required />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="lastName">Last Name:</label>
            <input type="text" id="lastName" name="lastName" className={styles.input} required />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" className={styles.input} required />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" className={styles.input} required />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input type="password" id="confirmPassword" name="confirmPassword" className={styles.input} required />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="phone">Phone Number:</label>
            <input type="tel" id="phone" name="phone" className={styles.input} required />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="age">Age:</label>
            <input type="number" id="age" name="age" className={styles.input} required />
          </div>
          <div className={styles.formGroup}>
           <label htmlFor="male"> <input type="radio" id="male" name="gender" value="male" />
            Male</label>
           <label htmlFor="female"> <input type="radio" id="female" name="gender" value="female" />
            Female</label>
          </div>
          <button type="submit">Sign Up</button>
          <div className={`${styles.otherLinks}`}>
            <p>
              Already have an account? Please
              <Link to="/SignIn" className={styles.link}> Sign in.</Link>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}

export default SignIn;
