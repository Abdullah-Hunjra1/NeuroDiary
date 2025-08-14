// import React from "react";

// const testimonials = [
//   {
//     name: "Avinash Kr",
//     title: "Co-Founder at xyz",
//     quote: "Like this video and ask your questions in the comment section, don't forget to Subscribe Easy Tutorials YouTube channel to watch more videos of website designing, digital marketing and photoshop.",
//     image: "https://randomuser.me/api/portraits/men/10.jpg",
//     color: "text-[#007189]"
//   },
//   {
//     name: "Bharat Kunal",
//     title: "Manager at xyz",
//     quote: "Like this video and ask your questions in the comment section, don't forget to Subscribe Easy Tutorials YouTube channel to watch more videos of website designing, digital marketing and photoshop.",
//     image: "https://randomuser.me/api/portraits/men/20.jpg",
//     color: "text-[#007189]"
//   },
//   {
//     name: "Prabhakar D",
//     title: "Founder / CEO at xyz",
//     quote: "Like this video and ask your questions in the comment section, don't forget to Subscribe Easy Tutorials YouTube channel to watch more videos of website designing, digital marketing and photoshop.",
//     image: "https://randomuser.me/api/portraits/men/30.jpg",
//     color: "text-[#007189]"
//   }
// ];

// const Testimonials = () => {
//   return (
//     <section className="bg-[#CEE6F0] py-12 px-4">
//       <div className="max-w-6xl mx-auto text-center">
//         <h2 className="text-4xl font-bold text-[#007189] mb-2">TESTIMONIALS</h2>
//         <p className="text-[#111111] text-lg mb-15">What Our Clients Say</p>

//         <div className="grid md:grid-cols-3 gap-8">
//           {testimonials.map((t, index) => (
//             <div key={index} className="bg-[#B9D3DB] p-6 rounded-lg shadow-lg relative">
//               <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
//                 <img src={t.image} alt={t.name} className="w-20 h-20 rounded-full border-4 border-white shadow-md" />
//               </div>
//               <div className="mt-12">
//                 <p className="text-[#555555] text-sm italic">“{t.quote}”</p>
//                 <h4 className={`mt-4 font-bold ${t.color}`}>{t.name}</h4>
//                 <span className="text-[#555555] text-sm">{t.title}</span>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Testimonials;











import React, { useState, useEffect } from "react";

