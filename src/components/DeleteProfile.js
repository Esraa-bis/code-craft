// styles
import styles from "../assets/css/Profile.module.css";
import { deleteAccount } from "../services/auth";
import { SessionTokenStorage } from "../services/local-storage";
import { sweetAlert } from "../services/sweetalert";
// components
import ProfileSectionTitleAndDescription from "./ProfileContentTitle";

function DeleteProfile({ setSignedIn, user }) {
  const handleDeleteAccount = async (e) => {
    e.preventDefault();
    deleteAccount()
      .then((response) => {
        if (response.success !== true) {
          sweetAlert({
            title: response.message,
            icon: "error",
          });
        }
        SessionTokenStorage.removeToken();
        setSignedIn(false);
      })
      .catch((error) => {
        SessionTokenStorage.removeToken();
        setSignedIn(false);
        sweetAlert({ title: error.message, icon: "error" });
      });
  };
  return (
    <>
      <ProfileSectionTitleAndDescription
        title="Deactivate Account"
        description="Close your account permanently."
      />
      <div className={styles.DeleteProfile}>
        <div className={styles.WarningText}>
          <span className={styles.Warning}>Warning:</span> If you close your
          account, you will be unsubscribed from your 1 course, and will lose
          access forever.
        </div>
        <button
          type="submit"
          className={styles.submitButton}
          onClick={handleDeleteAccount}
        >
          Deactivate Account
        </button>
      </div>
    </>
  );
}
export default DeleteProfile;
