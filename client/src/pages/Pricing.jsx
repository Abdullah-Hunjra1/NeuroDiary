// import React, { useState } from 'react';
// import axios from 'axios';
// import { useContext } from 'react';
// import { AppContext } from '../../context/AppContext';
// import { toast } from 'react-toastify';

// const Pricing = () => {
//   const [planType, setPlanType] = useState("annually");
//   const { token, backendUrl } = useContext(AppContext);
//   const [loading, setLoading] = useState(false);

//   const premiumPrice = planType === "annually" ? "69.99" : "9.99";
//   const priceDuration = planType === "annually" ? "/year" : "/month";

//   const handleSubscribe = async () => {
//     try {
//       setLoading(true);

//       const { data } = await axios.post(
//         `${backendUrl}/api/payment/create-subscription`,
//         { planType },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`, // ✅ Correct format
//           },
//         }
//       );


//       if (data.success) {
//         // Load Stripe.js and redirect to Stripe's hosted checkout
//         const stripe = await import('@stripe/stripe-js').then((m) =>
//           m.loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)
//         );

//         const stripeInstance = await stripe;
//         const clientSecret = data.clientSecret;

//         // Use Stripe PaymentElement or redirect flow
//         const result = await stripeInstance.confirmCardPayment(clientSecret, {
//           payment_method: {
//             card: {
//               // you can pass an existing CardElement ref here if using PaymentElement
//             },
//           },
//         });

