// styles 
import "../assets/css/UploadVideos.css"
import React, { useState } from "react";

const UploadVideos = () => {
  const [files, setFiles] = useState([]);
  const [progress, setProgress] = useState(0);

  const handleDrop = (e) => {
    e.preventDefault();
    const dt = e.dataTransfer;
    const droppedFiles = dt.files;
    handleFiles(droppedFiles);
  };

  const handleFiles = (droppedFiles) => {
    const newFiles = [...droppedFiles];
    setFiles([...files, ...newFiles]);
    initializeProgress(newFiles.length);
    newFiles.forEach(previewFile);
  };

  const initializeProgress = (numFiles) => {
    setProgress(0);
  };

  const progressDone = () => {
    setProgress((prevProgress) => prevProgress + (1 / files.length) * 100);
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

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function () {
      const videoGroup = document.createElement("div");
      const label = document.createElement("label");
      const input = document.createElement("input");
      const videoElement = document.createElement("video");
      const durationElement = document.createElement("h5");
      const removeButton = document.createElement("button");

      const handleRemove = () => {
        const confirmed = window.confirm(
          "Are you sure you want to remove this video?"
        );
        if (confirmed) {
          setFiles(files.filter((f) => f !== file));
          videoGroup.remove();
        }
      };

      videoGroup.classList.add("videoGroup");
      durationElement.classList.add("duration");
      removeButton.innerText = "X";
      removeButton.classList.add("removeVideo");
      removeButton.onclick = handleRemove;

      input.placeholder = "Video title...";
      input.value = file.name.replace(/\.[A-Za-z0-9]{0,}$/, "");
      input.id = "video" + files.indexOf(file);

      label.setAttribute("for", "video" + files.indexOf(file));

      durationElement.classList.add("duration");

      videoElement.src = reader.result;
      videoElement.preload = "metadata";
      durationElement.innerText = "0s";
      videoElement.oncanplay = () => {
        durationElement.innerText = formatDuration(videoElement.duration || 0);
      };

      videoGroup.appendChild(label);
      videoGroup.appendChild(durationElement);
      videoGroup.appendChild(removeButton);
      label.appendChild(videoElement);
      label.appendChild(input);
      document.querySelector(".videos").appendChild(videoGroup);
    };
  };

  const handleFileInputChange = (e) => {
    const selectedFiles = e.target.files;
    handleFiles(selectedFiles);
  };

  return (
    <div className="courseForm">
      <h1>My Course Title Content</h1>
      <div
        className="dropArea"
        onDrop={handleDrop}
        onDragEnter={(e) => e.preventDefault()}
        onDragOver={(e) => e.preventDefault()}
      >
        <form className="form">
          <p>
            Upload multiple files with the file dialog or by dragging and
            dropping images onto the dashed region
          </p>
          <input
            type="file"
            id="fileInput"
            multiple
            accept="video/*"
            onChange={handleFileInputChange}
          />
          <label className="button" htmlFor="fileInput">
            Select videos
          </label>
        </form>
        <progress id="progressBar" max={100} value={progress}></progress>
      </div>
      <div className="videos"></div>
      <button
        type="button"
        className="save"
        onClick={() => console.log("Upload & Save")}
      >
        Upload & Save
      </button>
    </div>
  );
};

export default UploadVideos;
