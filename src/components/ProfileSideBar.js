// // link
// import { Link, Navigate } from "react-router-dom";
// // photos
// // styles
// import styles from "../assets/css/Profile.module.css";
// // components
// function ProfileSideBar({ signedIn, user }) {
//   return (
//     <section className={`${styles.ProfileSideBar}`}>
//       {!signedIn && <Navigate to="/" replace={true} />}

//       <section className={`${styles.ProfileUserImageAndName}`}>
//         <img
//           src={user?.profile_pic?.url}
//           alt="profile"
//           className={`${styles.ProfilePicture}`}
//         />
//         <h3 className={`${styles.UserName}`}>
//           {user?.firstName} {user?.lastName}
//         </h3>
//       </section>
//       <section className={`${styles.ProfileEditSection}`}>
//         <ul className={`${styles.ProfileEditMenu}`}>
//           <li className={`${styles.ProfileEditMenuItem}`}>
//             <Link to="/Profile" className={`${styles.menuItemLink}`}>
//               Profile
//             </Link>
//           </li>
//           <li className={`${styles.ProfileEditMenuItem}`}>
//             <Link to="/ChangePhoto" className={`${styles.menuItemLink}`}>
//               Profile Picture
//             </Link>
//           </li>
//           <li className={`${styles.ProfileEditMenuItem}`}>
//             <Link to="/ChangePassword" className={`${styles.menuItemLink}`}>
//               Change Password
//             </Link>
//           </li>
//           <li className={`${styles.ProfileEditMenuItem}`}>
//             <Link to="/PaymentMethods" className={`${styles.menuItemLink}`}>
//               Payment Methods
//             </Link>
//           </li>
//           <li className={`${styles.ProfileEditMenuItem}`}>
//             <Link to="/DeleteAccount" className={`${styles.menuItemLink}`}>
//               Deactivate Account
//             </Link>
//           </li>
//         </ul>
//       </section>
//     </section>
//   );
// }
// export default ProfileSideBar;

import { Link, Navigate } from "react-router-dom";
import styles from "../assets/css/Profile.module.css";

function ProfileSideBar({ signedIn, user, activeSection = "Profile" }) {
  return (
    <section className={`${styles.ProfileSideBar}`}>
      {!signedIn && <Navigate to="/" replace={true} />}

      <section className={`${styles.ProfileUserImageAndName}`}>
        <img
          src={user?.profile_pic?.url}
          alt="profile"
          className={`${styles.ProfilePicture}`}
        />
        <h3 className={`${styles.UserName}`}>
          {user?.firstName} {user?.lastName}
        </h3>
      </section>
      <section className={`${styles.ProfileEditSection}`}>
        <ul className={`${styles.ProfileEditMenu}`}>
          <li
            className={`${styles.ProfileEditMenuItem} ${
              activeSection === "Profile" ? styles.active : ""
            }`}
          >
            <Link to="/Profile" className={`${styles.menuItemLink}`}>
              Profile
            </Link>
          </li>
          <li
            className={`${styles.ProfileEditMenuItem} ${
              activeSection === "ChangePhoto" ? styles.active : ""
            }`}
          >
            <Link to="/ChangePhoto" className={`${styles.menuItemLink}`}>
              Profile Picture
            </Link>
          </li>
          <li
            className={`${styles.ProfileEditMenuItem} ${
              activeSection === "ChangePassword" ? styles.active : ""
            }`}
          >
            <Link to="/ChangePassword" className={`${styles.menuItemLink}`}>
              Change Password
            </Link>
          </li>
          {/* <li
            className={`${styles.ProfileEditMenuItem} ${
              activeSection === "PaymentMethods" ? styles.active : ""
            }`}
          > */}
          {/* <Link to="/PaymentMethods" className={`${styles.menuItemLink}`}>
              Payment Methods
            </Link> */}
          {/* </li> */}
          <li
            className={`${styles.ProfileEditMenuItem} ${
              activeSection === "DeleteAccount" ? styles.active : ""
            }`}
          >
            <Link to="/DeleteAccount" className={`${styles.menuItemLink}`}>
              Deactivate Account
            </Link>
          </li>
        </ul>
      </section>
    </section>
  );
}

export default ProfileSideBar;
