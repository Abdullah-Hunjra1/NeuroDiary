// import React, { createContext, useContext, useState } from 'react';
// import { ChevronFirst, ChevronLast, Menu } from "lucide-react";
// import { FaSignOutAlt, FaBrain } from "react-icons/fa";
// import { FiUser } from "react-icons/fi";

// export const SidebarContext = createContext();

// const SidebarItemParent = ({ children, userProfile = { name: "User" }, onLogout }) => {
//   const [expanded, setExpanded] = useState(false);
//   const [visible, setVisible] = useState(false); // For mobile toggle

//   const logout = () => {
//     localStorage.removeItem("token");
//     if (onLogout) {
//       onLogout();
//     }
//   };

//   return (
//     <>
//       {/* Hamburger button (only on small screens) */}
//       <button
//         onClick={() => setVisible(!visible)}
//         className="md:hidden fixed top-4 left-4 z-50 p-2 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-md shadow-lg"
//       >
//         <Menu />
//       </button>

//       {/* Overlay for mobile */}
//       {visible && (
//         <div
//           className="md:hidden fixed inset-0 bg-black/30 z-30"
//           onClick={() => setVisible(false)}
//         />
//       )}

//       <aside
//         className={`h-screen fixed z-40 transition-transform duration-300 md:relative
//           ${visible ? "translate-x-0" : "-translate-x-full"}
//           ${expanded ? "w-72" : "w-16"} transition-all duration-300
//           md:translate-x-0 md:flex`}
//       >
//         <nav className="relative h-full flex flex-col bg-white/90 backdrop-blur-xl shadow-2xl border-r border-slate-200/50 overflow-visible">
//           {/* Top Logo and Toggle */}
//           <div className="p-4 pb-2 flex justify-between items-center border-b border-slate-200/50">
//             <div className={`flex items-center space-x-3 transition-all duration-300 ${expanded ? "w-52" : "w-0 overflow-hidden"}`}>
//               <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
//                 <FaBrain className="text-white text-lg" />
//               </div>
//               {expanded && (
//                 <div>
//                   <h1 className="text-xl font-bold bg-gradient-to-r from-teal-700 to-cyan-700 bg-clip-text text-transparent">
//                     MindTracker
//                   </h1>
//                   <p className="text-xs text-slate-500">Your Mental Wellness Hub</p>
//                 </div>
//               )}
//             </div>
//             <button
//               onClick={() => setExpanded((curr) => !curr)}
//               className="p-1.5 mx-auto rounded-lg text-slate-400 hover:bg-gradient-to-r hover:from-teal-50 hover:to-cyan-50 hover:text-teal-600 transition-all duration-300 hidden md:block border border-transparent hover:border-teal-200/50"
//             >
//               {expanded ? <ChevronFirst /> : <ChevronLast />}
//             </button>
//           </div>

//           <SidebarContext.Provider value={{ expanded, setExpanded }}>
//             <ul className="flex-1 px-3 py-4 space-y-2 overflow-y-auto overflow-x-hidden">{children}</ul>
//           </SidebarContext.Provider>

//           {/* Bottom User Info */}
//           <div className="border-t border-slate-200/50 p-4 space-y-3 flex-shrink-0">
//             {/* User Profile */}
//             <div className={`flex items-center transition-all duration-300 ${expanded ? "space-x-3 p-3" : "justify-center p-2"} rounded-xl bg-gradient-to-r from-blue-50/80 to-cyan-50/80 hover:from-blue-50 hover:to-cyan-50 cursor-pointer border border-blue-200/30`}>
//               <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
//                 {userProfile?.image ? (
//                   <img src={userProfile.image} alt="Profile" className="w-full h-full rounded-full object-cover" />
//                 ) : (
//                   <FiUser className="text-white text-sm" />
//                 )}
//               </div>
//               {expanded && (
//                 <div className="flex-1 min-w-0">
//                   <p className="text-sm font-semibold text-slate-800 truncate">{userProfile?.name || 'User'}</p>
//                   <div className="flex items-center space-x-2">
//                     <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse"></div>
//                     <p className="text-xs text-slate-600">Active User</p>
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Logout Button */}
//             <div 
//               onClick={logout}
//               className={`flex items-center cursor-pointer text-red-600 transition-all duration-300 border border-transparent hover:border-red-200/50 rounded-xl hover:bg-red-50/80 ${expanded ? "space-x-3 p-3" : "justify-center p-2"}`}
//             >
//               <div className="w-9 h-9 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
//                 <FaSignOutAlt className="text-red-600 text-sm" />
//               </div>
//               {expanded && (
//                 <span className="text-sm font-medium">Logout</span>
//               )}
//             </div>
//           </div>
//         </nav>
//       </aside>
//     </>
//   );
// };

// export default SidebarItemParent;




