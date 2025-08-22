// // ✅ Mood Analytics Dashboard UI
// // Combines LineChart (mood over time) + PieChart (mood ratio)
// // Uses Recharts + TailwindCSS + React

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import {toast} from 'react-toastify';
// import {
//   LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,
//   PieChart, Pie, Cell, Legend
// } from 'recharts';

// const moodColors = {
//   Happy: '#10B981', Sad: '#3B82F6', Anxious: '#F59E0B', Angry: '#EF4444', Neutral: '#6B7280', Grateful: '#8B5CF6'
// };

// const MoodAnalyticsDashboard = () => {
//   const [moodStats, setMoodStats] = useState([]);
//   const [timelineData, setTimelineData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchStats = async () => {
//     setLoading(true);
//     try {
//       const token = localStorage.getItem('token');
//       const config = { headers: { Authorization: `Bearer ${token}` } };

//       const [moodRes, timeRes] = await Promise.all([
//         axios.get('/api/stats/mood', config),
//         axios.get('/api/stats/timeline', config),
//       ]);

//       const moodArray = Object.entries(moodRes.data.moodStats).map(([mood, count]) => ({ name: mood, value: count }));
//       setMoodStats(moodArray);

//       const timeRaw = timeRes.data.timeline;
//       const formattedTimeline = Object.entries(timeRaw).map(([date, moods]) => ({ date, ...moods }));
//       setTimelineData(formattedTimeline);

//     } catch (err) {
//       console.error(err);
//       toast.error('Failed to load analytics');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchStats();
//   }, []);

//   return (
//     <div className="p-6 max-w-7xl mx-auto">
//       <h1 className="text-3xl font-bold text-primary mb-6">📈 Mood Analytics Dashboard</h1>

//       {loading ? (
//         <p className="text-gray-500">Loading analytics...</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

//           {/* Pie Chart */}
//           <div className="bg-white p-4 shadow-md rounded-lg">
//             <h2 className="text-xl font-semibold text-gray-700 mb-4">Overall Mood Distribution</h2>
//             <ResponsiveContainer width="100%" height={300}>
//               <PieChart>
//                 <Pie
//                   data={moodStats}
//                   dataKey="value"
//                   nameKey="name"
//                   cx="50%"
//                   cy="50%"
//                   outerRadius={100}
//                   label
//                 >
//                   {moodStats.map((entry, index) => (
//                     <Cell key={`cell-${index}`} fill={moodColors[entry.name] || '#8884d8'} />
//                   ))}
//                 </Pie>
//                 <Legend />
//               </PieChart>
//             </ResponsiveContainer>
//           </div>

//           {/* Line Chart */}
//           <div className="bg-white p-4 shadow-md rounded-lg">
//             <h2 className="text-xl font-semibold text-gray-700 mb-4">Mood Over Time</h2>
//             <ResponsiveContainer width="100%" height={300}>
//               <LineChart data={timelineData}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="date" stroke="#374151" />
//                 <YAxis allowDecimals={false} stroke="#374151" />
//                 <Tooltip />
//                 {Object.keys(moodColors).map(mood => (
//                   <Line
//                     key={mood}
//                     type="monotone"
//                     dataKey={mood}
//                     stroke={moodColors[mood]}
//                     strokeWidth={2}
//                     dot={false}
//                   />
//                 ))}
//               </LineChart>
//             </ResponsiveContainer>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MoodAnalyticsDashboard;








// ✅ Professional Mood Analytics Dashboard UI
// Modern design with enhanced data visualization
// Uses Recharts + TailwindCSS + React - maintains all existing logic

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';

const moodColors = {
  Happy: '#10B981',
  Sad: '#3B82F6',
  Anxious: '#F59E0B',
  Angry: '#EF4444',
  Neutral: '#6B7280',
  Grateful: '#8B5CF6',
  Excited : '#3B12F6',
  Calm : '#6B7280',
  Stressed : '#F59E0B'
};

const moodEmojis = {
  Happy: '😊',
  Sad: '😢',
  Anxious: '😰',
  Angry: '😡',
  Neutral: '😐',
  Grateful: '🙏'
};



