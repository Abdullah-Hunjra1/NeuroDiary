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
        <section className="relative py-8">
          <div className="absolute inset-0 bg-gradient-to-r from-teal-50/20 via-transparent to-cyan-50/20"></div>
          <div className="relative max-w-5xl mx-auto px-4 sm:px-6">
            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-white/40 overflow-hidden">
              <div className="grid lg:grid-cols-5">
                {/* Left Side - Contact Info */}
                <div className="lg:col-span-2 bg-gradient-to-br from-slate-800 to-slate-900 text-white p-8 relative overflow-hidden">
                  {/* Background decoration */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-teal-500 rounded-full opacity-10 transform translate-x-12 -translate-y-12"></div>
                  <div className="absolute bottom-0 left-0 w-20 h-20 bg-cyan-500 rounded-full opacity-10 transform -translate-x-10 translate-y-10"></div>

                  <div className="relative z-10">
                    <h3 className="text-xl font-bold mb-6">Contact Information</h3>
                    <p className="text-gray-300 mb-8 text-sm leading-relaxed">
                      Ready to transform your mental health journey? Reach out to us and let's start the conversation.
                    </p>

                    <div className="space-y-6">
                      <div className="flex items-start gap-3 group">
                        <div className="flex-shrink-0 w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center group-hover:bg-teal-500 transition-colors">
                          <FaMapMarkerAlt className="text-sm" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm mb-1">Address</h4>
                          <p className="text-gray-300 leading-relaxed text-xs">
                            2912 Meadowbrook Road<br />
                            Los Angeles, CA 90017
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 group">
                        <div className="flex-shrink-0 w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center group-hover:bg-green-500 transition-colors">
                          <FaEnvelope className="text-sm" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm mb-1">Email</h4>
                          <p className="text-gray-300 text-xs">lorem@ipsum.com</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 group">
                        <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center group-hover:bg-blue-500 transition-colors">
                          <FaPhoneAlt className="text-sm" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm mb-1">Phone</h4>
                          <p className="text-gray-300 text-xs">314-386-1623</p>
                        </div>
                      </div>
                    </div>

                    {/* Social Icons */}
                    <div className="mt-8 pt-6 border-t border-gray-700">
                      <h4 className="font-semibold text-sm mb-4">Follow Us</h4>
                      <div className="flex gap-3">
                        {[
                          { icon: FaFacebookF, bg: 'bg-blue-600 hover:bg-blue-500' },
                          { icon: FaTwitter, bg: 'bg-sky-500 hover:bg-sky-400' },
                          { icon: FaInstagram, bg: 'bg-pink-600 hover:bg-pink-500' },
                          { icon: FaLinkedinIn, bg: 'bg-blue-700 hover:bg-blue-600' }
                        ].map((social, index) => (
                          <div key={index} className={`w-8 h-8 ${social.bg} rounded-lg flex items-center justify-center cursor-pointer transition-all transform hover:scale-110`}>
                            <social.icon className="text-sm" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Side - Form */}
                <div className="lg:col-span-3 p-8">
                  <div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2">Send us a Message</h3>
                    <p className="text-slate-600 mb-6 text-sm">
                      Fill out the form below and we'll get back to you within 24 hours.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">First Name *</label>
                          <input
                            type="text"
                            name="firstName"
                            value={form.firstName}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all outline-none text-sm"
                            placeholder="Enter your first name"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">Last Name *</label>
                          <input
                            type="text"
                            name="lastName"
                            value={form.lastName}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all outline-none text-sm"
                            placeholder="Enter your last name"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address *</label>
                          <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all outline-none text-sm"
                            placeholder="Enter your email"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number</label>
                          <input
                            type="tel"
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all outline-none text-sm"
                            placeholder="Enter your phone number"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Message *</label>
                        <textarea
                          name="message"
                          value={form.message}
                          onChange={handleChange}
                          placeholder="Tell us about your inquiry..."
                          rows="4"
                          required
                          className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all outline-none resize-none text-sm"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-semibold px-4 py-2.5 rounded-lg transition-all transform hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2 text-sm"
                      >
                        {isLoading ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <span>Sending...</span>
                          </>
                        ) : (
                          <>
                            <span>Send Message</span>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
        </section>

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