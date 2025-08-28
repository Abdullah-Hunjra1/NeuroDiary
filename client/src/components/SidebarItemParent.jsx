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