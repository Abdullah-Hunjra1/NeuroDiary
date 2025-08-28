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










// import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify';

// const VoiceAssistant = () => {
//     const [isListening, setIsListening] = useState(false);
//     const [transcript, setTranscript] = useState('');
//     const [response, setResponse] = useState('');
//     const [isProcessing, setIsProcessing] = useState(false);
//     const [error, setError] = useState('');
//     const [conversationHistory, setConversationHistory] = useState([]);
//     const [audioLevel, setAudioLevel] = useState(0);
    
//     const recognitionRef = useRef(null);
//     const audioContextRef = useRef(null);
//     const analyserRef = useRef(null);
//     const animationRef = useRef(null);

//     // Check browser support
//     const [isSupported, setIsSupported] = useState(true);

//     useEffect(() => {
//         // Check for speech recognition support
//         if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
//             setIsSupported(false);
//             setError('Speech recognition is not supported in this browser. Please use Chrome or Edge.');
//             return;
//         }

//         // Initialize speech recognition
//         const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//         const recognition = new SpeechRecognition();
        
//         recognition.continuous = false;
//         recognition.interimResults = true;
//         recognition.lang = 'en-US';
//         recognition.maxAlternatives = 1;

//         recognition.onstart = () => {
//             setIsListening(true);
//             setError('');
//             startAudioVisualizer();
//         };

//         recognition.onresult = (event) => {
//             let interimTranscript = '';
//             let finalTranscript = '';

//             for (let i = event.resultIndex; i < event.results.length; i++) {
//                 const transcript = event.results[i][0].transcript;
//                 if (event.results[i].isFinal) {
//                     finalTranscript += transcript;
//                 } else {
//                     interimTranscript += transcript;
//                 }
//             }

//             setTranscript(finalTranscript || interimTranscript);

//             if (finalTranscript) {
//                 sendCommandToServer(finalTranscript.trim());
//             }
//         };

//         recognition.onerror = (event) => {
//             console.error('Speech recognition error:', event);
//             setIsListening(false);
//             stopAudioVisualizer();
            
//             switch (event.error) {
//                 case 'no-speech':
//                     setError('No speech was detected. Please try again.');
//                     break;
//                 case 'audio-capture':
//                     setError('No microphone found. Please check your microphone settings.');
//                     break;
//                 case 'not-allowed':
//                     setError('Microphone access denied. Please allow microphone access and try again.');
//                     break;
//                 case 'network':
//                     setError('Network error. Please check your internet connection.');
//                     break;
//                 default:
//                     setError(`Speech recognition error: ${event.error}`);
//             }
//             toast.error(`Voice error: ${event.error}`);
//         };

//         recognition.onend = () => {
//             setIsListening(false);
//             stopAudioVisualizer();
//         };

//         recognitionRef.current = recognition;

//         return () => {
//             if (recognitionRef.current) {
//                 recognitionRef.current.stop();
//             }
//             stopAudioVisualizer();
//         };
//     }, []);

//     const startAudioVisualizer = async () => {
//         try {
//             const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//             audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
//             analyserRef.current = audioContextRef.current.createAnalyser();
//             const source = audioContextRef.current.createMediaStreamSource(stream);
            
//             source.connect(analyserRef.current);
//             analyserRef.current.fftSize = 256;
            
//             const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
            
//             const updateAudioLevel = () => {
//                 if (isListening && analyserRef.current) {
//                     analyserRef.current.getByteFrequencyData(dataArray);
//                     const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
//                     setAudioLevel(average);
//                     animationRef.current = requestAnimationFrame(updateAudioLevel);
//                 }
//             };
            
//             updateAudioLevel();
//         } catch (err) {
//             console.error('Audio visualizer error:', err);
//         }
//     };

//     const stopAudioVisualizer = () => {
//         if (animationRef.current) {
//             cancelAnimationFrame(animationRef.current);
//         }
//         if (audioContextRef.current) {
//             audioContextRef.current.close();
//         }
//         setAudioLevel(0);
//     };

//     const startListening = () => {
//         if (!isSupported) {
//             toast.error('Speech recognition not supported in this browser');
//             return;
//         }

//         setTranscript('');
//         setResponse('');
//         setError('');
//         setIsProcessing(false);

