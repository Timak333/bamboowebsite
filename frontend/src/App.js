import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './Pages/Home';
import About from './Pages/About';
import Gallery from './Pages/Gallery';
import EcoCalculator from './Pages/EcoCalculator';
import MosoBamboo from './Pages/MosoBamboo';
import ResultsPage from './Pages/ResultsPage';
import PreviousResults from './Pages/PreviousResults';
import ViewGallery from './Pages/ViewGallery';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/MosoBamboo" element={<MosoBamboo />} />
        <Route path="/Gallery" element={<Gallery />} />
        <Route path="/EcoCalculator" element={<EcoCalculator />} />
        <Route path="/About" element={<About />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/PreviousResults" element={<PreviousResults />} />
        <Route path="/ViewGallery" element={<ViewGallery />} />
      </Routes>
    </Router>
  );
}

export default App;
