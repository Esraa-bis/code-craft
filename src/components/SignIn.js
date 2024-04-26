import { Link } from "react-router-dom";
import styles from "../css/signForms.module.css"

 function SignIn() {
   return (
     <section className={`${styles.signFormSection}`}>
      <div className={`${styles.container}`}>
                <h2>Sign in</h2>
        {/* sign in with google btn */}
        <button type="button"  className={`${styles.loginWithGoogleBtn}`}>
          Sign In with Google
        </button>
        {/*  */}
        <p></p>
        <form id="signInForm" method="post" api="auth/logIn" className={`${styles.signform}`}>
          <div className={`${styles.formGroup}`}>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" className={`${styles.input}`} required />
          </div>
          <div className={`${styles.formGroup}`}>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              className={`${styles.input}`}
              required
            />
          </div>
          <button type="submit">Sign In</button>
          <div className={`${styles.otherLinks}`}>
            <p>
              <Link to="/ForgotPassword" className={`${styles.link}`}>Forgot Password?</Link>
            </p>
            <p>
              If you don't have an account please
              <Link to="/SignUp" className={`${styles.link}`}> Sign-Up.</Link>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
export default SignIn;
