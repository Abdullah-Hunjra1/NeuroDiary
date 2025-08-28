import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import VoiceAssistant from '../components/VoiceAssistant';

export default function VoicePage() {
  const { userData, loading } = useContext(AppContext);
  const navigate = useNavigate();
  const [showFeatureModal, setShowFeatureModal] = useState(false);

  useEffect(() => {
    if (loading) return;

    if (!userData?.isPremium) {
      toast.error("You need a premium subscription to access this page.");
      navigate("/pricing");
    }
  }, [userData, loading, navigate]);

  // Check if browser supports voice features
  const checkVoiceSupport = () => {
    const hasRecognition = 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
    const hasMedia = 'mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices;
    return { hasRecognition, hasMedia };
  };

  const { hasRecognition, hasMedia } = checkVoiceSupport();

  const voiceCommands = [
    {
      category: "Diary Management",
      commands: [
        {
          command: "Create a new entry",
          description: "Start a new journal entry with voice dictation",
          icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
          color: "from-teal-400 to-blue-500",
          examples: ["Write a diary entry", "New journal entry", "Start journaling"]
        },
        {
          command: "Read my last entry",
          description: "Listen to your most recent journal entry",
          icon: "M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z",
          color: "from-indigo-400 to-purple-500",
          examples: ["Show my recent entry", "What did I write last", "Read last diary"]
        }
      ]
    },
    {
      category: "Mood & Analytics",
      commands: [
        {
          command: "Show my mood trends",
          description: "View emotional patterns and insights over time",
          icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",
          color: "from-blue-400 to-indigo-500",
          examples: ["Mood analysis", "How have I been feeling", "Weekly mood summary"]
        },
        {
          command: "How am I feeling today?",
          description: "Get AI analysis of your current emotional state",
          icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
          color: "from-purple-400 to-pink-500",
          examples: ["Analyze my mood", "Current emotional state", "Sentiment analysis"]
        }
      ]
    },
    {
      category: "AI Assistance",
      commands: [
        {
          command: "Give me recommendations",
          description: "Get personalized wellness suggestions",
          icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
          color: "from-pink-400 to-red-500",
          examples: ["Wellness suggestions", "Self-care tips", "Mental health advice"]
        }
      ]
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-teal-500/30 border-t-teal-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading voice features...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-600/10 via-blue-600/10 to-indigo-600/10"></div>
        
        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-teal-200/30 rounded-full blur-xl"></div>
        <div className="absolute top-32 right-20 w-32 h-32 bg-blue-200/30 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-indigo-200/30 rounded-full blur-xl"></div>
        
        <div className="relative max-w-7xl mx-auto px-6 py-12 md:py-16">
          {/* Header Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-teal-100 text-teal-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
              </svg>
              Premium Voice Features
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-teal-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4 leading-tight">
              Welcome to NeuroDiary Voice
            </h1>
            
            <p className="text-lg md:text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed mb-8">
              Experience the future of mental health journaling with AI-powered voice commands. 
              Speak your thoughts, track your emotions, and unlock personalized insights through natural conversation.
            </p>

            {/* Browser Compatibility Notice */}
            {(!hasRecognition || !hasMedia) && (
              <div className="max-w-2xl mx-auto mb-8 p-4 bg-yellow-50 border border-yellow-200 rounded-2xl">
                <div className="flex items-center space-x-2 text-yellow-800">
                  <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-sm">
                    {!hasRecognition && "Speech recognition not supported. "}
                    {!hasMedia && "Microphone access may be limited. "}
                    For best experience, use Chrome or Edge browsers.
                  </p>
                </div>
              </div>
            )}

            {/* Feature Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-gradient-to-r from-teal-400 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">Voice Recognition</h3>
                <p className="text-slate-600 text-sm">Advanced speech-to-text with natural language processing</p>
              </div>

              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">AI Insights</h3>
                <p className="text-slate-600 text-sm">Smart emotional analysis and personalized recommendations</p>
              </div>

              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">Privacy First</h3>
                <p className="text-slate-600 text-sm">End-to-end encryption ensures your thoughts stay secure</p>
              </div>
            </div>
          </div>

          {/* Voice Assistant Section */}
          <div className="max-w-5xl mx-auto mb-16">
            <div className="bg-white/70 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
              {/* Voice Assistant Header */}
              <div className="bg-gradient-to-r from-teal-500 via-blue-500 to-indigo-600 px-8 py-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                      </svg>
                    </div>
                    <div>
                      <h2 className="text-2xl md:text-3xl font-bold text-white">AI Voice Assistant</h2>
                      <p className="text-blue-100 text-sm md:text-base">Speak naturally, journal effortlessly</p>
                    </div>
                  </div>
                  
                  <div className="hidden md:flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-white text-sm font-medium">Ready to listen</span>
                  </div>
                </div>
              </div>

              {/* Voice Assistant Component */}
              <div className="p-8">
                <VoiceAssistant />
              </div>
            </div>
          </div>

          {/* Voice Commands Section */}
          <div className="max-w-6xl mx-auto mb-16">
            <div className="text-center mb-10">
              <h3 className="text-3xl font-bold text-slate-800 mb-4">Voice Commands</h3>
              <p className="text-slate-600 text-lg">Try these natural voice commands to get started</p>
              <button
                onClick={() => setShowFeatureModal(true)}
                className="mt-4 inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 font-medium"
              >
                <span>View all commands</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {voiceCommands.map((category, categoryIndex) => (
              <div key={categoryIndex} className="mb-12">
                <h4 className="text-xl font-semibold text-slate-700 mb-6 text-center">
                  {category.category}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {category.commands.map((item, index) => (
                    <div
                      key={index}
                      className="group bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer"
                    >
                      <div className={`w-12 h-12 bg-gradient-to-r ${item.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                        </svg>
                      </div>
                      <h4 className="text-lg font-semibold text-slate-800 mb-2 group-hover:text-teal-600 transition-colors">
                        "{item.command}"
                      </h4>
                      <p className="text-slate-600 text-sm leading-relaxed mb-3">{item.description}</p>
                      <div className="text-xs text-slate-500">
                        <span className="font-medium">Also try:</span>
                        <div className="mt-1 flex flex-wrap gap-1">
                          {item.examples.map((example, idx) => (
                            <span key={idx} className="bg-slate-100 px-2 py-1 rounded text-xs">
                              "{example}"
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Tips Section */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-3xl p-8 border border-teal-100">
              <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="text-2xl font-bold text-teal-700">Pro Tips for Better Results</h3>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/50 rounded-2xl p-6">
                  <h4 className="font-semibold text-slate-800 text-lg mb-3 flex items-center gap-2">
                    🎤 <span>Clear Speech</span>
                  </h4>
                  <p className="text-slate-600 text-sm mb-2">Speak clearly and at a normal pace for best recognition accuracy</p>
                  <div className="text-xs text-slate-500">
                    • Find a quiet environment
                    • Speak 6-12 inches from your device
                    • Avoid background noise
                  </div>
                </div>
                <div className="bg-white/50 rounded-2xl p-6">
                  <h4 className="font-semibold text-slate-800 text-lg mb-3 flex items-center gap-2">
                    🌟 <span>Natural Language</span>
                  </h4>
                  <p className="text-slate-600 text-sm mb-2">Use natural, conversational language - no need for formal commands</p>
                  <div className="text-xs text-slate-500">
                    • Speak as you would to a friend
                    • Use complete sentences
                    • Be specific about your needs
                  </div>
                </div>
                <div className="bg-white/50 rounded-2xl p-6">
                  <h4 className="font-semibold text-slate-800 text-lg mb-3 flex items-center gap-2">
                    🔒 <span>Privacy & Security</span>
                  </h4>
                  <p className="text-slate-600 text-sm mb-2">Your voice data is processed securely and not stored permanently</p>
                  <div className="text-xs text-slate-500">
                    • Audio processed in real-time
                    • No voice recordings saved
                    • HIPAA-compliant encryption
                  </div>
                </div>
                <div className="bg-white/50 rounded-2xl p-6">
                  <h4 className="font-semibold text-slate-800 text-lg mb-3 flex items-center gap-2">
                    ⚡ <span>Best Performance</span>
                  </h4>
                  <p className="text-slate-600 text-sm mb-2">Optimize your experience with these settings</p>
                  <div className="text-xs text-slate-500">
                    • Use Chrome or Edge browsers
                    • Ensure stable internet connection
                    • Allow microphone permissions
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 border border-white/50 shadow-lg max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-slate-800 mb-4">Ready to Start Your Voice Journey?</h3>
              <p className="text-slate-600 mb-6">
                Transform the way you journal and understand your emotions with the power of your voice.
              </p>
              <div className="flex items-center justify-center gap-4">
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Premium Feature</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2z" clipRule="evenodd" />
                  </svg>
                  <span>Secure & Private</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Modal */}
      {showFeatureModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-white border-b border-slate-200 px-8 py-6 rounded-t-3xl">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-slate-800">Complete Voice Commands Guide</h3>
                <button
                  onClick={() => setShowFeatureModal(false)}
                  className="w-8 h-8 bg-slate-100 hover:bg-slate-200 rounded-full flex items-center justify-center transition-colors"
                >
                  <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="px-8 py-6">
              {voiceCommands.map((category, categoryIndex) => (
                <div key={categoryIndex} className="mb-8 last:mb-0">
                  <h4 className="text-xl font-semibold text-slate-700 mb-4 flex items-center gap-2">
                    <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                    {category.category}
                  </h4>
                  <div className="space-y-4">
                    {category.commands.map((item, index) => (
                      <div key={index} className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                        <div className="flex items-start gap-4">
                          <div className={`w-10 h-10 bg-gradient-to-r ${item.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <h5 className="text-lg font-semibold text-slate-800 mb-2">
                              "{item.command}"
                            </h5>
                            <p className="text-slate-600 mb-3">{item.description}</p>
                            <div className="space-y-2">
                              <div className="text-sm text-slate-500 font-medium">Alternative phrases:</div>
                              <div className="flex flex-wrap gap-2">
                                {item.examples.map((example, idx) => (
                                  <span key={idx} className="bg-white border border-slate-200 px-3 py-1 rounded-lg text-sm text-slate-600">
                                    "{example}"
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              
              <div className="mt-8 p-6 bg-teal-50 rounded-2xl border border-teal-100">
                <h4 className="text-lg font-semibold text-teal-800 mb-3">💡 Remember</h4>
                <ul className="space-y-2 text-teal-700 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-teal-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>You can speak naturally - the AI understands context and variations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-teal-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Try combining requests: "Show my mood trends and give me recommendations"</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-teal-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>The more specific you are, the better the AI can help you</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}