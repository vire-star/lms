import { useGetAllPurchasedCourse } from '@/hooks/Course/course.hook';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    BookOpen, 
    Play, 
    Award, 
    TrendingUp, 
    Clock, 
    CheckCircle2,
    ArrowRight,
    GraduationCap,
    Sparkles
} from 'lucide-react';
import { set } from 'react-hook-form';
import { useModuleStore } from '@/Store/module.store';

const YourCourse = () => {
    const { data, isLoading, isError, error } = useGetAllPurchasedCourse();
    const navigate = useNavigate();
    const allCourses = data?.purchasedCourses || [];
     const { module, setModule, clearModule } = useModuleStore();

    const pageNavigator = (id) => {
        navigate(`/purchasedCourse/${id}`);
    };

    useEffect(()=>{
        setModule(null);
    }, []);

    if (isLoading) {
        return (
            <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-50 to-purple-50">
                <div className="relative">
                    <div className="w-20 h-20 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                    <GraduationCap className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-blue-600" />
                </div>
                <p className="text-xl text-gray-600 mt-6 font-medium">Loading your courses...</p>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-red-50 to-orange-50">
                <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mb-6">
                    <BookOpen className="w-12 h-12 text-red-600" />
                </div>
                <h2 className="text-2xl font-bold text-red-600 mb-2">Oops! Something went wrong</h2>
                <p className="text-gray-600 mb-6">{error?.message || 'Failed to load your courses'}</p>
                <button 
                    onClick={() => window.location.reload()}
                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-semibold transition-all"
                >
                    Try Again
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white py-16 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center gap-3 mb-4">
                        <GraduationCap className="w-12 h-12" />
                        <h1 className="text-5xl font-bold">My Learning</h1>
                    </div>
                    <p className="text-white/90 text-xl max-w-2xl">
                        Continue your learning journey. You're doing great! 🚀
                    </p>
                    <div className="flex items-center gap-8 mt-8">
                        <div className="flex items-center gap-2">
                            <Award className="w-6 h-6 text-yellow-300" />
                            <span className="text-lg font-semibold">{allCourses.length} Courses Enrolled</span>
                        </div>
                        {/* Optional: Add more stats */}
                    </div>
                </div>
            </div>

            {/* Courses Section */}
            <div className="max-w-7xl mx-auto px-6 py-12">
                {allCourses.length === 0 ? (
                    /* Empty State */
                    <div className="bg-white rounded-3xl shadow-xl p-16 text-center">
                        <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-8">
                            <BookOpen className="w-16 h-16 text-blue-600" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">
                            No Courses Yet
                        </h2>
                        <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
                            Start your learning journey by enrolling in your first course!
                        </p>
                        <button
                            onClick={() => navigate('/')}
                            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 
                                     text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl 
                                     transition-all duration-300 active:scale-95 inline-flex items-center gap-2"
                        >
                            Browse Courses
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                ) : (
                    /* Course Grid */
                    <div>
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                                <TrendingUp className="w-8 h-8 text-blue-600" />
                                Continue Learning
                            </h2>
                            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <option>All Courses</option>
                                <option>In Progress</option>
                                <option>Completed</option>
                            </select>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {allCourses.map((item) => (
                                <div
                                    key={item._id}
                                    onClick={() => pageNavigator(item._id)}
                                    className="group bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer 
                                             hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 
                                             border-2 border-transparent hover:border-blue-500"
                                >
                                    {/* Thumbnail */}
                                    <div className="relative h-52 w-full overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100">
                                        {item.thumbnail ? (
                                            <>
                                                <img
                                                    src={item.thumbnail}
                                                    alt={item.title}
                                                    className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                                            </>
                                        ) : (
                                            <div className="h-full w-full flex flex-col items-center justify-center">
                                                <BookOpen className="w-20 h-20 text-blue-300 mb-2" />
                                                <span className="text-gray-400 font-medium">No Image</span>
                                            </div>
                                        )}

                                        {/* Play Button Overlay */}
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-xl">
                                                <Play className="w-8 h-8 text-blue-600 ml-1" fill="currentColor" />
                                            </div>
                                        </div>

                                        {/* Progress Badge */}
                                        {item.progress !== undefined && (
                                            <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg">
                                                <span className="text-xs font-bold text-blue-600">
                                                    {item.progress}% Complete
                                                </span>
                                            </div>
                                        )}

                                        {/* New Badge (Optional) */}
                                        {item.isNew && (
                                            <div className="absolute top-4 left-4 bg-gradient-to-r from-green-400 to-emerald-500 
                                                          text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
                                                <Sparkles className="w-3 h-3" />
                                                New
                                            </div>
                                        )}
                                    </div>

                                    {/* Course Info */}
                                    <div className="p-6">
                                        {/* Category */}
                                        {item.category && (
                                            <span className="inline-block text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded-full font-semibold mb-3">
                                                {item.category}
                                            </span>
                                        )}

                                        {/* Title */}
                                        <h3 className="font-bold text-xl mb-2 text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2">
                                            {item.title}
                                        </h3>

                                        {/* Description */}
                                        {item.description && (
                                            <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                                                {item.description}
                                            </p>
                                        )}

                                        {/* Progress Bar */}
                                        {item.progress !== undefined && (
                                            <div className="mb-4">
                                                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                                                    <div
                                                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                                                        style={{ width: `${item.progress}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                        )}

                                        {/* Stats Row */}
                                        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                                            {item.modulesCount && (
                                                <div className="flex items-center gap-1">
                                                    <BookOpen className="w-4 h-4" />
                                                    <span>{item.modulesCount} modules</span>
                                                </div>
                                            )}
                                            {item.duration && (
                                                <div className="flex items-center gap-1">
                                                    <Clock className="w-4 h-4" />
                                                    <span>{item.duration}</span>
                                                </div>
                                            )}
                                        </div>

                                        {/* CTA Button */}
                                        <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 
                                                         text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 
                                                         transition-all duration-300 shadow-md hover:shadow-lg group-hover:scale-105">
                                            {item.progress === 100 ? (
                                                <>
                                                    <CheckCircle2 className="w-5 h-5" />
                                                    Review Course
                                                </>
                                            ) : item.progress > 0 ? (
                                                <>
                                                    <Play className="w-5 h-5" />
                                                    Continue Learning
                                                </>
                                            ) : (
                                                <>
                                                    <Play className="w-5 h-5" />
                                                    Start Course
                                                </>
                                            )}
                                        </button>
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

export default YourCourse;
