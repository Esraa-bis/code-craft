import React, { useEffect, useState } from "react";
// imported components
import HeroSection from "./heroSection.js";
import HomeCoursesSections from "./homeCoursesSections.js";

// styles
import "../assets/css/Home.css";
import { getCoursesFilters } from "../services/course.js";
import { inProgress } from "../services/myLearning.js";

function Home({ signedIn }) {
  const [recommendedForYou, setRecommendedForYou] = useState([]);
  const [mostPopular, setMostPopular] = useState([]);
  const [recentlyAdded, setRecentlyAdded] = useState([]);
  const [freeCourses, setFreeCourses] = useState([]);
  const [, setLoading] = useState(true);
  const [, setError] = useState(null);

  //  for recommended for you
  useEffect(() => {
    inProgress()
      .then((response) => {
        if (response.success) {
          setRecommendedForYou(response.top10UniqueRecommendedCourses);
        } else {
          setError("Failed to fetch courses");
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  });

  // for  recently added
  useEffect(() => {
    const filters = {
      isApproved: true,
      sort: "createdAt desc",
      fields: "-videos",
    };

    getCoursesFilters(filters)
      .then((response) => {
        if (response.success) {
          setRecentlyAdded(response.coursesWithEnrollment);
        } else {
          setError("Failed to fetch courses");
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  });

  // for  free courses
  useEffect(() => {
    const filters = {
      isApproved: true,
      price: "0",
      fields: "-videos",
    };

    getCoursesFilters(filters)
      .then((response) => {
        if (response.success) {
          setFreeCourses(response.coursesWithEnrollment);
        } else {
          setError("Failed to fetch courses");
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  });

  // for most popular
  useEffect(() => {
    const filters = {
      isApproved: true,
      fields: "-videos",
    };
    getCoursesFilters(filters)
      .then((response) => {
        if (response.success) {
          setMostPopular(response.top10Courses);
        } else {
          setError("Failed to fetch courses");
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  });

  return (
    <>
      <HeroSection />
      <h2 className="Explore-Courses-Text"> Explore Courses </h2>
      <main className="main-container">
        {recommendedForYou && recommendedForYou.length > 0 ? (
          <HomeCoursesSections
            sectionTitle="Recommended for you "
            courses={recommendedForYou}
            signedIn={signedIn}
          />
        ) : null}
        {mostPopular && mostPopular.length > 0 ? (
          <HomeCoursesSections
            sectionTitle="Most Popular"
            courses={mostPopular}
            signedIn={signedIn}
          />
        ) : null}
        {recentlyAdded && recentlyAdded.length > 0 ? (
          <HomeCoursesSections
            sectionTitle="Recently Added"
            courses={recentlyAdded}
            signedIn={signedIn}
          />
        ) : null}
        {freeCourses && freeCourses.length > 0 ? (
          <HomeCoursesSections
            sectionTitle=" Start now with zero fees"
            courses={freeCourses}
            signedIn={signedIn}
          />
        ) : null}
      </main>
    </>
  );
}
export default Home;
