// import React, { useState } from 'react';
// import { useNavigate } from "react-router-dom";
// import {
//   FaSmile,
//   FaChartLine,
//   FaLightbulb,
//   FaMicrophone,
//   FaSignOutAlt,
//   FaBrain,
//   FaPlus,
//   FaBook,
//   FaBars,
//   FaTimes
// } from "react-icons/fa";
// import { FiSettings, FiPieChart, FiUser } from "react-icons/fi";

// const Sidebar = ({ userProfile = { name: "User" } }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const navigate = useNavigate();

//   const toggleSidebar = () => {
//     setIsOpen(!isOpen);
//   };

//   const logout = () => {
//     localStorage.removeItem("token");
//     navigate("/login");
//   };

//   const menuItems = [
//     {
//       icon: FiPieChart,
//       label: "Dashboard",
//       description: "Overview & Stats",
//       path: "/dashboard",
//       active: true,
//       gradient: "from-teal-500 to-cyan-600"
//     },
//     {
//       icon: FaPlus,
//       label: "Create Entry",
//       description: "Write new diary",
//       path: "/create-entry",
//       gradient: "from-emerald-500 to-green-600"
//     },
//     {
//       icon: FaBook,
//       label: "My Entries",
//       description: "View all entries",
//       path: "/my-entries",
//       gradient: "from-blue-500 to-indigo-600"
//     },
//     {
//       icon: FaSmile,
//       label: "Mood Tracker",
//       description: "Log your emotions",
//       path: "/mood-analytics",
//       gradient: "from-purple-500 to-pink-600"
//     },
//     {
//       icon: FaChartLine,
//       label: "AI Insights",
//       description: "Smart analytics",
//       path: "/ai-insights",
//       gradient: "from-orange-500 to-red-600"
//     },
//     {
//       icon: FaLightbulb,
//       label: "Recommendations",
//       description: "Personalized tips",
//       path: "/recommendations",
//       gradient: "from-yellow-500 to-orange-600"
//     },
//     {
//       icon: FaMicrophone,
//       label: "Voice Assistant",
//       description: "Talk it out",
//       path: "/voice-page",
//       gradient: "from-indigo-500 to-purple-600"
//     },
//     {
//       icon: FiSettings,
//       label: "Settings",
//       description: "Preferences",
//       path: "/settings",
//       gradient: "from-gray-500 to-slate-600"
//     }
//   ];

//   return (
//     <>
//       {/* Hamburger Button */}
//       <button
//         onClick={toggleSidebar}
//         className="fixed top-4 left-4 z-50 md:hidden bg-white/80 backdrop-blur-md shadow-lg border border-slate-200/50 rounded-xl p-3 hover:bg-white transition-all duration-300"
//       >
//         {isOpen ? (
//           <FaTimes className="text-slate-600 text-lg" />
//         ) : (
//           <FaBars className="text-slate-600 text-lg" />
//         )}
//       </button>

//       {/* Overlay for mobile */}
//       {isOpen && (
//         <div
//           className="fixed inset-0 bg-black/50 z-30 md:hidden"
//           onClick={toggleSidebar}
//         />
//       )}

//       {/* Sidebar */}
//       <aside className={`
//         fixed md:static top-0 left-0 h-full z-40
//         w-72 bg-white/90 backdrop-blur-xl shadow-2xl
//         border-r border-slate-200/50
//         transform transition-transform duration-300 ease-in-out
//         ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
//         flex flex-col
//       `}>
//         {/* Logo/Brand Section */}
//         <div className="p-4 border-b border-slate-200/50">
//           <div className="flex items-center space-x-3">
//             <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg">
//               <FaBrain className="text-white text-lg" />
//             </div>
//             <div>
//               <h1 className="text-xl font-bold bg-gradient-to-r from-teal-700 to-cyan-700 bg-clip-text text-transparent">
//                 MindTracker
//               </h1>
//               <p className="text-xs text-slate-500">Your Mental Wellness Hub</p>
//             </div>
//           </div>
//         </div>

