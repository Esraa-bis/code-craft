import React from "react";
import styles from "./Profile.module.css";
// other compnents
import ProfileSectionTitleAndDescription from "./ProfileContentTitle";


function ChangePassword() {
  return (
    <>
      
      <ProfileSectionTitleAndDescription
        title="Change Password"
        description="Please fill out the form below to update your password"
      />
      <div className={styles.mainContent}></div>
    </>
  );
}

export default ChangePassword;
