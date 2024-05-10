import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Button } from "./components/ui/button";
import Login from "./components/Login";
import Register from './components/Register';

function App() {
  return (
    <Router>
      <div className="px-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <>
      <h1>Welcome to Home Page</h1>
    </>
  );
}

export default App;
