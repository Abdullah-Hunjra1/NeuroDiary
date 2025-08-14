// import React from "react";
// import MoodChart from '../components/MoodChart';

// import {
//   FaSmile,
//   FaChartLine,
//   FaLightbulb,
//   FaMicrophone,
//   FaSignOutAlt,
// } from "react-icons/fa";
// import { FiSettings, FiPieChart, FiUser, FiActivity } from "react-icons/fi";

// const UserDashboard = () => {
//   const moodStats = { mood: "Happy", trend: "Improving" };
//   const aiInsight = "You're showing more positive sentiment this week.";
//   const recommendation = "Try a 5-minute mindfulness session today.";
//   const recentActivities = [
//     { user: "You", activity: "logged a positive journal entry.", time: "3 min ago" },
//     { user: "AI", activity: "analyzed your mood as improving.", time: "10 min ago" },
//     { user: "You", activity: "completed a breathing session.", time: "1 hour ago" }
//   ];

//   return (
//     <div className="min-h-screen flex bg-[#cdeaf5] text-gray-800">
//       {/* Sidebar */}
//       <aside className="w-64 bg-white p-6 shadow-md hidden md:flex flex-col justify-between">
//         <div>
//           <h1 className="text-[#007189] font-bold text-lg mb-6">NeuroDiary</h1>
//           <nav className="space-y-4">
//             <div className="flex items-center gap-3 text-[#007189] hover:text-[#004f5a] cursor-pointer">
//               <FiPieChart />
//               <span>Dashboard</span>
//             </div>
//             <div className="flex items-center gap-3 text-[#007189] hover:text-[#004f5a] cursor-pointer">
//               <FaSmile />
//               <span>Mood Tracker</span>
//             </div>
//             <div className="flex items-center gap-3 text-[#007189] hover:text-[#004f5a] cursor-pointer">
//               <FaChartLine />
//               <span>AI Insight</span>
//             </div>
//             <div className="flex items-center gap-3 text-[#007189] hover:text-[#004f5a] cursor-pointer">
//               <FaLightbulb />
//               <span>Recommendations</span>
//             </div>
//             <div className="flex items-center gap-3 text-[#007189] hover:text-[#004f5a] cursor-pointer">
//               <FaMicrophone />
//               <span>Voice Assistant</span>
//             </div>
//             <div className="flex items-center gap-3 text-[#007189] hover:text-[#004f5a] cursor-pointer">
//               <FiSettings />
//               <span>Settings</span>
//             </div>
//           </nav>
//         </div>
//         <div className="flex items-center gap-3 text-[#007189] cursor-pointer">
//           <FaSignOutAlt />
//           <span>Logout</span>
//         </div>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 p-6 md:p-10">
//         <h2 className="text-2xl font-bold text-[#007189] mb-6">Welcome Back 👋</h2>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//           <div className="bg-white rounded-xl p-5 shadow">
//             <h3 className="text-gray-500 mb-1 text-sm">Mood</h3>
//             <p className="text-2xl font-bold text-[#007189]">{moodStats.mood}</p>
//             <p className="text-sm text-gray-400 mt-1">Trend: {moodStats.trend}</p>
//           </div>
//           <MoodChart />

//           <div className="bg-white rounded-xl p-5 shadow">
//             <h3 className="text-gray-500 mb-1 text-sm">AI Insight</h3>
//             <p className="text-base text-[#007189]">{aiInsight}</p>
//           </div>

//           <div className="bg-white rounded-xl p-5 shadow">
//             <h3 className="text-gray-500 mb-1 text-sm">Recommendation</h3>
//             <p className="text-base text-[#007189]">{recommendation}</p>
//           </div>
//         </div>

//         {/* Recent Activities & Assistant */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//           <div className="bg-white rounded-xl p-5 shadow">
//             <h3 className="text-lg font-semibold text-[#007189] mb-3">Recent Activity</h3>
//             <ul className="space-y-3">
//               {recentActivities.map((item, idx) => (
//                 <li key={idx} className="flex justify-between text-sm text-gray-600">
//                   <span>{item.user} {item.activity}</span>
//                   <span className="text-gray-400 text-xs">{item.time}</span>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           <div className="bg-[#007189] text-white rounded-xl p-5 shadow">
//             <div className="flex items-center gap-3 mb-3">
//               <FaMicrophone className="text-xl" />
//               <h3 className="text-lg font-semibold">Voice Assistant</h3>
//             </div>
//             <p className="text-sm text-white/90">
//               Try saying: <em>"Show my mood chart"</em> or <em>"Suggest an activity"</em>
//             </p>
//             <button className="mt-4 bg-white text-[#007189] font-medium px-4 py-2 rounded-full hover:bg-gray-100 transition">
//               Enable Voice
//             </button>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default UserDashboard;











// Professional User Dashboard for NeuroDiary Project
// Modern sidebar design with gradient accents and improved UX
// Maintains all existing logic and components

// import React from "react";
// import {
//   FaSmile,
//   FaChartLine,
//   FaLightbulb,
//   FaMicrophone,
//   FaSignOutAlt,
// } from "react-icons/fa";
// import { FiSettings, FiPieChart, FiUser, FiActivity } from "react-icons/fi";
// import { useNavigate } from "react-router-dom";

// const UserDashboard = () => {

//   const navigate = useNavigate()
//   return (
//     <div className="min-h-screen flex bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
//       {/* Modern Sidebar */}
//       <aside className="w-72 bg-white shadow-xl hidden md:flex flex-col border-r border-gray-200">

//         {/* Navigation */}
//         <nav className="flex-1 p-6 space-y-2">
//           <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 rounded-xl p-3 flex items-center space-x-3 cursor-pointer">
//             <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
//               <FiPieChart className="text-white text-sm" />
//             </div>
//             <span className="font-medium text-indigo-700">Dashboard</span>
//           </div>

//           <div className="hover:bg-gray-50 rounded-xl p-3 flex items-center space-x-3 cursor-pointer transition-all duration-200">
//             <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
//               <FaSmile className="text-gray-600 text-sm" />
//             </div>
//             <span onClick={() => navigate("/mood-analytics")} className="text-gray-700">Mood Tracker</span>
//           </div>

//           <div className="hover:bg-gray-50 rounded-xl p-3 flex items-center space-x-3 cursor-pointer transition-all duration-200">
//             <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
//               <FaChartLine className="text-gray-600 text-sm" />
//             </div>
//             <span className="text-gray-700">AI Insights</span>
//           </div>

//           <div className="hover:bg-gray-50 rounded-xl p-3 flex items-center space-x-3 cursor-pointer transition-all duration-200">
//             <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
//               <FaLightbulb className="text-gray-600 text-sm" />
//             </div>
//             <span className="text-gray-700">Recommendations</span>
//           </div>

