// import React, { useContext, useState } from 'react'
// import { AppContext } from '../../context/AppContext'
// import { assets } from '../assets/assets'
// import axios from 'axios'
// import { toast } from 'react-toastify'

// const UserProfile = () => {
//   const {userData, setUserData, token, backendUrl, loadUserProfileData} =  useContext(AppContext)

//   const [isEdit, setIsEdit] = useState(false)
//   const [image , setImage] = useState(false)

//   const updateUserProfileData = async () => {

//     try {

//       const formData = new FormData()

//       formData.append('name', userData.name)
//       formData.append('phone', userData.phone)
//       formData.append('address', JSON.stringify(userData.address))
//       formData.append('gender', userData.gender)
//       formData.append('dob', userData.dob)

//       image && formData.append('image', image)

//       const {data} = await axios.post(backendUrl + '/api/user/update-profile', formData, {headers: {token}})

//       if (data.success) {
//         toast.success(data.message)
//         await loadUserProfileData()
//         setIsEdit(false)
//         setImage(false)
//       } else {
//         toast.error(data.message)
//       }

//     } catch (error) {
//         console.log(error);
//         toast.error(error.message)
//     }
//   }

//   return userData && (
//     <div className=' max-w-lg flex flex-col gap-2 text-sm'>

//       {
//         isEdit
//         ? <label htmlFor="image">
//           <div className=' inline-block relative cursor-pointer'>
//             <img className='w-36 rounded opacity-75' src={image ? URL.createObjectURL(image) : userData.image} alt="" />
//             <img className='w-10 absolute bottom-12 right-12' src={image ? '' : assets.upload_icon} alt="" />
//           </div>
//           <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden />
//         </label>
//         : <img className=' w-36 rounded' src={userData.image} alt="" />

//       }

//       {
//         isEdit
//         ? <input className=' bg-gray-50 text-3xl font-medium max-w-60 mt-4' type="text" value={userData.name} onChange={(e) => setUserData(prev => ({...prev,name:e.target.value}))}/>
//         : <p className=' font-medium text-3xl text-neutral-800 mt-4'>{userData.name}</p>
//       }

//       <hr className=' bg-zinc-400 h-[1px] border-none' />
//       <div>
//         <p className=' text-neutral-500 underline mt-3'>CONTACT INFORMATION</p>
//         <div className=' grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
//           <p className=' font-medium'>Email id:</p>
//           <p className=' text-blue-500'>{userData.email}</p>
//           <p className=' font-medium'>Phone:</p>
//           {
//             isEdit
//             ? <input className=' bg-gray-100 max-w-52' type="text" value={userData.phone} onChange={(e) => setUserData(prev => ({...prev,phone:e.target.value}))}/>
//             : <p className=' text-blue-400'>{userData.phone}</p>
//           }
//           <p className=' font-medium'>Address:</p>
//           {
//             isEdit
//             ? <p>
//               <input className=' bg-gray-50' onChange={(e) =>setUserData( (prev) => ({...prev, address: {...prev.address, line1:e.target.value}}))} value={userData.address.line1} type="text" />
//               <br />
//               <input className=' bg-gray-50' onChange={(e) =>setUserData( (prev) => ({...prev, address: {...prev.address, line2:e.target.value}}))} value={userData.address.line2} type="text" />
//             </p>
//             : <p className=' text-gray-500'>
//               {userData.address.line1}
//               <br />
//               {userData.address.line2}
//             </p>
//           }
//         </div>
//       </div>

//       <div>
//         <p className=' text-neutral-500 underline mt-3'>BASIC INFORMATION</p>
//         <div className=' grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
//           <p className=' font-medium'>Gender:</p>
//           {
//         isEdit
//         ? <select className=' max-w-20 bg-gray-100' onChange={(e) => setUserData(prev=> ({...prev, gender : e.target.value}))} value={userData.gender}>
//           <option value="Male">Male</option>
//           <option value="Female">Female</option>
//         </select>
//         : <p className=' text-gray-400'>{userData.gender}</p>
//       }
//       <p className=' font-medium'>Birthday:</p>
//       {
//         isEdit
//         ? <input className=' max-w-28 bg-gray-100' type="date" onChange={(e) => setUserData(prev=> ({...prev, dob : e.target.value}))} value={userData.dob}/>
//         : <p className=' text-gray-400'>{userData.dob}</p>
//       }
//         </div>
//       </div>

