// styles
import { useEffect, useState } from "react";
import styles from "../assets/css/courses.module.css";
import CourseCard from "../components/CourseCard";
import { getCoursesFilters } from "../services/course";
import { convertMinutes } from "../services/generalFunctions.js";
import CourseFilters from "./CourseFilters.js";

function Courses({ signedIn }) {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState(() => ({
    categories: [],
    level: [],
    isApproved: true,
  }));

  let loading = false;
  const setLoading = (value) => {
    loading = value;
  };
  useEffect(() => {
    if (loading) return;
    setLoading(() => true);
    getCoursesFilters(filters)
      .then((response) => {
        if (response.success) {
          setCourses(response.coursesWithEnrollment);
        } else {
          setError("Failed to fetch courses");
        }
        setLoading(() => false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(() => false);
      });
  }, [filters]);

  return (
    <section className={styles.CoursesFilters}>
      {/* filter section */}
      <CourseFilters filters={filters} setFilters={setFilters} />
      <div className={styles.Courses}>
        {courses?.map((course, index) => (
          <CourseCard
            key={index}
            course={{
              img: course.image.url,
              title: course.courseName,
              description: course.desc,
              price: course.basePrice,
              time: convertMinutes(course.courseDuration),
              rating: course.rate,
              slug: course.slug,
              _id: course._id,
            }}
            signedIn={signedIn}
          />
        ))}
      </div>
    </section>
  );
}
export default Courses;
