import React, { useState } from "react";
import styles from "../assets/css/UploadCourse.module.css";
import { uploadCourseVideo } from "../services/course";
import { sweetAlert } from "../services/sweetalert";

function UploadCourse() {
  const [videos, setVideos] = useState([]);
  const [filesToDo, setFilesToDo] = useState(0);
  const [filesDone, setFilesDone] = useState(0);
  const [courseId, setCourseId] = useState(() => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("id");
  });
  // const dropAreaRef = useRef(null);
  // const progressBarRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const [highlight, setHighlight] = useState(false);
  const [uploading, setUploading] = useState(false);

  const setVideoName = (event, video) => {
    video.name = event.target.value;
    setVideos((videos) => [...videos]);
  };

  const preventDefault = (event) => {
    event.preventDefault();
  };

  const dragOn = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setHighlight(() => true);
  };

  const dragOff = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setHighlight(() => false);
  };

  const handleDrop = (e) => {
    const dt = e.dataTransfer;
    const files = dt.files;
    handleFiles(files);
  };

  const handleFiles = (fileList) => {
    for (const file of fileList) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = () => {
        const video = {
          id: new Date().getTime(),
          name: file.name.replace(/\.[A-Za-z0-9]{0,}$/, ""),
          src: reader.result,
          preload: "metadata",
          duration: "0s",
          file,
        };
        setVideos((videos) => [...videos, video]);
      };
    }
  };

  // const initializeProgress = (numFiles) => {
  //   setFilesDone(0);
  //   setFilesToDo(numFiles);
  //   // progressBarRef.current.value = 0;
  // };

  // const progressDone = () => {
  //   setFilesDone((prev) => {
  //     const updatedFilesDone = prev + 1;
  //     progressBarRef.current.value = (updatedFilesDone / filesToDo) * 100;
  //     return updatedFilesDone;
  //   });
  // };

  const formatDuration = (durationInSeconds) => {
    const hours = Math.floor(durationInSeconds / 3600);
    const minutes = Math.floor((durationInSeconds % 3600) / 60);
    const seconds = Math.floor(durationInSeconds % 60);

    const formattedHours = hours > 0 ? `${hours}h ` : "";
    const formattedMinutes = minutes > 0 ? `${minutes}m ` : "";
    const formattedSeconds = seconds > 0 ? `${seconds}s` : "";

    return formattedHours + formattedMinutes + formattedSeconds;
  };
  const handelRemove = (file) => {
    const confirmed = window.confirm(
      "Are you sure you want to remove this video?"
    );
    if (confirmed) {
      setVideos((videos) => videos.filter((f) => f !== file));
    }
  };

  const oncanplay = (event, video) => {
    video.duration = formatDuration(event.target.duration || 0);
    setVideos((videos) => [...videos]);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    for (let i = 0; i < videos.length; ++i) {
      const video = videos[i];
      try {
        const response = await uploadCourseVideo({
          courseID: courseId,
          title: video.name,
          video: video.file,
        });
        if (response.success) {
          setUploading(true);
          sweetAlert({
            title: response.message,
            icon: response.success ? "success" : "error",
          });
        }
      } catch (error) {
        sweetAlert({ title: error.message, icon: "error" });
      }
      if (i + 1 === videos.length) {
        setLoading(false);
      }
    }
  }

  function updateFormData(event, fieldName) {
    if (fieldName === "courseImage") {
      setFormData({ ...formData, [fieldName]: event.target.files[0] });
    } else {
      setFormData({ ...formData, [fieldName]: event.target.value });
    }
  }

  return (
    <div className={styles.courseForm}>
      <h1>My Course Title Content</h1>
      <div
        className={styles.dropArea + " " + (highlight && styles.highlight)}
        onDragEnter={dragOn}
        onDragOver={dragOn}
        onDragLeave={dragOff}
        onDrop={(event) => {
          dragOff(event);
          handleDrop(event);
        }}
      >
        <form className={styles.form} onSubmit={preventDefault}>
          <p>
            Upload multiple files with the file dialog or by dragging and
            dropping images onto the dashed region
          </p>
          <input
            type="file"
            className={styles.fileInput}
            id="fileInput"
            multiple
            accept="video/*"
            value={formData.video || ""}
            onChange={(event) => {
              updateFormData(event, "video");
              handleFiles(event.target.files);
            }}
            required
          />

          <label className={styles.button} htmlFor="fileInput">
            Select videos
          </label>
        </form>
        {/* <progress
          id="progressBar"
          max="100"
          value="0"
          // ref={progressBarRef}
        ></progress> */}
      </div>
      <div className={styles.videos}>
        {videos?.map((video) => (
          <div key={video.id} className={styles.videoGroup}>
            <label htmlFor={video.id}>
              <div className={styles.actions}>
                <h5 className={styles.duration}>{video.duration}</h5>
                <button
                  className={styles.removeVideo}
                  onClick={() => handelRemove(video)}
                >
                  X
                </button>
              </div>
              <video
                preload="metadata"
                src={video.src}
                onCanPlay={(event) => oncanplay(event, video)}
              ></video>
              <input
                placeholder="Video title..."
                id={video.id}
                value={video.name}
                onChange={(event) => setVideoName(event, video)}
              />
              <p className={uploading ? styles.Uploaded : styles.Uploading}>
                {uploading ? "Uploaded" : "Uploading..."}
              </p>
            </label>
          </div>
        ))}
      </div>
      <button
        type="submit"
        className={styles.save}
        onClick={handleSubmit}
        disabled={loading}
      >
        Upload & Save
      </button>
    </div>
  );
}

export default UploadCourse;
