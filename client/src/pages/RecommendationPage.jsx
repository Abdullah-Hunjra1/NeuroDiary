// import React, { useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";

// const RecommendationPage = () => {
//   const backendUrl = import.meta.env.VITE_BACKEND_URL;
//   const token = localStorage.getItem("token");

//   const [mode, setMode] = useState("mood"); // "mood" or "text"
//   const [mood, setMood] = useState("");
//   const [entry, setEntry] = useState("");
//   const [recommendations, setRecommendations] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleGetRecommendations = async () => {
//     setLoading(true);
//     try {
//       let res;
//       if (mode === "mood") {
//         if (!mood) {
//           toast.error("Please select a mood");
//           setLoading(false);
//           return;
//         }
//         res = await axios.get(`${backendUrl}/api/recommendations`, {
//           headers: { Authorization: `Bearer ${token}` },
//           params: { mood },
//         });
//       } else {
//         if (!entry.trim()) {
//           toast.error("Please enter a diary entry");
//           setLoading(false);
//           return;
//         }
//         res = await axios.post(
//           `${backendUrl}/api/recommendations`,
//           { entry },
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//       }

//       if (res.data.success) {
//         setRecommendations(res.data.recommendations);
//       } else {
//         toast.error(res.data.message || "Something went wrong");
//       }
//     } catch (err) {
//       toast.error("Failed to fetch recommendations");
//       console.error(err);
//     }
//     setLoading(false);
//   };

//   return (
//     <div className="p-6 max-w-2xl mx-auto">
//       <h1 className="text-2xl font-bold mb-4">AI Recommendations</h1>

//       {/* Mode Switch */}
//       <div className="mb-4">
//         <button
//           onClick={() => setMode("mood")}
//           className={`px-4 py-2 mr-2 rounded ${
//             mode === "mood" ? "bg-blue-500 text-white" : "bg-gray-200"
//           }`}
//         >
//           By Mood
//         </button>
//         <button
//           onClick={() => setMode("text")}
//           className={`px-4 py-2 rounded ${
//             mode === "text" ? "bg-blue-500 text-white" : "bg-gray-200"
//           }`}
//         >
//           By Text
//         </button>
//       </div>

//       {/* Mood Mode */}
//       {mode === "mood" && (
//         <div className="mb-4">
//           <label className="block mb-2 font-semibold">Select Mood:</label>
//           <select
//             value={mood}
//             onChange={(e) => setMood(e.target.value)}
//             className="border p-2 rounded w-full"
//           >
//             <option value="">-- Choose Mood --</option>
//             <option value="happy">Happy</option>
//             <option value="sad">Sad</option>
//             <option value="anxious">Anxious</option>
//             <option value="calm">Calm</option>
//             <option value="excited">Excited</option>
//             <option value="neutral">Neutral</option>
//             <option value="stressed">Stressed</option>
//           </select>
//         </div>
//       )}

//       {/* Text Mode */}
//       {mode === "text" && (
//         <div className="mb-4">
//           <label className="block mb-2 font-semibold">Diary Entry:</label>
//           <textarea
//             value={entry}
//             onChange={(e) => setEntry(e.target.value)}
//             rows="5"
//             className="border p-2 rounded w-full"
//             placeholder="Paste or write your diary entry here..."
//           ></textarea>
//         </div>
//       )}

//       {/* Fetch Button */}
//       <button
//         onClick={handleGetRecommendations}
//         disabled={loading}
//         className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
//       >
//         {loading ? "Fetching..." : "Get Recommendations"}
//       </button>

//       {/* Display Recommendations */}
//       {recommendations && (
//         <div className="mt-6 p-4 border rounded bg-gray-50">
//           <h2 className="text-xl font-bold mb-2">Your Recommendations</h2>
//           <p>
//             <strong>Writing Prompt:</strong> {recommendations.writingPrompt}
//           </p>
//           <p>
//             <strong>Activity:</strong> {recommendations.activity}
//           </p>
//           <p>
//             <strong>Message:</strong> {recommendations.message}
//           </p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default RecommendationPage;








