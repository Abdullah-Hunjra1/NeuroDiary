import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AppContext } from '../../context/AppContext';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer
} from 'recharts';       

const AIInsights = () => {
  const { token, backendUrl } = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const [insights, setInsights] = useState(null);
  const [error, setError] = useState(null);
  const [question, setQuestion] = useState('');
  const [reply, setReply] = useState(null);

  useEffect(() => {
    let mounted = true;
    const fetchInsights = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${backendUrl}/api/insights`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!mounted) return;
        setInsights(res.data);
      } catch (err) {
        setError('Failed to load AI insights');
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchInsights();
    return () => { mounted = false; };
  }, [backendUrl, token]);

  const handleQuery = async () => {
    if (!question.trim()) return;
    setReply('…');
    try {
      const res = await axios.post(`${backendUrl}/api/insights/query`, { question }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setReply(res.data.reply);
    } catch (e) {
      setReply(res.data.reply || 'No answer from AI.');
    }
  };

  if (loading) return <div className="p-6">Loading AI insights…</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  const moodData = insights?.moodTrends ? Object.keys(insights.moodTrends).map(k => ({ name: k, value: insights.moodTrends[k] })) : [];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">AI Insights</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="card p-4">
          <h3 className="text-lg font-medium">Summary</h3>
          <p className="mt-2">{insights.summary || 'No summary available.'}</p>
        </div>

        <div className="card p-4">
          <h3 className="text-lg font-medium">Recommendations</h3>
          <ul className="mt-2 list-disc list-inside">
            {(insights.recommendations || []).length ? insights.recommendations.map((r, i) => <li key={i}>{r}</li>) : <li>No recommendations</li>}
          </ul>
        </div>

        <div className="card p-4 md:col-span-2">
          <h3 className="text-lg font-medium">Mood distribution</h3>
          <div style={{ height: 220 }}>
            <ResponsiveContainer>
              <BarChart data={moodData}>
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="value" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card p-4 md:col-span-2">
          <h3 className="text-lg font-medium">Highlights</h3>
          <div className="mt-2 space-y-2">
            {(insights.highlights || []).length ? insights.highlights.map((h, i) => (
              <div key={i} className="p-3 border rounded">
                <div className="text-sm text-gray-500">{new Date(h.date).toLocaleDateString()}</div>
                <div className="mt-1">"{h.quote}"</div>
              </div>
            )) : <div>No highlights available</div>}
          </div>
        </div>
      </div>

      <div className="card p-4">
        <h3 className="text-lg font-medium">Ask a question about your entries</h3>
        <div className="mt-2 flex gap-2">
          <input value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="Why have I been more stressed?" className="flex-1 p-2 border rounded" />
          <button onClick={handleQuery} className="btn px-4 py-2 bg-blue-600 text-white rounded">Ask</button>
        </div>
        {reply && <div className="mt-3 p-3 bg-gray-50 rounded whitespace-pre-wrap">{reply}</div>}
      </div>
    </div>
  );
};

export default AIInsights;
