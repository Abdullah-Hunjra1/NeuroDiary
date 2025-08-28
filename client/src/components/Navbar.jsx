import React, { useContext, useState, useEffect, useRef } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext.jsx";

const Navbar = () => {
  const navigate = useNavigate();
  const { token, setToken, userData } = useContext(AppContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const logout = () => {
    setToken(false);
    localStorage.removeItem("token");
    setIsUserMenuOpen(false);
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setIsUserMenuOpen(false);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const NavigationLink = ({ to, children, mobile = false }) => (
    <NavLink
      to={to}
      onClick={mobile ? closeMobileMenu : undefined}
      className={({ isActive }) =>
        mobile
          ? `flex items-center px-4 py-3 text-base font-medium rounded-lg transition-all duration-200 ${isActive
            ? 'bg-gradient-to-r from-teal-50 to-cyan-50 text-teal-600 border-l-4 border-teal-500'
            : 'text-slate-700 hover:bg-slate-50 hover:text-teal-600'
          }`
          : `relative px-3 py-2 text-sm font-medium transition-all duration-300 ${isActive
            ? 'text-teal-600'
            : 'text-slate-700 hover:text-teal-600'
          }`
      }
    >
      {({ isActive }) => (
        <>
          <span>{children}</span>
          {!mobile && isActive && (
            <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full"></div>
          )}
        </>
      )}
    </NavLink>
  );

  return (
    <>
      <nav className="sticky top-0 z-50 backdrop-blur-lg bg-gradient-to-r from-slate-50/95 via-blue-50/90 to-cyan-50/95 border-b border-slate-200/60 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">N</span>
                </div>
                <div onClick={() => navigate("/")} className="items-center cursor-pointer group z-10">
                  <h1 className="text-xl font-bold bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent">
                    NeuroDiary
                  </h1>
                  <p className="text-xs text-gray-500">Your AI Companion</p>
                </div>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-8">
              <NavigationLink to="/">Home</NavigationLink>
              <NavigationLink to="/about">About</NavigationLink>
              <NavigationLink to="/pricing">Pricing</NavigationLink>
              <NavigationLink to="/contact">Contact</NavigationLink>
            </div>

            {/* Desktop User Section */}
            <div className="hidden lg:flex items-center">
              {token ? (
                <div className="relative group" ref={userMenuRef}>
                  <div className="flex items-center space-x-3 cursor-pointer p-2 rounded-lg hover:bg-slate-100/70 transition-all duration-200">
                    <div className="relative">
                      <img
                        className="w-9 h-9 rounded-full object-cover ring-2 ring-teal-100 group-hover:ring-teal-200 transition-all duration-200"
                        src={userData?.image || assets.profile_pic}
                        alt="Profile"
                      />
                      <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                    </div>
                    <svg
                      className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-all duration-200 group-hover:rotate-180"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>

                  {/* Desktop Dropdown Menu - Hover Activated */}
                  <div className="absolute right-0 top-full mt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-1 group-hover:translate-y-0">
                    <div className="bg-white rounded-xl shadow-lg border border-slate-200 py-2 backdrop-blur-lg">
                      <div className="px-4 py-3 border-b border-slate-100">
                        <p className="text-sm font-medium text-slate-900">
                          {userData?.name || 'User'}
                        </p>
                        <p className="text-xs text-slate-500 truncate">
                          {userData?.email || 'user@example.com'}
                        </p>
                      </div>

                      <div className="py-1">
                        <button
                          onClick={() => navigate("user-profile")}
                          className="flex items-center w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-teal-600 transition-colors duration-150"
                        >
                          <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          My Profile
                        </button>

                        <button
                          onClick={() => navigate("dashboard/user-dashboard")}
                          className="flex items-center w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-teal-600 transition-colors duration-150"
                        >
                          <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                          </svg>
                          Dashboard
                        </button>

                        <button
                          onClick={logout}
                          className="flex items-center w-full px-4 py-2 text-sm text-slate-700 hover:bg-red-50 hover:text-red-600 transition-colors duration-150"
                        >
                          <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                          </svg>
                          Logout
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => navigate("/login")}
                  className=""
                >
                  <span className=" btn-primary">Sign In</span>
                  {/* <div className="absolute inset-0 rounded-full bg-gradient-to-r from-teal-400 to-cyan-400 opacity-0 hover:opacity-20 transition-opacity duration-300"></div> */}
                </button>
              )}
            </div>

            {/* Mobile/Tablet Right Section */}
            <div className="flex lg:hidden items-center space-x-3">
              {/* Mobile User Avatar (if logged in) */}
              {token && (
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="relative p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                >
                  <img
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-teal-100"
                    src={userData?.image || assets.profile_pic}
                    alt="Profile"
                  />
                  <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 border border-white rounded-full"></div>
                </button>
              )}

              {/* Mobile Menu Button - Fixed */}
              <button
                onClick={toggleMobileMenu}
                className="relative p-2 text-slate-600 hover:text-teal-600 hover:bg-slate-100/70 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                aria-label="Toggle mobile menu"
                type="button"
              >
                <div className="w-6 h-6 relative">
                  <span
                    className={`absolute block w-full h-0.5 bg-current rounded-sm transition-all duration-300 ${isMobileMenuOpen ? 'top-2.5 rotate-45' : 'top-1'
                      }`}
                  />
                  <span
                    className={`absolute block w-full h-0.5 bg-current rounded-sm transition-all duration-300 ${isMobileMenuOpen ? 'top-2.5 opacity-0' : 'top-2.5 opacity-100'
                      }`}
                  />
                  <span
                    className={`absolute block w-full h-0.5 bg-current rounded-sm transition-all duration-300 ${isMobileMenuOpen ? 'top-2.5 -rotate-45' : 'top-4'
                      }`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile User Dropdown (appears below navbar) */}
        {token && isUserMenuOpen && (
          <div className="lg:hidden border-t border-slate-200/60 bg-white/95 backdrop-blur-sm">
            <div className="px-4 py-3 border-b border-slate-100">
              <p className="text-sm font-medium text-slate-900 truncate">
                {userData?.name || 'User'}
              </p>
              <p className="text-xs text-slate-500 truncate">
                {userData?.email || 'user@example.com'}
              </p>
            </div>
            <div className="py-2">
              <button
                onClick={() => {
                  navigate("user-profile");
                  setIsUserMenuOpen(false);
                }}
                className="flex items-center w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-teal-600 transition-colors duration-150"
              >
                <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                My Profile
              </button>

              <button
                onClick={() => {
                  navigate("dashboard/user-dashboard");
                  setIsUserMenuOpen(false);
                }}
                className="flex items-center w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-teal-600 transition-colors duration-150"
              >
                <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Dashboard
              </button>

              <button
                onClick={logout}
                className="flex items-center w-full px-4 py-2 text-sm text-slate-700 hover:bg-red-50 hover:text-red-600 transition-colors duration-150"
              >
                <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Mobile Menu Panel - Fixed */}
      <div
        className={`lg:hidden fixed top-16 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${isMobileMenuOpen
          ? 'translate-y-0 opacity-100 pointer-events-auto'
          : '-translate-y-full opacity-0 pointer-events-none'
          }`}
        ref={mobileMenuRef}
      >
        <div className="bg-white/95 backdrop-blur-lg border-b border-slate-200/60 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 py-6 space-y-2">
            {/* Navigation Links */}
            <div className="space-y-1">
              <NavigationLink to="/" mobile>Home</NavigationLink>
              <NavigationLink to="/about" mobile>About</NavigationLink>
              <NavigationLink to="/pricing" mobile>Pricing</NavigationLink>
              <NavigationLink to="/contact" mobile>Contact</NavigationLink>
            </div>

            {/* Mobile Login Button (if not logged in) */}
            {!token && (
              <div className="pt-4 border-t border-slate-200">
                <button
                  onClick={() => {
                    navigate("/login");
                    closeMobileMenu();
                  }}
                  className="w-full px-6 py-3 font-medium text-white bg-gradient-to-r from-teal-600 to-cyan-600 rounded-xl hover:from-teal-700 hover:to-cyan-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                >
                  Create Account
                </button>
              </div>
            )}

            {/* Mobile Dashboard Button (if logged in) */}
            {token && (
              <div className="pt-4 border-t border-slate-200">
                <button
                  onClick={() => {
                    navigate("dashboard/user-dashboard");
                    closeMobileMenu();
                  }}
                  className="w-full flex items-center justify-center px-6 py-3 font-medium text-teal-600 bg-gradient-to-r from-teal-50 to-cyan-50 border border-teal-200 rounded-xl hover:from-teal-100 hover:to-cyan-100 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  Go to Dashboard
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;