//           <div className="hover:bg-gray-50 rounded-xl p-3 flex items-center space-x-3 cursor-pointer transition-all duration-200">
//             <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
//               <FaMicrophone className="text-gray-600 text-sm" />
//             </div>
//             <span onClick={() => navigate("/voice-page")} className="text-gray-700">Voice Assistant</span>
//           </div>

//           <div className="hover:bg-gray-50 rounded-xl p-3 flex items-center space-x-3 cursor-pointer transition-all duration-200">
//             <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
//               <FiSettings className="text-gray-600 text-sm" />
//             </div>
//             <span className="text-gray-700">Settings</span>
//           </div>
//         </nav>

//         {/* User Profile & Logout */}
//         <div className="p-6 border-t border-gray-100">
//           <div className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 cursor-pointer transition-all duration-200 mb-3">
//             <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full flex items-center justify-center">
//               <FiUser className="text-white text-sm" />
//             </div>
//             <div className="flex-1">
//               <p className="text-sm font-medium text-gray-700">John Doe</p>
//               <p className="text-xs text-gray-500">Premium User</p>
//             </div>
//           </div>

//           <div className="flex items-center space-x-3 p-3 rounded-xl hover:bg-red-50 cursor-pointer transition-all duration-200 text-red-600">
//             <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
//               <FaSignOutAlt className="text-red-600 text-sm" />
//             </div>
//             <span className="text-sm font-medium">Logout</span>
//           </div>
//         </div>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 overflow-hidden">
//         {/* Header */}
//         <div className="bg-white shadow-sm border-b border-gray-200 px-6 md:px-8 py-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <h2 className="text-2xl font-bold text-gray-800">Welcome back, John! 👋</h2>
//               <p className="text-gray-600 mt-1">Here's your mental wellness overview for today</p>
//             </div>
//             <div className="hidden md:flex items-center space-x-4">
//               <div className="bg-gradient-to-r from-green-400 to-emerald-500 text-white px-4 py-2 rounded-xl text-sm font-medium">
//                 ✨ Feeling Great
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Dashboard Content */}
//         <div className="p-6 md:p-8 overflow-y-auto">

//           {/* Quick Actions */}
//           <div className="mt-8">
//             <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
//               <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
//               <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                 <button className="flex flex-col items-center p-4 rounded-xl hover:bg-indigo-50 transition-all duration-200 group">
//                   <div className="w-12 h-12 bg-indigo-100 group-hover:bg-indigo-200 rounded-xl flex items-center justify-center mb-3 transition-all duration-200">
//                     <span className="text-2xl">📝</span>
//                   </div>
//                   <span className="text-sm font-medium text-gray-700">New Entry</span>
//                 </button>

//                 <button className="flex flex-col items-center p-4 rounded-xl hover:bg-purple-50 transition-all duration-200 group">
//                   <div className="w-12 h-12 bg-purple-100 group-hover:bg-purple-200 rounded-xl flex items-center justify-center mb-3 transition-all duration-200">
//                     <span className="text-2xl">😊</span>
//                   </div>
//                   <span className="text-sm font-medium text-gray-700">Log Mood</span>
//                 </button>

//                 <button className="flex flex-col items-center p-4 rounded-xl hover:bg-emerald-50 transition-all duration-200 group">
//                   <div className="w-12 h-12 bg-emerald-100 group-hover:bg-emerald-200 rounded-xl flex items-center justify-center mb-3 transition-all duration-200">
//                     <span className="text-2xl">🧘</span>
//                   </div>
//                   <span className="text-sm font-medium text-gray-700">Meditation</span>
//                 </button>

//                 <button className="flex flex-col items-center p-4 rounded-xl hover:bg-amber-50 transition-all duration-200 group">
//                   <div className="w-12 h-12 bg-amber-100 group-hover:bg-amber-200 rounded-xl flex items-center justify-center mb-3 transition-all duration-200">
//                     <span className="text-2xl">📊</span>
//                   </div>
//                   <span className="text-sm font-medium text-gray-700">Analytics</span>
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default UserDashboard;






{/* Logo Section */ }
{/* <div className="p-6 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">N</span>
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                NeuroDiary
              </h1>
              <p className="text-xs text-gray-500">Your AI Companion</p>
            </div>
          </div>
        </div> */}

















// import React, { useEffect, useState } from "react";
// import {
//   FaSmile,
//   FaChartLine,
//   FaLightbulb,
//   FaMicrophone,
//   FaSignOutAlt,
// } from "react-icons/fa";
// import { FiSettings, FiPieChart, FiUser } from "react-icons/fi";
// import { useNavigate } from "react-router-dom";
// import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
// import axios from "axios";

// const moodColors = {
//   Happy: "#10B981",
//   Sad: "#3B82F6",
//   Calm: "#FBBF24",
//   Stressed: "#EF4444",
//   Neutral: "#6B7280",
//   Excited: "#8B5CF6",
// };

// const UserDashboard = () => {
//   const navigate = useNavigate();
//   const [recentEntries, setRecentEntries] = useState([]);
//   const [moodData, setMoodData] = useState([]);
//   const [aiInsight, setAiInsight] = useState("Loading insights...");
//   const [recommendations, setRecommendations] = useState([]);
//   console.log("------------>", recommendations)
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (!token) return;

//     // Fetch last 3 diary entries
//     // axios
//     //   .get("/api/diary/my-entries?limit=3", {
//     //     headers: { Authorization: `Bearer ${token}` },
//     //   })
//     //   .then((res) => setRecentEntries(res.data))
//     //   .catch(() => setRecentEntries([]));
//     axios
//       .get("/api/diary/my-entries?limit=3", {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then((res) => {
//         if (res.data && Array.isArray(res.data.entries)) {
//           setRecentEntries(res.data.entries);
//           console.log("data -> ", res.data)
//         } else {
//           setRecentEntries([]);
//         }
//       })
//       .catch(() => setRecentEntries([]));

      
//     // Fetch mood data (last 7 days)
//     axios
//       .get("/api/mood/summary?days=7", {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then((res) => setMoodData(res.data))
//       .catch(() => setMoodData([]));

//     // Fetch AI Insights
//     axios
//       .get("/api/ai/insights/summary", {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then((res) => setAiInsight(res.data.message))
//       .catch(() => setAiInsight("No insights available"));

//     // Fetch Recommendations
//     axios
//       .get("/api/recommendations?limit=2", {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then((res) => setRecommendations(res.data))
//       .catch(() => setRecommendations([]));
//   }, []);

