import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import { Outlet } from 'react-router-dom'
import { SidebarContext } from '../components/SidebarItemParent'
import { Footer } from '../components'

const Dashboard = () => {
  const [expanded, setExpanded] = useState(true)

  return (
    <SidebarContext.Provider value={{ expanded, setExpanded }}>
      <div className="flex flex-col min-h-screen">
        
        {/* Main area */}
        <div className="flex flex-1">
          {/* Sidebar (sticky) */}
          <div
            className={`hidden md:block transition-all duration-300
            ${expanded ? 'lg:w-70 md:w-64' : 'lg:w-26 md:w-26'}`}
          >
            <div className="sticky top-17 h-[calc(100vh-68px)]">
              <Sidebar />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-y-auto">
            <Outlet />
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </SidebarContext.Provider>
  )
}

export default Dashboard
