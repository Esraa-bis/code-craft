import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";

import styles from "../assets/css/signForms.module.css";
import { signIn } from "../services/auth";
import { SessionTokenStorage } from "../services/local-storage";
import { sweetAlert } from "../services/sweetalert";

function SignIn({ signedIn, setSignedIn }) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const [token, setToken] = useState("");

  useEffect(() => {
    if (!token) return;
    SessionTokenStorage.saveToken(token);
  }, [token]);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    signIn(formData)
      .then((response) => {
        if (response.success) {
          setSignedIn(true);
          setToken(response.data.token);
        } else {
          sweetAlert({
            title: response.message,
            icon: "error",
          });
        }
      })
      .catch((error) => {
        sweetAlert({ title: error.message, icon: "error" });
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function updateFormData(event, fieldname) {
    setFormData({ ...formData, [fieldname]: event.target.value });
  }
  return (
    <section className={`${styles.signFormSection}`}>
      {signedIn && <Navigate to="/" replace={true} />}

      <div className={`${styles.container}`}>
        <h2>Sign in</h2>
        {/* sign in with google btn */}
        <button type="button" className={`${styles.loginWithGoogleBtn}`}>
          Sign In with Google
        </button>
        {/*  */}
        <p></p>
        <form
          id="signInForm"
          className={`${styles.signform}`}
          onSubmit={handleSubmit}
        >
          <div className={`${styles.formGroup}`}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              className={`${styles.input}`}
              value={formData.email}
              onChange={(event) => updateFormData(event, "email")}
              required
            />
          </div>
          <div className={`${styles.formGroup}`}>
            <label htmlFor="password">Password:</label>
            <input
              type={passwordVisible ? "text" : "password"}
              id="password"
              name="password"
              className={`${styles.input}`}
              value={formData.password}
              onChange={(event) => updateFormData(event, "password")}
              required
            />
            <button
              type="button"
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              {passwordVisible ? (
                <FontAwesomeIcon icon={faEye} />
              ) : (
                <FontAwesomeIcon icon={faEyeSlash} />
              )}
            </button>
          </div>
          <button type="submit" disabled={loading}>
            Sign In
          </button>
          <div className={`${styles.otherLinks}`}>
            <p>
              <Link to="/ForgotPassword" className={`${styles.link}`}>
                Forgot Password?
              </Link>
            </p>
            <p>
              If you don't have an account please
              <Link to="/SignUp" className={`${styles.link}`}>
                Sign-Up.
              </Link>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
export default SignIn;
