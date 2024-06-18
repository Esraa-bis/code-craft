import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import styles from "../assets/css/signForms.module.css";
import { resetPassword } from "../services/auth";
import { sweetAlert } from "../services/sweetalert";

function ResetPassword() {
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  const query = useQuery();
  const email = query.get("email");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ forgetCode: "" });
  const [resetSuccess, setResetSuccess] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [code, setCode] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    resetPassword({
      email,
      password: formData.password,
      confirmpassword: formData.confirmpassword,
    })
      .then((response) => {
        if (response.success) {
          setResetSuccess(true);
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
  function updateFormData(event, fieldName) {
    setFormData({ ...formData, [fieldName]: event.target.value });
  }

  return (
    <>
      <section className={styles.signFormSection}>
        {resetSuccess && <Navigate to="/SignIn" replace={true} />}
        <div className={styles.container}>
          <h2>Reset your password</h2>
          <form
            id="ResetPasswordForm"
            className={styles.signform}
            onSubmit={handleSubmit}
          >
            <div className={styles.formGroup}>
              <label htmlFor="password">
                New Password:
                <div className={styles.passwordContainer}>
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
                    className={styles.showPassIcon}
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
              </label>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="confirmPassword">
                Confirm New Password:
                <div className={styles.passwordContainer}>
                  <input
                    type={passwordVisible ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    className={styles.input}
                    value={formData.confirmpassword}
                    onChange={(event) =>
                      updateFormData(event, "confirmpassword")
                    }
                    required
                  />
                  <button
                    className={styles.showPassIcon}
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
              </label>
            </div>

            <button type="submit" disabled={loading}>
              Save
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
export default ResetPassword;
