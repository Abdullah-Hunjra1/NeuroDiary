import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(null);

  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    const verifySession = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setStatus("Unauthorized — please log in again.");
          setLoading(false);
          return;
        }

        const { data } = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/payment/verify-session?session_id=${sessionId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (data.success) {
          setStatus("✅ Payment successful! Your account is now Premium.");
        } else {
          setStatus("⚠️ Payment verification failed. Please contact support.");
        }
      } catch (err) {
        console.error("Payment verify error:", err.message);
        setStatus("⚠️ Could not verify payment. Please contact support.");
      } finally {
        setLoading(false);
      }
    };

    if (sessionId) {
      verifySession();
    } else {
      setStatus("No session ID found.");
      setLoading(false);
    }
  }, [sessionId]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold mb-4">Payment Status</h1>
        {loading ? (
          <p className="text-gray-600">Verifying your payment...</p>
        ) : (
          <p className="text-gray-800">{status}</p>
        )}

        <button
          onClick={() => navigate("/dashboard")}
          className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-xl shadow hover:bg-blue-700 transition"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
