import Analytics from '@/Pages/Admin/Analytics'
import Dashboard from '@/Pages/Admin/Dashboard'
import DashboardCourse from '@/Pages/Admin/DashboardCourse'
import Login from '@/Pages/Auth/Login'
import Register from '@/Pages/Auth/Register'
import Purchase from '@/Pages/Payment/Purchase'
import Home from '@/Pages/User/Home'
import PurchasedCourse from '@/Pages/User/PurchasedCourse'
import Quiz from '@/Pages/User/Quiz'
import SingleCourse from '@/Pages/User/SingleCourse'
import YourCourse from '@/Pages/User/YourCourse'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { ProtectRoute } from './ProtectedRoute'

const MainRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={
          <ProtectRoute>
            <Home/>
          </ProtectRoute>
        }/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/singleCourse/:courseId' element={
          <ProtectRoute>

          <SingleCourse/> 
          </ProtectRoute>
          
          }/>
        <Route path='/purchase' element={
          <ProtectRoute>

            <Purchase/>
          </ProtectRoute>
          
          }/>
        <Route path='/yourCourse' element={
          <ProtectRoute>
            <YourCourse/>
          </ProtectRoute>
        }/>
        <Route path='/purchasedCourse/:id' element={
          <ProtectRoute>

            <PurchasedCourse/>
          </ProtectRoute>
          }/>
        <Route path='/quiz/:quizId' element={
          <ProtectRoute>

            <Quiz/>
          </ProtectRoute>
          }/>
        <Route path='/dashboard' element={
          
          <ProtectRoute>
          <Dashboard/>

          </ProtectRoute>
          }>
        
         <Route index element={
          
           <ProtectRoute>
          <Analytics />

          </ProtectRoute>
          } /> {/* /dashboard pe default */}
        <Route path='course' element={
          <ProtectRoute>

            <DashboardCourse />
          </ProtectRoute>
          } /> 
        </Route>
    </Routes>
  )
}

export default MainRoutes