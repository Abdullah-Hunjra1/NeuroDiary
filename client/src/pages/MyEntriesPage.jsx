// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";

// const MyEntriesPage = () => {
//   const [entries, setEntries] = useState([]);

//   const fetchEntries = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const backendUrl = import.meta.env.VITE_BACKEND_URL;

//       const res = await axios.get(`${backendUrl}/api/diary/my-entries`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (res.data && res.data.success && Array.isArray(res.data.entries)) {
//         setEntries(res.data.entries);
//       } else {
//         setEntries([]); // Fallback to empty array
//       }
//     } catch {
//       toast.error("Failed to load entries");
//       setEntries([]); // Prevents map() error
//     }
//   };


//   const deleteEntry = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this entry?")) return;

//     try {
//       const token = localStorage.getItem("token");
//       const backendUrl = import.meta.env.VITE_BACKEND_URL;

//       await axios.delete(`${backendUrl}/api/diary/delete/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       toast.success("Entry deleted");
//       setEntries(entries.filter((e) => e._id !== id));
//     } catch {
//       toast.error("Failed to delete entry");
//     }
//   };

//   useEffect(() => {
//     fetchEntries();
//   }, []);

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <h2 className="text-2xl font-bold mb-4">My Diary Entries</h2>
//       {entries.length === 0 ? (
//         <p className="text-gray-500">No entries yet.</p>
//       ) : (
//         <div className="space-y-4">
//           {entries.map((entry) => (
//             <div
//               key={entry._id}
//               className="border p-4 rounded-lg flex justify-between items-start"
//             >
//               <div>
//                 <h3 className="font-semibold">{entry.title}</h3>
//                 <p className="text-sm text-gray-500">{entry.mood}</p>
//                 <p className="mt-2 text-gray-700">{entry.entry}</p>
//               </div>
//               <button
//                 onClick={() => deleteEntry(entry._id)}
//                 className="text-red-600 hover:underline"
//               >
//                 Delete
//               </button>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default MyEntriesPage;









// ...............................




