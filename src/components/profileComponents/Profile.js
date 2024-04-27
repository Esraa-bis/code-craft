// Styles
import styles from "./Profile.module.css";

// Other components
import ProfileSideBar from "./ProfileSideBar";
import ProfileSectionTitleAndDescription from "./ProfileContentTitle";

function Profile() {
  return (
    <div className={styles.container}>
      <ProfileSideBar />
      <main className={styles.mainContent}>
        <ProfileSectionTitleAndDescription
          title="Profile"
          description="Add information about yourself"
        />
        {/* edit profile form */}
        <ProfileForm />
      </main>
    </div>
  );
}

export default Profile;

function ProfileForm() {
  return (
    <form className={styles.formContainer}>
      {/* Basics Info */}
      <fieldset>
        <legend>Basics Info</legend>
        <div className={styles.formGroup}>
          <input
            type="text"
            id="firstname"
            name="firstname"
            className={styles.input}
            placeholder="First Name"
            required
          />
        </div>
        <div className={styles.formGroup}>
          <input
            type="text"
            id="lastname"
            name="lastname"
            className={styles.input}
            placeholder="Last Name"
            required
          />
        </div>
        <div className={styles.formGroup}>
          <input
            type="number"
            id="age"
            name="age"
            className={styles.input}
            placeholder="Age"
            required
          />
        </div>
      </fieldset>

      {/* Bio */}
      <fieldset>
        <legend>Bio</legend>
        <div className={styles.formGroup}>
          <textarea
            id="bio"
            name="bio"
            className={styles.input}
            placeholder="Write a bit about yourself"
            required
          ></textarea>
        </div>
      </fieldset>

      {/* Contact Info */}
      <fieldset>
        <legend>Contact Info</legend>
        <div className={styles.formGroup}>
          <input
            type="url"
            id="linkedin"
            name="linkedin"
            placeholder="LinkedIn"
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <input
            type="url"
            id="facebook"
            name="facebook"
            placeholder="Facebook"
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <input
            type="url"
            id="twitter"
            name="twitter"
            placeholder="Twitter"
            className={styles.input}
          />
        </div>
      </fieldset>

      {/* Education */}
      <fieldset>
        <legend>Education</legend>
        <div className={styles.formGroup}>
          <textarea
            id="education"
            name="education"
            className={styles.input}
            placeholder="Education.."
            required
          ></textarea>
        </div>
      </fieldset>

      {/* Experience */}
      <fieldset>
        <legend>Experience</legend>
        <div className={styles.formGroup}>
          <textarea
            id="experience"
            name="experience"
            className={styles.input}
            placeholder="Experience"
            required
          ></textarea>
        </div>
      </fieldset>

      <button type="submit" className={styles.submitButton}>
        Submit
      </button>
    </form>
  );
}

