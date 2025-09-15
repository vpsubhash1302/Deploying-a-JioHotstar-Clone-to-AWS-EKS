import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Movies from './pages/Movies';
import TVShows from './pages/TVShows';
import Sports from './pages/Sports';
import Kids from './pages/Kids';
import Search from './pages/Search';

function App() {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      <main className="pt-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/tv-shows" element={<TVShows />} />
          <Route path="/sports" element={<Sports />} />
          <Route path="/kids" element={<Kids />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;