//   return (
//     <div className="min-h-screen flex bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
//       {/* Sidebar */}
//       <aside className="w-72 bg-white shadow-xl hidden md:flex flex-col border-r border-gray-200">
//         <nav className="flex-1 p-6 space-y-2">
//           <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 rounded-xl p-3 flex items-center space-x-3 cursor-pointer">
//             <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
//               <FiPieChart className="text-white text-sm" />
//             </div>
//             <span className="font-medium text-indigo-700">Dashboard</span>
//           </div>

//           <div
//             onClick={() => navigate("/mood-analytics")}
//             className="hover:bg-gray-50 rounded-xl p-3 flex items-center space-x-3 cursor-pointer"
//           >
//             <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
//               <FaSmile className="text-gray-600 text-sm" />
//             </div>
//             <span className="text-gray-700">Mood Tracker</span>
//           </div>

//           <div
//             onClick={() => navigate("/ai-insights")}
//             className="hover:bg-gray-50 rounded-xl p-3 flex items-center space-x-3 cursor-pointer"
//           >
//             <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
//               <FaChartLine className="text-gray-600 text-sm" />
//             </div>
//             <span className="text-gray-700">AI Insights</span>
//           </div>

//           <div
//             onClick={() => navigate("/recommendations")}
//             className="hover:bg-gray-50 rounded-xl p-3 flex items-center space-x-3 cursor-pointer"
//           >
//             <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
//               <FaLightbulb className="text-gray-600 text-sm" />
//             </div>
//             <span className="text-gray-700">Recommendations</span>
//           </div>

//           <div
//             onClick={() => navigate("/voice-page")}
//             className="hover:bg-gray-50 rounded-xl p-3 flex items-center space-x-3 cursor-pointer"
//           >
//             <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
//               <FaMicrophone className="text-gray-600 text-sm" />
//             </div>
//             <span className="text-gray-700">Voice Assistant</span>
//           </div>

//           <div className="hover:bg-gray-50 rounded-xl p-3 flex items-center space-x-3 cursor-pointer">
//             <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
//               <FiSettings className="text-gray-600 text-sm" />
//             </div>
//             <span className="text-gray-700">Settings</span>
//           </div>
//         </nav>

//         {/* User Profile & Logout */}
//         <div className="p-6 border-t border-gray-100">
//           <div className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 cursor-pointer mb-3">
//             <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full flex items-center justify-center">
//               <FiUser className="text-white text-sm" />
//             </div>
//             <div className="flex-1">
//               <p className="text-sm font-medium text-gray-700">John Doe</p>
//               <p className="text-xs text-gray-500">Premium User</p>
//             </div>
//           </div>
//           <div className="flex items-center space-x-3 p-3 rounded-xl hover:bg-red-50 cursor-pointer text-red-600">
//             <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
//               <FaSignOutAlt className="text-red-600 text-sm" />
//             </div>
//             <span className="text-sm font-medium">Logout</span>
//           </div>
//         </div>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 overflow-y-auto">
//         {/* Header */}
//         <div className="bg-white shadow-sm border-b border-gray-200 px-6 py-6">
//           <h2 className="text-2xl font-bold text-gray-800">
//             Welcome back, John! 👋
//           </h2>
//           <p className="text-gray-600 mt-1">Here’s a quick overview</p>
//         </div>

//         {/* Summary Sections */}
//         <div className="p-6 grid gap-6">
//           {/* Recent Entries */}
//           <section className="bg-white rounded-xl shadow-sm border p-5">
//             <h3 className="font-semibold text-lg mb-3">Recent Diary Entries</h3>
//             {recentEntries.length > 0 ? (
//               recentEntries.map((entry) => (
//                 <div
//                   key={entry._id}
//                   className="border-b py-2 last:border-none cursor-pointer hover:bg-gray-50 px-2 rounded"
//                   onClick={() => navigate(`/diary/${entry._id}`)}
//                 >
//                   <p className="font-medium text-gray-800">{entry.title}</p>
//                   <p className="text-sm text-gray-500">{entry.mood}</p>
//                 </div>
//               ))
//             ) : (
//               <p className="text-gray-500">No entries found.</p>
//             )}
//             <button
//               onClick={() => navigate("/my-entries")}
//               className="text-indigo-600 text-sm mt-3"
//             >
//               View More →
//             </button>
//           </section>

//           {/* Mood Summary */}
//           <section className="bg-white rounded-xl shadow-sm border p-5">
//             <h3 className="font-semibold text-lg mb-3">Mood Summary (7 Days)</h3>
//             {/* {moodData.length > 0 ? (
//               <ResponsiveContainer width="100%" height={200}>
//                 <PieChart>
//                   <Pie
//                     data={moodData}
//                     dataKey="count"
//                     nameKey="mood"
//                     cx="50%"
//                     cy="50%"
//                     outerRadius={60}
//                   >
//                     {moodData.map((entry, index) => (
//                       <Cell
//                         key={`cell-${index}`}
//                         fill={moodColors[entry.mood] || "#ccc"}
//                       />
//                     ))}
//                   </Pie>
//                   <Tooltip />
//                 </PieChart>
//               </ResponsiveContainer>
//             ) : (
//               <p className="text-gray-500">No mood data available.</p>
//             )} */}
//             {Array.isArray(moodData) && moodData.length > 0 ? (
//               <ResponsiveContainer width="100%" height={200}>
//                 <PieChart>
//                   <Pie
//                     data={moodData}
//                     dataKey="count"
//                     nameKey="mood"
//                     cx="50%"
//                     cy="50%"
//                     outerRadius={60}
//                   >
//                     {moodData.map((entry, index) => (
//                       <Cell
//                         key={`cell-${index}`}
//                         fill={moodColors[entry.mood] || "#ccc"}
//                       />
//                     ))}
//                   </Pie>
//                   <Tooltip />
//                 </PieChart>
//               </ResponsiveContainer>
//             ) : (
//               <p className="text-gray-500">No mood data available.</p>
//             )}

//             <button
//               onClick={() => navigate("/mood-analytics")}
//               className="text-indigo-600 text-sm mt-3"
//             >
//               Go to Mood Tracker →
//             </button>
//           </section>

//           {/* AI Insights */}
//           <section className="bg-white rounded-xl shadow-sm border p-5">
//             <h3 className="font-semibold text-lg mb-3">AI Insights</h3>
//             <p className="text-gray-700">{aiInsight}</p>
//             <button
//               onClick={() => navigate("/ai-insights")}
//               className="text-indigo-600 text-sm mt-3"
//             >
//               View Insights →
//             </button>
//           </section>

//           {/* Recommendations */}
//           <section className="bg-white rounded-xl shadow-sm border p-5">
//             <h3 className="font-semibold text-lg mb-3">Recommendations</h3>
            