//         try {
//             recognitionRef.current.start();
//         } catch (err) {
//             console.error('Failed to start recognition:', err);
//             toast.error('Failed to start voice recognition');
//         }
//     };

//     const stopListening = () => {
//         if (recognitionRef.current && isListening) {
//             recognitionRef.current.stop();
//         }
//     };

//     const sendCommandToServer = async (speechText) => {
//         if (!speechText || speechText.trim().length === 0) {
//             toast.error('No speech detected');
//             return;
//         }

//         const token = localStorage.getItem('token');
//         if (!token) {
//             toast.error("You're not logged in");
//             return;
//         }

//         setIsProcessing(true);

//         try {
//             const backendUrl = import.meta.env.VITE_BACKEND_URL;

//             const res = await axios.post(
//                 `${backendUrl}/api/voice-command`,
//                 { command: speechText },
//                 {
//                     headers: {
//                         'Authorization': `Bearer ${token}`,
//                         'Content-Type': 'application/json'
//                     },
//                     timeout: 30000 // 30 second timeout
//                 }
//             );

//             if (res.data.success) {
//                 const newResponse = res.data.response;
//                 setResponse(newResponse);
                
//                 // Add to conversation history
//                 const newEntry = {
//                     id: Date.now(),
//                     user: speechText,
//                     assistant: typeof newResponse === 'string' ? newResponse : JSON.stringify(newResponse),
//                     timestamp: new Date(),
//                     intent: res.data.intent,
//                     type: res.data.type
//                 };
                
//                 setConversationHistory(prev => [newEntry, ...prev.slice(0, 4)]); // Keep last 5
//                 toast.success('Command processed successfully');
//             } else {
//                 const errorMsg = res.data.message || 'Voice command failed';
//                 setError(errorMsg);
//                 toast.error(errorMsg);
//             }
//         } catch (err) {
//             console.error('Voice command error:', err);
//             const errorMessage = err.response?.data?.message || err.message || 'Server error occurred';
//             setError(errorMessage);
//             toast.error(`Error: ${errorMessage}`);
//         } finally {
//             setIsProcessing(false);
//         }
//     };

//     const clearConversation = () => {
//         setTranscript('');
//         setResponse('');
//         setError('');
//         setConversationHistory([]);
//         toast.info('Conversation cleared');
//     };

//     const formatResponse = (response) => {
//         if (typeof response === 'string') {
//             return <p className="leading-relaxed">{response}</p>;
//         }
        
//         if (typeof response === 'object') {
//             return (
//                 <div className="space-y-2">
//                     {Object.entries(response).map(([key, value], index) => (
//                         <div key={key} className="flex items-center justify-between p-3 bg-white/60 rounded-xl border border-teal-100">
//                             <div className="flex items-center space-x-3">
//                                 <div className="w-3 h-3 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full"></div>
//                                 <span className="font-medium text-slate-700 capitalize">{key}</span>
//                             </div>
//                             <span className="px-3 py-1 bg-gradient-to-r from-teal-100 to-cyan-100 text-teal-700 rounded-full text-sm font-semibold">
//                                 {value}
//                             </span>
//                         </div>
//                     ))}
//                 </div>
//             );
//         }
        
//         return <p>{String(response)}</p>;
//     };

//     if (!isSupported) {
//         return (
//             <div className="max-w-2xl mx-auto p-8 bg-red-50 border border-red-200 rounded-2xl">
//                 <div className="text-center">
//                     <svg className="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                     </svg>
//                     <h3 className="text-lg font-semibold text-red-800 mb-2">Browser Not Supported</h3>
//                     <p className="text-red-600">Please use Chrome, Edge, or Safari for voice features.</p>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-2'>
//             <div className="relative max-w-2xl mx-auto">
//                 {/* Background Elements */}
//                 <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 via-cyan-500/5 to-blue-500/10 rounded-3xl blur-3xl"></div>

