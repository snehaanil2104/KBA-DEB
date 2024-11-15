import React from 'react'
import Navbar from '../components/Navbar'
import TopCourses from '../components/TopCourses'
import CourseGrid from "../components/CourseGrid";
import courseData from '../data/courses.json'
import ViewAllCoursesButton from '../components/ViewAllCourses';

const Home = () => {
  const topCourses = courseData.slice(0,3);
  return (
    <>
    <Navbar />
    <TopCourses />
    <CourseGrid courses={topCourses}/>
    <ViewAllCoursesButton />
    </>
  )
}

export default Home