//             {/* {recommendations.length > 0 ? (
//               recommendations.map((rec, i) => (
//                 <p key={i} className="text-gray-700 mb-1">
//                   • {rec.text}
//                 </p>
//               ))
//             ) : (
//               <p className="text-gray-500">No recommendations available.</p>
//             )} */}
//             <button
//               onClick={() => navigate("/recommendations")}
//               className="text-indigo-600 text-sm mt-3"
//             >
//               View All →
//             </button>
//           </section>

//           {/* Quick Actions */}
//           <section className="bg-white rounded-xl shadow-sm border p-5">
//             <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//               <button
//                 onClick={() => navigate("/create-entry")}
//                 className="flex flex-col items-center p-4 rounded-xl hover:bg-indigo-50 transition-all duration-200 group"
//               >
//                 <div className="w-12 h-12 bg-indigo-100 group-hover:bg-indigo-200 rounded-xl flex items-center justify-center mb-3">
//                   <span className="text-2xl">📝</span>
//                 </div>
//                 <span className="text-sm font-medium text-gray-700">New Entry</span>
//               </button>

//               <button
//                 onClick={() => navigate("/mood-analytics")}
//                 className="flex flex-col items-center p-4 rounded-xl hover:bg-purple-50 transition-all duration-200 group"
//               >
//                 <div className="w-12 h-12 bg-purple-100 group-hover:bg-purple-200 rounded-xl flex items-center justify-center mb-3">
//                   <span className="text-2xl">😊</span>
//                 </div>
//                 <span className="text-sm font-medium text-gray-700">Log Mood</span>
//               </button>

//               <button className="flex flex-col items-center p-4 rounded-xl hover:bg-emerald-50 transition-all duration-200 group">
//                 <div className="w-12 h-12 bg-emerald-100 group-hover:bg-emerald-200 rounded-xl flex items-center justify-center mb-3">
//                   <span className="text-2xl">🧘</span>
//                 </div>
//                 <span className="text-sm font-medium text-gray-700">Meditation</span>
//               </button>

//               <button
//                 onClick={() => navigate("/mood-analytics")}
//                 className="flex flex-col items-center p-4 rounded-xl hover:bg-amber-50 transition-all duration-200 group"
//               >
//                 <div className="w-12 h-12 bg-amber-100 group-hover:bg-amber-200 rounded-xl flex items-center justify-center mb-3">
//                   <span className="text-2xl">📊</span>
//                 </div>
//                 <span className="text-sm font-medium text-gray-700">Analytics</span>
//               </button>
//             </div>
//           </section>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default UserDashboard;









// import React, { useEffect, useState } from "react";
// import {
//   FaSmile,
//   FaChartLine,
//   FaLightbulb,
//   FaMicrophone,
//   FaSignOutAlt,
// } from "react-icons/fa";
// import { FiSettings, FiPieChart, FiUser } from "react-icons/fi";
// import { useNavigate } from "react-router-dom";
// import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
// import axios from "axios";

// const moodColors = {
//   Happy: "#10B981",
//   Sad: "#3B82F6",
//   Calm: "#FBBF24",
//   Stressed: "#EF4444",
//   Neutral: "#6B7280",
//   Excited: "#8B5CF6",
// };

// const UserDashboard = () => {
//   const navigate = useNavigate();
//   const [recentEntries, setRecentEntries] = useState([]);
//   const [moodData, setMoodData] = useState([]);
//   const [aiInsight, setAiInsight] = useState("Loading insights...");
//   const [recommendations, setRecommendations] = useState([]);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const backendUrl = import.meta.env.VITE_BACKEND_URL;
//     if (!token) return;

//     // Fetch last 3 diary entries
//     axios
//       .get(`${backendUrl}/api/diary/my-entries?limit=3`, {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then((res) => {
//         if (res.data && Array.isArray(res.data.entries)) {
//           setRecentEntries(res.data.entries);
//         } else {
//           setRecentEntries([]);
//         }
//       })
//       .catch(() => setRecentEntries([]));

//     // Fetch mood data (last 7 days)
//     axios
//       .get(`${backendUrl}/api/stats/mood?days=7`, {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then((res) => {
//         // backend returns { success:true, moodStats: { Happy:2, Sad:1 } }
//         if (res.data && res.data.moodStats) {
//           const arr = Object.entries(res.data.moodStats).map(([mood, count]) => ({
//             mood,
//             count,
//           }));
//           setMoodData(arr);
//         } else {
//           setMoodData([]);
//         }
//       })
//       .catch(() => setMoodData([]));

//     // Fetch AI Insights
//     axios
//       .get(`${backendUrl}/api/ai/insights/summary`, {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then((res) => {
//         if (res.data && res.data.message) {
//           setAiInsight(res.data.message);
//         } else {
//           setAiInsight("No insights available");
//         }
//       })
//       .catch(() => setAiInsight("No insights available"));

//     // Fetch Recommendations
//     axios
//       .get(`${backendUrl}/api/recommendations?mood=happy`, {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then((res) => {
//         // backend returns { success:true, recommendations: {...} } (object, not array)
//         if (res.data && res.data.recommendations) {
//           // convert object into array of { text } for mapping
//           const recObj = res.data.recommendations;
//           const arr = Object.values(recObj).map((val) => ({ text: val }));
//           setRecommendations(arr);
//         } else {
//           setRecommendations([]);
//         }
//       })
//       .catch(() => setRecommendations([]));
//   }, []);

//   return (
//     <div className="min-h-screen flex bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
//       {/* Sidebar */}
//       <aside className="w-72 bg-white shadow-xl hidden md:flex flex-col border-r border-gray-200">
//         <nav className="flex-1 p-6 space-y-2">
//           <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 rounded-xl p-3 flex items-center space-x-3 cursor-pointer">
//             <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
//               <FiPieChart className="text-white text-sm" />
//             </div>
//             <span className="font-medium text-indigo-700">Dashboard</span>
//           </div>
//           <div
//             onClick={() => navigate("/mood-analytics")}
//             className="hover:bg-gray-50 rounded-xl p-3 flex items-center space-x-3 cursor-pointer"
//           >
//             <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
//               <FaSmile className="text-gray-600 text-sm" />
//             </div>
//             <span className="text-gray-700">Mood Tracker</span>
//           </div>
//           <div
//             onClick={() => navigate("/ai-insights")}
//             className="hover:bg-gray-50 rounded-xl p-3 flex items-center space-x-3 cursor-pointer"
//           >
//             <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
//               <FaChartLine className="text-gray-600 text-sm" />
//             </div>
//             <span className="text-gray-700">AI Insights</span>
//           </div>
//           <div
//             onClick={() => navigate("/recommendations")}
//             className="hover:bg-gray-50 rounded-xl p-3 flex items-center space-x-3 cursor-pointer"
//           >
//             <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
//               <FaLightbulb className="text-gray-600 text-sm" />
//             </div>
//             <span className="text-gray-700">Recommendations</span>
//           </div>
//           <div
//             onClick={() => navigate("/voice-page")}
//             className="hover:bg-gray-50 rounded-xl p-3 flex items-center space-x-3 cursor-pointer"
//           >
//             <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
//               <FaMicrophone className="text-gray-600 text-sm" />
//             </div>
//             <span className="text-gray-700">Voice Assistant</span>
//           </div>
//           <div className="hover:bg-gray-50 rounded-xl p-3 flex items-center space-x-3 cursor-pointer">
//             <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
//               <FiSettings className="text-gray-600 text-sm" />
//             </div>
//             <span className="text-gray-700">Settings</span>
//           </div>
//         </nav>

