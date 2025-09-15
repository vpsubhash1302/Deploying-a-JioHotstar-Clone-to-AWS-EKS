import React from 'react';
import { Play, Plus, Info } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
          alt="Featured Content"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="inline-flex items-center bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium mb-4">
            <span className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></span>
            Now Trending
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
            The Crown
          </h1>

          {/* Description */}
          <p className="text-lg sm:text-xl text-gray-200 mb-6 leading-relaxed">
            Follow the political rivalries and romance of Queen Elizabeth II's reign and the events that shaped the second half of the twentieth century.
          </p>

          {/* Meta Info */}
          <div className="flex items-center space-x-4 text-sm text-gray-300 mb-8">
            <span className="bg-yellow-500 text-black px-2 py-1 rounded font-bold">IMDb 8.7</span>
            <span>2023</span>
            <span>•</span>
            <span>Drama</span>
            <span>•</span>
            <span>6 Seasons</span>
            <span>•</span>
            <span className="border border-gray-600 px-2 py-1 rounded text-xs">16+</span>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="flex items-center justify-center bg-white text-black px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-all duration-200 transform hover:scale-105">
              <Play className="w-5 h-5 mr-2 fill-current" />
              Watch Now
            </button>
            <button className="flex items-center justify-center bg-gray-800/80 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-all duration-200 backdrop-blur-sm">
              <Plus className="w-5 h-5 mr-2" />
              My List
            </button>
            <button className="flex items-center justify-center bg-transparent border border-gray-600 text-white px-8 py-3 rounded-lg font-semibold hover:border-white transition-all duration-200">
              <Info className="w-5 h-5 mr-2" />
              More Info
            </button>
          </div>
        </div>
      </div>

      {/* Fade Effect at Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent"></div>
    </section>
  );
};

export default Hero;