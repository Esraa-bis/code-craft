// styles
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../assets/css/Profile.module.css";
// components
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";
import { sweetAlert } from "../services/sweetalert";
import { changePassword } from "../services/user";
import ProfileSectionTitleAndDescription from "./ProfileContentTitle";

function ChangePasswordForm() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    changePassword(formData)
      .then((response) => {
        if (response.success) {
          setFormData({
            newPassword: "",
            oldPassword: "",
            confirmPassword: "",
          });
          sweetAlert({
            title: response.message,
            icon: "success",
          });
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
      <ProfileSectionTitleAndDescription
        title="Change Password"
        description="Edit your account settings and change your password here."
      />
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        {/* Basics Info */}
        <fieldset>
          <div className={styles.formGroup}>
            <div className={styles.passwordContainer}>
              <input
                id="CurrentPassword"
                name="CurrentPassword"
                className={styles.input}
                placeholder="Enter current password"
                type={passwordVisible ? "text" : "password"}
                value={formData.oldPassword}
                onChange={(event) => updateFormData(event, "oldPassword")}
                required
              />

              <button
                type="button"
                className={styles.showPassIcon}
                onClick={() => setPasswordVisible(!passwordVisible)}
              >
                {passwordVisible ? (
                  <FontAwesomeIcon icon={faEye} />
                ) : (
                  <FontAwesomeIcon icon={faEyeSlash} />
                )}
              </button>
            </div>
          </div>
          <div className={styles.formGroup}>
            <div className={styles.passwordContainer}>
              <input
                id="NewPassword"
                name="NewPassword"
                className={styles.input}
                placeholder="Enter new password"
                type={passwordVisible ? "text" : "password"}
                value={formData.newPassword}
                onChange={(event) => updateFormData(event, "newPassword")}
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
          </div>
          <div className={styles.formGroup}>
            <div className={styles.passwordContainer}>
              <input
                id="password"
                name="ConfirmNewPassword"
                className={styles.input}
                placeholder="Re-type new password"
                type={passwordVisible ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={(event) => updateFormData(event, "confirmPassword")}
                required
              />
              <button
                type="button"
                className={styles.showPassIcon}
                onClick={() => setPasswordVisible(!passwordVisible)}
              >
                {passwordVisible ? (
                  <FontAwesomeIcon icon={faEye} />
                ) : (
                  <FontAwesomeIcon icon={faEyeSlash} />
                )}
              </button>
            </div>
          </div>
        </fieldset>
        <button
          type="submit"
          disabled={loading}
          className={styles.submitButton}
        >
          Change Password
        </button>
      </form>
    </>
  );
}
export default ChangePasswordForm;
