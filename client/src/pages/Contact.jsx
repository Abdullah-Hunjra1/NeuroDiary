// import React from 'react';
// import { useState } from 'react';
// import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';
// import { toast } from 'react-toastify';

// const Contact = () => {
//   const [form, setForm] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     phone: '',
//     message: '',
//   });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await fetch('http://localhost:5000/api/contact', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(form),
//       });

//       const data = await res.json();
//       if (data.success) {
//         toast.success("Message sent successfully!");
//         setForm({ firstName: '', lastName: '', email: '', phone: '', message: '' });
//       } else {
//         toast.error("Failed to send message.");
//       }
//     } catch (error) {
//       toast.error("Error connecting to server.");
//     }
//   };


//   return (
//     <div className="min-h-screen flex justify-center items-center bg-[#CEE6F0] px-4 py-10">
//       <div className="bg-white rounded-xl shadow-lg flex flex-col md:flex-row w-full max-w-6xl overflow-hidden">
//         {/* Left Side - Contact Info */}
//         <div className="bg-[#007189] text-white p-8 md:w-1/3 flex flex-col justify-between">
//           <div>
//             <h3 className="text-2xl font-bold mb-6">Contact Info</h3>
//             <div className="space-y-4 text-sm">
//               <div className="flex items-start gap-3">
//                 <FaMapMarkerAlt className="mt-1" />
//                 <p>2912 Meadowbrook Road<br />Los Angeles, CA 90017</p>
//               </div>
//               <div className="flex items-center gap-3">
//                 <FaEnvelope />
//                 <p>lorem@ipsum.com</p>
//               </div>
//               <div className="flex items-center gap-3">
//                 <FaPhoneAlt />
//                 <p>314-386-1623</p>
//               </div>
//             </div>
//           </div>

//           {/* Social Icons */}
//           <div className="flex gap-4 mt-8">
//             <FaFacebookF className="cursor-pointer hover:text-gray-300" />
//             <FaTwitter className="cursor-pointer hover:text-gray-300" />
//             <FaInstagram className="cursor-pointer hover:text-gray-300" />
//             <FaLinkedinIn className="cursor-pointer hover:text-gray-300" />
//           </div>
//         </div>

//         {/* Right Side - Form */}
//         <div className="p-8 md:w-2/3 bg-white">
//           <h3 className="text-2xl font-bold text-[#007189] mb-6">Send a Message</h3>
//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div className="grid grid-cols-2 gap-4">
//               <input type="text" name="firstName" value={form.firstName} onChange={handleChange} placeholder="First Name" required className="border-b border-gray-400 outline-none py-1" />
//               <input type="text" name="lastName" value={form.lastName} onChange={handleChange} placeholder="Last Name" required className="border-b border-gray-400 outline-none py-1" />
//               <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email Address" required className="border-b border-gray-400 outline-none py-1" />
//               <input type="text" name="phone" value={form.phone} onChange={handleChange} placeholder="Mobile Number" className="border-b border-gray-400 outline-none py-1" />
//             </div>
//             <textarea name="message" value={form.message} onChange={handleChange} placeholder="Write your message here..." rows="4" className="w-full border-b border-gray-400 outline-none py-1" required />
//             <button type="submit" className="bg-[#007189] text-white px-6 py-2 rounded hover:bg-[#005a6d] transition">Send</button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Contact;



// // import React, { useState } from 'react';
// // import { toast } from 'react-toastify';

// // const Contact = () => {
// //   const [form, setForm] = useState({
// //     firstName: '',
// //     lastName: '',
// //     email: '',
// //     phone: '',
// //     message: '',
// //   });

