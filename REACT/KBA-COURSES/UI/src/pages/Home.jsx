import React from 'react'
import Hero from '../components/Hero'
import TopCourses from '../components/TopCourses'
import CourseGrid from "../components/CourseGrid";
import ViewAllCoursesButton from '../components/ViewAllCourses';
import MainLayout from '../layouts/MainLayout';

const Home = () => {
  return (
    <MainLayout>
    <Hero />
    <TopCourses />
    <CourseGrid isHome={true}/>
    <ViewAllCoursesButton />
    </MainLayout>
  )
}

export default Home