//         if (result.error) {
//           toast.error(result.error.message);
//         } else {
//           toast.success("Subscription successful!");
//         }
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error("Payment failed.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <section className="py-16 bg-[#CEE6F0] px-6 md:px-10">
//       <div className="max-w-5xl mx-auto text-center">
//         <h2 className="text-4xl font-bold text-[#007189] mb-3">Pricing</h2>
//         <p className="text-gray-600 mb-8">
//           Upgrade to unlock voice commands and advanced AI features for a deeper mental health journey.
//         </p>

//         {/* Toggle buttons */}
//         <div className="flex justify-center mb-10">
//           <div className="bg-[#dceff5] p-1 rounded-full inline-flex space-x-2">
//             <button
//               onClick={() => setPlanType("annually")}
//               className={`px-4 py-1 text-sm font-semibold rounded-full ${planType === "annually" ? "bg-white text-[#007189] shadow" : "text-gray-600"
//                 }`}
//             >
//               Annually
//             </button>
//             <button
//               onClick={() => setPlanType("monthly")}
//               className={`px-4 py-1 text-sm font-semibold rounded-full ${planType === "monthly" ? "bg-white text-[#007189] shadow" : "text-gray-600"
//                 }`}
//             >
//               Monthly
//             </button>
//           </div>
//         </div>

//         {/* Pricing Cards */}
//         <div className="grid md:grid-cols-2 gap-8">
//           {/* Free Plan */}
//           <div className="bg-white rounded-xl p-8 shadow-md text-left">
//             <h3 className="text-xl font-semibold text-gray-800 mb-2">Free</h3>
//             <p className="text-3xl font-bold text-gray-900 mb-4">$0<span className="text-base font-normal">/year</span></p>
//             <ul className="text-gray-700 space-y-2 mb-6">
//               <li>✅ Unlimited Journal Entries</li>
//               <li>✅ Mood Tracking</li>
//               <li>✅ Basic AI Feedback</li>
//             </ul>
//             <div className="text-sm text-gray-500">No credit card required</div>
//           </div>

//           {/* Premium Plan */}
//           <div className="bg-[#007189] text-white rounded-xl p-8 shadow-lg text-left">
//             <h3 className="text-xl font-semibold mb-2">Premium</h3>
//             <p className="text-3xl font-bold mb-4">
//               ${premiumPrice}
//               <span className="text-base font-normal">{priceDuration}</span>
//             </p>
//             <ul className="space-y-2 mb-6">
//               <li>✅ All Free Features</li>
//               <li>✅ Voice Command Support</li>
//               <li>✅ Personalized AI Recommendations</li>
//               <li>✅ Advanced Emotional Trend Reports</li>
//               <li>✅ Priority Support</li>
//             </ul>
//             <button
//               disabled={loading}
//               onClick={handleSubscribe}
//               className="bg-white text-[#007189] px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition"
//             >
//               {loading ? "Processing..." : "Subscribe Now"}
//             </button>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Pricing;





// **************************************




import React, { useState } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { toast } from 'react-toastify';

const Pricing = () => {
  const [planType, setPlanType] = useState("annually");
  const { token, backendUrl } = useContext(AppContext);
  const [loading, setLoading] = useState(false);

  const premiumPrice = planType === "annually" ? "69.99" : "9.99";
  const priceDuration = planType === "annually" ? "/year" : "/month";

  const handleSubscribe = async () => {
    try {
      setLoading(true);

      const { data } = await axios.post(
        `${backendUrl}/api/payment/create-subscription`,
        { planType },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        const stripe = await import('@stripe/stripe-js').then((m) =>
          m.loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)
        );

        const stripeInstance = await stripe;
        const clientSecret = data.clientSecret;

        const result = await stripeInstance.confirmCardPayment(clientSecret, {
          payment_method: {
            card: {},
          },
        });

        if (result.error) {
          toast.error(result.error.message);
        } else {
          toast.success("Subscription successful!");
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Payment failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50 py-10 px-6 md:px-2">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 bg-teal-100 text-teal-700 px-4 py-2 rounded-full text-sm font-medium mb-5">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
            </svg>
            Premium Mental Health Features
          </div>
          
          <h2 className="text-4xl md:text-4xl font-bold bg-gradient-to-r from-teal-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Choose Your Plan
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Unlock the full potential of your mental health journey with AI-powered insights, 
            voice commands, and personalized recommendations designed just for you.
          </p>
        </div>

        {/* Plan Toggle */}
        <div className="flex justify-center mb-12">
          <div className="bg-white p-2 rounded-2xl shadow-lg border border-slate-200 inline-flex">
            <button
              onClick={() => setPlanType("annually")}
              className={`relative px-6 py-2 text-sm font-semibold rounded-xl transition-all duration-300 ${
                planType === "annually" 
                  ? "bg-gradient-to-r from-teal-500 to-blue-600 text-white shadow-lg transform scale-105" 
                  : "text-slate-600 hover:text-slate-800"
              }`}
            >
              {planType === "annually" && (
                <div className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                  Save 30%
                </div>
              )}
              Annually
            </button>
            <button
              onClick={() => setPlanType("monthly")}
              className={`px-6 py-2 text-sm font-semibold rounded-xl transition-all duration-300 ${
                planType === "monthly" 
                  ? "bg-gradient-to-r from-teal-500 to-blue-600 text-white shadow-lg transform scale-105" 
                  : "text-slate-600 hover:text-slate-800"
              }`}
            >
              Monthly
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Free Plan */}
          <div className="group relative bg-white rounded-3xl p-8 shadow-xl border border-slate-200 hover:shadow-2xl hover:border-slate-300 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-white rounded-3xl opacity-60"></div>
            <div className="relative">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-slate-100 rounded-2xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800">Free Plan</h3>
                  <p className="text-slate-500 text-sm">Perfect for getting started</p>
                </div>
              </div>

              <div className="mb-8">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-slate-900">$0</span>
                  <span className="text-xl text-slate-500">/forever</span>
                </div>
                <p className="text-sm text-slate-500 mt-2">No credit card required</p>
              </div>

              <div className="space-y-4 mb-8">
                {[
                  "Unlimited Journal Entries",
                  "Basic Mood Tracking", 
                  "Simple AI Feedback",
                  "Progress Visualization",
                  "Secure Data Storage"
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-slate-700">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-100">
                <button className="w-full py-3 bg-slate-100 text-slate-700 rounded-2xl font-semibold hover:bg-slate-200 transition-colors duration-200">
                  Current Plan
                </button>
              </div>
            </div>
          </div>

          {/* Premium Plan */}
          <div className="group relative bg-gradient-to-br from-teal-600 via-blue-600 to-indigo-700 rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <div className="bg-gradient-to-r from-orange-400 to-pink-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                Most Popular
              </div>
            </div>
            
            <div className="relative text-white">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold">Premium Plan</h3>
                  <p className="text-blue-100 text-sm">Advanced mental health insights</p>
                </div>
              </div>

              <div className="mb-8">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold">${premiumPrice}</span>
                  <span className="text-xl text-blue-200">{priceDuration}</span>
                </div>
                {planType === "annually" && (
                  <p className="text-sm text-blue-200 mt-2">Save $50+ per year</p>
                )}
              </div>

              <div className="space-y-4 mb-8">
                {[
                  "All Free Plan Features",
                  "🎤 AI Voice Command Support", 
                  "🧠 Advanced Emotional Analysis",
                  "📊 Detailed Trend Reports",
                  "🎯 Personalized AI Recommendations",
                  "⚡ Priority Customer Support",
                  "🔒 Enhanced Security Features"
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-white/20 backdrop-blur rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-white/95">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-white/20">
                <button
                  disabled={loading}
                  onClick={handleSubscribe}
                  className="w-full py-3 bg-white text-blue-600 rounded-2xl font-bold hover:bg-blue-50 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                >
                  {loading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                      Processing...
                    </div>
                  ) : (
                    "Subscribe Now"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Features Comparison */}
        <div className="mt-16 text-center">
          <p className="text-slate-600 mb-4">
            ✨ All plans include end-to-end encryption and HIPAA-compliant data protection
          </p>
          <div className="flex justify-center gap-8 text-sm text-slate-500">
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              Secure & Private
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              30-Day Money Back
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              24/7 Support
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;














