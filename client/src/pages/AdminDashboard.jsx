// ✅ Final Admin Panel UI for NeuroDiary Project
// Assumes you are using TailwindCSS with your color scheme
// Assumes token is stored in localStorage and API base is '/api/admin'

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('token');

  const fetchAdminData = async () => {
    setLoading(true);
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const userRes = await axios.get('/api/admin/users', config);
      const entryRes = await axios.get('/api/admin/entries', config);
      setUsers(userRes.data.users);
      setEntries(entryRes.data.entries);
    } catch (error) {
      toast.error('Error fetching admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (id) => {
    await axios.delete(`/api/admin/user/${id}`, { headers: { Authorization: `Bearer ${token}` } });
    fetchAdminData();
  };

  const handleDeleteEntry = async (id) => {
    await axios.delete(`/api/admin/entry/${id}`, { headers: { Authorization: `Bearer ${token}` } });
    fetchAdminData();
  };

  const handlePromoteUser = async (id) => {
    await axios.put(`/api/admin/promote/${id}`, {}, { headers: { Authorization: `Bearer ${token}` } });
    fetchAdminData();
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <h1 className="text-3xl font-bold text-primary mb-6">🛠 Admin Dashboard</h1>

      {loading ? (
        <p className="text-gray-600">Loading data...</p>
      ) : (
        <>
          {/* Users Table */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-700 mb-3">👥 Users</h2>
            <div className="overflow-x-auto bg-white shadow rounded-lg">
              <table className="w-full text-sm text-left">
                <thead className="bg-primary text-white">
                  <tr>
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">Email</th>
                    <th className="px-4 py-2">Role</th>
                    <th className="px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {/* {users.map(user => ( */}
                  {Array.isArray(users) && users.map(user => (
                    <tr key={user._id} className="border-t hover:bg-gray-50">
                      <td className="px-4 py-2">{user.name}</td>
                      <td className="px-4 py-2">{user.email}</td>
                      <td className="px-4 py-2">{user.isAdmin ? 'Admin' : 'User'}</td>
                      <td className="px-4 py-2 space-x-2">
                        {!user.isAdmin && (
                          <button
                            onClick={() => handlePromoteUser(user._id)}
                            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                          >
                            Promote
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteUser(user._id)}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Entries Table */}
          <section>
            <h2 className="text-xl font-semibold text-gray-700 mb-3">📓 Diary Entries</h2>
            <div className="overflow-x-auto bg-white shadow rounded-lg">
              <table className="w-full text-sm text-left">
                <thead className="bg-primary text-white">
                  <tr>
                    <th className="px-4 py-2">Title</th>
                    <th className="px-4 py-2">User</th>
                    <th className="px-4 py-2">Mood</th>
                    <th className="px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {/* {entries.map(entry => ( */}
                  {Array.isArray(entries) && entries.map(entry => (
                    <tr key={entry._id} className="border-t hover:bg-gray-50">
                      <td className="px-4 py-2">{entry.title}</td>
                      <td className="px-4 py-2">{entry.userId?.email || 'N/A'}</td>
                      <td className="px-4 py-2">{entry.mood}</td>
                      <td className="px-4 py-2">
                        <button
                          onClick={() => handleDeleteEntry(entry._id)}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