//         {/* User Profile & Logout */}
//         <div className="p-6 border-t border-gray-100">
//           <div className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 cursor-pointer mb-3">
//             <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full flex items-center justify-center">
//               <FiUser className="text-white text-sm" />
//             </div>
//             <div className="flex-1">
//               <p className="text-sm font-medium text-gray-700">John Doe</p>
//               <p className="text-xs text-gray-500">Premium User</p>
//             </div>
//           </div>
//           <div className="flex items-center space-x-3 p-3 rounded-xl hover:bg-red-50 cursor-pointer text-red-600">
//             <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
//               <FaSignOutAlt className="text-red-600 text-sm" />
//             </div>
//             <span className="text-sm font-medium">Logout</span>
//           </div>
//         </div>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 overflow-y-auto">
//         {/* Header */}
//         <div className="bg-white shadow-sm border-b border-gray-200 px-6 py-6">
//           <h2 className="text-2xl font-bold text-gray-800">
//             Welcome back, John! 👋
//           </h2>
//           <p className="text-gray-600 mt-1">Here’s a quick overview</p>
//         </div>

//         {/* Summary Sections */}
//         <div className="p-6 grid gap-6">
//           {/* Recent Entries */}
//           <section className="bg-white rounded-xl shadow-sm border p-5">
//             <h3 className="font-semibold text-lg mb-3">Recent Diary Entries</h3>
//             {Array.isArray(recentEntries) && recentEntries.length > 0 ? (
//               recentEntries.map((entry) => (
//                 <div
//                   key={entry._id}
//                   className="border-b py-2 last:border-none cursor-pointer hover:bg-gray-50 px-2 rounded"
//                   onClick={() => navigate(`/diary/${entry._id}`)}
//                 >
//                   <p className="font-medium text-gray-800">{entry.title}</p>
//                   <p className="text-sm text-gray-500">{entry.mood}</p>
//                 </div>
//               ))
//             ) : (
//               <p className="text-gray-500">No entries found.</p>
//             )}
//             <button
//               onClick={() => navigate("/my-entries")}
//               className="text-indigo-600 text-sm mt-3"
//             >
//               View More →
//             </button>
//           </section>

//           {/* Mood Summary */}
//           <section className="bg-white rounded-xl shadow-sm border p-5">
//             <h3 className="font-semibold text-lg mb-3">Mood Summary (7 Days)</h3>
//             {Array.isArray(moodData) && moodData.length > 0 ? (
//               <ResponsiveContainer width="100%" height={200}>
//                 <PieChart>
//                   <Pie
//                     data={moodData}
//                     dataKey="count"
//                     nameKey="mood"
//                     cx="50%"
//                     cy="50%"
//                     outerRadius={60}
//                   >
//                     {moodData.map((entry, index) => (
//                       <Cell
//                         key={`cell-${index}`}
//                         fill={moodColors[entry.mood] || "#ccc"}
//                       />
//                     ))}
//                   </Pie>
//                   <Tooltip />
//                 </PieChart>
//               </ResponsiveContainer>
//             ) : (
//               <p className="text-gray-500">No mood data available.</p>
//             )}
//             <button
//               onClick={() => navigate("/mood-analytics")}
//               className="text-indigo-600 text-sm mt-3"
//             >
//               Go to Mood Tracker →
//             </button>
//           </section>

//           {/* AI Insights */}
//           <section className="bg-white rounded-xl shadow-sm border p-5">
//             <h3 className="font-semibold text-lg mb-3">AI Insights</h3>
//             <p className="text-gray-700">{aiInsight}</p>
//             <button
//               onClick={() => navigate("/ai-insights")}
//               className="text-indigo-600 text-sm mt-3"
//             >
//               View Insights →
//             </button>
//           </section>

//           {/* Recommendations */}
//           <section className="bg-white rounded-xl shadow-sm border p-5">
//             <h3 className="font-semibold text-lg mb-3">Recommendations</h3>
//             {Array.isArray(recommendations) && recommendations.length > 0 ? (
//               recommendations.map((rec, i) => (
//                 <p key={i} className="text-gray-700 mb-1">
//                   • {rec.text}
//                 </p>
//               ))
//             ) : (
//               <p className="text-gray-500">No recommendations available.</p>
//             )}
//             <button
//               onClick={() => navigate("/recommendations")}
//               className="text-indigo-600 text-sm mt-3"
//             >
//               View All →
//             </button>
//           </section>

//           {/* Quick Actions */}
//           <section className="bg-white rounded-xl shadow-sm border p-5">
//             <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//               <button
//                 onClick={() => navigate("/create-entry")}
//                 className="flex flex-col items-center p-4 rounded-xl hover:bg-indigo-50 transition-all duration-200 group"
//               >
//                 <div className="w-12 h-12 bg-indigo-100 group-hover:bg-indigo-200 rounded-xl flex items-center justify-center mb-3">
//                   <span className="text-2xl">📝</span>
//                 </div>
//                 <span className="text-sm font-medium text-gray-700">New Entry</span>
//               </button>

//               <button
//                 onClick={() => navigate("/mood-analytics")}
//                 className="flex flex-col items-center p-4 rounded-xl hover:bg-purple-50 transition-all duration-200 group"
//               >
//                 <div className="w-12 h-12 bg-purple-100 group-hover:bg-purple-200 rounded-xl flex items-center justify-center mb-3">
//                   <span className="text-2xl">😊</span>
//                 </div>
//                 <span className="text-sm font-medium text-gray-700">Log Mood</span>
//               </button>

//               <button className="flex flex-col items-center p-4 rounded-xl hover:bg-emerald-50 transition-all duration-200 group">
//                 <div className="w-12 h-12 bg-emerald-100 group-hover:bg-emerald-200 rounded-xl flex items-center justify-center mb-3">
//                   <span className="text-2xl">🧘</span>
//                 </div>
//                 <span className="text-sm font-medium text-gray-700">Meditation</span>
//               </button>

