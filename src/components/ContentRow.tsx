import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Play, Plus } from 'lucide-react';

interface ContentItem {
  id: number;
  title: string;
  image: string;
  year?: string;
  rating?: string;
  genre?: string;
}

interface ContentRowProps {
  title: string;
  items: ContentItem[];
}

const ContentRow: React.FC<ContentRowProps> = ({ title, items }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 320; // Width of one card plus gap
      const currentScroll = scrollContainerRef.current.scrollLeft;
      const targetScroll = direction === 'left' 
        ? currentScroll - scrollAmount 
        : currentScroll + scrollAmount;
      
      scrollContainerRef.current.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative mb-12">
      {/* Section Title */}
      <h2 className="text-2xl font-bold text-white mb-6 px-4 sm:px-6 lg:px-8">
        {title}
      </h2>

      {/* Scroll Buttons */}
      <button
        onClick={() => scroll('left')}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={() => scroll('right')}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Content Cards Container */}
      <div className="group relative">
        <div
          ref={scrollContainerRef}
          className="flex space-x-4 overflow-x-auto scrollbar-hide px-4 sm:px-6 lg:px-8 pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {items.map((item) => (
            <div
              key={item.id}
              className="flex-none w-72 group/card cursor-pointer"
            >
              <div className="relative rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:z-10">
                {/* Image */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-40 object-cover"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300"></div>
                
                {/* Hover Content */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/card:opacity-100 transition-all duration-300">
                  <div className="flex space-x-3">
                    <button className="bg-white text-black p-2 rounded-full hover:bg-gray-200 transition-colors">
                      <Play className="w-4 h-4 fill-current" />
                    </button>
                    <button className="bg-gray-800/80 text-white p-2 rounded-full hover:bg-gray-700 transition-colors backdrop-blur-sm">
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Rating Badge */}
                {item.rating && (
                  <div className="absolute top-2 left-2 bg-yellow-500 text-black px-2 py-1 rounded text-xs font-bold">
                    {item.rating}
                  </div>
                )}
              </div>

              {/* Card Info */}
              <div className="mt-3 px-2">
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
      </div>
    </div>
  );
};

export default ContentRow;