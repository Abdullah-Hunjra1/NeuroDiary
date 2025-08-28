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