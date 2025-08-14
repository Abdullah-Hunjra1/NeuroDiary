// import React, { useContext, useState } from 'react';
// import { FaGooglePlusG, FaFacebookF, FaGithub, FaLinkedinIn } from 'react-icons/fa';
// import { AppContext } from '../../context/AppContext';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';
// import { useEffect } from 'react';

// const Login = () => {
//   const [isSignUp, setIsSignUp] = useState(false);

//   const {backendUrl , token , setToken} = useContext(AppContext)
//   const navigate = useNavigate()

//   // const [state, setState] = useState('Sign Up');

//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [name, setName] = useState('');

//   const onSubmitHandler = async(event) => {
//     event.preventDefault();

//     try {
//       if (isSignUp) {

//         const { data } = await axios.post(backendUrl + '/api/user/register', { name, email, password });
//         if (data.success) {
//           localStorage.setItem('token', data.token);
//           setToken(data.token);
//         } else {
//           toast.error(data.message);
//         }

//       } else{

//         const { data } = await axios.post(backendUrl + '/api/user/login', { email, password });
//         if (data.success) {
//           localStorage.setItem('token', data.token);
//           setToken(data.token);
//         } else {
//           toast.error(data.message);
//         }
//       }


//     } catch (error) {
//       toast.error(error.message);
//     }
//   }

//   useEffect(() => {
//     if (token) {
//       navigate('/')
//     }
//   }, [token])
  
  
//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-r bg-[#cdeaf5]">
//       <div
//         className={`relative w-full max-w-4xl h-[480px] bg-white shadow-lg rounded-3xl overflow-hidden transition-all duration-700 ${
//           isSignUp ? 'auth-container-active' : ''
//         }`}
//       >
//         {/* Sign In Form */}
//         <div
//           className={`absolute top-0 left-0 w-1/2 h-full transition-all duration-700 z-20 ${
//             isSignUp ? 'translate-x-full opacity-0 z-10' : 'opacity-100'
//           }`}
//         >
//           <form onSubmit={onSubmitHandler} className="flex flex-col items-center justify-center h-full px-10">
//             <h1 className="text-2xl font-bold mb-3 text-[#007189]">Sign In</h1>
//             <SocialIcons />
//             <span className="text-sm mb-2">or use your email password</span>
//             <input
//               type="email"
//               placeholder="Email"
//               className="input-style"
//               onChange={(e)=>setEmail(e.target.value)} value={email}
//             />
//             <input
//               type="password"
//               placeholder="Password"
//               className="input-style"
//               onChange={(e)=>setPassword(e.target.value)} value={password}
//             />
//             <a href="#" className="text-xs text-gray-600 mt-2">
//               Forget Your Password?
//             </a>
//             <button type='submit' className="btn-primary mt-4">Sign In</button>
//           </form>
//         </div>

//         {/* Sign Up Form */}
//         <div
//           className={`absolute top-0 left-0 w-1/2 h-full opacity-0 transition-all duration-700 z-10 ${
//             isSignUp ? 'translate-x-full opacity-100 z-30' : ''
//           }`}
//         >
//           <form onSubmit={onSubmitHandler} className="flex flex-col items-center justify-center h-full px-10">
//             <h1 className="text-2xl font-bold mb-3 text-[#007189]">Create Account</h1>
//             <SocialIcons />
//             <span className="text-sm mb-2">or use your email for registration</span>
//             <input
//               type="text"
//               placeholder="Name"
//               className="input-style"
//               onChange={(e)=>setName(e.target.value)} value={name}
//             />
//             <input
//               type="email"
//               placeholder="Email"
//               className="input-style"
//               onChange={(e)=>setEmail(e.target.value)} value={email}
//             />
//             <input
//               type="password"
//               placeholder="Password"
//               className="input-style"
//               onChange={(e)=>setPassword(e.target.value)} value={password}
//             />
//             <button type='submit' className="btn-primary mt-4">Sign Up</button>
//           </form>
//         </div>

