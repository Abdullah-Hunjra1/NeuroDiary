import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CreateEntryPage = () => {
    const [title, setTitle] = useState("");
    const [entry, setEntry] = useState("");
    const [mood, setMood] = useState("Neutral");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !entry) {
            toast.error("Please fill in all fields");
            return;
        }

        try {
            const token = localStorage.getItem("token");
            const backendUrl = import.meta.env.VITE_BACKEND_URL;

            await axios.post(
                `${backendUrl}/api/diary/create`,
                { title, entry, mood },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            toast.success("Diary entry created successfully");
            navigate("/my-entries");
        } catch (err) {
            toast.error("Failed to create entry");
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">Create New Diary Entry</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-3 border rounded-lg"
                />
                <textarea
                    placeholder="Write your diary entry..."
                    value={entry}
                    onChange={(e) => setEntry(e.target.value)}
                    rows={6}
                    className="w-full p-3 border rounded-lg"
                />
                <select
                    value={mood}
                    onChange={(e) => setMood(e.target.value)}
                    className="w-full p-3 border rounded-lg"
                >
                    <option>Happy</option>
                    <option>Sad</option>
                    <option>Neutral</option>
                    <option>Excited</option>
                    <option>Stressed</option>
                    <option>Calm</option>
                </select>
                <button
                    type="submit"
                    className="bg-indigo-600 text-white px-6 py-2 rounded-lg"
                >
                    Save Entry
                </button>
            </form>
        </div>
    );
};

export default CreateEntryPage;
