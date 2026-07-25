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
      setLoading(false);
      return;
    }

    // Check if token is a valid JWT before decoding
    const tokenParts = token.split(".");

    if (tokenParts.length !== 3) {
      console.error("Invalid JWT token found in localStorage");

      localStorage.removeItem("token");
      setToken(false);
      setUserData(false);
      setLoading(false);

      return;
    }

    // Decode JWT payload
    const decoded = JSON.parse(atob(tokenParts[1]));

    if (decoded.isAdmin) {
      console.log("Admin logged in — skipping user profile call");
      setLoading(false);
      return;
    }

    // Normal user profile
    const { data } = await axios.get(
      `${backendUrl}/api/user/get-profile`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (data.success) {
      setUserData(data.userData);
    } else {
      toast.error(data.message);
    }

  } catch (error) {
    console.error("Profile Load Error:", error);

    const msg =
      error.response?.data?.message || error.message;

    // If token is invalid or expired
    if (
      error.response?.status === 401 ||
      msg.toLowerCase().includes("token") ||
      msg.toLowerCase().includes("jwt")
    ) {
      localStorage.removeItem("token");
      setToken(false);
      setUserData(false);

      toast.error("Session expired. Please login again.");
    } else {
      toast.error("Failed to load profile: " + msg);
    }

  } finally {
    setLoading(false);
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

