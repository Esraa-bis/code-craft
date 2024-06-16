// for translate into arabic
//
import "../assets/css/HomeCoursesSections.css";
import CourseCard from "./CourseCard";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper/modules";
import "../assets/css/Home.css";
import { convertMinutes } from "../services/generalFunctions.js";

//   {
//     img: CardImg1,
//     title: "Introduction to Web Development",
//     description:
//       "Learn the basics of HTML, CSS, and JavaScript to kickstart your web development journeyLearn the basics of HTML, CSS, and JavaScript to kickstart your web development journeyLearn the basics of HTML, CSS, and JavaScript to kickstart your web development journeyLearn the basics of HTML, CSS, and JavaScript to kickstart your web development journey. ",
//     price: "49.99",
//     time: "3",
//     rating: "3.9",
//   },
//   {
//     img: CardImg1,
//     title: "Introduction to Web Development",
//     description:
//       "Learn the basics of HTML, CSS, and JavaScript to kickstart your web development journeyLearn the basics of HTML, CSS, and JavaScript to kickstart your web development journeyLearn the basics of HTML, CSS, and JavaScript to kickstart your web development journeyLearn the basics of HTML, CSS, and JavaScript to kickstart your web development journey. ",
//     price: "49.99",
//     time: "3",
//     rating: "3.9",
//   },
//   {
//     img: CardImg1,
//     title: "Introduction to Web Development",
//     description:
//       "Learn the basics of HTML, CSS, and JavaScript to kickstart your web development journeyLearn the basics of HTML, CSS, and JavaScript to kickstart your web development journeyLearn the basics of HTML, CSS, and JavaScript to kickstart your web development journeyLearn the basics of HTML, CSS, and JavaScript to kickstart your web development journey. ",
//     price: "49.99",
//     time: "3",
//     rating: "3.9",
//   },
//   {
//     img: CardImg1,
//     title: "Introduction to Web Development",
//     description:
//       "Learn the basics of HTML, CSS, and JavaScript to kickstart your web development journeyLearn the basics of HTML, CSS, and JavaScript to kickstart your web development journeyLearn the basics of HTML, CSS, and JavaScript to kickstart your web development journeyLearn the basics of HTML, CSS, and JavaScript to kickstart your web development journey. ",
//     price: "49.99",
//     time: "3",
//     rating: "3.9",
//   },
//   {
//     img: CardImg2,
//     title: "Python Programming for Beginners",
//     description:
//       "Discover the power of Python programming language with hands-on projects and exercises.",
//     price: "59.99",
//     time: "2",
//     rating: "3.9",
//   },
//   {
//     img: CardImg1,
//     title: "Introduction to Web Development",
//     description:
//       "Learn the basics of HTML, CSS, and JavaScript to kickstart your web development journey.",
//     price: "49.99",
//     time: "3",
//     rating: "3.9",
//   },
//   {
//     img: CardImg1,
//     title: "Python Programming for Beginners",
//     description:
//       "Discover the power of Python programming language with hands-on projects and exercises.",
//     price: "59.99",
//     time: "2",
//     rating: "3.9",
//   },
// ];
const breakpoints = {
  // Define breakpoints and number of slides per view
  220: {
    slidesPerView: 1,
    spaceBetween: 20,
  },
  480: {
    slidesPerView: 2,
    spaceBetween: 30,
  },
  768: {
    slidesPerView: 3,
    spaceBetween: 40,
  },
  1024: {
    slidesPerView: 4,
    spaceBetween: 50,
  },
};

function HomeCoursesSections({ sectionTitle, courses, signedIn }) {
  return (
    <section className="HomeCoursesSections">
      <h2 className="section-title">{sectionTitle}</h2>
      <Swiper
        navigation={true}
        modules={[Navigation]}
        slidesPerView={4}
        breakpoints={breakpoints}
      >
        {courses?.map((course, index) => (
          <SwiperSlide key={index}>
            <CourseCard
              course={{
                img: course.image.url,
                title: course.courseName,
                description: course.desc,
                price: course.basePrice,
                time: convertMinutes(course.courseDuration),
                rating: course.rate,
                _id: course._id,
              }}
              signedIn={signedIn}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

export default HomeCoursesSections;
