



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













// import React, { useEffect, useState } from 'react';

// const AdminDashboard = () => {
//   // Mock data for demonstration
//   const [users, setUsers] = useState([
//     { _id: '1', name: 'John Doe', email: 'john@example.com', isAdmin: false },
//     { _id: '2', name: 'Jane Smith', email: 'jane@example.com', isAdmin: true },
//     { _id: '3', name: 'Bob Johnson', email: 'bob@example.com', isAdmin: false }
//   ]);
//   const [entries, setEntries] = useState([
//     { _id: '1', title: 'My First Diary Entry', mood: 'Happy', userId: { email: 'john@example.com' } },
//     { _id: '2', title: 'Thoughts on Today', mood: 'Peaceful', userId: { email: 'jane@example.com' } },
//     { _id: '3', title: 'Weekend Adventures', mood: 'Excited', userId: { email: 'bob@example.com' } }
//   ]);
//   const [loading, setLoading] = useState(false);

//   // Simulate API calls with mock functions
//   const fetchAdminData = async () => {
//     setLoading(true);
//     // Simulate API delay
//     setTimeout(() => {
//       setLoading(false);
//     }, 1000);
//   };

//   const handleDeleteUser = async (id) => {
//     setUsers(users.filter(user => user._id !== id));
//   };

//   const handleDeleteEntry = async (id) => {
//     setEntries(entries.filter(entry => entry._id !== id));
//   };

//   const handlePromoteUser = async (id) => {
//     setUsers(users.map(user => 
//       user._id === id ? { ...user, isAdmin: true } : user
//     ));
//   };

//   useEffect(() => {
//     fetchAdminData();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <div className="bg-white shadow-sm border-b">
//         <div className="max-w-6xl mx-auto px-6 py-4">
//           <div className="flex items-center justify-between">
//             <div>
//               <h1 className="text-2xl font-semibold text-gray-800">Admin Dashboard</h1>
//               <p className="text-sm text-gray-600 mt-1">Manage users and diary entries</p>
//             </div>
//             <div className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm font-medium">
//               Administrator
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-6xl mx-auto px-6 py-6">
//         {loading ? (
//           <div className="flex items-center justify-center py-16">
//             <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-600 border-t-transparent"></div>
//             <p className="text-gray-600 ml-3">Loading admin data...</p>
//           </div>
//         ) : (
//           <div className="space-y-6">
//             {/* Stats Cards */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div className="bg-white rounded-lg p-4 shadow-sm border">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-sm text-gray-600">Total Users</p>
//                     <p className="text-2xl font-semibold text-blue-600 mt-1">
//                       {Array.isArray(users) ? users.length : 0}
//                     </p>
//                   </div>
//                   <div className="bg-blue-100 rounded-full p-2">
//                     <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
//                     </svg>
//                   </div>
//                 </div>
//               </div>

//               <div className="bg-white rounded-lg p-4 shadow-sm border">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-sm text-gray-600">Total Entries</p>
//                     <p className="text-2xl font-semibold text-green-600 mt-1">
//                       {Array.isArray(entries) ? entries.length : 0}
//                     </p>
//                   </div>
//                   <div className="bg-green-100 rounded-full p-2">
//                     <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
//                     </svg>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Users Section */}
//             <div className="bg-white rounded-lg shadow-sm border">
//               <div className="px-4 py-3 border-b">
//                 <div className="flex items-center justify-between">
//                   <h2 className="text-lg font-semibold text-gray-800">User Management</h2>
//                   <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
//                     {Array.isArray(users) ? users.length : 0} users
//                   </span>
//                 </div>
//               </div>

