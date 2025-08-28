// import React from 'react';
// import { assets } from '../assets/assets';

// const About = () => {
//   return (
//     <div className="text-gray-800 bg-[#CEE6F0]">

//       {/* Hero Section with Content Overlay */}
//       <section className="relative w-full h-[90vh] flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: `url(${assets.about_image})` }}>
//         <div className="bg-black bg-opacity-10 absolute inset-0"></div>
//         <div className="relative z-10 grid md:grid-cols-2 px-6 md:px-20 w-full items-center">
//           {/* Left content */}
//           <div className="text-white">
//             <h1 className="text-4xl md:text-5xl font-bold mb-4">ABOUT US</h1>
//             <p className="text-lg mb-4">A store for people who want to buy less, but better.</p>
//             <p className="text-sm text-gray-200">
//               <span className="text-white">Home</span> &rarr; <span className="text-white font-semibold">About Us</span>
//             </p>
//           </div>

//           {/* Right content from NeuroDiary */}
//           <div className="bg-white bg-opacity-90 text-gray-900 p-6 rounded shadow-lg">
//             <h2 className="text-2xl font-bold mb-4">AI-Enhanced Personal “NeuroDiary”</h2>
//             <p className="mb-2">
//               In today’s fast-paced digital era, mental health is increasingly important. Traditional diary applications
//               allow users to record personal thoughts but rarely offer actionable insights into emotional trends.
//             </p>
//             <p className="mb-2">
//               The AI-Enhanced Personal Diary platform provides a secure space for private entries and advanced
//               AI-driven analysis to track emotional trends and flag potential mental health issues.
//             </p>
//             <p className="mb-2">
//               Built with the MERN stack, it ensures a scalable, responsive, and modern user experience.
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* Detailed Section */}
//       <section className="grid md:grid-cols-2 gap-8 bg-[#b1def1] items-center px-6 md:px-12 py-16 max-w-4xl mx-auto ">
//         {/* Text Section */}
//         <div>
//           <h2 className="text-3xl font-bold mb-4 text-primary">We Are NeuroDiary</h2>
//         <p className="text-gray-600 mb-4">
//           NeuroDiary is a modern mental health journaling platform that combines daily diary writing, mood tracking, and smart AI-powered feedback — helping you understand your emotional patterns and grow every day.
//         </p>
//         <p className="text-gray-600 mb-6">
//           Whether you're battling anxiety, navigating life transitions, or just want to improve your emotional self-awareness, NeuroDiary is designed to support your journey with scientifically grounded features and a personalized touch.
//         </p>
//         <p className="text-primary italic text-right font-medium">"AI for your mind. Insight for your soul."</p>

//         </div>

//         {/* Image Section */}
//         <div className="flex justify-center">
//           <img src={assets.contact_image} alt="Founder" className="max-w-sm rounded" />
//         </div>
//       </section> 





//       {/* Main Introduction */}
//       <section className="px-6 md:px-12 py-16 bg-white max-w-6xl mx-auto">
//         <h2 className="text-3xl font-bold mb-6">Our Mission</h2>

//           <p className="text-gray-700 mb-4">
//             Our goal is to empower users to monitor, understand, and improve their mental well-being through
//             cutting-edge AI technologies. NeuroDiary includes robust diary features, emotional trend tracking,
//             personalized insights, and even voice command support for hands-free use.
//           </p>

//           <p className="text-gray-700 mb-4">
//             With strong emphasis on privacy, users are assured secure account handling, data protection, and optional
//             premium features such as AI-powered recommendations and speech-to-text logging.
//           </p>

//           <p className="text-gray-700">
//             Whether you're an individual seeking clarity or a professional researching trends, NeuroDiary is built to
//             support and enhance your mental health journey.
//           </p>

//           <p className="mt-6 text-black font-bold">Hafiz Abdullah Iftikhar</p>
//       </section>

//       {/* Why Choose Us */}
//       <section className="bg-gray-50 py-16 px-6 md:px-12">
//         <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
//           <img src={assets.about_image} alt="Our Mission" className="rounded-lg shadow-md" />
//           <div>
//             <h3 className="text-2xl font-bold mb-4 text-primary">Why Choose NeuroDiary?</h3>
//             <ul className="grid grid-cols-2 gap-6 text-gray-700 text-sm">
//               <li>✅ AI-Powered Mood Detection</li>
//               <li>✅ Voice Command for Journaling</li>
//               <li>✅ Sentiment-Based Prompts</li>
//               <li>✅ Weekly Emotional Analytics</li>
//               <li>✅ Premium Support for Subscribers</li>
//               <li>✅ Secure and Private by Design</li>
//             </ul>
//           </div>
//         </div>
//       </section>

