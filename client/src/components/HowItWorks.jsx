import React from 'react';

const HowItWorks = () => {
  const steps = [
    {
      step: "01",
      title: 'Write Securely',
      desc: 'Start your mental health journey by writing private journal entries. All your thoughts are encrypted with military-grade security and stored safely in the cloud.',
      icon: '🔒',
      color: 'from-teal-400 to-blue-500',
      bgGradient: 'from-teal-50 to-blue-50',
      features: ['End-to-end encryption', 'Cloud backup', 'Cross-device sync']
    },
    {
      step: "02",
      title: 'AI-Powered Insights',
      desc: 'Our advanced AI engine analyzes your emotional patterns and mental state using cutting-edge OpenAI technology and specialized NLP algorithms.',
      icon: '🧠',
      color: 'from-blue-400 to-indigo-500',
      bgGradient: 'from-blue-50 to-indigo-50',
      features: ['Emotion detection', 'Pattern recognition', 'Sentiment analysis']
    },
    {
      step: "03",
      title: 'Track Your Progress',
      desc: 'Visualize your emotional journey with beautiful, intuitive dashboards that reveal trends, improvements, and areas for growth over time.',
      icon: '📊',
      color: 'from-indigo-400 to-purple-500',
      bgGradient: 'from-indigo-50 to-purple-50',
      features: ['Visual analytics', 'Progress tracking', 'Trend analysis']
    },
    {
      step: "04",
      title: 'Get Personalized Care',
      desc: 'Receive tailored recommendations, therapeutic prompts, and wellness activities designed specifically for your unique mental health needs.',
      icon: '🎯',
      color: 'from-purple-400 to-pink-500',
      bgGradient: 'from-purple-50 to-pink-50',
      features: ['Custom recommendations', 'Wellness activities', 'Therapeutic prompts']
    },
  ];

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50 py-16 px-6 md:px-20">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-teal-100 text-teal-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
            </svg>
            Simple 4-Step Process
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-teal-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6">
            How It Works
          </h2>
          <p className="text-[17px] text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Transform your mental health journey in four simple steps. Our scientifically-backed approach 
            combines the power of journaling with cutting-edge AI to provide personalized mental health support.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="group relative bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-white/50 hover:shadow-2xl hover:scale-105 transition-all duration-500 overflow-hidden"
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${step.bgGradient} opacity-30 group-hover:opacity-50 transition-opacity duration-300`}></div>
              
              {/* Step Number */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-r from-white to-gray-100 rounded-full flex items-center justify-center shadow-xl border-4 border-white">
                <span className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
                  {step.step}
                </span>
              </div>

              {/* Content */}
              <div className="relative z-10">
                {/* Icon and Title */}
                <div className="flex items-start gap-4 mb-6">
                  <div className={`w-12 h-12 bg-gradient-to-r ${step.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                    <span className="text-xl filter drop-shadow-sm">{step.icon}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-slate-800 group-hover:text-teal-600 transition-colors duration-300 mb-2">
                      {step.title}
                    </h3>
                    <div className={`w-20 h-1 bg-gradient-to-r ${step.color} rounded-full`}></div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-slate-600 leading-relaxed text-[16px] mb-4 group-hover:text-slate-700 transition-colors duration-300">
                  {step.desc}
                </p>

                {/* Features List */}
                <div className="space-y-3">
                  {step.features.map((feature, featureIdx) => (
                    <div key={featureIdx} className="flex items-center gap-3">
                      <div className={`w-2 h-2 bg-gradient-to-r ${step.color} rounded-full`}></div>
                      <span className="text-slate-600 text-sm font-medium">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Hover Arrow */}
                <div className="mt-6 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                  <div className="flex items-center gap-2 text-teal-500">
                    <span className="text-sm font-medium">Learn More</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-gradient-to-br from-teal-200/10 to-blue-200/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
            </div>
          ))}
        </div>

        {/* Process Flow Visualization */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full h-0.5 bg-gradient-to-r from-teal-300 via-blue-400 to-indigo-500 opacity-30"></div>
          </div>
          
          <div className="relative flex justify-between items-center">
            {steps.map((step, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div className={`w-4 h-4 bg-gradient-to-r ${step.color} rounded-full shadow-lg mb-2`}></div>
                <span className="text-xs font-medium text-slate-500">{step.step}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;