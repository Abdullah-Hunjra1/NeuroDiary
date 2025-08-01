// import React from 'react';
// import { FaSmile, FaChartLine, FaLightbulb, FaMicrophone } from 'react-icons/fa';

// const UserDashboard = () => {
//   // Dummy data (replace with real API data)
//   const moodStats = { mood: "Happy", trend: "Improving" };
//   const aiInsight = "You're showing more positive sentiment this week.";
//   const recommendation = "Try a 5-minute mindfulness session today.";

//   return (
//     <section className="min-h-screen bg-[#cdeaf5] py-12 px-6 md:px-10">
//       <div className="max-w-6xl mx-auto">
//         <h1 className="text-4xl font-bold text-[#007189] mb-6">Your Dashboard</h1>

//         {/* Grid Layout */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

//           {/* Mood Tracker */}
//           <div className="bg-white rounded-xl p-6 shadow hover:shadow-md transition-all">
//             <div className="flex items-center gap-3 mb-3 text-[#007189]">
//               <FaSmile className="text-2xl" />
//               <h2 className="text-xl font-semibold">Mood Tracker</h2>
//             </div>
//             <p className="text-gray-700">Current Mood: <strong>{moodStats.mood}</strong></p>
//             <p className="text-gray-500 text-sm">Trend: {moodStats.trend}</p>
//           </div>

//           {/* AI Emotional Insight */}
//           <div className="bg-white rounded-xl p-6 shadow hover:shadow-md transition-all">
//             <div className="flex items-center gap-3 mb-3 text-[#007189]">
//               <FaChartLine className="text-2xl" />
//               <h2 className="text-xl font-semibold">AI Emotional Insight</h2>
//             </div>
//             <p className="text-gray-700">{aiInsight}</p>
//           </div>

//           {/* Recommendations */}
//           <div className="bg-white rounded-xl p-6 shadow hover:shadow-md transition-all">
//             <div className="flex items-center gap-3 mb-3 text-[#007189]">
//               <FaLightbulb className="text-2xl" />
//               <h2 className="text-xl font-semibold">Recommendation</h2>
//             </div>
//             <p className="text-gray-700">{recommendation}</p>
//           </div>

//           {/* Voice Command (Premium Feature) */}
//           <div className="bg-[#007189] text-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all col-span-full lg:col-span-1">
//             <div className="flex items-center gap-3 mb-3">
//               <FaMicrophone className="text-2xl" />
//               <h2 className="text-xl font-semibold">Voice Assistant</h2>
//             </div>
//             <p className="text-white/90">Try saying, <em>“Show my last entry”</em> or <em>“Open settings”</em></p>
//             <button className="mt-4 bg-white text-[#007189] font-medium px-5 py-2 rounded-full hover:bg-gray-100 transition">
//               Enable Voice Commands
//             </button>
//           </div>

//         </div>
//       </div>
//     </section>
//   );
// };

// export default UserDashboard;

import React from "react";
import MoodChart from '../components/MoodChart';

import {
  FaSmile,
  FaChartLine,
  FaLightbulb,
  FaMicrophone,
  FaSignOutAlt,
} from "react-icons/fa";
import { FiSettings, FiPieChart, FiUser, FiActivity } from "react-icons/fi";

const UserDashboard = () => {
  const moodStats = { mood: "Happy", trend: "Improving" };
  const aiInsight = "You're showing more positive sentiment this week.";
  const recommendation = "Try a 5-minute mindfulness session today.";
  const recentActivities = [
    { user: "You", activity: "logged a positive journal entry.", time: "3 min ago" },
    { user: "AI", activity: "analyzed your mood as improving.", time: "10 min ago" },
    { user: "You", activity: "completed a breathing session.", time: "1 hour ago" }
  ];

  return (
    <div className="min-h-screen flex bg-[#cdeaf5] text-gray-800">
      {/* Sidebar */}
      <aside className="w-64 bg-white p-6 shadow-md hidden md:flex flex-col justify-between">
        <div>
          <h1 className="text-[#007189] font-bold text-lg mb-6">NeuroDiary</h1>
          <nav className="space-y-4">
            <div className="flex items-center gap-3 text-[#007189] hover:text-[#004f5a] cursor-pointer">
              <FiPieChart />
              <span>Dashboard</span>
            </div>
            <div className="flex items-center gap-3 text-[#007189] hover:text-[#004f5a] cursor-pointer">
              <FaSmile />
              <span>Mood Tracker</span>
            </div>
            <div className="flex items-center gap-3 text-[#007189] hover:text-[#004f5a] cursor-pointer">
              <FaChartLine />
              <span>AI Insight</span>
            </div>
            <div className="flex items-center gap-3 text-[#007189] hover:text-[#004f5a] cursor-pointer">
              <FaLightbulb />
              <span>Recommendations</span>
            </div>
            <div className="flex items-center gap-3 text-[#007189] hover:text-[#004f5a] cursor-pointer">
              <FaMicrophone />
              <span>Voice Assistant</span>
            </div>
            <div className="flex items-center gap-3 text-[#007189] hover:text-[#004f5a] cursor-pointer">
              <FiSettings />
              <span>Settings</span>
            </div>
          </nav>
        </div>
        <div className="flex items-center gap-3 text-[#007189] cursor-pointer">
          <FaSignOutAlt />
          <span>Logout</span>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10">
        <h2 className="text-2xl font-bold text-[#007189] mb-6">Welcome Back 👋</h2>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-5 shadow">
            <h3 className="text-gray-500 mb-1 text-sm">Mood</h3>
            <p className="text-2xl font-bold text-[#007189]">{moodStats.mood}</p>
            <p className="text-sm text-gray-400 mt-1">Trend: {moodStats.trend}</p>
          </div>
          <MoodChart />

          <div className="bg-white rounded-xl p-5 shadow">
            <h3 className="text-gray-500 mb-1 text-sm">AI Insight</h3>
            <p className="text-base text-[#007189]">{aiInsight}</p>
          </div>

          <div className="bg-white rounded-xl p-5 shadow">
            <h3 className="text-gray-500 mb-1 text-sm">Recommendation</h3>
            <p className="text-base text-[#007189]">{recommendation}</p>
          </div>
        </div>

        {/* Recent Activities & Assistant */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-5 shadow">
            <h3 className="text-lg font-semibold text-[#007189] mb-3">Recent Activity</h3>
            <ul className="space-y-3">
              {recentActivities.map((item, idx) => (
                <li key={idx} className="flex justify-between text-sm text-gray-600">
                  <span>{item.user} {item.activity}</span>
                  <span className="text-gray-400 text-xs">{item.time}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-[#007189] text-white rounded-xl p-5 shadow">
            <div className="flex items-center gap-3 mb-3">
              <FaMicrophone className="text-xl" />
              <h3 className="text-lg font-semibold">Voice Assistant</h3>
            </div>
            <p className="text-sm text-white/90">
              Try saying: <em>"Show my mood chart"</em> or <em>"Suggest an activity"</em>
            </p>
            <button className="mt-4 bg-white text-[#007189] font-medium px-4 py-2 rounded-full hover:bg-gray-100 transition">
              Enable Voice
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;
