// Styles
import styles from "../assets/css/Profile.module.css";

// Other components
import ChangePasswordForm from "../components/ChangePasswordForm";
import ProfileSideBar from "../components/ProfileSideBar";
function ChangePassword({ signedIn, user }) {
  return (
    <div className={styles.container}>
      <ProfileSideBar
        signedIn={signedIn}
        user={user}
        activeSection={"ChangePassword"}
      />
      <main className={styles.mainContent}>
        <ChangePasswordForm />
      </main>
    </div>
  );
}

export default ChangePassword;