const MoodAnalyticsDashboard = () => {
  const [moodStats, setMoodStats] = useState([]);
  const [timelineData, setTimelineData] = useState([]);
  const [loading, setLoading] = useState(true);



  const fetchStats = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };

      // Fetch both mood stats and timeline
      const [moodRes, timeRes] = await Promise.all([
        axios.get("http://localhost:5000/api/stats/mood", config),
        axios.get("http://localhost:5000/api/stats/timeline", config)
      ]);

      // ===== Pie data (unchanged) =====
      const moodArray = Object.entries(moodRes.data.moodStats || {}).map(([mood, count]) => ({
        name: mood,
        value: count
      }));
      setMoodStats(moodArray);

      // ===== Timeline data (defensive + case-insensitive match) =====
      // Accept both shapes: { success: true, timeline: {...} } or just {...}
      const timeRaw = (timeRes.data && (timeRes.data.timeline ?? timeRes.data)) || {};

      // If empty, set timelineData to empty array so charts render safely
      if (!timeRaw || Object.keys(timeRaw).length === 0) {
        setTimelineData([]);
        setLoading(false);
        return;
      }

      const allMoods = Object.keys(moodColors); // canonical moods used by frontend
      const formattedTimeline = Object.entries(timeRaw).map(([date, moods]) => {
        const normalized = { date };
        allMoods.forEach(mood => {
          const matchedKey = Object.keys(moods || {}).find(
            k => k.toLowerCase() === mood.toLowerCase()
          );
          normalized[mood] = matchedKey ? moods[matchedKey] : 0;
        });
        return normalized;
      });

      setTimelineData(formattedTimeline);

    } catch (err) {
      console.error("Analytics Fetch Error:", err);
      toast.error('Failed to load analytics');
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchStats();
  }, []);

  // Calculate statistics
  const totalEntries = moodStats.reduce((sum, mood) => sum + mood.value, 0);
  const dominantMood = moodStats.reduce((prev, current) => (prev.value > current.value) ? prev : current, { name: '', value: 0 });
  const avgMoodScore = moodStats.length > 0 ? Math.round((moodStats.reduce((sum, mood) => sum + mood.value, 0) / moodStats.length) * 10) / 10 : 0;

  // Custom tooltip for pie chart
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      const percentage = ((data.value / totalEntries) * 100).toFixed(1);
      return (
        <div className="bg-white p-3 rounded-xl shadow-lg border border-gray-100">
          <p className="font-medium text-gray-800">
            {moodEmojis[data.name]} {data.name}
          </p>
          <p className="text-sm text-gray-600">
            {data.value} entries ({percentage}%)
          </p>
        </div>
      );
    }
    return null;
  };

  // Custom tooltip for bar chart

  const CustomBarTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-100">
          <p className="font-medium text-gray-800 mb-2">{label}</p>
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center space-x-2 text-sm">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: entry.color || entry.fill }}
              />
              <span className="text-gray-600">
                {moodEmojis[entry.dataKey] || ''} {entry.dataKey}:
              </span>
              <span className="font-medium">{entry.value}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
                Mood Analytics
              </h1>
              <p className="text-gray-600 text-sm">Discover patterns in your emotional journey</p>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <button className="bg-white text-indigo-600 px-4 py-2 rounded-xl border border-indigo-200 hover:bg-indigo-50 transition-all duration-200 text-sm font-medium">
                Export Data
              </button>
              <button
                onClick={fetchStats}
                className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 text-sm font-medium shadow-sm"
              >
                Refresh
              </button>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-indigo-200"></div>
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-indigo-600 border-t-transparent absolute top-0"></div>
            </div>
            <p className="text-gray-600 ml-4 text-lg">Loading your analytics...</p>
          </div>
        ) : (
          <>
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm font-medium">Total Entries</p>
                    <p className="text-3xl font-bold text-indigo-600 mt-1">{totalEntries}</p>
                  </div>
                  <div className="bg-indigo-100 rounded-full p-3">
                    <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm font-medium">Dominant Mood</p>
                    <p className="text-2xl font-bold text-purple-600 mt-1 flex items-center">
                      <span className="mr-2">{moodEmojis[dominantMood.name]}</span>
                      {dominantMood.name}
                    </p>
                  </div>
                  <div className="bg-purple-100 rounded-full p-3">
                    <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm font-medium">Mood Variety</p>
                    <p className="text-3xl font-bold text-emerald-600 mt-1">{moodStats.length}</p>
                  </div>
                  <div className="bg-emerald-100 rounded-full p-3">
                    <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm font-medium">Wellness Score</p>
                    <p className="text-3xl font-bold text-amber-600 mt-1">{avgMoodScore}%</p>
                  </div>
                  <div className="bg-amber-100 rounded-full p-3">
                    <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

              {/* Pie Chart */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 h-100">
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="bg-purple-100 rounded-lg p-2">
                        <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                        </svg>
                      </div>
                      <h2 className="text-xl font-semibold text-gray-800">Mood Distribution</h2>
                    </div>
                    <span className="bg-purple-100 text-purple-800 text-xs font-medium px-3 py-1 rounded-full">
                      Overall Pattern
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={moodStats}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        strokeWidth={2}
                        stroke="#ffffff"
                      >
                        {moodStats.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={moodColors[entry.name] || '#8884d8'}
                            className="hover:opacity-80 transition-opacity duration-200"
                          />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                      <Legend
                        wrapperStyle={{ paddingTop: '20px' }}
                        formatter={(value, entry) => (
                          <span className="text-sm font-medium text-gray-700">
                            {moodEmojis[value]} {value}
                          </span>
                        )}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Bar Chart */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 h-100">
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="bg-indigo-100 rounded-lg p-2">
                        <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                      </div>
                      <h2 className="text-xl font-semibold text-gray-800">Mood Timeline</h2>
                    </div>
                    <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-3 py-1 rounded-full">
                      Trend Analysis
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                      data={timelineData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                      barCategoryGap="30%"
                      barGap={6}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                      <XAxis
                        dataKey="date"
                        stroke="#64748b"
                        fontSize={12}
                        tickMargin={10}
                        // rotate labels if many dates:
                        tick={{ angle: -45, textAnchor: 'end' }}
                      />
                      <YAxis
                        allowDecimals={false}
                        stroke="#64748b"
                        fontSize={12}
                        tickMargin={10}
                      />
                      <Tooltip content={<CustomBarTooltip />} />
                      <Legend
                        verticalAlign="top"
                        align="right"
                        wrapperStyle={{ paddingBottom: 10 }}
                        formatter={(value) => `${moodEmojis[value] || ''} ${value}`}
                      />

                      {Object.keys(moodColors).map(mood => (
                        <Bar
                          key={mood}
                          dataKey={mood}
                          name={mood}
                          fill={moodColors[mood]}
                          barSize={18}
                        />
                      ))}
                    </BarChart>
                  </ResponsiveContainer>

                </div>
              </div>
            </div>

            {/* Mood Breakdown Cards */}
            <div className="mt-8">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
                <div className="p-6 border-b border-gray-100">
                  <h3 className="text-xl font-semibold text-gray-800">Detailed Mood Breakdown</h3>
                  <p className="text-gray-500 text-sm mt-1">Individual mood statistics and percentages</p>
                </div>

                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {moodStats.map((mood, index) => {
                      const percentage = totalEntries > 0 ? ((mood.value / totalEntries) * 100).toFixed(1) : 0;
                      return (
                        <div key={index} className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-all duration-200">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-2">
                              <span className="text-2xl">{moodEmojis[mood.name]}</span>
                              <span className="font-medium text-gray-800">{mood.name}</span>
                            </div>
                            <div
                              className="w-4 h-4 rounded-full"
                              style={{ backgroundColor: moodColors[mood.name] }}
                            ></div>
                          </div>

                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Entries:</span>
                              <span className="font-semibold">{mood.value}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Percentage:</span>
                              <span className="font-semibold">{percentage}%</span>
                            </div>

                            {/* Progress bar */}
                            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                              <div
                                className="h-2 rounded-full transition-all duration-500"
                                style={{
                                  width: `${percentage}%`,
                                  backgroundColor: moodColors[mood.name]
                                }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Insights Section */}
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 text-white">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="bg-white/20 rounded-lg p-2">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold">AI Insights</h3>
                </div>
                <p className="text-white/90 mb-4 text-[15px]">
                  Based on your mood patterns, you tend to experience {dominantMood.name.toLowerCase()} emotions most frequently.
                  This represents {((dominantMood.value / totalEntries) * 100).toFixed(1)}% of your recorded moods.
                </p>
                <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                  <p className="text-sm text-white/80">
                    💡 Tip: Consider exploring activities that enhance your positive moods and develop coping strategies for challenging emotions.
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-6 text-white">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="bg-white/20 rounded-lg p-2">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold">Progress Summary</h3>
                </div>
                <p className="text-white/90 mb-4 text-[15px]">
                  You've logged {totalEntries} mood entries across {moodStats.length} different emotional states.
                  This shows great self-awareness and commitment to tracking your mental wellness.
                </p>
                <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                  <p className="text-sm text-white/80">
                    🎯 Goal: Continue consistent tracking to identify deeper patterns and improve emotional intelligence.
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MoodAnalyticsDashboard;