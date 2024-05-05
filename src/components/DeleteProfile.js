// styles
import styles from "../assets/css/Profile.module.css";
// components
import ProfileSectionTitleAndDescription from "./ProfileContentTitle";

function DeleteProfile() {
  return (
    <>
      <ProfileSectionTitleAndDescription
        title="  Delete Account"
        description="Close your account permanently."
      />
      <div className={styles.DeleteProfile}>
        <div className={styles.WarningText}>
          <span className={styles.Warning}>Warning:</span> If you close your
          account, you will be unsubscribed from your 1 course, and will lose
          access forever.
        </div>
        <button type="submit" className={styles.submitButton}>
          Delete Account
        </button>
      </div>
    </>
  );
}
export default DeleteProfile; 
