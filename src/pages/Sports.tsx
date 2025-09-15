import React, { useState } from 'react';
import { Calendar, Clock, Trophy, Users } from 'lucide-react';
import { contentData } from '../data/contentData';

const Sports = () => {
  const [activeTab, setActiveTab] = useState<'live' | 'upcoming' | 'highlights'>('live');

  const liveEvents = contentData.sportsLive;
  const upcomingEvents = contentData.sportsUpcoming;
  const highlights = contentData.sportsHighlights;

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <div className="relative h-64 bg-gradient-to-r from-green-900 to-blue-900">
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Sports</h1>
            <p className="text-xl text-gray-200">Watch live sports and highlights</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex space-x-1 bg-gray-800 rounded-lg p-1 mb-8 w-fit">
          <button
            onClick={() => setActiveTab('live')}
            className={`px-6 py-2 rounded-md transition-colors ${
              activeTab === 'live' ? 'bg-red-600 text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            Live Now
          </button>
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`px-6 py-2 rounded-md transition-colors ${
              activeTab === 'upcoming' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            Upcoming
          </button>
          <button
            onClick={() => setActiveTab('highlights')}
            className={`px-6 py-2 rounded-md transition-colors ${
              activeTab === 'highlights' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            Highlights
          </button>
        </div>

        {/* Live Events */}
        {activeTab === 'live' && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Live Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {liveEvents.map((event) => (
                <div key={event.id} className="bg-gray-900 rounded-lg overflow-hidden hover:bg-gray-800 transition-colors">
                  <div className="relative">
                    <img src={event.image} alt={event.title} className="w-full h-48 object-cover" />
                    <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded text-xs font-bold flex items-center">
                      <div className="w-2 h-2 bg-white rounded-full mr-1 animate-pulse"></div>
                      LIVE
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-white font-semibold mb-2">{event.title}</h3>
                    <div className="flex items-center text-gray-400 text-sm mb-2">
                      <Users className="w-4 h-4 mr-1" />
                      <span>{event.teams}</span>
                    </div>
                    <div className="flex items-center text-gray-400 text-sm">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{event.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Upcoming Events */}
        {activeTab === 'upcoming' && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Upcoming Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="bg-gray-900 rounded-lg overflow-hidden hover:bg-gray-800 transition-colors">
                  <div className="relative">
                    <img src={event.image} alt={event.title} className="w-full h-48 object-cover" />
                    <div className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 rounded text-xs font-bold">
                      UPCOMING
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-white font-semibold mb-2">{event.title}</h3>
                    <div className="flex items-center text-gray-400 text-sm mb-2">
                      <Users className="w-4 h-4 mr-1" />
                      <span>{event.teams}</span>
                    </div>
                    <div className="flex items-center text-gray-400 text-sm">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>{event.date} at {event.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Highlights */}
        {activeTab === 'highlights' && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Sports Highlights</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {highlights.map((highlight) => (
                <div key={highlight.id} className="bg-gray-900 rounded-lg overflow-hidden hover:bg-gray-800 transition-colors">
                  <div className="relative">
                    <img src={highlight.image} alt={highlight.title} className="w-full h-48 object-cover" />
                    <div className="absolute top-2 left-2 bg-purple-600 text-white px-2 py-1 rounded text-xs font-bold">
                      HIGHLIGHTS
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/60 text-white px-2 py-1 rounded text-xs">
                      {highlight.duration}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-white font-semibold mb-2">{highlight.title}</h3>
                    <div className="flex items-center text-gray-400 text-sm mb-2">
                      <Trophy className="w-4 h-4 mr-1" />
                      <span>{highlight.sport}</span>
                    </div>
                    <div className="flex items-center text-gray-400 text-sm">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>{highlight.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sports;