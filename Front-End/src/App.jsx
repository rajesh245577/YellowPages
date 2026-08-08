
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import Navbar  from './Navbar/Navbar'
import Login from './Login/Login'
import CreateAccount  from "./CreateAccount/CreateAccount";
import Contact from "./Contact/contact"
import About from "./About/About";
import Add from './AddWorkers/Addworker';
import WorkerProfile from "./WorkerProfile/WorkerProfile";
import WorkerListPage from "./Home/WorkersListPage";
import UserHome from "./Home/UserHome"

function App() {
  return (
    <Router>
      <Navbar /> 
     
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/Create" element={<CreateAccount />} />
        <Route path="/Add" element={<Add /> } />
        <Route path='/userHome/:email' element={<UserHome/>} />
        <Route path="worker/:id" element={<WorkerProfile/>} />
        <Route path="/userHome/:email/workers/:type" element={<WorkerListPage /> } />
      </Routes>
      
      <About />
    </Router>
    
  );
}

export default App;
