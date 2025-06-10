import React from 'react';

const HowItWorks = () => {
  const steps = [
    {
      title: ' Write Securely',
      desc: 'Start your day by writing a private journal entry. All entries are encrypted and stored securely.',
    },
    {
      title: ' AI-Powered Insights',
      desc: 'Our AI engine analyzes your mood and emotional trends using OpenAI or NLP.js.',
    },
    {
      title: ' Track Progress',
      desc: 'Visualize emotional trends and mental health patterns over time using intuitive dashboards.',
    },
    {
      title: ' Get Recommendations',
      desc: 'Receive personalized prompts, tips, and activities tailored to your emotional needs.',
    },
  ];

  return (
    <section className="py-16 bg-[#CEE6F0] text-center px-6 md:px-20">
      <h2 className="text-4xl font-bold text-[#007189] mb-10">How It Works</h2>
      <div className="grid md:grid-cols-2 gap-8 text-left">
        {steps.map((step, idx) => (
          <div key={idx} className="bg-[#B9D3DB] p-6 rounded-xl shadow-sm hover:shadow-md transition">
            <h3 className="text-xl font-semibold mb-2 text-[#111111]">{step.title}</h3>
            <p className="text-[#555555]">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
