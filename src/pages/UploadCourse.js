import React, { useEffect, useState } from "react";
import styles from "../assets/css/UploadCourse.module.css";
import {
  courseVideos,
  deleteSpceficVideo,
  updateCourseVideos,
  uploadCourseVideo,
} from "../services/course";
import { sweetAlert } from "../services/sweetalert";
let loadingContent = false;
const setLoadingContent = (val) => {
  loadingContent = val;
};
function UploadCourse() {
  const [videos, setVideos] = useState(() => []);
  const [error, setError] = useState(null);
  const [loaded, setLoaded] = useState(() => false);
  const [courseId] = useState(() => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("id") || urlParams.get("courseId");
  });

  const [formData, setFormData] = useState({});
  const [highlight, setHighlight] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState("");
  const [videosToRemove, setVideosToRemove] = useState(() => []);

  useEffect(() => {
    if (loaded || loadingContent) return;
    setLoadingContent(true);
    courseVideos(courseId)
      .then((response) => {
        if (response.success) {
          setVideos((videos) => [
            ...videos,
            ...response.videos.map((video) => ({
              id: video._id,
              name: video.title,
              src: video.video.url,
              preload: "metadata",
              duration: video.duration,
              uploaded: true,
            })),
          ]);
          setLoaded(true);
        } else {
          setError("Failed to fetch videos");
        }
        setLoadingContent(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoadingContent(false);
      });
  }, [courseId]);

  const setVideoName = (event, video) => {
    video.title_changed = event.target.value !== video.name;
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
          uploaded: false,
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
      setVideosToRemove((videos) => [...videos, file]);
      setVideos((videos) => videos.filter((video) => video !== file));
    }
  };

  const oncanplay = (event, video) => {
    video.duration = formatDuration(event.target.duration || 0);
    setVideos((videos) => [...videos]);
  };

  const uploadVideo = async (video) => {
    try {
      const response = await uploadCourseVideo({
        courseID: courseId,
        title: video.name,
        video: video.file,
      });
      if (response.success) {
        video.uploaded = true;
        setUploading("Uploaded");
        sweetAlert({
          title: response.message,
          icon: response.success ? "success" : "error",
        });
      } else {
        sweetAlert({ title: response.message, icon: "error" });
      }
    } catch (error) {
      sweetAlert({ title: error.message, icon: "error" });
    }
  };

  const updateVideo = async (video) => {
    try {
      const response = await updateCourseVideos(courseId, video.id, video.name);
      if (!response.success) {
        sweetAlert({ title: response.message, icon: "error" });
      }
    } catch (error) {
      sweetAlert({ title: error.message, icon: "error" });
    }
  };

  const removeVideo = async (video) => {
    try {
      await deleteSpceficVideo(courseId, video.id);
    } catch (error) {
      sweetAlert({ title: error.message, icon: "error" });
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setUploading("uploading...");

    setLoading(true);
    for (let i = 0; i < videos.length; ++i) {
      const video = videos[i];
      if (!video.uploaded) {
        await uploadVideo(video);
      } else if (video.title_changed) {
        await updateVideo(video);
      }
    }

    for (let i = 0; i < videosToRemove.length; ++i) {
      const video = videosToRemove[i];
      await removeVideo(video);
      if (i === videosToRemove.length - 1) {
        setVideosToRemove(() => []);
      }
    }

    setLoading(false);
    setUploading("");
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
      {/* <h1>My Course Title Content</h1> */}
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
              <p
                className={
                  uploading === "uploading..."
                    ? styles.Uploading
                    : styles.Uploaded
                }
              >
                {uploading}
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
