import { useGetAllCourse } from '@/hooks/Course/course.hook';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, X, TrendingUp, BookOpen, Users, Star, Clock, Award } from 'lucide-react';

const CourseSection = ({ activeSearch, onReset }) => {
    const navigate = useNavigate();
    const { data, isLoading, isError } = useGetAllCourse(activeSearch);

    const courseHandler = (id) => {
        navigate(`/singleCourse/${id}`);
    };

    if (isLoading) {
        return (
            <div className="flex flex-col justify-center items-center py-20">
                <div className="relative">
                    <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                    <BookOpen className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-blue-600" />
                </div>
                <p className="text-xl text-gray-600 mt-4 font-medium">Loading amazing courses...</p>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex flex-col justify-center items-center py-20">
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-4">
                    <X className="w-10 h-10 text-red-600" />
                </div>
                <p className="text-xl text-red-600 font-semibold">Oops! Failed to load courses</p>
                <p className="text-gray-500 mt-2">Please try again later</p>
            </div>
        );
    }

    const courses = data?.courses || [];

    return (
        <div className='mt-12 px-6 pb-16 max-w-7xl mx-auto'>
            {/* Header Section */}
            <div className="mb-10">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            {activeSearch ? (
                                <TrendingUp className="w-6 h-6 text-blue-600" />
                            ) : (
                                <Award className="w-6 h-6 text-yellow-500" />
                            )}
                            <h1 className='text-4xl font-bold text-gray-800'>
                                {activeSearch ? (
                                    <>Search Results</>
                                ) : (
                                    <>Our Top Courses</>
                                )}
                            </h1>
                        </div>
                        {activeSearch && (
                            <p className="text-gray-500 text-lg">
                                for <span className="text-blue-600 font-semibold">"{activeSearch}"</span>
                            </p>
                        )}
                    </div>
                    
                    {activeSearch && (
                        <button
                            onClick={onReset}
                            className="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 
                                     text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 
                                     shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95"
                        >
                            <X className="w-4 h-4" />
                            Clear Search
                        </button>
                    )}
                </div>

                {/* AI Suggestion Badge */}
                {data?.aiSuggestion && data.aiSuggestion !== activeSearch && (
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-blue-100 
                                  px-4 py-2 rounded-full border border-purple-200 mb-4">
                        <Sparkles className="w-4 h-4 text-purple-600" />
                        <span className="text-sm text-purple-700">
                            AI matched your search to: <strong>{data.aiSuggestion}</strong>
                        </span>
                    </div>
                )}

                {/* Results Count */}
                <div className="flex items-center gap-2 text-gray-600">
                    <BookOpen className="w-5 h-5" />
                    <p className="text-lg font-medium">
                        {courses.length} course{courses.length !== 1 ? 's' : ''} found
                    </p>
                </div>
            </div>

            {/* No Results */}
            {courses.length === 0 ? (
                <div className="text-center py-20">
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <BookOpen className="w-12 h-12 text-gray-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-700 mb-3">
                        {activeSearch ? 'No courses found' : 'No courses available'}
                    </h2>
                    <p className="text-gray-500 mb-6 max-w-md mx-auto">
                        {activeSearch 
                            ? `We couldn't find any courses matching "${activeSearch}". Try different keywords or browse all courses.`
                            : "Check back later for new courses!"}
                    </p>
                    {activeSearch && (
                        <button
                            onClick={onReset}
                            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 
                                     text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl 
                                     transition-all duration-300 active:scale-95"
                        >
                            View All Courses
                        </button>
                    )}
                </div>
            ) : (
                /* Course Grid */
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                    {courses.map((item) => (
                        <div
                            key={item._id}
                            onClick={() => courseHandler(item._id)}
                            className='group bg-white rounded-2xl shadow-md overflow-hidden cursor-pointer 
                                     hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2
                                     border border-gray-100'
                        >
                            {/* Thumbnail */}
                            <div className='relative h-48 w-full bg-gradient-to-br from-blue-100 to-purple-100 overflow-hidden'>
                                {item.thumbnail ? (
                                    <>
                                        <img 
                                            src={item.thumbnail} 
                                            alt={item.title}
                                            className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500'
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    </>
                                ) : (
                                    <div className='w-full h-full flex flex-col items-center justify-center text-gray-400'>
                                        <BookOpen className="w-16 h-16 mb-2" />
                                        <span className="text-sm font-medium">No Image</span>
                                    </div>
                                )}
                                
                                {/* Trending Badge (Optional) */}
                                {item.isTrending && (
                                    <div className="absolute top-3 left-3 bg-gradient-to-r from-yellow-400 to-orange-500 
                                                  text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                                        <TrendingUp className="w-3 h-3" />
                                        Trending
                                    </div>
                                )}
                            </div>

                            {/* Course Info */}
                            <div className='p-5'>
                                {/* Category Tag */}
                                {item.category && (
                                    <span className='inline-block text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded-full font-semibold mb-3'>
                                        {item.category}
                                    </span>
                                )}

                                {/* Title */}
                                <h3 className='font-bold text-lg mb-2 line-clamp-2 text-gray-800 group-hover:text-blue-600 transition-colors'>
                                    {item.title}
                                </h3>

                                {/* Description */}
                                <p className='text-gray-600 text-sm line-clamp-2 mb-4 leading-relaxed'>
                                    {item.description}
                                </p>

                                {/* Stats Row (Optional - if you have this data) */}
                                <div className="flex items-center gap-4 mb-4 text-xs text-gray-500">
                                    {item.studentsCount && (
                                        <div className="flex items-center gap-1">
                                            <Users className="w-4 h-4" />
                                            <span>{item.studentsCount} students</span>
                                        </div>
                                    )}
                                    {item.duration && (
                                        <div className="flex items-center gap-1">
                                            <Clock className="w-4 h-4" />
                                            <span>{item.duration}</span>
                                        </div>
                                    )}
                                    {item.rating && (
                                        <div className="flex items-center gap-1">
                                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                            <span>{item.rating}</span>
                                        </div>
                                    )}
                                </div>
                                
                                {/* Price & CTA */}
                                <div className='flex justify-between items-center pt-4 border-t border-gray-100'>
                                    <div>
                                        <span>{item.amount}</span>
                                    </div>
                                    
                                    <button className='bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold 
                                                     group-hover:bg-blue-700 transition-colors duration-300
                                                     opacity-0 group-hover:opacity-100'>
                                        View Course
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Back to Top Button (Optional) */}
            {courses.length > 6 && (
                <div className="flex justify-center mt-12">
                    <button
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-full 
                                 font-medium flex items-center gap-2 transition-all duration-300 shadow-md"
                    >
                        Back to Top
                        <TrendingUp className="w-4 h-4 rotate-180" />
                    </button>
                </div>
            )}
        </div>
    );
};

export default CourseSection;