//                 {/* Main Container */}
//                 <div className="relative backdrop-blur-sm bg-white/80 border border-slate-200/60 rounded-3xl shadow-2xl shadow-teal-500/10 overflow-hidden">
//                     {/* Header Section */}
//                     <div className="relative bg-gradient-to-r from-teal-50 via-cyan-50 to-blue-50 px-8 py-6 border-b border-slate-200/50">
//                         <div className="flex items-center justify-between">
//                             <div className="flex items-center space-x-3">
//                                 <div className="relative">
//                                     <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
//                                         <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
//                                         </svg>
//                                     </div>
//                                     {isListening && (
//                                         <div 
//                                             className="absolute -inset-2 border-2 border-red-500 rounded-2xl animate-pulse"
//                                             style={{
//                                                 boxShadow: `0 0 ${10 + audioLevel / 5}px rgba(239, 68, 68, 0.5)`
//                                             }}
//                                         ></div>
//                                     )}
//                                 </div>
//                                 <div>
//                                     <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-700 to-slate-600 bg-clip-text text-transparent">
//                                         Voice Assistant
//                                     </h2>
//                                     <p className="text-sm text-slate-500 mt-1">
//                                         {isListening ? 'Listening to your voice...' : 
//                                          isProcessing ? 'Processing your request...' : 
//                                          'Click to start speaking'}
//                                     </p>
//                                 </div>
//                             </div>
                            
//                             {conversationHistory.length > 0 && (
//                                 <button
//                                     onClick={clearConversation}
//                                     className="px-3 py-1 text-xs text-slate-500 hover:text-slate-700 bg-white/50 hover:bg-white/80 rounded-lg transition-colors"
//                                 >
//                                     Clear
//                                 </button>
//                             )}
//                         </div>
//                     </div>

//                     {/* Content Section */}
//                     <div className="p-8">
//                         {/* Voice Button */}
//                         <div className="text-center mb-8">
//                             <button
//                                 onClick={isListening ? stopListening : startListening}
//                                 disabled={isProcessing}
//                                 className={`group relative px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 disabled:opacity-50 disabled:cursor-not-allowed ${
//                                     isListening
//                                         ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg shadow-red-500/30 focus:ring-red-500/30'
//                                         : isProcessing
//                                         ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg shadow-yellow-500/30'
//                                         : 'bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white shadow-lg shadow-teal-500/30 focus:ring-teal-500/30'
//                                 }`}
//                             >
//                                 <div className="flex items-center space-x-3">
//                                     {isListening ? (
//                                         <>
//                                             <div className="flex space-x-1">
//                                                 <div className="w-1 h-4 bg-white rounded-full animate-pulse"></div>
//                                                 <div className="w-1 h-6 bg-white rounded-full animate-pulse delay-150"></div>
//                                                 <div className="w-1 h-4 bg-white rounded-full animate-pulse delay-300"></div>
//                                             </div>
//                                             <span>Stop Listening</span>
//                                         </>
//                                     ) : isProcessing ? (
//                                         <>
//                                             <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
//                                             <span>Processing...</span>
//                                         </>
//                                     ) : (
//                                         <>
//                                             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
//                                             </svg>
//                                             <span>Start Speaking</span>
//                                         </>
//                                     )}
//                                 </div>

//                                 {/* Button glow effect */}
//                                 <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
//                                     isListening
//                                         ? 'bg-gradient-to-r from-red-400/20 to-red-500/20'
//                                         : isProcessing
//                                         ? 'bg-gradient-to-r from-yellow-400/20 to-orange-400/20'
//                                         : 'bg-gradient-to-r from-teal-400/20 to-cyan-400/20'
//                                 }`}></div>
//                             </button>
//                         </div>

//                         {/* Error Display */}
//                         {error && (
//                             <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl">
//                                 <div className="flex items-center space-x-2">
//                                     <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                                     </svg>
//                                     <p className="text-red-700 text-sm">{error}</p>
//                                 </div>
//                             </div>
//                         )}

//                         {/* Transcript Section */}
//                         {transcript && (
//                             <div className="mb-6 p-6 bg-gradient-to-r from-slate-50 to-slate-100/50 border border-slate-200 rounded-2xl">
//                                 <div className="flex items-start space-x-3">
//                                     <div className="w-8 h-8 bg-gradient-to-br from-teal-100 to-cyan-100 rounded-lg flex items-center justify-center flex-shrink-0">
//                                         <svg className="w-4 h-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//                                         </svg>
//                                     </div>
//                                     <div className="flex-1 min-w-0">
//                                         <h4 className="text-sm font-semibold text-slate-700 mb-2">You said:</h4>
//                                         <p className="text-slate-600 leading-relaxed">"{transcript}"</p>
//                                     </div>
//                                 </div>
//                             </div>
//                         )}

