// Styles
import styles from "../assets/css/Profile.module.css";

// Other components
import ProfileSideBar from "../components/ProfileSideBar";
import EditProfileForm from "../components/MainProfile";

function Profile() {
  return (
    <div className={styles.container}>
      <ProfileSideBar />
      <main className={styles.mainContent}>
        {/* edit profile form */}
        {/* <Routes>
          <Route path="/Profile" element={<EditProfileForm/>}/>
        </Routes> */}
        <EditProfileForm />
      </main>
    </div>
  );
}

export default Profile;