//               <button
//                 onClick={() => navigate("/mood-analytics")}
//                 className="flex flex-col items-center p-4 rounded-xl hover:bg-amber-50 transition-all duration-200 group"
//               >
//                 <div className="w-12 h-12 bg-amber-100 group-hover:bg-amber-200 rounded-xl flex items-center justify-center mb-3">
//                   <span className="text-2xl">📊</span>
//                 </div>
//                 <span className="text-sm font-medium text-gray-700">Analytics</span>
//               </button>
//             </div>
//           </section>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default UserDashboard;







// ----------------------------------- 



import React, { useEffect, useState } from "react";
import {
  FaSmile,
  FaChartLine,
  FaLightbulb,
  FaMicrophone,
  FaSignOutAlt,
  FaCalendarAlt,
  FaArrowUp,
  FaHeart,
  FaBrain
} from "react-icons/fa";
import { FiSettings, FiPieChart, FiUser, FiActivity } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";
import axios from "axios";

const moodColors = {
  Happy: "#10B981",
  Sad: "#3B82F6", 
  Calm: "#06B6D4",
  Stressed: "#EF4444",
  Neutral: "#6B7280",
  Excited: "#8B5CF6",
};

const UserDashboard = () => {
  const navigate = useNavigate();
  const [recentEntries, setRecentEntries] = useState([]);
  const [moodData, setMoodData] = useState([]);
  const [aiInsight, setAiInsight] = useState("Loading insights...");
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    if (!token) return;

    // Fetch last 3 diary entries
    axios
      .get(`${backendUrl}/api/diary/my-entries?limit=3`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.data && Array.isArray(res.data.entries)) {
          setRecentEntries(res.data.entries);
        } else {
          setRecentEntries([]);
        }
      })
      .catch(() => setRecentEntries([]));

    // Fetch mood data (last 7 days)
    axios
      .get(`${backendUrl}/api/stats/mood?days=7`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.data && res.data.moodStats) {
          const arr = Object.entries(res.data.moodStats).map(([mood, count]) => ({
            mood,
            count,
          }));
          setMoodData(arr);
        } else {
          setMoodData([]);
        }
      })
      .catch(() => setMoodData([]));

    // Fetch AI Insights
    axios
      .get(`${backendUrl}/api/ai/insights/summary`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.data && res.data.message) {
          setAiInsight(res.data.message);
        } else {
          setAiInsight("No insights available");
        }
      })
      .catch(() => setAiInsight("No insights available"));

    // Fetch Recommendations
    axios
      .get(`${backendUrl}/api/recommendations?mood=happy`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.data && res.data.recommendations) {
          const recObj = res.data.recommendations;
          const arr = Object.values(recObj).map((val) => ({ text: val }));
          setRecommendations(arr);
        } else {
          setRecommendations([]);
        }
      })
      .catch(() => setRecommendations([]));
  }, []);

  return (
    <div className="min-h-screen flex relative">
      {/* Background matching Home page */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50/90 via-blue-50/30 to-cyan-50/40"></div>
        
        {/* Background orbs - matching home page */}
        <div className="absolute top-10 left-10 w-64 h-64 bg-gradient-to-br from-teal-400/8 to-cyan-400/8 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute top-1/4 right-10 w-48 h-48 bg-gradient-to-br from-blue-400/6 to-indigo-400/6 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-56 h-56 bg-gradient-to-br from-cyan-400/8 to-teal-400/8 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-2000"></div>
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.015)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      </div>

      {/* Sidebar */}
      <aside className="w-80 bg-white/80 backdrop-blur-md shadow-2xl hidden md:flex flex-col border-r border-slate-200/50">
        {/* Logo/Brand Section */}
        <div className="p-6 border-b border-slate-200/50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center">
              <FaBrain className="text-white text-lg" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-teal-700 to-cyan-700 bg-clip-text text-transparent">
                MindTracker
              </h1>
              <p className="text-xs text-slate-500">Your Mental Wellness Hub</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-6 space-y-3">
          <div className="bg-gradient-to-r from-teal-50/80 to-cyan-50/80 border border-teal-200/50 rounded-2xl p-4 flex items-center space-x-4 cursor-pointer backdrop-blur-sm">
            <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg">
              <FiPieChart className="text-white text-lg" />
            </div>
            <div>
              <span className="font-semibold text-teal-700">Dashboard</span>
              <p className="text-xs text-teal-600">Overview & Stats</p>
            </div>
          </div>

          <div
            onClick={() => navigate("/mood-analytics")}
            className="hover:bg-white/60 hover:shadow-lg rounded-2xl p-4 flex items-center space-x-4 cursor-pointer transition-all duration-300 backdrop-blur-sm border border-transparent hover:border-slate-200/30"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-slate-100 to-blue-100 rounded-xl flex items-center justify-center">
              <FaSmile className="text-slate-600 text-lg" />
            </div>
            <div>
              <span className="text-slate-700 font-medium">Mood Tracker</span>
              <p className="text-xs text-slate-500">Log your emotions</p>
            </div>
          </div>

          <div
            onClick={() => navigate("/ai-insights")}
            className="hover:bg-white/60 hover:shadow-lg rounded-2xl p-4 flex items-center space-x-4 cursor-pointer transition-all duration-300 backdrop-blur-sm border border-transparent hover:border-slate-200/30"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-slate-100 to-blue-100 rounded-xl flex items-center justify-center">
              <FaChartLine className="text-slate-600 text-lg" />
            </div>
            <div>
              <span className="text-slate-700 font-medium">AI Insights</span>
              <p className="text-xs text-slate-500">Smart analytics</p>
            </div>
          </div>

          <div
            onClick={() => navigate("/recommendations")}
            className="hover:bg-white/60 hover:shadow-lg rounded-2xl p-4 flex items-center space-x-4 cursor-pointer transition-all duration-300 backdrop-blur-sm border border-transparent hover:border-slate-200/30"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-slate-100 to-blue-100 rounded-xl flex items-center justify-center">
              <FaLightbulb className="text-slate-600 text-lg" />
            </div>
            <div>
              <span className="text-slate-700 font-medium">Recommendations</span>
              <p className="text-xs text-slate-500">Personalized tips</p>
            </div>
          </div>

          <div
            onClick={() => navigate("/voice-page")}
            className="hover:bg-white/60 hover:shadow-lg rounded-2xl p-4 flex items-center space-x-4 cursor-pointer transition-all duration-300 backdrop-blur-sm border border-transparent hover:border-slate-200/30"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-slate-100 to-blue-100 rounded-xl flex items-center justify-center">
              <FaMicrophone className="text-slate-600 text-lg" />
            </div>
            <div>
              <span className="text-slate-700 font-medium">Voice Assistant</span>
              <p className="text-xs text-slate-500">Talk it out</p>
            </div>
          </div>

          <div className="hover:bg-white/60 hover:shadow-lg rounded-2xl p-4 flex items-center space-x-4 cursor-pointer transition-all duration-300 backdrop-blur-sm border border-transparent hover:border-slate-200/30">
            <div className="w-10 h-10 bg-gradient-to-br from-slate-100 to-blue-100 rounded-xl flex items-center justify-center">
              <FiSettings className="text-slate-600 text-lg" />
            </div>
            <div>
              <span className="text-slate-700 font-medium">Settings</span>
              <p className="text-xs text-slate-500">Preferences</p>
            </div>
          </div>
        </nav>

        {/* User Profile & Logout */}
        <div className="p-6 border-t border-slate-200/50">
          <div className="flex items-center space-x-4 p-4 rounded-2xl bg-gradient-to-r from-blue-50/80 to-cyan-50/80 hover:from-blue-50 hover:to-cyan-50 cursor-pointer mb-4 transition-all duration-300 border border-blue-200/30">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full flex items-center justify-center shadow-lg">
              <FiUser className="text-white text-lg" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-slate-800">John Doe</p>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse"></div>
                <p className="text-xs text-slate-600">Premium User</p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4 p-4 rounded-2xl hover:bg-red-50/80 cursor-pointer text-red-600 transition-all duration-300 border border-transparent hover:border-red-200/50">
            <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
              <FaSignOutAlt className="text-red-600 text-sm" />
            </div>
            <span className="text-sm font-medium">Logout</span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <div className="bg-white/70 backdrop-blur-md shadow-sm border-b border-slate-200/50 px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-slate-800">
                Welcome back, <span className="bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">John!</span> 👋
              </h2>
              <p className="text-slate-600 mt-2 flex items-center space-x-2">
                <FaCalendarAlt className="text-teal-500" />
                <span>Here's your mental wellness overview for today</span>
              </p>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <div className="bg-gradient-to-r from-teal-50 to-cyan-50 border border-teal-200/50 rounded-2xl px-6 py-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-full flex items-center justify-center">
                    <FaHeart className="text-white text-xs" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-600">Wellness Score</p>
                    <p className="font-bold text-teal-700">87%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="p-8 grid gap-6">
          {/* Quick Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-2">
            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-slate-200/30 p-6 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm font-medium">Total Entries</p>
                  <p className="text-2xl font-bold text-slate-800">{recentEntries.length}</p>
                  <p className="text-xs text-teal-600 flex items-center mt-1">
                    <FaArrowUp className="mr-1" /> +12% this week
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-teal-100 to-cyan-100 rounded-2xl flex items-center justify-center">
                  <FiActivity className="text-teal-600 text-xl" />
                </div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-slate-200/30 p-6 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm font-medium">Avg Mood</p>
                  <p className="text-2xl font-bold text-slate-800">Good</p>
                  <p className="text-xs text-blue-600 flex items-center mt-1">
                    <FaSmile className="mr-1" /> Stable trend
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center">
                  <FaSmile className="text-blue-600 text-xl" />
                </div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-slate-200/30 p-6 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm font-medium">Streak</p>
                  <p className="text-2xl font-bold text-slate-800">7 days</p>
                  <p className="text-xs text-emerald-600 flex items-center mt-1">
                    <FaHeart className="mr-1" /> Keep it up!
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl flex items-center justify-center">
                  <FaHeart className="text-emerald-600 text-xl" />
                </div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-slate-200/30 p-6 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm font-medium">AI Score</p>
                  <p className="text-2xl font-bold text-slate-800">8.5/10</p>
                  <p className="text-xs text-purple-600 flex items-center mt-1">
                    <FaBrain className="mr-1" /> Excellent
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-2xl flex items-center justify-center">
                  <FaBrain className="text-purple-600 text-xl" />
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Recent Entries */}
              <section className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-slate-200/30 p-6 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-teal-100 to-cyan-100 rounded-xl flex items-center justify-center">
                      <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <h3 className="font-bold text-lg text-slate-800">Recent Diary Entries</h3>
                  </div>
                  <button
                    onClick={() => navigate("/my-entries")}
                    className="text-sm bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent hover:from-teal-700 hover:to-cyan-700 font-semibold"
                  >
                    View All →
                  </button>
                </div>
                
                <div className="space-y-3">
                  {Array.isArray(recentEntries) && recentEntries.length > 0 ? (
                    recentEntries.map((entry, index) => (
                      <div
                        key={entry._id}
                        className="group p-4 rounded-xl hover:bg-gradient-to-r hover:from-teal-50/50 hover:to-cyan-50/50 cursor-pointer transition-all duration-300 border border-transparent hover:border-teal-200/50"
                        onClick={() => navigate(`/diary/${entry._id}`)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <h4 className="font-semibold text-slate-800 group-hover:text-teal-700">{entry.title}</h4>
                            <div className="flex items-center space-x-3 mt-2">
                              <span 
                                className="px-3 py-1 rounded-full text-xs font-medium"
                                style={{ 
                                  backgroundColor: `${moodColors[entry.mood]}20`,
                                  color: moodColors[entry.mood]
                                }}
                              >
                                {entry.mood}
                              </span>
                              <span className="text-xs text-slate-500">2 hours ago</span>
                            </div>
                          </div>
                          <div className="text-slate-400 group-hover:text-teal-500">
                            →
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 bg-gradient-to-br from-slate-100 to-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                        <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <p className="text-slate-500">No entries found. Start your journey today!</p>
                      <button 
                        onClick={() => navigate("/create-entry")}
                        className="mt-3 px-4 py-2 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-xl text-sm font-medium hover:from-teal-700 hover:to-cyan-700 transition-all duration-300"
                      >
                        Create First Entry
                      </button>
                    </div>
                  )}
                </div>
              </section>

              {/* AI Insights */}
              <section className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-slate-200/30 p-6 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-xl flex items-center justify-center">
                      <FaBrain className="text-purple-600 text-lg" />
                    </div>
                    <h3 className="font-bold text-lg text-slate-800">AI Insights</h3>
                  </div>
                  <button
                    onClick={() => navigate("/ai-insights")}
                    className="text-sm bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent hover:from-purple-700 hover:to-indigo-700 font-semibold"
                  >
                    View Details →
                  </button>
                </div>
                
                <div className="bg-gradient-to-r from-purple-50/80 to-indigo-50/80 border border-purple-200/30 rounded-2xl p-6">
                  <p className="text-slate-700 leading-relaxed">{aiInsight}</p>
                </div>
              </section>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              {/* Mood Summary */}
              <section className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-slate-200/30 p-6 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center">
                      <FaSmile className="text-blue-600 text-lg" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-slate-800">Mood Summary</h3>
                      <p className="text-xs text-slate-500">Last 7 days</p>
                    </div>
                  </div>
                </div>
                
                {Array.isArray(moodData) && moodData.length > 0 ? (
                  <div>
                    <ResponsiveContainer width="100%" height={200}>
                      <PieChart>
                        <Pie
                          data={moodData}
                          dataKey="count"
                          nameKey="mood"
                          cx="50%"
                          cy="50%"
                          outerRadius={70}
                          strokeWidth={2}
                          stroke="#ffffff"
                        >
                          {moodData.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={moodColors[entry.mood] || "#6B7280"}
                            />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{
                            background: 'rgba(255, 255, 255, 0.9)',
                            border: 'none',
                            borderRadius: '12px',
                            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                            backdropFilter: 'blur(10px)'
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="mt-4 grid grid-cols-2 gap-2">
                      {moodData.map((entry, index) => (
                        <div key={index} className="flex items-center space-x-2 text-sm">
                          <div 
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: moodColors[entry.mood] || '#6B7280' }}
                          ></div>
                          <span className="text-slate-600">{entry.mood}</span>
                          <span className="text-slate-800 font-semibold">({entry.count})</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-slate-100 to-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <FaSmile className="text-slate-400 text-lg" />
                    </div>
                    <p className="text-slate-500 text-sm">No mood data available</p>
                  </div>
                )}
                
                <button
                  onClick={() => navigate("/mood-analytics")}
                  className="w-full mt-4 px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl text-sm font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-300"
                >
                  Go to Mood Tracker
                </button>
              </section>

              {/* Recommendations */}
              <section className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-slate-200/30 p-6 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-amber-100 to-orange-100 rounded-xl flex items-center justify-center">
                      <FaLightbulb className="text-amber-600 text-lg" />
                    </div>
                    <h3 className="font-bold text-lg text-slate-800">Recommendations</h3>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {Array.isArray(recommendations) && recommendations.length > 0 ? (
                    recommendations.slice(0, 3).map((rec, i) => (
                      <div key={i} className="flex items-start space-x-3 p-3 rounded-xl bg-gradient-to-r from-amber-50/50 to-orange-50/50 border border-amber-200/30">
                        <div className="w-2 h-2 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-slate-700 text-sm leading-relaxed">{rec.text}</p>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-slate-100 to-amber-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                        <FaLightbulb className="text-slate-400 text-sm" />
                      </div>
                      <p className="text-slate-500 text-sm">No recommendations available</p>
                    </div>
                  )}
                </div>
                
                <button
                  onClick={() => navigate("/recommendations")}
                  className="w-full mt-4 px-4 py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-xl text-sm font-medium hover:from-amber-700 hover:to-orange-700 transition-all duration-300"
                >
                  View All Recommendations
                </button>
              </section>
            </div>
          </div>

          {/* Quick Actions */}
          <section className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-slate-200/30 p-6 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-800">Quick Actions</h3>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button
                onClick={() => navigate("/create-entry")}
                className="group flex flex-col items-center p-6 rounded-2xl hover:bg-gradient-to-br hover:from-teal-50 hover:to-cyan-50 transition-all duration-300 border-2 border-transparent hover:border-teal-200/50 hover:shadow-lg"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-teal-100 to-cyan-100 group-hover:from-teal-200 group-hover:to-cyan-200 rounded-2xl flex items-center justify-center mb-3 transition-all duration-300 group-hover:scale-110">
                  <span className="text-2xl">📝</span>
                </div>
                <span className="text-sm font-semibold text-slate-700 group-hover:text-teal-700">New Entry</span>
                <span className="text-xs text-slate-500 mt-1">Write your thoughts</span>
              </button>

              <button
                onClick={() => navigate("/mood-analytics")}
                className="group flex flex-col items-center p-6 rounded-2xl hover:bg-gradient-to-br hover:from-purple-50 hover:to-indigo-50 transition-all duration-300 border-2 border-transparent hover:border-purple-200/50 hover:shadow-lg"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-indigo-100 group-hover:from-purple-200 group-hover:to-indigo-200 rounded-2xl flex items-center justify-center mb-3 transition-all duration-300 group-hover:scale-110">
                  <span className="text-2xl">😊</span>
                </div>
                <span className="text-sm font-semibold text-slate-700 group-hover:text-purple-700">Log Mood</span>
                <span className="text-xs text-slate-500 mt-1">Track emotions</span>
              </button>

              <button className="group flex flex-col items-center p-6 rounded-2xl hover:bg-gradient-to-br hover:from-emerald-50 hover:to-green-50 transition-all duration-300 border-2 border-transparent hover:border-emerald-200/50 hover:shadow-lg">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-green-100 group-hover:from-emerald-200 group-hover:to-green-200 rounded-2xl flex items-center justify-center mb-3 transition-all duration-300 group-hover:scale-110">
                  <span className="text-2xl">🧘</span>
                </div>
                <span className="text-sm font-semibold text-slate-700 group-hover:text-emerald-700">Meditation</span>
                <span className="text-xs text-slate-500 mt-1">Find peace</span>
              </button>

              <button
                onClick={() => navigate("/mood-analytics")}
                className="group flex flex-col items-center p-6 rounded-2xl hover:bg-gradient-to-br hover:from-amber-50 hover:to-orange-50 transition-all duration-300 border-2 border-transparent hover:border-amber-200/50 hover:shadow-lg"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-amber-100 to-orange-100 group-hover:from-amber-200 group-hover:to-orange-200 rounded-2xl flex items-center justify-center mb-3 transition-all duration-300 group-hover:scale-110">
                  <span className="text-2xl">📊</span>
                </div>
                <span className="text-sm font-semibold text-slate-700 group-hover:text-amber-700">Analytics</span>
                <span className="text-xs text-slate-500 mt-1">View progress</span>
              </button>
            </div>
          </section>
        </div>
      </main>

      {/* Floating elements matching home page */}
      <div className="fixed top-1/3 left-6 w-2 h-2 bg-teal-400/40 rounded-full animate-ping pointer-events-none"></div>
      <div className="fixed top-2/3 right-8 w-1.5 h-1.5 bg-cyan-400/30 rounded-full animate-pulse pointer-events-none"></div>
      <div className="fixed bottom-1/4 left-1/3 w-1 h-1 bg-blue-400/40 rounded-full animate-pulse delay-1000 pointer-events-none"></div>
    </div>
  );
};

export default UserDashboard;