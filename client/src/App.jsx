import React from 'react'
import { Outlet } from 'react-router-dom'
import {Footer, Navbar} from './components/index.js'

import './index.css'

export const App = () => {

 

  return (
    <>
     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-cyan-50/20">
       <Navbar />
       <Outlet />
       <Footer />
     </div>
    </>
  )
}

//  default App










// App.jsx - Choose one of these background options

// import React from 'react'
// import { Outlet } from 'react-router-dom'
// import {Footer, Navbar} from './components/index.js'
// import './index.css'

// export const App = () => {
//   return (
//     <>
//       {/* OPTION 1: Modern Gradient Background (Recommended) */}
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/50 to-purple-50/30 relative">
//         <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(6,182,212,0.08)_0%,transparent_50%)] pointer-events-none"></div>
//         <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(139,92,246,0.06)_0%,transparent_50%)] pointer-events-none"></div>
        
//         <div className="relative z-10">
//           <Navbar />
//           <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
//             <Outlet />
//           </main>
//           <Footer />
//         </div>
//       </div>

//       {/* OPTION 2: Mesh Gradient Background 
//       <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-blue-50/40 bg-mesh relative">
//         <div className="relative z-10">
//           <Navbar />
//           <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
//             <Outlet />
//           </main>
//           <Footer />
//         </div>
//       </div>
//       */}

//       {/* OPTION 3: Dot Pattern Background 
//       <div className="min-h-screen bg-gray-50 bg-dots relative">
//         <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/50 to-blue-50/30 pointer-events-none"></div>
//         <div className="relative z-10">
//           <Navbar />
//           <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
//             <Outlet />
//           </main>
//           <Footer />
//         </div>
//       </div>
//       */}

//       {/* OPTION 4: Clean Gradient Background 
//       <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-slate-50 relative">
//         <div className="relative z-10">
//           <Navbar />
//           <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
//             <Outlet />
//           </main>
//           <Footer />
//         </div>
//       </div>
//       */}

//       {/* OPTION 5: Subtle Pattern Background 
//       <div className="min-h-screen bg-white relative" style={{
//         backgroundImage: `
//           radial-gradient(circle at 2px 2px, rgba(6,182,212,0.04) 1px, transparent 0),
//           linear-gradient(135deg, #f8fafc 0%, #f1f5f9 50%, #e2e8f0 100%)
//         `,
//         backgroundSize: '40px 40px, 100% 100%'
//       }}>
//         <div className="relative z-10">
//           <Navbar />
//           <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
//             <Outlet />
//           </main>
//           <Footer />
//         </div>
//       </div>
//       */}
//     </>
//   )
// }

// export default App