//               <div className="overflow-x-auto">
//                 <table className="w-full">
//                   <thead className="bg-gray-50">
//                     <tr>
//                       <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
//                       <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
//                       <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
//                       <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody className="divide-y divide-gray-200">
//                     {Array.isArray(users) && users.map(user => (
//                       <tr key={user._id} className="hover:bg-gray-50">
//                         <td className="px-4 py-3">
//                           <div className="flex items-center">
//                             <div className="bg-blue-600 rounded-full w-8 h-8 flex items-center justify-center text-white font-medium text-sm">
//                               {user.name?.charAt(0)?.toUpperCase() || 'U'}
//                             </div>
//                             <div className="ml-3 text-sm font-medium text-gray-900">{user.name}</div>
//                           </div>
//                         </td>
//                         <td className="px-4 py-3 text-sm text-gray-600">{user.email}</td>
//                         <td className="px-4 py-3">
//                           <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
//                             user.isAdmin 
//                               ? 'bg-green-100 text-green-800' 
//                               : 'bg-gray-100 text-gray-800'
//                           }`}>
//                             {user.isAdmin ? 'Admin' : 'User'}
//                           </span>
//                         </td>
//                         <td className="px-4 py-3 text-sm space-x-2">
//                           {!user.isAdmin && (
//                             <button
//                               onClick={() => handlePromoteUser(user._id)}
//                               className="bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700"
//                             >
//                               Promote
//                             </button>
//                           )}
//                           <button
//                             onClick={() => handleDeleteUser(user._id)}
//                             className="bg-red-600 text-white px-3 py-1 rounded text-xs hover:bg-red-700"
//                           >
//                             Delete
//                           </button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>

//             {/* Entries Section */}
//             <div className="bg-white rounded-lg shadow-sm border">
//               <div className="px-4 py-3 border-b">
//                 <div className="flex items-center justify-between">
//                   <h2 className="text-lg font-semibold text-gray-800">Diary Entries</h2>
//                   <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
//                     {Array.isArray(entries) ? entries.length : 0} entries
//                   </span>
//                 </div>
//               </div>

//               <div className="overflow-x-auto">
//                 <table className="w-full">
//                   <thead className="bg-gray-50">
//                     <tr>
//                       <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
//                       <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Author</th>
//                       <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Mood</th>
//                       <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody className="divide-y divide-gray-200">
//                     {Array.isArray(entries) && entries.map(entry => (
//                       <tr key={entry._id} className="hover:bg-gray-50">
//                         <td className="px-4 py-3 text-sm font-medium text-gray-900 truncate max-w-xs">
//                           {entry.title}
//                         </td>
//                         <td className="px-4 py-3">
//                           <div className="flex items-center">
//                             <div className="bg-gray-600 rounded-full w-6 h-6 flex items-center justify-center text-white font-medium text-xs">
//                               {entry.userId?.email?.charAt(0)?.toUpperCase() || 'U'}
//                             </div>
//                             <div className="ml-2 text-sm text-gray-600">
//                               {entry.userId?.email || 'N/A'}
//                             </div>
//                           </div>
//                         </td>
//                         <td className="px-4 py-3">
//                           <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
//                             {entry.mood}
//                           </span>
//                         </td>
//                         <td className="px-4 py-3">
//                           <button
//                             onClick={() => handleDeleteEntry(entry._id)}
//                             className="bg-red-600 text-white px-3 py-1 rounded text-xs hover:bg-red-700"
//                           >
//                             Delete
//                           </button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;


















// import React, { useEffect, useState, useContext } from 'react';
// import { AppContext } from '../../context/AppContext';

// const AdminDashboard = () => {
//   const { backendUrl, token } = useContext(AppContext);
//   const [users, setUsers] = useState([]);
//   const [entries, setEntries] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   // Fetch all users from backend
//   const fetchUsers = async () => {
//     try {
//       const response = await fetch(`${backendUrl}/api/admin/users`, {
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });
//       const data = await response.json();
//       if (data.success) {
//         setUsers(data.users || []);
//       } else {
//         setError(data.message);
//       }
//     } catch (error) {
//       console.error('Error fetching users:', error);
//       setError('Failed to fetch users');
//     }
//   };

//   // Fetch all diary entries from backend
//   const fetchEntries = async () => {
//     try {
//       const response = await fetch(`${backendUrl}/api/admin/entries`, {
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });
//       const data = await response.json();
//       if (data.success) {
//         setEntries(data.entries || []);
//       } else {
//         setError(data.message);
//       }
//     } catch (error) {
//       console.error('Error fetching entries:', error);
//       setError('Failed to fetch entries');
//     }
//   };

