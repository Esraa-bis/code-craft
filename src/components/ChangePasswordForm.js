// styles
import styles from "../assets/css/Profile.module.css";
// components
import ProfileSectionTitleAndDescription from "./ProfileContentTitle";

function ChangePasswordForm() {
  return (
    <>
      <ProfileSectionTitleAndDescription
        title="Change Password"
        description="Edit your account settings and change your password here."
      />
      <form className={styles.formContainer}>
        {/* Basics Info */}
        <fieldset>
          <legend>Passwords:</legend>
          <div className={styles.formGroup}>
            <input
              type="password"
              id="CurrentPassword"
              name="CurrentPassword"
              className={styles.input}
              placeholder="Enter current password"
              required
            />
          </div>
          <div className={styles.formGroup}>
            <input
              type="password"
              id="NewPassword"
              name="NewPassword"
              className={styles.input}
              placeholder="Enter new password"
              required
            />
          </div>
          <div className={styles.formGroup}>
            <input
              type="password"
              id="password"
              name="ConfirmNewPassword"
              className={styles.input}
              placeholder="Re-type new password"
              required
            />
          </div>
        </fieldset>
        <button type="submit" className={styles.submitButton}>
          Change Password
        </button>
      </form>
    </>
  );
}
export default ChangePasswordForm;