//                         {/* Response Section */}
//                         {response && (
//                             <div className="mb-6 p-6 bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 border border-teal-200/50 rounded-2xl shadow-inner">
//                                 <div className="flex items-start space-x-3">
//                                     <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
//                                         <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
//                                         </svg>
//                                     </div>
//                                     <div className="flex-1 min-w-0">
//                                         <h4 className="text-sm font-semibold text-slate-700 mb-3">AI Response:</h4>
//                                         <div className="text-slate-700">
//                                             {formatResponse(response)}
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         )}

//                         {/* Conversation History */}
//                         {conversationHistory.length > 0 && (
//                             <div className="mb-6">
//                                 <h4 className="text-sm font-semibold text-slate-700 mb-3">Recent Conversations:</h4>
//                                 <div className="space-y-3 max-h-60 overflow-y-auto">
//                                     {conversationHistory.map((entry) => (
//                                         <div key={entry.id} className="p-3 bg-slate-50/50 rounded-xl border border-slate-200/50 text-xs">
//                                             <div className="flex items-center justify-between mb-2">
//                                                 <span className="text-slate-500">
//                                                     {entry.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
//                                                 </span>
//                                                 {entry.intent && (
//                                                     <span className="px-2 py-1 bg-teal-100 text-teal-700 rounded-full text-xs">
//                                                         {entry.intent}
//                                                     </span>
//                                                 )}
//                                             </div>
//                                             <div className="text-slate-600">
//                                                 <strong>You:</strong> {entry.user}
//                                             </div>
//                                             <div className="text-slate-600 mt-1">
//                                                 <strong>AI:</strong> {entry.assistant.substring(0, 100)}...
//                                             </div>
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>
//                         )}

//                         {/* Empty State */}
//                         {!transcript && !response && !error && conversationHistory.length === 0 && (
//                             <div className="text-center py-8 text-slate-400">
//                                 <svg className="w-16 h-16 mx-auto mb-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
//                                 </svg>
//                                 <p className="text-lg font-medium mb-2">Ready to listen</p>
//                                 <p className="text-sm">Click the button above to start a voice command</p>
//                                 <div className="mt-4 text-xs text-slate-400">
//                                     Try saying: "How am I feeling?", "Show my mood trends", or "Create a new diary entry"
//                                 </div>
//                             </div>
//                         )}

//                         {/* Quick Command Buttons */}
//                         <div className="mt-8">
//                             <h4 className="text-sm font-semibold text-slate-700 mb-3">Quick Commands:</h4>
//                             <div className="grid grid-cols-2 gap-3">
//                                 {[
//                                     { text: "Show my mood trends", icon: "📊" },
//                                     { text: "Read my last entry", icon: "📖" },
//                                     { text: "How am I feeling today?", icon: "💭" },
//                                     { text: "Create a new entry", icon: "✍️" }
//                                 ].map((cmd) => (
//                                     <button
//                                         key={cmd.text}
//                                         onClick={() => {
//                                             setTranscript(cmd.text);
//                                             sendCommandToServer(cmd.text);
//                                         }}
//                                         disabled={isListening || isProcessing}
//                                         className="p-3 text-left text-xs bg-white/60 hover:bg-white/80 border border-slate-200 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                                     >
//                                         <div className="flex items-center space-x-2">
//                                             <span className="text-lg">{cmd.icon}</span>
//                                             <span className="text-slate-600">"{cmd.text}"</span>
//                                         </div>
//                                     </button>
//                                 ))}
//                             </div>
//                         </div>
//                     </div>

//                     {/* Footer */}
//                     <div className="px-8 pb-6">
//                         <div className="flex items-center justify-center space-x-2 text-xs text-slate-400">
//                             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                             </svg>
//                             <span>Works best with Chrome browser • Make sure your microphone is enabled</span>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default VoiceAssistant;
















// ------------------------------------------------ 










import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, BarChart, Bar, ResponsiveContainer } from 'recharts';

