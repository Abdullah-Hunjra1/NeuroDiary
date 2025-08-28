import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
 
const UserProfile = () => {
  const { userData, setUserData, token, loadUserProfileData } = useContext(AppContext);

  
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalEntries: 0,
    activeDays: 0,
    avgMood: "Good",
    totalInsights: 0,
    moodScore: 0,
    streakDays: 0
  });

  // Get backend URL
  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  // API call helper
  const apiCall = async (endpoint, options = {}) => {
    if (!token) return null;

    try {
      const response = await fetch(`${backendUrl}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          ...options.headers
        },
        ...options
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error(`API Error (${endpoint}):`, error);
      return null;
    }
  };

  // Fetch user statistics
  const fetchUserStats = async () => {
    try {
      // Fetch diary entries
      const entriesData = await apiCall('/api/diary/my-entries');
      
      // Fetch mood stats
      const moodData = await apiCall('/api/stats/mood');
      
      // Fetch AI insights
      const insightsData = await apiCall('/api/insights/');

      let totalEntries = 0;
      let avgMood = "Good";
      let moodScore = 8.2;
      let activeDays = 0;
      let totalInsights = 0;

      // Process entries data
      if (entriesData?.success && entriesData.entries) {
        totalEntries = entriesData.entries.length;
        
        // Calculate active days (unique dates)
        const uniqueDates = new Set(
          entriesData.entries.map(entry => 
            new Date(entry.createdAt).toDateString()
          )
        );
        activeDays = uniqueDates.size;
      }

      // Process mood data
      if (moodData?.success && moodData.moodStats) {
        const moodArray = Object.entries(moodData.moodStats);
        if (moodArray.length > 0) {
          const topMood = moodArray.reduce((a, b) => a[1] > b[1] ? a : b);
          avgMood = topMood[0];
          
          // Calculate mood score (scale of 1-10)
          const moodScores = {
            'Happy': 9, 'Excited': 8.5, 'Grateful': 8.8, 'Calm': 7.5,
            'Neutral': 6, 'Stressed': 4, 'Sad': 3, 'Anxious': 3.5, 'Angry': 2.5
          };
          
          const totalMoodScore = moodArray.reduce((sum, [mood, count]) => {
            return sum + (moodScores[mood] || 6) * count;
          }, 0);
          const totalMoodCount = moodArray.reduce((sum, [_, count]) => sum + count, 0);
          moodScore = totalMoodCount > 0 ? (totalMoodScore / totalMoodCount) : 6;
        }
      }

      // Process insights data
      if (insightsData) {
        totalInsights = [
          ...(insightsData.keyConcerns || []),
          ...(insightsData.positiveChanges || []),
          ...(insightsData.recommendations || []),
          ...(insightsData.highlights || [])
        ].length;
      }

      setStats({
        totalEntries,
        activeDays,
        avgMood,
        totalInsights,
        moodScore: moodScore.toFixed(1),
        streakDays: activeDays 
      });

    } catch (error) {
      console.error('Error fetching user stats:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token && userData) {
      fetchUserStats();
    } else {
      setLoading(false);
    }
  }, [token, userData]);

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("phone", userData.phone || "");
      formData.append("address", JSON.stringify(userData.address || {}));
      formData.append("gender", userData.gender || "");
      formData.append("dob", userData.dob || "");
      if (image) formData.append("image", image);

      const { data } = await axios.post(
        `${backendUrl}/api/user/update-profile`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData();
        setIsEdit(false);
        setImage(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Failed to update profile");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center mx-auto mb-3 animate-pulse">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <p className="text-slate-600 text-sm">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    userData && (
      <div className="min-h-screen relative">
        {/* Background matching Home page */}
        <div className="fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-50/80 via-blue-50/20 to-cyan-50/30"></div>
          
          {/* Background orbs */}
          <div className="absolute top-10 left-10 w-64 h-64 bg-gradient-to-br from-teal-400/10 to-cyan-400/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          <div className="absolute top-1/4 right-10 w-48 h-48 bg-gradient-to-br from-blue-400/8 to-indigo-400/8 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/4 w-56 h-56 bg-gradient-to-br from-cyan-400/10 to-teal-400/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-2000"></div>
          
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.02)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        </div>

        <div className="relative py-6 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Header Section - Compact */}
            <div className="text-center mb-6">
              <div className="inline-block p-2 bg-gradient-to-r from-teal-100/80 to-cyan-100/80 rounded-xl mb-2">
                <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-teal-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-1">
                Profile Settings
              </h1>
              <p className="text-slate-600 text-sm">Manage your personal information and preferences</p>
            </div>

            {/* Main Profile Card - More Compact */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 overflow-hidden mb-6">
              {/* Profile Header - Reduced Height */}
              <div className="relative bg-gradient-to-r from-teal-500 via-blue-500 to-indigo-600 px-6 py-4">
                <div className="flex flex-col md:flex-row items-center gap-4">
                  {/* Profile Picture - Smaller */}
                  <div className="relative group">
                    <label htmlFor="image" className="cursor-pointer">
                      <div className="relative">
                        <img
                          src={image ? URL.createObjectURL(image) : userData.image}
                          alt="Profile"
                          className="w-14 h-14 object-cover rounded-xl border-3 border-white/30 shadow-lg group-hover:scale-105 transition-transform duration-300"
                        />
                        {isEdit && (
                          <div className="absolute inset-0 bg-black/40 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                          </div>
                        )}
                      </div>
                      {isEdit && (
                        <input
                          type="file"
                          id="image"
                          hidden
                          onChange={(e) => setImage(e.target.files[0])}
                          accept="image/*"
                        />
                      )}
                    </label>
                  </div>

                  {/* Profile Info - Smaller Text */}
                  <div className="text-center md:text-left">
                    <h2 className="text-lg font-bold text-white">
                      {userData.name}
                    </h2>
                    <p className="text-blue-100 text-sm">{userData.email}</p>
                  </div>

                  {/* Edit Button - Smaller */}
                  <div className="md:ml-auto">
                    <button
                      className={`px-4 py-2 rounded-xl font-medium text-sm transition-all duration-300 ${
                        isEdit
                          ? "bg-green-500 hover:bg-green-600 text-white shadow-md"
                          : "bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border border-white/30"
                      }`}
                      onClick={() => (isEdit ? updateUserProfileData() : setIsEdit(true))}
                    >
                      {isEdit ? (
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Save Changes
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                          Edit Profile
                        </div>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Profile Form - More Compact */}
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Personal Information Section */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-6 h-6 bg-gradient-to-r from-teal-500 to-blue-500 rounded-lg flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold text-slate-800">Personal Information</h3>
                    </div>

                    {/* Full Name */}
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                        Full Name
                      </label>
                      {isEdit ? (
                        <input
                          type="text"
                          className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:border-teal-500 focus:outline-none focus:bg-white transition-all duration-200 text-slate-800 text-sm"
                          value={userData.name}
                          onChange={(e) =>
                            setUserData((prev) => ({ ...prev, name: e.target.value }))
                          }
                        />
                      ) : (
                        <div className="p-3 bg-slate-50 rounded-lg">
                          <p className="text-slate-800 font-medium text-sm">{userData.name}</p>
                        </div>
                      )}
                    </div>

                    {/* Email */}
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                        Email Address
                      </label>
                      <div className="p-3 bg-slate-50 rounded-lg">
                        <p className="text-teal-600 font-medium text-sm">{userData.email}</p>
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                        Phone Number
                      </label>
                      {isEdit ? (
                        <input
                          type="tel"
                          className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:border-teal-500 focus:outline-none focus:bg-white transition-all duration-200 text-slate-800 text-sm"
                          value={userData.phone || ""}
                          onChange={(e) =>
                            setUserData((prev) => ({ ...prev, phone: e.target.value }))
                          }
                          placeholder="Enter phone number"
                        />
                      ) : (
                        <div className="p-3 bg-slate-50 rounded-lg">
                          <p className="text-slate-800 font-medium text-sm">{userData.phone || "Not provided"}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Additional Information Section */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold text-slate-800">Additional Details</h3>
                    </div>

                    {/* Gender */}
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                        Gender
                      </label>
                      {isEdit ? (
                        <select
                          className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:border-teal-500 focus:outline-none focus:bg-white transition-all duration-200 text-slate-800 text-sm"
                          value={userData.gender || ""}
                          onChange={(e) =>
                            setUserData((prev) => ({ ...prev, gender: e.target.value }))
                          }
                        >
                          <option value="">Select Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                          <option value="Prefer not to say">Prefer not to say</option>
                        </select>
                      ) : (
                        <div className="p-3 bg-slate-50 rounded-lg">
                          <p className="text-slate-800 font-medium text-sm">{userData.gender || "Not specified"}</p>
                        </div>
                      )}
                    </div>

                    {/* Date of Birth */}
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                        Date of Birth
                      </label>
                      {isEdit ? (
                        <input
                          type="date"
                          className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:border-teal-500 focus:outline-none focus:bg-white transition-all duration-200 text-slate-800 text-sm"
                          value={userData.dob || ""}
                          onChange={(e) =>
                            setUserData((prev) => ({ ...prev, dob: e.target.value }))
                          }
                        />
                      ) : (
                        <div className="p-3 bg-slate-50 rounded-lg">
                          <p className="text-slate-800 font-medium text-sm">
                            {userData.dob ? new Date(userData.dob).toLocaleDateString() : "Not provided"}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Address */}
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                        Address
                      </label>
                      {isEdit ? (
                        <div className="space-y-2">
                          <input
                            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:border-teal-500 focus:outline-none focus:bg-white transition-all duration-200 text-slate-800 text-sm"
                            type="text"
                            placeholder="Address Line 1"
                            value={userData.address?.line1 || ""}
                            onChange={(e) =>
                              setUserData((prev) => ({
                                ...prev,
                                address: { ...prev.address, line1: e.target.value },
                              }))
                            }
                          />
                          <input
                            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:border-teal-500 focus:outline-none focus:bg-white transition-all duration-200 text-slate-800 text-sm"
                            type="text"
                            placeholder="Address Line 2"
                            value={userData.address?.line2 || ""}
                            onChange={(e) =>
                              setUserData((prev) => ({
                                ...prev,
                                address: { ...prev.address, line2: e.target.value },
                              }))
                            }
                          />
                        </div>
                      ) : (
                        <div className="p-3 bg-slate-50 rounded-lg">
                          <p className="text-slate-800 font-medium text-sm">
                            {userData.address?.line1 || "Not provided"}
                            {userData.address?.line2 && (
                              <>
                                <br />
                                {userData.address.line2}
                              </>
                            )}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                {isEdit && (
                  <div className="mt-6 pt-4 border-t border-slate-200">
                    <div className="flex flex-col sm:flex-row gap-3 justify-center sm:justify-end">
                      <button
                        onClick={() => {
                          setIsEdit(false);
                          setImage(false);
                          loadUserProfileData(); // Reset to original data
                        }}
                        className="px-6 py-2 bg-slate-200 text-slate-700 rounded-xl font-medium text-sm hover:bg-slate-300 transition-colors duration-200"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={updateUserProfileData}
                        className="px-6 py-2 bg-gradient-to-r from-teal-500 to-blue-600 text-white rounded-xl font-medium text-sm hover:from-teal-600 hover:to-blue-700 shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105"
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Stats Section - Connected to Real Data */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-slate-800">Your Statistics</h3>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center bg-gradient-to-br from-teal-50 to-cyan-50 p-4 rounded-xl border border-teal-100">
                  <div className="w-10 h-10 bg-gradient-to-r from-teal-400 to-blue-500 rounded-xl flex items-center justify-center mx-auto mb-2">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <p className="text-xl font-bold text-slate-800">{stats.totalEntries}</p>
                  <p className="text-xs text-slate-600">Journal Entries</p>
                </div>
                
                <div className="text-center bg-gradient-to-br from-green-50 to-teal-50 p-4 rounded-xl border border-green-100">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-teal-500 rounded-xl flex items-center justify-center mx-auto mb-2">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <p className="text-xl font-bold text-slate-800">{stats.activeDays}</p>
                  <p className="text-xs text-slate-600">Days Active</p>
                </div>
                
                <div className="text-center bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-100">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-2">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <p className="text-xl font-bold text-slate-800">{stats.moodScore}</p>
                  <p className="text-xs text-slate-600">Avg. Mood</p>
                </div>
                
                <div className="text-center bg-gradient-to-br from-orange-50 to-red-50 p-4 rounded-xl border border-orange-100">
                  <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-red-500 rounded-xl flex items-center justify-center mx-auto mb-2">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <p className="text-xl font-bold text-slate-800">{stats.totalInsights}</p>
                  <p className="text-xs text-slate-600">AI Insights</p>
                </div>
              </div>
            </div>

            {/* Additional Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {/* Current Mood Trend */}
              <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/50 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-5 h-5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.01M15 10h1.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h4 className="text-sm font-semibold text-slate-800">Current Mood Trend</h4>
                </div>
                <p className="text-lg font-bold text-blue-600 mb-1">{stats.avgMood}</p>
                <p className="text-xs text-slate-600">Most frequent mood this week</p>
                <div className="mt-2 bg-gradient-to-r from-blue-50 to-indigo-50 p-2 rounded-lg">
                  <p className="text-xs text-slate-700">
                    Keep tracking your moods to get better insights!
                  </p>
                </div>
              </div>

              {/* Streak Information */}
              <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/50 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-5 h-5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
                    </svg>
                  </div>
                  <h4 className="text-sm font-semibold text-slate-800">Activity Streak</h4>
                </div>
                <p className="text-lg font-bold text-emerald-600 mb-1">{stats.streakDays} days</p>
                <p className="text-xs text-slate-600">Days with journal entries</p>
                <div className="mt-2 bg-gradient-to-r from-emerald-50 to-teal-50 p-2 rounded-lg">
                  <p className="text-xs text-slate-700">
                    {stats.streakDays > 7 ? "Amazing consistency! 🔥" : "Keep up the great work! 💪"}
                  </p>
                </div>
              </div>
            </div>

            {/* Account Actions */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/50 p-4 mt-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-5 h-5 bg-gradient-to-r from-slate-500 to-gray-600 rounded-lg flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h4 className="text-sm font-semibold text-slate-800">Account Settings</h4>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <button className="p-3 bg-gradient-to-br from-teal-50 to-cyan-50 hover:from-teal-100 hover:to-cyan-100 rounded-lg border border-teal-100 transition-all duration-200 group">
                  <div className="flex flex-col items-center gap-1">
                    <svg className="w-4 h-4 text-teal-600 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <span className="text-xs font-medium text-slate-700">Privacy</span>
                  </div>
                </button>

                <button className="p-3 bg-gradient-to-br from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 rounded-lg border border-blue-100 transition-all duration-200 group">
                  <div className="flex flex-col items-center gap-1">
                    <svg className="w-4 h-4 text-blue-600 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5-5-5h5v-5a7.5 7.5 0 010-15c2.5 0 4.5 1 6 2.5L15 6.5z" />
                    </svg>
                    <span className="text-xs font-medium text-slate-700">Export Data</span>
                  </div>
                </button>

                <button className="p-3 bg-gradient-to-br from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 rounded-lg border border-purple-100 transition-all duration-200 group">
                  <div className="flex flex-col items-center gap-1">
                    <svg className="w-4 h-4 text-purple-600 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <span className="text-xs font-medium text-slate-700">Themes</span>
                  </div>
                </button>

                <button className="p-3 bg-gradient-to-br from-red-50 to-pink-50 hover:from-red-100 hover:to-pink-100 rounded-lg border border-red-100 transition-all duration-200 group">
                  <div className="flex flex-col items-center gap-1">
                    <svg className="w-4 h-4 text-red-600 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    <span className="text-xs font-medium text-slate-700">Delete Account</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Floating elements matching home page */}
        <div className="fixed top-1/3 left-6 w-1.5 h-1.5 bg-teal-400/60 rounded-full animate-ping pointer-events-none"></div>
        <div className="fixed top-2/3 right-8 w-1 h-1 bg-cyan-400/50 rounded-full animate-pulse pointer-events-none"></div>
        <div className="fixed bottom-1/4 left-1/3 w-1 h-1 bg-blue-400/40 rounded-full animate-pulse delay-1000 pointer-events-none"></div>
      </div>
    )
  );
};

export default UserProfile;