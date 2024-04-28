// Styles
import styles from "../assets/css/Profile.module.css";

// Other components
import ProfileSideBar from "../components/ProfileSideBar";
import DeleteProfile from "../components/DeleteProfile";
function DeleteAccount() {
  return (
    <div className={styles.container}>
      <ProfileSideBar />
      <main className={styles.mainContent}>
      <DeleteProfile/>
      </main>
    </div>
  );
}

export default DeleteAccount;
