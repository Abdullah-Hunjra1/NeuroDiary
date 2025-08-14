// import React from 'react';

// const HowItWorks = () => {
//   const steps = [
//     {
//       title: ' Write Securely',
//       desc: 'Start your day by writing a private journal entry. All entries are encrypted and stored securely.',
//     },
//     {
//       title: ' AI-Powered Insights',
//       desc: 'Our AI engine analyzes your mood and emotional trends using OpenAI or NLP.js.',
//     },
//     {
//       title: ' Track Progress',
//       desc: 'Visualize emotional trends and mental health patterns over time using intuitive dashboards.',
//     },
//     {
//       title: ' Get Recommendations',
//       desc: 'Receive personalized prompts, tips, and activities tailored to your emotional needs.',
//     },
//   ];

//   return (
//     <section className="py-16 bg-[#CEE6F0] text-center px-6 md:px-20">
//       <h2 className="text-4xl font-bold text-[#007189] mb-10">How It Works</h2>
//       <div className="grid md:grid-cols-2 gap-8 text-left">
//         {steps.map((step, idx) => (
//           <div key={idx} className="bg-[#B9D3DB] p-6 rounded-xl shadow-sm hover:shadow-md transition">
//             <h3 className="text-xl font-semibold mb-2 text-[#111111]">{step.title}</h3>
//             <p className="text-[#555555]">{step.desc}</p>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default HowItWorks;











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

        {/* Bottom CTA Section */}
        {/* <div className="mt-20 bg-gradient-to-r from-teal-500 via-blue-500 to-indigo-600 rounded-3xl p-12 text-white text-center">
          <div className="max-w-4xl mx-auto">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            
            <h3 className="text-4xl font-bold mb-4">Ready to Transform Your Mental Health?</h3>
            <p className="text-blue-100 text-xl mb-8 leading-relaxed">
              Join thousands of users who have already started their journey to better mental wellness. 
              Your transformation begins with a single journal entry.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-blue-50 transition-colors duration-200 transform hover:scale-105 shadow-lg">
                <div className="flex items-center gap-2 justify-center">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Start Your Journey Today
                </div>
              </button>
              
              <button className="bg-white/20 backdrop-blur-sm border border-white/30 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white/30 transition-colors duration-200 transform hover:scale-105">
                <div className="flex items-center gap-2 justify-center">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h8m-9 5a9 9 0 1118 0 9 9 0 01-18 0z" />
                  </svg>
                  Schedule a Demo
                </div>
              </button>
            </div> */}

            {/* Trust Indicators */}
            {/* <div className="mt-8 pt-8 border-t border-white/20">
              <div className="flex items-center justify-center gap-8 text-blue-100">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-medium">No Credit Card Required</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-medium">100% Private</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-sm font-medium">30-Day Free Trial</span>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default HowItWorks;