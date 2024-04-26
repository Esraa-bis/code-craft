// for translate into arabic
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';
import cookies from 'js-cookie';
import { useEffect } from "react";
// 
import CourseCard from './CourseCard';
import CardImg1 from '../images/css.avif';
import CardImg2 from '../images/js.avif';
import '../css/HomeCoursesSections.css';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';



// import required modules
import { Navigation } from 'swiper/modules';
import '../css/Home.css'

       const courses = [
        {
            img: CardImg1,
            title: 'Introduction to Web Development',
            description:
                'Learn the basics of HTML, CSS, and JavaScript to kickstart your web development journeyLearn the basics of HTML, CSS, and JavaScript to kickstart your web development journeyLearn the basics of HTML, CSS, and JavaScript to kickstart your web development journeyLearn the basics of HTML, CSS, and JavaScript to kickstart your web development journey. ',
            price: '49.99',
            time: '3',
            rating: '3.9',
        },
         {
            img: CardImg1,
            title: 'Introduction to Web Development',
            description:
                'Learn the basics of HTML, CSS, and JavaScript to kickstart your web development journeyLearn the basics of HTML, CSS, and JavaScript to kickstart your web development journeyLearn the basics of HTML, CSS, and JavaScript to kickstart your web development journeyLearn the basics of HTML, CSS, and JavaScript to kickstart your web development journey. ',
            price: '49.99',
            time: '3',
            rating: '3.9',
        },
         {
            img: CardImg1,
            title: 'Introduction to Web Development',
            description:
                'Learn the basics of HTML, CSS, and JavaScript to kickstart your web development journeyLearn the basics of HTML, CSS, and JavaScript to kickstart your web development journeyLearn the basics of HTML, CSS, and JavaScript to kickstart your web development journeyLearn the basics of HTML, CSS, and JavaScript to kickstart your web development journey. ',
            price: '49.99',
            time: '3',
            rating: '3.9',
        },
         {
            img: CardImg1,
            title: 'Introduction to Web Development',
            description:
                'Learn the basics of HTML, CSS, and JavaScript to kickstart your web development journeyLearn the basics of HTML, CSS, and JavaScript to kickstart your web development journeyLearn the basics of HTML, CSS, and JavaScript to kickstart your web development journeyLearn the basics of HTML, CSS, and JavaScript to kickstart your web development journey. ',
            price: '49.99',
            time: '3',
            rating: '3.9',
        },
        {
            img: CardImg2,
            title: 'Python Programming for Beginners',
            description: 'Discover the power of Python programming language with hands-on projects and exercises.',
            price: '59.99',
            time: '2',
            rating: '3.9',
        },
        {
            img: CardImg1,
            title: 'Introduction to Web Development',
            description: 'Learn the basics of HTML, CSS, and JavaScript to kickstart your web development journey.',
            price: '49.99',
            time: '3',
            rating: '3.9',
        },
        {
            img: CardImg1,
            title: 'Python Programming for Beginners',
            description: 'Discover the power of Python programming language with hands-on projects and exercises.',
            price: '59.99',
            time: '2',
            rating: '3.9',
        },
    ];
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

    function HomeCoursesSections(props) {
  const { t } = useTranslation();
  const lng = cookies.get('i18next') || "en";
  useEffect(() => {
    window.document.dir = i18n.dir();
  },[lng]
  )
return (
      
      <section className='HomeCoursesSections'>
           <h2 className="section-title">{props.sectionTitle}</h2>
      <Swiper navigation={true} modules={[Navigation]} slidesPerView={4} breakpoints={breakpoints} >
        
         {courses.map((course, index) => (
                    <SwiperSlide key={index}>
                        <CourseCard
                            img={course.img}
                            title={course.title}
                            description={course.description}
                            price={course.price}
                            time={course.time}
                            rating={course.rating}
                        />
                    </SwiperSlide>
                ))}
      </Swiper>
    </section>
  );
}


export default HomeCoursesSections;