//       {/* Meet the Team */}
//       <section className="py-16 px-6 md:px-12 ">
//         <div className="max-w-6xl mx-auto text-center">
//           <h3 className="text-2xl font-bold text-primary mb-10">Meet the Creator</h3>
//           <div className="flex justify-center">
//             <div className="bg-gray-100 p-6 rounded-xl shadow text-center max-w-sm">
//               <img src={assets.abd} alt="Founder" className="rounded-full w-28 h-28 mx-auto mb-4 border-4 border-primary" />
//               <h4 className="font-semibold text-lg">Hafiz Abdullah</h4>
//               <p className="text-sm text-gray-600 mb-2">Founder, Full Stack Developer & AI Integrator</p>
//               <p className="text-xs text-gray-500 italic">“Built with passion to improve emotional well-being through technology.”</p>
//             </div>
//           </div>

//         </div>
//       </section>

//     </div>
//   );
// };

// export default About;









// import React from 'react';
// import { assets } from '../assets/assets';

// const About = () => {
//   return (
//     <div className="text-gray-800 bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">

//       {/* Hero Section with Content Overlay */}
//       <section className="relative w-full h-[90vh] flex items-center justify-center bg-cover bg-center overflow-hidden" style={{ backgroundImage: `url(${assets.about_image})` }}>
//         <div className="absolute inset-0 bg-gradient-to-r from-slate-900/70 to-blue-900/50"></div>
//         <div className="relative z-10 grid md:grid-cols-2 gap-12 px-6 md:px-20 w-full max-w-7xl items-center">
//           {/* Left content */}
//           <div className="text-white space-y-6">
//             <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mb-4">
//               ABOUT US
//             </h1>
//             <p className="text-lg md:text-xl font-light mb-4 leading-relaxed">
//               Empowering mental wellness through intelligent journaling
//             </p>
//             <div className="flex items-center space-x-2 text-sm text-blue-200">
//               <span className="hover:text-white transition-colors cursor-pointer">Home</span>
//               <span className="text-blue-300">→</span>
//               <span className="text-white font-semibold">About Us</span>
//             </div>
//           </div>

//           {/* Right content from NeuroDiary */}
//           <div className="backdrop-blur-md bg-white/90 text-gray-900 p-8 rounded-2xl shadow-2xl border border-white/20">
//             <h2 className="text-2xl font-bold mb-4 text-slate-800 leading-tight">
//               AI-Enhanced Personal <span className="text-blue-600">"NeuroDiary"</span>
//             </h2>
//             <div className="space-y-4 text-gray-700 leading-relaxed">
//               <p>
//                 In today's fast-paced digital era, mental health is increasingly important. Traditional diary applications
//                 allow users to record personal thoughts but rarely offer actionable insights into emotional trends.
//               </p>
//               <p>
//                 The AI-Enhanced Personal Diary platform provides a secure space for private entries and advanced
//                 AI-driven analysis to track emotional trends and flag potential mental health issues.
//               </p>
//               <p className="text-blue-700 font-medium">
//                 Built with the MERN stack, it ensures a scalable, responsive, and modern user experience.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Detailed Section */}
//       <section className="py-20 px-6 md:px-12">
//         <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
//           {/* Text Section */}
//           <div className="space-y-6">
//             <h2 className="text-3xl font-bold text-slate-800 mb-6">
//               What is <span className="text-blue-600">NeuroDiary ?</span>
//             </h2>
//             <div className="space-y-6 text-gray-700 text-[16px] leading-relaxed">
//               <p>
//                 NeuroDiary is a modern mental health journaling platform that combines daily diary writing, mood tracking, and smart AI-powered feedback — helping you understand your emotional patterns and grow every day.
//               </p>
//               <p>
//                 Whether you're battling anxiety, navigating life transitions, or just want to improve your emotional self-awareness, NeuroDiary is designed to support your journey with scientifically grounded features and a personalized touch.
//               </p>
//             </div>
//             <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-3.5 rounded-2xl border-l-4 border-blue-500">
//               <p className="text-blue-800 italic text-lg font-medium text-center">
//                 "AI for your mind. Insight for your soul."
//               </p>
//             </div>
//           </div>

