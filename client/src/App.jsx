import React from 'react'
import { Outlet } from 'react-router-dom'
import {Footer, Navbar} from './components/index.js'
import './index.css'


export const App = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}

//  default App