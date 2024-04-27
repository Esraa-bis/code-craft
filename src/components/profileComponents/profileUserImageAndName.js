import styles from "./Profile.module.css"
function ProfileUserImageAndName(props) {
    return (
      <div className={`${styles.ProfileUserImageAndName}`}>
        <img
          src={props.img}
          alt="profile"
          className={`${styles.ProfilePicture}`}
        />
        <h3 className={`${styles.UserName}`}>{props.UserName}</h3>
      </div>
    );
}
export default ProfileUserImageAndName;