// import { createContext, useContext, useState } from "react";
// import { ChevronFirst, ChevronLast, MoreVertical, Menu } from "lucide-react";


// export const SidebarContext = createContext();

// const Sidebar = ({ children }) => {
//   const { expanded, setExpanded } = useContext(SidebarContext);
//   const [visible, setVisible] = useState(false); // For mobile toggle

//   return (
//     <>
    
//       {/* Hamburger button (only on small screens) */}
//       <button
//         onClick={() => setVisible(!visible)}
//         className="md:hidden fixed top-4 left-4 z-50 p-2 bg-purple-700 text-white rounded-md shadow-lg"
//       >
//         <Menu />
//       </button>

//       <aside
//         className={`h-screen fixed z-40 transition-transform duration-300 md:relative
//           ${visible ? "translate-x-0" : "-translate-x-full"}
//           ${expanded ? "w-64" : "w-16"} transition-all duration-300
//           md:translate-x-0 md:flex`}
//       >
//         <nav className={`relative h-full flex flex-col bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 border-r border-purple-500/30 shadow-xl backdrop-blur-md overflow-visible `}>
//           {/* Top Logo and Toggle */}
//           <div className="p-4 pb-2 flex justify-between items-center">
//             <h1
//               className={`text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 transition-all duration-300 ${expanded ? "w-52" : "w-0"}`}
//             >
//               SentiScope
//             </h1> 
//             <button
//               onClick={() => setExpanded((curr) => !curr)}
//               className="p-1.5 mx-auto rounded-lg text-gray-300 hover:bg-gradient-to-r hover:from-purple-600 hover:to-indigo-600 hover:text-white transition hidden md:block"
//             >
//               {expanded ? <ChevronFirst /> : <ChevronLast />}
//             </button>
//           </div>

//           <SidebarContext.Provider value={{ expanded, setExpanded }}>
//             <ul className="flex-1 px-3">{children}</ul>
//           </SidebarContext.Provider>

//           {/* Bottom User Info */}
//           <div className="border-t border-purple-500/20 flex p-3">
//             <img
//               src="https://ui-avatars.com/api/?name=Toheed+Khan&background=c7d2fe&color=3730a3&bold=true"
//               alt="User"
//               className="w-10 h-10 rounded-md mx-auto"
//             />
//             <div className={`flex justify-between items-center transition-all duration-300 ${expanded ? "w-52 ml-3" : "w-0"}`}>
//               <div className={`flex flex-col ${expanded ? "opacity-100" : "opacity-0"}`}>
//                 <h4 className="font-semibold text-white">Toheed Ullah</h4>
//                 <span className="text-xs text-gray-400">toheedullah002@gmail.com</span>
//               </div>
//               <MoreVertical size={20} className="text-gray-400" />
//             </div>
//           </div>
//         </nav>
//       </aside>
//     </>
//   );
// };

// export default Sidebar;






import { createContext, useContext, useState } from "react";
import { ChevronFirst, ChevronLast, MoreVertical, Menu } from "lucide-react";

export const SidebarContext = createContext();

const Sidebar = ({ children }) => {
  const { expanded, setExpanded } = useContext(SidebarContext);
  const [visible, setVisible] = useState(false); // For mobile toggle

  return (
    <>
      {/* Hamburger button (only on small screens) */}
      <button
        onClick={() => setVisible(!visible)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-gradient-to-r from-teal-500 to-cyan-600 text-white rounded-md shadow-lg hover:from-teal-600 hover:to-cyan-700 transition-all duration-200"
      >
        <Menu />
      </button>

      <aside
        className={`h-screen fixed z-40 transition-transform duration-300 md:relative
          ${visible ? "translate-x-0" : "-translate-x-full"}
          ${expanded ? "w-64" : "w-16"} transition-all duration-300
          md:translate-x-0 md:flex`}
      >
        <nav className={`relative h-full flex flex-col bg-gradient-to-br from-slate-50 via-blue-50/50 to-cyan-50/80 border-r border-cyan-200/40 shadow-xl backdrop-blur-md overflow-visible`}>
          {/* Top Logo and Toggle */}
          <div className="p-4 pb-2 flex justify-between items-center">
            <h1
              className={`text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 transition-all duration-300 ${expanded ? "w-52" : "w-0"}`}
            >
              NeuroDiary
            </h1> 
            <button
              onClick={() => setExpanded((curr) => !curr)}
              className="p-1.5 mx-auto rounded-lg text-slate-600 hover:bg-gradient-to-r hover:from-teal-100 hover:to-cyan-100 hover:text-teal-700 transition-all duration-200 hidden md:block border border-cyan-200/30"
            >
              {expanded ? <ChevronFirst /> : <ChevronLast />}
            </button>
          </div>

          <SidebarContext.Provider value={{ expanded, setExpanded }}>
            <ul className="flex-1 px-3">{children}</ul>
          </SidebarContext.Provider>

      
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;