//           {/* Image Section */}
//           <div className="flex justify-center">
//             <div className="relative">
//               <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-2xl transform rotate-3"></div>
//               <img
//                 src={assets.contact_image}
//                 alt="NeuroDiary Platform"
//                 className="relative max-w-sm rounded-2xl shadow-2xl transform -rotate-1 hover:rotate-0 transition-transform duration-300"
//               />
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Main Introduction */}
//       <section className="px-6 md:px-12 py-20 bg-white">
//         <div className="max-w-6xl mx-auto">
//           <div className="text-center mb-16">
//             <h2 className="text-3xl font-bold text-slate-800 mb-6">Our Mission</h2>
//             <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full"></div>
//           </div>

//           <div className="space-y-6 text-gray-700 text-[16px] leading-relaxed max-w-4xl mx-auto">
//             <p className=' font-semibold'>
//               Our goal is to empower users to monitor, understand, and improve their mental well-being through
//               cutting-edge AI technologies. NeuroDiary includes robust diary features, emotional trend tracking,
//               personalized insights, and even voice command support for hands-free use.
//             </p>

//             <p>
//               With strong emphasis on privacy, users are assured secure account handling, data protection, and optional
//               premium features such as AI-powered recommendations and speech-to-text logging.
//             </p>

//             <p>
//               Whether you're an individual seeking clarity or a professional researching trends, NeuroDiary is built to
//               support and enhance your mental health journey.
//             </p>

//             <div className="bg-gradient-to-r from-slate-50 to-blue-50 p-4 rounded-2xl border border-blue-100 mt-10">
//               <p className="text-slate-800 font-bold text-lg text-center">
//                 Hafiz Abdullah Iftikhar
//               </p>
//               <p className="text-blue-600 text-center mt-2 text-sm">Founder & Lead Developer</p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Why Choose Us */}
//       <section className="bg-gradient-to-br from-slate-100 to-blue-100 py-20 px-6 md:px-12">
//         <div className="max-w-6xl mx-auto">
//           <div className="grid md:grid-cols-2 gap-16 items-center">
//             {/* <div className="relative">
//               <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-2xl transform -rotate-2 "></div>
//               <img
//                 src={assets.about_image}
//                 alt="Why Choose NeuroDiary"
//                 className="relative rounded-2xl shadow-2xl transform rotate-1 hover:rotate-0 transition-transform duration-300 "
//               />
//             </div> */}
//             <div className="relative w-full h-[290px] sm:h-[300px] md:h-[350px] lg:h-[400px] xl:h-[480px] max-w-4xl mx-auto">
//               <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-2xl transform -rotate-2"></div>
//               <img
//                 src={assets.about_image}
//                 alt="Why Choose NeuroDiary"
//                 className="relative w-full h-full object-cover rounded-2xl shadow-2xl transform rotate-1 hover:rotate-0 transition-transform duration-300"
//               />
//             </div>



//             <div className="space-y-8">
//               <div>
//                 <h3 className="text-3xl font-bold text-slate-800 mb-4">
//                   Why Choose <span className="text-blue-600">NeuroDiary</span>?
//                 </h3>
//                 <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div>
//               </div>

//               <div className="grid grid-cols-1 gap-4">
//                 {[
//                   'AI-Powered Mood Detection',
//                   'Voice Command for Journaling',
//                   'Sentiment-Based Prompts',
//                   'Weekly Emotional Analytics',
//                   'Premium Support for Subscribers',
//                   'Secure and Private by Design'
//                 ].map((feature, index) => (
//                   <div key={index} className="flex items-center space-x-4 bg-white p-4 rounded-xl shadow-sm border border-blue-100 hover:shadow-md transition-shadow">
//                     <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
//                       <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
//                       </svg>
//                     </div>
//                     <span className="text-gray-700 font-medium text-[15px]">{feature}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Meet the Team */}
//       <section className="py-10 px-6 md:px-12 bg-white">
//         <div className="max-w-6xl mx-auto text-center">
//           <div className="mb-16">
//             <h3 className="text-3xl font-bold text-slate-800 mb-4">Meet the Creator</h3>
//             <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full"></div>
//           </div>

//           <div className="flex justify-center">
//             <div className="bg-gradient-to-br from-white to-blue-50 p-8 rounded-3xl shadow-2xl border border-blue-100 max-w-sm hover:scale-105 transition-transform duration-300">
//               <div className="relative mb-6">
//                 <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full transform scale-110"></div>
//                 <img
//                   src={assets.abd}
//                   alt="Hafiz Abdullah"
//                   className="relative w-32 h-32 mx-auto rounded-full border-4 border-white shadow-lg object-cover"
//                 />
//               </div>
//               <h4 className="font-bold text-xl text-slate-800 mb-2">Hafiz Abdullah</h4>
//               <p className="text-blue-600 font-medium mb-4">Founder <br/> Full Stack Developer & AI Integrator</p>
//               <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
//                 <p className="text-sm text-gray-600 italic leading-relaxed">
//                   "Built with passion to improve emotional well-being through technology."
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//     </div>
//   );
// };

