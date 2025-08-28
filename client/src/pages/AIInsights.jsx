import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AppContext } from '../../context/AppContext';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell
} from 'recharts';

const AIInsights = () => {
  const { token, backendUrl } = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const [insights, setInsights] = useState(null);
  const [error, setError] = useState(null);
  const [question, setQuestion] = useState('');
  const [reply, setReply] = useState(null);
  const [isQuerying, setIsQuerying] = useState(false);

  useEffect(() => {
    let mounted = true;
    const fetchInsights = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${backendUrl}/api/insights`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!mounted) return;
        setInsights(res.data);
      } catch (err) {
        setError('Failed to load AI insights');
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchInsights();
    return () => { mounted = false; };
  }, [backendUrl, token]);

  const handleQuery = async () => {
    if (!question.trim()) return;
    
    setIsQuerying(true);
    setReply('Analyzing your journal entries...');
    
    try {
      const res = await axios.post(`${backendUrl}/api/insights/query`, { question }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setReply(res.data.reply);
    } catch (e) {
      setReply('Sorry, I couldn\'t process your question. Please try again.');
    } finally {
      setIsQuerying(false);
    }
  };

  const getMoodIcon = (mood) => {
    const moodIcons = {
      'Happy': '😊',
      'Sad': '😢',
      'Excited': '🤩',
      'Calm': '😌',
      'Stressed': '😰',
      'Neutral': '😐',
      'Angry': '😠',
      'Anxious': '😟'
    };
    return moodIcons[mood] || '😐';
  };

  const getMoodColor = (mood) => {
    const moodColors = {
      'Happy': '#F59E0B',
      'Sad': '#3B82F6',
      'Excited': '#EC4899',
      'Calm': '#10B981',
      'Stressed': '#EF4444',
      'Neutral': '#6B7280',
      'Angry': '#DC2626',
      'Anxious': '#F97316'
    };
    return moodColors[mood] || '#6B7280';
  };

  if (loading) {
    return (
      <div className="relative min-h-screen">
        {/* Background matching Home Page */}
        <div className="fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-50/80 via-blue-50/20 to-cyan-50/30"></div>
          <div className="absolute top-10 left-10 w-64 h-64 bg-gradient-to-br from-teal-400/10 to-cyan-400/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.02)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        </div>
        
        <div className="relative flex justify-center items-center py-32">
          <div className="text-center">
            <div className="inline-block p-4 bg-gradient-to-r from-teal-100/80 to-cyan-100/80 rounded-3xl mb-6">
              <svg className="animate-spin h-8 w-8 text-teal-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">Analyzing Your Journey</h3>
            <p className="text-slate-600">Our AI is processing your diary entries to generate personalized insights...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative min-h-screen">
        {/* Background matching Home Page */}
        <div className="fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-50/80 via-blue-50/20 to-cyan-50/30"></div>
          <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.02)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        </div>
        
        <div className="relative flex justify-center items-center py-32">
          <div className="text-center">
            <div className="inline-block p-4 bg-gradient-to-r from-red-100/80 to-pink-100/80 rounded-3xl mb-6">
              <svg className="h-8 w-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.664-.833-2.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">Unable to Load Insights</h3>
            <p className="text-slate-600 mb-6">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-medium rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  const moodData = insights?.moodTrends ? 
    Object.keys(insights.moodTrends).map(k => ({ 
      name: k, 
      value: insights.moodTrends[k],
      icon: getMoodIcon(k),
      fill: getMoodColor(k)
    })) : [];

  const pieData = moodData.map(item => ({
    name: item.name,
    value: item.value,
    fill: item.fill
  }));

  return (
    <div className="relative min-h-screen">
      {/* Background matching Home Page */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50/80 via-blue-50/20 to-cyan-50/30"></div>
        <div className="absolute top-10 left-10 w-64 h-64 bg-gradient-to-br from-teal-400/10 to-cyan-400/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute top-1/4 right-10 w-48 h-48 bg-gradient-to-br from-blue-400/8 to-indigo-400/8 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-56 h-56 bg-gradient-to-br from-cyan-400/10 to-teal-400/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-2000"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.02)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      </div>

      {/* Main Content */}
      <div className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12">
          {/* Header Section */}
          <div className="text-center mb-10 md:mb-12">
            <div className="inline-block p-2 bg-gradient-to-r from-teal-100/80 to-cyan-100/80 rounded-2xl mb-3">
              <svg className="w-6 h-6 md:w-7 md:h-7 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h1 className="text-2xl md:text-4xl font-bold text-slate-800 mb-3">
              AI <span className="bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">Insights</span>
            </h1>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Discover patterns in your emotional journey with AI-powered analysis of your diary entries
            </p>
            <div className="w-16 h-0.5 bg-gradient-to-r from-teal-500 to-cyan-500 mx-auto rounded-full mt-4"></div>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-8">
            {/* Summary Card */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-slate-50/40 rounded-3xl backdrop-blur-sm shadow-xl group-hover:shadow-2xl transition-all duration-300"></div>
              <div className="relative p-6 md:p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-2 bg-gradient-to-r from-blue-100/80 to-indigo-100/80 rounded-xl">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-bold text-slate-800">Journey Summary</h2>
                </div>
                <div className="prose prose-slate max-w-none">
                  <p className="text-slate-700 leading-relaxed">
                    {insights?.summary || 'No summary available. Start writing more entries to get personalized insights about your emotional journey.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Recommendations Card */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-slate-50/40 rounded-3xl backdrop-blur-sm shadow-xl group-hover:shadow-2xl transition-all duration-300"></div>
              <div className="relative p-6 md:p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-2 bg-gradient-to-r from-green-100/80 to-teal-100/80 rounded-xl">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-bold text-slate-800">AI Recommendations</h2>
                </div>
                <div className="space-y-3">
                  {(insights?.recommendations || []).length ? 
                    insights.recommendations.map((rec, i) => (
                      <div key={i} className="flex items-start space-x-3 p-3 bg-gradient-to-r from-green-50/60 to-teal-50/60 rounded-xl border border-green-200/30">
                        <div className="flex-shrink-0 w-2 h-2 bg-gradient-to-r from-green-500 to-teal-500 rounded-full mt-2"></div>
                        <p className="text-sm text-slate-700 leading-relaxed">{rec}</p>
                      </div>
                    )) : 
                    <div className="text-center py-8">
                      <div className="inline-block p-3 bg-gradient-to-r from-slate-100/80 to-gray-100/80 rounded-2xl mb-4">
                        <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                      </div>
                      <p className="text-slate-500 text-sm">Write more entries to get personalized recommendations</p>
                    </div>
                  }
                </div>
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-8">
            {/* Mood Bar Chart */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-slate-50/40 rounded-3xl backdrop-blur-sm shadow-xl group-hover:shadow-2xl transition-all duration-300"></div>
              <div className="relative p-6 md:p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-2 bg-gradient-to-r from-purple-100/80 to-pink-100/80 rounded-xl">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-bold text-slate-800">Mood Distribution</h2>
                </div>
                {moodData.length ? (
                  <div style={{ height: 280 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={moodData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <XAxis 
                          dataKey="name" 
                          tick={{ fontSize: 12, fill: '#64748b' }}
                          axisLine={{ stroke: '#e2e8f0', strokeWidth: 1 }}
                        />
                        <YAxis 
                          allowDecimals={false}
                          tick={{ fontSize: 12, fill: '#64748b' }}
                          axisLine={{ stroke: '#e2e8f0', strokeWidth: 1 }}
                        />
                        <Tooltip 
                          contentStyle={{
                            backgroundColor: 'rgba(255, 255, 255, 0.95)',
                            border: '1px solid #e2e8f0',
                            borderRadius: '12px',
                            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                          }}
                        />
                        <Bar dataKey="value" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <div className="inline-block p-3 bg-gradient-to-r from-slate-100/80 to-gray-100/80 rounded-2xl mb-4">
                      <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <p className="text-slate-500 text-sm">No mood data available yet</p>
                  </div>
                )}
              </div>
            </div>

            {/* Mood Pie Chart */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-slate-50/40 rounded-3xl backdrop-blur-sm shadow-xl group-hover:shadow-2xl transition-all duration-300"></div>
              <div className="relative p-6 md:p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-2 bg-gradient-to-r from-cyan-100/80 to-blue-100/80 rounded-xl">
                    <svg className="w-6 h-6 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-bold text-slate-800">Mood Breakdown</h2>
                </div>
                {pieData.length ? (
                  <div style={{ height: 280 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          dataKey="value"
                          label={({name, value}) => `${name}: ${value}`}
                          labelLine={false}
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <div className="inline-block p-3 bg-gradient-to-r from-slate-100/80 to-gray-100/80 rounded-2xl mb-4">
                      <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                      </svg>
                    </div>
                    <p className="text-slate-500 text-sm">No mood data available yet</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Highlights Section */}
          <div className="relative group mb-8">
            <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-slate-50/40 rounded-3xl backdrop-blur-sm shadow-xl group-hover:shadow-2xl transition-all duration-300"></div>
            <div className="relative p-6 md:p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-gradient-to-r from-yellow-100/80 to-orange-100/80 rounded-xl">
                  <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-slate-800">Journal Highlights</h2>
              </div>
              
              {(insights?.highlights || []).length ? (
                <div className="grid gap-4 md:gap-6">
                  {insights.highlights.map((highlight, i) => (
                    <div key={i} className="group/highlight">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-yellow-50/80 to-orange-50/80 rounded-2xl border border-yellow-200/30 group-hover/highlight:border-yellow-300/50 transition-all duration-200"></div>
                        <div className="relative p-4 md:p-6">
                          <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0">
                              <div className="w-3 h-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full shadow-lg"></div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-sm text-yellow-700 font-medium mb-2">
                                {new Date(highlight.date).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric'
                                })}
                              </div>
                              <blockquote className="text-slate-700 italic leading-relaxed border-l-4 border-yellow-400/30 pl-4">
                                "{highlight.quote}"
                              </blockquote>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="inline-block p-3 bg-gradient-to-r from-slate-100/80 to-gray-100/80 rounded-2xl mb-4">
                    <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  </div>
                  <p className="text-slate-500 text-sm">No highlights available yet. Keep writing to discover meaningful moments!</p>
                </div>
              )}
            </div>
          </div>

          {/* Ask AI Section */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-slate-50/40 rounded-3xl backdrop-blur-sm shadow-xl group-hover:shadow-2xl transition-all duration-300"></div>
            <div className="relative p-6 md:p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-gradient-to-r from-teal-100/80 to-cyan-100/80 rounded-xl">
                  <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-slate-800">Ask AI About Your Journey</h2>
              </div>
              
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Why have I been more stressed lately? What patterns do you see in my mood?"
                    className="flex-1 p-4 border-2 border-slate-200/60 rounded-xl bg-white/70 backdrop-blur-sm focus:border-teal-400 focus:bg-white/90 focus:outline-none focus:ring-2 focus:ring-teal-400/20 transition-all duration-300 text-slate-800 placeholder-slate-400"
                    onKeyPress={(e) => e.key === 'Enter' && !isQuerying && handleQuery()}
                  />
                  <button
                    onClick={handleQuery}
                    disabled={!question.trim() || isQuerying}
                    className="px-6 py-4 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 disabled:from-slate-400 disabled:to-slate-400 text-white font-medium rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:scale-100 disabled:cursor-not-allowed shadow-lg hover:shadow-xl disabled:shadow-md"
                  >
                    <div className="flex items-center space-x-2">
                      {isQuerying ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span>Thinking...</span>
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                          </svg>
                          <span>Ask AI</span>
                        </>
                      )}
                    </div>
                  </button>
                </div>

                {/* Sample Questions */}
                <div className="flex flex-wrap gap-2">
                  <span className="text-sm text-slate-600 font-medium">Try asking:</span>
                  {[
                    "What patterns do you see in my mood?",
                    "Why have I been stressed lately?",
                    "What makes me happiest?",
                    "How has my writing evolved?"
                  ].map((sampleQ, i) => (
                    <button
                      key={i}
                      onClick={() => setQuestion(sampleQ)}
                      className="text-xs px-3 py-1 bg-teal-100/60 hover:bg-teal-200/60 text-teal-700 rounded-full transition-all duration-200 hover:scale-105"
                    >
                      {sampleQ}
                    </button>
                  ))}
                </div>

                {/* AI Reply */}
                {reply && (
                  <div className="mt-6">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-teal-50/80 to-cyan-50/80 rounded-2xl border border-teal-200/30"></div>
                      <div className="relative p-6">
                        <div className="flex items-start space-x-4">
                          <div className="flex-shrink-0">
                            <div className="w-8 h-8 bg-gradient-to-r from-teal-600 to-cyan-600 rounded-full flex items-center justify-center">
                              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                              </svg>
                            </div>
                          </div>
                          <div className="flex-1">
                            <h4 className="text-sm font-medium text-teal-800 mb-2">AI Analysis</h4>
                            <div className="prose prose-sm prose-slate max-w-none">
                              <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">{reply}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating elements matching Home Page */}
      <div className="fixed top-1/3 left-6 w-1.5 h-1.5 bg-teal-400/60 rounded-full animate-ping pointer-events-none"></div>
      <div className="fixed top-2/3 right-8 w-1 h-1 bg-cyan-400/50 rounded-full animate-pulse pointer-events-none"></div>
      <div className="fixed bottom-1/4 right-12 w-1.5 h-1.5 bg-blue-400/40 rounded-full animate-bounce pointer-events-none"></div>
    </div>
  );
};

export default AIInsights;