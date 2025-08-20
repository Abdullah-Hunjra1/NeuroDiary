// import { createContext, useState, useEffect } from "react";
// import { toast } from "react-toastify";
// import axios from "axios";

// export const AppContext = createContext();

// const AppContextProvider = (props) => {
//   const currencySymbol = "$";
//   const backendUrl = import.meta.env.VITE_BACKEND_URL;

//   const [token, setToken] = useState(
//     localStorage.getItem("token") ? localStorage.getItem("token") : false
//   );
//   const [userData, setUserData] = useState(false);

//   // const loadUserProfileData = async () => {
//   //   try {
//   //     const { data } = await axios.get(
//   //        `${backendUrl}/api/user/get-profile`,
//   //       {
//   //         headers: {
//   //           Authorization: `Bearer ${token}`, // ✅ fixed header format
//   //         },
//   //       }
//   //     );
//   //     console.log("get-profile response:", data);
//   //     if (data.success) {
//   //       setUserData(data.userData);
//   //     } else {
//   //       toast.error(data.message);
//   //     }
//   //   } catch (error) {
//   //     console.log(error);
//   //     toast.error("Failed to load profile: " + (error.response?.data?.message || error.message));
//   //   }
//   // };

//   const loadUserProfileData = async () => {
//   try {
//     if (!token) return;

//     // decode JWT payload
//     const decoded = JSON.parse(atob(token.split('.')[1]));
//     if (decoded.isAdmin) {
//       console.log("Admin logged in — skipping user profile call");
//       return; // 🚫 don't call /api/user/get-profile
//     }

//     const { data } = await axios.get(`${backendUrl}/api/user/get-profile`, {
//       headers: { Authorization: `Bearer ${token}` },
//     });

//     if (data.success) {
//       setUserData(data.userData);
//     } else {
//       toast.error(data.message);
//     }
//   } catch (error) {
//     console.error(error);
//     toast.error("Failed to load profile: " + (error.response?.data?.message || error.message));
//   }
// };

//   const value = {
//     currencySymbol,
//     backendUrl,
//     token,
//     setToken,
//     userData,
//     setUserData,
//     loadUserProfileData,
//   };

//   useEffect(() => {
//     if (token) {
//       loadUserProfileData();
//     } else {
//       setUserData(false);
//     }
//   }, [token]);

//   return (
//     <AppContext.Provider value={value}>
//       {props.children}
//     </AppContext.Provider>
//   );
// };

// export default AppContextProvider;













// ---------------------------------

import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const currencySymbol = "$";
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : false
  );
  const [userData, setUserData] = useState(false);

  const loadUserProfileData = async () => {
    try {
      if (!token) return;

      // ✅ decode JWT payload
      const decoded = JSON.parse(atob(token.split(".")[1]));
      if (decoded.isAdmin) {
        console.log("Admin logged in — skipping user profile call");
        return; // 🚫 don’t call user profile for admin
      }

      // ✅ normal user profile
      const { data } = await axios.get(`${backendUrl}/api/user/get-profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setUserData(data.userData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      // 🚫 don’t show toast for admin
      const msg = error.response?.data?.message || error.message;
      if (!msg.includes("Admin access only")) {
        toast.error("Failed to load profile: " + msg);
      }
    }
  };

  const value = {
    currencySymbol,
    backendUrl,
    token,
    setToken,
    userData,
    setUserData,
    loadUserProfileData,
  };

  useEffect(() => {
    if (token) {
      loadUserProfileData();
    } else {
      setUserData(false);
    }
  }, [token]);

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