const VoiceAssistant = () => {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [response, setResponse] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState('');
    const [conversationHistory, setConversationHistory] = useState([]);
    const [audioLevel, setAudioLevel] = useState(0);
    const [chartData, setChartData] = useState(null);
    const [responseType, setResponseType] = useState('');
    
    const recognitionRef = useRef(null);
    const audioContextRef = useRef(null);
    const analyserRef = useRef(null);
    const animationRef = useRef(null);

    // Check browser support
    const [isSupported, setIsSupported] = useState(true);

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

    useEffect(() => {
        // Check for speech recognition support
        if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
            setIsSupported(false);
            setError('Speech recognition is not supported in this browser. Please use Chrome or Edge.');
            return;
        }

        // Initialize speech recognition
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.lang = 'en-US';
        recognition.maxAlternatives = 1;

        recognition.onstart = () => {
            setIsListening(true);
            setError('');
            startAudioVisualizer();
        };

        recognition.onresult = (event) => {
            let interimTranscript = '';
            let finalTranscript = '';

            for (let i = event.resultIndex; i < event.results.length; i++) {
                const transcript = event.results[i][0].transcript;
                if (event.results[i].isFinal) {
                    finalTranscript += transcript;
                } else {
                    interimTranscript += transcript;
                }
            }

            setTranscript(finalTranscript || interimTranscript);

            if (finalTranscript) {
                sendCommandToServer(finalTranscript.trim());
            }
        };

        recognition.onerror = (event) => {
            console.error('Speech recognition error:', event);
            setIsListening(false);
            stopAudioVisualizer();
            
            switch (event.error) {
                case 'no-speech':
                    setError('No speech was detected. Please try again.');
                    break;
                case 'audio-capture':
                    setError('No microphone found. Please check your microphone settings.');
                    break;
                case 'not-allowed':
                    setError('Microphone access denied. Please allow microphone access and try again.');
                    break;
                case 'network':
                    setError('Network error. Please check your internet connection.');
                    break;
                default:
                    setError(`Speech recognition error: ${event.error}`);
            }
            toast.error(`Voice error: ${event.error}`);
        };

        recognition.onend = () => {
            setIsListening(false);
            stopAudioVisualizer();
        };

        recognitionRef.current = recognition;

        return () => {
            if (recognitionRef.current) {
                recognitionRef.current.stop();
            }
            stopAudioVisualizer();
        };
    }, []);

    const startAudioVisualizer = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
            analyserRef.current = audioContextRef.current.createAnalyser();
            const source = audioContextRef.current.createMediaStreamSource(stream);
            
            source.connect(analyserRef.current);
            analyserRef.current.fftSize = 256;
            
            const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
            
            const updateAudioLevel = () => {
                if (isListening && analyserRef.current) {
                    analyserRef.current.getByteFrequencyData(dataArray);
                    const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
                    setAudioLevel(average);
                    animationRef.current = requestAnimationFrame(updateAudioLevel);
                }
            };
            
            updateAudioLevel();
        } catch (err) {
            console.error('Audio visualizer error:', err);
        }
    };

    const stopAudioVisualizer = () => {
        if (animationRef.current) {
            cancelAnimationFrame(animationRef.current);
        }
        if (audioContextRef.current) {
            audioContextRef.current.close();
        }
        setAudioLevel(0);
    };

    const startListening = () => {
        if (!isSupported) {
            toast.error('Speech recognition not supported in this browser');
            return;
        }

        setTranscript('');
        setResponse('');
        setError('');
        setIsProcessing(false);
        setChartData(null);
        setResponseType('');

        try {
            recognitionRef.current.start();
        } catch (err) {
            console.error('Failed to start recognition:', err);
            toast.error('Failed to start voice recognition');
        }
    };

    const stopListening = () => {
        if (recognitionRef.current && isListening) {
            recognitionRef.current.stop();
        }
    };

    const sendCommandToServer = async (speechText) => {
        if (!speechText || speechText.trim().length === 0) {
            toast.error('No speech detected');
            return;
        }

        const token = localStorage.getItem('token');
        if (!token) {
            toast.error("You're not logged in");
            return;
        }

        setIsProcessing(true);

        try {
            const backendUrl = import.meta.env.VITE_BACKEND_URL;

            const res = await axios.post(
                `${backendUrl}/api/voice-command`,
                { command: speechText },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    timeout: 30000
                }
            );

            if (res.data.success) {
                const newResponse = res.data.response;
                setResponse(newResponse);
                setResponseType(res.data.type || '');
                setChartData(res.data.chartData || null);
                
                // Add to conversation history
                const newEntry = {
                    id: Date.now(),
                    user: speechText,
                    assistant: typeof newResponse === 'string' ? newResponse : JSON.stringify(newResponse),
                    timestamp: new Date(),
                    intent: res.data.intent,
                    type: res.data.type,
                    hasChart: !!res.data.chartData
                };
                
                setConversationHistory(prev => [newEntry, ...prev.slice(0, 4)]);
                toast.success('Command processed successfully');
            } else {
                const errorMsg = res.data.message || 'Voice command failed';
                setError(errorMsg);
                toast.error(errorMsg);
            }
        } catch (err) {
            console.error('Voice command error:', err);
            const errorMessage = err.response?.data?.message || err.message || 'Server error occurred';
            setError(errorMessage);
            toast.error(`Error: ${errorMessage}`);
        } finally {
            setIsProcessing(false);
        }
    };

    const clearConversation = () => {
        setTranscript('');
        setResponse('');
        setError('');
        setConversationHistory([]);
        setChartData(null);
        setResponseType('');
        toast.info('Conversation cleared');
    };

    const renderMoodChart = (data) => {
        if (!data) return null;

        return (
            <div className="space-y-6">
                {/* Summary Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
                        <div className="text-2xl font-bold text-blue-700">{data.summary.totalEntries}</div>
                        <div className="text-sm text-blue-600">Total Entries</div>
                    </div>
                    <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-xl border border-green-200">
                        <div className="text-2xl font-bold text-green-700">{data.summary.moodEntries}</div>
                        <div className="text-sm text-green-600">Mood Tracked</div>
                    </div>
                    <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200">
                        <div className="text-2xl font-bold text-purple-700 capitalize">{data.summary.dominantMood}</div>
                        <div className="text-sm text-purple-600">Dominant Mood</div>
                    </div>
                    <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-4 rounded-xl border border-orange-200">
                        <div className="text-2xl font-bold text-orange-700">{data.summary.averageMoodScore}/5</div>
                        <div className="text-sm text-orange-600">Avg Score</div>
                    </div>
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Mood Distribution Pie Chart */}
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                        <h4 className="text-lg font-semibold text-slate-800 mb-4">Mood Distribution</h4>
                        <ResponsiveContainer width="100%" height={250}>
                            <PieChart>
                                <Pie
                                    data={data.moodDistribution}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({name, percentage}) => `${name} (${percentage}%)`}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {data.moodDistribution.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Weekly Averages Bar Chart */}
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                        <h4 className="text-lg font-semibold text-slate-800 mb-4">Weekly Mood Averages</h4>
                        <ResponsiveContainer width="100%" height={250}>
                            <BarChart data={data.weeklyAverages}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="week" />
                                <YAxis domain={[0, 5]} />
                                <Tooltip />
                                <Bar dataKey="averageScore" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Mood Trends Line Chart */}
                {data.moodTrends.length > 0 && (
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                        <h4 className="text-lg font-semibold text-slate-800 mb-4">Mood Trends Over Time</h4>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={data.moodTrends}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis domain={[0, 5]} />
                                <Tooltip 
                                    labelFormatter={(label) => `Date: ${label}`}
                                    formatter={(value, name) => [value, 'Mood Score']}
                                />
                                <Line 
                                    type="monotone" 
                                    dataKey="moodScore" 
                                    stroke="#10b981" 
                                    strokeWidth={3}
                                    dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                )}
            </div>
        );
    };

    const renderRecommendationsChart = (data) => {
        if (!data) return null;

        return (
            <div className="space-y-6">
                {/* Overall Wellness Score */}
                <div className="bg-gradient-to-r from-teal-50 to-blue-50 p-6 rounded-2xl border border-teal-200">
                    <div className="text-center">
                        <div className="text-4xl font-bold text-teal-700 mb-2">{data.overallScore}%</div>
                        <div className="text-lg text-teal-600 mb-4">Overall Wellness Score</div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                            <div 
                                className="bg-gradient-to-r from-teal-500 to-blue-500 h-3 rounded-full transition-all duration-1000"
                                style={{ width: `${data.overallScore}%` }}
                            ></div>
                        </div>
                        <p className="text-sm text-slate-600 mt-3">{data.moodInsight}</p>
                    </div>
                </div>

                {/* Wellness Categories */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {data.categories.map((category, index) => (
                        <div key={index} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <h4 className="text-lg font-semibold text-slate-800">{category.name}</h4>
                                <div className="text-2xl font-bold" style={{ color: category.color }}>
                                    {category.score}%
                                </div>
                            </div>
                            
                            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                                <div 
                                    className="h-2 rounded-full transition-all duration-1000"
                                    style={{ 
                                        width: `${category.score}%`,
                                        backgroundColor: category.color 
                                    }}
                                ></div>
                            </div>
                            
                            <div className="space-y-2">
                                {category.recommendations.map((rec, idx) => (
                                    <div key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                                        <div className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 flex-shrink-0"></div>
                                        <span>{rec}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Priority Actions */}
                <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-2xl border border-orange-200">
                    <h4 className="text-lg font-semibold text-orange-800 mb-4">Priority Actions</h4>
                    <div className="space-y-3">
                        {data.priorityActions.map((action, index) => (
                            <div key={index} className="flex items-start gap-3">
                                <div className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                                    {index + 1}
                                </div>
                                <p className="text-orange-700">{action}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    };

    const formatResponse = (response) => {
        if (typeof response === 'string') {
            return <p className="leading-relaxed">{response}</p>;
        }
        
        if (typeof response === 'object') {
            return (
                <div className="space-y-2">
                    {Object.entries(response).map(([key, value], index) => (
                        <div key={key} className="flex items-center justify-between p-3 bg-white/60 rounded-xl border border-teal-100">
                            <div className="flex items-center space-x-3">
                                <div className="w-3 h-3 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full"></div>
                                <span className="font-medium text-slate-700 capitalize">{key}</span>
                            </div>
                            <span className="px-3 py-1 bg-gradient-to-r from-teal-100 to-cyan-100 text-teal-700 rounded-full text-sm font-semibold">
                                {value}
                            </span>
                        </div>
                    ))}
                </div>
            );
        }
        
        return <p>{String(response)}</p>;
    };

    if (!isSupported) {
        return (
            <div className="max-w-2xl mx-auto p-8 bg-red-50 border border-red-200 rounded-2xl">
                <div className="text-center">
                    <svg className="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 className="text-lg font-semibold text-red-800 mb-2">Browser Not Supported</h3>
                    <p className="text-red-600">Please use Chrome, Edge, or Safari for voice features.</p>
                </div>
            </div>
        );
    }

    return (
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-2'>
            <div className="relative max-w-6xl mx-auto">
                {/* Background Elements */}
                <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 via-cyan-500/5 to-blue-500/10 rounded-3xl blur-3xl"></div>

                {/* Main Container */}
                <div className="relative backdrop-blur-sm bg-white/80 border border-slate-200/60 rounded-3xl shadow-2xl shadow-teal-500/10 overflow-hidden">
                    {/* Header Section */}
                    <div className="relative bg-gradient-to-r from-teal-50 via-cyan-50 to-blue-50 px-8 py-6 border-b border-slate-200/50">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="relative">
                                    <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
                                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                                        </svg>
                                    </div>
                                    {isListening && (
                                        <div 
                                            className="absolute -inset-2 border-2 border-red-500 rounded-2xl animate-pulse"
                                            style={{
                                                boxShadow: `0 0 ${10 + audioLevel / 5}px rgba(239, 68, 68, 0.5)`
                                            }}
                                        ></div>
                                    )}
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-700 to-slate-600 bg-clip-text text-transparent">
                                        Voice Assistant
                                    </h2>
                                    <p className="text-sm text-slate-500 mt-1">
                                        {isListening ? 'Listening to your voice...' : 
                                         isProcessing ? 'Processing your request...' : 
                                         'Click to start speaking'}
                                    </p>
                                </div>
                            </div>
                            
                            {conversationHistory.length > 0 && (
                                <button
                                    onClick={clearConversation}
                                    className="px-3 py-1 text-xs text-slate-500 hover:text-slate-700 bg-white/50 hover:bg-white/80 rounded-lg transition-colors"
                                >
                                    Clear
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-8">
                        {/* Voice Button */}
                        <div className="text-center mb-8">
                            <button
                                onClick={isListening ? stopListening : startListening}
                                disabled={isProcessing}
                                className={`group relative px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 disabled:opacity-50 disabled:cursor-not-allowed ${
                                    isListening
                                        ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg shadow-red-500/30 focus:ring-red-500/30'
                                        : isProcessing
                                        ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg shadow-yellow-500/30'
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
                                            <span>Stop Listening</span>
                                        </>
                                    ) : isProcessing ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                            <span>Processing...</span>
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
                            </button>
                        </div>

                        {/* Error Display */}
                        {error && (
                            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl">
                                <div className="flex items-center space-x-2">
                                    <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <p className="text-red-700 text-sm">{error}</p>
                                </div>
                            </div>
                        )}

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

                        {/* Response Section with Charts */}
                        {(response || chartData) && (
                            <div className="mb-6">
                                {/* Text Response */}
                                {response && (
                                    <div className="mb-6 p-6 bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 border border-teal-200/50 rounded-2xl shadow-inner">
                                        <div className="flex items-start space-x-3">
                                            <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
                                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                                </svg>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="text-sm font-semibold text-slate-700 mb-3">AI Response:</h4>
                                                <div className="text-slate-700">
                                                    {formatResponse(response)}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Chart Visualization */}
                                {chartData && (
                                    <div className="mt-6">
                                        {responseType === 'mood_chart' && renderMoodChart(chartData)}
                                        {responseType === 'recommendations_chart' && renderRecommendationsChart(chartData)}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Conversation History */}
                        {conversationHistory.length > 0 && (
                            <div className="mb-6">
                                <h4 className="text-sm font-semibold text-slate-700 mb-3">Recent Conversations:</h4>
                                <div className="space-y-3 max-h-60 overflow-y-auto">
                                    {conversationHistory.map((entry) => (
                                        <div key={entry.id} className="p-3 bg-slate-50/50 rounded-xl border border-slate-200/50 text-xs">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-slate-500">
                                                    {entry.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                                </span>
                                                <div className="flex items-center gap-2">
                                                    {entry.hasChart && (
                                                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                                                            📊 Chart
                                                        </span>
                                                    )}
                                                    {entry.intent && (
                                                        <span className="px-2 py-1 bg-teal-100 text-teal-700 rounded-full text-xs">
                                                            {entry.intent}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="text-slate-600">
                                                <strong>You:</strong> {entry.user}
                                            </div>
                                            <div className="text-slate-600 mt-1">
                                                <strong>AI:</strong> {entry.assistant.substring(0, 100)}...
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Empty State */}
                        {!transcript && !response && !error && conversationHistory.length === 0 && !chartData && (
                            <div className="text-center py-8 text-slate-400">
                                <svg className="w-16 h-16 mx-auto mb-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                                </svg>
                                <p className="text-lg font-medium mb-2">Ready to listen</p>
                                <p className="text-sm">Click the button above to start a voice command</p>
                                <div className="mt-4 text-xs text-slate-400">
                                    Try saying: "Show my mood trends", "Give me recommendations", or "How am I feeling today?"
                                </div>
                            </div>
                        )}

                        {/* Quick Command Buttons */}
                        <div className="mt-8">
                            <h4 className="text-sm font-semibold text-slate-700 mb-3">Quick Commands:</h4>
                            <div className="grid grid-cols-2 gap-3">
                                {[
                                    { text: "Show my mood trends", icon: "📊", type: "chart" },
                                    { text: "Give me recommendations", icon: "💡", type: "chart" },
                                    { text: "How am I feeling today?", icon: "💭", type: "text" },
                                    { text: "Read my last entry", icon: "📖", type: "text" }
                                ].map((cmd) => (
                                    <button
                                        key={cmd.text}
                                        onClick={() => {
                                            setTranscript(cmd.text);
                                            sendCommandToServer(cmd.text);
                                        }}
                                        disabled={isListening || isProcessing}
                                        className="p-3 text-left text-xs bg-white/60 hover:bg-white/80 border border-slate-200 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed group"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-2">
                                                <span className="text-lg">{cmd.icon}</span>
                                                <span className="text-slate-600">"{cmd.text}"</span>
                                            </div>
                                            {cmd.type === 'chart' && (
                                                <span className="text-xs text-teal-600 group-hover:text-teal-700 font-medium">
                                                    Charts
                                                </span>
                                            )}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="px-8 pb-6">
                        <div className="flex items-center justify-center space-x-2 text-xs text-slate-400">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>Works best with Chrome browser • Make sure your microphone is enabled</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VoiceAssistant;