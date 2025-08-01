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
            const res = await axios.post(
                'http://localhost:5000/api/voice-command',
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
        <div className="p-6 bg-white rounded-xl shadow-lg max-w-lg mx-auto text-center">
            <h2 className="text-2xl font-bold text-primary mb-3">🎙 Voice Assistant</h2>

            <button
                onClick={startListening}
                className={`px-5 py-2 rounded-full text-white ${isListening ? 'bg-red-500' : 'bg-blue-600 hover:bg-blue-700'
                    }`}
            >
                {isListening ? 'Listening...' : 'Start Speaking'}
            </button>

            <div className="mt-4 text-left">
                {transcript && (
                    <p className="text-sm text-gray-500">
                        <strong>You said:</strong> {transcript}
                    </p>
                )}
                {response && (
                    <div className="mt-2 p-3 bg-gray-100 rounded-md text-gray-700">
                        <strong>Response:</strong>
                        <div className="mt-1 text-sm">
                            {typeof response === 'string' ? (
                                <p>{response}</p>
                            ) : (
                                Object.entries(response).map(([mood, count]) => (
                                    <p key={mood}>
                                        <span className="font-medium">{mood}:</span> {count}
                                    </p>
                                ))
                            )}
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default VoiceAssistant;
