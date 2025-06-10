import React, { useContext, useState } from 'react';
import { FaGooglePlusG, FaFacebookF, FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { AppContext } from '../../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  const {backendUrl , token , setToken} = useContext(AppContext)
  const navigate = useNavigate()

  // const [state, setState] = useState('Sign Up');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const onSubmitHandler = async(event) => {
    event.preventDefault();

    try {
      if (isSignUp) {

        const { data } = await axios.post(backendUrl + '/api/user/register', { name, email, password });
        if (data.success) {
          localStorage.setItem('token', data.token);
          setToken(data.token);
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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r bg-[#cdeaf5]">
      <div
        className={`relative w-full max-w-4xl h-[480px] bg-white shadow-lg rounded-3xl overflow-hidden transition-all duration-700 ${
          isSignUp ? 'auth-container-active' : ''
        }`}
      >
        {/* Sign In Form */}
        <div
          className={`absolute top-0 left-0 w-1/2 h-full transition-all duration-700 z-20 ${
            isSignUp ? 'translate-x-full opacity-0 z-10' : 'opacity-100'
          }`}
        >
          <form onSubmit={onSubmitHandler} className="flex flex-col items-center justify-center h-full px-10">
            <h1 className="text-2xl font-bold mb-3 text-[#007189]">Sign In</h1>
            <SocialIcons />
            <span className="text-sm mb-2">or use your email password</span>
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
            <a href="#" className="text-xs text-gray-600 mt-2">
              Forget Your Password?
            </a>
            <button type='submit' className="btn-primary mt-4">Sign In</button>
          </form>
        </div>

        {/* Sign Up Form */}
        <div
          className={`absolute top-0 left-0 w-1/2 h-full opacity-0 transition-all duration-700 z-10 ${
            isSignUp ? 'translate-x-full opacity-100 z-30' : ''
          }`}
        >
          <form onSubmit={onSubmitHandler} className="flex flex-col items-center justify-center h-full px-10">
            <h1 className="text-2xl font-bold mb-3 text-[#007189]">Create Account</h1>
            <SocialIcons />
            <span className="text-sm mb-2">or use your email for registration</span>
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
          </form>
        </div>

        {/* Toggle Panel */}
        <div
          className={`absolute top-0 left-1/2 w-1/2 h-full bg-gradient-to-r bg-[#007189]  text-white rounded-bl-[150px] rounded-tl-[100px] transition-all duration-700 ${
            isSignUp ? '-translate-x-full rounded-br-[150px] rounded-tr-[100px]' : ''
          }`}
        >
          <div className="flex flex-col items-center justify-center h-full px-8 text-center">
            {isSignUp ? (
              <>
                <h1 className="text-2xl font-bold">Welcome Back!</h1>
                <p className="text-sm mt-2 mb-6">
                  Enter your personal details to use all of site features
                </p>
                <button
                  className="btn-outline"
                  onClick={() => setIsSignUp(false)  }
                >
                  Sign In
                </button>
              </>
            ) : (
              <>
                <h1 className="text-2xl font-bold">Hello, Friend!</h1>
                <p className="text-sm mt-2 mb-6">
                  Register with your personal details to use all of site features
                </p>
                <button
                  className="btn-outline"
                  onClick={() =>  setIsSignUp(true) }
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const SocialIcons = () => (
  <div className="flex space-x-3 my-3">
    {[FaGooglePlusG, FaFacebookF, FaGithub, FaLinkedinIn].map((Icon, idx) => (
      <a
        key={idx}
        href="#"
        className="border border-gray-300 rounded-full w-10 h-10 flex items-center justify-center text-gray-600 hover:text-[#007189] hover:border-[#007189] transition"
      >
        <Icon size={18} />
      </a>
    ))}
  </div>
);

export default Login;