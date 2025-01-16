import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './Pages/Home';
import About from './Pages/About';
import Gallery from './Pages/Gallery';
import Calculator from './Pages/Calculator';
import MosoBamboo from './Pages/MosoBamboo';
import ContactUs from './Pages/ContactUs';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/MosoBamboo" element={<MosoBamboo />} />
        <Route path="/Gallery" element={<Gallery />} />
        <Route path="/Calculator" element={<Calculator />} />
        <Route path="/About" element={<About />} />
        <Route path="/ContactUs" element={<ContactUs />} />
      </Routes>
    </Router>
  );
}

export default App;
