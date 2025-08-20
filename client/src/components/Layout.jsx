import React, { useState, useContext } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { AppContext } from '../context/AppContext';

const DashboardLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { token, userData } = useContext(AppContext);

  const handleSidebarToggle = (isOpen) => {
    setIsSidebarOpen(isOpen);
  };

  // Only show sidebar and adjusted navbar when user is logged in
  if (!token) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <Navbar />
        <main className="pt-16">
          {children}
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Sidebar - only when logged in */}
      <Sidebar 
        isOpen={isSidebarOpen}
        onToggleSidebar={handleSidebarToggle}
        userProfile={userData}
      />
      
      {/* Navbar with sidebar toggle */}
      <Navbar 
        onToggleSidebar={handleSidebarToggle}
        isSidebarOpen={isSidebarOpen}
      />
      
      {/* Main Content - adjusts margin based on sidebar state */}
      <main className={`
        transition-all duration-300 pt-16
        ${isSidebarOpen ? 'ml-72' : 'ml-16'}
      `}>
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;