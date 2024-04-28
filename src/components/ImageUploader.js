import { useState } from "react";
// styles
import styles from "../assets/css/Profile.module.css";
// components
import ProfileSectionTitleAndDescription from "./ProfileContentTitle";
// photos
import ProfilePicture from "../assets/images/pp.jpg";
function ImageUploader() {
      const [selectedFile, setSelectedFile] = useState(null);

      const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
      };

      const handleUpload = () => {
        if (selectedFile) {
          // You can now upload the selected file using your preferred method
          console.log("Uploading file:", selectedFile);
          // Here you would typically send the file to your backend for processing
        } else {
          alert("Please select a file to upload.");
        }
      };
  return (
    <>
      <ProfileSectionTitleAndDescription
        title="Photo"
        description="Add a nice photo of yourself for your profile."
      />
      <div className={styles.CurrentProfilePicture}>
        <img
          src={ProfilePicture}
          alt="profile"
          className={styles.CurrentPicture}
        />
      </div>
      <form className={styles.ChangePhotoForm}>
        <div className={styles.formGroup}>
          <label>Add / Change Photo</label>
                  <input type="file" onChange={handleFileChange} className={styles.PhotoInput} />
        </div>
        <button onClick={handleUpload} className={styles.submitButton}>
          Upload
        </button>
      </form>
    </>
  );
}
export default ImageUploader;
