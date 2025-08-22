import React, { useState } from 'react'

import Sidebar from '../components/Sidebar'
import { Outlet } from 'react-router-dom'
import { SidebarContext } from '../components/SidebarItemParent'
import { Footer } from '../components'


const Dashboard = () => {
    const [expanded, setExpanded] = useState(true)
    console.log(expanded)
    return (
        <SidebarContext.Provider value={{ expanded, setExpanded }}>
            <div className='flex w-full h-screen overflow-hidden'>
                <div className="fixed top-17 left-0 h-full z-99 hidden md:block transition-all duration-300">
                    <Sidebar />
                </div>
                <div className={`flex-1 overflow-y-auto h-full transition-all duration-300
                ${expanded ? "lg:ml-64 md:ml-64" : "lg:ml-26 md:ml-26"}
                `}>
                    <Outlet />
                <Footer />
                </div>
            </div>
        </SidebarContext.Provider>
    )
}

export default Dashboard
