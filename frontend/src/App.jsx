import React from 'react'
import Navbar from './components/Navbar'
import MainRoutes from './Routes/MainRoutes'
import Home from './Pages/User/Home'
import { useLocation } from 'react-router-dom'

const App = () => {
  const location = useLocation();
  const hiddenRoutes =['/register','/login','/dashboard'];
   const shouldHideNavbar = hiddenRoutes.some((route) =>
    location.pathname.startsWith(route)
  );
  return (
    <div className=" min-h-screen bggreen8  w-full">
     {!shouldHideNavbar && <Navbar />}
      <MainRoutes/>
    

     
    </div>
  )
}

export default App