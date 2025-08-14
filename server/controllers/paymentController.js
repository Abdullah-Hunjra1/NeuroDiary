import Stripe from 'stripe';
import paymentModel from '../models/paymentModel.js';
import userModel from '../models/userModel.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const createSubscription = async (req, res) => {
  try {
    const { planType } = req.body;
    const userId = req.user.userId;

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // 1. Create Stripe Customer
    const customer = await stripe.customers.create({
      email: user.email,
      name: user.name,
    });

    // 2. Create Subscription
    const priceId = planType === 'annually'
      ? process.env.STRIPE_ANNUAL_PRICE_ID
      : process.env.STRIPE_MONTHLY_PRICE_ID;

    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: priceId }],
      payment_behavior: 'default_incomplete',
      expand: ['latest_invoice.payment_intent'],
    });

    // 3. Save Payment Info to DB
    const payment = new paymentModel({
      userId,
      stripeCustomerId: customer.id,
      stripeSubscriptionId: subscription.id,
      planType,
      status: subscription.status,
      currentPeriodEnd: new Date(subscription.current_period_end * 1000),
    });

    await payment.save();

    // 4. Mark user as premium
    await userModel.findByIdAndUpdate(userId, { isPremium: true });

    // 5. Return client secret
    const clientSecret = subscription.latest_invoice.payment_intent.client_secret;

    res.json({ success: true, clientSecret });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export { createSubscription };



// // Import Stripe
// const Stripe = require("stripe");
// const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// // API to initiate Stripe payment for NeuroDiary premium features
// const paymentStripe = async (req, res) => {
//   try {
//     const { userId, planId } = req.body;

//     // Fetch user's selected premium plan and amount
//     const userData = await userModel.findById(userId);
//     const planData = await premiumPlanModel.findById(planId); // You must define a model or static pricing plan

//     if (!userData || !planData) {
//       return res.json({
//         success: false,
//         message: "User or plan not found",
//       });
//     }

//     // Create a Stripe Checkout Session
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       line_items: [
//         {
//           price_data: {
//             currency: "usd",
//             product_data: {
//               name: planData.name || "NeuroDiary Premium Access",
//             },
//             unit_amount: planData.price * 100, // in cents
//           },
//           quantity: 1,
//         },
//       ],
//       mode: "payment",
//       success_url: `${process.env.FRONTEND_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
//       cancel_url: `${process.env.FRONTEND_URL}/payment-cancelled`,
//       metadata: {
//         userId,
//         planId,
//       },
//     });

//     res.json({
//       success: true,
//       sessionId: session.id,
//       url: session.url,
//     });
//   } catch (error) {
//     console.log("Stripe Payment Error:", error);
//     res.json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// // API to verify Stripe payment
// const verifyStripe = async (req, res) => {
//   try {
//     const { sessionId } = req.body;
//     const session = await stripe.checkout.sessions.retrieve(sessionId);

//     if (session.payment_status === "paid") {
//       const { userId, planId } = session.metadata;

//       await userModel.findByIdAndUpdate(userId, {
//         premiumAccess: true,
//         planId,
//       });

//       res.json({
//         success: true,
//         message: "Payment successful and premium access granted",
//       });
//     } else {
//       res.json({
//         success: false,
//         message: "Payment not completed",
//       });
//     }
//   } catch (error) {
//     console.log("Stripe Verification Error:", error);
//     res.json({
//       success: false,
//       message: error.message,
//     });
//   }
// };
