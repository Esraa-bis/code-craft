// Styles
import styles from "../assets/css/Profile.module.css";

// Other components
import EditProfileForm from "../components/MainProfile";
import ProfileSideBar from "../components/ProfileSideBar";

function Profile({ user, setUser }) {
  return (
    <div className={`${styles.container} ${styles.profile}`}>
      <ProfileSideBar />
      <main className={styles.mainContent}>
        {/* edit profile form */}
        {/* <Routes>
          <Route path="/Profile" element={<EditProfileForm/>}/>
        </Routes> */}
        <EditProfileForm user={user} setUser={setUser} />
      </main>
    </div>
  );
}

export default Profile;
