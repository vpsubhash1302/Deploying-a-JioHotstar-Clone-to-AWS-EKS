import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, Bell, User, Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">JH</span>
              </div>
              <span className="text-white font-bold text-xl hidden sm:block">JioHotstar</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <Link 
                to="/" 
                className={`transition-colors font-medium ${
                  isActive('/') ? 'text-blue-400' : 'text-gray-300 hover:text-white'
                }`}
              >
                Home
              </Link>
              <Link 
                to="/movies" 
                className={`transition-colors ${
                  isActive('/movies') ? 'text-blue-400' : 'text-gray-300 hover:text-white'
                }`}
              >
                Movies
              </Link>
              <Link 
                to="/tv-shows" 
                className={`transition-colors ${
                  isActive('/tv-shows') ? 'text-blue-400' : 'text-gray-300 hover:text-white'
                }`}
              >
                TV Shows
              </Link>
              <Link 
                to="/sports" 
                className={`transition-colors ${
                  isActive('/sports') ? 'text-blue-400' : 'text-gray-300 hover:text-white'
                }`}
              >
                Sports
              </Link>
              <Link 
                to="/kids" 
                className={`transition-colors ${
                  isActive('/kids') ? 'text-blue-400' : 'text-gray-300 hover:text-white'
                }`}
              >
                Kids
              </Link>
            </nav>
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <form onSubmit={handleSearch} className="relative">
              <div className="flex items-center">
                <input
                  type="text"
                  placeholder="Search movies, shows..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-gray-800 text-white px-4 py-2 pl-10 rounded-lg w-48 lg:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:w-72 transition-all duration-300"
                />
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              </div>
            </form>

            {/* Notifications */}
            <button className="text-gray-300 hover:text-white transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Profile */}
            <button className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors">
              <User className="w-5 h-5" />
              <span className="hidden sm:block">Profile</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button onClick={toggleMenu} className="md:hidden text-gray-300 hover:text-white">
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-800">
            <nav className="flex flex-col space-y-3">
              <Link 
                to="/" 
                className={`transition-colors font-medium px-2 ${
                  isActive('/') ? 'text-blue-400' : 'text-gray-300 hover:text-white'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/movies" 
                className={`transition-colors px-2 ${
                  isActive('/movies') ? 'text-blue-400' : 'text-gray-300 hover:text-white'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Movies
              </Link>
              <Link 
                to="/tv-shows" 
                className={`transition-colors px-2 ${
                  isActive('/tv-shows') ? 'text-blue-400' : 'text-gray-300 hover:text-white'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                TV Shows
              </Link>
              <Link 
                to="/sports" 
                className={`transition-colors px-2 ${
                  isActive('/sports') ? 'text-blue-400' : 'text-gray-300 hover:text-white'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Sports
              </Link>
              <Link 
                to="/kids" 
                className={`transition-colors px-2 ${
                  isActive('/kids') ? 'text-blue-400' : 'text-gray-300 hover:text-white'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Kids
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;