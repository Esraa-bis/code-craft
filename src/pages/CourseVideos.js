import { useEffect, useState } from "react";
import styles from "../assets/css/CourseVideos.module.css";
// Link
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useLocation } from "react-router-dom";
import { courseVideos } from "../services/course";
import { courseProgress, updateProgress } from "../services/myLearning";

function CourseVideos() {
  // function to format index
  function formatOrder(order) {
    return String(order + 1).padStart(2, "0");
  }
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  const query = useQuery();
  const courseId = query.get("courseId");
  const [videos, setVideos] = useState([]);
  const [progress, setProgress] = useState({});
  const [error, setError] = useState(null);
  const [loaded, setLoaded] = useState(() => false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  let loading = false;
  const setLoading = (value) => {
    loading = value;
  };

  useEffect(() => {
    if (loaded || loading) return;
    setLoading(true);
    courseVideos(courseId)
      .then((response) => {
        if (response.success) {
          setVideos(() => response.videos);
          setLoaded(true);
        } else {
          setError("Failed to fetch videos");
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
    courseProgress(courseId)
      .then((response) => {
        if (response.success) {
          setProgress(() => response.courseEnrolled);
          setLoaded(true);
        } else {
          setError("Failed to fetch videos");
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [courseId]);

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
  };

  useEffect(() => {
    // Set the selected video to the first video in the array when the component mounts
    if (videos && videos.length > 0) {
      setSelectedVideo(videos[0]);
    }
  }, [videos]); // Run this effect whenever the `videos` array changes

  // navigate through vedios
  const handleNextVideo = () => {
    const currentIndex = videos.findIndex((video) => video === selectedVideo);
    const nextIndex = (currentIndex + 1) % videos.length;
    setSelectedVideo(videos[nextIndex]);
  };

  const handlePreviousVideo = () => {
    const currentIndex = videos.findIndex((video) => video === selectedVideo);
    const previousIndex = (currentIndex - 1 + videos.length) % videos.length;
    setSelectedVideo(videos[previousIndex]);
  };
  // update progress
  const handleUpdateProgress = async (videoId) => {
    if (courseCompleted(videoId)) return;
    try {
      const result = await updateProgress(courseId, videoId);
      // Handle the result as needed
    } catch (error) {
      console.error("Error updating progress:", error);
    }
  };

  const courseCompleted = (videoId) => {
    return progress?.lessons?.indexOf(videoId) >= 0;
  };

  return (
    <section className={styles.CourseVideos}>
      <div className={styles.CourseContent}>
        <div className={styles.description}>
          <img
            src={videos[0]?.course?.image.url}
            alt="courseImg"
            className={styles.courseImg}
          />
          <div>
            <h6>
              <Link
                to={`/ViewCourse?courseId=${courseId}`}
                className={styles.title}
              >
                {videos[0]?.course?.courseName}
              </Link>
            </h6>
          </div>
        </div>
        <div>
          {videos?.map((video) => (
            <ul key={video.video.id}>
              <li
                className={`${styles.done} ${
                  selectedVideo === video ? styles.active : ""
                }`}
                onClick={() => handleVideoClick(video)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke={courseCompleted(video?._id) ? "#0054ad" : "#333"}
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                <button
                  className={`${styles.videoTitle} ${
                    courseCompleted(video?._id) ? styles.completed : ""
                  }`}
                  type="button"
                  onClick={() => setSelectedVideo(() => video)}
                >
                  <span className={styles.videoOrder}>00{video.order} </span>
                  {video.title}
                </button>
              </li>
            </ul>
          ))}
        </div>
      </div>
      <div>
        {selectedVideo && (
          <div className={styles.CourseVideosPlayer}>
            <div>
              <h2 className={styles.videoName}>{selectedVideo.title}</h2>
              <video
                controls
                className={styles.video}
                preload="auto"
                src={selectedVideo.video?.url}
                onEnded={() => handleUpdateProgress(selectedVideo._id)}
              >
                <source src={selectedVideo.video?.url} type="video/mp4" />
                <source src={selectedVideo.video?.url} type="video/ogg" />
                Your browser does not support the video tag.
              </video>
              <div className={styles.Arrows}>
                {/* <button>
                  <label>
                    <input
                      type="checkbox"
                      checked={courseCompleted(selectedVideo._id)}
                    />
                    Completed
                  </label>
                </button> */}
                <div>
                  <button onClick={handlePreviousVideo}>
                    <FontAwesomeIcon icon={faChevronLeft} />
                  </button>
                  <button onClick={handleNextVideo}>
                    <FontAwesomeIcon icon={faChevronRight} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default CourseVideos;
