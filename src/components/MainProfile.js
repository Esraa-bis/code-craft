// styles
import { useEffect, useState } from "react";

import styles from "../assets/css/Profile.module.css";
// components
import { sweetAlert } from "../services/sweetalert";
import {
  SOCIAL_MEDIA_INDEX,
  SOCIAL_MEDIA_KEYS,
  editProfile,
} from "../services/user";
import ProfileSectionTitleAndDescription from "./ProfileContentTitle";

function EditProfileForm({ user, setUser }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(() => ({ ...user }));

  const [contactInfo, setContactInfo] = useState(
    () => user.contactinfo || ["", "", ""]
  );

  useEffect(() => {
    setFormData({ ...user });
    setContactInfo(user.contactinfo || ["", "", ""]);
  }, [user]);

  const updateContactInfo = (key, value) => {
    if (typeof SOCIAL_MEDIA_INDEX[key] !== "number") {
      throw new Error(`Invalid social media key ${key}`);
    }
    contactInfo[SOCIAL_MEDIA_INDEX[key]] = value;
    setContactInfo([...contactInfo]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    editProfile({ ...formData, contactinfo: contactInfo })
      .then((response) => {
        if (response.success) setUser(response.user);
        sweetAlert({
          title: response.message,
          icon: response.success ? "success" : "error",
        });
      })
      .catch((error) => {
        sweetAlert({ title: error.message, icon: "error" });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  function updateFormData(event, fieldname) {
    setFormData({ ...formData, [fieldname]: event.target.value });
  }

  return (
    <>
      <ProfileSectionTitleAndDescription
        title="Profile"
        description="Add information about yourself"
      />
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        {/* Basics Info */}
        <fieldset>
          <legend>Basics Info</legend>
          <div className={styles.formGroup}>
            <input
              type="text"
              id="firstname"
              name="firstname"
              className={styles.input}
              value={formData.firstname}
              onChange={(event) => updateFormData(event, "firstname")}
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
              value={formData.lastname}
              onChange={(event) => updateFormData(event, "lastname")}
              placeholder="Last Name"
              required
            />
          </div>
          <div className={styles.formGroup}>
            <input
              type="number"
              id="phonenumber"
              name="phonenumber"
              className={styles.input}
              value={formData.phonenumber}
              onChange={(event) => updateFormData(event, "phonenumber")}
              placeholder="Phone Number"
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
              value={formData.bio}
              onChange={(event) => updateFormData(event, "bio")}
              placeholder="Describe yourself in a few words..."
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
              value={contactInfo[SOCIAL_MEDIA_INDEX.linkedin]}
              onChange={(event) =>
                updateContactInfo(
                  SOCIAL_MEDIA_KEYS.linkedin,
                  event.target.value
                )
              }
              placeholder="LinkedIn"
              className={styles.input}
            />
          </div>
          <div className={styles.formGroup}>
            <input
              type="url"
              id="facebook"
              name="facebook"
              value={contactInfo[SOCIAL_MEDIA_INDEX.facebook]}
              onChange={(event) =>
                updateContactInfo(
                  SOCIAL_MEDIA_KEYS.facebook,
                  event.target.value
                )
              }
              placeholder="Facebook"
              className={styles.input}
            />
          </div>
          <div className={styles.formGroup}>
            <input
              type="url"
              id="twitter"
              name="twitter"
              value={contactInfo[SOCIAL_MEDIA_INDEX.twitter]}
              onChange={(event) =>
                updateContactInfo(SOCIAL_MEDIA_KEYS.twitter, event.target.value)
              }
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
              value={formData.education}
              onChange={(event) => updateFormData(event, "education")}
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
              value={formData.experience}
              onChange={(event) => updateFormData(event, "experience")}
              placeholder="Experience"
            ></textarea>
          </div>
        </fieldset>

        <button
          type="submit"
          disabled={loading}
          className={styles.submitButton}
        >
          Submit
        </button>
      </form>
    </>
  );
}
export default EditProfileForm;
