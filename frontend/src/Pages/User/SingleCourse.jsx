import { useGetSingleCourse } from '@/hooks/Course/course.hook';
import { usePaymentHook } from '@/hooks/Payment/payment.hook';
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BookOpen, Clock, PlayCircle, Award, ArrowLeft, ShoppingCart, CheckCircle, Users, Star } from 'lucide-react';
import { toast } from 'sonner';

const SingleCourse = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { data, isLoading } = useGetSingleCourse(courseId);
  const { mutate: payment, isPending } = usePaymentHook();

  const buyCourseHandler = (course) => {
    const payload = {
      products: [
        {
          _id: course._id,
          name: course.title,
          image: course.thumbnail,
          price: course.amount
        }
      ]
    };

    payment(payload, {
      onSuccess: (data) => {
        if (data.url) {
          window.location.href = data.url;
        }
      },
      onError: (error) => {
        toast.error(error?.response?.data?.message || "Payment failed");
      }
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading course...</p>
        </div>
      </div>
    );
  }

  if (!data?.course) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="text-center">
          <p className="text-lg text-red-600 mb-4">Course not found</p>
          <button 
            onClick={() => navigate('/')}
            className="text-blue-600 hover:underline"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  const course = data.course;

  return (
    <div className='min-h-screen w-full bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50'>
      {/* Hero Section with Glassmorphism */}
      <div className='relative bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 text-white overflow-hidden'>
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
        </div>

        <div className='relative max-w-7xl mx-auto px-6 py-10'>
          {/* Navigation */}
          <button 
            onClick={() => navigate(-1)}
            className='flex items-center gap-2 text-slate-300 hover:text-white mb-8 transition-all hover:gap-3 group'
          >
            <ArrowLeft className='w-4 h-4 transition-transform group-hover:-translate-x-1' />
            <span className="font-medium">Back to Courses</span>
          </button>

          <div className='flex flex-col lg:flex-row gap-10 items-center lg:items-start'>
            {/* Course Thumbnail */}
            <div className='lg:w-2/5'>
              <div className='relative group'>
                <div className='absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity'></div>
                <div className='relative rounded-2xl overflow-hidden shadow-2xl border-2 border-white/10'>
                  <img 
                    src={course.thumbnail} 
                    className='w-full aspect-video object-cover' 
                    alt={course.title}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <PlayCircle className="w-20 h-20 text-white" />
                  </div>
                </div>
              </div>
            </div>

            {/* Course Info */}
            <div className='lg:w-3/5 space-y-6'>
              {/* Badge */}
              <div className='flex items-center gap-3'>
                <span className='bg-blue-500/20 backdrop-blur-sm border border-blue-400/30 text-blue-200 px-4 py-1.5 rounded-full text-sm font-semibold'>
                  ⭐ Featured Course
                </span>
                <span className='bg-green-500/20 backdrop-blur-sm border border-green-400/30 text-green-200 px-4 py-1.5 rounded-full text-sm font-semibold flex items-center gap-1'>
                  <Users className="w-3 h-3" />
                  250+ Enrolled
                </span>
              </div>

              <h1 className='text-4xl lg:text-5xl font-bold leading-tight bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent'>
                {course.title}
              </h1>

              <p className='text-lg text-slate-300 leading-relaxed'>
                {course.description}
              </p>

              {/* Stats Bar */}
              <div className='flex flex-wrap gap-6'>
                <div className='flex items-center gap-2'>
                  <div className="p-2 bg-blue-500/20 rounded-lg">
                    <BookOpen className='w-5 h-5 text-blue-300' />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Modules</p>
                    <p className='text-white font-semibold'>{course.modules?.length || 0}</p>
                  </div>
                </div>
                <div className='flex items-center gap-2'>
                  <div className="p-2 bg-green-500/20 rounded-lg">
                    <PlayCircle className='w-5 h-5 text-green-300' />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Content</p>
                    <p className='text-white font-semibold'>HD Videos</p>
                  </div>
                </div>
                <div className='flex items-center gap-2'>
                  <div className="p-2 bg-yellow-500/20 rounded-lg">
                    <Award className='w-5 h-5 text-yellow-300' />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Certificate</p>
                    <p className='text-white font-semibold'>Included</p>
                  </div>
                </div>
              </div>

              {/* Price & CTA */}
              <div className='flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-4'>
                <div className='backdrop-blur-xl bg-white/10 border border-white/20 px-6 py-4 rounded-xl'>
                  <p className='text-sm text-blue-200 mb-1'>Course Price</p>
                  <p className='text-4xl font-bold text-white'>₹{course.amount}</p>
                </div>
                <button 
                  onClick={() => buyCourseHandler(course)}
                  disabled={isPending}
                  className='group relative flex items-center gap-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:from-gray-500 disabled:to-gray-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-xl hover:shadow-2xl hover:scale-105 disabled:cursor-not-allowed disabled:scale-100'
                >
                  <ShoppingCart className='w-5 h-5 group-hover:scale-110 transition-transform' />
                  <span>{isPending ? 'Processing...' : 'Enroll Now'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className='max-w-7xl mx-auto px-6 py-16 space-y-8'>
        {/* Learning Outcomes */}
        <div className='bg-white rounded-2xl shadow-lg border border-gray-100 p-8'>
          <h2 className='text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3'>
            <CheckCircle className="w-8 h-8 text-green-500" />
            What You'll Learn
          </h2>
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100">
            <p className='text-gray-700 leading-relaxed text-lg'>
              {course.description}
            </p>
          </div>
        </div>

        {/* Course Curriculum */}
        <div className='bg-white rounded-2xl shadow-lg border border-gray-100 p-8'>
          <div className='flex items-center justify-between mb-8'>
            <h2 className='text-3xl font-bold text-gray-900 flex items-center gap-3'>
              <BookOpen className='w-8 h-8 text-blue-600' />
              Course Curriculum
            </h2>
            <div className='bg-gradient-to-r from-blue-500 to-purple-500 text-white px-5 py-2 rounded-full text-sm font-bold shadow-md'>
              {course.modules?.length || 0} Modules
            </div>
          </div>

          {course.modules && course.modules.length > 0 ? (
            <div className='space-y-3'>
              {course.modules.map((module, index) => (
                <div 
                  key={index}
                  className='group relative flex items-center gap-4 p-5 bg-gradient-to-r from-gray-50 to-blue-50/50 rounded-xl border-2 border-gray-200 hover:border-blue-400 hover:shadow-md transition-all cursor-pointer'
                >
                  {/* Module number badge */}
                  <div className='relative'>
                    <div className='w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl flex items-center justify-center font-bold text-lg shadow-md group-hover:scale-110 transition-transform'>
                      {index + 1}
                    </div>
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>

                  {/* Module content */}
                  <div className='flex-1'>
                    <h3 className='font-bold text-gray-900 text-lg group-hover:text-blue-600 transition-colors mb-1'>
                      {module.title || `Module ${index + 1}`}
                    </h3>
                    <div className='flex items-center gap-4 text-sm text-gray-500'>
                      <span className='flex items-center gap-1'>
                        <Clock className='w-4 h-4' />
                        Video Lecture
                      </span>
                      <span className='flex items-center gap-1'>
                        <PlayCircle className='w-4 h-4' />
                        HD Quality
                      </span>
                    </div>
                  </div>

                  {/* Lock/Play icon */}
                  <div className="p-3 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                    <PlayCircle className='w-6 h-6 text-blue-600' />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className='text-center py-12 bg-gray-50 rounded-xl'>
              <BookOpen className='w-16 h-16 mx-auto mb-4 text-gray-300' />
              <p className="text-gray-500 text-lg">No modules available yet</p>
            </div>
          )}
        </div>

        {/* Course Features Grid */}
        <div className='bg-gradient-to-br from-slate-900 to-blue-900 rounded-2xl shadow-xl p-8 text-white'>
          <h2 className='text-3xl font-bold mb-8 text-center'>What's Included</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {[
              { icon: Award, text: 'Certificate of Completion', color: 'yellow' },
              { icon: Clock, text: 'Lifetime Access', color: 'green' },
              { icon: PlayCircle, text: 'Full HD Video Lectures', color: 'blue' },
              { icon: BookOpen, text: `${course.modules?.length || 0} Detailed Modules`, color: 'purple' },
            ].map((item, idx) => (
              <div key={idx} className='flex items-center gap-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-5 hover:bg-white/20 transition-all group'>
                <div className={`p-3 bg-${item.color}-500/20 rounded-lg group-hover:scale-110 transition-transform`}>
                  <item.icon className={`w-6 h-6 text-${item.color}-300`} />
                </div>
                <span className='font-semibold text-lg'>{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className='relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl p-12 text-white text-center shadow-2xl'>
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10">
            <Star className="w-12 h-12 mx-auto mb-4 text-yellow-300" />
            <h3 className='text-4xl font-bold mb-3'>Transform Your Career Today</h3>
            <p className='text-xl text-blue-100 mb-8 max-w-2xl mx-auto'>
              Join thousands of students who have already mastered their skills with this course
            </p>
            <button 
              onClick={() => buyCourseHandler(course)}
              disabled={isPending}
              className='group inline-flex items-center gap-3 bg-white text-blue-600 hover:bg-gray-100 disabled:bg-gray-300 px-12 py-5 rounded-xl font-bold text-xl transition-all shadow-2xl hover:shadow-3xl hover:scale-105 disabled:cursor-not-allowed disabled:scale-100'
            >
              <ShoppingCart className='w-6 h-6 group-hover:scale-110 transition-transform' />
              <span>{isPending ? 'Processing Payment...' : `Start Learning - ₹${course.amount}`}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleCourse;