//         {/* Navigation Menu */}
//         <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
//           {menuItems.map((item, index) => (
//             <div
//               key={index}
//               onClick={() => {
//                 navigate(item.path);
//                 setIsOpen(false); // Close sidebar on mobile after navigation
//               }}
//               className={`
//                 group relative rounded-xl p-3 cursor-pointer transition-all duration-300
//                 flex items-center space-x-3
//                 ${item.active 
//                   ? 'bg-gradient-to-r from-teal-50/80 to-cyan-50/80 border border-teal-200/50 shadow-sm' 
//                   : 'hover:bg-white/60 hover:shadow-md border border-transparent hover:border-slate-200/30'
//                 }
//               `}
//             >
//               <div className={`
//                 w-9 h-9 rounded-lg flex items-center justify-center shadow-sm
//                 ${item.active 
//                   ? `bg-gradient-to-br ${item.gradient}` 
//                   : 'bg-gradient-to-br from-slate-100 to-blue-100 group-hover:from-slate-200 group-hover:to-blue-200'
//                 }
//                 transition-all duration-300
//               `}>
//                 <item.icon className={`text-sm ${item.active ? 'text-white' : 'text-slate-600'}`} />
//               </div>
//               <div className="flex-1 min-w-0">
//                 <span className={`
//                   font-medium text-sm block truncate
//                   ${item.active ? 'text-teal-700' : 'text-slate-700 group-hover:text-slate-800'}
//                 `}>
//                   {item.label}
//                 </span>
//                 <p className={`
//                   text-xs truncate
//                   ${item.active ? 'text-teal-600' : 'text-slate-500'}
//                 `}>
//                   {item.description}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </nav>

//         {/* User Profile & Logout */}
//         <div className="p-4 border-t border-slate-200/50 space-y-3">
//           {/* User Profile */}
//           <div className="flex items-center space-x-3 p-3 rounded-xl bg-gradient-to-r from-blue-50/80 to-cyan-50/80 hover:from-blue-50 hover:to-cyan-50 cursor-pointer transition-all duration-300 border border-blue-200/30">
//             <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
//               {userProfile.image ? (
//                 <img src={userProfile.image} alt="Profile" className="w-full h-full rounded-full object-cover" />
//               ) : (
//                 <FiUser className="text-white text-sm" />
//               )}
//             </div>
//             <div className="flex-1 min-w-0">
//               <p className="text-sm font-semibold text-slate-800 truncate">{userProfile.name}</p>
//               <div className="flex items-center space-x-2">
//                 <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse"></div>
//                 <p className="text-xs text-slate-600">Active User</p>
//               </div>
//             </div>
//           </div>

//           {/* Logout Button */}
//           <div 
//             onClick={logout}
//             className="flex items-center space-x-3 p-3 rounded-xl hover:bg-red-50/80 cursor-pointer text-red-600 transition-all duration-300 border border-transparent hover:border-red-200/50"
//           >
//             <div className="w-9 h-9 bg-red-100 rounded-lg flex items-center justify-center">
//               <FaSignOutAlt className="text-red-600 text-sm" />
//             </div>
//             <span className="text-sm font-medium">Logout</span>
//           </div>
//         </div>
//       </aside>
//     </>
//   );
// };

// export default Sidebar;






// -----------------------------------------------------



// import React, { useState } from 'react';
// import { useNavigate } from "react-router-dom";
// import {
//   FaSmile,
//   FaChartLine,
//   FaLightbulb,
//   FaMicrophone,
//   FaSignOutAlt,
//   FaBrain,
//   FaPlus,
//   FaBook,
//   FaBars,
//   FaTimes
// } from "react-icons/fa";
// import { FiSettings, FiPieChart, FiUser } from "react-icons/fi";

// const Sidebar = ({ userProfile = { name: "User" } }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const navigate = useNavigate();

//   const toggleSidebar = () => {
//     setIsOpen(!isOpen);
//   };

//   const logout = () => {
//     localStorage.removeItem("token");
//     navigate("/login");
//   };

