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

              <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
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
      </div>
    </section>
  );
};

export default FAQ;