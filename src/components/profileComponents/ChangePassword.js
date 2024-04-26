import styles from "./Profile.module.css"
// import component
import profileSectionTitleAndDescription from "./ProfileContentTitle";
function ChangePassword() {
    return (
        <>     <profileSectionTitleAndDescription  title="Change Password" description="Please fill out the form below to update your password
"/>
        <div className={`${styles.mainContet}`}>
            </div>
        </>
    );
}
export default ChangePassword;