//   const menuItems = [
//     {
//       icon: FiPieChart,
//       label: "Dashboard",
//       description: "Overview & Stats",
//       path: "/dashboard",
//       active: true,
//       gradient: "from-teal-500 to-cyan-600"
//     },
//     {
//       icon: FaPlus,
//       label: "Create Entry",
//       description: "Write new diary",
//       path: "/create-entry",
//       gradient: "from-emerald-500 to-green-600"
//     },
//     {
//       icon: FaBook,
//       label: "My Entries",
//       description: "View all entries",
//       path: "/my-entries",
//       gradient: "from-blue-500 to-indigo-600"
//     },
//     {
//       icon: FaSmile,
//       label: "Mood Tracker",
//       description: "Log your emotions",
//       path: "/mood-analytics",
//       gradient: "from-purple-500 to-pink-600"
//     },
//     {
//       icon: FaChartLine,
//       label: "AI Insights",
//       description: "Smart analytics",
//       path: "/ai-insights",
//       gradient: "from-orange-500 to-red-600"
//     },
//     {
//       icon: FaLightbulb,
//       label: "Recommendations",
//       description: "Personalized tips",
//       path: "/recommendations",
//       gradient: "from-yellow-500 to-orange-600"
//     },
//     {
//       icon: FaMicrophone,
//       label: "Voice Assistant",
//       description: "Talk it out",
//       path: "/voice-page",
//       gradient: "from-indigo-500 to-purple-600"
//     }
//   ];

//   return (
//     <>
//       {/* Hamburger Button - Always visible on all screens */}
//       <button
//         onClick={toggleSidebar}
//         className={`
//           fixed top-4 z-50 bg-white/80 backdrop-blur-md shadow-lg border border-slate-200/50 rounded-xl p-3 hover:bg-white transition-all duration-300
//           ${isOpen ? 'left-[276px]' : 'left-4'}
//         `}
//         style={{
//           transform: isOpen ? 'translateX(0)' : 'translateX(0)'
//         }}
//       >
//         {isOpen ? (
//           <FaTimes className="text-slate-600 text-lg" />
//         ) : (
//           <FaBars className="text-slate-600 text-lg" />
//         )}
//       </button>

//       {/* Overlay when sidebar is open */}
//       {isOpen && (
//         <div
//           className="fixed inset-0 bg-black/30 z-30"
//           onClick={toggleSidebar}
//         />
//       )}

//       {/* Sidebar */}
//       <aside className={`
//         fixed top-0 left-0 z-40
//         w-72 bg-white/90 backdrop-blur-xl shadow-2xl
//         border-r border-slate-200/50
//         transform transition-transform duration-300 ease-in-out
//         ${isOpen ? 'translate-x-0' : '-translate-x-full'}
//         flex flex-col
//         h-screen
//         overflow-hidden
//       `}>
//         {/* Logo/Brand Section */}
//         <div className="p-4 border-b border-slate-200/50 flex-shrink-0">
//           <div className="flex items-center space-x-3">
//             <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg">
//               <FaBrain className="text-white text-lg" />
//             </div>
//             <div>
//               <h1 className="text-xl font-bold bg-gradient-to-r from-teal-700 to-cyan-700 bg-clip-text text-transparent">
//                 MindTracker
//               </h1>
//               <p className="text-xs text-slate-500">Your Mental Wellness Hub</p>
//             </div>
//           </div>
//         </div>

//         {/* Navigation Menu - Scrollable */}
//         <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
//           {menuItems.map((item, index) => (
//             <div
//               key={index}
//               onClick={() => {
//                 navigate(item.path);
//                 // Don't auto-close sidebar anymore since it works on all screens
//               }}
//               className={`
//                 group relative rounded-xl p-3 cursor-pointer transition-all duration-300
//                 flex items-center space-x-3
//                 ${item.active 
//                   ? 'bg-gradient-to-r from-teal-50/80 to-cyan-50/80 border border-teal-200/50 shadow-sm' 
//                   : 'hover:bg-white/60 hover:shadow-md border border-transparent hover:border-slate-200/30'
//                 }
//               `}
//             >
//               <div className={`
//                 w-9 h-9 rounded-lg flex items-center justify-center shadow-sm flex-shrink-0
//                 ${item.active 
//                   ? `bg-gradient-to-br ${item.gradient}` 
//                   : 'bg-gradient-to-br from-slate-100 to-blue-100 group-hover:from-slate-200 group-hover:to-blue-200'
//                 }
//                 transition-all duration-300
//               `}>
//                 <item.icon className={`text-sm ${item.active ? 'text-white' : 'text-slate-600'}`} />
//               </div>
//               <div className="flex-1 min-w-0">
//                 <span className={`
//                   font-medium text-sm block truncate
//                   ${item.active ? 'text-teal-700' : 'text-slate-700 group-hover:text-slate-800'}
//                 `}>
//                   {item.label}
//                 </span>
//                 <p className={`
//                   text-xs truncate
//                   ${item.active ? 'text-teal-600' : 'text-slate-500'}
//                 `}>
//                   {item.description}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </nav>

