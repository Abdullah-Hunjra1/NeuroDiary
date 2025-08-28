import React from 'react';
import { assets } from '../assets/assets';

const Hero = () => (
  <section className="relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50 overflow-hidden">
    {/* Decorative Background Elements */}
    <div className="absolute inset-0">
      <div className="absolute top-20 left-20 w-32 h-32 bg-teal-200/30 rounded-full blur-2xl animate-pulse"></div>
      <div className="absolute top-40 right-32 w-40 h-40 bg-blue-200/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute bottom-32 left-1/4 w-24 h-24 bg-indigo-200/30 rounded-full blur-xl animate-pulse delay-500"></div>
      <div className="absolute bottom-20 right-20 w-36 h-36 bg-teal-300/20 rounded-full blur-2xl animate-pulse delay-1500"></div>
    </div>

    {/* Grid Pattern Overlay */}
    <div className="absolute inset-0 opacity-5">
      <div className="absolute inset-0" style={{
        backgroundImage: `radial-gradient(circle at 25px 25px, rgba(59, 130, 246, 0.3) 2px, transparent 0)`,
        backgroundSize: '50px 50px'
      }}></div>
    </div>

    <div className="relative flex flex-col lg:flex-row items-center justify-between gap-12 max-w-7xl mx-auto px-6 md:px-16 py-20 min-h-screen">
      {/* Left Content */}
      <div className="lg:w-1/2 text-center lg:text-left space-y-8">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-100 to-blue-100 text-teal-700 px-6 py-3 rounded-full text-sm font-semibold shadow-lg border border-teal-200/50 backdrop-blur-sm">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          #1 AI-Powered Mental Health Platform
        </div>

        {/* Main Heading */}
        <h1 className="text-3xl md:text-4xl lg:text-4xl font-bold leading-tight">
          <span className="bg-gradient-to-r from-teal-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Your AI-Powered
          </span>
          <br />
          <span className="text-slate-800">
            Mental Health
          </span>
          <br />
          <span className="relative">
            <span className="bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
              Companion
            </span>
            <div className="absolute -bottom-2 left-0 right-0 h-2 bg-gradient-to-r from-teal-400 to-blue-500 rounded-full transform -rotate-1"></div>
          </span>
        </h1>

        {/* Subheading */}
        <p className="text-xl md:text-[17px] text-slate-600 leading-relaxed max-w-2xl">
          Transform your mental wellness journey with <span className="font-semibold text-teal-600">NeuroDiary</span> -
          the intelligent platform that helps you track moods, reflect deeply, and gain
          personalized emotional insights through advanced AI analysis.
        </p>

        {/* Feature Highlights */}
        <div className="flex flex-wrap gap-4 justify-center lg:justify-start text-sm">
          {[
            {  text: "AI-Powered Insights" },
            {  text: "100% Private & Secure" },
            {  text: "Available 24/7" }
          ].map((feature, index) => (
            <div key={index} className="flex items-center gap-2 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full shadow-md border border-white/50">
              <span className="text-lg">{feature.icon}</span>
              <span className="text-slate-700 font-medium">{feature.text}</span>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
          <button className="group relative bg-gradient-to-r from-teal-500 to-blue-600 text-white px-6 py-3 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex items-center gap-2 text-[15px]">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Start Journaling Today
            </div>
          </button>

          <button className="group bg-white/70 backdrop-blur-sm border-2 border-teal-200 text-teal-600 px-6 py-3 rounded-2xl font-bold text-lg hover:bg-white hover:border-teal-300 hover:text-teal-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 group-hover:animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h8m-9 5a9 9 0 1118 0 9 9 0 01-18 0z" />
              </svg>
              Watch Demo
            </div>
          </button>
        </div>
      </div>

      {/* Right Content - Image */}
      <div className="lg:w-1/2 relative">
        <div className="relative max-w-2xl mx-auto lg:-mt-24 xl:-mt-32 transition-all duration-300">          {/* Floating Elements */}
          <div className="absolute -top-8 -left-8 w-16 h-16 bg-gradient-to-r from-teal-400 to-blue-500 rounded-2xl shadow-xl transform rotate-12 animate-float"></div>
          <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-2xl shadow-lg transform -rotate-12 animate-float-delayed"></div>
          <div className="absolute -bottom-8 -left-4 w-20 h-20 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-3xl shadow-xl transform rotate-6 animate-float-slow"></div>

          {/* Main Image Container */}
          <div className="relative bg-white/20 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/30 transform hover:scale-105 transition-transform duration-500">
            <div className="relative overflow-hidden rounded-2xl">
              <img
                src={assets.hero}
                alt="AI Journaling Interface"
                className="w-full max-w-md mx-auto object-contain filter drop-shadow-2xl"
              />

              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-blue-600/10 via-transparent to-teal-600/10 rounded-2xl"></div>
            </div>

            {/* Floating UI Elements */}
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl px-3 py-2 shadow-lg animate-pulse">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-xs font-medium text-slate-700">AI Active</span>
              </div>
            </div>

            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-xl px-3 py-2 shadow-lg">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-teal-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
                <span className="text-xs font-medium text-slate-700">Mood: Happy</span>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="absolute -bottom-12 -right-8 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-white/50 transform rotate-3 hover:rotate-0 transition-transform duration-300">
            <div className="text-center">
              <div className="text-2xl font-bold text-teal-600">10K+</div>
              <div className="text-xs text-slate-600">Happy Users</div>
            </div>
          </div>

          <div className="absolute top-1/2 -left-12 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-white/50 transform -rotate-6 hover:rotate-0 transition-transform duration-300">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">98%</div>
              <div className="text-xs text-slate-600">Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Bottom Wave */}
    <div className="absolute bottom-0 left-0 right-0">
      <svg viewBox="0 0 1440 120" className="w-full h-20 fill-white/20">
        <path d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,64C960,75,1056,85,1152,80C1248,75,1344,53,1392,42.7L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"></path>
      </svg>
    </div>

    {/* Custom Animations */}
    <style jsx>{`
      @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(12deg); }
        50% { transform: translateY(-10px) rotate(12deg); }
      }
      @keyframes float-delayed {
        0%, 100% { transform: translateY(0px) rotate(-12deg); }
        50% { transform: translateY(-15px) rotate(-12deg); }
      }
      @keyframes float-slow {
        0%, 100% { transform: translateY(0px) rotate(6deg); }
        50% { transform: translateY(-8px) rotate(6deg); }
      }
      .animate-float {
        animation: float 3s ease-in-out infinite;
      }
      .animate-float-delayed {
        animation: float-delayed 3s ease-in-out infinite 1s;
      }
      .animate-float-slow {
        animation: float-slow 4s ease-in-out infinite 0.5s;
      }
    `}</style>
  </section>
);

export default Hero;