import React from 'react'

const FAQ = () => (
    <section className="bg-[#bfe5f8] py-20 px-6 md:px-16">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-[#007189] text-center mb-10">Frequently Asked Questions</h2>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-lg">What is NeuroDiary?</h4>
            <p className="text-gray-600">NeuroDiary is a smart journaling platform enhanced with AI to help users track their emotions, reflect on thoughts, and receive insights for mental wellbeing.</p>
          </div>
          <div>
            <h4 className="font-semibold text-lg">Is my data private?</h4>
            <p className="text-gray-600">Absolutely. We use secure authentication and encryption to protect your data. Only you can access your entries.</p>
          </div>
          <div>
            <h4 className="font-semibold text-lg">How does the AI analysis work?</h4>
            <p className="text-gray-600">Our system integrates with OpenAI and NLP tools to evaluate emotional trends and suggest personalized feedback.</p>
          </div>
          <div>
            <h4 className="font-semibold text-lg">Are there premium features?</h4>
            <p className="text-gray-600">Yes, features like voice command journaling and advanced insights are available through our premium plan via Stripe.</p>
          </div>
        </div>
      </div>
    </section>
  );
  

export default FAQ