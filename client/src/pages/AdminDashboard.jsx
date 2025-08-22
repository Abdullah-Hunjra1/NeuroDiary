



// ✅ Professional Admin Panel UI for NeuroDiary Project
// Modern design with gradient backgrounds and improved UX
// Maintains all existing logic and API calls

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify';

// const AdminDashboard = () => {
//   const [users, setUsers] = useState([]);
//   const [entries, setEntries] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const token = localStorage.getItem('adminToken');

//   const fetchAdminData = async () => {
//     setLoading(true);
//     try {
//       const config = { headers: { Authorization: `Bearer ${token}` } };
//       const userRes = await axios.get('/api/admin/users', config);
//       const entryRes = await axios.get('/api/admin/entries', config);
//       setUsers(userRes.data.users);
//       setEntries(entryRes.data.entries);
//     } catch (error) {
//       toast.error(error?.response?.data?.message || 'Error fetching admin data');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDeleteUser = async (id) => {
//     await axios.delete(`/api/admin/user/${id}`, { headers: { Authorization: `Bearer ${token}` } });
//     fetchAdminData();
//   };

//   const handleDeleteEntry = async (id) => {
//     await axios.delete(`/api/admin/entry/${id}`, { headers: { Authorization: `Bearer ${token}` } });
//     fetchAdminData();
//   };

//   const handlePromoteUser = async (id) => {
//     await axios.put(`/api/admin/promote/${id}`, {}, { headers: { Authorization: `Bearer ${token}` } });
//     fetchAdminData();
//   };

//   useEffect(() => {
//     if (token) fetchAdminData();
//   }, [token]);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
//       {/* Header Section */}
//       <div className="bg-white shadow-sm border-b border-gray-200">
//         <div className="max-w-7xl mx-auto px-6 py-8">
//           <div className="flex items-center justify-between">
//             <div>
//               <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
//                 Admin Dashboard
//               </h1>
//               <p className="text-gray-600 mt-2">Manage users and diary entries</p>
//             </div>
//             <div className="hidden md:flex items-center space-x-4">
//               <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-xl text-sm font-medium">
//                 🛡️ Administrator
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-6 py-8">
//         {loading ? (
//           <div className="flex items-center justify-center py-20">
//             <div className="relative">
//               <div className="animate-spin rounded-full h-16 w-16 border-4 border-indigo-200"></div>
//               <div className="animate-spin rounded-full h-16 w-16 border-4 border-indigo-600 border-t-transparent absolute top-0"></div>
//             </div>
//             <p className="text-gray-600 ml-4 text-lg">Loading admin data...</p>
//           </div>
//         ) : (
//           <div className="space-y-8">
//             {/* Stats Cards */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//               <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-gray-500 text-sm font-medium">Total Users</p>
//                     <p className="text-3xl font-bold text-indigo-600 mt-1">
//                       {Array.isArray(users) ? users.length : 0}
//                     </p>
//                   </div>
//                   <div className="bg-indigo-100 rounded-full p-3">
//                     <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
//                     </svg>
//                   </div>
//                 </div>
//               </div>

//               <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-gray-500 text-sm font-medium">Total Entries</p>
//                     <p className="text-3xl font-bold text-purple-600 mt-1">
//                       {Array.isArray(entries) ? entries.length : 0}
//                     </p>
//                   </div>
//                   <div className="bg-purple-100 rounded-full p-3">
//                     <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
//                     </svg>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Users Section */}
//             <section className="bg-white rounded-2xl shadow-sm border border-gray-100">
//               <div className="px-6 py-5 border-b border-gray-100">
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center space-x-3">
//                     <div className="bg-indigo-100 rounded-lg p-2">
//                       <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
//                       </svg>
//                     </div>
//                     <h2 className="text-xl font-semibold text-gray-800">User Management</h2>
//                   </div>
//                   <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-3 py-1 rounded-full">
//                     {Array.isArray(users) ? users.length : 0} users
//                   </span>
//                 </div>
//               </div>

