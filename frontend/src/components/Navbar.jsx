import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useNavigate } from 'react-router-dom'
import { useLogout } from '@/hooks/User/user.hook'
import { useUserStore } from '@/Store/user.store'
import { GraduationCap, BookOpen, User, LayoutDashboard, LogOut, ChevronDown } from 'lucide-react'

const Navbar = () => {
  const navigate = useNavigate()
  const { user } = useUserStore()

  const yourCourseHandler = () => {
    navigate("/yourCourse")
  }

  const { mutate: logout } = useLogout()
  const logoutHandler = () => {
    logout()
  }

  return (
    <nav className='sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16'>
          
          {/* Logo Section */}
          <div 
            onClick={() => navigate('/')}
            className='flex items-center gap-3 cursor-pointer group'
          >
            <div className='w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform'>
              <GraduationCap className='w-6 h-6 text-white' />
            </div>
            <div>
              <h1 className='text-xl font-bold text-gray-900 tracking-tight'>LearnHub</h1>
              <p className='text-xs text-gray-500 -mt-0.5'>Learn & Grow</p>
            </div>
          </div>

          {/* Center Navigation */}
          <div className='hidden md:flex items-center gap-1'>
            <button 
              onClick={() => navigate('/')}
              className='px-4 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all'
            >
              Explore
            </button>
            <button 
              onClick={yourCourseHandler}
              className='px-4 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all'
            >
              My Courses
            </button>
            
          </div>

          {/* Right Section - User Menu */}
          <div className='flex items-center gap-4'>
            
           

            {/* User Profile Popover */}
            <Popover>
              <PopoverTrigger className='flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg transition-all cursor-pointer group'>
                <Avatar className='w-9 h-9 border-2 border-gray-200'>
                  <AvatarImage src={user?.avatar || "https://github.com/shadcn.png"} />
                  <AvatarFallback className='bg-gradient-to-br from-indigo-600 to-purple-600 text-white font-semibold'>
                    {user?.fullName?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className='hidden sm:block text-left'>
                  <p className='text-sm font-semibold text-gray-900 leading-tight'>
                    {user?.fullName || 'User'}
                  </p>
                 
                </div>
                <ChevronDown className='w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors' />
              </PopoverTrigger>

              <PopoverContent className='w-64 p-2 mt-2' align='end'>
                {/* User Info Header */}
                <div className='px-3 py-3 border-b border-gray-200 mb-2'>
                  <p className='text-sm font-semibold text-gray-900'>{user?.fullName}</p>
                  <p className='text-xs text-gray-500 mt-0.5'>{user?.email}</p>
                </div>

                {/* Menu Items */}
                <div className='space-y-1'>
                  <button
                    onClick={yourCourseHandler}
                    className='w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-all group'
                  >
                    <BookOpen className='w-4 h-4 group-hover:scale-110 transition-transform' />
                    Your Courses
                  </button>

                  <button
                    onClick={() => navigate('/profile')}
                    className='w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-all group'
                  >
                    <User className='w-4 h-4 group-hover:scale-110 transition-transform' />
                    Profile Settings
                  </button>

                  {user?.email === "v@gmail.com" && (
                    <button
                      onClick={() => navigate("/dashboard")}
                      className='w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-lg transition-all group'
                    >
                      <LayoutDashboard className='w-4 h-4 group-hover:scale-110 transition-transform' />
                      Admin Dashboard
                      <span className='ml-auto px-2 py-0.5 bg-purple-100 text-purple-600 text-xs font-semibold rounded'>
                        Admin
                      </span>
                    </button>
                  )}
                </div>

                {/* Logout Button */}
                <div className='mt-2 pt-2 border-t border-gray-200'>
                  <button
                    onClick={logoutHandler}
                    className='w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-all group'
                  >
                    <LogOut className='w-4 h-4 group-hover:scale-110 transition-transform' />
                    Logout
                  </button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