//         {/* User Profile & Logout - Fixed at bottom */}
//         <div className="p-4 border-t border-slate-200/50 space-y-3 flex-shrink-0">
//           {/* User Profile */}
//           <div className="flex items-center space-x-3 p-3 rounded-xl bg-gradient-to-r from-blue-50/80 to-cyan-50/80 hover:from-blue-50 hover:to-cyan-50 cursor-pointer transition-all duration-300 border border-blue-200/30">
//             <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
//               {userProfile.image ? (
//                 <img src={userProfile.image} alt="Profile" className="w-full h-full rounded-full object-cover" />
//               ) : (
//                 <FiUser className="text-white text-sm" />
//               )}
//             </div>
//             <div className="flex-1 min-w-0">
//               <p className="text-sm font-semibold text-slate-800 truncate">{userProfile.name}</p>
//               <div className="flex items-center space-x-2">
//                 <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse"></div>
//                 <p className="text-xs text-slate-600">Active User</p>
//               </div>
//             </div>
//           </div>

//           {/* Logout Button */}
//           <div 
//             onClick={logout}
//             className="flex items-center space-x-3 p-3 rounded-xl hover:bg-red-50/80 cursor-pointer text-red-600 transition-all duration-300 border border-transparent hover:border-red-200/50"
//           >
//             <div className="w-9 h-9 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
//               <FaSignOutAlt className="text-red-600 text-sm" />
//             </div>
//             <span className="text-sm font-medium">Logout</span>
//           </div>
//         </div>
//       </aside>

//       {/* Spacer for when sidebar is open - pushes content to the right */}
//       {isOpen && (
//         <div className="w-72 flex-shrink-0 transition-all duration-300"></div>
//       )}
//     </>
//   );
// };

// export default Sidebar;







// -----------------------------------









// import React, { useState } from 'react';
// import { useNavigate } from "react-router-dom";
// import {
//   FaSmile,
//   FaChartLine,
//   FaLightbulb,
//   FaMicrophone,
//   FaSignOutAlt,
//   FaBrain,
//   FaPlus,
//   FaBook
// } from "react-icons/fa";
// import { FiSettings, FiPieChart, FiUser } from "react-icons/fi";

// // SidebarItemParent component
// const SidebarItemParent = ({ children, isOpen, userProfile, onLogout }) => {
//   return (
//     <>
//       {/* Overlay when sidebar is open */}
//       {isOpen && (
//         <div
//           className="fixed inset-0 bg-black/30 z-30"
//           onClick={() => {}} // Handle this in parent component
//         />
//       )}

//       {/* Icon Strip - Visible when sidebar is closed */}
//       {!isOpen && (
//         <aside className="fixed top-0 left-0 z-40 w-16 bg-white/90 backdrop-blur-xl shadow-lg border-r border-slate-200/50 h-screen flex flex-col">
//           {/* Logo Section */}
//           <div className="p-3 border-b border-slate-200/50 flex-shrink-0">
//             <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg mx-auto">
//               <FaBrain className="text-white text-lg" />
//             </div>
//           </div>

//           {/* Icon Navigation */}
//           <nav className="flex-1 p-2 space-y-2 overflow-y-auto">
//             {React.Children.map(children, (child) => 
//               React.cloneElement(child, { iconOnly: true })
//             )}
//           </nav>

//           {/* User Profile Icon */}
//           <div className="p-2 border-t border-slate-200/50 flex-shrink-0">
//             <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full flex items-center justify-center shadow-lg mx-auto cursor-pointer">
//               {userProfile?.image ? (
//                 <img src={userProfile.image} alt="Profile" className="w-full h-full rounded-full object-cover" />
//               ) : (
//                 <FiUser className="text-white text-sm" />
//               )}
//             </div>
//           </div>
//         </aside>
//       )}

