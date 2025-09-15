import React from 'react';

interface FilterSidebarProps {
  filters: {
    genre: string;
    year: string;
    rating: string;
    sortBy: string;
  };
  setFilters: (filters: any) => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ filters, setFilters }) => {
  const genres = ['Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi', 'Documentary', 'Animation', 'Romance', 'Thriller'];
  const years = ['2024', '2023', '2022', '2021', '2020', '2019', '2018'];
  const ratings = ['9.0+', '8.0+', '7.0+', '6.0+'];
  const sortOptions = [
    { value: 'popularity', label: 'Popularity' },
    { value: 'rating', label: 'Rating' },
    { value: 'year', label: 'Year' },
    { value: 'title', label: 'Title' }
  ];

  const clearFilters = () => {
    setFilters({
      genre: '',
      year: '',
      rating: '',
      sortBy: 'popularity'
    });
  };

  return (
    <div className="bg-gray-900 rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-white font-semibold text-lg">Filters</h3>
        <button
          onClick={clearFilters}
          className="text-blue-400 hover:text-blue-300 text-sm"
        >
          Clear All
        </button>
      </div>

      {/* Sort By */}
      <div className="mb-6">
        <h4 className="text-white font-medium mb-3">Sort By</h4>
        <select
          value={filters.sortBy}
          onChange={(e) => setFilters({...filters, sortBy: e.target.value})}
          className="w-full bg-gray-800 text-white px-3 py-2 rounded border border-gray-700 focus:border-blue-500 focus:outline-none"
        >
          {sortOptions.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>

      {/* Genre */}
      <div className="mb-6">
        <h4 className="text-white font-medium mb-3">Genre</h4>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {genres.map(genre => (
            <label key={genre} className="flex items-center">
              <input
                type="radio"
                name="genre"
                value={genre}
                checked={filters.genre === genre}
                onChange={(e) => setFilters({...filters, genre: e.target.value})}
                className="mr-2 text-blue-600"
              />
              <span className="text-gray-300 text-sm">{genre}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Year */}
      <div className="mb-6">
        <h4 className="text-white font-medium mb-3">Year</h4>
        <div className="space-y-2">
          {years.map(year => (
            <label key={year} className="flex items-center">
              <input
                type="radio"
                name="year"
                value={year}
                checked={filters.year === year}
                onChange={(e) => setFilters({...filters, year: e.target.value})}
                className="mr-2 text-blue-600"
              />
              <span className="text-gray-300 text-sm">{year}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Rating */}
      <div>
        <h4 className="text-white font-medium mb-3">Rating</h4>
        <div className="space-y-2">
          {ratings.map(rating => (
            <label key={rating} className="flex items-center">
              <input
                type="radio"
                name="rating"
                value={rating.replace('+', '')}
                checked={filters.rating === rating.replace('+', '')}
                onChange={(e) => setFilters({...filters, rating: e.target.value})}
                className="mr-2 text-blue-600"
              />
              <span className="text-gray-300 text-sm">{rating}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;