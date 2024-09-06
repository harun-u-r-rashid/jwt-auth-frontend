import { useState } from "react"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Signup from "./components/Signup"
import Login from "./components/Login"
import Profile from "./components/Profile"
import VerifyEmail from "./components/VerifyEmail"
import "react-toastify/dist/ReactToastify.css";

import { ToastContainer } from 'react-toastify'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Signup />} />

          <Route path="verify/" element={<VerifyEmail />} />

          <Route path="login/" element={<Login />} />

          <Route path="profile/" element={<Profile />} />


        </Routes>
      </Router>
    </>
  )
}

export default App