//       {/* Full Sidebar - Visible when open */}
//       {isOpen && (
//         <aside className="fixed top-0 left-0 z-40 w-72 bg-white/90 backdrop-blur-xl shadow-2xl border-r border-slate-200/50 flex flex-col h-screen overflow-hidden">
//           {/* Logo/Brand Section */}
//           <div className="p-4 border-b border-slate-200/50 flex-shrink-0">
//             <div className="flex items-center space-x-3">
//               <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg">
//                 <FaBrain className="text-white text-lg" />
//               </div>
//               <div>
//                 <h1 className="text-xl font-bold bg-gradient-to-r from-teal-700 to-cyan-700 bg-clip-text text-transparent">
//                   MindTracker
//                 </h1>
//                 <p className="text-xs text-slate-500">Your Mental Wellness Hub</p>
//               </div>
//             </div>
//           </div>

//           {/* Navigation Menu - Scrollable */}
//           <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
//             {React.Children.map(children, (child) => 
//               React.cloneElement(child, { iconOnly: false })
//             )}
//           </nav>

//           {/* User Profile & Logout - Fixed at bottom */}
//           <div className="p-4 border-t border-slate-200/50 space-y-3 flex-shrink-0">
//             {/* User Profile */}
//             <div className="flex items-center space-x-3 p-3 rounded-xl bg-gradient-to-r from-blue-50/80 to-cyan-50/80 hover:from-blue-50 hover:to-cyan-50 cursor-pointer transition-all duration-300 border border-blue-200/30">
//               <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
//                 {userProfile?.image ? (
//                   <img src={userProfile.image} alt="Profile" className="w-full h-full rounded-full object-cover" />
//                 ) : (
//                   <FiUser className="text-white text-sm" />
//                 )}
//               </div>
//               <div className="flex-1 min-w-0">
//                 <p className="text-sm font-semibold text-slate-800 truncate">{userProfile?.name || 'User'}</p>
//                 <div className="flex items-center space-x-2">
//                   <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse"></div>
//                   <p className="text-xs text-slate-600">Active User</p>
//                 </div>
//               </div>
//             </div>

//             {/* Logout Button */}
//             <div 
//               onClick={onLogout}
//               className="flex items-center space-x-3 p-3 rounded-xl hover:bg-red-50/80 cursor-pointer text-red-600 transition-all duration-300 border border-transparent hover:border-red-200/50"
//             >
//               <div className="w-9 h-9 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
//                 <FaSignOutAlt className="text-red-600 text-sm" />
//               </div>
//               <span className="text-sm font-medium">Logout</span>
//             </div>
//           </div>
//         </aside>
//       )}
//     </>
//   );
// };

// // SidebarItem component
// const SidebarItem = ({ icon, text, description, hoverText, active, onClick, gradient, iconOnly = false }) => {
//   if (iconOnly) {
//     // Icon only version for collapsed sidebar
//     return (
//       <div
//         onClick={onClick}
//         className={`
//           group relative rounded-lg p-2 cursor-pointer transition-all duration-300
//           flex items-center justify-center
//           ${active 
//             ? 'bg-gradient-to-r from-teal-50/80 to-cyan-50/80 border border-teal-200/50 shadow-sm' 
//             : 'hover:bg-white/60 hover:shadow-md border border-transparent hover:border-slate-200/30'
//           }
//         `}
//         title={hoverText || text}
//       >
//         <div className={`
//           w-8 h-8 rounded-lg flex items-center justify-center
//           ${active 
//             ? `bg-gradient-to-br ${gradient}` 
//             : 'bg-gradient-to-br from-slate-100 to-blue-100 group-hover:from-slate-200 group-hover:to-blue-200'
//           }
//           transition-all duration-300
//         `}>
//           {typeof icon === 'string' ? (
//             <i className={`${icon} text-sm ${active ? 'text-white' : 'text-slate-600'}`} />
//           ) : (
//             <span className={`text-sm ${active ? 'text-white' : 'text-slate-600'}`}>
//               {icon}
//             </span>
//           )}
//         </div>
//       </div>
//     );
//   }

