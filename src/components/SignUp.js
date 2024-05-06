import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import styles from "../assets/css/signForms.module.css"; // Assuming correct path to CSS module
import { signUp } from "../services/auth";
import { sweetAlert } from "../services/sweetalert";

function SignUp({ signedIn }) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const [signedUp, setSignedUp] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    signUp(formData)
      .then((response) => {
        if (response.success) {
          setSignedUp(true);
        }
        sweetAlert({
          title: response.message,
          icon: response.success ? "success" : "error",
        });
      })
      .catch((error) => {
        sweetAlert({ title: error.message, icon: "error" });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  function updateFormData(event, fieldname) {
    setFormData({ ...formData, [fieldname]: event.target.value });
  }

  return (
    <section className={styles.signFormSection}>
      {signedIn && <Navigate to="/" replace={true} />}
      {signedUp && <Navigate to="/SignIn" replace={true} />}
      <div className={styles.container}>
        <h2>Sign Up</h2>
        {/* Sign in with Google button */}
        <button type="button" className={styles.loginWithGoogleBtn}>
          Sign Up with Google
        </button>
        {/* Sign up form */}
        <form
          id="signUpForm"
          className={styles.signform}
          onSubmit={handleSubmit}
        >
          <div className={styles.formGroup}>
            <label htmlFor="firstName">First Name:</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstname}
              onChange={(event) => updateFormData(event, "firstname")}
              className={styles.input}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              id="lastName"
              name="lastname"
              className={styles.input}
              value={formData.lastname}
              onChange={(event) => updateFormData(event, "lastname")}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              className={styles.input}
              value={formData.email}
              onChange={(event) => updateFormData(event, "email")}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password">Password:</label>
            <input
              type={passwordVisible ? "text" : "password"}
              id="password"
              name="password"
              className={styles.input}
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
          <div className={styles.formGroup}>
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type={passwordVisible ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              className={styles.input}
              value={formData.confirmpassword}
              onChange={(event) => updateFormData(event, "confirmpassword")}
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
          <div className={styles.formGroup}>
            <label htmlFor="phonenumber">Phone Number:</label>
            <input
              type="tel"
              id="phonenumber"
              name="phonenumber"
              className={styles.input}
              value={formData.phonenumber}
              onChange={(event) => updateFormData(event, "phonenumber")}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="age">Age:</label>
            <input
              type="number"
              id="age"
              name="age"
              className={styles.input}
              value={formData.age}
              onChange={(event) => updateFormData(event, "age")}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="male">
              <input
                type="radio"
                id="male"
                name="gender"
                value="male"
                onChange={(event) => updateFormData(event, "gender")}
                checked={formData.gender === "male"}
              />
              Male
            </label>
            <label htmlFor="female">
              <input
                type="radio"
                id="female"
                name="gender"
                value="female"
                onChange={(event) => updateFormData(event, "gender")}
                checked={formData.gender === "female"}
              />
              Female
            </label>
          </div>
          <button type="submit" disabled={loading}>
            Sign Up
          </button>
          <div className={`${styles.otherLinks}`}>
            <p>
              Already have an account? Please
              <Link to="/SignIn" className={styles.link}>
                {" "}
                Sign in.
              </Link>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}

export default SignUp;
