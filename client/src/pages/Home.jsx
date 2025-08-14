// import React from 'react'
// import Hero from '../components/Hero'
// import HowItWorks from '../components/HowItWorks'
// import Testimonials  from '../components/Testimonials'
// import FAQ from '../components/FAQ'
// import Features  from '../components/Features'

// const Home = () => {
//   return (
//     <div  data-theme="coffee">
      
//       <Hero />
//       <Features />
//       <HowItWorks />
//       <Testimonials />
//       <FAQ />
//     </div>
//   )
// }

// export default Home








// import React from 'react'
// import Hero from '../components/Hero'
// import HowItWorks from '../components/HowItWorks'
// import Testimonials from '../components/Testimonials'
// import FAQ from '../components/FAQ'
// import Features from '../components/Features'

// const Home = () => {
//   return (
//     <div className="relative min-h-screen">
//       {/* Background Elements */}
//       <div className="fixed inset-0 -z-10">
//         {/* Primary Gradient Background */}
//         <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-cyan-50/50"></div>
        
//         {/* Animated Background Orbs */}
//         <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-teal-400/20 to-cyan-400/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
//         <div className="absolute top-1/3 right-0 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
//         <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-gradient-to-br from-cyan-400/20 to-teal-400/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-2000"></div>
        
//         {/* Grid Pattern Overlay */}
//         <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
//       </div>

//       {/* Content Sections with Enhanced Spacing and Animations */}
//       <main className="relative">
//         {/* Hero Section */}
//         <section className="relative">
//           <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-white/20"></div>
//           <div className="relative">
//             <Hero />
//           </div>
//         </section>

//         {/* Features Section */}
//         <section className="relative py-16">
//           <div className="absolute inset-0 bg-gradient-to-r from-teal-50/30 via-transparent to-cyan-50/30"></div>
//           <div className="relative container mx-auto">
//             <Features />
//           </div>
//         </section>

//         {/* How It Works Section */}
//         <section className="relative py-16">
//           <div className="absolute inset-0 bg-gradient-to-l from-blue-50/40 via-slate-50/20 to-transparent"></div>
//           <div className="relative">
//             {/* Section Header */}
//             <div className="text-center mb-16">
//               <div className="inline-block p-3 bg-gradient-to-r from-teal-100 to-cyan-100 rounded-full mb-4">
//                 <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
//                 </svg>
//               </div>
//               <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
//                 How It <span className="bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">Works</span>
//               </h2>
//               <div className="w-24 h-1 bg-gradient-to-r from-teal-500 to-cyan-500 mx-auto rounded-full"></div>
//             </div>
//             <HowItWorks />
//           </div>
//         </section>

//         {/* Testimonials Section */}
//         <section className="relative py-16">
//           <div className="absolute inset-0 bg-gradient-to-br from-slate-50/60 to-blue-50/40"></div>
//           <div className="relative">
//             {/* Section Header */}
//             <div className="text-center mb-16">
//               <div className="inline-block p-3 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full mb-4">
//                 <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
//                 </svg>
//               </div>
//               <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
//                 What Our <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Users Say</span>
//               </h2>
//               <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full"></div>
//             </div>
//             <Testimonials />
//           </div>
//         </section>

//         {/* FAQ Section */}
//         <section className="relative py-16">
//           <div className="absolute inset-0 bg-gradient-to-t from-cyan-50/40 via-transparent to-teal-50/30"></div>
//           <div className="relative">
//             {/* Section Header */}
//             <div className="text-center mb-16">
//               <div className="inline-block p-3 bg-gradient-to-r from-cyan-100 to-teal-100 rounded-full mb-4">
//                 <svg className="w-8 h-8 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                 </svg>
//               </div>
//               <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
//                 Frequently Asked <span className="bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent">Questions</span>
//               </h2>
//               <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-teal-500 mx-auto rounded-full"></div>
//             </div>
//             <FAQ />
//           </div>
//         </section>

//         {/* Bottom Gradient Fade */}
//         <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none"></div>
//       </main>

//       {/* Floating Elements for Visual Interest */}
//       <div className="fixed top-1/4 left-8 w-2 h-2 bg-teal-400 rounded-full opacity-60 animate-ping pointer-events-none"></div>
//       <div className="fixed top-2/3 right-12 w-1.5 h-1.5 bg-cyan-400 rounded-full opacity-40 animate-pulse pointer-events-none"></div>
//       <div className="fixed bottom-1/3 left-16 w-1 h-1 bg-blue-400 rounded-full opacity-50 animate-bounce pointer-events-none"></div>
//     </div>
//   )
// }