//   // Full version for expanded sidebar
//   return (
//     <div
//       onClick={onClick}
//       className={`
//         group relative rounded-xl p-3 cursor-pointer transition-all duration-300
//         flex items-center space-x-3
//         ${active 
//           ? 'bg-gradient-to-r from-teal-50/80 to-cyan-50/80 border border-teal-200/50 shadow-sm' 
//           : 'hover:bg-white/60 hover:shadow-md border border-transparent hover:border-slate-200/30'
//         }
//       `}
//     >
//       <div className={`
//         w-9 h-9 rounded-lg flex items-center justify-center shadow-sm flex-shrink-0
//         ${active 
//           ? `bg-gradient-to-br ${gradient}` 
//           : 'bg-gradient-to-br from-slate-100 to-blue-100 group-hover:from-slate-200 group-hover:to-blue-200'
//         }
//         transition-all duration-300
//       `}>
//         {typeof icon === 'string' ? (
//           <i className={`${icon} text-sm ${active ? 'text-white' : 'text-slate-600'}`} />
//         ) : (
//           <span className={`text-sm ${active ? 'text-white' : 'text-slate-600'}`}>
//             {icon}
//           </span>
//         )}
//       </div>
//       <div className="flex-1 min-w-0">
//         <span className={`
//           font-medium text-sm block truncate
//           ${active ? 'text-teal-700' : 'text-slate-700 group-hover:text-slate-800'}
//         `}>
//           {text}
//         </span>
//         {description && (
//           <p className={`
//             text-xs truncate
//             ${active ? 'text-teal-600' : 'text-slate-500'}
//           `}>
//             {description}
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// // Main Sidebar component using the new structure
// const Sidebar = ({ userProfile = { name: "User" }, isOpen = false, onToggleSidebar }) => {
//   const [selected, setSelected] = useState("Dashboard");
//   const navigate = useNavigate();

//   const logout = () => {
//     localStorage.removeItem("token");
//     navigate("/login");
//   };

//   const handleOverlayClick = () => {
//     if (onToggleSidebar) {
//       onToggleSidebar(false);
//     }
//   };

//   return (
//     <>
//       {/* Overlay when sidebar is open */}
//       {isOpen && (
//         <div
//           className="fixed inset-0 bg-black/30 z-30"
//           onClick={handleOverlayClick}
//         />
//       )}

//       <SidebarItemParent isOpen={isOpen} userProfile={userProfile} onLogout={logout}>
//         <SidebarItem
//           icon={<FiPieChart />}
//           text="Dashboard"
//           description="Overview & Stats"
//           hoverText="Dashboard"
//           active={selected === "Dashboard"}
//           gradient="from-teal-500 to-cyan-600"
//           onClick={() => {
//             navigate("/dashboard");
//             setSelected("Dashboard");
//           }}
//         />
//         <SidebarItem
//           icon={<FaPlus />}
//           text="Create Entry"
//           description="Write new diary"
//           hoverText="Create"
//           active={selected === "Create Entry"}
//           gradient="from-emerald-500 to-green-600"
//           onClick={() => {
//             navigate("/create-entry");
//             setSelected("Create Entry");
//           }}
//         />
//         <SidebarItem
//           icon={<FaBook />}
//           text="My Entries"
//           description="View all entries"
//           hoverText="Entries"
//           active={selected === "My Entries"}
//           gradient="from-blue-500 to-indigo-600"
//           onClick={() => {
//             navigate("/my-entries");
//             setSelected("My Entries");
//           }}
//         />
//         <SidebarItem
//           icon={<FaSmile />}
//           text="Mood Tracker"
//           description="Log your emotions"
//           hoverText="Mood"
//           active={selected === "Mood Tracker"}
//           gradient="from-purple-500 to-pink-600"
//           onClick={() => {
//             navigate("/mood-analytics");
//             setSelected("Mood Tracker");
//           }}
//         />
//         <SidebarItem
//           icon={<FaChartLine />}
//           text="AI Insights"
//           description="Smart analytics"
//           hoverText="Insights"
//           active={selected === "AI Insights"}
//           gradient="from-orange-500 to-red-600"
//           onClick={() => {
//             navigate("/ai-insights");
//             setSelected("AI Insights");
//           }}
//         />
//         <SidebarItem
//           icon={<FaLightbulb />}
//           text="Recommendations"
//           description="Personalized tips"
//           hoverText="Tips"
//           active={selected === "Recommendations"}
//           gradient="from-yellow-500 to-orange-600"
//           onClick={() => {
//             navigate("/recommendations");
//             setSelected("Recommendations");
//           }}
//         />
//         <SidebarItem
//           icon={<FaMicrophone />}
//           text="Voice Assistant"
//           description="Talk it out"
//           hoverText="Voice"
//           active={selected === "Voice Assistant"}
//           gradient="from-indigo-500 to-purple-600"
//           onClick={() => {
//             navigate("/voice-page");
//             setSelected("Voice Assistant");
//           }}
//         />
//         <SidebarItem
//           icon={<FiSettings />}
//           text="Settings"
//           description="Preferences"
//           hoverText="Settings"
//           active={selected === "Settings"}
//           gradient="from-gray-500 to-slate-600"
//           onClick={() => {
//             navigate("/settings");
//             setSelected("Settings");
//           }}
//         />
//       </SidebarItemParent>
//     </>
//   );
// };

