import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import styles from "../assets/css/TeachOnCodeCraft.module.css";
import { getAllCategories } from "../services/admin";
import { uploadCourseInfo } from "../services/course";
import { sweetAlert } from "../services/sweetalert";

const TeachOnCodeCraft = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const [submited, setSubmited] = useState(false);
  const [courseId, setCourseId] = useState("");

  useEffect(() => {
    setLoading(true);
    getAllCategories()
      .then((response) => {
        if (response.success) {
          setCategories(response.categories);
        } else {
          setError("Failed to fetch Categories");
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

async function handleSubmit(e) {
  e.preventDefault();
  setLoading(true);
  try {
    const response = await uploadCourseInfo(formData);
    if (response.success) {
      setCourseId(encodeURIComponent(response.data.id));
      setSubmited(true);
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
  } catch (error) {
    sweetAlert({
      title: "An error occurred",
      text: error.message,
      icon: "error",
    });
  } finally {
    setLoading(false);
  }
}


  function updateFormData(event, fieldname) {
    if (fieldname === "courseImage") {
      setFormData({ ...formData, [fieldname]: event.target.files[0] });
    } else {
      setFormData({ ...formData, [fieldname]: event.target.value });
    }
  }

  return (
    <div className={styles.courseForm}>
      {submited && (
        <Navigate to={"/UploadCourse?id=" + courseId } replace={true} />
      )}

      <h1>Upload new Course</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            name="title"
            placeholder="Course title..."
            id="title"
            value={formData.name || ""}
            onChange={(event) => updateFormData(event, "name")}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            min="0"
            name="price"
            placeholder="Course price..."
            id="price"
            value={formData.basePrice || ""}
            onChange={(event) => updateFormData(event, "basePrice")}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            name="category"
            required
            value={formData.categoryId || ""}
            onChange={(event) => updateFormData(event, "categoryId")}
          >
            <option value="" disabled selected>
              Choose Category
            </option>
            {categories?.map((category, index) => (
              <option key={index} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="level">Level:</label>
          <select
            id="level"
            name="level"
            required
            value={formData.level || ""}
            onChange={(event) => updateFormData(event, "level")}
          >
            <option value="" disabled selected>
              Choose level
            </option>
            <option value="All">All</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Expert">Expert</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="description">Description:</label>
          <textarea
            name="description"
            placeholder="Course description..."
            id="description"
            value={formData.desc || ""}
            onChange={(event) => updateFormData(event, "desc")}
            required
          ></textarea>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="prerequisites">Prerequisites:</label>
          <textarea
            name="prerequisites"
            placeholder="Course prerequisites..."
            id="prerequisites"
            value={formData.prerequisites || ""}
            onChange={(event) => updateFormData(event, "prerequisites")}
            required
          ></textarea>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="preview-image">Preview image:</label>
          <input
            type="file"
            name="previewImage"
            accept="image/*"
            onChange={(event) => updateFormData(event, "courseImage")}
            required
          />
        </div>
        <button type="submit" className={styles.save} disabled={loading}>
          Save & Continue
        </button>
      </form>
    </div>
  );
};

export default TeachOnCodeCraft;
