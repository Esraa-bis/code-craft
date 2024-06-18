import { useState } from "react";
import styles from "../assets/css/AdminPage.module.css";
import { EnrollUserInCourse } from "../services/course";
import { sweetAlert } from "../services/sweetalert";

// Rename the component to avoid conflict with the function name
function EnrollUser() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    EnrollUserInCourse(formData.courseId, formData.email)
      .then((response) => {
        if (response.success) {
          setFormData({
            courseId: "",
            email: "",
          });
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
  }

  function updateFormData(event, fieldName) {
    setFormData({ ...formData, [fieldName]: event.target.value });
  }

  return (
    <div className={styles.allCategories}>
      <h2>Enroll User</h2>

      <form className={styles.addCategory} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Course ID"
          value={formData.courseId}
          onChange={(event) => updateFormData(event, "courseId")}
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(event) => updateFormData(event, "email")}
        />

        <button className={styles.addCategoryBtn} disabled={loading}>
          Enroll User
        </button>
      </form>
    </div>
  );
}

export default EnrollUser;
