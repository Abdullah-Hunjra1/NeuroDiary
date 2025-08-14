// import React, { useContext, useState } from "react";
// import { AppContext } from "../../context/AppContext";
// import { assets } from "../assets/assets";
// import axios from "axios";
// import { toast } from "react-toastify";

// const UserProfile = () => {
//   const { userData, setUserData, token, backendUrl, loadUserProfileData } =
//     useContext(AppContext);

//   const [isEdit, setIsEdit] = useState(false);
//   const [image, setImage] = useState(false);

//   const updateUserProfileData = async () => {
//     try {
//       const formData = new FormData();
//       formData.append("name", userData.name);
//       formData.append("phone", userData.phone);
//       formData.append("address", JSON.stringify(userData.address));
//       formData.append("gender", userData.gender);
//       formData.append("dob", userData.dob);
//       if (image) formData.append("image", image);

//       const { data } = await axios.post(
//         backendUrl + "/api/user/update-profile",
//         formData,
//         {
//           headers: { token },
//         }
//       );

//       if (data.success) {
//         toast.success(data.message);
//         await loadUserProfileData();
//         setIsEdit(false);
//         setImage(false);
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.message);
//     }
//   };

//   return (
//     userData && (

//       <div className="max-w-5xl mx-auto bg-[#CEE6F0] shadow rounded-lg overflow-hidden p-6 mt-8 mb-8">
//         <div className="flex items-center justify-between mb-6">
//           <div className="flex items-center gap-4">
//             <label htmlFor="image" className="relative cursor-pointer">
//               <img
//                 src={image ? URL.createObjectURL(image) : userData.image}
//                 alt="Profile"
//                 className="w-20 h-20 object-cover rounded-full"
//               />
//               {isEdit && (
//                 <input
//                   type="file"
//                   id="image"
//                   hidden
//                   onChange={(e) => setImage(e.target.files[0])}
//                 />
//               )}
//             </label>
//             <div>
//               <h2 className="text-xl font-semibold">{userData.name}</h2>
//               <p className="text-gray-500 text-sm">{userData.email}</p>
//             </div>
//           </div>
//           <button
//             className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//             onClick={() => (isEdit ? updateUserProfileData() : setIsEdit(true))}
//           >
//             {isEdit ? "Save" : "Edit"}
//           </button>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <label className="text-sm text-gray-600">Full Name</label>
//             {isEdit ? (
//               <input
//                 type="text"
//                 className="w-full mt-1 p-2 border rounded"
//                 value={userData.name}
//                 onChange={(e) =>
//                   setUserData((prev) => ({ ...prev, name: e.target.value }))
//                 }
//               />
//             ) : (
//               <p className="mt-1 text-gray-700">{userData.name}</p>
//             )}
//           </div>
//           <div>
//             <label className="text-sm text-gray-600">Phone</label>
//             {isEdit ? (
//               <input
//                 type="text"
//                 className="w-full mt-1 p-2 border rounded"
//                 value={userData.phone}
//                 onChange={(e) =>
//                   setUserData((prev) => ({ ...prev, phone: e.target.value }))
//                 }
//               />
//             ) : (
//               <p className="mt-1 text-gray-700">{userData.phone}</p>
//             )}
//           </div>
//           <div>
//             <label className="text-sm text-gray-600">Gender</label>
//             {isEdit ? (
//               <select
//                 className="w-full mt-1 p-2 border rounded"
//                 value={userData.gender}
//                 onChange={(e) =>
//                   setUserData((prev) => ({ ...prev, gender: e.target.value }))
//                 }
//               >
//                 <option value="Male">Male</option>
//                 <option value="Female">Female</option>
//               </select>
//             ) : (
//               <p className="mt-1 text-gray-700">{userData.gender}</p>
//             )}
//           </div>
//           <div>
//             <label className="text-sm text-gray-600">Date of Birth</label>
//             {isEdit ? (
//               <input
//                 type="date"
//                 className="w-full mt-1 p-2 border rounded"
//                 value={userData.dob}
//                 onChange={(e) =>
//                   setUserData((prev) => ({ ...prev, dob: e.target.value }))
//                 }
//               />
//             ) : (
//               <p className="mt-1 text-gray-700">{userData.dob}</p>
//             )}
//           </div>

//           <div>
//           <label className="text-sm text-gray-600">Email Address</label>
//           {/* <div className="flex items-center gap-4"> */}


//                 {isEdit ? (
//                   <input
//                     className=" w-full mt-1 p-2 border rounded"
//                     type="email"
//                     value={userData.email}
//                     onChange={(e) =>
//                       setUserData((prev) => ({
//                         ...prev,
//                         email: e.target.value,
//                       }))
//                     }
//                   />
//                 ) : (
//                   <p className=" text-blue-400">{userData.email}</p>
//                 )}
//           {/* </div> */}
//         </div>


