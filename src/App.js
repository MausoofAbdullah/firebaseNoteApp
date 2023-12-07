import React from 'react'
// import './index.css'
import Header from './components/Header'
import Note from './components/Note'
import Form from './components/Form'
import RegisterAndLogin from './components/RegisterAndLogin'
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className=''>
      <BrowserRouter>
      <Routes>
      <Route
            path="/*"
            element={
              <>
                <Header />
                <Routes>
                  <Route path="/" element={<RegisterAndLogin />} />
                  
                  <Route path="/home" element={<Note/>} />
                  {/* <Route path="/reset" element={<ForgotPassword />} /> */}
                </Routes>
              </>
            }
          />
      </Routes>
      </BrowserRouter>

    
      
      
    </div>
  )
}

export default App
