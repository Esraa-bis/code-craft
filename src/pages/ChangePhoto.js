// Styles
import styles from "../assets/css/Profile.module.css";

// Other components
import ProfileSideBar from "../components/ProfileSideBar";
import ImageUploader from "../components/ImageUploader"
function ChangePhoto() {
  return (
    <div className={styles.container}>
      <ProfileSideBar />
          <main className={styles.mainContent}>
              <ImageUploader/>
              
      </main>
    </div>
  );
}

export default ChangePhoto;