//       <div className=' mt-10'>
//         {
//           isEdit
//           ? <button className=' border border-purple-900 px-8 py-2 rounded-full hover:bg-purple-800 hover:text-white transition-all' onClick={updateUserProfileData}>Save Information</button>
//           : <button className=' border border-purple-900 px-8 py-2 rounded-full hover:bg-purple-800 hover:text-white transition-all' onClick={()=>setIsEdit(true)}>Edit</button>
//         }
//       </div>
//     </div>
//   )
// }

// export default UserProfile

import React, { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { assets } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const UserProfile = () => {
  const { userData, setUserData, token, backendUrl, loadUserProfileData } =
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

      const { data } = await axios.post(
        backendUrl + "/api/user/update-profile",
        formData,
        {
          headers: { token },
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
      
      <div className="max-w-5xl mx-auto bg-[#CEE6F0] shadow rounded-lg overflow-hidden p-6 mt-8 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <label htmlFor="image" className="relative cursor-pointer">
              <img
                src={image ? URL.createObjectURL(image) : userData.image}
                alt="Profile"
                className="w-20 h-20 object-cover rounded-full"
              />
              {isEdit && (
                <input
                  type="file"
                  id="image"
                  hidden
                  onChange={(e) => setImage(e.target.files[0])}
                />
              )}
            </label>
            <div>
              <h2 className="text-xl font-semibold">{userData.name}</h2>
              <p className="text-gray-500 text-sm">{userData.email}</p>
            </div>
          </div>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={() => (isEdit ? updateUserProfileData() : setIsEdit(true))}
          >
            {isEdit ? "Save" : "Edit"}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-600">Full Name</label>
            {isEdit ? (
              <input
                type="text"
                className="w-full mt-1 p-2 border rounded"
                value={userData.name}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, name: e.target.value }))
                }
              />
            ) : (
              <p className="mt-1 text-gray-700">{userData.name}</p>
            )}
          </div>
          <div>
            <label className="text-sm text-gray-600">Phone</label>
            {isEdit ? (
              <input
                type="text"
                className="w-full mt-1 p-2 border rounded"
                value={userData.phone}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, phone: e.target.value }))
                }
              />
            ) : (
              <p className="mt-1 text-gray-700">{userData.phone}</p>
            )}
          </div>
          <div>
            <label className="text-sm text-gray-600">Gender</label>
            {isEdit ? (
              <select
                className="w-full mt-1 p-2 border rounded"
                value={userData.gender}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, gender: e.target.value }))
                }
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            ) : (
              <p className="mt-1 text-gray-700">{userData.gender}</p>
            )}
          </div>
          <div>
            <label className="text-sm text-gray-600">Date of Birth</label>
            {isEdit ? (
              <input
                type="date"
                className="w-full mt-1 p-2 border rounded"
                value={userData.dob}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, dob: e.target.value }))
                }
              />
            ) : (
              <p className="mt-1 text-gray-700">{userData.dob}</p>
            )}
          </div>

          <div>
          <label className="text-sm text-gray-600">Email Address</label>
          {/* <div className="flex items-center gap-4"> */}

           
                {isEdit ? (
                  <input
                    className=" w-full mt-1 p-2 border rounded"
                    type="email"
                    value={userData.email}
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                  />
                ) : (
                  <p className=" text-blue-400">{userData.email}</p>
                )}
          {/* </div> */}
        </div>


          <div className="md:col-span-2">
            <label className="text-sm text-gray-600">Address</label>
            {isEdit ? (
              <div className="mt-1">
                <input
                  className="w-full p-2 mb-2 border rounded"
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
                  className="w-full p-2 border rounded"
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
              <p className="mt-1 text-gray-700">
                {userData.address?.line1}
                <br />
                {userData.address?.line2}
              </p>
            )}
          </div>
        </div>

        
      </div>
    )
  );
};

export default UserProfile;
