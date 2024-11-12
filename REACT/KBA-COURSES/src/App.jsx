import React from 'react'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import TopCourses from './components/TopCourses.jsx'
import CourseGrid from './components/CourseGrid.jsx'
import courseData from './data/courses.json'
import ViewAllCourses from './components/ViewAllCourses.jsx'

const App = () => {
  return (
    <div>
      <Navbar />
      <Hero/>
      <TopCourses />
      <CourseGrid courses={courseData} />
      
      <ViewAllCourses />
    </div>
  )
}

export default App