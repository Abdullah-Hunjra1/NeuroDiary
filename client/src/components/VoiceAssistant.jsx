// import React, { useState } from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify';

// const VoiceAssistant = () => {
//     const [isListening, setIsListening] = useState(false);
//     const [transcript, setTranscript] = useState('');
//     const [response, setResponse] = useState('');

//     const recognition = new window.webkitSpeechRecognition(); // Chrome-only
//     recognition.continuous = false;
//     recognition.lang = 'en-US';

//     const startListening = () => {
//         setTranscript('');
//         setResponse('');
//         setIsListening(true);
//         recognition.start();

//         recognition.onresult = (event) => {
//             const speech = event.results[0][0].transcript;
//             setTranscript(speech);
//             sendCommandToServer(speech);
//         };

//         recognition.onerror = (err) => {
//             console.error('Speech error:', err);
//             toast.error('Microphone error. Try again.');
//             setIsListening(false);
//         };

//         recognition.onend = () => {
//             setIsListening(false);
//         };
//     };

//     const sendCommandToServer = async (speechText) => {
//         const token = localStorage.getItem('token');

//         if (!token) {
//             toast.error("You're not logged in");
//             return;
//         }

//         try {
//             const res = await axios.post(
//                 'http://localhost:5000/api/voice-command',
//                 { command: speechText },
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 }
//             );

//             if (res.data.success) {
//                 setResponse(res.data.response);
//             } else {
//                 toast.error('Voice command failed');
//             }
//         } catch (err) {
//             console.error('VOICE ERROR:', err.response?.data || err.message);
//             toast.error('Server error');
//         }
//     };

//     return (
//         <div className="p-6 bg-white rounded-xl shadow-lg max-w-lg mx-auto text-center">
//             <h2 className="text-2xl font-bold text-primary mb-3">🎙 Voice Assistant</h2>

//             <button
//                 onClick={startListening}
//                 className={`px-5 py-2 rounded-full text-white ${isListening ? 'bg-red-500' : 'bg-blue-600 hover:bg-blue-700'
//                     }`}
//             >
//                 {isListening ? 'Listening...' : 'Start Speaking'}
//             </button>

//             <div className="mt-4 text-left">
//                 {transcript && (
//                     <p className="text-sm text-gray-500">
//                         <strong>You said:</strong> {transcript}
//                     </p>
//                 )}
//                 {response && (
//                     <div className="mt-2 p-3 bg-gray-100 rounded-md text-gray-700">
//                         <strong>Response:</strong>
//                         <div className="mt-1 text-sm">
//                             {typeof response === 'string' ? (
//                                 <p>{response}</p>
//                             ) : (
//                                 Object.entries(response).map(([mood, count]) => (
//                                     <p key={mood}>
//                                         <span className="font-medium">{mood}:</span> {count}
//                                     </p>
//                                 ))
//                             )}
//                         </div>
//                     </div>
//                 )}

//             </div>
//         </div>
//     );
// };

// export default VoiceAssistant;












