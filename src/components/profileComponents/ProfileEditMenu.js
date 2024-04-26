import styles from "./Profile.module.css";
// import components
import ProfileEditMenuItem from "./ProfileEditMenuItem";

function ProfileEditMenu() {
  return (
    <div className={`${styles.ProfileEditSection}`}>
      <ul className={`${styles.ProfileEditMenu}`}>
        <ProfileEditMenuItem link="/Profile" title="Profile" />
        <ProfileEditMenuItem
          link="/EditProfilePicture"
          title="Edit Profile Picture"
        />
        <ProfileEditMenuItem link="/ChangePassword" title="Change Password" />
        <ProfileEditMenuItem link="/PaymentMethods" title="Payment Methods" />
        <ProfileEditMenuItem link="/DeleteAccount" title="Delete Account" />
      </ul>
    </div>
  );
}
export default ProfileEditMenu;
