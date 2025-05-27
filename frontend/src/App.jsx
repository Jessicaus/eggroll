//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import React from 'react';
import { Routes, Route } from 'react-router-dom';

// add pages
import Login from './Pages/Login';
import Register from './Pages/Register';
import Home from './Pages/Home';
import CreateEvent from './Pages/CreateEvent';
import AttendanceList from './Pages/AttendanceList'
import CheckIn from './Pages/CheckIn';

import { AuthProvider } from './authContext.jsx';

import './App.css';
import Logout from './Pages/Logout.jsx';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path ="/create" element = {<CreateEvent />} />
        <Route path="/attendance" element={<AttendanceList />}
/>
        <Route path="/checkin" element={<CheckIn />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </AuthProvider>
  )
}

export default App;
