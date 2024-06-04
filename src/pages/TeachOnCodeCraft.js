import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import styles from "../assets/css/TeachOnCodeCraft.module.css";
import { getAllCategories } from "../services/admin";
import {
  coursePreview,
  updateCourseInfo,
  uploadCourseInfo,
} from "../services/course";
import { sweetAlert } from "../services/sweetalert";

const TeachOnCodeCraft = ({ edit }) => {
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  const query = useQuery();
  const editCourseId = query.get("courseId");
  console.log(editCourseId);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submited, setSubmited] = useState(false);
  const [courseId, setCourseId] = useState("");
  const [formData, setFormData] = useState({});
  const [course, setCourse] = useState(null);

  if (edit === true) {
    // fetch course by id,
    // populate course data.
  }
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

  async function handleUploadCourseInfo(e) {
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
  // to get data when edit course
  useEffect(() => {
    setLoading(true);
    coursePreview(editCourseId)
      .then((response) => {
        if (response.success) {
          const { course } = response;
          setFormData(() => ({
            name: course.courseName,
            desc: course.desc,
            basePrice: course.basePrice,
            categoryId: course.categoryId?.name,
            level: course.level,
            prerequisites: course.prerequisites,
          }));
        } else {
          setError("Failed to fetch course preview");
        }
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [courseId]);
  // for edit course
  async function handleUpdateCourseInfo(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await updateCourseInfo(formData, editCourseId);
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
      setFormData((formData) => ({
        ...formData,
        [fieldname]: event.target.files[0],
      }));
    } else {
      setFormData((formData) => ({
        ...formData,
        [fieldname]: event.target.value,
      }));
    }
  }

  return (
    <div className={styles.courseForm}>
      {submited && (
        <Navigate to={"/UploadCourse?id=" + courseId} replace={true} />
      )}

      <h1>{edit ? `Update ${formData.name}` : "Upload new Course"}</h1>
      <form onSubmit={edit ? handleUpdateCourseInfo : handleUploadCourseInfo}>
        <div className={styles.formGroup}>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            name="title"
            placeholder="Course title..."
            id="title"
            value={formData.name}
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
            value={formData.basePrice}
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
            value={formData.categoryId}
            onChange={(event) => updateFormData(event, "categoryId")}
          >
            <option value={""} disabled selected>
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
            value={formData.level}
            onChange={(event) => updateFormData(event, "level")}
          >
            <option disabled selected>
              Choose level
            </option>
            <option value="All">All</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Expert</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="description">Description:</label>
          <textarea
            name="description"
            placeholder="Course description..."
            id="description"
            value={formData.desc}
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
            value={formData.prerequisites}
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
