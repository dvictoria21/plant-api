import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Footer from './components/Footer';
import FamilyList from './components/FamilyList';
import GenusList from './components/GenusList';
import SpeciesList from './components/SpeciesList';
import FamilyDetail from './components/FamilyDetail';
import GenusDetail from './components/GenusDetail';
import SpeciesDetail from './components/SpeciesDetail';
import './App.css';

function App() {
  return (
    <Router>
      <Header />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/families" element={<FamilyList />} />
          <Route path="/genera" element={<GenusList />} />
          <Route path="/species" element={<SpeciesList />} />
          <Route path="/families/:familyName" element={<FamilyDetail />} />
          <Route path="/genera/:genusName" element={<GenusDetail />} />
          <Route path="/species/:speciesName" element={<SpeciesDetail />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