// export default Sidebar;



























// import React, { useState } from 'react';
// import { useNavigate } from "react-router-dom";
// import {
//   FaSmile,
//   FaChartLine,
//   FaLightbulb,
//   FaMicrophone,
//   FaPlus,
//   FaBook
// } from "react-icons/fa";
// import { FiSettings, FiPieChart } from "react-icons/fi";
// import { SidebarContext } from "./SidebarItemParent.jsx";
// import SidebarItemParent from "./SidebarItemParent.jsx";
// import SidebarItem from "./SidebarItem.jsx";

// const Sidebar = ({ userProfile = { name: "User" } }) => {
//   const [selected, setSelected] = useState("Dashboard");
//   const [expanded, setExpanded] = useState(false);
//   const navigate = useNavigate();

//   const logout = () => {
//     localStorage.removeItem("token");
//     navigate("/login");
//   };

//   return (
//     <SidebarContext.Provider value={{ expanded, setExpanded }}>
//       <SidebarItemParent userProfile={userProfile} onLogout={logout}>
//         <SidebarItem
//           icon={<FiPieChart />}
//           text="Dashboard"
//           description="Overview & Stats"
//           // hoverText="Dashboard"
//           active={selected === "Dashboard"}
//           gradient="from-teal-500 to-cyan-600"
//           onClick={() => {
//             navigate("/dashboard/user-dashboard");
//             setSelected("Dashboard");
//           }}
//         />
//         <SidebarItem
//           icon={<FaPlus />}
//           text="Create Entry"
//           description="Write new diary"
//           // hoverText="Create"
//           active={selected === "Create Entry"}
//           gradient="from-emerald-500 to-green-600"
//           onClick={() => {
//             navigate("/dashboard/create-entry");
//             setSelected("Create Entry");
//           }}
//         />
//         <SidebarItem
//           icon={<FaBook />}
//           text="My Entries"
//           description="View all entries"
//           // hoverText="Entries"
//           active={selected === "My Entries"}
//           gradient="from-blue-500 to-indigo-600"
//           onClick={() => {
//             navigate("/dashboard/my-entries");
//             setSelected("My Entries");
//           }}
//         />
//         <SidebarItem
//           icon={<FaSmile />}
//           text="Mood Tracker"
//           description="Log your emotions"
//           // hoverText="Mood"
//           active={selected === "Mood Tracker"}
//           gradient="from-purple-500 to-pink-600"
//           onClick={() => {
//             navigate("/dashboard/mood-analytics");
//             setSelected("Mood Tracker");
//           }}
//         />
//         <SidebarItem
//           icon={<FaChartLine />}
//           text="AI Insights"
//           description="Smart analytics"
//           // hoverText="Insights"
//           active={selected === "AI Insights"}
//           gradient="from-orange-500 to-red-600"
//           onClick={() => {
//             navigate("/dashboard/ai-insights");
//             setSelected("AI Insights");
//           }}
//         />
//         <SidebarItem
//           icon={<FaLightbulb />}
//           text="Recommendations"
//           description="Personalized tips"
//           hoverText="Tips"
//           active={selected === "Recommendations"}
//           gradient="from-yellow-500 to-orange-600"
//           onClick={() => {
//             navigate("/dashboard/recommendations");
//             setSelected("Recommendations");
//           }}
//         />
//         <SidebarItem
//           icon={<FaMicrophone />}
//           text="Voice Assistant"
//           description="Talk it out"
//           hoverText="Voice"
//           active={selected === "Voice Assistant"}
//           gradient="from-indigo-500 to-purple-600"
//           onClick={() => {
//             navigate("/dashboard/voice-page");
//             setSelected("Voice Assistant");
//           }}
//         />
//       </SidebarItemParent>
//     </SidebarContext.Provider>
//   );
// };

