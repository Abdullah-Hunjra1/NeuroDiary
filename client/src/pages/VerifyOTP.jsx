import { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

export default function VerifyOTP() {
    const [otp, setOtp] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const email = location.state?.email;

    const handleVerify = async () => {
        if (!otp || otp.length !== 6) {
            alert("Please enter a valid 6-digit OTP");
            return;
        }

        setIsLoading(true);
        const backendUrl = import.meta.env.VITE_BACKEND_URL;
        try {
            const { data } = await axios.post(`${backendUrl}/api/user/verify-otp`, { email, otp });
            if (data.success) {
                localStorage.setItem("token", data.token);
                navigate("/");
            } else {
                alert(data.message);
            }
        } catch (error) {
            alert("Verification failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleResendOTP = async () => {
        try {
            const { data } = await axios.post("/api/user/resend-otp", { email });
            if (data.success) {
                alert("OTP resent successfully!");
            } else {
                alert(data.message);
            }
        } catch (error) {
            alert("Failed to resend OTP. Please try again.");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5">
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, rgba(99, 102, 241, 0.1) 1px, transparent 0)`,
                    backgroundSize: '20px 20px'
                }}></div>
            </div>

            <div className="relative w-full max-w-md">
                {/* Main Container */}
                <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden p-8">
                    
                    {/* Decorative Background Elements */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-400/20 to-purple-500/20 rounded-full blur-3xl -translate-y-16 translate-x-16"></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-blue-400/20 to-cyan-500/20 rounded-full blur-3xl translate-y-24 -translate-x-24"></div>
                    
                    <div className="relative z-10">
                        {/* Logo Section */}
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
                                <span className="text-white font-bold text-2xl">N</span>
                            </div>
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                NeuroDiary
                            </h1>
                            <p className="text-gray-500 text-sm mt-1">Your AI-powered mental wellness companion</p>
                        </div>

                        {/* OTP Verification Content */}
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-2xl mb-6">
                                <svg className="w-10 h-10 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">
                                Verify Your Email
                            </h2>
                            <p className="text-gray-500 text-sm leading-relaxed mb-2">
                                We've sent a 6-digit verification code to
                            </p>
                            <p className="text-indigo-600 font-semibold text-sm mb-6">
                                {email || "your email"}
                            </p>
                        </div>

                        {/* OTP Input */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Enter Verification Code
                            </label>
                            <input
                                type="text"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                placeholder="000000"
                                maxLength="6"
                                className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 placeholder-gray-400 text-center text-xl font-mono tracking-wider"
                            />
                            <p className="text-xs text-gray-500 mt-2 text-center">
                                Enter the 6-digit code sent to your email
                            </p>
                        </div>

                        {/* Verify Button */}
                        <button
                            onClick={handleVerify}
                            disabled={isLoading || otp.length !== 6}
                            className="w-full py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transform hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center">
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                    Verifying...
                                </div>
                            ) : (
                                'Verify Email'
                            )}
                        </button>

                        {/* Resend OTP */}
                        <div className="text-center mt-6">
                            <p className="text-gray-500 text-sm mb-3">
                                Didn't receive the code?
                            </p>
                            <button
                                onClick={handleResendOTP}
                                className="text-indigo-600 hover:text-indigo-700 font-medium text-sm transition-colors duration-200 hover:underline"
                            >
                                Resend Code
                            </button>
                        </div>

                        {/* Back to Login */}
                        <div className="text-center mt-6 pt-6 border-t border-gray-100">
                            <button
                                onClick={() => navigate('/login')}
                                className="text-gray-500 hover:text-gray-700 text-sm transition-colors duration-200 flex items-center justify-center"
                            >
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                Back to Login
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}