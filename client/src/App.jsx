import React from 'react'
import { Outlet } from 'react-router-dom'
import {Footer, Navbar} from './components/index.js'
import { useLocation } from 'react-router-dom'


import './index.css'

export const App = () => {
  const location = useLocation()
 

  return (
    <>
     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-cyan-50/20">
       <Navbar />
       <Outlet />
       {!location.pathname.startsWith("/dashboard") && <Footer />}

       
     </div>
    </>
  )
}

//  default App