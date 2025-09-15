import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search as SearchIcon, Filter, X } from 'lucide-react';
import ContentGrid from '../components/ContentGrid';
import { contentData } from '../data/contentData';

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [filters, setFilters] = useState({
    type: '',
    genre: '',
    year: '',
    rating: ''
  });
  const [showFilters, setShowFilters] = useState(false);

  // Combine all content for search
  const allContent = [
    ...contentData.trending,
    ...contentData.popularShows,
    ...contentData.actionMovies,
    ...contentData.comedyMovies,
    ...contentData.dramaMovies,
    ...contentData.horrorMovies,
    ...contentData.sciFiMovies,
    ...contentData.documentaries,
    ...contentData.comedyShows,
    ...contentData.dramaShows,
    ...contentData.sciFiShows,
    ...contentData.realityShows,
    ...contentData.kidsContent,
    ...contentData.kidsMovies,
    ...contentData.kidsShows
  ];

  // Filter content based on search query and filters
  const filteredContent = allContent.filter(item => {
    const matchesQuery = query === '' || 
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.genre?.toLowerCase().includes(query.toLowerCase()) ||
      item.description?.toLowerCase().includes(query.toLowerCase());

    const matchesType = filters.type === '' || item.type === filters.type;
    const matchesGenre = filters.genre === '' || item.genre === filters.genre;
    const matchesYear = filters.year === '' || item.year === filters.year;
    const matchesRating = filters.rating === '' || 
      (item.rating && parseFloat(item.rating) >= parseFloat(filters.rating));

    return matchesQuery && matchesType && matchesGenre && matchesYear && matchesRating;
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams({ q: query });
  };

  const clearFilters = () => {
    setFilters({
      type: '',
      genre: '',
      year: '',
      rating: ''
    });
  };

  useEffect(() => {
    const q = searchParams.get('q');
    if (q) {
      setQuery(q);
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Header */}
        <div className="mb-8">
          <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto mb-6">
            <input
              type="text"
              placeholder="Search for movies, TV shows, sports..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-gray-900 text-white px-6 py-4 pl-12 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <SearchIcon className="w-6 h-6 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Search
            </button>
          </form>

          {query && (
            <div className="text-center">
              <h1 className="text-2xl font-bold text-white mb-2">
                Search results for "{query}"
              </h1>
              <p className="text-gray-400">{filteredContent.length} results found</p>
            </div>
          )}
        </div>

        {/* Filters */}
        <div className="mb-6">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors mb-4"
          >
            <Filter className="w-4 h-4" />
            <span>Filters</span>
          </button>

          {showFilters && (
            <div className="bg-gray-900 rounded-lg p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-white font-semibold">Filter Results</h3>
                <button
                  onClick={clearFilters}
                  className="text-blue-400 hover:text-blue-300 text-sm"
                >
                  Clear All
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Type</label>
                  <select
                    value={filters.type}
                    onChange={(e) => setFilters({...filters, type: e.target.value})}
                    className="w-full bg-gray-800 text-white px-3 py-2 rounded border border-gray-700 focus:border-blue-500 focus:outline-none"
                  >
                    <option value="">All Types</option>
                    <option value="movie">Movies</option>
                    <option value="show">TV Shows</option>
                    <option value="sports">Sports</option>
                    <option value="kids">Kids</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-2">Genre</label>
                  <select
                    value={filters.genre}
                    onChange={(e) => setFilters({...filters, genre: e.target.value})}
                    className="w-full bg-gray-800 text-white px-3 py-2 rounded border border-gray-700 focus:border-blue-500 focus:outline-none"
                  >
                    <option value="">All Genres</option>
                    <option value="Action">Action</option>
                    <option value="Comedy">Comedy</option>
                    <option value="Drama">Drama</option>
                    <option value="Horror">Horror</option>
                    <option value="Sci-Fi">Sci-Fi</option>
                    <option value="Documentary">Documentary</option>
                    <option value="Animation">Animation</option>
                    <option value="Educational">Educational</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-2">Year</label>
                  <select
                    value={filters.year}
                    onChange={(e) => setFilters({...filters, year: e.target.value})}
                    className="w-full bg-gray-800 text-white px-3 py-2 rounded border border-gray-700 focus:border-blue-500 focus:outline-none"
                  >
                    <option value="">All Years</option>
                    <option value="2024">2024</option>
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                    <option value="2021">2021</option>
                    <option value="2020">2020</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-2">Min Rating</label>
                  <select
                    value={filters.rating}
                    onChange={(e) => setFilters({...filters, rating: e.target.value})}
                    className="w-full bg-gray-800 text-white px-3 py-2 rounded border border-gray-700 focus:border-blue-500 focus:outline-none"
                  >
                    <option value="">Any Rating</option>
                    <option value="7">7.0+</option>
                    <option value="8">8.0+</option>
                    <option value="9">9.0+</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        {query ? (
          <ContentGrid items={filteredContent} viewMode="grid" />
        ) : (
          <div className="text-center py-16">
            <SearchIcon className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Search JioHotstar</h2>
            <p className="text-gray-400">Find movies, TV shows, sports, and kids content</p>
          </div>
        )}

        {/* No Results */}
        {query && filteredContent.length === 0 && (
          <div className="text-center py-16">
            <X className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">No results found</h2>
            <p className="text-gray-400">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;