// export default Home








// ******************************************




import React from 'react'
import Hero from '../components/Hero'
import HowItWorks from '../components/HowItWorks'
import Testimonials from '../components/Testimonials'
import FAQ from '../components/FAQ'
import Features from '../components/Features'

const Home = () => {
  return (
    <div className="relative min-h-screen">
      {/* OPTIMIZED Background - Subtle and Professional */}
      <div className="fixed inset-0 -z-10">
        {/* Main gradient background - more subtle */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50/80 via-blue-50/20 to-cyan-50/30"></div>
        
        {/* Reduced background orbs - smaller and more subtle */}
        <div className="absolute top-10 left-10 w-64 h-64 bg-gradient-to-br from-teal-400/10 to-cyan-400/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute top-1/4 right-10 w-48 h-48 bg-gradient-to-br from-blue-400/8 to-indigo-400/8 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-56 h-56 bg-gradient-to-br from-cyan-400/10 to-teal-400/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-2000"></div>
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.02)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      </div>

      {/* OPTIMIZED Content Sections - Better Spacing */}
      <main className="relative">
        {/* Hero Section - Reduced padding */}
        <section className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/3 to-white/10"></div>
          <div className="relative">
            <Hero />
          </div>
        </section>

        {/* Features Section - Optimized spacing */}
        <section className="relative py-8 md:py-12">
          <div className="absolute inset-0 bg-gradient-to-r from-teal-50/20 via-transparent to-cyan-50/20"></div>
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
            <Features />
          </div>
        </section>

        {/* How It Works Section - Better proportions */}
        <section className="relative py-8 md:py-12">
          <div className="absolute inset-0 bg-gradient-to-l from-blue-50/25 via-slate-50/10 to-transparent"></div>
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
            {/* Optimized Section Header */}
            <div className="text-center mb-10 md:mb-12">
              <div className="inline-block p-2 bg-gradient-to-r from-teal-100/80 to-cyan-100/80 rounded-2xl mb-3">
                <svg className="w-6 h-6 md:w-7 md:h-7 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-3">
                How It <span className="bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">Works</span>
              </h2>
              <div className="w-16 h-0.5 bg-gradient-to-r from-teal-500 to-cyan-500 mx-auto rounded-full"></div>
            </div>
            <HowItWorks />
          </div>
        </section>

        {/* Testimonials Section - Optimized */}
        <section className="relative py-8 md:py-12">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-50/40 to-blue-50/25"></div>
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
            {/* Optimized Section Header */}
            <div className="text-center mb-10 md:mb-12">
              <div className="inline-block p-2 bg-gradient-to-r from-blue-100/80 to-indigo-100/80 rounded-2xl mb-3">
                <svg className="w-6 h-6 md:w-7 md:h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-3">
                What Our <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Users Say</span>
              </h2>
              <div className="w-16 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full"></div>
            </div>
            <Testimonials />
          </div>
        </section>

        {/* FAQ Section - Optimized */}
        <section className="relative py-8 md:py-12 mb-8">
          <div className="absolute inset-0 bg-gradient-to-t from-cyan-50/25 via-transparent to-teal-50/20"></div>
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
            {/* Optimized Section Header */}
            <div className="text-center mb-10 md:mb-12">
              <div className="inline-block p-2 bg-gradient-to-r from-cyan-100/80 to-teal-100/80 rounded-2xl mb-3">
                <svg className="w-6 h-6 md:w-7 md:h-7 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-3">
                Frequently Asked <span className="bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent">Questions</span>
              </h2>
              <div className="w-16 h-0.5 bg-gradient-to-r from-cyan-500 to-teal-500 mx-auto rounded-full"></div>
            </div>
            <FAQ />
          </div>
        </section>
      </main>

      {/* Reduced floating elements */}
      <div className="fixed top-1/3 left-6 w-1.5 h-1.5 bg-teal-400/60 rounded-full animate-ping pointer-events-none"></div>
      <div className="fixed top-2/3 right-8 w-1 h-1 bg-cyan-400/50 rounded-full animate-pulse pointer-events-none"></div>
    </div>
  )
}

export default Home