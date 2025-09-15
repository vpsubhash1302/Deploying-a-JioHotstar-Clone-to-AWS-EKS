import React from 'react';
import { Play, Plus, Star, Clock } from 'lucide-react';

interface ContentItem {
  id: number;
  title: string;
  image: string;
  year?: string;
  rating?: string;
  genre?: string;
  type?: string;
  duration?: string;
  description?: string;
}

interface ContentGridProps {
  items: ContentItem[];
  viewMode: 'grid' | 'list';
}

const ContentGrid: React.FC<ContentGridProps> = ({ items, viewMode }) => {
  if (viewMode === 'list') {
    return (
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="bg-gray-900 rounded-lg overflow-hidden hover:bg-gray-800 transition-colors">
            <div className="flex">
              <div className="w-48 h-28 flex-shrink-0">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-white font-semibold text-lg mb-2">{item.title}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-400 mb-2">
                      {item.year && <span>{item.year}</span>}
                      {item.genre && <span>• {item.genre}</span>}
                      {item.rating && (
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-500 mr-1 fill-current" />
                          <span>{item.rating}</span>
                        </div>
                      )}
                      {item.duration && (
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          <span>{item.duration}</span>
                        </div>
                      )}
                    </div>
                    {item.description && (
                      <p className="text-gray-400 text-sm line-clamp-2">{item.description}</p>
                    )}
                  </div>
                  <div className="flex space-x-2 ml-4">
                    <button className="bg-white text-black p-2 rounded-full hover:bg-gray-200 transition-colors">
                      <Play className="w-4 h-4 fill-current" />
                    </button>
                    <button className="bg-gray-700 text-white p-2 rounded-full hover:bg-gray-600 transition-colors">
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {items.map((item) => (
        <div key={item.id} className="group cursor-pointer">
          <div className="relative rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:z-10">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-64 object-cover"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
              <div className="flex space-x-3">
                <button className="bg-white text-black p-3 rounded-full hover:bg-gray-200 transition-colors">
                  <Play className="w-5 h-5 fill-current" />
                </button>
                <button className="bg-gray-800/80 text-white p-3 rounded-full hover:bg-gray-700 transition-colors backdrop-blur-sm">
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>

            {item.rating && (
              <div className="absolute top-2 left-2 bg-yellow-500 text-black px-2 py-1 rounded text-xs font-bold">
                {item.rating}
              </div>
            )}
          </div>

          <div className="mt-3">
            <h3 className="text-white font-semibold text-sm mb-1 line-clamp-2">
              {item.title}
            </h3>
            <div className="flex items-center space-x-2 text-xs text-gray-400">
              {item.year && <span>{item.year}</span>}
              {item.year && item.genre && <span>•</span>}
              {item.genre && <span>{item.genre}</span>}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContentGrid;