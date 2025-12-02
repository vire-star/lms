import { Search, X, Sparkles } from 'lucide-react';
import React from 'react';

const SearchSection = ({ searchInput, setSearchInput, onSearchSubmit, hasActiveSearch, onReset }) => {
  return (
    <div className='relative h-[50vh] w-full bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 overflow-hidden'>
      {/* Animated Background Circles */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 animate-pulse delay-1000"></div>
      
      {/* Content Container */}
      <div className='relative z-10 h-full flex flex-col items-center justify-center px-6'>
        {/* Heading Section */}
        <div className='text-center mb-8 space-y-3'>
          <div className='flex items-center justify-center gap-2 mb-2'>
            <Sparkles className='w-6 h-6 text-yellow-300 animate-bounce' />
            <h1 className='text-5xl md:text-6xl font-bold text-white drop-shadow-lg'>
              Find Your Perfect Course
            </h1>
            <Sparkles className='w-6 h-6 text-yellow-300 animate-bounce delay-150' />
          </div>
          <p className='text-white/90 text-lg md:text-xl font-light max-w-2xl mx-auto'>
            Discover courses powered by AI • Learn from the best instructors
          </p>
        </div>

        {/* Search Form */}
        <form 
          onSubmit={onSearchSubmit} 
          className='w-full max-w-3xl'
        >
          <div className='flex items-center gap-3 mb-4'>
            {/* Search Input Container */}
            <div className='flex-1 relative group'>
              <Search className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-blue-600 transition-colors' />
              
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search for Web Development, AI, MERN Stack..."
                className="w-full pl-12 pr-12 py-4 text-lg border-2 border-transparent bg-white rounded-xl 
                          focus:outline-none focus:ring-4 focus:ring-blue-300/50 focus:border-blue-500 
                          shadow-2xl transition-all duration-300 placeholder:text-gray-400"
              />
              
              {/* Clear Input Button */}
              {searchInput && (
                <button
                  type="button"
                  onClick={() => setSearchInput('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 
                            transition-colors p-1 hover:bg-gray-100 rounded-full"
                >
                  <X className='w-5 h-5' />
                </button>
              )}
            </div>

            {/* Search Button */}
            <button
              type="submit"
              disabled={!searchInput.trim()}
              className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg
                        hover:bg-blue-50 active:scale-95 transition-all duration-200 
                        shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed
                        flex items-center gap-2 group"
            >
              <Search className='w-5 h-5 group-hover:scale-110 transition-transform' />
              Search
            </button>
          </div>

          {/* Active Search Indicator */}
          {hasActiveSearch && (
            <div className='flex justify-center animate-fadeIn'>
              <button
                type="button"
                onClick={onReset}
                className='text-white/90 text-sm font-medium hover:text-white 
                          flex items-center gap-2 px-4 py-2 rounded-full 
                          hover:bg-white/10 transition-all duration-200'
              >
                <X className='w-4 h-4' />
                Clear all filters
              </button>
            </div>
          )}
        </form>

        {/* Popular Searches */}
        <div className='mt-6 text-center'>
          <p className='text-white/70 text-sm mb-3'>Popular searches:</p>
          <div className='flex flex-wrap justify-center gap-2'>
            {['Web Development', 'Artificial Intelligence', 'MERN Stack', 'Mobile App'].map((tag) => (
              <button
                key={tag}
                onClick={() => {
                  setSearchInput(tag);
                  onSearchSubmit({ preventDefault: () => {} });
                }}
                className='px-4 py-2 bg-white/20 hover:bg-white/30 text-white text-sm 
                          rounded-full backdrop-blur-sm transition-all duration-200
                          hover:scale-105 active:scale-95'
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Wave Decoration */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path 
            fill="#ffffff" 
            fillOpacity="0.1" 
            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default SearchSection;
