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
  const [loading, setLoading] = useState(true); // ✅ NEW

  const loadUserProfileData = async () => {
    try {
      if (!token) {
        setUserData(false);
        setLoading(false); // ✅ stop loading if no token
        return;
      }

      // ✅ decode JWT payload
      const decoded = JSON.parse(atob(token.split(".")[1]));
      if (decoded.isAdmin) {
        console.log("Admin logged in — skipping user profile call");
        setLoading(false); // ✅ mark ready even for admin
        return;
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
      const msg = error.response?.data?.message || error.message;
      if (!msg.includes("Admin access only")) {
        toast.error("Failed to load profile: " + msg);
      }
    } finally {
      setLoading(false); // ✅ always end loading
    }
  };

  useEffect(() => {
    loadUserProfileData();
  }, [token]);

  const value = {
    currencySymbol,
    backendUrl,
    token,
    setToken,
    userData,
    setUserData,
    loadUserProfileData,
    loading, // ✅ expose loading
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;