//   // Delete user
//   const handleDeleteUser = async (id) => {
//     if (!window.confirm('Are you sure you want to delete this user?')) return;
    
//     try {
//       const response = await fetch(`${backendUrl}/api/admin/user/${id}`, {
//         method: 'DELETE',
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });
//       const data = await response.json();
//       if (data.success) {
//         setUsers(users.filter(user => user._id !== id));
//         alert('User deleted successfully');
//       } else {
//         alert(data.message);
//       }
//     } catch (error) {
//       console.error('Error deleting user:', error);
//       alert('Failed to delete user');
//     }
//   };

//   // Delete diary entry
//   const handleDeleteEntry = async (id) => {
//     if (!window.confirm('Are you sure you want to delete this diary entry?')) return;
    
//     try {
//       const response = await fetch(`${backendUrl}/api/admin/entry/${id}`, {
//         method: 'DELETE',
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });
//       const data = await response.json();
//       if (data.success) {
//         setEntries(entries.filter(entry => entry._id !== id));
//         alert('Diary entry deleted successfully');
//       } else {
//         alert(data.message);
//       }
//     } catch (error) {
//       console.error('Error deleting entry:', error);
//       alert('Failed to delete entry');
//     }
//   };

//   // Promote user to admin
//   const handlePromoteUser = async (id) => {
//     if (!window.confirm('Are you sure you want to promote this user to admin?')) return;
    
//     try {
//       const response = await fetch(`${backendUrl}/api/admin/promote/${id}`, {
//         method: 'PUT',
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });
//       const data = await response.json();
//       if (data.success) {
//         setUsers(users.map(user => 
//           user._id === id ? { ...user, isAdmin: true } : user
//         ));
//         alert('User promoted to admin successfully');
//       } else {
//         alert(data.message);
//       }
//     } catch (error) {
//       console.error('Error promoting user:', error);
//       alert('Failed to promote user');
//     }
//   };

//   // Fetch data on component mount
//   useEffect(() => {
//     const fetchAdminData = async () => {
//       setLoading(true);
//       await Promise.all([fetchUsers(), fetchEntries()]);
//       setLoading(false);
//     };

//     if (token) {
//       fetchAdminData();
//     }
//   }, [token, backendUrl]);

//   if (!token) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-50/80 via-blue-50/20 to-cyan-50/30 flex items-center justify-center">
//         <div className="text-center">
//           <h2 className="text-2xl font-bold text-gray-800 mb-4">Access Denied</h2>
//           <p className="text-gray-600">Please log in as an admin to access this page.</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="relative min-h-screen">
//       {/* Background matching home page style */}
//       <div className="fixed inset-0 -z-10">
//         <div className="absolute inset-0 bg-gradient-to-br from-slate-50/80 via-blue-50/20 to-cyan-50/30"></div>
        
//         {/* Subtle background orbs */}
//         <div className="absolute top-10 left-10 w-64 h-64 bg-gradient-to-br from-teal-400/10 to-cyan-400/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
//         <div className="absolute top-1/4 right-10 w-48 h-48 bg-gradient-to-br from-blue-400/8 to-indigo-400/8 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
        
//         {/* Grid pattern */}
//         <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.02)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
//       </div>

//       {/* Header */}
//       <div className="relative bg-white/80 backdrop-blur-sm shadow-sm border-b border-white/20">
//         <div className="max-w-6xl mx-auto px-6 py-4">
//           <div className="flex items-center justify-between">
//             <div>
//               <h1 className="text-2xl font-semibold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">Admin Dashboard</h1>
//               <p className="text-sm text-gray-600 mt-1">Manage users and diary entries</p>
//             </div>
//             <div className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-lg">
//               Administrator
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="relative max-w-6xl mx-auto px-6 py-6">
//         {error && (
//           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
//             {error}
//           </div>
//         )}

