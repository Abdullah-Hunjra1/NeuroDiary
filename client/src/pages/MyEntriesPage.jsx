import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const MyEntriesPage = () => {
  const [entries, setEntries] = useState([]);

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
        setEntries([]); // Fallback to empty array
      }
    } catch {
      toast.error("Failed to load entries");
      setEntries([]); // Prevents map() error
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
      toast.success("Entry deleted");
      setEntries(entries.filter((e) => e._id !== id));
    } catch {
      toast.error("Failed to delete entry");
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">My Diary Entries</h2>
      {entries.length === 0 ? (
        <p className="text-gray-500">No entries yet.</p>
      ) : (
        <div className="space-y-4">
          {entries.map((entry) => (
            <div
              key={entry._id}
              className="border p-4 rounded-lg flex justify-between items-start"
            >
              <div>
                <h3 className="font-semibold">{entry.title}</h3>
                <p className="text-sm text-gray-500">{entry.mood}</p>
                <p className="mt-2 text-gray-700">{entry.entry}</p>
              </div>
              <button
                onClick={() => deleteEntry(entry._id)}
                className="text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyEntriesPage;
