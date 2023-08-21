import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import the Routes component
import Header from './components/Header';
import Home from './components/Home';
import Footer from './components/Footer';
import FamilyList from './components/FamilyList';
import GenusList from './components/GenusList';
import SpeciesList from './components/SpeciesList';
import FamilyDetail from './components/FamilyDetail';
import GenusDetail from './components/GenusDetail';
import SpeciesDetail from './components/SpeciesDetail';
import './App.css'; // Import the App.css file

function App() {
  return (
    <Router>
      <Header />
      <div className="container"> {/* Use className to apply styles */}
        <Routes> {/* Wrap your Route components with Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/families" element={<FamilyList />} />
          <Route path="/genera" element={<GenusList />} />
          <Route path="/species" element={<SpeciesList />} />
          <Route path="/families/:id" element={<FamilyDetail />} />
          <Route path="/genera/:id" element={<GenusDetail />} />
          <Route path="/species/:id" element={<SpeciesDetail />} />
          {/* You can add more Route elements here */}
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
