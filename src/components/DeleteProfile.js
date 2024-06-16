// styles
import styles from "../assets/css/Profile.module.css";
import { logOut } from "../services/auth";
import { SessionTokenStorage } from "../services/local-storage";
import { sweetAlert } from "../services/sweetalert";
// components
import ProfileSectionTitleAndDescription from "./ProfileContentTitle";

function DeleteProfile({ setSignedIn, user }) {
  const confirmDeactivate = () => {
    sweetAlert({
      title: "Are you sure?",
      text: "Do you want to deactivate your account?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willApprove) => {
      if (willApprove) {
        handleLogout();
      }
    });
  };
  const handleLogout = async (e) => {
    logOut()
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
          <span className={styles.Warning}>Warning:</span> are you sure you want
          to deactivate your account
        </div>
        <button
          type="submit"
          className={styles.submitButton}
          onClick={confirmDeactivate}
        >
          Deactivate Account
        </button>
      </div>
    </>
  );
}
export default DeleteProfile;