//         {loading ? (
//           <div className="flex items-center justify-center py-16">
//             <div className="animate-spin rounded-full h-8 w-8 border-2 border-teal-600 border-t-transparent"></div>
//             <p className="text-gray-600 ml-3">Loading admin data...</p>
//           </div>
//         ) : (
//           <div className="space-y-6">
//             {/* Stats Cards */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-sm text-gray-600">Total Users</p>
//                     <p className="text-3xl font-bold text-teal-600 mt-2">
//                       {Array.isArray(users) ? users.length : 0}
//                     </p>
//                   </div>
//                   <div className="bg-gradient-to-r from-teal-100 to-cyan-100 rounded-full p-3">
//                     <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
//                     </svg>
//                   </div>
//                 </div>
//               </div>

//               <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-sm text-gray-600">Total Entries</p>
//                     <p className="text-3xl font-bold text-cyan-600 mt-2">
//                       {Array.isArray(entries) ? entries.length : 0}
//                     </p>
//                   </div>
//                   <div className="bg-gradient-to-r from-cyan-100 to-blue-100 rounded-full p-3">
//                     <svg className="w-6 h-6 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
//                     </svg>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Users Section */}
//             <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 overflow-hidden">
//               <div className="px-6 py-4 border-b border-gray-100">
//                 <div className="flex items-center justify-between">
//                   <h2 className="text-xl font-semibold text-gray-800">User Management</h2>
//                   <span className="bg-gradient-to-r from-teal-100 to-cyan-100 text-teal-800 text-sm px-3 py-1 rounded-full font-medium">
//                     {Array.isArray(users) ? users.length : 0} users
//                   </span>
//                 </div>
//               </div>

//               <div className="overflow-x-auto">
//                 <table className="w-full">
//                   <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
//                     <tr>
//                       <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">User</th>
//                       <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Email</th>
//                       <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Role</th>
//                       <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody className="divide-y divide-gray-200">
//                     {Array.isArray(users) && users.map(user => (
//                       <tr key={user._id} className="hover:bg-gray-50/50 transition-colors duration-200">
//                         <td className="px-6 py-4">
//                           <div className="flex items-center">
//                             <div className="bg-gradient-to-r from-teal-500 to-cyan-600 rounded-full w-10 h-10 flex items-center justify-center text-white font-semibold text-sm shadow-lg">
//                               {user.name?.charAt(0)?.toUpperCase() || user.email?.charAt(0)?.toUpperCase() || 'U'}
//                             </div>
//                             <div className="ml-4">
//                               <div className="text-sm font-semibold text-gray-900">{user.name || 'N/A'}</div>
//                             </div>
//                           </div>
//                         </td>
//                         <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>
//                         <td className="px-6 py-4">
//                           <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
//                             user.isAdmin 
//                               ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800' 
//                               : 'bg-gradient-to-r from-gray-100 to-slate-100 text-gray-800'
//                           }`}>
//                             {user.isAdmin ? 'Admin' : 'User'}
//                           </span>
//                         </td>
//                         <td className="px-6 py-4 text-sm space-x-2">
//                           {!user.isAdmin && (
//                             <button
//                               onClick={() => handlePromoteUser(user._id)}
//                               className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white px-4 py-2 rounded-lg text-xs font-medium hover:from-teal-600 hover:to-cyan-700 transition-all duration-200 shadow-md hover:shadow-lg"
//                             >
//                               Promote
//                             </button>
//                           )}
//                           <button
//                             onClick={() => handleDeleteUser(user._id)}
//                             className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg text-xs font-medium hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-md hover:shadow-lg"
//                           >
//                             Delete
//                           </button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//                 {users.length === 0 && !loading && (
//                   <div className="text-center py-8 text-gray-500">
//                     No users found
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Entries Section */}
//             <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 overflow-hidden">
//               <div className="px-6 py-4 border-b border-gray-100">
//                 <div className="flex items-center justify-between">
//                   <h2 className="text-xl font-semibold text-gray-800">Diary Entries</h2>
//                   <span className="bg-gradient-to-r from-cyan-100 to-blue-100 text-cyan-800 text-sm px-3 py-1 rounded-full font-medium">
//                     {Array.isArray(entries) ? entries.length : 0} entries
//                   </span>
//                 </div>
//               </div>

