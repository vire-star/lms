import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useCreateCourse, useGetAllCourse } from '@/hooks/Course/course.hook';
import { useCreateModule } from '@/hooks/Module/module.hook';

const DashboardCourse = () => {
  const [openCourse, setOpenCourse] = useState(false);
  const [openModule, setOpenModule] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState(null);

  const { data, isLoading } = useGetAllCourse();
  
  // Course form
  const { register: registerCourse, handleSubmit: handleSubmitCourse, reset: resetCourse, formState: { errors: errorsCourse } } = useForm();
  
  // Module form
  const { register: registerModule, handleSubmit: handleSubmitModule, reset: resetModule, formState: { errors: errorsModule } } = useForm();
  
  const { mutate: createCourse, isPending: isPendingCourse } = useCreateCourse();
  const { mutate: createModule, isPending: isPendingModule } = useCreateModule();

  // Course submit handler
  const onSubmitCourse = (data) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('amount', data.amount);
    formData.append('thumbnail', data.thumbnail[0]);

    createCourse(formData, {
      onSuccess: () => {
        toast.success("Course created successfully!");
        resetCourse();
        setOpenCourse(false);
      },
      onError: (error) => {
        toast.error(error?.response?.data?.message || "Failed to create course");
      }
    });
  };

  // Module submit handler
  const onSubmitModule = (data) => {
    const formData = new FormData();
    formData.append('courseId', selectedCourseId);
    formData.append('title', data.title);
    formData.append('video', data.video[0]);

    createModule(formData, {
      onSuccess: () => {
        toast.success("Module added successfully!");
        resetModule();
        setOpenModule(false);
      },
      onError: (error) => {
        toast.error(error?.response?.data?.message || "Failed to add module");
      }
    });
  };

  // Open module dialog
  const openModuleDialog = (courseId) => {
    setSelectedCourseId(courseId);
    setOpenModule(true);
  };

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p className="text-lg">Loading courses...</p>
      </div>
    );
  }

  return (
    <div className='w-full h-screen bg-gray-50 p-6 overflow-y-auto'>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Manage Courses</h1>
          <p className="text-sm text-gray-600 mt-1">
            Total Courses: <span className="font-semibold">{data?.count || 0}</span>
          </p>
        </div>

        {/* Create Course Dialog */}
        <Dialog open={openCourse} onOpenChange={setOpenCourse}>
          <DialogTrigger className='bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 font-medium transition-colors'>
            + Create Course
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Create Your Course</DialogTitle>
              <DialogDescription>
                Fill in the details to create a new course
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmitCourse(onSubmitCourse)} className="space-y-4 mt-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Course Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  {...registerCourse('title', { required: 'Title is required' })}
                  placeholder="e.g. Complete MERN Stack"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  disabled={isPendingCourse}
                />
                {errorsCourse.title && (
                  <p className="text-red-500 text-xs mt-1">{errorsCourse.title.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  {...registerCourse('description', { required: 'Description is required' })}
                  placeholder="Course description..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  disabled={isPendingCourse}
                />
                {errorsCourse.description && (
                  <p className="text-red-500 text-xs mt-1">{errorsCourse.description.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Price (₹) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  {...registerCourse('amount', { 
                    required: 'Price is required',
                    min: { value: 0, message: 'Price must be positive' }
                  })}
                  placeholder="499"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  disabled={isPendingCourse}
                />
                {errorsCourse.amount && (
                  <p className="text-red-500 text-xs mt-1">{errorsCourse.amount.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Thumbnail <span className="text-red-500">*</span>
                </label>
                <input
                  type="file"
                  {...registerCourse('thumbnail', { required: 'Thumbnail is required' })}
                  accept="image/*"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
                  disabled={isPendingCourse}
                />
                {errorsCourse.thumbnail && (
                  <p className="text-red-500 text-xs mt-1">{errorsCourse.thumbnail.message}</p>
                )}
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="submit"
                  disabled={isPendingCourse}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-md font-medium transition-colors"
                >
                  {isPendingCourse ? 'Creating...' : 'Create Course'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    resetCourse();
                    setOpenCourse(false);
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                  disabled={isPendingCourse}
                >
                  Cancel
                </button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Courses List */}
      <div className='space-y-3 pb-6'>
        {data?.courses?.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
            <p className="text-gray-500">No courses yet. Create your first course!</p>
          </div>
        ) : (
          data?.courses?.map((item, index) => (
            <div 
              className='bg-white rounded-lg shadow-sm border border-gray-200 p-4' 
              key={index}
            >
              <div className='flex items-start gap-4'>
                {/* Thumbnail */}
                <div className='h-20 w-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0'>
                  {item.thumbnail ? (
                    <img 
                      className='h-full w-full object-cover' 
                      src={item.thumbnail} 
                      alt={item.title}
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center text-gray-400 text-xs">
                      No Image
                    </div>
                  )}
                </div>

                {/* Course Info */}
                <div className='flex-1'>
                  <h2 className='text-lg font-semibold text-gray-800 mb-1'>
                    {item.title}
                  </h2>
                  <p className='text-sm text-gray-600 line-clamp-2 mb-2'>
                    {item.description}
                  </p>
                  <div className='flex items-center gap-4 mb-3 text-xs text-gray-500'>
                    <span className='bg-blue-50 text-blue-600 px-2 py-1 rounded font-medium'>
                      ₹{item.amount}
                    </span>
                    <span>{item.modules?.length || 0} modules</span>
                  </div>

                  {/* Actions */}
                  <div className='flex gap-2'>
                    <button
                      onClick={() => openModuleDialog(item._id)}
                      className='px-3 py-1.5 text-sm bg-green-50 text-green-600 rounded hover:bg-green-100 transition-colors font-medium'
                    >
                      + Add Module
                    </button>
                    <button className='px-3 py-1.5 text-sm bg-red-50 text-red-600 rounded hover:bg-red-100 transition-colors font-medium'>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Module Dialog */}
      <Dialog open={openModule} onOpenChange={setOpenModule}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add Module</DialogTitle>
            <DialogDescription>
              Upload a video module for this course
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmitModule(onSubmitModule)} className="space-y-4 mt-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Module Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...registerModule('title', { required: 'Module title is required' })}
                placeholder="e.g. Introduction to React"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                disabled={isPendingModule}
              />
              {errorsModule.title && (
                <p className="text-red-500 text-xs mt-1">{errorsModule.title.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Video File <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                {...registerModule('video', { required: 'Video file is required' })}
                accept="video/*"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
                disabled={isPendingModule}
              />
              {errorsModule.video && (
                <p className="text-red-500 text-xs mt-1">{errorsModule.video.message}</p>
              )}
              <p className="text-xs text-gray-500 mt-1">Supported formats: MP4, WebM, MOV</p>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                type="submit"
                disabled={isPendingModule}
                className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-md font-medium transition-colors"
              >
                {isPendingModule ? 'Uploading...' : 'Add Module'}
              </button>
              <button
                type="button"
                onClick={() => {
                  resetModule();
                  setOpenModule(false);
                }}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                disabled={isPendingModule}
              >
                Cancel
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DashboardCourse;
