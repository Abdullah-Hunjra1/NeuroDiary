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









import React from 'react';
import { assets } from '../assets/assets';

const About = () => {
  return (
    <div className="text-gray-800 bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">

      {/* Hero Section with Content Overlay */}
      <section className="relative w-full h-[90vh] flex items-center justify-center bg-cover bg-center overflow-hidden" style={{ backgroundImage: `url(${assets.about_image})` }}>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/70 to-blue-900/50"></div>
        <div className="relative z-10 grid md:grid-cols-2 gap-12 px-6 md:px-20 w-full max-w-7xl items-center">
          {/* Left content */}
          <div className="text-white space-y-6">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mb-4">
              ABOUT US
            </h1>
            <p className="text-lg md:text-xl font-light mb-4 leading-relaxed">
              Empowering mental wellness through intelligent journaling
            </p>
            <div className="flex items-center space-x-2 text-sm text-blue-200">
              <span className="hover:text-white transition-colors cursor-pointer">Home</span>
              <span className="text-blue-300">→</span>
              <span className="text-white font-semibold">About Us</span>
            </div>
          </div>

          {/* Right content from NeuroDiary */}
          <div className="backdrop-blur-md bg-white/90 text-gray-900 p-8 rounded-2xl shadow-2xl border border-white/20">
            <h2 className="text-2xl font-bold mb-4 text-slate-800 leading-tight">
              AI-Enhanced Personal <span className="text-blue-600">"NeuroDiary"</span>
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                In today's fast-paced digital era, mental health is increasingly important. Traditional diary applications
                allow users to record personal thoughts but rarely offer actionable insights into emotional trends.
              </p>
              <p>
                The AI-Enhanced Personal Diary platform provides a secure space for private entries and advanced
                AI-driven analysis to track emotional trends and flag potential mental health issues.
              </p>
              <p className="text-blue-700 font-medium">
                Built with the MERN stack, it ensures a scalable, responsive, and modern user experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Section */}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          {/* Text Section */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-slate-800 mb-6">
              What is <span className="text-blue-600">NeuroDiary ?</span>
            </h2>
            <div className="space-y-6 text-gray-700 text-[16px] leading-relaxed">
              <p>
                NeuroDiary is a modern mental health journaling platform that combines daily diary writing, mood tracking, and smart AI-powered feedback — helping you understand your emotional patterns and grow every day.
              </p>
              <p>
                Whether you're battling anxiety, navigating life transitions, or just want to improve your emotional self-awareness, NeuroDiary is designed to support your journey with scientifically grounded features and a personalized touch.
              </p>
            </div>
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-3.5 rounded-2xl border-l-4 border-blue-500">
              <p className="text-blue-800 italic text-lg font-medium text-center">
                "AI for your mind. Insight for your soul."
              </p>
            </div>
          </div>

          {/* Image Section */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-2xl transform rotate-3"></div>
              <img
                src={assets.contact_image}
                alt="NeuroDiary Platform"
                className="relative max-w-sm rounded-2xl shadow-2xl transform -rotate-1 hover:rotate-0 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Introduction */}
      <section className="px-6 md:px-12 py-20 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-800 mb-6">Our Mission</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full"></div>
          </div>

          <div className="space-y-6 text-gray-700 text-[16px] leading-relaxed max-w-4xl mx-auto">
            <p className=' font-semibold'>
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

            <div className="bg-gradient-to-r from-slate-50 to-blue-50 p-4 rounded-2xl border border-blue-100 mt-10">
              <p className="text-slate-800 font-bold text-lg text-center">
                Hafiz Abdullah Iftikhar
              </p>
              <p className="text-blue-600 text-center mt-2 text-sm">Founder & Lead Developer</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-gradient-to-br from-slate-100 to-blue-100 py-20 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-2xl transform -rotate-2 "></div>
              <img
                src={assets.about_image}
                alt="Why Choose NeuroDiary"
                className="relative rounded-2xl shadow-2xl transform rotate-1 hover:rotate-0 transition-transform duration-300 "
              />
            </div> */}
            <div className="relative w-full h-[290px] sm:h-[300px] md:h-[350px] lg:h-[400px] xl:h-[480px] max-w-4xl mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-2xl transform -rotate-2"></div>
              <img
                src={assets.about_image}
                alt="Why Choose NeuroDiary"
                className="relative w-full h-full object-cover rounded-2xl shadow-2xl transform rotate-1 hover:rotate-0 transition-transform duration-300"
              />
            </div>



            <div className="space-y-8">
              <div>
                <h3 className="text-3xl font-bold text-slate-800 mb-4">
                  Why Choose <span className="text-blue-600">NeuroDiary</span>?
                </h3>
                <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {[
                  'AI-Powered Mood Detection',
                  'Voice Command for Journaling',
                  'Sentiment-Based Prompts',
                  'Weekly Emotional Analytics',
                  'Premium Support for Subscribers',
                  'Secure and Private by Design'
                ].map((feature, index) => (
                  <div key={index} className="flex items-center space-x-4 bg-white p-4 rounded-xl shadow-sm border border-blue-100 hover:shadow-md transition-shadow">
                    <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <span className="text-gray-700 font-medium text-[15px]">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Team */}
      <section className="py-10 px-6 md:px-12 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-16">
            <h3 className="text-3xl font-bold text-slate-800 mb-4">Meet the Creator</h3>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full"></div>
          </div>

          <div className="flex justify-center">
            <div className="bg-gradient-to-br from-white to-blue-50 p-8 rounded-3xl shadow-2xl border border-blue-100 max-w-sm hover:scale-105 transition-transform duration-300">
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full transform scale-110"></div>
                <img
                  src={assets.abd}
                  alt="Hafiz Abdullah"
                  className="relative w-32 h-32 mx-auto rounded-full border-4 border-white shadow-lg object-cover"
                />
              </div>
              <h4 className="font-bold text-xl text-slate-800 mb-2">Hafiz Abdullah</h4>
              <p className="text-blue-600 font-medium mb-4">Founder <br/> Full Stack Developer & AI Integrator</p>
              <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                <p className="text-sm text-gray-600 italic leading-relaxed">
                  "Built with passion to improve emotional well-being through technology."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;