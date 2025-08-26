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

// Updated color scheme matching your login page aesthetic
const moodColors = {
  Happy: '#14B8A6',      // teal-500 - matches your login gradient start
  Sad: '#0891B2',        // cyan-600 - complementary blue
  Anxious: '#F59E0B',    // amber-500 - warm accent
  Angry: '#EF4444',      // red-500 - alert color
  Neutral: '#64748B',    // slate-500 - neutral tone
  Grateful: '#8B5CF6',   // violet-500 - elegant purple
  Excited: '#06B6D4',    // cyan-500 - matches your login gradient end
  Calm: '#10B981',       // emerald-500 - peaceful green
  Stressed: '#F97316'    // orange-500 - energetic warm
};

const moodEmojis = {
  Happy: '😊',
  Sad: '😢',
  Anxious: '😰',
  Angry: '😡',
  Neutral: '😐',
  Grateful: '🙏',
  Excited: '🤩',
  Calm: '😌',
  Stressed: '😤'
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
        <div className="bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-xl border border-white/50">
          <p className="font-semibold text-gray-800 text-base">
            {moodEmojis[data.name]} {data.name}
          </p>
          <p className="text-sm text-gray-600 mt-1">
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
      <div className="bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-xl border border-white/50">
        <p className="font-semibold text-gray-800 mb-3 text-base">{label}</p>
        {payload.map((entry, index) =>
          entry.value > 0 && ( // no extra { } wrapping
            <div key={index} className="flex items-center space-x-3 text-sm mb-1">
              <div
                className="w-3 h-3 rounded-full shadow-sm"
                style={{ backgroundColor: entry.color || entry.fill }}
              />
              <span className="text-gray-600 min-w-0 flex-1">
                {moodEmojis[entry.dataKey] || ""} {entry.dataKey}:
              </span>
              <span className="font-semibold text-gray-800">{entry.value}</span>
            </div>
          )
        )}
      </div>
    );
  }
  return null;
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50/80 via-blue-50/20 to-cyan-50/30 p-6">
      {/* Background decorative elements matching login page */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-10 left-10 w-64 h-64 bg-gradient-to-br from-teal-400/10 to-cyan-400/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute top-1/4 right-10 w-48 h-48 bg-gradient-to-br from-blue-400/8 to-indigo-400/8 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-56 h-56 bg-gradient-to-br from-cyan-400/10 to-teal-400/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-2000"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.02)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      </div>

      <div className="max-w-7xl mx-auto">

        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">
                Mood Analytics
              </h1>
              <p className="text-gray-600 text-sm">Discover patterns in your emotional journey</p>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <button
                onClick={fetchStats}
                className="bg-gradient-to-r from-teal-500 via-blue-600 to-cyan-600 text-white px-4 py-2 rounded-xl hover:from-teal-600 hover:via-blue-700 hover:to-cyan-700 transition-all duration-300 text-sm font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Refresh
              </button>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-teal-200"></div>
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-teal-600 border-t-transparent absolute top-0"></div>
            </div>
            <p className="text-gray-600 ml-4 text-lg">Loading your analytics...</p>
          </div>
        ) : (
          <>
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/50 hover:shadow-xl hover:bg-white/80 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm font-medium">Total Entries</p>
                    <p className="text-3xl font-bold text-teal-600 mt-1">{totalEntries}</p>
                  </div>
                  <div className="bg-teal-100/80 backdrop-blur-sm rounded-full p-3">
                    <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/50 hover:shadow-xl hover:bg-white/80 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm font-medium">Dominant Mood</p>
                    <p className="text-2xl font-bold text-cyan-600 mt-1 flex items-center">
                      <span className="mr-2">{moodEmojis[dominantMood.name]}</span>
                      {dominantMood.name}
                    </p>
                  </div>
                  <div className="bg-cyan-100/80 backdrop-blur-sm rounded-full p-3">
                    <svg className="w-8 h-8 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/50 hover:shadow-xl hover:bg-white/80 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm font-medium">Mood Variety</p>
                    <p className="text-3xl font-bold text-emerald-600 mt-1">{moodStats.length}</p>
                  </div>
                  <div className="bg-emerald-100/80 backdrop-blur-sm rounded-full p-3">
                    <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/50 hover:shadow-xl hover:bg-white/80 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm font-medium">Wellness Score</p>
                    <p className="text-3xl font-bold text-amber-600 mt-1">{avgMoodScore}%</p>
                  </div>
                  <div className="bg-amber-100/80 backdrop-blur-sm rounded-full p-3">
                    <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Charts Section - Enhanced sizes */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

              {/* Pie Chart - Increased size */}
              <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg border border-white/50 h-[500px]">
                <div className="p-6 border-b border-white/30">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="bg-gradient-to-r from-teal-500 to-cyan-500 rounded-lg p-2">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                        </svg>
                      </div>
                      <h2 className="text-xl font-semibold text-gray-800">Mood Distribution</h2>
                    </div>
                    <span className="bg-gradient-to-r from-teal-100 to-cyan-100 text-teal-800 text-xs font-medium px-3 py-1 rounded-full backdrop-blur-sm">
                      Overall Pattern
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <ResponsiveContainer width="100%" height={380}>
                    <PieChart>
                      <Pie
                        data={moodStats}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={120}
                        innerRadius={40}
                        strokeWidth={3}
                        stroke="#ffffff"
                      >
                        {moodStats.map((entry, index) => {
                          // fallback: auto-color if not in moodColors
                          const colors = Object.values(moodColors);
                          const color =
                            moodColors[entry.name] || colors[index % colors.length];
                          return (
                            <Cell
                              key={`cell-${index}`}
                              fill={color}
                              className="hover:opacity-80 transition-opacity duration-300 drop-shadow-sm"
                            />
                          );
                        })}
                      </Pie>

                      {/* Tooltip always shows full details */}
                      <Tooltip content={<CustomTooltip />} />

                      {/* Show only top 5 entries in legend */}
                      <Legend
                        wrapperStyle={{ paddingTop: '20px' }}
                        payload={moodStats
                          .sort((a, b) => {
                            if (b.value === a.value) {
                              // tie → alphabetical
                              return a.name.localeCompare(b.name);
                            }
                            return b.value - a.value;
                          })
                          .slice(0, 0) // strictly only top 5 items
                          .map((entry) => ({
                            id: entry.name,
                            type: "circle",
                            value: `${moodEmojis[entry.name] || ""} ${entry.name}`,
                            color:
                              moodColors[entry.name] ||
                              Object.values(moodColors)[
                              moodStats.indexOf(entry) % Object.values(moodColors).length
                              ],
                          }))}
                      />


                    </PieChart>
                  </ResponsiveContainer>

                </div>
              </div>

              {/* Bar Chart - Increased size */}
              <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg border border-white/50 h-[500px]">
                <div className="p-6 border-b border-white/30">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg p-2">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                      </div>
                      <h2 className="text-xl font-semibold text-gray-800">Mood Timeline</h2>
                    </div>
                    <span className="bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full backdrop-blur-sm">
                      Trend Analysis
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <ResponsiveContainer width="100%" height={380}>
                    <BarChart
                      data={timelineData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                      barCategoryGap="30%"
                      barGap={4}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.6} />
                      <XAxis
                        dataKey="date"
                        stroke="#64748b"
                        fontSize={12}
                        tickMargin={10}
                        tick={{ angle: 0, textAnchor: 'end' }}
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
                        wrapperStyle={{ paddingBottom: 15 }}
                        formatter={(value) => `${moodEmojis[value] || ''} ${value}`}
                      />

                      {Object.keys(moodColors).map(mood => (
                        <Bar
                          key={mood}
                          dataKey={mood}
                          name={mood}
                          fill={moodColors[mood]}
                          barSize={20}
                          radius={[2, 2, 0, 0]}
                        />
                      ))}
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Mood Breakdown Cards */}
            <div className="mt-8">
              <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg border border-white/50">
                <div className="p-6 border-b border-white/30">
                  <h3 className="text-xl font-semibold text-gray-800">Detailed Mood Breakdown</h3>
                  <p className="text-gray-500 text-sm mt-1">Individual mood statistics and percentages</p>
                </div>

                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {moodStats.map((mood, index) => {
                      const percentage = totalEntries > 0 ? ((mood.value / totalEntries) * 100).toFixed(1) : 0;
                      return (
                        <div key={index} className="bg-white/50 backdrop-blur-sm rounded-xl p-4 hover:bg-white/70 hover:shadow-md transition-all duration-300 border border-white/30">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-2">
                              <span className="text-2xl drop-shadow-sm">{moodEmojis[mood.name]}</span>
                              <span className="font-medium text-gray-800">{mood.name}</span>
                            </div>
                            <div
                              className="w-4 h-4 rounded-full shadow-sm"
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
                            <div className="w-full bg-white/40 rounded-full h-2.5 mt-2 shadow-inner">
                              <div
                                className="h-2.5 rounded-full transition-all duration-700 shadow-sm"
                                style={{
                                  width: `${percentage}%`,
                                  background: `linear-gradient(135deg, ${moodColors[mood.name]}, ${moodColors[mood.name]}cc)`
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
              <div className="bg-gradient-to-br from-teal-500 via-blue-600 to-cyan-600 rounded-2xl p-6 text-white shadow-xl">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold">AI Insights</h3>
                </div>
                <p className="text-white/95 mb-4 text-[15px]">
                  Based on your mood patterns, you tend to experience {dominantMood.name.toLowerCase()} emotions most frequently.
                  This represents {((dominantMood.value / totalEntries) * 100).toFixed(1)}% of your recorded moods.
                </p>
                <div className="bg-white/15 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                  <p className="text-sm text-white/90">
                    💡 Tip: Consider exploring activities that enhance your positive moods and develop coping strategies for challenging emotions.
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-600 rounded-2xl p-6 text-white shadow-xl">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold">Progress Summary</h3>
                </div>
                <p className="text-white/95 mb-4 text-[15px]">
                  You've logged {totalEntries} mood entries across {moodStats.length} different emotional states.
                  This shows great self-awareness and commitment to tracking your mental wellness.
                </p>
                <div className="bg-white/15 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                  <p className="text-sm text-white/90">
                    🎯 Goal: Continue consistent tracking to identify deeper patterns and improve emotional intelligence.
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Floating decorative elements matching login */}
      <div className="fixed top-1/3 left-6 w-1.5 h-1.5 bg-teal-400/60 rounded-full animate-ping pointer-events-none"></div>
      <div className="fixed top-2/3 right-8 w-1 h-1 bg-cyan-400/50 rounded-full animate-pulse pointer-events-none"></div>
    </div>
  );
};

export default MoodAnalyticsDashboard;