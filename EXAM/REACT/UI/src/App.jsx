import React from 'react'
import{
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from 'react-router-dom'
import Login from './pages/login'
import Signup from './pages/signup'
import Home from './pages/home'
import AddAppointment from './pages/addappointment'
import Appointments from './pages/Appointments'


const App = () => {
  const router=createBrowserRouter(createRoutesFromElements(
    <>
    {/* public Routes */}
    <Route path="/"element={<Login/>}/>
    <Route path="/signup"element={<Signup/>}/>
  
    <Route path="/home"element={<Home/>}/>
    <Route path="/addappointment"element={<AddAppointment/>}/>
    <Route path="/appointments"element={<Appointments/>}/>
    
    </>
  ))
  return (
  <RouterProvider router={router}/>
  )
}

export default App