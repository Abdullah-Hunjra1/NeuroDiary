// import React from 'react'

// const FAQ = () => (
//     <section className="bg-[#bfe5f8] py-20 px-6 md:px-16">
//       <div className="max-w-4xl mx-auto">
//         <h2 className="text-4xl font-bold text-[#007189] text-center mb-10">Frequently Asked Questions</h2>
//         <div className="space-y-6">
//           <div>
//             <h4 className="font-semibold text-lg">What is NeuroDiary?</h4>
//             <p className="text-gray-600">NeuroDiary is a smart journaling platform enhanced with AI to help users track their emotions, reflect on thoughts, and receive insights for mental wellbeing.</p>
//           </div>
//           <div>
//             <h4 className="font-semibold text-lg">Is my data private?</h4>
//             <p className="text-gray-600">Absolutely. We use secure authentication and encryption to protect your data. Only you can access your entries.</p>
//           </div>
//           <div>
//             <h4 className="font-semibold text-lg">How does the AI analysis work?</h4>
//             <p className="text-gray-600">Our system integrates with OpenAI and NLP tools to evaluate emotional trends and suggest personalized feedback.</p>
//           </div>
//           <div>
//             <h4 className="font-semibold text-lg">Are there premium features?</h4>
//             <p className="text-gray-600">Yes, features like voice command journaling and advanced insights are available through our premium plan via Stripe.</p>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
  

// export default FAQ









import React, { useState } from 'react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What is NeuroDiary?",
      answer: "NeuroDiary is a smart journaling platform enhanced with AI to help users track their emotions, reflect on thoughts, and receive insights for mental wellbeing. Our advanced algorithms provide personalized recommendations to support your mental health journey."
    },
    {
      question: "Is my data private and secure?",
      answer: "Absolutely. We use enterprise-grade encryption, secure authentication, and HIPAA-compliant data protection. Your journal entries are encrypted end-to-end, and only you have access to your personal data. We never share or sell your information to third parties."
    },
    {
      question: "How does the AI analysis work?",
      answer: "Our system integrates with advanced AI models including OpenAI and specialized NLP tools to analyze emotional patterns, sentiment, and psychological indicators in your writing. The AI provides personalized insights, mood tracking, and suggests evidence-based wellness activities tailored to your needs."
    },
    {
      question: "Are there premium features?",
      answer: "Yes! Premium features include voice command journaling, advanced emotional analytics, detailed progress reports, personalized AI recommendations, priority support, and enhanced security features. Premium subscriptions are processed securely through Stripe."
    },
    {
      question: "Can I use NeuroDiary on mobile devices?",
      answer: "Yes, NeuroDiary is fully responsive and works seamlessly across all devices including smartphones, tablets, and desktops. You can access your journal entries and insights anywhere, anytime."
    },
    {
      question: "How accurate is the mood tracking?",
      answer: "Our AI-powered mood analysis uses sophisticated natural language processing to identify emotional patterns with high accuracy. The system learns from your writing patterns over time, providing increasingly personalized and relevant insights."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50 py-12 px-6 md:px-16">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-teal-100 text-teal-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
            Common Questions
          </div>
          
          <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-teal-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-[17px] text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Everything you need to know about NeuroDiary, your AI-powered mental health companion. 
            Can't find what you're looking for? Feel free to contact our support team.
          </p>
        </div>

        {/* FAQ Grid */}
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="group bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <button
                className="w-full p-6 text-left flex items-center justify-between focus:outline-none focus:ring-4 focus:ring-teal-100 focus:ring-opacity-50"
                onClick={() => toggleFAQ(index)}
              >
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-10 h-10 bg-gradient-to-r from-teal-400 to-blue-500 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-slate-800 group-hover:text-teal-600 transition-colors duration-200 mb-2">
                      {faq.question}
                    </h4>
                    <p className="text-slate-500 text-sm">Click to expand answer</p>
                  </div>
                </div>
                
                <div className={`transform transition-transform duration-300 ${openIndex === index ? 'rotate-45' : ''}`}>
                  <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
              </button>

              <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
                openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <div className="px-8 pb-8">
                  <div className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-xl p-6 border-l-4 border-teal-400">
                    <p className="text-slate-700 leading-relaxed text-[16px]">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Support Section */}
        {/* <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-teal-500 via-blue-500 to-indigo-600 rounded-3xl p-12 text-white">
            <div className="max-w-3xl mx-auto">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 110 19.5 9.75 9.75 0 010-19.5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6l4 2" />
                </svg>
              </div>
              
              <h3 className="text-3xl font-bold mb-4">Still have questions?</h3>
              <p className="text-blue-100 text-lg mb-8 leading-relaxed">
                Our dedicated support team is here to help you on your mental health journey. 
                We typically respond within 24 hours.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-blue-600 px-8 py-4 rounded-2xl font-bold hover:bg-blue-50 transition-colors duration-200 transform hover:scale-105 shadow-lg">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Contact Support
                  </div>
                </button>
                
                <button className="bg-white/20 backdrop-blur-sm border border-white/30 text-white px-8 py-4 rounded-2xl font-bold hover:bg-white/30 transition-colors duration-200 transform hover:scale-105">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    View Documentation
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default FAQ;