//               <div className="overflow-hidden">
//                 <div className="overflow-x-auto">
//                   <table className="w-full">
//                     <thead className="bg-gray-50">
//                       <tr>
//                         <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">User</th>
//                         <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Email</th>
//                         <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Role</th>
//                         <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
//                       </tr>
//                     </thead>
//                     <tbody className="divide-y divide-gray-100">
//                       {Array.isArray(users) && users.map(user => (
//                         <tr key={user._id} className="hover:bg-gray-50 transition-colors duration-200">
//                           <td className="px-6 py-4">
//                             <div className="flex items-center">
//                               <div className="bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full w-10 h-10 flex items-center justify-center text-white font-medium text-sm">
//                                 {user.name?.charAt(0)?.toUpperCase() || 'U'}
//                               </div>
//                               <div className="ml-4">
//                                 <div className="text-sm font-medium text-gray-900">{user.name}</div>
//                               </div>
//                             </div>
//                           </td>
//                           <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>
//                           <td className="px-6 py-4">
//                             <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${
//                               user.isAdmin 
//                                 ? 'bg-emerald-100 text-emerald-800' 
//                                 : 'bg-blue-100 text-blue-800'
//                             }`}>
//                               {user.isAdmin ? '🛡️ Admin' : '👤 User'}
//                             </span>
//                           </td>
//                           <td className="px-6 py-4 text-sm space-x-3">
//                             {!user.isAdmin && (
//                               <button
//                                 onClick={() => handlePromoteUser(user._id)}
//                                 className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-4 py-2 rounded-lg hover:from-emerald-600 hover:to-teal-700 transition-all duration-200 text-xs font-medium shadow-sm hover:shadow-md"
//                               >
//                                 ⬆️ Promote
//                               </button>
//                             )}
//                             <button
//                               onClick={() => handleDeleteUser(user._id)}
//                               className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-4 py-2 rounded-lg hover:from-red-600 hover:to-pink-700 transition-all duration-200 text-xs font-medium shadow-sm hover:shadow-md"
//                             >
//                               🗑️ Delete
//                             </button>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </section>

//             {/* Entries Section */}
//             <section className="bg-white rounded-2xl shadow-sm border border-gray-100">
//               <div className="px-6 py-5 border-b border-gray-100">
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center space-x-3">
//                     <div className="bg-purple-100 rounded-lg p-2">
//                       <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
//                       </svg>
//                     </div>
//                     <h2 className="text-xl font-semibold text-gray-800">Diary Entries</h2>
//                   </div>
//                   <span className="bg-purple-100 text-purple-800 text-xs font-medium px-3 py-1 rounded-full">
//                     {Array.isArray(entries) ? entries.length : 0} entries
//                   </span>
//                 </div>
//               </div>

//               <div className="overflow-hidden">
//                 <div className="overflow-x-auto">
//                   <table className="w-full">
//                     <thead className="bg-gray-50">
//                       <tr>
//                         <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Title</th>
//                         <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Author</th>
//                         <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Mood</th>
//                         <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
//                       </tr>
//                     </thead>
//                     <tbody className="divide-y divide-gray-100">
//                       {Array.isArray(entries) && entries.map(entry => (
//                         <tr key={entry._id} className="hover:bg-gray-50 transition-colors duration-200">
//                           <td className="px-6 py-4">
//                             <div className="text-sm font-medium text-gray-900 truncate max-w-xs">
//                               {entry.title}
//                             </div>
//                           </td>
//                           <td className="px-6 py-4">
//                             <div className="flex items-center">
//                               <div className="bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full w-8 h-8 flex items-center justify-center text-white font-medium text-xs">
//                                 {entry.userId?.email?.charAt(0)?.toUpperCase() || 'U'}
//                               </div>
//                               <div className="ml-3 text-sm text-gray-600">
//                                 {entry.userId?.email || 'N/A'}
//                               </div>
//                             </div>
//                           </td>
//                           <td className="px-6 py-4">
//                             <span className="inline-flex px-3 py-1 text-xs font-medium rounded-full bg-amber-100 text-amber-800">
//                               😊 {entry.mood}
//                             </span>
//                           </td>
//                           <td className="px-6 py-4">
//                             <button
//                               onClick={() => handleDeleteEntry(entry._id)}
//                               className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-4 py-2 rounded-lg hover:from-red-600 hover:to-pink-700 transition-all duration-200 text-xs font-medium shadow-sm hover:shadow-md"
//                             >
//                               🗑️ Delete
//                             </button>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </section>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;



























// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";

// const AdminDashboard = () => {
//   const [users, setUsers] = useState([]);
//   const [entries, setEntries] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const token = localStorage.getItem("adminToken"); // ✅ from login

//   // Fetch Users
//   const fetchUsers = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/admin/users", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setUsers(res.data.users);
//     } catch (error) {
//       console.error(error);
//       toast.error("Failed to fetch users");
//     }
//   };

//   // Fetch Entries
//   const fetchEntries = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/admin/entries", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setEntries(res.data.entries);
//     } catch (error) {
//       console.error(error);
//       toast.error("Failed to fetch entries");
//     }
//   };

//   // Delete User
//   const deleteUser = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/admin/user/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       toast.success("User deleted");
//       fetchUsers();
//     } catch (error) {
//       console.error(error);
//       toast.error("Failed to delete user");
//     }
//   };

//   // Delete Entry
//   const deleteEntry = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/admin/entry/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       toast.success("Entry deleted");
//       fetchEntries();
//     } catch (error) {
//       console.error(error);
//       toast.error("Failed to delete entry");
//     }
//   };

//   // Fetch Data on Mount
//   useEffect(() => {
//     if (!token) {
//       toast.error("Unauthorized! Please login again.");
//       return;
//     }
//     const loadData = async () => {
//       await fetchUsers();
//       await fetchEntries();
//       setLoading(false);
//     };
//     loadData();
//   }, [token]);

//   if (loading) return <p>Loading Admin Dashboard...</p>;

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

//       {/* Users Table */}
//       <div className="mb-8">
//         <h2 className="text-xl font-semibold mb-4">Users</h2>
//         <table className="w-full border border-gray-300">
//           <thead>
//             <tr className="bg-gray-200">
//               <th className="p-2 border">Name</th>
//               <th className="p-2 border">Email</th>
//               <th className="p-2 border">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.length > 0 ? (
//               users.map((user) => (
//                 <tr key={user._id}>
//                   <td className="p-2 border">{user.name}</td>
//                   <td className="p-2 border">{user.email}</td>
//                   <td className="p-2 border">
//                     <button
//                       className="bg-red-500 text-white px-3 py-1 rounded"
//                       onClick={() => deleteUser(user._id)}
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="3" className="p-2 text-center">
//                   No users found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Entries Table */}
//       <div>
//         <h2 className="text-xl font-semibold mb-4">Diary Entries</h2>
//         <table className="w-full border border-gray-300">
//           <thead>
//             <tr className="bg-gray-200">
//               <th className="p-2 border">Title</th>
//               <th className="p-2 border">Mood</th>
//               <th className="p-2 border">User</th>
//               <th className="p-2 border">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {entries.length > 0 ? (
//               entries.map((entry) => (
//                 <tr key={entry._id}>
//                   <td className="p-2 border">{entry.title}</td>
//                   <td className="p-2 border">{entry.mood}</td>
//                   <td className="p-2 border">
//                     {entry.userId ? entry.userId.email : "Unknown"}
//                   </td>
//                   <td className="p-2 border">
//                     <button
//                       className="bg-red-500 text-white px-3 py-1 rounded"
//                       onClick={() => deleteEntry(entry._id)}
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="4" className="p-2 text-center">
//                   No entries found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;



























// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import {
//   FaUsers,
//   FaBook,
//   FaTrash,
//   FaEye,
//   FaChartBar,
//   FaCrown,
//   FaCalendarAlt,
//   FaSmile,
//   FaBrain
// } from "react-icons/fa";

// const moodColors = {
//   Happy: "#10B981",
//   Sad: "#3B82F6", 
//   Calm: "#06B6D4",
//   Stressed: "#EF4444",
//   Neutral: "#6B7280",
//   Excited: "#8B5CF6",
//   Anxious: "#F59E0B",
//   Angry: "#DC2626",
//   Grateful: "#059669"
// };

