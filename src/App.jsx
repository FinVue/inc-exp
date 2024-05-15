import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./components/Login";
import Register from './components/Register';
import Navbar from './components/navbar';

function App() {
  return (
    <Router>
      <div className="px-20">
        <Routes>
          <Route path="/" element={<StartUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/homepage" element={<Homepage />} />
        </Routes>
      </div>
    </Router>
  );
}

function Homepage() {
  return (
    <>
      <Navbar />
    </>
  );
}

function StartUp() {
  return (
    <>
      <h1>Welcome to startup page</h1>
    </>
  );
}

export default App;
