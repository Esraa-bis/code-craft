import React, { useState } from "react";
import "../assets/css/create-course.css"
import { Link } from "react-router-dom";
function UploadCourse () {
  const [courseData, setCourseData] = useState({
    title: "",
    price: "",
    category: "web",
    level: "all",
    description: "",
    prerequisites: "",
    previewImage: null,
    coverPhoto: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData({ ...courseData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setCourseData({ ...courseData, [name]: files[0] });
  };

  const handleSubmit = () => {
    // Handle form submission here
    console.log(courseData);
  };

  return (
    <div className="courseForm">
      <h1>New / Edit Course</h1>
      <form>
        <div className="formGroup">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            name="title"
            placeholder="Course title..."
            id="title"
            required
            onChange={handleChange}
          />
        </div>
        <div className="formGroup">
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            min="0"
            name="price"
            placeholder="Course price..."
            id="price"
            required
            onChange={handleChange}
          />
        </div>
        <div className="formGroup">
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            name="category"
            required
            onChange={handleChange}
          >
            <option value="web">Web Development</option>
            <option value="mobile">Mobile Development</option>
            <option value="game">Game Development</option>
            <option value="testing">Software Testing</option>
            <option value="engineering">Software Engineering</option>
            <option value="database">Database Design & Development</option>
            <option value="programming">Programming</option>
          </select>
        </div>
        <div className="formGroup">
          <label htmlFor="level">Level:</label>
          <select id="level" name="level" required onChange={handleChange}>
            <option value="all">All</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="expert">Expert</option>
          </select>
        </div>
        <div className="formGroup">
          <label htmlFor="description">Description:</label>
          <textarea
            name="description"
            placeholder="Course description..."
            id="description"
            required
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="formGroup">
          <label htmlFor="prerequisites">Prerequisites:</label>
          <textarea
            name="prerequisites"
            placeholder="Course prerequisites..."
            id="prerequisites"
            required
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="formGroup">
          <label htmlFor="preview-image">Preview image:</label>
          <input
            type="file"
            name="previewImage"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
        <div className="formGroup">
          <label htmlFor="cover-photo">Cover photo:</label>
          <input
            type="file"
            name="coverPhoto"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
        <button type="button" className="save" onClick={handleSubmit}>
          <Link to="/UploadVideos">Save & Continue</Link>
        </button>
      </form>
      {/* Add more comments here if needed */}
    </div>
  );
};

export default UploadCourse;