// const AdminDashboard = () => {
//   const [users, setUsers] = useState([]);
//   const [entries, setEntries] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [stats, setStats] = useState({
//     totalUsers: 0,
//     totalEntries: 0,
//     activeUsers: 0,
//     recentSignups: 0
//   });

//   const token = localStorage.getItem("adminToken");

//   // Fetch Users
//   const fetchUsers = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/admin/users", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setUsers(res.data.users);
//       setStats(prev => ({ 
//         ...prev, 
//         totalUsers: res.data.users.length,
//         activeUsers: res.data.users.filter(user => 
//           new Date(user.lastActive || user.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
//         ).length,
//         recentSignups: res.data.users.filter(user => 
//           new Date(user.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
//         ).length
//       }));
//     } catch (error) {
//       console.error(error);
//       toast.error("Failed to fetch users");
//     }
//   };

//   // Fetch Entries
//   const fetchEntries = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/admin/entries", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setEntries(res.data.entries);
//       setStats(prev => ({ ...prev, totalEntries: res.data.entries.length }));
//     } catch (error) {
//       console.error(error);
//       toast.error("Failed to fetch entries");
//     }
//   };

//   // Delete User
//   const deleteUser = async (id) => {
//     if (!confirm("Are you sure you want to delete this user? This action cannot be undone.")) return;
    
//     try {
//       await axios.delete(`http://localhost:5000/api/admin/user/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       toast.success("User deleted successfully");
//       fetchUsers();
//     } catch (error) {
//       console.error(error);
//       toast.error("Failed to delete user");
//     }
//   };

//   // Delete Entry
//   const deleteEntry = async (id) => {
//     if (!confirm("Are you sure you want to delete this entry? This action cannot be undone.")) return;
    
//     try {
//       await axios.delete(`http://localhost:5000/api/admin/entry/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       toast.success("Entry deleted successfully");
//       fetchEntries();
//     } catch (error) {
//       console.error(error);
//       toast.error("Failed to delete entry");
//     }
//   };

//   // Fetch Data on Mount
//   useEffect(() => {
//     if (!token) {
//       toast.error("Unauthorized! Please login again.");
//       return;
//     }
//     const loadData = async () => {
//       await fetchUsers();
//       await fetchEntries();
//       setLoading(false);
//     };
//     loadData();
//   }, [token]);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
//         <div className="text-center">
//           <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-4 animate-pulse">
//             <FaCrown className="text-white text-2xl" />
//           </div>
//           <p className="text-slate-600">Loading Admin Dashboard...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen flex relative bg-gradient-to-br from-slate-50/90 via-blue-50/30 to-cyan-50/40">
//       {/* Background Elements */}
//       <div className="fixed inset-0 -z-10">
//         {/* Background orbs */}
//         <div className="absolute top-10 left-10 w-64 h-64 bg-gradient-to-br from-purple-400/8 to-indigo-400/8 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
//         <div className="absolute top-1/4 right-10 w-48 h-48 bg-gradient-to-br from-teal-400/6 to-cyan-400/6 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
//         <div className="absolute bottom-20 left-1/4 w-56 h-56 bg-gradient-to-br from-indigo-400/8 to-purple-400/8 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-2000"></div>
        
//         {/* Subtle grid pattern */}
//         <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.015)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
//       </div>

