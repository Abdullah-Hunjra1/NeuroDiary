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
import UserProfile from "./pages/UserProfile.jsx";
import UserDashboard from "./pages/UserDashboard.jsx";
import Goals from "./pages/Goals";
import Pricing from "./pages/Pricing.jsx";

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
      <Route path="user-profile" element={<UserProfile />} />
      <Route path="user-dashboard" element={<UserDashboard />} />
      <Route path="goals" element={<Goals />} />
      <Route path="pricing" element={<Pricing />} />
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
