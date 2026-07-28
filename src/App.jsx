import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Journey from './pages/Journey';
import Bhairavam from './pages/Bhairavam';
import Yatra from './pages/Yatra';
import Products from './pages/Products';
import SpiritualActivities from './pages/SpiritualActivities';
import AdminDashboard from './pages/AdminDashboard';
import Contact from './pages/Contact';
import DhoDam from './pages/DhoDam';
import PanchaBhuta from './pages/PanchaBhuta';
import Kasi from './pages/Kasi';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/journey" element={<Journey />} />
        <Route path="/bhairavam" element={<Bhairavam />} />
        <Route path="/yatra" element={<Yatra />} />
        <Route path="/products" element={<Products />} />
        <Route path="/spiritual-activities" element={<SpiritualActivities />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/dho-dham" element={<DhoDam />} />
           <Route path="/pancha-bhuta" element={<PanchaBhuta />} />
           <Route path="/kasi" element={<Kasi />} />

      </Routes>
    </Router>
  );
}

export default App;