//       {/* Main Content */}
//       <main className="flex-1 min-h-screen">
//         {/* Header */}
//         <div className="bg-white/70 backdrop-blur-md shadow-sm border-b border-slate-200/50 px-8 py-8">
//           <div className="flex items-center justify-between">
//             <div>
//               <h1 className="text-3xl font-bold text-slate-800">
//                 <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">Admin Dashboard</span> 
//                 <FaCrown className="inline ml-3 text-purple-600" />
//               </h1>
//               <p className="text-slate-600 mt-2 flex items-center space-x-2">
//                 <FaCalendarAlt className="text-purple-500" />
//                 <span>System overview and management panel</span>
//               </p>
//             </div>
//             <div className="hidden lg:flex items-center space-x-4">
//               <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200/50 rounded-2xl px-6 py-3">
//                 <div className="flex items-center space-x-3">
//                   <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center">
//                     <FaChartBar className="text-white text-xs" />
//                   </div>
//                   <div>
//                     <p className="text-xs text-slate-600">System Health</p>
//                     <p className="font-bold text-purple-700">Online</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Content */}
//         <div className="p-8">
//           {/* Quick Stats Row */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//             <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-slate-200/30 p-6 hover:shadow-xl transition-all duration-300">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-slate-600 text-sm font-medium">Total Users</p>
//                   <p className="text-2xl font-bold text-slate-800">{stats.totalUsers}</p>
//                   <p className="text-xs text-purple-600 flex items-center mt-1">
//                     <FaUsers className="mr-1" /> Registered accounts
//                   </p>
//                 </div>
//                 <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-2xl flex items-center justify-center">
//                   <FaUsers className="text-purple-600 text-xl" />
//                 </div>
//               </div>
//             </div>

//             <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-slate-200/30 p-6 hover:shadow-xl transition-all duration-300">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-slate-600 text-sm font-medium">Total Entries</p>
//                   <p className="text-2xl font-bold text-slate-800">{stats.totalEntries}</p>
//                   <p className="text-xs text-teal-600 flex items-center mt-1">
//                     <FaBook className="mr-1" /> Diary entries
//                   </p>
//                 </div>
//                 <div className="w-12 h-12 bg-gradient-to-br from-teal-100 to-cyan-100 rounded-2xl flex items-center justify-center">
//                   <FaBook className="text-teal-600 text-xl" />
//                 </div>
//               </div>
//             </div>

//             <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-slate-200/30 p-6 hover:shadow-xl transition-all duration-300">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-slate-600 text-sm font-medium">Active Users</p>
//                   <p className="text-2xl font-bold text-slate-800">{stats.activeUsers}</p>
//                   <p className="text-xs text-emerald-600 flex items-center mt-1">
//                     <FaSmile className="mr-1" /> Last 7 days
//                   </p>
//                 </div>
//                 <div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-green-100 rounded-2xl flex items-center justify-center">
//                   <FaSmile className="text-emerald-600 text-xl" />
//                 </div>
//               </div>
//             </div>

//             <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-slate-200/30 p-6 hover:shadow-xl transition-all duration-300">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-slate-600 text-sm font-medium">New Signups</p>
//                   <p className="text-2xl font-bold text-slate-800">{stats.recentSignups}</p>
//                   <p className="text-xs text-amber-600 flex items-center mt-1">
//                     <FaBrain className="mr-1" /> This week
//                   </p>
//                 </div>
//                 <div className="w-12 h-12 bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl flex items-center justify-center">
//                   <FaBrain className="text-amber-600 text-xl" />
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Main Content Grid */}
//           <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
//             {/* Users Management */}
//             <section className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-slate-200/30 p-6 hover:shadow-xl transition-all duration-300">
//               <div className="flex items-center justify-between mb-6">
//                 <div className="flex items-center space-x-3">
//                   <div className="w-8 h-8 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-xl flex items-center justify-center">
//                     <FaUsers className="text-purple-600 text-lg" />
//                   </div>
//                   <h2 className="font-bold text-lg text-slate-800">User Management</h2>
//                 </div>
//                 <span className="text-sm text-slate-500">{users.length} users</span>
//               </div>
              
