import React from 'react'
import {createBrowserRouter,createRoutesFromElements,RouterProvider,Route,} from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import AuthLayout from './layouts/AuthLayout'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import Courses from './pages/Courses'
import Contact from './pages/Contact'
import AddCourse from './pages/AddCourse'
import UpdateCourse from './pages/UpdateCourse'
import  CoursePage,{courseLoader} from './pages/CoursePage'
import NotFound from './pages/NotFound'

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
      {/* public routes */}
      <Route path="/" element={<LoginPage/>} />
      <Route path="/signup" element={<SignupPage/>} />
      <Route path="/login" element={<LoginPage/>} />
      {/* authenticated routes */}
      <Route element={<AuthLayout/>}>
        <Route element={<MainLayout/>} >
        <Route path="/home" element={<Home/>}  />
        <Route path="/courses" element={<Courses/>}  />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/add-course" element={<AddCourse/>} />
        <Route path="/edit-course/:id" element={<UpdateCourse />} loader={courseLoader} /> 
        <Route path="/course/:id" element={<CoursePage />} loader={courseLoader} />
        </Route>
        </Route>
        {/* not found route*/}
        <Route path="*" element={<NotFound />} />
        </>
    )
  )
  return (
    <RouterProvider router={router} />
  )
}

export default App