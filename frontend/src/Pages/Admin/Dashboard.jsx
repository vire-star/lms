import DashboardSidebar from '@/components/DashboardSidebar'
import React from 'react'

import { Outlet } from 'react-router-dom'

const Dashboard = () => {
  return (
    <div className='flex '>
        <DashboardSidebar/>
       <Outlet/>
    </div>
  )
}

export default Dashboard