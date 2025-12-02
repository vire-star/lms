import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Upload, ArrowLeft, BookOpen } from 'lucide-react';

const DashboardSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => {
    if (path === '/dashboard') {
      return location.pathname === '/dashboard';
    }
    return location.pathname.includes(path);
  };

  const menuItems = [
    {
      label: 'Analytics',
      path: '/dashboard',
      icon: LayoutDashboard
    },
    {
      label: 'Manage Courses',
      path: '/dashboard/course',
      icon: Upload
    }
  ];

  return (
    <div className='h-screen w-[22%] bg-slate-900 text-white flex flex-col shadow-xl'>
      {/* Header */}
      <div className='p-6 border-b border-slate-700'>
        <div className='flex items-center gap-2 mb-6'>
          <BookOpen className='w-8 h-8 text-blue-500' />
          <h1 className='text-xl font-bold'>LMS Admin</h1>
        </div>
        
        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          className='flex items-center gap-2 px-4 py-2 w-full text-sm bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors group'
        >
          <ArrowLeft className='w-4 h-4 group-hover:-translate-x-1 transition-transform' />
          Back to Home
        </button>
      </div>

      {/* Navigation Menu */}
      <nav className='flex-1 p-4 space-y-2'>
        <p className='text-xs uppercase text-slate-400 font-semibold px-3 mb-3'>
          Menu
        </p>
        
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`
                flex items-center gap-3 px-4 py-3 w-full rounded-lg transition-all
                ${active 
                  ? 'bg-blue-600 text-white shadow-lg' 
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }
              `}
            >
              <Icon className='w-5 h-5' />
              <span className='font-medium'>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className='p-4 border-t border-slate-700'>
        <div className='bg-slate-800 rounded-lg p-3'>
          <p className='text-xs text-slate-400'>Admin Panel</p>
          <p className='text-sm font-semibold mt-1'>Dashboard v1.0</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardSidebar;
