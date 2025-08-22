import React, { useEffect, useState } from "react";
import {FaSmile,FaChartLine,FaLightbulb,FaCalendarAlt,FaArrowUp,FaHeart,FaBrain,FaPlus,FaEye,FaTrash} from "react-icons/fa";
import { FiActivity } from "react-icons/fi";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { useNavigate } from "react-router-dom";

const moodColors = {
  Happy: "#10B981",
  Sad: "#3B82F6",
  Calm: "#06B6D4",
  Stressed: "#EF4444",
  Neutral: "#6B7280",
  Excited: "#8B5CF6",
  Anxious: "#F59E0B",
  Angry: "#DC2626",
  Grateful: "#059669"
};

const UserDashboard = () => {
  const [recentEntries, setRecentEntries] = useState([]);
  const [moodData, setMoodData] = useState([]);
  const [aiInsights, setAiInsights] = useState({
    overallMood: "Loading...",
    summary: "Loading insights...",
    keyConcerns: [],
    positiveChanges: [],
    recommendations: [],
    highlights: []
  });
  const [recommendations, setRecommendations] = useState([]);
  const [userProfile, setUserProfile] = useState({ name: "User" });
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalEntries: 0,
    avgMood: "Good",
    streak: 7,
    aiScore: 8.5
  });

  const navigate = useNavigate();

  // Get token and API base URL
  const getToken = () => localStorage.getItem("token");
  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  // API call helper
  const apiCall = async (endpoint, options = {}) => {
    const token = getToken();
    if (!token) {
      navigate("/login");
      return null;
    }

    try {
      const response = await fetch(`${backendUrl}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          ...options.headers
        },
        ...options
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`API Error (${endpoint}):`, error);
      return null;
    }
  };

  // Fetch user profile
  const fetchUserProfile = async () => {
    const data = await apiCall('/api/user/get-profile');
    if (data?.success) {
      setUserProfile(data.userData || { name: "User" });
    }
  };

  // Fetch recent diary entries
  const fetchRecentEntries = async () => {
    const data = await apiCall('/api/diary/my-entries');
    if (data?.success && Array.isArray(data.entries)) {
      setRecentEntries(data.entries.slice(0, 3));
      setStats(prev => ({ ...prev, totalEntries: data.entries.length }));
    }
  };

  // Fetch mood statistics
  const fetchMoodStats = async () => {
    const data = await apiCall('/api/stats/mood');
    if (data?.success && data.moodStats) {
      const moodArray = Object.entries(data.moodStats).map(([mood, count]) => ({
        mood,
        count,
        name: mood // for recharts
      }));
      setMoodData(moodArray);

      // Calculate average mood
      if (moodArray.length > 0) {
        const topMood = moodArray.reduce((a, b) => a.count > b.count ? a : b);
        setStats(prev => ({ ...prev, avgMood: topMood.mood }));
      }
    }
  };
  
  // Fetch AI insights
  const fetchAIInsights = async () => {
    const data = await apiCall('/api/insights/');
    if (data) {
      setAiInsights({
        overallMood: data.overallMood || "Mixed",
        summary: data.summary || "No insights available yet",
        keyConcerns: data.keyConcerns || [],
        positiveChanges: data.positiveChanges || [],
        recommendations: data.recommendations || [],
        highlights: data.highlights || []
      });

      // Calculate AI score based on insights
      let score = 7.0;
      if (data.overallMood?.toLowerCase().includes('positive')) score += 1;
      if (data.overallMood?.toLowerCase().includes('good')) score += 0.5;
      if (data.positiveChanges?.length > 2) score += 0.5;
      setStats(prev => ({ ...prev, aiScore: Math.min(10, score) }));
    }
  };

  // Fetch recommendations
  const fetchRecommendations = async () => {
    const data = await apiCall('/api/recommendations?mood=happy');
    if (data?.success && data.recommendations) {
      const recArray = Object.values(data.recommendations).map(val => ({
        text: typeof val === 'string' ? val : JSON.stringify(val)
      }));
      setRecommendations(recArray);
    }
  };

  // Delete diary entry
  const deleteDiaryEntry = async (id) => {
    if (!confirm("Are you sure you want to delete this entry?")) return;

    const data = await apiCall(`/api/diary/delete/${id}`, { method: 'DELETE' });
    if (data?.success) {
      setRecentEntries(prev => prev.filter(entry => entry._id !== id));
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([
        fetchUserProfile(),
        fetchRecentEntries(),
        fetchMoodStats(),
        fetchAIInsights(),
        fetchRecommendations()
      ]);
      setLoading(false);
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center mx-auto mb-4 animate-pulse">
            <FaBrain className="text-white text-2xl" />
          </div>
          <p className="text-slate-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex relative bg-gradient-to-br from-slate-50/90 via-blue-50/30 to-cyan-50/40">
      {/* Background Elements */}
      <div className="fixed inset-0 -z-10">
        {/* Background orbs */}
        <div className="absolute top-10 left-10 w-64 h-64 bg-gradient-to-br from-teal-400/8 to-cyan-400/8 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute top-1/4 right-10 w-48 h-48 bg-gradient-to-br from-blue-400/6 to-indigo-400/6 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-56 h-56 bg-gradient-to-br from-cyan-400/8 to-teal-400/8 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-2000"></div>

        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.015)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      </div>

      {/* Main Content */}
      <main className="flex-1 min-h-screen">
        {/* Header */}
        <div className="bg-white/70 backdrop-blur-md shadow-sm border-b border-slate-200/50 px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-slate-800">
                Welcome back, <span className="bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">{userProfile.name}!</span> 👋
              </h2>
              <p className="text-slate-600 mt-2 flex items-center space-x-2">
                <FaCalendarAlt className="text-teal-500" />
                <span>Here's your mental wellness overview for today</span>
              </p>
            </div>
            <div className="hidden lg:flex items-center space-x-4">
              <div className="bg-gradient-to-r from-teal-50 to-cyan-50 border border-teal-200/50 rounded-2xl px-6 py-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-full flex items-center justify-center">
                    <FaHeart className="text-white text-xs" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-600">Wellness Score</p>
                    <p className="font-bold text-teal-700">{Math.round(stats.aiScore * 10)}%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Quick Stats Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-slate-200/30 p-6 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm font-medium">Total Entries</p>
                  <p className="text-2xl font-bold text-slate-800">{stats.totalEntries}</p>
                  <p className="text-xs text-teal-600 flex items-center mt-1">
                    <FaArrowUp className="mr-1" /> Keep writing!
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
                  <p className="text-slate-600 text-sm font-medium">Overall Mood</p>
                  <p className="text-2xl font-bold text-slate-800">{aiInsights.overallMood}</p>
                  <p className="text-xs text-blue-600 flex items-center mt-1">
                    <FaSmile className="mr-1" /> From AI analysis
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
                  <p className="text-slate-600 text-sm font-medium">Active Days</p>
                  <p className="text-2xl font-bold text-slate-800">{stats.streak} days</p>
                  <p className="text-xs text-emerald-600 flex items-center mt-1">
                    <FaHeart className="mr-1" /> Great streak!
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
                  <p className="text-slate-600 text-sm font-medium">AI Insights Score</p>
                  <p className="text-2xl font-bold text-slate-800">{stats.aiScore.toFixed(1)}/10</p>
                  <p className="text-xs text-purple-600 flex items-center mt-1">
                    <FaBrain className="mr-1" /> Well-being analysis
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-2xl flex items-center justify-center">
                  <FaBrain className="text-purple-600 text-xl" />
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="xl:col-span-2 space-y-8">
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
                  {recentEntries.length > 0 ? (
                    recentEntries.map((entry) => (
                      <div
                        key={entry._id}
                        className="group p-4 rounded-xl hover:bg-gradient-to-r hover:from-teal-50/50 hover:to-cyan-50/50 cursor-pointer transition-all duration-300 border border-transparent hover:border-teal-200/50"
                      >
                        <div className="flex items-center justify-between">
                          <div
                            className="flex-1"
                            onClick={() => navigate(`/diary/${entry._id}`)}
                          >
                            <h4 className="font-semibold text-slate-800 group-hover:text-teal-700">{entry.title}</h4>
                            <p className="text-sm text-slate-600 mt-1 line-clamp-2">{entry.entry?.substring(0, 100)}...</p>
                            <div className="flex items-center space-x-3 mt-2">
                              <span
                                className="px-3 py-1 rounded-full text-xs font-medium"
                                style={{
                                  backgroundColor: `${moodColors[entry.mood] || '#6B7280'}20`,
                                  color: moodColors[entry.mood] || '#6B7280'
                                }}
                              >
                                {entry.mood}
                              </span>
                              <span className="text-xs text-slate-500">
                                {new Date(entry.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2 ml-4">
                            <button
                              onClick={() => navigate(`/diary/${entry._id}`)}
                              className="p-2 text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                              title="View Entry"
                            >
                              <FaEye className="text-sm" />
                            </button>
                            <button
                              onClick={() => deleteDiaryEntry(entry._id)}
                              className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                              title="Delete Entry"
                            >
                              <FaTrash className="text-sm" />
                            </button>
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
                        <FaPlus className="inline mr-2" />
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

                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-purple-50/80 to-indigo-50/80 border border-purple-200/30 rounded-2xl p-4">
                    <h4 className="font-semibold text-purple-800 mb-2">Summary</h4>
                    <p className="text-slate-700 leading-relaxed text-sm">{aiInsights.summary}</p>
                  </div>

                  {aiInsights.keyConcerns.length > 0 && (
                    <div className="bg-gradient-to-r from-amber-50/80 to-yellow-50/80 border border-amber-200/30 rounded-2xl p-4">
                      <h4 className="font-semibold text-amber-800 mb-2">Areas of Focus</h4>
                      <ul className="space-y-1">
                        {aiInsights.keyConcerns.slice(0, 3).map((concern, i) => (
                          <li key={i} className="text-sm text-slate-700 flex items-center">
                            <span className="w-2 h-2 bg-amber-500 rounded-full mr-2"></span>
                            {concern}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {aiInsights.positiveChanges.length > 0 && (
                    <div className="bg-gradient-to-r from-emerald-50/80 to-green-50/80 border border-emerald-200/30 rounded-2xl p-4">
                      <h4 className="font-semibold text-emerald-800 mb-2">Positive Changes</h4>
                      <ul className="space-y-1">
                        {aiInsights.positiveChanges.slice(0, 3).map((change, i) => (
                          <li key={i} className="text-sm text-slate-700 flex items-center">
                            <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
                            {change}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </section>

              {/* Highlights */}
              {aiInsights.highlights.length > 0 && (
                <section className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-slate-200/30 p-6 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-8 h-8 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-xl flex items-center justify-center">
                      <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                    </div>
                    <h3 className="font-bold text-lg text-slate-800">Highlights</h3>
                  </div>

                  <div className="space-y-3">
                    {aiInsights.highlights.map((highlight, i) => (
                      <div key={i} className="p-4 bg-gradient-to-r from-yellow-50/50 to-orange-50/50 border border-yellow-200/30 rounded-xl">
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-xs font-medium text-yellow-700 bg-yellow-100 px-2 py-1 rounded-full">
                            {highlight.date}
                          </span>
                        </div>
                        <blockquote className="text-slate-700 italic">"{highlight.quote}"</blockquote>
                      </div>
                    ))}
                  </div>
                </section>
              )}
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
                      <h3 className="font-bold text-lg text-slate-800">Mood Distribution</h3>
                      <p className="text-xs text-slate-500">Your emotional patterns</p>
                    </div>
                  </div>
                </div>

                {moodData.length > 0 ? (
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
                    <p className="text-xs text-slate-400 mt-1">Start logging your moods to see insights</p>
                  </div>
                )}

                <button
                  onClick={() => navigate("/mood-analytics")}
                  className="w-full mt-4 px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl text-sm font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-300"
                >
                  Track New Mood
                </button>
              </section>

              {/* Recommendations */}
              <section className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-slate-200/30 p-6 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-amber-100 to-orange-100 rounded-xl flex items-center justify-center">
                      <FaLightbulb className="text-amber-600 text-lg" />
                    </div>
                    <h3 className="font-bold text-lg text-slate-800">AI Recommendations</h3>
                  </div>
                </div>

                <div className="space-y-3">
                  {recommendations.length > 0 ? (
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
                      <p className="text-xs text-slate-400 mt-1">Write more entries to get personalized tips</p>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => navigate("/recommendations")}
                  className="w-full mt-4 px-4 py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-xl text-sm font-medium hover:from-amber-700 hover:to-orange-700 transition-all duration-300"
                >
                  Get More Recommendations
                </button>
              </section>

              {/* AI Insights Recommendations */}
              {aiInsights.recommendations.length > 0 && (
                <section className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-slate-200/30 p-6 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-8 h-8 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl flex items-center justify-center">
                      <FaBrain className="text-indigo-600 text-lg" />
                    </div>
                    <h3 className="font-bold text-lg text-slate-800">AI Suggestions</h3>
                  </div>

                  <div className="space-y-3">
                    {aiInsights.recommendations.slice(0, 4).map((rec, i) => (
                      <div key={i} className="p-3 rounded-xl bg-gradient-to-r from-indigo-50/50 to-purple-50/50 border border-indigo-200/30">
                        <div className="flex items-start space-x-2">
                          <span className="text-indigo-600 font-bold text-sm">{i + 1}.</span>
                          <p className="text-slate-700 text-sm leading-relaxed flex-1">{rec}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <section className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-slate-200/30 p-6 hover:shadow-xl transition-all duration-300 mt-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-800">Quick Actions</h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
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

              <button
                onClick={() => navigate("/ai-insights")}
                className="group flex flex-col items-center p-6 rounded-2xl hover:bg-gradient-to-br hover:from-emerald-50 hover:to-green-50 transition-all duration-300 border-2 border-transparent hover:border-emerald-200/50 hover:shadow-lg"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-green-100 group-hover:from-emerald-200 group-hover:to-green-200 rounded-2xl flex items-center justify-center mb-3 transition-all duration-300 group-hover:scale-110">
                  <span className="text-2xl">🧠</span>
                </div>
                <span className="text-sm font-semibold text-slate-700 group-hover:text-emerald-700">AI Analysis</span>
                <span className="text-xs text-slate-500 mt-1">Get insights</span>
              </button>

              <button
                onClick={() => navigate("/stats")}
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

      {/* Floating elements */}
      <div className="fixed top-1/3 left-6 w-2 h-2 bg-teal-400/40 rounded-full animate-ping pointer-events-none"></div>
      <div className="fixed top-2/3 right-8 w-1.5 h-1.5 bg-cyan-400/30 rounded-full animate-pulse pointer-events-none"></div>
      <div className="fixed bottom-1/4 left-1/3 w-1 h-1 bg-blue-400/40 rounded-full animate-pulse delay-1000 pointer-events-none"></div>
    </div>
  );
};

export default UserDashboard;