//               <div className="overflow-x-auto">
//                 <table className="w-full">
//                   <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
//                     <tr>
//                       <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Title</th>
//                       <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Author</th>
//                       <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Mood</th>
//                       <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
//                       <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody className="divide-y divide-gray-200">
//                     {Array.isArray(entries) && entries.map(entry => (
//                       <tr key={entry._id} className="hover:bg-gray-50/50 transition-colors duration-200">
//                         <td className="px-6 py-4">
//                           <div className="text-sm font-semibold text-gray-900 truncate max-w-xs">
//                             {entry.title || 'Untitled'}
//                           </div>
//                         </td>
//                         <td className="px-6 py-4">
//                           <div className="flex items-center">
//                             <div className="bg-gradient-to-r from-slate-500 to-gray-600 rounded-full w-8 h-8 flex items-center justify-center text-white font-semibold text-xs shadow-lg">
//                               {entry.userId?.email?.charAt(0)?.toUpperCase() || entry.userId?.name?.charAt(0)?.toUpperCase() || 'U'}
//                             </div>
//                             <div className="ml-3 text-sm text-gray-600">
//                               {entry.userId?.email || entry.userId?.name || 'N/A'}
//                             </div>
//                           </div>
//                         </td>
//                         <td className="px-6 py-4">
//                           <span className="inline-flex px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r from-yellow-100 to-amber-100 text-yellow-800">
//                             {entry.mood || 'N/A'}
//                           </span>
//                         </td>
//                         <td className="px-6 py-4 text-sm text-gray-600">
//                           {entry.createdAt ? new Date(entry.createdAt).toLocaleDateString() : 'N/A'}
//                         </td>
//                         <td className="px-6 py-4">
//                           <button
//                             onClick={() => handleDeleteEntry(entry._id)}
//                             className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg text-xs font-medium hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-md hover:shadow-lg"
//                           >
//                             Delete
//                           </button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//                 {entries.length === 0 && !loading && (
//                   <div className="text-center py-8 text-gray-500">
//                     No diary entries found
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Floating elements like home page */}
//       <div className="fixed top-1/3 left-6 w-1.5 h-1.5 bg-teal-400/60 rounded-full animate-ping pointer-events-none"></div>
//       <div className="fixed top-2/3 right-8 w-1 h-1 bg-cyan-400/50 rounded-full animate-pulse pointer-events-none"></div>
//     </div>
//   );
// };

// export default AdminDashboard;























import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("adminToken"); // ✅ from login

  // Fetch Users
  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data.users);
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
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch entries");
    }
  };

  // Delete User
  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/user/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("User deleted");
      fetchUsers();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete user");
    }
  };

  // Delete Entry
  const deleteEntry = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/entry/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Entry deleted");
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
      return;
    }
    const loadData = async () => {
      await fetchUsers();
      await fetchEntries();
      setLoading(false);
    };
    loadData();
  }, [token]);

  if (loading) return <p>Loading Admin Dashboard...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      {/* Users Table */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Users</h2>
        <table className="w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user._id}>
                  <td className="p-2 border">{user.name}</td>
                  <td className="p-2 border">{user.email}</td>
                  <td className="p-2 border">
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded"
                      onClick={() => deleteUser(user._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="p-2 text-center">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Entries Table */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Diary Entries</h2>
        <table className="w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Title</th>
              <th className="p-2 border">Mood</th>
              <th className="p-2 border">User</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {entries.length > 0 ? (
              entries.map((entry) => (
                <tr key={entry._id}>
                  <td className="p-2 border">{entry.title}</td>
                  <td className="p-2 border">{entry.mood}</td>
                  <td className="p-2 border">
                    {entry.userId ? entry.userId.email : "Unknown"}
                  </td>
                  <td className="p-2 border">
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded"
                      onClick={() => deleteEntry(entry._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-2 text-center">
                  No entries found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
