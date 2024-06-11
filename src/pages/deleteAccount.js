// Styles
import styles from "../assets/css/Profile.module.css";

// Other components
import DeleteProfile from "../components/DeleteProfile";
import ProfileSideBar from "../components/ProfileSideBar";
function DeleteAccount({ signedIn, user, setSignedIn }) {
  return (
    <div className={styles.container}>
      <ProfileSideBar
        signedIn={signedIn}
        user={user}
        activeSection={"DeleteAccount"}
      />
      <main className={styles.mainContent}>
        <DeleteProfile
          signedIn={signedIn}
          user={user}
          setSignedIn={setSignedIn}
        />
      </main>
    </div>
  );
}

export default DeleteAccount;