import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const VoiceAssistant = () => {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [response, setResponse] = useState('');

    const recognition = new window.webkitSpeechRecognition(); // Chrome-only
    recognition.continuous = false;
    recognition.lang = 'en-US';

    const startListening = () => {
        setTranscript('');
        setResponse('');
        setIsListening(true);
        recognition.start();

        recognition.onresult = (event) => {
            const speech = event.results[0][0].transcript;
            setTranscript(speech);
            sendCommandToServer(speech);
        };

        recognition.onerror = (err) => {
            console.error('Speech error:', err);
            toast.error('Microphone error. Try again.');
            setIsListening(false);
        };

        recognition.onend = () => {
            setIsListening(false);
        };
    };

    const sendCommandToServer = async (speechText) => {
        const token = localStorage.getItem('token');

        if (!token) {
            toast.error("You're not logged in");
            return;
        }

        try {
            const backendUrl = import.meta.env.VITE_BACKEND_URL;

            const res = await axios.post(
                `${backendUrl}/api/voice-command`,
                { command: speechText },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (res.data.success) {
                setResponse(res.data.response);
            } else {
                toast.error('Voice command failed');
            }
        } catch (err) {
            console.error('VOICE ERROR:', err.response?.data || err.message);
            toast.error('Server error');
        }
    };

    return (
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-2'>
            <div className="relative max-w-2xl mx-auto">
                {/* Background Elements */}
                <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 via-cyan-500/5 to-blue-500/10 rounded-3xl blur-3xl"></div>

                {/* Main Container */}
                <div className="relative backdrop-blur-sm bg-white/80 border border-slate-200/60 rounded-3xl shadow-2xl shadow-teal-500/10 overflow-hidden">
                    {/* Header Section */}
                    <div className="relative bg-gradient-to-r from-teal-50 via-cyan-50 to-blue-50 px-8 py-6 border-b border-slate-200/50">
                        <div className="flex items-center justify-center space-x-3">
                            <div className="relative">
                                <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
                                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                                    </svg>
                                </div>
                                {isListening && (
                                    <div className="absolute -inset-2 border-2 border-red-500 rounded-2xl animate-pulse"></div>
                                )}
                            </div>
                            <div className="text-center">
                                <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-700 to-slate-600 bg-clip-text text-transparent">
                                    Voice Assistant
                                </h2>
                                <p className="text-sm text-slate-500 mt-1">
                                    {isListening ? 'Listening to your voice...' : 'Click to start speaking'}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-8">
                        {/* Voice Button */}
                        <div className="text-center mb-8">
                            <button
                                onClick={startListening}
                                className={`group relative px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 ${isListening
                                    ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg shadow-red-500/30 focus:ring-red-500/30'
                                    : 'bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white shadow-lg shadow-teal-500/30 focus:ring-teal-500/30'
                                    }`}
                            >
                                <div className="flex items-center space-x-3">
                                    {isListening ? (
                                        <>
                                            <div className="flex space-x-1">
                                                <div className="w-1 h-4 bg-white rounded-full animate-pulse"></div>
                                                <div className="w-1 h-6 bg-white rounded-full animate-pulse delay-150"></div>
                                                <div className="w-1 h-4 bg-white rounded-full animate-pulse delay-300"></div>
                                            </div>
                                            <span>Listening...</span>
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                                            </svg>
                                            <span>Start Speaking</span>
                                        </>
                                    )}
                                </div>

                                {/* Button glow effect */}
                                <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isListening
                                    ? 'bg-gradient-to-r from-red-400/20 to-red-500/20'
                                    : 'bg-gradient-to-r from-teal-400/20 to-cyan-400/20'
                                    }`}></div>
                            </button>
                        </div>

                        {/* Transcript Section */}
                        {transcript && (
                            <div className="mb-6 p-6 bg-gradient-to-r from-slate-50 to-slate-100/50 border border-slate-200 rounded-2xl">
                                <div className="flex items-start space-x-3">
                                    <div className="w-8 h-8 bg-gradient-to-br from-teal-100 to-cyan-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <svg className="w-4 h-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-sm font-semibold text-slate-700 mb-2">You said:</h4>
                                        <p className="text-slate-600 leading-relaxed">"{transcript}"</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Response Section */}
                        {response && (
                            <div className="p-6 bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 border border-teal-200/50 rounded-2xl shadow-inner">
                                <div className="flex items-start space-x-3">
                                    <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
                                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                        </svg>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-sm font-semibold text-slate-700 mb-3">AI Response:</h4>
                                        <div className="text-slate-700">
                                            {typeof response === 'string' ? (
                                                <p className="leading-relaxed">{response}</p>
                                            ) : (
                                                <div className="space-y-2">
                                                    {Object.entries(response).map(([mood, count], index) => (
                                                        <div key={mood} className="flex items-center justify-between p-3 bg-white/60 rounded-xl border border-teal-100">
                                                            <div className="flex items-center space-x-3">
                                                                <div className="w-3 h-3 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full"></div>
                                                                <span className="font-medium text-slate-700 capitalize">{mood}</span>
                                                            </div>
                                                            <span className="px-3 py-1 bg-gradient-to-r from-teal-100 to-cyan-100 text-teal-700 rounded-full text-sm font-semibold">
                                                                {count}
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Empty State */}
                        {!transcript && !response && (
                            <div className="text-center py-8 text-slate-400">
                                <svg className="w-16 h-16 mx-auto mb-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                                </svg>
                                <p className="text-lg font-medium mb-2">Ready to listen</p>
                                <p className="text-sm">Click the button above to start a voice command</p>
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="px-8 pb-6">
                        <div className="flex items-center justify-center space-x-2 text-xs text-slate-400">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>Works best with Chrome browser</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VoiceAssistant;