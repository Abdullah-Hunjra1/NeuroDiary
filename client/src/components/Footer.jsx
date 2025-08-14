// import React from 'react';
// import { FaTwitter, FaFacebookF, FaGithub, FaLinkedinIn } from 'react-icons/fa';


// const Footer = () => (
//     <footer className="bg-[#2C3133] text-gray-300 px-6 md:px-16 pt-12 pb-6 rounded-t-3xl">
//       <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
//         {/* Brand & Description */}
//         <div>
//           <h2 className="text-white font-bold text-xl mb-3">NeuroDiary</h2>
//           <p className="text-sm text-gray-400">
//             Empowering you to track emotions and improve mental wellbeing through AI-enhanced journaling.
//           </p>
//           <div className="flex gap-4 mt-4">
//             <a href="#" className="text-[#006a80] hover:opacity-75"><i className="fab fa-x-twitter"><FaTwitter /></i></a>
//             <a href="#" className="text-[#006a80] hover:opacity-75"><i className="fab fa-facebook"><FaFacebookF /></i></a>
//             <a href="#" className="text-[#006a80] hover:opacity-75"><i className="fab fa-linkedin"><FaLinkedinIn /></i></a>
//             <a href="#" className="text-[#006a80] hover:opacity-75"><i className="fab fa-github"><FaGithub /></i></a>
//           </div>
//         </div>
  
//         {/* Product */}
//         <div>
//           <h4 className="text-white font-semibold mb-3">Product</h4>
//           <ul className="text-sm space-y-2">
//             <li><a href="#" className="hover:underline">Features</a></li>
//             <li><a href="#" className="hover:underline">Pricing</a></li>
//             <li><a href="#" className="hover:underline">Integrations</a></li>
//             <li><a href="#" className="hover:underline">Changelog</a></li>
//           </ul>
//         </div>
  
//         {/* Resources */}
//         <div>
//           <h4 className="text-white font-semibold mb-3">Resources</h4>
//           <ul className="text-sm space-y-2">
//             <li><a href="#" className="hover:underline">Documentation</a></li>
//             <li><a href="#" className="hover:underline">Tutorials</a></li>
//             <li><a href="#" className="hover:underline">Blog</a></li>
//             <li><a href="#" className="hover:underline">Support</a></li>
//           </ul>
//         </div>
  
//         {/* Company */}
//         <div>
//           <h4 className="text-white font-semibold mb-3">Company</h4>
//           <ul className="text-sm space-y-2">
//             <li><a href="#" className="hover:underline">About</a></li>
//             <li><a href="#" className="hover:underline">Careers</a></li>
//             <li><a href="#" className="hover:underline">Contact</a></li>
//             <li><a href="#" className="hover:underline">Partners</a></li>
//           </ul>
//         </div>
//       </div>
  
//       <div className="border-t border-gray-600 mt-10 pt-4 text-sm text-gray-400 text-center">
//         <p>© 2025 NeuroDiary. All rights reserved.</p>
//         <div className="flex justify-center gap-6 mt-2">
//           <a href="#" className="hover:underline">Privacy Policy</a>
//           <a href="#" className="hover:underline">Terms of Service</a>
//           <a href="#" className="hover:underline">Cookies Settings</a>
//         </div>
//       </div>
//     </footer>
//   );


// export default Footer;  











import React from 'react';
import { FaTwitter, FaFacebookF, FaGithub, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => (
  <footer className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-gray-300">
    {/* Background Pattern */}
    <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.05)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
    
    {/* Top Border Gradient */}
    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-teal-500 to-transparent opacity-60"></div>
    
    <div className="relative px-6 md:px-16 pt-16 pb-8">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand & Description */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-lg flex items-center justify-center mr-3">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h2 className="text-white font-bold text-2xl bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
                NeuroDiary
              </h2>
            </div>
            <p className="text-gray-400 leading-relaxed mb-6 max-w-sm">
              Empowering you to track emotions and improve mental wellbeing through 
              <span className="text-teal-400 font-medium"> AI-enhanced journaling</span>.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-3">
              <a 
                href="#" 
                className="group relative p-3 bg-slate-800/50 border border-slate-700/50 rounded-lg hover:border-teal-500/50 transition-all duration-300 hover:bg-teal-500/10"
              >
                <FaTwitter className="w-5 h-5 text-gray-400 group-hover:text-teal-400 transition-colors duration-300" />
                <div className="absolute inset-0 bg-gradient-to-r from-teal-500/20 to-cyan-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>
              <a 
                href="#" 
                className="group relative p-3 bg-slate-800/50 border border-slate-700/50 rounded-lg hover:border-blue-500/50 transition-all duration-300 hover:bg-blue-500/10"
              >
                <FaFacebookF className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors duration-300" />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>
              <a 
                href="#" 
                className="group relative p-3 bg-slate-800/50 border border-slate-700/50 rounded-lg hover:border-cyan-500/50 transition-all duration-300 hover:bg-cyan-500/10"
              >
                <FaLinkedinIn className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition-colors duration-300" />
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-teal-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>
              <a 
                href="#" 
                className="group relative p-3 bg-slate-800/50 border border-slate-700/50 rounded-lg hover:border-slate-400/50 transition-all duration-300 hover:bg-slate-500/10"
              >
                <FaGithub className="w-5 h-5 text-gray-400 group-hover:text-slate-300 transition-colors duration-300" />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-500/20 to-slate-400/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-6 relative">
              Product
              <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-teal-500 to-transparent rounded-full"></div>
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors duration-200 flex items-center group">
                  <span className="w-1.5 h-1.5 bg-teal-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors duration-200 flex items-center group">
                  <span className="w-1.5 h-1.5 bg-teal-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors duration-200 flex items-center group">
                  <span className="w-1.5 h-1.5 bg-teal-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                  Integrations
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors duration-200 flex items-center group">
                  <span className="w-1.5 h-1.5 bg-teal-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                  Changelog
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-6 relative">
              Resources
              <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-cyan-500 to-transparent rounded-full"></div>
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors duration-200 flex items-center group">
                  <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors duration-200 flex items-center group">
                  <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                  Tutorials
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors duration-200 flex items-center group">
                  <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors duration-200 flex items-center group">
                  <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                  Support
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-6 relative">
              Company
              <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-blue-500 to-transparent rounded-full"></div>
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-200 flex items-center group">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                  About
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-200 flex items-center group">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-200 flex items-center group">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-200 flex items-center group">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                  Partners
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Signup
        <div className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 border border-slate-700/50 rounded-2xl p-8 mb-12">
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-white text-xl font-semibold mb-3">Stay Updated</h3>
            <p className="text-gray-400 mb-6">Get the latest updates on new features and mental health tips.</p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500/50 transition-all duration-200"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white rounded-lg font-medium transition-all duration-200 hover:shadow-lg hover:shadow-teal-500/25">
                Subscribe
              </button>
            </div>
          </div>
        </div> */}

        {/* Bottom Section */}
        <div className="border-t border-slate-700/50 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center text-gray-400 text-sm">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              © 2025 NeuroDiary. All rights reserved.
            </div>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors duration-200">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors duration-200">
                Cookie Settings
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Bottom Gradient */}
    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-500/50 to-transparent"></div>
  </footer>
);

export default Footer;