import React from 'react'
import MainLayout from '../layouts/MainLayout'
import CourseGrid from '../components/CourseGrid'
import courseData from '../data/courses.json'

const Courses = () => {
  return (
    <MainLayout>
        <h1 className='text-center text-2xl font-bold mt-10'>All Courses</h1>
        <CourseGrid courses={courseData}/>
    </MainLayout>
  )
}

export default Courses