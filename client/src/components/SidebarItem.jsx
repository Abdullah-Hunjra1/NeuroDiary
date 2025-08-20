// import { useContext } from "react";
// import { SidebarContext } from "./SidebarItemParent.jsx";

// const SidebarItem = ({ icon, text, description, hoverText, active, gradient, onClick }) => {
//   const { expanded } = useContext(SidebarContext);

//   return (
//     <li
//       onClick={onClick}
//       className={`
//         group relative rounded-xl cursor-pointer transition-all duration-300
//         flex items-center
//         ${expanded ? "p-3 space-x-3" : "p-2 justify-center"}
//         ${active 
//           ? 'bg-gradient-to-r from-teal-50/80 to-cyan-50/80 border border-teal-200/50 shadow-sm' 
//           : 'hover:bg-white/60 hover:shadow-md border border-transparent hover:border-slate-200/30'
//         }
//       `}
//     >
//       <div className={`
//         rounded-lg flex items-center justify-center shadow-sm flex-shrink-0
//         ${expanded ? "w-9 h-9" : "w-8 h-8"}
//         ${active 
//           ? `bg-gradient-to-br ${gradient}` 
//           : 'bg-gradient-to-br from-slate-100 to-blue-100 group-hover:from-slate-200 group-hover:to-blue-200'
//         }
//         transition-all duration-300
//       `}>
//         <span className={`text-sm ${active ? 'text-white' : 'text-slate-600'}`}>
//           {icon}
//         </span>
//       </div>

//       {/* Text content for expanded sidebar */}
//       {expanded && (
//         <div className="flex-1 min-w-0">
//           <span className={`
//             font-medium text-sm block truncate
//             ${active ? 'text-teal-700' : 'text-slate-700 group-hover:text-slate-800'}
//           `}>
//             {text}
//           </span>
//           {description && (
//             <p className={`
//               text-xs truncate
//               ${active ? 'text-teal-600' : 'text-slate-500'}
//             `}>
//               {description}
//             </p>
//           )}
//         </div>
//       )}

//       {/* Tooltip for collapsed sidebar */}
//       {!expanded && (
//         <div className="absolute left-full top-1/2 -translate-y-1/2 z-50 whitespace-nowrap rounded-lg px-3 py-2 bg-white/95 backdrop-blur-sm text-slate-700 text-sm invisible opacity-0 translate-x-[10px] transition-all duration-300 group-hover:visible group-hover:opacity-100 group-hover:translate-x-[15px] shadow-lg border border-slate-200/50">
//           {hoverText || text}
//           <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-white/95"></div>
//         </div>
//       )}
//     </li>
//   );
// };

// export default SidebarItem;


// import { useContext } from "react";
// import { SidebarContext } from "./SidebarItemParent.jsx";
// import { AnimatePresence, motion } from "framer-motion";

// const SidebarItem = ({ icon, text, hoverText, active, alert, onClick }) => {
//   const { expanded } = useContext(SidebarContext);

//   return (
//     <AnimatePresence>
//       <motion.li
//         initial={{ opacity: 0, x: -20 }}
//         animate={{ opacity: 1, x: 0 }}
//         transition={{ duration: 0.2, delay: 0.1 }}
//         whileHover={{ scale: 1.05 }}
//         whileTap={{ scale: 0.95 }}
//         onClick={onClick}
//         className={`relative flex items-center py-2 px-3 my-1 h-11 font-medium rounded-xl cursor-pointer transition-all duration-300 group
//           ${active
//             ? "bg-gradient-to-tr from-purple-500 via-pink-500 to-cyan-500 text-white shadow-lg"
//             : "text-gray-300 hover:bg-gradient-to-r hover:from-purple-600 hover:to-indigo-600 hover:text-white"}`}
//       >
//         {icon}
//         <span
//           className={`overflow-hidden transition-[width] ml-3 text-sm tracking-wide ${
//             expanded ? "w-48" : "w-0"
//           }`}
//         >
//           {text}
//         </span>

//         {!expanded && (
//           <div className="absolute left-full top-1/2 -translate-y-1/2 z-50 whitespace-nowrap rounded-md px-2 py-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-sm invisible opacity-0 translate-x-[30px] transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-[5px]">
//             {hoverText}
//           </div>
//         )}
//       </motion.li>
//     </AnimatePresence>
//   );
// };

// export default SidebarItem;









import { useContext } from "react";
import { SidebarContext } from "./SidebarItemParent.jsx";
import { AnimatePresence, motion } from "framer-motion";

const SidebarItem = ({ icon, text, hoverText, active, alert, onClick }) => {
  const { expanded } = useContext(SidebarContext);

  return (
    <AnimatePresence>
      <motion.li
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.2, delay: 0.1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
        className={`relative flex items-center py-2 px-3 my-1 h-11 font-medium rounded-xl cursor-pointer transition-all duration-300 group
          ${active
            ? "bg-gradient-to-tr from-teal-500 via-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-200/50"
            : "text-slate-700 hover:bg-gradient-to-r hover:from-teal-100 hover:to-cyan-100 hover:text-teal-700 hover:shadow-sm"}`}
      >
        {icon}
        <span
          className={`overflow-hidden transition-[width] ml-3 text-sm tracking-wide font-medium ${
            expanded ? "w-48" : "w-0"
          }`}
        >
          {text}
        </span>

        {!expanded && (
          <div className="absolute left-full top-1/2 -translate-y-1/2 z-50 whitespace-nowrap rounded-md px-2 py-1 bg-gradient-to-r from-teal-600 to-cyan-600 text-white text-sm invisible opacity-0 translate-x-[30px] transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-[5px] shadow-lg">
            {hoverText}
          </div>
        )}
      </motion.li>
    </AnimatePresence>
  );
};

export default SidebarItem;