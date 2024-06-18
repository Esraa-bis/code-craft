import React, { useEffect, useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import styles from "../assets/css/TeachOnCodeCraft.module.css";
import { getAllCategories } from "../services/admin";
import {
  coursePreview,
  getCourseEditsIfExists,
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
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submited, setSubmitted] = useState(false);
  const [courseId, setCourseId] = useState("");
  const [formData, setFormData] = useState({});
  const [course, setCourse] = useState(null);

  if (edit === true) {
    // fetch course by id,
    // populate course data.
  }
  // to get all categories
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
        setSubmitted(true);
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
  // function to compare form data to course
  function getChangedValues(formData, course) {
    return Object.keys(formData).reduce(
      (acc, key) => {
        if (formData[key] !== course[key]) {
          acc.changed = true;
          acc.value[key] = formData[key];
        }
        return acc;
      },
      { changed: false, value: {} }
    );
  }

  // to get data when edit course
  useEffect(() => {
    setLoading(true);
    coursePreview(editCourseId)
      .then((response) => {
        if (response.success) {
          const { course: courseData } = response;
          const course = getCourseEditsIfExists(courseData);

          const data = {
            name: course.courseName,
            desc: course.desc,
            basePrice: course.basePrice,
            categoryId: course.categoryId?.name,
            level: course.level,
            prerequisites: course.prerequisites,
          };
          setFormData(() => ({ ...data }));
          setCourse(() => ({ ...data }));
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
    const changes = getChangedValues(formData, course);
    if (changes.changed !== true) {
      return;
    }
    setLoading(true);
    try {
      const response = await updateCourseInfo(changes.value, editCourseId);
      if (response.success) {
        setCourseId(encodeURIComponent(response.data.id));
        setSubmitted(true);
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

  function updateFormData(event, fieldName) {
    if (fieldName === "courseImage") {
      setFormData((formData) => ({
        ...formData,
        [fieldName]: event.target.files[0],
      }));
    } else {
      setFormData((formData) => ({
        ...formData,
        [fieldName]: event.target.value,
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
        <div className={styles.formGroup}>
          <label htmlFor="terms" className={styles.terms}>
            <input
              required
              type="checkbox"
              name="terms"
              className={styles.termsInput}
            />
            I have read and accept the&nbsp;
            <Link to="/policy" target="_blank">
              Policy
            </Link>
            .
          </label>
        </div>

        <button type="submit" className={styles.save} disabled={loading}>
          Save & Continue
        </button>
      </form>
    </div>
  );
};

export default TeachOnCodeCraft;
