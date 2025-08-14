



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













import React, { useEffect, useState } from 'react';

const AdminDashboard = () => {
  // Mock data for demonstration
  const [users, setUsers] = useState([
    { _id: '1', name: 'John Doe', email: 'john@example.com', isAdmin: false },
    { _id: '2', name: 'Jane Smith', email: 'jane@example.com', isAdmin: true },
    { _id: '3', name: 'Bob Johnson', email: 'bob@example.com', isAdmin: false }
  ]);
  const [entries, setEntries] = useState([
    { _id: '1', title: 'My First Diary Entry', mood: 'Happy', userId: { email: 'john@example.com' } },
    { _id: '2', title: 'Thoughts on Today', mood: 'Peaceful', userId: { email: 'jane@example.com' } },
    { _id: '3', title: 'Weekend Adventures', mood: 'Excited', userId: { email: 'bob@example.com' } }
  ]);
  const [loading, setLoading] = useState(false);

  // Simulate API calls with mock functions
  const fetchAdminData = async () => {
    setLoading(true);
    // Simulate API delay
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const handleDeleteUser = async (id) => {
    setUsers(users.filter(user => user._id !== id));
  };

  const handleDeleteEntry = async (id) => {
    setEntries(entries.filter(entry => entry._id !== id));
  };

  const handlePromoteUser = async (id) => {
    setUsers(users.map(user => 
      user._id === id ? { ...user, isAdmin: true } : user
    ));
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-800">Admin Dashboard</h1>
              <p className="text-sm text-gray-600 mt-1">Manage users and diary entries</p>
            </div>
            <div className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm font-medium">
              Administrator
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-6">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-600 border-t-transparent"></div>
            <p className="text-gray-600 ml-3">Loading admin data...</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white rounded-lg p-4 shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Users</p>
                    <p className="text-2xl font-semibold text-blue-600 mt-1">
                      {Array.isArray(users) ? users.length : 0}
                    </p>
                  </div>
                  <div className="bg-blue-100 rounded-full p-2">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-4 shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Entries</p>
                    <p className="text-2xl font-semibold text-green-600 mt-1">
                      {Array.isArray(entries) ? entries.length : 0}
                    </p>
                  </div>
                  <div className="bg-green-100 rounded-full p-2">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Users Section */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="px-4 py-3 border-b">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-800">User Management</h2>
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    {Array.isArray(users) ? users.length : 0} users
                  </span>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {Array.isArray(users) && users.map(user => (
                      <tr key={user._id} className="hover:bg-gray-50">
                        <td className="px-4 py-3">
                          <div className="flex items-center">
                            <div className="bg-blue-600 rounded-full w-8 h-8 flex items-center justify-center text-white font-medium text-sm">
                              {user.name?.charAt(0)?.toUpperCase() || 'U'}
                            </div>
                            <div className="ml-3 text-sm font-medium text-gray-900">{user.name}</div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">{user.email}</td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                            user.isAdmin 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {user.isAdmin ? 'Admin' : 'User'}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm space-x-2">
                          {!user.isAdmin && (
                            <button
                              onClick={() => handlePromoteUser(user._id)}
                              className="bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700"
                            >
                              Promote
                            </button>
                          )}
                          <button
                            onClick={() => handleDeleteUser(user._id)}
                            className="bg-red-600 text-white px-3 py-1 rounded text-xs hover:bg-red-700"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Entries Section */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="px-4 py-3 border-b">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-800">Diary Entries</h2>
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                    {Array.isArray(entries) ? entries.length : 0} entries
                  </span>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Author</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Mood</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {Array.isArray(entries) && entries.map(entry => (
                      <tr key={entry._id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm font-medium text-gray-900 truncate max-w-xs">
                          {entry.title}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center">
                            <div className="bg-gray-600 rounded-full w-6 h-6 flex items-center justify-center text-white font-medium text-xs">
                              {entry.userId?.email?.charAt(0)?.toUpperCase() || 'U'}
                            </div>
                            <div className="ml-2 text-sm text-gray-600">
                              {entry.userId?.email || 'N/A'}
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
                            {entry.mood}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <button
                            onClick={() => handleDeleteEntry(entry._id)}
                            className="bg-red-600 text-white px-3 py-1 rounded text-xs hover:bg-red-700"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;