import React from 'react'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'

import Home from './Pages/Home.jsx'
import AddCourse from './Pages/AddCourse.jsx'
import CoursePage from './Pages/CoursePage.jsx'
import Contact from './Pages/Contact.jsx'

export const App = () => {
  return (
    <div>
      <Router>
        <Routes>
            {/*Home Pages  1) app lunch avumbol home povum*/}
            <Route path='/' element={<Home />} /> 
            {/*Course Pages  1)*/}
            <Route path='/courses' element={<CoursePage />} /> 
            <Route path='/contact' element={<Contact/>} />
            <Route path='/addcourse' element={<AddCourse />} />
            <Route path='/course/:id' element={<CoursePage />} />


        </Routes>
      </Router>
     

    </div>
  )
}

export default App