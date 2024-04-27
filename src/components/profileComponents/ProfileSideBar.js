// photos
import ProfilePicture from "../../assets/images/pp.jpg";
// styles
import styles from "./Profile.module.css"
// components

import ProfileUserImageAndName from "./profileUserImageAndName";
import ProfileEditMenu from "./ProfileEditMenu";
function ProfileSideBar() {
    return (
      <div className={`${styles.ProfileSideBar}`}>
            <ProfileUserImageAndName img={ProfilePicture} UserName="Esraa Ali" />
            <ProfileEditMenu/>
      </div>
    );
}
export default ProfileSideBar;