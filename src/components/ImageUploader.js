// styles
import { useState } from "react";
import styles from "../assets/css/Profile.module.css";
// components
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { sweetAlert } from "../services/sweetalert";
import {
  deleteProfilePicture,
  updateProfilePicture,
  uploadProfilePicture,
} from "../services/user";
import ProfileSectionTitleAndDescription from "./ProfileContentTitle";
// photos
function ImageUploader({ user, setUser }) {
  const [file, setFile] = useState();
  const [loading, setLoading] = useState(false);

  const fileSelected = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };
  const handleDelete = (e) => {
    e.preventDefault();
    setLoading(true);
    deleteProfilePicture()
      .then((response) => {
        if (response.success) {
          setUser((user) => ({ ...user, ...response.user }));
          sweetAlert({
            title: response.message,
            icon: "success",
          });
        } else {
          sweetAlert({
            title: response.message,
            icon: "error",
          });
        }
      })
      .catch((error) => {
        sweetAlert({ title: error.message, icon: "error" });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleUpload = (e) => {
    e.preventDefault();
    setLoading(true);
    (user.profile_pic?.id ===
      "Code-Craft/user/profilepics/defaults/Windows_10_Default_Profile_Picture.svg_gxjd0w.png"
      ? uploadProfilePicture
      : updateProfilePicture)({
      file,
      oldPublicId: user.profile_pic?.id,
    })
      .then((response) => {
        if (response.success) {
          setUser({ ...user, profile_pic: response.photo });
          sweetAlert({
            title: response.message,
            icon: "success",
          });
        } else {
          sweetAlert({
            title: response.message,
            icon: "error",
          });
        }
      })
      .catch((error) => {
        sweetAlert({ title: error.message, icon: "error" });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <ProfileSectionTitleAndDescription
        title="Photo"
        description="Add a nice photo of yourself for your profile."
      />
      <div className={styles.CurrentProfilePicture}>
        <button
          className={styles.deletePhotoBtn}
          onClick={handleDelete}
          disabled={loading}
        >
          <FontAwesomeIcon icon={faTrashCan} />
        </button>

        <img
          src={user?.profile_pic?.url}
          alt="profile"
          className={styles.CurrentPicture}
        />
      </div>
      <form className={styles.ChangePhotoForm} onSubmit={handleUpload}>
        <div className={styles.formGroup}>
          <label>Add / Change Photo</label>
          <input
            type="file"
            className={styles.PhotoInput}
            onChange={fileSelected}
          />
        </div>
        <button
          type="submit"
          className={styles.submitButton}
          disabled={loading}
        >
          Upload
        </button>
      </form>
    </>
  );
}
export default ImageUploader;
