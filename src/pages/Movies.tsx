import React, { useState } from 'react';
import { Filter, Grid, List } from 'lucide-react';
import ContentGrid from '../components/ContentGrid';
import FilterSidebar from '../components/FilterSidebar';
import { contentData } from '../data/contentData';

const Movies = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    genre: '',
    year: '',
    rating: '',
    sortBy: 'popularity'
  });

  const allMovies = [
    ...contentData.trending.filter(item => item.type === 'movie'),
    ...contentData.actionMovies,
    ...contentData.comedyMovies,
    ...contentData.dramaMovies,
    ...contentData.horrorMovies,
    ...contentData.sciFiMovies
  ];

  const filteredMovies = allMovies.filter(movie => {
    if (filters.genre && movie.genre !== filters.genre) return false;
    if (filters.year && movie.year !== filters.year) return false;
    if (filters.rating && parseFloat(movie.rating || '0') < parseFloat(filters.rating)) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <div className="relative h-64 bg-gradient-to-r from-blue-900 to-purple-900">
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Movies</h1>
            <p className="text-xl text-gray-200">Discover thousands of movies across all genres</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <Filter className="w-4 h-4" />
              <span>Filters</span>
            </button>
            <span className="text-gray-400">{filteredMovies.length} movies</span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400'}`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400'}`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar */}
          {showFilters && (
            <div className="w-64 flex-shrink-0">
              <FilterSidebar filters={filters} setFilters={setFilters} />
            </div>
          )}

          {/* Content */}
          <div className="flex-1">
            <ContentGrid items={filteredMovies} viewMode={viewMode} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Movies;