import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const RecommendationPage = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const token = localStorage.getItem("token");

  const [mode, setMode] = useState("mood"); // "mood" or "text"
  const [mood, setMood] = useState("");
  const [entry, setEntry] = useState("");
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGetRecommendations = async () => {
    setLoading(true);
    try {
      let res;
      if (mode === "mood") {
        if (!mood) {
          toast.error("Please select a mood");
          setLoading(false);
          return;
        }
        res = await axios.get(`${backendUrl}/api/recommendations`, {
          headers: { Authorization: `Bearer ${token}` },
          params: { mood },
        });
      } else {
        if (!entry.trim()) {
          toast.error("Please enter a diary entry");
          setLoading(false);
          return;
        }
        res = await axios.post(
          `${backendUrl}/api/recommendations`,
          { entry },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      if (res.data.success) {
        setRecommendations(res.data.recommendations);
        toast.success("Recommendations generated successfully!");
      } else {
        toast.error(res.data.message || "Something went wrong");
      }
    } catch (err) {
      toast.error("Failed to fetch recommendations");
      console.error(err);
    }
    setLoading(false);
  };

  const getMoodIcon = (moodName) => {
    const moodIcons = {
      'happy': '😊',
      'sad': '😢',
      'anxious': '😟',
      'calm': '😌',
      'excited': '🤩',
      'neutral': '😐',
      'stressed': '😰'
    };
    return moodIcons[moodName] || '😐';
  };

  const getMoodColor = (moodName) => {
    const moodColors = {
      'happy': 'from-yellow-400 to-orange-400',
      'sad': 'from-blue-400 to-indigo-400',
      'anxious': 'from-orange-400 to-red-400',
      'calm': 'from-green-400 to-teal-400',
      'excited': 'from-pink-400 to-purple-400',
      'neutral': 'from-slate-400 to-gray-400',
      'stressed': 'from-red-400 to-pink-400'
    };
    return moodColors[moodName] || 'from-slate-400 to-gray-400';
  };

  const clearForm = () => {
    setMood("");
    setEntry("");
    setRecommendations(null);
  };

  const wordCount = entry.split(' ').filter(word => word.length > 0).length;
  const charCount = entry.length;

  const moods = [
    { value: 'happy', label: 'Happy' },
    { value: 'sad', label: 'Sad' },
    { value: 'anxious', label: 'Anxious' },
    { value: 'calm', label: 'Calm' },
    { value: 'excited', label: 'Excited' },
    { value: 'neutral', label: 'Neutral' },
    { value: 'stressed', label: 'Stressed' }
  ];

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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 md:py-12">
          {/* Header Section */}
          <div className="text-center mb-10 md:mb-12">
            <div className="inline-block p-2 bg-gradient-to-r from-teal-100/80 to-cyan-100/80 rounded-2xl mb-3">
              <svg className="w-6 h-6 md:w-7 md:h-7 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h1 className="text-2xl md:text-4xl font-bold text-slate-800 mb-3">
              AI <span className="bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">Recommendations</span>
            </h1>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Get personalized recommendations based on your mood or diary entry. Our AI will provide writing prompts, activities, and motivational messages.
            </p>
            <div className="w-16 h-0.5 bg-gradient-to-r from-teal-500 to-cyan-500 mx-auto rounded-full mt-4"></div>
          </div>

          {/* Mode Selection */}
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-slate-50/40 rounded-3xl backdrop-blur-sm shadow-lg"></div>
            <div className="relative p-6 md:p-8">
              <h2 className="text-lg font-semibold text-slate-800 mb-6 flex items-center space-x-2">
                <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>Choose Your Approach</span>
              </h2>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => {
                    setMode("mood");
                    clearForm();
                  }}
                  className={`flex-1 p-4 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 ${
                    mode === "mood" 
                      ? "border-teal-400 bg-gradient-to-r from-teal-50/80 to-cyan-50/80 shadow-lg" 
                      : "border-slate-200/60 bg-white/50 hover:border-teal-300"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${mode === "mood" ? "bg-teal-100" : "bg-slate-100"}`}>
                      <svg className={`w-5 h-5 ${mode === "mood" ? "text-teal-600" : "text-slate-500"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="text-left">
                      <h3 className="font-medium text-slate-800">By Mood</h3>
                      <p className="text-sm text-slate-600">Select your current mood</p>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => {
                    setMode("text");
                    clearForm();
                  }}
                  className={`flex-1 p-4 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 ${
                    mode === "text" 
                      ? "border-teal-400 bg-gradient-to-r from-teal-50/80 to-cyan-50/80 shadow-lg" 
                      : "border-slate-200/60 bg-white/50 hover:border-teal-300"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${mode === "text" ? "bg-teal-100" : "bg-slate-100"}`}>
                      <svg className={`w-5 h-5 ${mode === "text" ? "text-teal-600" : "text-slate-500"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </div>
                    <div className="text-left">
                      <h3 className="font-medium text-slate-800">By Text</h3>
                      <p className="text-sm text-slate-600">Analyze your diary entry</p>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Input Section */}
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-slate-50/40 rounded-3xl backdrop-blur-sm shadow-lg"></div>
            <div className="relative p-6 md:p-8">
              {/* Mood Mode */}
              {mode === "mood" && (
                <div className="space-y-4">
                  <label className="block text-sm font-medium text-slate-700 mb-4">
                    <div className="flex items-center space-x-2">
                      <svg className="w-4 h-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Select Your Current Mood</span>
                    </div>
                  </label>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {moods.map((moodOption) => (
                      <button
                        key={moodOption.value}
                        onClick={() => setMood(moodOption.value)}
                        className={`p-4 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 ${
                          mood === moodOption.value
                            ? `border-transparent bg-gradient-to-r ${getMoodColor(moodOption.value)} text-white shadow-lg`
                            : "border-slate-200/60 bg-white/70 hover:border-teal-300 text-slate-700"
                        }`}
                      >
                        <div className="text-center">
                          <div className="text-2xl mb-2">{getMoodIcon(moodOption.value)}</div>
                          <div className="text-sm font-medium">{moodOption.label}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Text Mode */}
              {mode === "text" && (
                <div className="space-y-4">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <svg className="w-4 h-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        <span>Your Diary Entry</span>
                      </div>
                      <div className="text-xs text-slate-500">
                        {wordCount} words • {charCount} characters
                      </div>
                    </div>
                  </label>
                  <textarea
                    value={entry}
                    onChange={(e) => setEntry(e.target.value)}
                    rows={6}
                    className="w-full p-4 border-2 border-slate-200/60 rounded-xl bg-white/70 backdrop-blur-sm focus:border-teal-400 focus:bg-white/90 focus:outline-none focus:ring-2 focus:ring-teal-400/20 transition-all duration-300 text-slate-800 placeholder-slate-400 resize-none"
                    placeholder="Paste or write your diary entry here... Our AI will analyze your text and provide personalized recommendations based on the emotions and themes it detects."
                  />
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <button
                  onClick={handleGetRecommendations}
                  disabled={loading || (mode === "mood" && !mood) || (mode === "text" && !entry.trim())}
                  className="flex-1 sm:flex-none sm:px-8 py-4 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 disabled:from-slate-400 disabled:to-slate-400 text-white font-medium rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:scale-100 disabled:cursor-not-allowed shadow-lg hover:shadow-xl disabled:shadow-md"
                >
                  <div className="flex items-center justify-center space-x-2">
                    {loading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Generating...</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        <span>Get Recommendations</span>
                      </>
                    )}
                  </div>
                </button>

                {(mood || entry) && (
                  <button
                    onClick={clearForm}
                    className="flex-1 sm:flex-none sm:px-8 py-4 bg-white/70 hover:bg-white/90 text-slate-700 font-medium rounded-xl border-2 border-slate-200/60 hover:border-slate-300/60 transition-all duration-300 backdrop-blur-sm"
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      <span>Clear</span>
                    </div>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Recommendations Display */}
          {recommendations && (
            <div className="relative group animate-fadeIn">
              <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-slate-50/40 rounded-3xl backdrop-blur-sm shadow-xl group-hover:shadow-2xl transition-all duration-300"></div>
              <div className="relative p-6 md:p-8">
                <div className="flex items-center space-x-3 mb-8">
                  <div className="p-2 bg-gradient-to-r from-green-100/80 to-teal-100/80 rounded-xl">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold text-slate-800">Your Personalized Recommendations</h2>
                </div>

                <div className="grid gap-6 md:gap-8">
                  {/* Writing Prompt */}
                  {recommendations.writingPrompt && (
                    <div className="group/card">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/80 to-indigo-50/80 rounded-2xl border border-blue-200/30 group-hover/card:border-blue-300/50 transition-all duration-200"></div>
                        <div className="relative p-6">
                          <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0">
                              <div className="p-2 bg-gradient-to-r from-blue-100/80 to-indigo-100/80 rounded-xl">
                                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                              </div>
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-blue-800 mb-2">Writing Prompt</h3>
                              <p className="text-slate-700 leading-relaxed">{recommendations.writingPrompt}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Activity */}
                  {recommendations.activity && (
                    <div className="group/card">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-green-50/80 to-teal-50/80 rounded-2xl border border-green-200/30 group-hover/card:border-green-300/50 transition-all duration-200"></div>
                        <div className="relative p-6">
                          <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0">
                              <div className="p-2 bg-gradient-to-r from-green-100/80 to-teal-100/80 rounded-xl">
                                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                              </div>
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-green-800 mb-2">Suggested Activity</h3>
                              <p className="text-slate-700 leading-relaxed">{recommendations.activity}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Message */}
                  {recommendations.message && (
                    <div className="group/card">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-50/80 to-pink-50/80 rounded-2xl border border-purple-200/30 group-hover/card:border-purple-300/50 transition-all duration-200"></div>
                        <div className="relative p-6">
                          <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0">
                              <div className="p-2 bg-gradient-to-r from-purple-100/80 to-pink-100/80 rounded-xl">
                                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                              </div>
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-purple-800 mb-2">Personal Message</h3>
                              <p className="text-slate-700 leading-relaxed">{recommendations.message}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
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

export default RecommendationPage;