// ✅ Mood Analytics Dashboard UI
// Combines LineChart (mood over time) + PieChart (mood ratio)
// Uses Recharts + TailwindCSS + React

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {toast} from 'react-toastify';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';

const moodColors = {
  Happy: '#10B981', Sad: '#3B82F6', Anxious: '#F59E0B', Angry: '#EF4444', Neutral: '#6B7280', Grateful: '#8B5CF6'
};

const MoodAnalyticsDashboard = () => {
  const [moodStats, setMoodStats] = useState([]);
  const [timelineData, setTimelineData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };

      const [moodRes, timeRes] = await Promise.all([
        axios.get('/api/stats/mood', config),
        axios.get('/api/stats/timeline', config),
      ]);

      const moodArray = Object.entries(moodRes.data.moodStats).map(([mood, count]) => ({ name: mood, value: count }));
      setMoodStats(moodArray);

      const timeRaw = timeRes.data.timeline;
      const formattedTimeline = Object.entries(timeRaw).map(([date, moods]) => ({ date, ...moods }));
      setTimelineData(formattedTimeline);

    } catch (err) {
      console.error(err);
      toast.error('Failed to load analytics');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-primary mb-6">📈 Mood Analytics Dashboard</h1>

      {loading ? (
        <p className="text-gray-500">Loading analytics...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Pie Chart */}
          <div className="bg-white p-4 shadow-md rounded-lg">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Overall Mood Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={moodStats}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {moodStats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={moodColors[entry.name] || '#8884d8'} />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Line Chart */}
          <div className="bg-white p-4 shadow-md rounded-lg">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Mood Over Time</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={timelineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" stroke="#374151" />
                <YAxis allowDecimals={false} stroke="#374151" />
                <Tooltip />
                {Object.keys(moodColors).map(mood => (
                  <Line
                    key={mood}
                    type="monotone"
                    dataKey={mood}
                    stroke={moodColors[mood]}
                    strokeWidth={2}
                    dot={false}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default MoodAnalyticsDashboard;
