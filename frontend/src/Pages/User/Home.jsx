import CourseSection from '@/components/CourseSection';
import SearchSection from '@/components/SearchSection';
import React, { useState } from 'react';

const Home = () => {
    const [searchInput, setSearchInput] = useState("");
    const [activeSearch, setActiveSearch] = useState("");

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        setActiveSearch(searchInput.trim());  // ✅ Trim whitespace
    };

    const resetFilters = () => {
        setSearchInput("");
        setActiveSearch("");
    };

    return (
        <div className='min-h-screen bg-gray-50'>
            <SearchSection
                searchInput={searchInput}
                setSearchInput={setSearchInput}
                onSearchSubmit={handleSearchSubmit}
                hasActiveSearch={!!activeSearch}  // ✅ Boolean flag
                onReset={resetFilters}
            />
            <CourseSection
                activeSearch={activeSearch}
                onReset={resetFilters}
            />
        </div>
    );
};

export default Home;
