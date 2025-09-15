import React, { useState } from 'react';
import { Star, Clock, Users } from 'lucide-react';
import ContentGrid from '../components/ContentGrid';
import { contentData } from '../data/contentData';

const Kids = () => {
  const [activeAge, setActiveAge] = useState<'all' | '0-5' | '6-12' | '13+'>('all');

  const kidsContent = contentData.kidsContent;
  const kidsMovies = contentData.kidsMovies;
  const kidsShows = contentData.kidsShows;

  const allKidsContent = [...kidsContent, ...kidsMovies, ...kidsShows];

  const filteredContent = allKidsContent.filter(item => {
    if (activeAge === 'all') return true;
    return item.ageGroup === activeAge;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-blue-900 to-black">
      {/* Hero Section */}
      <div className="relative h-64 bg-gradient-to-r from-pink-500 to-purple-600">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Kids Zone</h1>
            <p className="text-xl text-gray-100">Safe and fun content for children</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Age Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setActiveAge('all')}
            className={`px-6 py-2 rounded-full transition-colors ${
              activeAge === 'all' ? 'bg-pink-600 text-white' : 'bg-gray-800 text-gray-400 hover:text-white'
            }`}
          >
            All Ages
          </button>
          <button
            onClick={() => setActiveAge('0-5')}
            className={`px-6 py-2 rounded-full transition-colors ${
              activeAge === '0-5' ? 'bg-pink-600 text-white' : 'bg-gray-800 text-gray-400 hover:text-white'
            }`}
          >
            Ages 0-5
          </button>
          <button
            onClick={() => setActiveAge('6-12')}
            className={`px-6 py-2 rounded-full transition-colors ${
              activeAge === '6-12' ? 'bg-pink-600 text-white' : 'bg-gray-800 text-gray-400 hover:text-white'
            }`}
          >
            Ages 6-12
          </button>
          <button
            onClick={() => setActiveAge('13+')}
            className={`px-6 py-2 rounded-full transition-colors ${
              activeAge === '13+' ? 'bg-pink-600 text-white' : 'bg-gray-800 text-gray-400 hover:text-white'
            }`}
          >
            Ages 13+
          </button>
        </div>

        {/* Featured Content */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6">Featured for Kids</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredContent.slice(0, 8).map((item) => (
              <div key={item.id} className="bg-white/10 backdrop-blur-sm rounded-lg overflow-hidden hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                <div className="relative">
                  <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
                  <div className="absolute top-2 left-2 bg-pink-600 text-white px-2 py-1 rounded text-xs font-bold">
                    {item.ageGroup}
                  </div>
                  {item.rating && (
                    <div className="absolute top-2 right-2 bg-yellow-500 text-black px-2 py-1 rounded text-xs font-bold flex items-center">
                      <Star className="w-3 h-3 mr-1 fill-current" />
                      {item.rating}
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                  <div className="flex items-center text-gray-300 text-sm mb-2">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{item.duration || item.year}</span>
                  </div>
                  <p className="text-gray-400 text-sm line-clamp-2">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Educational Content */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6">Educational</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {kidsContent.filter(item => item.genre === 'Educational').map((item) => (
              <div key={item.id} className="bg-green-900/30 backdrop-blur-sm rounded-lg overflow-hidden hover:bg-green-900/50 transition-colors">
                <img src={item.image} alt={item.title} className="w-full h-32 object-cover" />
                <div className="p-4">
                  <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-300 text-sm">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Popular Characters */}
        <div>
          <h2 className="text-3xl font-bold text-white mb-6">Popular Characters</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {['Mickey Mouse', 'Elsa', 'Spider-Man', 'Dora', 'Peppa Pig', 'Paw Patrol'].map((character, index) => (
              <div key={character} className="bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg p-4 text-center hover:from-pink-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 cursor-pointer">
                <div className="w-16 h-16 bg-white/20 rounded-full mx-auto mb-2 flex items-center justify-center">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <span className="text-white font-semibold text-sm">{character}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Kids;