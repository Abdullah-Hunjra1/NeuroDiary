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
            <HowItWorks />
          </div>
        </section>

        {/* Testimonials Section - Optimized */}
        <section className="relative py-8 md:py-12">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-50/40 to-blue-50/25"></div>
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
            <Testimonials />
          </div>
        </section>

        {/* FAQ Section - Optimized */}
        <section className="relative py-8 md:py-12 mb-8">
          <div className="absolute inset-0 bg-gradient-to-t from-cyan-50/25 via-transparent to-teal-50/20"></div>
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
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