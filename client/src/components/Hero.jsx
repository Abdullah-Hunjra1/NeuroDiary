import React from 'react'
import { assets } from '../assets/assets';


const Hero = () => (
  <section className="bg-[#CEE6F0] py-20 px-6 md:px-16 flex flex-col md:flex-row items-center justify-between gap-10">
    <div className="md:w-1/2 text-center md:text-left">
      <h1 className="text-4xl md:text-5xl font-bold text-[#007189] leading-tight mb-4">
        Your AI-Powered Mental Health Companion
      </h1>
      <p className="text-gray-700 text-lg mb-6">
        NeuroDiary helps you track your mood, reflect daily, and gain emotional insights through intelligent journaling.
      </p>
      <div className="flex gap-4 justify-center md:justify-start">
        <button className="bg-[#007189] text-white px-6 py-3 rounded-full font-medium">
          Start Journaling
        </button>
        <button className="bg-white border border-[#007189] text-[#007189] px-6 py-3 rounded-full font-medium">
          Learn More
        </button>
      </div>
    </div>
    <div className="md:w-1/2">
      <img src={assets.header_img} alt="AI Journaling" className="w-full max-w-md mx-auto" />
    </div>
  </section>
);

export default Hero