// styles
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import styles from "../assets/css/courses.module.css";
import CourseCard from "../components/CourseCard";
import TablePagination from "../components/TablePagination.js";
import { getCoursesFilters } from "../services/course";
import { convertMinutes } from "../services/generalFunctions.js";
import CourseFilters from "./CourseFilters.js";

function Courses({ signedIn, keyword }) {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);
  const [page, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState(() => ({
    categories: [],
    level: [],
    isApproved: true,
  }));

  let loading = false;
  const setLoading = (value) => {
    loading = value;
  };

  const filterCourses = () => {
    setLoading(() => true);
    getCoursesFilters({ ...filters, keyword, page })
      .then((response) => {
        if (response.success) {
          setCourses(response.coursesWithEnrollment);
          setTotal(() => response.total);
        } else {
          setError("Failed to fetch courses");
        }
        setLoading(() => false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(() => false);
      });
  };
  useEffect(() => {
    if (loading) return;
    filterCourses();
  }, [filters, keyword]);
  //
  //
  const [filtersVisible, setFiltersVisible] = useState(false);

  const toggleFiltersVisibility = () => {
    setFiltersVisible(!filtersVisible);
  };
  return (
    <>
      <button className={styles.filtersBtn} onClick={toggleFiltersVisibility}>
        <FontAwesomeIcon icon={faFilter} /> Filters
      </button>
      <section className={styles.CoursesFilters}>
        {/* filter section */}
        <CourseFilters
          filters={filters}
          setFilters={setFilters}
          filtersVisible={filtersVisible}
        />
        <div className={styles.Courses}>
          {courses?.map((course, index) => (
            <CourseCard
              key={index}
              course={{
                img: course?.image.url,
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
      <TablePagination
        total={total}
        onPageChange={(page) => {
          setCurrentPage(page);
          setFilters((f) => {
            const filters = { ...f, page };
            filterCourses(filters);
            return filters;
          });
        }}
      />
    </>
  );
}
export default Courses;