//         {/* Toggle Panel */}
//         <div
//           className={`absolute top-0 left-1/2 w-1/2 h-full bg-gradient-to-r bg-[#007189]  text-white rounded-bl-[150px] rounded-tl-[100px] transition-all duration-700 ${
//             isSignUp ? '-translate-x-full rounded-br-[150px] rounded-tr-[100px]' : ''
//           }`}
//         >
//           <div className="flex flex-col items-center justify-center h-full px-8 text-center">
//             {isSignUp ? (
//               <>
//                 <h1 className="text-2xl font-bold">Welcome Back!</h1>
//                 <p className="text-sm mt-2 mb-6">
//                   Enter your personal details to use all of site features
//                 </p>
//                 <button
//                   className="btn-outline"
//                   onClick={() => setIsSignUp(false)  }
//                 >
//                   Sign In
//                 </button>
//               </>
//             ) : (
//               <>
//                 <h1 className="text-2xl font-bold">Hello, Friend!</h1>
//                 <p className="text-sm mt-2 mb-6">
//                   Register with your personal details to use all of site features
//                 </p>
//                 <button
//                   className="btn-outline"
//                   onClick={() =>  setIsSignUp(true) }
//                 >
//                   Sign Up
//                 </button>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const SocialIcons = () => (
//   <div className="flex space-x-3 my-3">
//     {[FaGooglePlusG, FaFacebookF, FaGithub, FaLinkedinIn].map((Icon, idx) => (
//       <a
//         key={idx}
//         href="#"
//         className="border border-gray-300 rounded-full w-10 h-10 flex items-center justify-center text-gray-600 hover:text-[#007189] hover:border-[#007189] transition"
//       >
//         <Icon size={18} />
//       </a>
//     ))}
//   </div>
// );

