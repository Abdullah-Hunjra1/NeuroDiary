// // src/pages/AdminLogin.jsx
// import React, { useContext, useState, useEffect } from 'react';
// import { AppContext } from '../../context/AppContext';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';

// const AdminLogin = () => {
//   const { backendUrl, token, setToken } = useContext(AppContext);
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const onSubmitHandler = async (event) => {
//     event.preventDefault();
//     try {
//       const { data } = await axios.post(`${backendUrl}/api/admin/login`, { email, password });
//       if (data.success) {
//         localStorage.setItem('adminToken', data.token);
//         setToken(data.token);
//         navigate('/admin/dashboard');
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || error.message);
//     }
//   };

//   useEffect(() => {
//     if (token) {
//       navigate('/admin/dashboard');
//     }
//   }, [token, navigate]);

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
//       {/* Background Pattern */}
//       <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5">
//         <div
//           className="absolute inset-0"
//           style={{
//             backgroundImage: `radial-gradient(circle at 1px 1px, rgba(99, 102, 241, 0.1) 1px, transparent 0)`,
//             backgroundSize: '20px 20px',
//           }}
//         ></div>
//       </div>

//       <div className="relative w-full max-w-md bg-white rounded-2xl shadow-lg p-8 z-10">
//         <h1 className="text-2xl font-bold mb-6 text-center text-indigo-600">
//           Admin Login
//         </h1>
//         <form onSubmit={onSubmitHandler} className="space-y-4">
//           <input
//             type="email"
//             placeholder="Admin Email"
//             className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-indigo-500 focus:bg-white text-sm"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-indigo-500 focus:bg-white text-sm"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <button
//             type="submit"
//             className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg font-semibold hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
//           >
//             Sign In
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AdminLogin;




// src/pages/AdminLogin.jsx
import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const { backendUrl, token, setToken } = useContext(AppContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    
    try {
      const { data } = await axios.post(`${backendUrl}/api/admin/login`, { email, password });
      if (data.success) {
        localStorage.setItem('adminToken', data.token);
        setToken(data.token);
        navigate('/admin/dashboard');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      navigate('/admin-dashboard');
    }
  }, [token, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(99, 102, 241, 0.1) 1px, transparent 0)`,
            backgroundSize: '20px 20px',
          }}
        ></div>
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
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
                <span className="text-white font-bold text-xl">N</span>
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                NeuroDiary
              </h1>
              <p className="text-gray-500 text-sm mt-1">Admin Portal</p>
            </div>

            {/* Admin Login Content */}
            <div className="text-center mb-5">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-2xl mb-6">
                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Admin Login
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed">
                Sign in to access the admin dashboard
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={onSubmitHandler} className="space-y-5 ">
              <div className="space-y-4">
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Admin Email"
                    className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 placeholder-gray-400"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                
                <div className="relative">
                  <input
                    type="password"
                    placeholder="Password"
                    className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 placeholder-gray-400"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transform hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Signing In...
                  </div>
                ) : (
                  'Admin Login'
                )}
              </button>
            </form>

            {/* Back to Main Site */}
            {/* <div className="text-center mt-6 pt-6 border-t border-gray-100">
              <button
                onClick={() => navigate('/')}
                className="text-gray-500 hover:text-gray-700 text-sm transition-colors duration-200 flex items-center justify-center"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Main Site
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;