import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const MyEntriesPage = () => {
  const [entries, setEntries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedEntry, setExpandedEntry] = useState(null);
  const [sortBy, setSortBy] = useState('newest');
  const navigate = useNavigate();

  const fetchEntries = async () => {
    try {
      const token = localStorage.getItem("token");
      const backendUrl = import.meta.env.VITE_BACKEND_URL;

      const res = await axios.get(`${backendUrl}/api/diary/my-entries`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data && res.data.success && Array.isArray(res.data.entries)) {
        setEntries(res.data.entries);
      } else {
        setEntries([]);
      }
    } catch {
      toast.error("Failed to load entries");
      setEntries([]);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteEntry = async (id) => {
    if (!window.confirm("Are you sure you want to delete this entry?")) return;

    try {
      const token = localStorage.getItem("token");
      const backendUrl = import.meta.env.VITE_BACKEND_URL;

      await axios.delete(`${backendUrl}/api/diary/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Entry deleted successfully");
      setEntries(entries.filter((e) => e._id !== id));
    } catch {
      toast.error("Failed to delete entry");
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
      'Happy': 'from-yellow-400 to-orange-400',
      'Sad': 'from-blue-400 to-indigo-400',
      'Excited': 'from-pink-400 to-purple-400',
      'Calm': 'from-green-400 to-teal-400',
      'Stressed': 'from-red-400 to-pink-400',
      'Neutral': 'from-slate-400 to-gray-400',
      'Angry': 'from-red-500 to-red-600',
      'Anxious': 'from-orange-400 to-red-400'
    };
    return moodColors[mood] || 'from-slate-400 to-gray-400';
  };

  const getSentimentColor = (score) => {
    if (score >= 4) return 'text-green-600 bg-green-50';
    if (score >= 3) return 'text-lime-600 bg-lime-50';
    if (score >= 2) return 'text-yellow-600 bg-yellow-50';
    if (score >= 1) return 'text-orange-600 bg-orange-50';
    return 'text-red-600 bg-red-50';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const sortedEntries = [...entries].sort((a, b) => {
    if (sortBy === 'newest') return new Date(b.createdAt) - new Date(a.createdAt);
    if (sortBy === 'oldest') return new Date(a.createdAt) - new Date(b.createdAt);
    if (sortBy === 'mood') return a.mood.localeCompare(b.mood);
    return 0;
  });

  useEffect(() => {
    fetchEntries();
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* Background matching Home Page */}
      <div className="fixed inset-0 -z-10">
        {/* Main gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50/80 via-blue-50/20 to-cyan-50/30"></div>
        
        {/* Background orbs */}
        <div className="absolute top-10 left-10 w-64 h-64 bg-gradient-to-br from-teal-400/10 to-cyan-400/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute top-1/4 right-10 w-48 h-48 bg-gradient-to-br from-blue-400/8 to-indigo-400/8 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-56 h-56 bg-gradient-to-br from-cyan-400/10 to-teal-400/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-2000"></div>
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.02)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      </div>

      {/* Main Content */}
      <div className="relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 md:py-12">
          {/* Header Section */}
          <div className="text-center mb-10 md:mb-12">
            <div className="inline-block p-2 bg-gradient-to-r from-teal-100/80 to-cyan-100/80 rounded-2xl mb-3">
              <svg className="w-6 h-6 md:w-7 md:h-7 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h1 className="text-2xl md:text-4xl font-bold text-slate-800 mb-3">
              My <span className="bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">Diary Entries</span>
            </h1>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Your personal collection of thoughts, feelings, and AI-powered insights
            </p>
            <div className="w-16 h-0.5 bg-gradient-to-r from-teal-500 to-cyan-500 mx-auto rounded-full mt-4"></div>
          </div>

          {/* Controls Section */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
                </svg>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 bg-white/70 border border-slate-200/60 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-400/20 focus:border-teal-400 backdrop-blur-sm"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="mood">Sort by Mood</option>
                </select>
              </div>
              
              <div className="text-sm text-slate-600 bg-white/50 px-3 py-2 rounded-lg backdrop-blur-sm">
                {entries.length} {entries.length === 1 ? 'entry' : 'entries'}
              </div>
            </div>

            <button
              onClick={() => navigate('/create-entry')}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-medium rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span>New Entry</span>
            </button>
          </div>

          {/* Loading State */}
          {isLoading ? (
            <div className="flex justify-center items-center py-16">
              <div className="text-center">
                <svg className="animate-spin h-8 w-8 text-teal-600 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p className="text-slate-600">Loading your entries...</p>
              </div>
            </div>
          ) : entries.length === 0 ? (
            /* Empty State */
            <div className="text-center py-16">
              <div className="inline-block p-4 bg-gradient-to-r from-slate-100/80 to-blue-100/80 rounded-3xl mb-6">
                <svg className="w-16 h-16 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">No entries yet</h3>
              <p className="text-slate-600 mb-6 max-w-md mx-auto">
                Start your journaling journey! Create your first diary entry and let our AI provide personalized insights.
              </p>
              <button
                onClick={() => navigate('/create-entry')}
                className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-medium rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span>Create First Entry</span>
              </button>
            </div>
          ) : (
            /* Entries Grid */
            <div className="grid gap-6 md:gap-8">
              {sortedEntries.map((entry) => (
                <div key={entry._id} className="group">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-slate-50/40 rounded-3xl backdrop-blur-sm shadow-xl group-hover:shadow-2xl transition-all duration-300"></div>
                    <div className="relative p-6 md:p-8">
                      {/* Entry Header */}
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
                        <div className="flex-1">
                          <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-2 group-hover:text-teal-700 transition-colors duration-300">
                            {entry.title}
                          </h3>
                          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
                            <span className="flex items-center space-x-1">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <span>{formatDate(entry.createdAt)}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                              </svg>
                              <span>{entry.entry.split(' ').length} words</span>
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => setExpandedEntry(expandedEntry === entry._id ? null : entry._id)}
                            className="px-3 py-2 text-sm bg-teal-100/60 hover:bg-teal-200/60 text-teal-700 rounded-lg transition-all duration-200"
                          >
                            {expandedEntry === entry._id ? 'Show Less' : 'Show More'}
                          </button>
                          <button
                            onClick={() => deleteEntry(entry._id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                            title="Delete entry"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>

                      {/* AI Analysis Section */}
                      <div className="flex flex-wrap gap-3 mb-6">
                        {/* Mood Badge */}
                        <div className={`inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r ${getMoodColor(entry.mood)} text-white rounded-full shadow-md`}>
                          <span className="text-lg">{getMoodIcon(entry.mood)}</span>
                          <span className="font-medium text-sm">{entry.mood}</span>
                        </div>
                        
                        {/* Sentiment Score */}
                        {entry.sentimentScore !== undefined && (
                          <div className={`inline-flex items-center space-x-2 px-3 py-2 rounded-full text-sm font-medium ${getSentimentColor(entry.sentimentScore)}`}>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                            <span>Sentiment: {entry.sentimentScore}/10</span>
                          </div>
                        )}
                      </div>

                      {/* Entry Content */}
                      <div className="prose prose-slate max-w-none mb-6">
                        <p className={`text-slate-700 leading-relaxed ${expandedEntry === entry._id ? '' : 'line-clamp-3'}`}>
                          {entry.entry}
                        </p>
                      </div>

                      {/* AI Recommendations (Expanded View) */}
                      {expandedEntry === entry._id && entry.recommendations && (
                        <div className="border-t border-slate-200/60 pt-6 space-y-4">
                          <h4 className="flex items-center space-x-2 text-lg font-semibold text-slate-800">
                            <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                            <span>AI Recommendations</span>
                          </h4>
                          
                          <div className="grid md:grid-cols-3 gap-4">
                            {entry.recommendations.writingPrompt && (
                              <div className="p-4 bg-gradient-to-br from-blue-50/80 to-indigo-50/80 rounded-xl border border-blue-200/30">
                                <h5 className="font-medium text-blue-800 mb-2 flex items-center space-x-2">
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                  </svg>
                                  <span>Writing Prompt</span>
                                </h5>
                                <p className="text-sm text-blue-700">{entry.recommendations.writingPrompt}</p>
                              </div>
                            )}
                            
                            {entry.recommendations.activity && (
                              <div className="p-4 bg-gradient-to-br from-green-50/80 to-teal-50/80 rounded-xl border border-green-200/30">
                                <h5 className="font-medium text-green-800 mb-2 flex items-center space-x-2">
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                  </svg>
                                  <span>Suggested Activity</span>
                                </h5>
                                <p className="text-sm text-green-700">{entry.recommendations.activity}</p>
                              </div>
                            )}
                            
                            {entry.recommendations.message && (
                              <div className="p-4 bg-gradient-to-br from-purple-50/80 to-pink-50/80 rounded-xl border border-purple-200/30">
                                <h5 className="font-medium text-purple-800 mb-2 flex items-center space-x-2">
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                  </svg>
                                  <span>Personal Message</span>
                                </h5>
                                <p className="text-sm text-purple-700">{entry.recommendations.message}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Floating elements matching Home Page */}
      <div className="fixed top-1/3 left-6 w-1.5 h-1.5 bg-teal-400/60 rounded-full animate-ping pointer-events-none"></div>
      <div className="fixed top-2/3 right-8 w-1 h-1 bg-cyan-400/50 rounded-full animate-pulse pointer-events-none"></div>
      <div className="fixed bottom-1/4 right-12 w-1.5 h-1.5 bg-blue-400/40 rounded-full animate-bounce pointer-events-none"></div>
    </div>
  );
};

export default MyEntriesPage;