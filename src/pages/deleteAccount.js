// Styles
import styles from "../assets/css/Profile.module.css";

// Other components
import ProfileSideBar from "../components/ProfileSideBar";
import DeleteProfile from "../components/DeleteProfile";
function DeleteAccount({ signedIn, user }) {
  return (
    <div className={styles.container}>
      <ProfileSideBar signedIn={signedIn} user={user} />
      <main className={styles.mainContent}>
        <DeleteProfile />
      </main>
    </div>
  );
}

export default DeleteAccount;