//               <div className="overflow-x-auto">
//                 <div className="max-h-96 overflow-y-auto">
//                   {users.length > 0 ? (
//                     <div className="space-y-3">
//                       {users.map((user) => (
//                         <div
//                           key={user._id}
//                           className="group p-4 rounded-xl hover:bg-gradient-to-r hover:from-purple-50/50 hover:to-indigo-50/50 cursor-pointer transition-all duration-300 border border-transparent hover:border-purple-200/50"
//                         >
//                           <div className="flex items-center justify-between">
//                             <div className="flex-1">
//                               <h4 className="font-semibold text-slate-800 group-hover:text-purple-700">
//                                 {user.name}
//                               </h4>
//                               <p className="text-sm text-slate-600 mt-1">{user.email}</p>
//                               <div className="flex items-center space-x-3 mt-2">
//                                 <span className="text-xs text-slate-500">
//                                   Joined: {new Date(user.createdAt).toLocaleDateString()}
//                                 </span>
//                                 {user.lastActive && (
//                                   <span className="text-xs text-emerald-600">
//                                     Active: {new Date(user.lastActive).toLocaleDateString()}
//                                   </span>
//                                 )}
//                               </div>
//                             </div>
//                             <div className="flex items-center space-x-2 ml-4">
//                               <button
//                                 className="p-2 text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
//                                 title="View User Details"
//                               >
//                                 <FaEye className="text-sm" />
//                               </button>
//                               <button
//                                 onClick={() => deleteUser(user._id)}
//                                 className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
//                                 title="Delete User"
//                               >
//                                 <FaTrash className="text-sm" />
//                               </button>
//                             </div>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   ) : (
//                     <div className="text-center py-8">
//                       <div className="w-16 h-16 bg-gradient-to-br from-slate-100 to-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
//                         <FaUsers className="text-slate-400 text-2xl" />
//                       </div>
//                       <p className="text-slate-500">No users found</p>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </section>

//             {/* Entries Management */}
//             <section className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-slate-200/30 p-6 hover:shadow-xl transition-all duration-300">
//               <div className="flex items-center justify-between mb-6">
//                 <div className="flex items-center space-x-3">
//                   <div className="w-8 h-8 bg-gradient-to-br from-teal-100 to-cyan-100 rounded-xl flex items-center justify-center">
//                     <FaBook className="text-teal-600 text-lg" />
//                   </div>
//                   <h2 className="font-bold text-lg text-slate-800">Diary Entries</h2>
//                 </div>
//                 <span className="text-sm text-slate-500">{entries.length} entries</span>
//               </div>
              
//               <div className="overflow-x-auto">
//                 <div className="max-h-96 overflow-y-auto">
//                   {entries.length > 0 ? (
//                     <div className="space-y-3">
//                       {entries.map((entry) => (
//                         <div
//                           key={entry._id}
//                           className="group p-4 rounded-xl hover:bg-gradient-to-r hover:from-teal-50/50 hover:to-cyan-50/50 cursor-pointer transition-all duration-300 border border-transparent hover:border-teal-200/50"
//                         >
//                           <div className="flex items-center justify-between">
//                             <div className="flex-1">
//                               <h4 className="font-semibold text-slate-800 group-hover:text-teal-700">
//                                 {entry.title}
//                               </h4>
//                               <p className="text-sm text-slate-600 mt-1 line-clamp-2">
//                                 {entry.entry?.substring(0, 80)}...
//                               </p>
//                               <div className="flex items-center space-x-3 mt-2">
//                                 <span 
//                                   className="px-3 py-1 rounded-full text-xs font-medium"
//                                   style={{ 
//                                     backgroundColor: `${moodColors[entry.mood] || '#6B7280'}20`,
//                                     color: moodColors[entry.mood] || '#6B7280'
//                                   }}
//                                 >
//                                   {entry.mood}
//                                 </span>
//                                 <span className="text-xs text-slate-500">
//                                   by {entry.userId ? entry.userId.email : "Unknown"}
//                                 </span>
//                                 <span className="text-xs text-slate-500">
//                                   {new Date(entry.createdAt).toLocaleDateString()}
//                                 </span>
//                               </div>
//                             </div>
//                             <div className="flex items-center space-x-2 ml-4">
//                               <button
//                                 className="p-2 text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
//                                 title="View Entry"
//                               >
//                                 <FaEye className="text-sm" />
//                               </button>
//                               <button
//                                 onClick={() => deleteEntry(entry._id)}
//                                 className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
//                                 title="Delete Entry"
//                               >
//                                 <FaTrash className="text-sm" />
//                               </button>
//                             </div>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   ) : (
//                     <div className="text-center py-8">
//                       <div className="w-16 h-16 bg-gradient-to-br from-slate-100 to-teal-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
//                         <FaBook className="text-slate-400 text-2xl" />
//                       </div>
//                       <p className="text-slate-500">No entries found</p>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </section>
//           </div>

