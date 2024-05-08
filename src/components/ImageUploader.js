// styles
import { useState } from "react";
import styles from "../assets/css/Profile.module.css";
// components
import { sweetAlert } from "../services/sweetalert";
import { updateProfilePicture } from "../services/user";
import ProfileSectionTitleAndDescription from "./ProfileContentTitle";
// photos
function ImageUploader({ user, setUser }) {
  const [file, setFile] = useState();
  const [loading, setLoading] = useState(false);

  const fileSelected = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    updateProfilePicture({
      file,
      oldPublicId: user.profile_pic.id,
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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={`${styles.trashIcon}w-6 h-6`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
          />
        </svg>

        <img
          src={user?.profile_pic?.url}
          alt="profile"
          className={styles.CurrentPicture}
        />
      </div>
      <form className={styles.ChangePhotoForm} onSubmit={handleSubmit}>
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