// //   const handleChange = (e) => {
// //     setForm({ ...form, [e.target.name]: e.target.value });
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     try {
// //       const res = await fetch('http://localhost:5000/api/contact', {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify(form),
// //       });

// //       const data = await res.json();
// //       if (data.success) {
// //         toast.success("Message sent successfully!");
// //         setForm({ firstName: '', lastName: '', email: '', phone: '', message: '' });
// //       } else {
// //         toast.error("Failed to send message.");
// //       }
// //     } catch (error) {
// //       toast.error("Error connecting to server.");
// //     }
// //   };

// //   return (
// //     <section className="bg-[#cdeaf5] min-h-screen flex items-center justify-center py-16 px-6">
// //       <div className="bg-white shadow-lg rounded-lg flex w-full max-w-5xl overflow-hidden">
// //         {/* Left Side - Contact Info */}
// //         <div className="bg-[#007189] text-white w-1/3 p-8 flex flex-col justify-between">
// //           <div>
// //             <h2 className="text-2xl font-semibold mb-6">Contact Info</h2>
// //             <p className="mb-4">
// //               📍 2912 Meadowbrook Road<br />
// //               Los Angeles, CA 90017
// //             </p>
// //             <p className="mb-2">📧 lorem@ipsum.com</p>
// //             <p className="mb-6">📞 310-386-1623</p>
// //           </div>
// //           <div className="flex space-x-4 mt-6">
// //             <i className="fab fa-facebook-f"></i>
// //             <i className="fab fa-instagram"></i>
// //             <i className="fab fa-twitter"></i>
// //             <i className="fab fa-linkedin-in"></i>
// //           </div>
// //         </div>

// //         {/* Right Side - Form */}
// //         <div className="w-2/3 p-8">
// //           <h2 className="text-2xl font-semibold text-[#007189] mb-4">Send a Message</h2>
// //           <form onSubmit={handleSubmit} className="space-y-6">
// //             <div className="grid grid-cols-2 gap-4">
// //               <input type="text" name="firstName" value={form.firstName} onChange={handleChange} placeholder="First Name" required className="border-b border-gray-400 outline-none py-1" />
// //               <input type="text" name="lastName" value={form.lastName} onChange={handleChange} placeholder="Last Name" required className="border-b border-gray-400 outline-none py-1" />
// //               <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email Address" required className="border-b border-gray-400 outline-none py-1" />
// //               <input type="text" name="phone" value={form.phone} onChange={handleChange} placeholder="Mobile Number" className="border-b border-gray-400 outline-none py-1" />
// //             </div>
// //             <textarea name="message" value={form.message} onChange={handleChange} placeholder="Write your message here..." rows="4" className="w-full border-b border-gray-400 outline-none py-1" required />
// //             <button type="submit" className="bg-[#007189] text-white px-6 py-2 rounded hover:bg-[#005a6d] transition">Send</button>
// //           </form>
// //         </div>
// //       </div>
// //     </section>
// //   );
// // };

// // export default Contact;


import React from 'react';
import { useState } from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';

const Contact = () => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Message sent successfully!");
        setForm({ firstName: '', lastName: '', email: '', phone: '', message: '' });
      } else {
        toast.error("Failed to send message.");
      }
    } catch (error) {
      toast.error("Error connecting to server.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-100 py-16 px-18">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">
            Get In <span className="text-blue-600">Touch</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Have questions about NeuroDiary? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Main Contact Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-16">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="flex flex-col lg:flex-row">

              {/* Left Side - Contact Info */}
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 text-white p-12 lg:w-2/5 relative overflow-hidden">
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 rounded-full opacity-10 transform translate-x-16 -translate-y-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-indigo-500 rounded-full opacity-10 transform -translate-x-12 translate-y-12"></div>

                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-8">Contact Information</h3>
                  <p className="text-gray-300 mb-12 text-md leading-relaxed">
                    Ready to transform your mental health journey? Reach out to us and let's start the conversation.
                  </p>

                  <div className="space-y-8">
                    <div className="flex items-start gap-4 group">
                      <div className="flex-shrink-0 w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center group-hover:bg-blue-500 transition-colors">
                        <FaMapMarkerAlt className="text-md" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-md mb-1">Address</h4>
                        <p className="text-gray-300 leading-relaxed text-sm">
                          2912 Meadowbrook Road<br />
                          Los Angeles, CA 90017
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 group">
                      <div className="flex-shrink-0 w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center group-hover:bg-green-500 transition-colors">
                        <FaEnvelope className="text-lg" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-md mb-1">Email</h4>
                        <p className="text-gray-300 text-sm">lorem@ipsum.com</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 group">
                      <div className="flex-shrink-0 w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center group-hover:bg-purple-500 transition-colors">
                        <FaPhoneAlt className="text-lg" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-md mb-1">Phone</h4>
                        <p className="text-gray-300 text-sm">314-386-1623</p>
                      </div>
                    </div>
                  </div>

                  {/* Social Icons */}
                  <div className="mt-12 pt-8 border-t border-gray-700">
                    <h4 className="font-semibold text-lg mb-6">Follow Us</h4>
                    <div className="flex gap-4">
                      {[
                        { icon: FaFacebookF, bg: 'bg-blue-600 hover:bg-blue-500' },
                        { icon: FaTwitter, bg: 'bg-sky-500 hover:bg-sky-400' },
                        { icon: FaInstagram, bg: 'bg-pink-600 hover:bg-pink-500' },
                        { icon: FaLinkedinIn, bg: 'bg-blue-700 hover:bg-blue-600' }
                      ].map((social, index) => (
                        <div key={index} className={`w-10 h-10 ${social.bg} rounded-xl flex items-center justify-center cursor-pointer transition-all transform hover:scale-110`}>
                          <social.icon className="text-md" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - Form */}
              <div className="p-12 lg:w-3/5">
                <div className="max-w-2xl">
                  <h3 className="text-2xl font-bold text-slate-800 mb-3">Send us a Message</h3>
                  <p className="text-gray-600 mb-8 text-md">
                    Fill out the form below and we'll get back to you within 24 hours.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="group">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">First Name *</label>
                        <input
                          type="text"
                          name="firstName"
                          value={form.firstName}
                          onChange={handleChange}
                          required
                          className="w-full px-3 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none group-hover:bg-gray-100"
                          placeholder="Enter your first name"
                        />
                      </div>

                      <div className="group">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name *</label>
                        <input
                          type="text"
                          name="lastName"
                          value={form.lastName}
                          onChange={handleChange}
                          required
                          className="w-full px-3 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none group-hover:bg-gray-100"
                          placeholder="Enter your last name"
                        />
                      </div>

                      <div className="group">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          required
                          className="w-full px-3 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none group-hover:bg-gray-100"
                          placeholder="Enter your email"
                        />
                      </div>

                      <div className="group">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                        <input
                          type="tel"
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          className="w-full px-3 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none group-hover:bg-gray-100"
                          placeholder="Enter your phone number"
                        />
                      </div>
                    </div>

                    <div className="group">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Message *</label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Tell us about your inquiry..."
                        rows="6"
                        required
                        className="w-full px-3 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none resize-none group-hover:bg-gray-100"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full md:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-6 py-3 rounded-xl transition-all transform hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
                    >
                      {isLoading ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <span>Send Message</span>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                          </svg>
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 px-8">
          <div className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-xl transition-shadow">
            <div className="w-13 h-13 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-3">Quick Response</h3>
            <p className="text-gray-600 text-[15px]">We typically respond to all inquiries within 24 hours during business days.</p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-xl transition-shadow">
            <div className="w-13 h-13 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-3">Expert Support</h3>
            <p className="text-gray-600 text-[15px]">Our team of mental health technology experts is here to help you succeed.</p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-xl transition-shadow">
            <div className="w-13 h-13 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
              </svg>
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-3">Secure & Private</h3>
            <p className="text-gray-600 text-[15px]">Your information is protected with enterprise-grade security and privacy measures.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;