//           {/* Additional Admin Actions */}
//           <section className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-slate-200/30 p-6 hover:shadow-xl transition-all duration-300 mt-8">
//             <div className="flex items-center space-x-3 mb-6">
//               <div className="w-8 h-8 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-xl flex items-center justify-center">
//                 <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
//                 </svg>
//               </div>
//               <h3 className="text-xl font-bold text-slate-800">Quick Actions</h3>
//             </div>
            
//             <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
//               <button className="group flex flex-col items-center p-6 rounded-2xl hover:bg-gradient-to-br hover:from-purple-50 hover:to-indigo-50 transition-all duration-300 border-2 border-transparent hover:border-purple-200/50 hover:shadow-lg">
//                 <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-indigo-100 group-hover:from-purple-200 group-hover:to-indigo-200 rounded-2xl flex items-center justify-center mb-3 transition-all duration-300 group-hover:scale-110">
//                   <span className="text-2xl">📊</span>
//                 </div>
//                 <span className="text-sm font-semibold text-slate-700 group-hover:text-purple-700">Analytics</span>
//                 <span className="text-xs text-slate-500 mt-1">View reports</span>
//               </button>

//               <button className="group flex flex-col items-center p-6 rounded-2xl hover:bg-gradient-to-br hover:from-teal-50 hover:to-cyan-50 transition-all duration-300 border-2 border-transparent hover:border-teal-200/50 hover:shadow-lg">
//                 <div className="w-16 h-16 bg-gradient-to-br from-teal-100 to-cyan-100 group-hover:from-teal-200 group-hover:to-cyan-200 rounded-2xl flex items-center justify-center mb-3 transition-all duration-300 group-hover:scale-110">
//                   <span className="text-2xl">⚙️</span>
//                 </div>
//                 <span className="text-sm font-semibold text-slate-700 group-hover:text-teal-700">Settings</span>
//                 <span className="text-xs text-slate-500 mt-1">System config</span>
//               </button>

//               <button className="group flex flex-col items-center p-6 rounded-2xl hover:bg-gradient-to-br hover:from-emerald-50 hover:to-green-50 transition-all duration-300 border-2 border-transparent hover:border-emerald-200/50 hover:shadow-lg">
//                 <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-green-100 group-hover:from-emerald-200 group-hover:to-green-200 rounded-2xl flex items-center justify-center mb-3 transition-all duration-300 group-hover:scale-110">
//                   <span className="text-2xl">📧</span>
//                 </div>
//                 <span className="text-sm font-semibold text-slate-700 group-hover:text-emerald-700">Messages</span>
//                 <span className="text-xs text-slate-500 mt-1">Contact users</span>
//               </button>

//               <button className="group flex flex-col items-center p-6 rounded-2xl hover:bg-gradient-to-br hover:from-amber-50 hover:to-orange-50 transition-all duration-300 border-2 border-transparent hover:border-amber-200/50 hover:shadow-lg">
//                 <div className="w-16 h-16 bg-gradient-to-br from-amber-100 to-orange-100 group-hover:from-amber-200 group-hover:to-orange-200 rounded-2xl flex items-center justify-center mb-3 transition-all duration-300 group-hover:scale-110">
//                   <span className="text-2xl">🛡️</span>
//                 </div>
//                 <span className="text-sm font-semibold text-slate-700 group-hover:text-amber-700">Security</span>
//                 <span className="text-xs text-slate-500 mt-1">Access control</span>
//               </button>
//             </div>
//           </section>
//         </div>
//       </main>

//       {/* Floating elements */}
//       <div className="fixed top-1/3 left-6 w-2 h-2 bg-purple-400/40 rounded-full animate-ping pointer-events-none"></div>
//       <div className="fixed top-2/3 right-8 w-1.5 h-1.5 bg-indigo-400/30 rounded-full animate-pulse pointer-events-none"></div>
//       <div className="fixed bottom-1/4 left-1/3 w-1 h-1 bg-teal-400/40 rounded-full animate-pulse delay-1000 pointer-events-none"></div>
//     </div>
//   );
// };

// export default AdminDashboard;




























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