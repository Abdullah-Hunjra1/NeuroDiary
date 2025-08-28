import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  FaUsers,
  FaBook,
  FaTrash,
  FaEye,
  FaChartLine,
  FaShieldAlt,
  FaCalendarAlt,
  FaArrowUp,
  FaCog
} from "react-icons/fa";
import { FiActivity } from "react-icons/fi";
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

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalEntries: 0,
    activeUsers: 0,
    recentSignups: 0
  });
  const navigate = useNavigate()
  const token = localStorage.getItem("adminToken");

  // Fetch Users
  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data.users);
      setStats(prev => ({ 
        ...prev, 
        totalUsers: res.data.users.length,
        activeUsers: res.data.users.filter(user => 
          new Date(user.lastActive || user.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
        ).length,
        recentSignups: res.data.users.filter(user => 
          new Date(user.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
        ).length
      }));
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch users");
    }
  };

  // Fetch Entries
  const fetchEntries = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/entries", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEntries(res.data.entries);
      setStats(prev => ({ ...prev, totalEntries: res.data.entries.length }));
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch entries");
    }
  };

  // Delete User
  const deleteUser = async (id) => {
    if (!confirm("Are you sure you want to delete this user? This action cannot be undone.")) return;
    
    try {
      await axios.delete(`http://localhost:5000/api/admin/user/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("User deleted successfully");
      fetchUsers();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete user");
    }
  };

  // Delete Entry
  const deleteEntry = async (id) => {
    if (!confirm("Are you sure you want to delete this entry? This action cannot be undone.")) return;
    
    try {
      await axios.delete(`http://localhost:5000/api/admin/entry/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Entry deleted successfully");
      fetchEntries();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete entry");
    }
  };

  // Fetch Data on Mount
  useEffect(() => { 
    if (!token) {
      toast.error("Unauthorized! Please login again.");
      navigate("/admin-login")
      return;
    }
    const loadData = async () => {
      await fetchUsers();
      await fetchEntries();
      setLoading(false);
    };
    loadData();
  }, [token]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center mx-auto mb-4 animate-pulse">
            <FaShieldAlt className="text-white text-2xl" />
          </div>
          <p className="text-slate-600">Loading Admin Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50/90 via-blue-50/30 to-cyan-50/40">
      {/* Background Elements */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-10 left-10 w-64 h-64 bg-gradient-to-br from-teal-400/8 to-cyan-400/8 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute top-1/4 right-10 w-48 h-48 bg-gradient-to-br from-blue-400/6 to-indigo-400/6 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-56 h-56 bg-gradient-to-br from-cyan-400/8 to-teal-400/8 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-2000"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.015)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      </div>

      {/* Header */}
      <div className="bg-white/70 backdrop-blur-md shadow-sm border-b border-slate-200/50 px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">
              Admin <span className="bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">Dashboard</span>
            </h1>
            <p className="text-slate-600 mt-2 flex items-center space-x-2">
              <FaCalendarAlt className="text-teal-500" />
              <span>System Management & Analytics</span>
            </p>
          </div>
          <div className="hidden lg:flex items-center space-x-4">
            <div className="bg-gradient-to-r from-teal-50 to-cyan-50 border border-teal-200/50 rounded-2xl px-6 py-3">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-full flex items-center justify-center">
                  <FaShieldAlt className="text-white text-xs" />
                </div>
                <div>
                  <p className="text-xs text-slate-600">System Status</p>
                  <p className="font-bold text-teal-700">Active</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-slate-200/30 p-6 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">Total Users</p>
                <p className="text-2xl font-bold text-slate-800">{stats.totalUsers}</p>
                <p className="text-xs text-teal-600 flex items-center mt-1">
                  <FaArrowUp className="mr-1" /> Platform members
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-teal-100 to-cyan-100 rounded-2xl flex items-center justify-center">
                <FaUsers className="text-teal-600 text-xl" />
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-slate-200/30 p-6 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">Diary Entries</p>
                <p className="text-2xl font-bold text-slate-800">{stats.totalEntries}</p>
                <p className="text-xs text-blue-600 flex items-center mt-1">
                  <FaBook className="mr-1" /> Total content
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center">
                <FaBook className="text-blue-600 text-xl" />
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-slate-200/30 p-6 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">Active Users</p>
                <p className="text-2xl font-bold text-slate-800">{stats.activeUsers}</p>
                <p className="text-xs text-emerald-600 flex items-center mt-1">
                  <FiActivity className="mr-1" /> Last 7 days
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl flex items-center justify-center">
                <FiActivity className="text-emerald-600 text-xl" />
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-slate-200/30 p-6 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">New Signups</p>
                <p className="text-2xl font-bold text-slate-800">{stats.recentSignups}</p>
                <p className="text-xs text-purple-600 flex items-center mt-1">
                  <FaChartLine className="mr-1" /> This week
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-2xl flex items-center justify-center">
                <FaChartLine className="text-purple-600 text-xl" />
              </div>
            </div>
          </div>
        </div>

        {/* Data Tables */}
        <div className="space-y-8">
          {/* Users Table */}
          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-slate-200/30 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-teal-100 to-cyan-100 rounded-xl flex items-center justify-center">
                  <FaUsers className="text-teal-600 text-lg" />
                </div>
                <h2 className="text-xl font-bold text-slate-800">Users Management</h2>
              </div>
              <span className="text-sm bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent font-semibold">
                {users.length} Total Users
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-4 px-4 font-semibold text-slate-700">Name</th>
                    <th className="text-left py-4 px-4 font-semibold text-slate-700">Email</th>
                    <th className="text-left py-4 px-4 font-semibold text-slate-700">Join Date</th>
                    <th className="text-center py-4 px-4 font-semibold text-slate-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length > 0 ? (
                    users.map((user) => (
                      <tr key={user._id} className="border-b border-slate-100 hover:bg-gradient-to-r hover:from-teal-50/30 hover:to-cyan-50/30 transition-all duration-200">
                        <td className="py-4 px-4">
                          <div className="font-medium text-slate-800">{user.name}</div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="text-slate-600">{user.email}</div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="text-slate-500 text-sm">
                            {new Date(user.createdAt).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center justify-center space-x-2">
                            <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200">
                              <FaEye className="text-sm" />
                            </button>
                            <button
                              onClick={() => deleteUser(user._id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                            >
                              <FaTrash className="text-sm" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="py-8 text-center text-slate-500">
                        No users found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Entries Table */}
          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-slate-200/30 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center">
                  <FaBook className="text-blue-600 text-lg" />
                </div>
                <h2 className="text-xl font-bold text-slate-800">Diary Entries</h2>
              </div>
              <span className="text-sm bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent font-semibold">
                {entries.length} Total Entries
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-4 px-4 font-semibold text-slate-700">Title</th>
                    <th className="text-left py-4 px-4 font-semibold text-slate-700">Mood</th>
                    <th className="text-left py-4 px-4 font-semibold text-slate-700">User</th>
                    <th className="text-left py-4 px-4 font-semibold text-slate-700">Date</th>
                    <th className="text-center py-4 px-4 font-semibold text-slate-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {entries.length > 0 ? (
                    entries.map((entry) => (
                      <tr key={entry._id} className="border-b border-slate-100 hover:bg-gradient-to-r hover:from-blue-50/30 hover:to-indigo-50/30 transition-all duration-200">
                        <td className="py-4 px-4">
                          <div className="font-medium text-slate-800 max-w-xs truncate">
                            {entry.title}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span 
                            className="px-3 py-1 rounded-full text-xs font-medium"
                            style={{ 
                              backgroundColor: `${moodColors[entry.mood] || '#6B7280'}20`,
                              color: moodColors[entry.mood] || '#6B7280'
                            }}
                          >
                            {entry.mood}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="text-slate-600">
                            {entry.userId ? entry.userId.email : "Unknown"}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="text-slate-500 text-sm">
                            {new Date(entry.createdAt).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center justify-center space-x-2">
                            <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200">
                              <FaEye className="text-sm" />
                            </button>
                            <button
                              onClick={() => deleteEntry(entry._id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                            >
                              <FaTrash className="text-sm" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="py-8 text-center text-slate-500">
                        No entries found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-slate-200/30 p-6 mt-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-xl flex items-center justify-center">
              <FaCog className="text-emerald-600 text-lg" />
            </div>
            <h3 className="text-xl font-bold text-slate-800">Admin Tools</h3>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <button className="group flex flex-col items-center p-6 rounded-2xl hover:bg-gradient-to-br hover:from-teal-50 hover:to-cyan-50 transition-all duration-300 border-2 border-transparent hover:border-teal-200/50">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-100 to-cyan-100 group-hover:from-teal-200 group-hover:to-cyan-200 rounded-2xl flex items-center justify-center mb-3 transition-all duration-300">
                <FaChartLine className="text-teal-600 text-2xl" />
              </div>
              <span className="text-sm font-semibold text-slate-700 group-hover:text-teal-700">Analytics</span>
            </button>

            <button className="group flex flex-col items-center p-6 rounded-2xl hover:bg-gradient-to-br hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 border-2 border-transparent hover:border-blue-200/50">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 group-hover:from-blue-200 group-hover:to-indigo-200 rounded-2xl flex items-center justify-center mb-3 transition-all duration-300">
                <FaCog className="text-blue-600 text-2xl" />
              </div>
              <span className="text-sm font-semibold text-slate-700 group-hover:text-blue-700">Settings</span>
            </button>

            <button className="group flex flex-col items-center p-6 rounded-2xl hover:bg-gradient-to-br hover:from-emerald-50 hover:to-green-50 transition-all duration-300 border-2 border-transparent hover:border-emerald-200/50">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-green-100 group-hover:from-emerald-200 group-hover:to-green-200 rounded-2xl flex items-center justify-center mb-3 transition-all duration-300">
                <FaUsers className="text-emerald-600 text-2xl" />
              </div>
              <span className="text-sm font-semibold text-slate-700 group-hover:text-emerald-700">User Roles</span>
            </button>

            <button className="group flex flex-col items-center p-6 rounded-2xl hover:bg-gradient-to-br hover:from-purple-50 hover:to-indigo-50 transition-all duration-300 border-2 border-transparent hover:border-purple-200/50">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-indigo-100 group-hover:from-purple-200 group-hover:to-indigo-200 rounded-2xl flex items-center justify-center mb-3 transition-all duration-300">
                <FaShieldAlt className="text-purple-600 text-2xl" />
              </div>
              <span className="text-sm font-semibold text-slate-700 group-hover:text-purple-700">Security</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;