//           <div className="md:col-span-2">
//             <label className="text-sm text-gray-600">Address</label>
//             {isEdit ? (
//               <div className="mt-1">
//                 <input
//                   className="w-full p-2 mb-2 border rounded"
//                   type="text"
//                   placeholder="Address Line 1"
//                   value={userData.address?.line1 || ""}
//                   onChange={(e) =>
//                     setUserData((prev) => ({
//                       ...prev,
//                       address: { ...prev.address, line1: e.target.value },
//                     }))
//                   }
//                 />
//                 <input
//                   className="w-full p-2 border rounded"
//                   type="text"
//                   placeholder="Address Line 2"
//                   value={userData.address?.line2 || ""}
//                   onChange={(e) =>
//                     setUserData((prev) => ({
//                       ...prev,
//                       address: { ...prev.address, line2: e.target.value },
//                     }))
//                   }
//                 />
//               </div>
//             ) : (
//               <p className="mt-1 text-gray-700">
//                 {userData.address?.line1}
//                 <br />
//                 {userData.address?.line2}
//               </p>
//             )}
//           </div>
//         </div>


//       </div>
//     )
//   );
// };

// export default UserProfile;



//  *********************



import React, { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
// import { assets } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const UserProfile = () => {
  const { userData, setUserData, token, loadUserProfileData } =
    useContext(AppContext);

  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("phone", userData.phone);
      formData.append("address", JSON.stringify(userData.address));
      formData.append("gender", userData.gender);
      formData.append("dob", userData.dob);
      if (image) formData.append("image", image);

      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      const { data } = await axios.post(
         `${backendUrl}/api/user/update-profile`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData();
        setIsEdit(false);
        setImage(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    userData && (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50 py-12 px-4 md:px-40">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="mb-8">
            <div className="text-center">
              <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-teal-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-3">
                Profile Settings
              </h1>
              <p className="text-slate-600 text-[15px]">
                Manage your personal information and preferences
              </p>
            </div>
          </div>

          {/* Main Profile Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 overflow-hidden ">
            {/* Profile Header */}
            <div className="relative bg-gradient-to-r from-teal-500 via-blue-500 to-indigo-600 px-8 py-6">
              <div className="flex flex-col md:flex-row items-center gap-6">
                {/* Profile Picture */}
                <div className="relative group">
                  <label htmlFor="image" className="cursor-pointer">
                    <div className="relative">
                      <img
                        src={image ? URL.createObjectURL(image) : userData.image}
                        alt="Profile"
                        className="w-16 h-16 object-cover rounded-2xl border-4 border-white/30 shadow-xl group-hover:scale-105 transition-transform duration-300"
                      />
                      {isEdit && (
                        <div className="absolute inset-0 bg-black/40 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </div>
                      )}
                    </div>
                    {isEdit && (
                      <input
                        type="file"
                        id="image"
                        hidden
                        onChange={(e) => setImage(e.target.files[0])}
                        accept="image/*"
                      />
                    )}
                  </label>
                </div>

                {/* Profile Info */}
                <div className="text-center md:text-left">
                  <h2 className="text-[22px] font-bold text-white ">
                    {userData.name}
                  </h2>
                  <p className="text-blue-100 text-[17px]">{userData.email}</p>
                </div>

                {/* Edit Button */}
                <div className="md:ml-auto">
                  <button
                    className={`px-4 py-2 rounded-2xl font-semibold text-lg transition-all duration-300 ${isEdit
                        ? "bg-green-500 hover:bg-green-600 text-white shadow-lg text-[15px]"
                        : "bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border border-white/30"
                      }`}
                    onClick={() => (isEdit ? updateUserProfileData() : setIsEdit(true))}
                  >
                    {isEdit ? (
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Save Changes
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-[15px]">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Edit Profile
                      </div>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Profile Form */}
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Personal Information Section */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-blue-500 rounded-xl flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-slate-800">Personal Information</h3>
                  </div>

                  {/* Full Name */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-600 uppercase tracking-wide">
                      Full Name
                    </label>
                    {isEdit ? (
                      <input
                        type="text"
                        className="w-full p-4 bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-teal-500 focus:outline-none focus:bg-white transition-all duration-200 text-slate-800"
                        value={userData.name}
                        onChange={(e) =>
                          setUserData((prev) => ({ ...prev, name: e.target.value }))
                        }
                      />
                    ) : (
                      <div className="p-4 bg-slate-50 rounded-xl">
                        <p className="text-slate-800 font-medium">{userData.name}</p>
                      </div>
                    )}
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-600 uppercase tracking-wide">
                      Email Address
                    </label>
                    {isEdit ? (
                      <input
                        type="email"
                        className="w-full p-4 bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-teal-500 focus:outline-none focus:bg-white transition-all duration-200 text-slate-800"
                        value={userData.email}
                        onChange={(e) =>
                          setUserData((prev) => ({ ...prev, email: e.target.value }))
                        }
                      />
                    ) : (
                      <div className="p-4 bg-slate-50 rounded-xl">
                        <p className="text-teal-600 font-medium">{userData.email}</p>
                      </div>
                    )}
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-600 uppercase tracking-wide">
                      Phone Number
                    </label>
                    {isEdit ? (
                      <input
                        type="tel"
                        className="w-full p-4 bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-teal-500 focus:outline-none focus:bg-white transition-all duration-200 text-slate-800"
                        value={userData.phone}
                        onChange={(e) =>
                          setUserData((prev) => ({ ...prev, phone: e.target.value }))
                        }
                      />
                    ) : (
                      <div className="p-4 bg-slate-50 rounded-xl">
                        <p className="text-slate-800 font-medium">{userData.phone || "Not provided"}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Additional Information Section */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-slate-800">Additional Details</h3>
                  </div>

                  {/* Gender */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-600 uppercase tracking-wide">
                      Gender
                    </label>
                    {isEdit ? (
                      <select
                        className="w-full p-4 bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-teal-500 focus:outline-none focus:bg-white transition-all duration-200 text-slate-800"
                        value={userData.gender}
                        onChange={(e) =>
                          setUserData((prev) => ({ ...prev, gender: e.target.value }))
                        }
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                        <option value="Prefer not to say">Prefer not to say</option>
                      </select>
                    ) : (
                      <div className="p-4 bg-slate-50 rounded-xl">
                        <p className="text-slate-800 font-medium">{userData.gender || "Not specified"}</p>
                      </div>
                    )}
                  </div>

                  {/* Date of Birth */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-600 uppercase tracking-wide">
                      Date of Birth
                    </label>
                    {isEdit ? (
                      <input
                        type="date"
                        className="w-full p-4 bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-teal-500 focus:outline-none focus:bg-white transition-all duration-200 text-slate-800"
                        value={userData.dob}
                        onChange={(e) =>
                          setUserData((prev) => ({ ...prev, dob: e.target.value }))
                        }
                      />
                    ) : (
                      <div className="p-4 bg-slate-50 rounded-xl">
                        <p className="text-slate-800 font-medium">{userData.dob || "Not provided"}</p>
                      </div>
                    )}
                  </div>

                  {/* Address */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-600 uppercase tracking-wide">
                      Address
                    </label>
                    {isEdit ? (
                      <div className="space-y-3">
                        <input
                          className="w-full p-4 bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-teal-500 focus:outline-none focus:bg-white transition-all duration-200 text-slate-800"
                          type="text"
                          placeholder="Address Line 1"
                          value={userData.address?.line1 || ""}
                          onChange={(e) =>
                            setUserData((prev) => ({
                              ...prev,
                              address: { ...prev.address, line1: e.target.value },
                            }))
                          }
                        />
                        <input
                          className="w-full p-4 bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-teal-500 focus:outline-none focus:bg-white transition-all duration-200 text-slate-800"
                          type="text"
                          placeholder="Address Line 2"
                          value={userData.address?.line2 || ""}
                          onChange={(e) =>
                            setUserData((prev) => ({
                              ...prev,
                              address: { ...prev.address, line2: e.target.value },
                            }))
                          }
                        />
                      </div>
                    ) : (
                      <div className="p-4 bg-slate-50 rounded-xl">
                        <p className="text-slate-800 font-medium">
                          {userData.address?.line1 || "Not provided"}
                          {userData.address?.line2 && (
                            <>
                              <br />
                              {userData.address.line2}
                            </>
                          )}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              {isEdit && (
                <div className="mt-10 pt-8 border-t border-slate-200">
                  <div className="flex flex-col sm:flex-row gap-4 justify-center sm:justify-end">
                    <button
                      onClick={() => {
                        setIsEdit(false);
                        setImage(false);
                        loadUserProfileData(); // Reset to original data
                      }}
                      className="px-8 py-3 bg-slate-200 text-slate-700 rounded-2xl font-semibold hover:bg-slate-300 transition-colors duration-200"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={updateUserProfileData}
                      className="px-8 py-3 bg-gradient-to-r from-teal-500 to-blue-600 text-white rounded-2xl font-semibold hover:from-teal-600 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Stats Section */}
            <div className="bg-gradient-to-r from-slate-50 to-blue-50 px-8 py-6 border-t border-slate-200">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-teal-400 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-2">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <p className="text-2xl font-bold text-slate-800">47</p>
                  <p className="text-sm text-slate-600">Journal Entries</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-2">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <p className="text-2xl font-bold text-slate-800">23</p>
                  <p className="text-sm text-slate-600">Days Active</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-2">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <p className="text-2xl font-bold text-slate-800">8.2</p>
                  <p className="text-sm text-slate-600">Avg. Mood</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-2">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <p className="text-2xl font-bold text-slate-800">12</p>
                  <p className="text-sm text-slate-600">Insights</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default UserProfile;