import React from 'react'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'

import Home from './pages/Home.jsx'
import AddCourse from './pages/AddCourse.jsx'
import CoursePage from './pages/CoursePage.jsx'
import Contact from './pages/Contact.jsx'
import UpdateCourse from './pages/UpdateCourse.jsx'
import NotFound  from './pages/NotFound.jsx'
import Courses from './pages/Courses.jsx' 

 const App = () => {
  return (
    
      <Router>
        <Routes>
            {/*Home Pages*/}
            <Route path='/' element={<Home />} /> 
            {/*Course Page*/}
            <Route path='/courses' element={<Courses />} /> 
             {/*Contact Page*/}
            <Route path='/contact' element={<Contact/>} />
             {/*Add Course*/}
            <Route path='/addcourse' element={<AddCourse />} />
             {/*Course Details Page*/}
            <Route path='/course/:id' element={<CoursePage />} />
             {/*Update Course Page*/}
             <Route path='/edit-course/:id' element={<UpdateCourse />} />
              {/*Not Found*/}
              <Route path='/*' element={<NotFound />} />

        </Routes>
      </Router>
     

   
  )
}

export default App