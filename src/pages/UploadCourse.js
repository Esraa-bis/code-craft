import React, { useState, useRef, useEffect } from "react";
import styles from "../assets/css/UploadCourse.module.css";

function UploadCourse  ()  {
  const [files, setFiles] = useState([]);
  const [filesToDo, setFilesToDo] = useState(0);
  const [filesDone, setFilesDone] = useState(0);
  const dropAreaRef = useRef(null);
  const progressBarRef = useRef(null);

  useEffect(() => {
    const dropArea = dropAreaRef.current;

    const preventDefaults = (e) => {
      e.preventDefault();
      e.stopPropagation();
    };

    ["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
      dropArea.addEventListener(eventName, preventDefaults, false);
    });

    const highlight = () => dropArea.classList.add(styles.highlight);
    const unhighlight = () => dropArea.classList.remove(styles.highlight);

    ["dragenter", "dragover"].forEach((eventName) => {
      dropArea.addEventListener(eventName, highlight, false);
    });

    ["dragleave", "drop"].forEach((eventName) => {
      dropArea.addEventListener(eventName, unhighlight, false);
    });

    const handleDrop = (e) => {
      const dt = e.dataTransfer;
      const files = dt.files;
      handleFiles(files);
    };

    dropArea.addEventListener("drop", handleDrop, false);

    return () => {
      ["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
        dropArea.removeEventListener(eventName, preventDefaults, false);
      });

      ["dragenter", "dragover"].forEach((eventName) => {
        dropArea.removeEventListener(eventName, highlight, false);
      });

      ["dragleave", "drop"].forEach((eventName) => {
        dropArea.removeEventListener(eventName, unhighlight, false);
      });

      dropArea.removeEventListener("drop", handleDrop, false);
    };
  }, []);

  const handleFiles = (fileList) => {
    const newFiles = [...fileList];
    setFiles(newFiles);
    initializeProgress(newFiles.length);
    newFiles.forEach(previewFile);
  };

  const initializeProgress = (numFiles) => {
    setFilesDone(0);
    setFilesToDo(numFiles);
    progressBarRef.current.value = 0;
  };

  const progressDone = () => {
    setFilesDone((prev) => {
      const updatedFilesDone = prev + 1;
      progressBarRef.current.value = (updatedFilesDone / filesToDo) * 100;
      return updatedFilesDone;
    });
  };

  const formatDuration = (durationInSeconds) => {
    const hours = Math.floor(durationInSeconds / 3600);
    const minutes = Math.floor((durationInSeconds % 3600) / 60);
    const seconds = Math.floor(durationInSeconds % 60);

    const formattedHours = hours > 0 ? `${hours}h ` : "";
    const formattedMinutes = minutes > 0 ? `${minutes}m ` : "";
    const formattedSeconds = seconds > 0 ? `${seconds}s` : "";

    return formattedHours + formattedMinutes + formattedSeconds;
  };

  const previewFile = (file, index) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      const group = document.createElement("div");
      const label = document.createElement("label");
      const input = document.createElement("input");
      const video = document.createElement("video");
      const duration = document.createElement("h5");
      const del = document.createElement("button");
      const actions = document.createElement("div");

      group.className = styles.videoGroup;
      actions.className = styles.actions;
      duration.className = styles.duration;
      del.className = styles.removeVideo;

      del.innerText = "X";
      del.onclick = () => {
        const confirmed = window.confirm(
          "Are you sure you want to remove this video?"
        );
        if (confirmed) {
          setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
          group.remove();
        }
      };

      input.placeholder = "Video title...";
      input.value = file.name.replace(/\.[A-Za-z0-9]{0,}$/, "");
      input.id = `video${index}`;

      label.setAttribute("for", `video${index}`);
      video.src = reader.result;
      video.preload = "metadata";
      duration.innerText = "0s";

      video.oncanplay = () => {
        duration.innerText = formatDuration(video.duration || 0);
      };

      group.appendChild(label);
      actions.append(duration);
      actions.append(del);
      label.appendChild(actions);
      label.appendChild(video);
      label.appendChild(input);
      document.querySelector(`.${styles.videos}`).appendChild(group);
    };
  };

  return (
    <div className={styles.courseForm}>
      <h1>My Course Title Content</h1>
      <div className={styles.dropArea} ref={dropAreaRef}>
        <form className={styles.form}>
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
            onChange={(e) => handleFiles(e.target.files)}
          />
          <label className={styles.button} htmlFor="fileInput">
            Select videos
          </label>
        </form>
        <progress
          id="progressBar"
          max="100"
          value="0"
          ref={progressBarRef}
        ></progress>
      </div>
      <div className={styles.videos}></div>
      <button type="button" className={styles.save}>
        Upload & Save
      </button>
    </div>
  );
};

export default UploadCourse;
