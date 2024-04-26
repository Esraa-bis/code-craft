import { Link } from "react-router-dom";
import styles from "./Profile.module.css";
function ProfileEditMenuItem(props) {
  return (
    <li className={`${styles.ProfileEditMenuItem}`}>
      <Link to={props.link} className={`${styles.menuItemLink}`}>
        {props.title}
      </Link>
    </li>
  );
}
export default ProfileEditMenuItem;
