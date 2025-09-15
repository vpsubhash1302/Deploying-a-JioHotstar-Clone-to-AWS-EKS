import React from 'react';
import Hero from '../components/Hero';
import ContentRow from '../components/ContentRow';
import Categories from '../components/Categories';
import { contentData } from '../data/contentData';

const Home = () => {
  return (
    <div>
      <Hero />
      
      <div className="relative z-10 -mt-32">
        <ContentRow title="Trending Now" items={contentData.trending} />
        <ContentRow title="Popular TV Shows" items={contentData.popularShows} />
        <ContentRow title="Action Movies" items={contentData.actionMovies} />
        <ContentRow title="Documentaries" items={contentData.documentaries} />
      </div>
      
      <Categories />
    </div>
  );
};

export default Home;