import React, { useContext, useState } from 'react';
// import { FaGooglePlusG, FaFacebookF, FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { AppContext } from '../../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  const {backendUrl , token , setToken} = useContext(AppContext)
  const navigate = useNavigate()

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const onSubmitHandler = async(event) => {
    event.preventDefault();

    try {
      if (isSignUp) {

        // const { data } = await axios.post(backendUrl + '/api/user/register', { name, email, password });
        const { data } = await axios.post(backendUrl + '/api/user/register', { name, email, password, otpRequired: true });
        if (data.success) {
          // localStorage.setItem('token', data.token);
          // setToken(data.token);
              navigate("/verify-otp", { state: { email } });

        } else {
          toast.error(data.message);
        }

      } else{

        const { data } = await axios.post(backendUrl + '/api/user/login', { email, password });
        if (data.success) {
          localStorage.setItem('token', data.token);
          setToken(data.token);
        } else {
          toast.error(data.message);
        }
      }


    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [token])
  
  
  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 py-6">
      {/* SAME Background as Home Page */}
      <div className="fixed inset-0 -z-10">
        {/* Main gradient background - matching Home */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50/80 via-blue-50/20 to-cyan-50/30"></div>
        
        {/* Animated background orbs - matching Home */}
        <div className="absolute top-10 left-10 w-64 h-64 bg-gradient-to-br from-teal-400/10 to-cyan-400/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute top-1/4 right-10 w-48 h-48 bg-gradient-to-br from-blue-400/8 to-indigo-400/8 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-56 h-56 bg-gradient-to-br from-cyan-400/10 to-teal-400/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-2000"></div>
        
        {/* Subtle grid pattern - matching Home */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.02)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      </div>
      
      <div
        className={`relative w-full max-w-4xl h-[480px] bg-white/70 backdrop-blur-lg shadow-2xl border border-white/50 rounded-3xl overflow-hidden transition-all duration-700 ${
          isSignUp ? 'auth-container-active' : ''
        }`}
      >
        {/* Sign In Form */}
        <div
          className={`absolute top-0 left-0 w-full md:w-1/2 h-full transition-all duration-700 z-20 ${
            isSignUp ? 'md:translate-x-full opacity-0 z-10' : 'opacity-100'
          } ${isSignUp ? 'hidden md:block' : 'block'}`}
        >
          <form onSubmit={onSubmitHandler} className="flex flex-col items-center justify-center h-full px-6 md:px-10">
            <h1 className="text-2xl font-bold mb-3 bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">Sign In</h1>
            
            <input
              type="email"
              placeholder="Email"
              className="input-style"
              onChange={(e)=>setEmail(e.target.value)} value={email}
            />
            <input
              type="password"
              placeholder="Password"
              className="input-style"
              onChange={(e)=>setPassword(e.target.value)} value={password}
            />
            <a href="#" className="text-xs text-slate-500 hover:text-teal-600 transition-colors mt-2">
              Forget Your Password?
            </a>
            <button type='submit' className="btn-primary mt-4">Sign In</button>
            
            {/* Mobile Toggle Button */}
            <button
              type="button"
              className="md:hidden mt-4 text-sm text-slate-600 hover:text-teal-600 transition-colors"
              onClick={() => setIsSignUp(true)}
            >
              Don't have an account? <span className="font-semibold">Sign Up</span>
            </button>
          </form>
        </div>

        {/* Sign Up Form */}
        <div
          className={`absolute top-0 left-0 w-full md:w-1/2 h-full opacity-0 transition-all duration-700 z-10 ${
            isSignUp ? 'md:translate-x-full opacity-100 z-30' : ''
          } ${isSignUp ? 'block md:block' : 'hidden md:block'}`}
        >
          <form onSubmit={onSubmitHandler} className="flex flex-col items-center justify-center h-full px-6 md:px-10">
            <h1 className="text-2xl font-bold mb-3 bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">Create Account</h1>
            
            <input
              type="text"
              placeholder="Name"
              className="input-style"
              onChange={(e)=>setName(e.target.value)} value={name}
            />
            <input
              type="email"
              placeholder="Email"
              className="input-style"
              onChange={(e)=>setEmail(e.target.value)} value={email}
            />
            <input
              type="password"
              placeholder="Password"
              className="input-style"
              onChange={(e)=>setPassword(e.target.value)} value={password}
            />
            <button type='submit' className="btn-primary mt-4">Sign Up</button>
            
            {/* Mobile Toggle Button */}
            <button
              type="button"
              className="md:hidden mt-4 text-sm text-slate-600 hover:text-teal-600 transition-colors"
              onClick={() => setIsSignUp(false)}
            >
              Already have an account? <span className="font-semibold">Sign In</span>
            </button>
          </form>
        </div>

        {/* Toggle Panel - Hidden on Mobile */}
        <div
          className={`hidden md:block absolute top-0 left-1/2 w-1/2 h-full bg-gradient-to-r from-teal-500 via-blue-600 to-indigo-600 text-white rounded-bl-[150px] rounded-tl-[100px] transition-all duration-700 ${
            isSignUp ? '-translate-x-full rounded-br-[150px] rounded-tr-[100px] rounded-bl-none rounded-tl-none' : ''
          }`}
        >
          <div className="flex flex-col items-center justify-center h-full px-8 text-center">
            {isSignUp ? (
              <>
                <h1 className="text-2xl font-bold">Welcome Back!</h1>
                <p className="text-sm mt-2 mb-6 text-blue-100">
                  Enter your personal details to use all of site features
                </p>
                <button
                  className="btn-outline"
                  onClick={() => setIsSignUp(false)}
                >
                  Sign In
                </button>
              </>
            ) : (
              <>
                <h1 className="text-2xl font-bold">Hello, Friend!</h1>
                <p className="text-sm mt-2 mb-6 text-blue-100">
                  Register with your personal details to use all of site features
                </p>
                <button
                  className="btn-outline"
                  onClick={() => setIsSignUp(true)}
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-4 right-4 w-2 h-2 bg-teal-400/40 rounded-full animate-pulse pointer-events-none"></div>
        <div className="absolute bottom-6 left-6 w-1.5 h-1.5 bg-blue-400/40 rounded-full animate-pulse delay-1000 pointer-events-none"></div>
      </div>

      {/* Same floating elements as Home */}
      <div className="fixed top-1/3 left-6 w-1.5 h-1.5 bg-teal-400/60 rounded-full animate-ping pointer-events-none"></div>
      <div className="fixed top-2/3 right-8 w-1 h-1 bg-cyan-400/50 rounded-full animate-pulse pointer-events-none"></div>
      
      <style jsx>{`
        .input-style {
          @apply w-full px-4 py-3 mb-3 bg-white/60 backdrop-blur-sm border border-white/50 rounded-xl outline-none focus:border-teal-500 focus:bg-white/80 text-sm placeholder:text-slate-400 shadow-sm transition-all duration-300 focus:shadow-md;
        }
        
        .btn-primary {
          @apply bg-gradient-to-r from-teal-500 via-blue-600 to-indigo-600 text-white py-3 px-8 rounded-xl font-semibold hover:from-teal-600 hover:via-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 backdrop-blur-sm;
        }
        
        .btn-outline {
          @apply border-2 border-white/80 text-white py-3 px-8 rounded-xl font-semibold hover:bg-white/20 hover:border-white transition-all duration-300 backdrop-blur-sm;
        }

        @media (max-width: 768px) {
          .auth-container-active .absolute {
            transform: translateX(0) !important;
          }
        }
      `}</style>
    </div>
  );
};

const SocialIcons = () => (
  <div className="flex space-x-3 my-3">
    {[FaGooglePlusG, FaFacebookF, FaGithub, FaLinkedinIn].map((Icon, idx) => (
      <a
        key={idx}
        href="#"
        className="border border-white/50 bg-white/30 backdrop-blur-sm rounded-full w-10 h-10 flex items-center justify-center text-slate-600 hover:text-teal-600 hover:border-teal-500 hover:bg-white/50 transition-all duration-300 shadow-sm hover:shadow-md hover:scale-110"
      >
        <Icon size={16} />
      </a>
    ))}
  </div>
);

export default Login;