// export default Sidebar;



















import { SidebarItemParent, SidebarItem } from "../components/index.js";
import { useNavigate } from "react-router-dom";
import {
  LifeBuoy,
  Receipt,
  Boxes,
  Package,
  UserCircle,
  BarChart3,
  Settings,
  RefreshCw,
  BookMarked,
  Sparkles,
  Brain,
  HelpCircle
} from "lucide-react";
import {
  FaSmile,
  FaChartLine,
  FaLightbulb,
  FaMicrophone,
  FaPlus,
  FaBook
} from "react-icons/fa";
import { FiSettings, FiPieChart } from "react-icons/fi";
import { useState } from "react";

const Dashboard = () => {
  const [selected, setSelected] = useState("Dashboard");
  const navigate = useNavigate();

  return (
    <SidebarItemParent>
      <SidebarItem
        icon={<FiPieChart />}
        text="Dashboard"
        hoverText="Dashboard"
        active={selected === "Dashboard"}
        gradient="from-teal-500 to-cyan-600"
        onClick={() => {
          navigate("/dashboard/user-dashboard");
          setSelected("Dashboard");
        }}
      />
      <SidebarItem
        icon={<FaPlus />}
        text="Create Entry"
        description="Write new diary"
        hoverText="Create"
        active={selected === "Create Entry"}
        gradient="from-emerald-500 to-green-600"
        onClick={() => {
          navigate("/dashboard/create-entry");
          setSelected("Create Entry");
        }}
      />
      <SidebarItem
          icon={<FaBook />}
          text="My Entries"
          description="View all entries"
           hoverText="Entries"
          active={selected === "My Entries"}
          gradient="from-blue-500 to-indigo-600"
          onClick={() => {
            navigate("/dashboard/my-entries");
            setSelected("My Entries");
          }}
        />
        <SidebarItem
          icon={<FaSmile />}
          text="Mood Tracker"
          description="Log your emotions"
           hoverText="Mood"
          active={selected === "Mood Tracker"}
          gradient="from-purple-500 to-pink-600"
          onClick={() => {
            navigate("/dashboard/mood-analytics");
            setSelected("Mood Tracker");
          }}
        />
      <SidebarItem
          icon={<FaChartLine />}
          text="AI Insights"
          description="Smart analytics"
           hoverText="Insights"
          active={selected === "AI Insights"}
          gradient="from-orange-500 to-red-600"
          onClick={() => {
            navigate("/dashboard/ai-insights");
            setSelected("AI Insights");
          }}
        />
        <SidebarItem
          icon={<FaLightbulb />}
          text="Recommendations"
          description="Personalized tips"
          hoverText="Tips"
          active={selected === "Recommendations"}
          gradient="from-yellow-500 to-orange-600"
          onClick={() => {
            navigate("/dashboard/recommendations");
            setSelected("Recommendations");
          }}
        />
        <SidebarItem
          icon={<FaMicrophone />}
          text="Voice Assistant"
          description="Talk it out"
          hoverText="Voice"
          active={selected === "Voice Assistant"}
          gradient="from-indigo-500 to-purple-600"
          onClick={() => {
            navigate("/dashboard/voice-page");
            setSelected("Voice Assistant");
          }}
        />
    </SidebarItemParent>
  );
};

export default Dashboard;