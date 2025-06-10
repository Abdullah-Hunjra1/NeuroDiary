import React from 'react';
import { FaTwitter, FaFacebookF, FaGithub, FaLinkedinIn } from 'react-icons/fa';


const Footer = () => (
    <footer className="bg-[#2C3133] text-gray-300 px-6 md:px-16 pt-12 pb-6 rounded-t-3xl">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand & Description */}
        <div>
          <h2 className="text-white font-bold text-xl mb-3">NeuroDiary</h2>
          <p className="text-sm text-gray-400">
            Empowering you to track emotions and improve mental wellbeing through AI-enhanced journaling.
          </p>
          <div className="flex gap-4 mt-4">
            <a href="#" className="text-[#006a80] hover:opacity-75"><i className="fab fa-x-twitter"><FaTwitter /></i></a>
            <a href="#" className="text-[#006a80] hover:opacity-75"><i className="fab fa-facebook"><FaFacebookF /></i></a>
            <a href="#" className="text-[#006a80] hover:opacity-75"><i className="fab fa-linkedin"><FaLinkedinIn /></i></a>
            <a href="#" className="text-[#006a80] hover:opacity-75"><i className="fab fa-github"><FaGithub /></i></a>
          </div>
        </div>
  
        {/* Product */}
        <div>
          <h4 className="text-white font-semibold mb-3">Product</h4>
          <ul className="text-sm space-y-2">
            <li><a href="#" className="hover:underline">Features</a></li>
            <li><a href="#" className="hover:underline">Pricing</a></li>
            <li><a href="#" className="hover:underline">Integrations</a></li>
            <li><a href="#" className="hover:underline">Changelog</a></li>
          </ul>
        </div>
  
        {/* Resources */}
        <div>
          <h4 className="text-white font-semibold mb-3">Resources</h4>
          <ul className="text-sm space-y-2">
            <li><a href="#" className="hover:underline">Documentation</a></li>
            <li><a href="#" className="hover:underline">Tutorials</a></li>
            <li><a href="#" className="hover:underline">Blog</a></li>
            <li><a href="#" className="hover:underline">Support</a></li>
          </ul>
        </div>
  
        {/* Company */}
        <div>
          <h4 className="text-white font-semibold mb-3">Company</h4>
          <ul className="text-sm space-y-2">
            <li><a href="#" className="hover:underline">About</a></li>
            <li><a href="#" className="hover:underline">Careers</a></li>
            <li><a href="#" className="hover:underline">Contact</a></li>
            <li><a href="#" className="hover:underline">Partners</a></li>
          </ul>
        </div>
      </div>
  
      <div className="border-t border-gray-600 mt-10 pt-4 text-sm text-gray-400 text-center">
        <p>© 2025 NeuroDiary. All rights reserved.</p>
        <div className="flex justify-center gap-6 mt-2">
          <a href="#" className="hover:underline">Privacy Policy</a>
          <a href="#" className="hover:underline">Terms of Service</a>
          <a href="#" className="hover:underline">Cookies Settings</a>
        </div>
      </div>
    </footer>
  );


export default Footer;  