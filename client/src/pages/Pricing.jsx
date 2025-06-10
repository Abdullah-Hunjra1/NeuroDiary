// import React, { useState } from 'react';

// const Pricing = () => {
//   const [planType, setPlanType] = useState("annually");

//   // Define pricing based on selected plan type
//   const premiumPrice = planType === "annually" ? "69.99" : "9.99";
//   const priceDuration = planType === "annually" ? "/year" : "/month";



//   return (
//     <section className="py-16 bg-[#cdeaf5] px-6 md:px-10">
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
//               className={`px-4 py-1 text-sm font-semibold rounded-full ${
//                 planType === "annually"
//                   ? "bg-white text-[#007189] shadow"
//                   : "text-gray-600"
//               }`}
//             >
//               Annually
//             </button>
//             <button
//               onClick={() => setPlanType("monthly")}
//               className={`px-4 py-1 text-sm font-semibold rounded-full ${
//                 planType === "monthly"
//                   ? "bg-white text-[#007189] shadow"
//                   : "text-gray-600"
//               }`}
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
                 
//                  className="bg-white text-[#007189] px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition"
//                 >
//                  Subscribe Now
//            </button>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Pricing;

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
        { headers: { token } }
      );

      if (data.success) {
        // Load Stripe.js and redirect to Stripe's hosted checkout
        const stripe = await import('@stripe/stripe-js').then((m) =>
          m.loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)
        );

        const stripeInstance = await stripe;
        const clientSecret = data.clientSecret;

        // Use Stripe PaymentElement or redirect flow
        const result = await stripeInstance.confirmCardPayment(clientSecret, {
          payment_method: {
            card: {
              // you can pass an existing CardElement ref here if using PaymentElement
            },
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
    <section className="py-16 bg-[#CEE6F0] px-6 md:px-10">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-[#007189] mb-3">Pricing</h2>
        <p className="text-gray-600 mb-8">
          Upgrade to unlock voice commands and advanced AI features for a deeper mental health journey.
        </p>

        {/* Toggle buttons */}
        <div className="flex justify-center mb-10">
          <div className="bg-[#dceff5] p-1 rounded-full inline-flex space-x-2">
            <button
              onClick={() => setPlanType("annually")}
              className={`px-4 py-1 text-sm font-semibold rounded-full ${
                planType === "annually" ? "bg-white text-[#007189] shadow" : "text-gray-600"
              }`}
            >
              Annually
            </button>
            <button
              onClick={() => setPlanType("monthly")}
              className={`px-4 py-1 text-sm font-semibold rounded-full ${
                planType === "monthly" ? "bg-white text-[#007189] shadow" : "text-gray-600"
              }`}
            >
              Monthly
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Free Plan */}
          <div className="bg-white rounded-xl p-8 shadow-md text-left">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Free</h3>
            <p className="text-3xl font-bold text-gray-900 mb-4">$0<span className="text-base font-normal">/year</span></p>
            <ul className="text-gray-700 space-y-2 mb-6">
              <li>✅ Unlimited Journal Entries</li>
              <li>✅ Mood Tracking</li>
              <li>✅ Basic AI Feedback</li>
            </ul>
            <div className="text-sm text-gray-500">No credit card required</div>
          </div>

          {/* Premium Plan */}
          <div className="bg-[#007189] text-white rounded-xl p-8 shadow-lg text-left">
            <h3 className="text-xl font-semibold mb-2">Premium</h3>
            <p className="text-3xl font-bold mb-4">
              ${premiumPrice}
              <span className="text-base font-normal">{priceDuration}</span>
            </p>
            <ul className="space-y-2 mb-6">
              <li>✅ All Free Features</li>
              <li>✅ Voice Command Support</li>
              <li>✅ Personalized AI Recommendations</li>
              <li>✅ Advanced Emotional Trend Reports</li>
              <li>✅ Priority Support</li>
            </ul>
            <button
              disabled={loading}
              onClick={handleSubscribe}
              className="bg-white text-[#007189] px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition"
            >
              {loading ? "Processing..." : "Subscribe Now"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