// export default Login;




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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(99, 102, 241, 0.1) 1px, transparent 0)`,
          backgroundSize: '20px 20px'
        }}></div>
      </div>
      
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
            <h1 className="text-2xl font-bold mb-3 text-indigo-600">Sign In</h1>
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
            <h1 className="text-2xl font-bold mb-3 text-indigo-600">Create Account</h1>
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
          className={`absolute top-0 left-1/2 w-1/2 h-full bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-600 text-white rounded-bl-[150px] rounded-tl-[100px] transition-all duration-700 ${
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
      
      <style jsx>{`
        .input-style {
          @apply w-full px-4 py-3 mb-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-indigo-500 focus:bg-white text-sm;
        }
        
        .btn-primary {
          @apply bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 px-8 rounded-lg font-semibold hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105;
        }
        
        .btn-outline {
          @apply border-2 border-white text-white py-3 px-8 rounded-lg font-semibold hover:bg-white hover:text-indigo-600 transition-all duration-300;
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
        className="border border-gray-300 rounded-full w-10 h-10 flex items-center justify-center text-gray-600 hover:text-indigo-600 hover:border-indigo-600 transition"
      >
        <Icon size={18} />
      </a>
    ))}
  </div>
);

export default Login;





    




// *************************************


// import React, { useContext, useState } from 'react';
// import { FaGooglePlusG, FaFacebookF, FaGithub, FaLinkedinIn } from 'react-icons/fa';
// import { AppContext } from '../../context/AppContext';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';
// import { useEffect } from 'react';

// const Login = () => {
//   const [isSignUp, setIsSignUp] = useState(false);

//   const {backendUrl , token , setToken} = useContext(AppContext)
//   const navigate = useNavigate()

//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [name, setName] = useState('');

//   const onSubmitHandler = async(event) => {
//     event.preventDefault();

//     try {
//       if (isSignUp) {

//         const { data } = await axios.post(backendUrl + '/api/user/register', { name, email, password });
//         if (data.success) {
//           localStorage.setItem('token', data.token);
//           setToken(data.token);
//         } else {
//           toast.error(data.message);
//         }

//       } else{

//         const { data } = await axios.post(backendUrl + '/api/user/login', { email, password });
//         if (data.success) {
//           localStorage.setItem('token', data.token);
//           setToken(data.token);
//         } else {
//           toast.error(data.message);
//         }
//       }

//     } catch (error) {
//       toast.error(error.message);
//     }
//   }

//   useEffect(() => {
//     if (token) {
//       navigate('/')
//     }
//   }, [token])
  
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
//       {/* Background Pattern */}
//       <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5">
//         <div className="absolute inset-0" style={{
//           backgroundImage: `radial-gradient(circle at 1px 1px, rgba(99, 102, 241, 0.1) 1px, transparent 0)`,
//           backgroundSize: '20px 20px'
//         }}></div>
//       </div>

//       <div className="relative w-full max-w-5xl">
//         {/* Main Container */}
//         <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden min-h-[600px]">
          
//           {/* Decorative Background Elements */}
//           <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-indigo-400/20 to-purple-500/20 rounded-full blur-3xl -translate-y-32 translate-x-32"></div>
//           <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-blue-400/20 to-cyan-500/20 rounded-full blur-3xl translate-y-48 -translate-x-48"></div>
          
//           <div className="relative z-10 flex min-h-[600px]">
            
//             {/* Left Side - Forms */}
//             <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-12">
//               <div className="w-full max-w-md">
                
//                 {/* Logo Section */}
//                 <div className="text-center mb-8">
//                   <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
//                     <span className="text-white font-bold text-2xl">N</span>
//                   </div>
//                   <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
//                     NeuroDiary
//                   </h1>
//                   <p className="text-gray-500 text-sm mt-1">Your AI-powered mental wellness companion</p>
//                 </div>

//                 {/* Toggle Buttons */}
//                 <div className="flex bg-gray-100 rounded-2xl p-1 mb-8">
//                   <button
//                     onClick={() => setIsSignUp(false)}
//                     className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-300 ${
//                       !isSignUp 
//                         ? 'bg-white text-indigo-600 shadow-sm' 
//                         : 'text-gray-500 hover:text-gray-700'
//                     }`}
//                   >
//                     Sign In
//                   </button>
//                   <button
//                     onClick={() => setIsSignUp(true)}
//                     className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-300 ${
//                       isSignUp 
//                         ? 'bg-white text-indigo-600 shadow-sm' 
//                         : 'text-gray-500 hover:text-gray-700'
//                     }`}
//                   >
//                     Sign Up
//                   </button>
//                 </div>

//                 {/* Form Content */}
//                 <form onSubmit={onSubmitHandler} className="space-y-5">
//                   <div className="text-center mb-6">
//                     <h2 className="text-2xl font-bold text-gray-800 mb-2">
//                       {isSignUp ? 'Create your account' : 'Welcome back'}
//                     </h2>
//                     <p className="text-gray-500 text-sm">
//                       {isSignUp 
//                         ? 'Start your journey to better mental wellness' 
//                         : 'Continue your wellness journey'
//                       }
//                     </p>
//                   </div>

//                   {/* Social Login */}
//                   <SocialIcons />

//                   <div className="relative">
//                     <div className="absolute inset-0 flex items-center">
//                       <div className="w-full border-t border-gray-200"></div>
//                     </div>
//                     <div className="relative flex justify-center text-sm">
//                       <span className="px-4 bg-white text-gray-500">or continue with email</span>
//                     </div>
//                   </div>

//                   {/* Form Fields */}
//                   <div className="space-y-4">
//                     {isSignUp && (
//                       <div className="relative">
//                         <input
//                           type="text"
//                           placeholder="Full Name"
//                           className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 placeholder-gray-400"
//                           onChange={(e)=>setName(e.target.value)} 
//                           value={name}
//                         />
//                       </div>
//                     )}
                    
//                     <div className="relative">
//                       <input
//                         type="email"
//                         placeholder="Email address"
//                         className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 placeholder-gray-400"
//                         onChange={(e)=>setEmail(e.target.value)} 
//                         value={email}
//                       />
//                     </div>
                    
//                     <div className="relative">
//                       <input
//                         type="password"
//                         placeholder="Password"
//                         className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 placeholder-gray-400"
//                         onChange={(e)=>setPassword(e.target.value)} 
//                         value={password}
//                       />
//                     </div>
//                   </div>

//                   {/* Forgot Password */}
//                   {!isSignUp && (
//                     <div className="text-right">
//                       <a href="#" className="text-sm text-indigo-600 hover:text-indigo-700 font-medium transition-colors duration-200">
//                         Forgot your password?
//                       </a>
//                     </div>
//                   )}

//                   {/* Submit Button */}
//                   <button
//                     type="submit"
//                     className="w-full py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transform hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-xl"
//                   >
//                     {isSignUp ? 'Create Account' : 'Sign In'}
//                   </button>

//                   {/* Terms */}
//                   {isSignUp && (
//                     <p className="text-center text-xs text-gray-500 leading-relaxed">
//                       By creating an account, you agree to our{' '}
//                       <a href="#" className="text-indigo-600 hover:text-indigo-700">Terms of Service</a>{' '}
//                       and{' '}
//                       <a href="#" className="text-indigo-600 hover:text-indigo-700">Privacy Policy</a>
//                     </p>
//                   )}
//                 </form>
//               </div>
//             </div>

//             {/* Right Side - Illustration/Info */}
//             <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-600 items-center justify-center p-12 relative overflow-hidden">
              
//               {/* Background Pattern */}
//               <div className="absolute inset-0 opacity-10">
//                 <div className="absolute inset-0" style={{
//                   backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
//                   backgroundSize: '30px 30px'
//                 }}></div>
//               </div>

//               <div className="relative z-10 text-center text-white max-w-md">
//                 <div className="mb-8">
//                   <div className="inline-flex items-center justify-center w-24 h-24 bg-white/20 rounded-3xl mb-6 backdrop-blur-sm">
//                     <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
//                     </svg>
//                   </div>
//                 </div>

//                 <h3 className="text-3xl font-bold mb-4">
//                   {isSignUp ? 'Start Your Wellness Journey' : 'Welcome Back to NeuroDiary'}
//                 </h3>
                
//                 <p className="text-white/90 text-lg leading-relaxed mb-8">
//                   {isSignUp 
//                     ? 'Track your emotions, analyze patterns, and improve your mental well-being with AI-powered insights.'
//                     : 'Continue tracking your emotional journey and discover new insights about your mental wellness.'
//                   }
//                 </p>

//                 <div className="grid grid-cols-2 gap-4 text-left">
//                   <div className="flex items-center space-x-3">
//                     <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
//                       <span className="text-sm">🧠</span>
//                     </div>
//                     <span className="text-sm font-medium">AI Insights</span>
//                   </div>
//                   <div className="flex items-center space-x-3">
//                     <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
//                       <span className="text-sm">📊</span>
//                     </div>
//                     <span className="text-sm font-medium">Mood Analytics</span>
//                   </div>
//                   <div className="flex items-center space-x-3">
//                     <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
//                       <span className="text-sm">🎯</span>
//                     </div>
//                     <span className="text-sm font-medium">Goal Tracking</span>
//                   </div>
//                   <div className="flex items-center space-x-3">
//                     <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
//                       <span className="text-sm">🔒</span>
//                     </div>
//                     <span className="text-sm font-medium">Private & Secure</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const SocialIcons = () => (
//   <div className="flex justify-center space-x-4 mb-6">
//     {[
//       { Icon: FaGooglePlusG, color: 'hover:bg-red-50 hover:text-red-600 hover:border-red-200' },
//       { Icon: FaFacebookF, color: 'hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200' },
//       { Icon: FaGithub, color: 'hover:bg-gray-50 hover:text-gray-800 hover:border-gray-200' },
//       { Icon: FaLinkedinIn, color: 'hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200' }
//     ].map(({ Icon, color }, idx) => (
//       <button
//         key={idx}
//         className={`w-12 h-12 border border-gray-200 rounded-xl flex items-center justify-center text-gray-500 transition-all duration-300 ${color} transform hover:scale-105`}
//       >
//         <Icon size={18} />
//       </button>
//     ))}
//   </div>
// );

// export default Login;