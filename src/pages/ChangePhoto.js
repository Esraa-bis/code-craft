// Styles
import styles from "../assets/css/Profile.module.css";

// Other components
import ImageUploader from "../components/ImageUploader";
import ProfileSideBar from "../components/ProfileSideBar";
function ChangePhoto({ signedIn, user }) {
  return (
    <div className={styles.container}>
      <ProfileSideBar signedIn={signedIn} user={user} />
      <main className={styles.mainContent}>
        <ImageUploader />
      </main>
    </div>
  );
}

export default ChangePhoto;
