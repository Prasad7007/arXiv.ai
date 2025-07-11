import React from "react"
import {BrowserRouter, Routes, Route} from "react-router-dom"
import NavBar from "./components/NavBar"
import Dashboard from "./pages/Dashboard"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import Weekly from "./pages/Weekly"
import Summerizer from "./pages/Summerizer"
import AboutUs from "./pages/AboutUs"
import Paper from "./pages/Paper"
import NoPage from "./pages/NoPage"

function App() {
  
  return (
    <div>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/weekly" element={<Weekly />} />
          <Route path="/summerizer" element={<Summerizer />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/paper" element={<Paper />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