const testimonials = [
  {
    name: "Dr. Sarah Mitchell",
    title: "Clinical Psychologist",
    quote: "NeuroDiary has revolutionized how I support my clients between sessions. The AI insights provide valuable data that helps me understand their emotional patterns better. It's like having a 24/7 mental health companion.",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    rating: 5,
    company: "State University",
    specialty: "Psychology Major"
  },
  {
    name: "Dr. Lisa Park",
    title: "Psychiatrist",
    quote: "I recommend NeuroDiary to my patients as a supplementary tool. The emotional trend analysis helps both my patients and me track their progress between appointments. The security measures give me confidence in recommending it.",
    image: "https://randomuser.me/api/portraits/women/72.jpg",
    rating: 5,
    company: "Metropolitan Health Center",
    specialty: "Adult Psychiatry"
  },
  {
    name: "Robert Kumar",
    title: "Startup Founder",
    quote: "Running a startup is incredibly stressful. NeuroDiary's AI insights help me recognize burnout patterns before they become overwhelming. The voice commands are perfect for my busy lifestyle - I can journal during commutes.",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
    rating: 5,
    company: "Innovation Labs",
    specialty: "Entrepreneur"
  }
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (isAutoPlaying) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlaying]);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index) => {
    setCurrentIndex(index);
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-teal-100 text-teal-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            Trusted by Professionals
          </div>
          
          <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-teal-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6">
            What Our Community Says
          </h2>
          <p className="text-[17px] text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Join thousands of mental health professionals, students, and individuals who have 
            transformed their wellness journey with NeuroDiary's AI-powered platform.
          </p>
        </div>

        {/* Main Testimonial Display */}
        <div className="relative mb-16" 
             onMouseEnter={() => setIsAutoPlaying(false)}
             onMouseLeave={() => setIsAutoPlaying(true)}>
          
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 overflow-hidden max-w-3xl mx-auto">
            <div className="relative p-10 md:p-12">
              {/* Quote Background */}
              <div className="absolute top-6 left-8 text-8xl text-teal-200/30 font-serif">"</div>
              
              <div className="relative z-10">
                {/* Rating Stars */}
                <div className="flex justify-center gap-1 mb-6">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-[18px] md:text-2xl text-slate-700 leading-relaxed text-center mb-6 font-medium italic">
                  "{testimonials[currentIndex].quote}"
                </blockquote>

                {/* User Info */}
                <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                  <div className="relative">
                    <img 
                      src={testimonials[currentIndex].image} 
                      alt={testimonials[currentIndex].name} 
                      className="w-20 h-20 rounded-full border-4 border-white shadow-xl object-cover"
                    />
                    <div className="absolute -bottom-2 -right-1 w-6 h-6 bg-gradient-to-r from-teal-400 to-blue-500 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  
                  <div className="text-center md:text-left">
                    <h4 className="text-xl font-bold text-slate-800 mb-1">{testimonials[currentIndex].name}</h4>
                    <p className="text-teal-600 font-semibold mb-1">{testimonials[currentIndex].title}</p>
                    <p className="text-slate-500 text-sm">{testimonials[currentIndex].company}</p>
                    <span className="inline-block bg-gradient-to-r from-teal-100 to-blue-100 text-teal-700 px-3 py-1 rounded-full text-xs font-medium mt-2">
                      {testimonials[currentIndex].specialty}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button 
            onClick={prevTestimonial}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-white hover:scale-110 transition-all duration-200 flex items-center justify-center group"
          >
            <svg className="w-5 h-5 text-slate-600 group-hover:text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button 
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-white hover:scale-110 transition-all duration-200 flex items-center justify-center group"
          >
            <svg className="w-5 h-5 text-slate-600 group-hover:text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Testimonial Dots */}
        <div className="flex justify-center gap-3 mb-16">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToTestimonial(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-gradient-to-r from-teal-400 to-blue-500 w-8' 
                  : 'bg-slate-300 hover:bg-slate-400'
              }`}
            />
          ))}
        </div>

        {/* All Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`group bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer ${
                index === currentIndex ? 'ring-2 ring-teal-400 ring-opacity-50' : ''
              }`}
              onClick={() => goToTestimonial(index)}
            >
              {/* Mini Profile */}
              <div className="flex items-center gap-4 mb-4">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name} 
                  className="w-12 h-12 rounded-full border-2 border-white shadow-lg object-cover"
                />
                <div>
                  <h4 className="font-bold text-slate-800 text-sm group-hover:text-teal-600 transition-colors">
                    {testimonial.name}
                  </h4>
                  <p className="text-xs text-slate-500">{testimonial.title}</p>
                </div>
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Mini Quote */}
              <p className="text-slate-600 text-sm leading-relaxed line-clamp-4">
                "{testimonial.quote.substring(0, 120)}..."
              </p>

              {/* Specialty Badge */}
              <div className="mt-4">
                <span className="inline-block bg-gradient-to-r from-teal-100 to-blue-100 text-teal-700 px-2 py-1 rounded-full text-xs font-medium">
                  {testimonial.specialty}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Statistics */}
        <div className="mt-20 bg-gradient-to-r from-teal-500 via-blue-500 to-indigo-600 rounded-3xl p-12 text-white">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-3">Trusted by Mental Health Professionals</h3>
            <p className="text-blue-100 text-[17px]">Join our growing community of wellness advocates</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">50K+</div>
              <div className="text-blue-100 text-sm">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">500+</div>
              <div className="text-blue-100 text-sm">Mental Health Professionals</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">99%</div>
              <div className="text-blue-100 text-sm">User Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">2M+</div>
              <div className="text-blue-100 text-sm">Journal Entries Analyzed</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
   