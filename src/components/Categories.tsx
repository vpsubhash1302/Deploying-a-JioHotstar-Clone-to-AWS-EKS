import React from 'react';

const categories = [
  { name: 'Action', image: 'https://images.pexels.com/photos/8721342/pexels-photo-8721342.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop' },
  { name: 'Comedy', image: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop' },
  { name: 'Drama', image: 'https://images.pexels.com/photos/3829227/pexels-photo-3829227.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop' },
  { name: 'Horror', image: 'https://images.pexels.com/photos/4993063/pexels-photo-4993063.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop' },
  { name: 'Romance', image: 'https://images.pexels.com/photos/3721941/pexels-photo-3721941.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop' },
  { name: 'Sci-Fi', image: 'https://images.pexels.com/photos/8940024/pexels-photo-8940024.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop' },
  { name: 'Thriller', image: 'https://images.pexels.com/photos/4993064/pexels-photo-4993064.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop' },
  { name: 'Documentary', image: 'https://images.pexels.com/photos/3844790/pexels-photo-3844790.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop' },
];

const Categories = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8">Browse by Genre</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div
              key={category.name}
              className="relative group cursor-pointer rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-105"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-32 object-cover"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-300"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-white text-lg font-bold text-center">
                  {category.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;