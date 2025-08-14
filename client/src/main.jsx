import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import VerifyOTP from "./pages/VerifyOTP.jsx"
import UserProfile from "./pages/UserProfile.jsx";
import UserDashboard from "./pages/UserDashboard.jsx";
import Pricing from "./pages/Pricing.jsx";
import CreateEntryPage from "./pages/CreateEntryPage";
import MyEntriesPage from "./pages/MyEntriesPage";
import MoodAnalyticsDashboard from "./pages/MoodAnalyticsDashboard.jsx";
import AIInsights from './pages/AIInsights';
import VoicePage from "./pages/VoicePage.jsx"


import AdminDashboard from "./pages/AdminDashboard.jsx";
import AdminLogin from "./pages/adminLogin.jsx";

import { App } from "../src/App.jsx";
import AppContextProvider from "../context/AppContext.jsx";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<App />}>
      <Route path="/" element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="contact" element={<Contact />} />
      <Route path="login" element={<Login />} />
      <Route path="verify-otp" element={<VerifyOTP />} />
      <Route path="user-profile" element={<UserProfile />} />
      <Route path="user-dashboard" element={<UserDashboard />} />
      <Route path="pricing" element={<Pricing />} />
      <Route path="create-entry" element={<CreateEntryPage />} />
      <Route path="my-entries" element={<MyEntriesPage />} />
      <Route path="mood-analytics" element={<MoodAnalyticsDashboard />} />
      <Route path="/ai-insights" element={<AIInsights />} />
      <Route path="voice-page" element={<VoicePage />} />

      <Route path="admin-login" element={<AdminLogin />} />
      <Route path="admin-dashboard" element={<AdminDashboard />} />


    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppContextProvider>
      <Elements stripe={stripePromise}>
        <RouterProvider router={router} />
        <ToastContainer position="top-right" autoClose={3000} />
      </Elements>
    </AppContextProvider>
  </StrictMode>
);
