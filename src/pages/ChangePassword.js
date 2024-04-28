// Styles
import styles from "../assets/css/Profile.module.css";

// Other components
import ProfileSideBar from "../components/ProfileSideBar";
import ChangePasswordForm from "../components/ChangePasswordForm"
function ChangePassword() {
  return (
    <div className={styles.container}>
      <ProfileSideBar />
      <main className={styles.mainContent}>
        <ChangePasswordForm />
      </main>
    </div>
  );
}

export default ChangePassword;
