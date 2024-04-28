// link
import { Link } from "react-router-dom";
// photos
import ProfilePicture from "../assets/images/pp.jpg"
// styles
import styles from "../assets/css/Profile.module.css";
// components
function ProfileSideBar() {
  return (
    <section className={`${styles.ProfileSideBar}`}>
      <section className={`${styles.ProfileUserImageAndName}`}>
        <img
          src={ProfilePicture}
          alt="profile"
          className={`${styles.ProfilePicture}`}
        />
        <h3 className={`${styles.UserName}`}>Esraa Ali</h3>
      </section>
      <section className={`${styles.ProfileEditSection}`}>
        <ul className={`${styles.ProfileEditMenu}`}>
          <li className={`${styles.ProfileEditMenuItem}`}>
            <Link to="/Profile" className={`${styles.menuItemLink}`}>
              Profile
            </Link>
          </li>
          <li className={`${styles.ProfileEditMenuItem}`}>
            <Link to="/ChangePhoto" className={`${styles.menuItemLink}`}>
              Profile Picture
            </Link>
          </li>
          <li className={`${styles.ProfileEditMenuItem}`}>
            <Link to="/ChangePassword" className={`${styles.menuItemLink}`}>
              Change Password
            </Link>
          </li>
          <li className={`${styles.ProfileEditMenuItem}`}>
            <Link to="/PaymentMethods" className={`${styles.menuItemLink}`}>
              Payment Methods
            </Link>
          </li>
          <li className={`${styles.ProfileEditMenuItem}`}>
            <Link to="/DeleteAccount" className={`${styles.menuItemLink}`}>
              Delete Account
            </Link>
          </li>
        </ul>
      </section>{" "}
    </section>
  );
}
export default ProfileSideBar;
