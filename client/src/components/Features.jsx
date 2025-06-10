import React from 'react';


const benefits = [
  {
    icon: '😊',
    text: 'Instant mood boosts with positive reframes and alternative perspectives',
  },
  {
    icon: '📝',
    text: 'Long term improvements with daily check-ins and reflections',
  },
  {
    icon: '⏰',
    text: 'Always available, no waitlists or appointments',
  },
  {
    icon: '🧠',
    text: 'Long term memory, the AI will learn about you over time',
  },
  {
    icon: '🔒',
    text: 'Privacy-first, nobody can read what you write and your data stays yours',
  },
];

const Features = () => {
  return (
    <div className="bg-[#c2e3f3] py-16 px-6 text-center">
      <h1 className=' text-4xl text-[#007189] font-bold mb-10'>Features</h1>
      <h2 className="text-xl md:text-3xl font-semibold max-w-3xl mx-auto text-[#111111]">
        Improve your <span className="text-[#007189]">mental health</span> today by journaling
        <br />
        and chatting with our AI
      </h2>

      <ul className="mt-10 space-y-4 max-w-xl mx-auto text-left text-[#202d34] text-sm md:text-base">
        {benefits.map((item, idx) => (
          <li
            key={idx}
            className="flex items-start gap-2 border-b border-dotted border-[#b4dce4] pb-2"
          >
            <span className="text-lg">{item.icon}</span>
            <span>{item.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Features;
