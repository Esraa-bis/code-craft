import styles from "./Profile.module.css";
function profileSectionTitleAndDescription(props) {
  return (
    <div className={styles.TitleAndDescription}>
      <h2 className={styles.profileSectionTitle}>{props.title}</h2>
      <p className={styles.profileSectionDescription}>{props.description}</p>
    </div>
  );
}

export default profileSectionTitleAndDescription;
