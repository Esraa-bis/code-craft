// Styles
import styles from "../assets/css/Profile.module.css";

// Other components
import ImageUploader from "../components/ImageUploader";
import ProfileSideBar from "../components/ProfileSideBar";
function ChangePhoto({ signedIn, user, setUser }) {
  return (
    <div className={styles.container}>
      <ProfileSideBar
        signedIn={signedIn}
        user={user}
        activeSection={"ChangePhoto"}
      />
      <main className={styles.mainContent}>
        <ImageUploader signedIn={signedIn} user={user} setUser={setUser} />
      </main>
    </div>
  );
}

export default ChangePhoto;
