import React from 'react';

const benefits = [
  {
    icon: '😊',
    title: 'Instant Mood Enhancement',
    text: 'Get immediate emotional support with AI-powered positive reframes and alternative perspectives that help shift your mindset.',
    color: 'from-teal-400 to-blue-500',
    bgColor: 'from-teal-50 to-blue-50'
  },
  {
    icon: '📝',
    title: 'Long-term Progress Tracking',
    text: 'Build lasting mental health improvements through consistent daily check-ins, reflections, and personalized insights.',
    color: 'from-blue-400 to-indigo-500',
    bgColor: 'from-blue-50 to-indigo-50'
  },
  {
    icon: '⏰',
    title: '24/7 Accessibility',
    text: 'Your mental health companion is always available - no appointments, no waitlists, just instant support whenever you need it.',
    color: 'from-indigo-400 to-purple-500',
    bgColor: 'from-indigo-50 to-purple-50'
  },
  {
    icon: '🧠',
    title: 'Personalized AI Learning',
    text: 'Our advanced AI develops a deep understanding of your unique patterns, providing increasingly personalized support over time.',
    color: 'from-purple-400 to-pink-500',
    bgColor: 'from-purple-50 to-pink-50'
  },
  {
    icon: '🔒',
    title: 'Privacy-First Design',
    text: 'Your thoughts remain completely private with end-to-end encryption. Your data belongs to you and stays secure.',
    color: 'from-pink-400 to-red-500',
    bgColor: 'from-pink-50 to-red-50'
  },
];

const Features = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-teal-100 text-teal-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            Key Features
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-teal-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6 leading-tight">
            Powerful Features for
            <br />
            Better Mental Health
          </h1>
          
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-[22px] font-semibold text-slate-800 mb-4 leading-relaxed">
              Improve your <span className="bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent font-bold">mental health</span> today by journaling
              <br className="hidden md:block" />
              and chatting with our advanced AI companion
            </h2>
            <p className="text-[17px] text-slate-600 leading-relaxed">
              Experience the next generation of digital wellness with features designed by mental health professionals and powered by cutting-edge AI technology.
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
          {benefits.map((item, idx) => (
            <div
              key={idx}
              className="group relative bg-white/70 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-white/50 hover:shadow-2xl hover:scale-105 transition-all duration-500 cursor-pointer overflow-hidden"
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${item.bgColor} opacity-30 group-hover:opacity-50 transition-opacity duration-300`}></div>
              
              {/* Content */}
              <div className="relative z-10">
                {/* Icon */}
                <div className={`w-12 h-12 bg-gradient-to-r ${item.color} rounded-3xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}>
                  <span className="text-xl filter drop-shadow-sm">{item.icon}</span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-slate-800 mb-4 group-hover:text-teal-600 transition-colors duration-300">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-slate-600 leading-relaxed text-[16px] group-hover:text-slate-700 transition-colors duration-300">
                  {item.text}
                </p>

                {/* Hover Effect Arrow */}
                <div className="mt-6 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                  <svg className="w-6 h-6 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-teal-200/20 to-blue-200/20 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-blue-200/20 to-indigo-200/20 rounded-full blur-lg group-hover:scale-125 transition-transform duration-500"></div>
            </div>
          ))}
        </div>

        {/* Additional Features Section */}
        <div className="bg-gradient-to-r from-teal-500 via-blue-500 to-indigo-600 rounded-3xl p-12 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl font-bold mb-4">Why Choose NeuroDiary?</h3>
            <p className="text-blue-100 text-[18px] mb-8 leading-relaxed">
              Join thousands of users who have transformed their mental health journey with our innovative platform
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h4 className="text-xl font-bold mb-2">Lightning Fast</h4>
                <p className="text-blue-100 text-sm">Get instant AI insights and mood analysis in real-time</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="text-xl font-bold mb-2">Scientifically Backed</h4>
                <p className="text-blue-100 text-sm">Built on proven cognitive behavioral therapy principles</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h4 className="text-xl font-bold mb-2">Community Support</h4>
                <p className="text-blue-100 text-sm">Connect with others on similar wellness journeys</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;