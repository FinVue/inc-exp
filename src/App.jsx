import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/MainNavbar';
import IncExp from './pages/inc_exp';
import TaxCalc from './pages/tax_calc';
import EmergencyCalc from './pages/emergency_calc';
import Login from "./components/Login";
import Register from './components/Register';

function App() {
  return (
    <Router>
      <div className="px-20">
        <Routes>
          <Route path="/" element={<StartUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/homepage" element={<Homepage />} />
          {/* Add routes for new components */}
          <Route path="/IncExp" element={<IncExp />} />
          <Route path="/TaxCalc" element={<TaxCalc />} />
          <Route path="/EmergencyCalc" element={<EmergencyCalc />} />
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
