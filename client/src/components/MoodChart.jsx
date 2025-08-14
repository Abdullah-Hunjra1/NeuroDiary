// ✅ Mood Chart UI — React + Tailwind + Recharts
// This file assumes Tailwind is already configured
// and the token is stored in localStorage

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { toast } from 'react-toastify';

const moodColors = {
    Happy: '#10B981',      // Emerald
    Sad: '#3B82F6',        // Blue
    Anxious: '#F59E0B',    // Amber
    Angry: '#EF4444',      // Red
    Neutral: '#6B7280',    // Gray
    Grateful: '#8B5CF6'    // Violet
};

const MoodChart = () => {
    const [moodStats, setMoodStats] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchMoodStats = async () => {
        setLoading(true);
        try {
            const res = await axios.get('/api/stats/mood', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });

            const stats = res.data.moodStats;
            const formatted = Object.keys(stats).map(key => ({
                mood: key,
                count: stats[key],
            }));
            setMoodStats(formatted);
        } catch (err) {
            console.error(err);
            toast.error('Failed to load mood stats');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) return; // ✅ avoid fetch if not logged in
        fetchMoodStats();
    }, []);


    return (
        <div className="bg-white shadow-md rounded-xl p-6 max-w-4xl mx-auto mt-8">
            <h2 className="text-2xl font-bold text-primary mb-4">📊 Mood Statistics</h2>
            {loading ? (
                <p className="text-gray-500">Loading chart...</p>
            ) : moodStats.length === 0 ? (
                <p className="text-gray-400">No mood data available yet.</p>
            ) : (
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={moodStats}>
                        <XAxis dataKey="mood" stroke="#374151" />
                        <YAxis allowDecimals={false} stroke="#374151" />
                        <Tooltip />
                        <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                            {moodStats.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={moodColors[entry.mood] || '#60A5FA'}
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            )}
        </div>
    );
};

export default MoodChart;
