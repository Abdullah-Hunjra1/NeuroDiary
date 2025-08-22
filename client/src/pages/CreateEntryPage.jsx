import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CreateEntryPage = () => {
    const [title, setTitle] = useState("");
    const [entry, setEntry] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !entry) {
            toast.error("Please fill in all fields");
            return;
        }

        setIsSubmitting(true);

        try {
            const token = localStorage.getItem("token");
            const backendUrl = import.meta.env.VITE_BACKEND_URL;

            const response = await axios.post(
                `${backendUrl}/api/diary/create`,
                { title, entry },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            
            toast.success("Diary entry created successfully! AI has analyzed your mood automatically.");
            navigate("/dashboard/my-entries");
        } catch (err) {
            toast.error("Failed to create entry");
        } finally {
            setIsSubmitting(false);
        }
    };

    const wordCount = entry.split(' ').filter(word => word.length > 0).length;
    const charCount = entry.length;

    return (
        <div className="relative min-h-screen">
            {/* Background matching Home Page */}
            <div className="fixed inset-0 -z-10">
                {/* Main gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-50/80 via-blue-50/20 to-cyan-50/30"></div>
                
                {/* Background orbs */}
                <div className="absolute top-10 right-10 w-64 h-64 bg-gradient-to-br from-teal-400/10 to-cyan-400/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 left-10 w-48 h-48 bg-gradient-to-br from-blue-400/8 to-indigo-400/8 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/3 left-1/4 w-56 h-56 bg-gradient-to-br from-cyan-400/10 to-teal-400/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-2000"></div>
                
                {/* Subtle grid pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.02)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
            </div>

            {/* Main Content */}
            <div className="relative">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 md:py-12">
                    {/* Header Section */}
                    <div className="text-center mb-10 md:mb-12">
                        <div className="inline-block p-2 bg-gradient-to-r from-teal-100/80 to-cyan-100/80 rounded-2xl mb-3">
                            <svg className="w-6 h-6 md:w-7 md:h-7 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                        </div>
                        <h1 className="text-2xl md:text-4xl font-bold text-slate-800 mb-3">
                            Create New <span className="bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">Diary Entry</span>
                        </h1>
                        <p className="text-slate-600 max-w-2xl mx-auto">
                            Share your thoughts and let our AI automatically detect your mood and provide personalized recommendations
                        </p>
                        <div className="w-16 h-0.5 bg-gradient-to-r from-teal-500 to-cyan-500 mx-auto rounded-full mt-4"></div>
                    </div>

                    {/* Form Container */}
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-slate-50/40 rounded-3xl backdrop-blur-sm shadow-xl"></div>
                        <div className="relative p-6 md:p-8">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Title Input */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        <div className="flex items-center space-x-2">
                                            <svg className="w-4 h-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                            </svg>
                                            <span>Entry Title</span>
                                        </div>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="What's on your mind today?"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        className="w-full p-4 border-2 border-slate-200/60 rounded-xl bg-white/70 backdrop-blur-sm focus:border-teal-400 focus:bg-white/90 focus:outline-none focus:ring-2 focus:ring-teal-400/20 transition-all duration-300 text-slate-800 placeholder-slate-400"
                                    />
                                </div>

                                {/* Entry Textarea */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-2">
                                                <svg className="w-4 h-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                                <span>Your Diary Entry</span>
                                            </div>
                                            <div className="text-xs text-slate-500">
                                                {wordCount} words • {charCount} characters
                                            </div>
                                        </div>
                                    </label>
                                    <textarea
                                        placeholder="Pour your heart out... Our AI will understand your emotions and provide personalized insights."
                                        value={entry}
                                        onChange={(e) => setEntry(e.target.value)}
                                        rows={8}
                                        className="w-full p-4 border-2 border-slate-200/60 rounded-xl bg-white/70 backdrop-blur-sm focus:border-teal-400 focus:bg-white/90 focus:outline-none focus:ring-2 focus:ring-teal-400/20 transition-all duration-300 text-slate-800 placeholder-slate-400 resize-none"
                                    />
                                </div>

                                {/* AI Feature Notice */}
                                <div className="flex items-start space-x-3 p-4 bg-gradient-to-r from-teal-50/80 to-cyan-50/80 rounded-xl border border-teal-200/30">
                                    <div className="flex-shrink-0">
                                        <svg className="w-5 h-5 text-teal-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-medium text-teal-800 mb-1">AI-Powered Mood Analysis</h4>
                                        <p className="text-xs text-teal-700">
                                            Our advanced AI will automatically analyze your writing to detect your mood, sentiment score, and provide personalized recommendations and writing prompts.
                                        </p>
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting || !title || !entry}
                                        className="flex-1 sm:flex-none sm:px-8 py-4 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 disabled:from-slate-400 disabled:to-slate-400 text-white font-medium rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:scale-100 disabled:cursor-not-allowed shadow-lg hover:shadow-xl disabled:shadow-md"
                                    >
                                        <div className="flex items-center justify-center space-x-2">
                                            {isSubmitting ? (
                                                <>
                                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    <span>Creating Entry...</span>
                                                </>
                                            ) : (
                                                <>
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                    <span>Save Entry</span>
                                                </>
                                            )}
                                        </div>
                                    </button>
                                    
                                    <button
                                        type="button"
                                        onClick={() => navigate("/my-entries")}
                                        className="flex-1 sm:flex-none sm:px-8 py-4 bg-white/70 hover:bg-white/90 text-slate-700 font-medium rounded-xl border-2 border-slate-200/60 hover:border-slate-300/60 transition-all duration-300 backdrop-blur-sm"
                                    >
                                        <div className="flex items-center justify-center space-x-2">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                            <span>Cancel</span>
                                        </div>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Floating elements matching Home Page */}
            <div className="fixed top-1/4 left-6 w-1.5 h-1.5 bg-teal-400/60 rounded-full animate-ping pointer-events-none"></div>
            <div className="fixed top-2/3 right-8 w-1 h-1 bg-cyan-400/50 rounded-full animate-pulse pointer-events-none"></div>
            <div className="fixed bottom-1/4 right-12 w-1.5 h-1.5 bg-blue-400/40 rounded-full animate-bounce pointer-events-none"></div>
        </div>
    );
};

export default CreateEntryPage;