// export default About;










import React from 'react';
import { assets } from '../assets/assets';

const About = () => {
  return (
    <div className="relative min-h-screen">
      {/* Background - Matching Home Page */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50/80 via-blue-50/20 to-cyan-50/30"></div>
        <div className="absolute top-10 left-10 w-64 h-64 bg-gradient-to-br from-teal-400/10 to-cyan-400/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute top-1/4 right-10 w-48 h-48 bg-gradient-to-br from-blue-400/8 to-indigo-400/8 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-56 h-56 bg-gradient-to-br from-cyan-400/10 to-teal-400/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-2000"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.02)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      </div>

      {/* Content */}
      <main className="relative">
        {/* Hero Section */}
        <section className="relative py-20 md:py-28">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/3 to-white/10"></div>
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Left content */}
              <div className="space-y-6">
                <div className="inline-block p-2 bg-gradient-to-r from-teal-100/80 to-cyan-100/80 rounded-2xl mb-4">
                  <svg className="w-7 h-7 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-slate-800">
                  About <span className="bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">NeuroDiary</span>
                </h1>
                <p className="text-xl text-slate-600 leading-relaxed">
                  Empowering mental wellness through intelligent journaling and AI-powered insights.
                </p>
                <div className="flex items-center space-x-2 text-sm text-slate-500">
                  <span className="hover:text-teal-600 transition-colors cursor-pointer">Home</span>
                  <span className="text-teal-500">→</span>
                  <span className="text-slate-700 font-medium">About Us</span>
                </div>
              </div>

              {/* Right content card */}
              <div className="backdrop-blur-md bg-white/80 p-8 rounded-3xl shadow-xl border border-white/40">
                <h2 className="text-2xl font-bold mb-4 text-slate-800">
                  AI-Enhanced Personal <span className="text-teal-600">"NeuroDiary"</span>
                </h2>
                <div className="space-y-4 text-slate-600 leading-relaxed">
                  <p>
                    In today's fast-paced digital era, mental health is increasingly important. Traditional diary applications
                    allow users to record personal thoughts but rarely offer actionable insights into emotional trends.
                  </p>
                  <p>
                    The AI-Enhanced Personal Diary platform provides a secure space for private entries and advanced
                    AI-driven analysis to track emotional trends and flag potential mental health issues.
                  </p>
                  <p className="text-teal-700 font-medium">
                    Built with the MERN stack, it ensures a scalable, responsive, and modern user experience.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What is NeuroDiary Section */}
        <section className="relative py-16">
          <div className="absolute inset-0 bg-gradient-to-r from-teal-50/20 via-transparent to-cyan-50/20"></div>
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Text Section */}
              <div className="space-y-6">
                <div className="inline-block p-2 bg-gradient-to-r from-blue-100/80 to-teal-100/80 rounded-2xl mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-slate-800">
                  What is <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">NeuroDiary</span>?
                </h2>
                <div className="w-16 h-0.5 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full"></div>
                <div className="space-y-4 text-slate-600 leading-relaxed">
                  <p>
                    NeuroDiary is a modern mental health journaling platform that combines daily diary writing, mood tracking, and smart AI-powered feedback — helping you understand your emotional patterns and grow every day.
                  </p>
                  <p>
                    Whether you're battling anxiety, navigating life transitions, or just want to improve your emotional self-awareness, NeuroDiary is designed to support your journey with scientifically grounded features and a personalized touch.
                  </p>
                </div>
                <div className="bg-gradient-to-r from-blue-50/80 to-teal-50/80 p-4 rounded-2xl border border-blue-100/50">
                  <p className="text-blue-800 italic text-lg font-medium text-center">
                    "AI for your mind. Insight for your soul."
                  </p>
                </div>
              </div>

              {/* Image Section */}
              <div className="flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-cyan-500 rounded-2xl transform rotate-3 opacity-20"></div>
                  <img
                    src={assets.person}
                    alt="NeuroDiary Platform"
                    className="relative w-80 h-80 object-cover rounded-2xl shadow-2xl transform -rotate-1 hover:rotate-0 transition-transform duration-300"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="relative py-16">
          <div className="absolute inset-0 bg-gradient-to-l from-blue-50/25 via-slate-50/10 to-transparent"></div>
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <div className="inline-block p-2 bg-gradient-to-r from-cyan-100/80 to-teal-100/80 rounded-2xl mb-4">
                <svg className="w-6 h-6 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-slate-800 mb-3">Our Mission</h2>
              <div className="w-16 h-0.5 bg-gradient-to-r from-cyan-500 to-teal-500 mx-auto rounded-full"></div>
            </div>

            <div className="space-y-6 text-slate-600 leading-relaxed max-w-4xl mx-auto">
              <p className="text-lg font-medium text-slate-700">
                Our goal is to empower users to monitor, understand, and improve their mental well-being through
                cutting-edge AI technologies. NeuroDiary includes robust diary features, emotional trend tracking,
                personalized insights, and even voice command support for hands-free use.
              </p>

              <p>
                With strong emphasis on privacy, users are assured secure account handling, data protection, and optional
                premium features such as AI-powered recommendations and speech-to-text logging.
              </p>

              <p>
                Whether you're an individual seeking clarity or a professional researching trends, NeuroDiary is built to
                support and enhance your mental health journey.
              </p>

              <div className="bg-gradient-to-r from-slate-50/80 to-blue-50/80 p-6 rounded-2xl border border-blue-100/50 mt-8">
                <p className="text-slate-800 font-bold text-lg text-center">
                  Hafiz Abdullah Iftikhar
                </p>
                <p className="text-teal-600 text-center mt-1">Founder & Lead Developer</p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="relative py-16">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-50/40 to-blue-50/25"></div>
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-cyan-500 rounded-2xl transform -rotate-2 opacity-20"></div>
                <img
                  src={assets.selfcare}
                  alt="Why Choose NeuroDiary"
                  className="relative w-full h-110 object-cover rounded-2xl shadow-2xl transform rotate-1 hover:rotate-0 transition-transform duration-300"
                />
              </div>

              <div className="space-y-6">
                <div>
                  <div className="inline-block p-2 bg-gradient-to-r from-indigo-100/80 to-blue-100/80 rounded-2xl mb-4">
                    <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                  </div>
                  <h3 className="text-3xl font-bold text-slate-800 mb-3">
                    Why Choose <span className="bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">NeuroDiary</span>?
                  </h3>
                  <div className="w-16 h-0.5 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {[
                    'AI-Powered Mood Detection',
                    'Voice Command for Journaling',
                    'Sentiment-Based Prompts',
                    'Weekly Emotional Analytics',
                    'Premium Support for Subscribers',
                    'Secure and Private by Design'
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3 bg-white/80 p-3 rounded-xl shadow-sm border border-blue-100/50 hover:shadow-md transition-all hover:bg-white/90">
                      <div className="flex-shrink-0 w-5 h-5 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                      <span className="text-slate-700 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Meet the Creator Section */}
        <section className="relative py-16 pb-20">
          <div className="absolute inset-0 bg-gradient-to-t from-cyan-50/25 via-transparent to-teal-50/20"></div>
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 text-center">
            <div className="mb-12">
              <div className="inline-block p-2 bg-gradient-to-r from-blue-100/80 to-cyan-100/80 rounded-2xl mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-3xl font-bold text-slate-800 mb-3">Meet the Creator</h3>
              <div className="w-16 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto rounded-full"></div>
            </div>

            <div className="flex justify-center">
              <div className="bg-white/80 p-8 rounded-3xl shadow-xl border border-white/40 max-w-sm hover:scale-105 transition-transform duration-300">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-cyan-500 rounded-full transform scale-110 opacity-20"></div>
                  <img
                    src={assets.abd}
                    alt="Hafiz Abdullah"
                    className="relative w-28 h-28 mx-auto rounded-full border-4 border-white shadow-lg object-cover"
                  />
                </div>
                <h4 className="font-bold text-xl text-slate-800 mb-2">Hafiz Abdullah</h4>
                <p className="text-teal-600 font-medium mb-4">Founder <br/> Full Stack Developer & AI Integrator</p>
                <div className="bg-blue-50/80 p-4 rounded-xl border border-blue-100/50">
                  <p className="text-sm text-slate-600 italic leading-relaxed">
                    "Built with passion to improve emotional well-being through technology."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Floating elements matching Home page */}
      <div className="fixed top-1/3 left-6 w-1.5 h-1.5 bg-teal-400/60 rounded-full animate-ping pointer-events-none"></div>
      <div className="fixed top-2/3 right-8 w-1 h-1 bg-cyan-400/50 rounded-full animate-pulse pointer-events-none"></div>
    </div>
  );
};

export default About;