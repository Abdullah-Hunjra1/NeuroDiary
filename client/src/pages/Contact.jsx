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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
    }
  };


  return (
    <div className="min-h-screen flex justify-center items-center bg-[#CEE6F0] px-4 py-10">
      <div className="bg-white rounded-xl shadow-lg flex flex-col md:flex-row w-full max-w-6xl overflow-hidden">
        {/* Left Side - Contact Info */}
        <div className="bg-[#007189] text-white p-8 md:w-1/3 flex flex-col justify-between">
          <div>
            <h3 className="text-2xl font-bold mb-6">Contact Info</h3>
            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="mt-1" />
                <p>2912 Meadowbrook Road<br />Los Angeles, CA 90017</p>
              </div>
              <div className="flex items-center gap-3">
                <FaEnvelope />
                <p>lorem@ipsum.com</p>
              </div>
              <div className="flex items-center gap-3">
                <FaPhoneAlt />
                <p>314-386-1623</p>
              </div>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex gap-4 mt-8">
            <FaFacebookF className="cursor-pointer hover:text-gray-300" />
            <FaTwitter className="cursor-pointer hover:text-gray-300" />
            <FaInstagram className="cursor-pointer hover:text-gray-300" />
            <FaLinkedinIn className="cursor-pointer hover:text-gray-300" />
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="p-8 md:w-2/3 bg-white">
          <h3 className="text-2xl font-bold text-[#007189] mb-6">Send a Message</h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <input type="text" name="firstName" value={form.firstName} onChange={handleChange} placeholder="First Name" required className="border-b border-gray-400 outline-none py-1" />
              <input type="text" name="lastName" value={form.lastName} onChange={handleChange} placeholder="Last Name" required className="border-b border-gray-400 outline-none py-1" />
              <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email Address" required className="border-b border-gray-400 outline-none py-1" />
              <input type="text" name="phone" value={form.phone} onChange={handleChange} placeholder="Mobile Number" className="border-b border-gray-400 outline-none py-1" />
            </div>
            <textarea name="message" value={form.message} onChange={handleChange} placeholder="Write your message here..." rows="4" className="w-full border-b border-gray-400 outline-none py-1" required />
            <button type="submit" className="bg-[#007189] text-white px-6 py-2 rounded hover:bg-[#005a6d] transition">Send</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;



// import React, { useState } from 'react';
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
//     <section className="bg-[#cdeaf5] min-h-screen flex items-center justify-center py-16 px-6">
//       <div className="bg-white shadow-lg rounded-lg flex w-full max-w-5xl overflow-hidden">
//         {/* Left Side - Contact Info */}
//         <div className="bg-[#007189] text-white w-1/3 p-8 flex flex-col justify-between">
//           <div>
//             <h2 className="text-2xl font-semibold mb-6">Contact Info</h2>
//             <p className="mb-4">
//               📍 2912 Meadowbrook Road<br />
//               Los Angeles, CA 90017
//             </p>
//             <p className="mb-2">📧 lorem@ipsum.com</p>
//             <p className="mb-6">📞 310-386-1623</p>
//           </div>
//           <div className="flex space-x-4 mt-6">
//             <i className="fab fa-facebook-f"></i>
//             <i className="fab fa-instagram"></i>
//             <i className="fab fa-twitter"></i>
//             <i className="fab fa-linkedin-in"></i>
//           </div>
//         </div>

//         {/* Right Side - Form */}
//         <div className="w-2/3 p-8">
//           <h2 className="text-2xl font-semibold text-[#007189] mb-4">Send a Message</h2>
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
//     </section>
//   );
// };

// export default Contact;
