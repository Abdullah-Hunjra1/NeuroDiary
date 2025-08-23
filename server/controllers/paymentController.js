// import Stripe from 'stripe';
// import paymentModel from '../models/paymentModel.js';
// import userModel from '../models/userModel.js';

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// const createSubscription = async (req, res) => {
//   try {
//     const { planType } = req.body;
//     const userId = req.user._id;

//     const user = await userModel.findById(userId);
//     if (!user) {
//       return res.status(404).json({ success: false, message: "User not found" });
//     }

//     // 1. Create Stripe Customer
//     const customer = await stripe.customers.create({
//       email: user.email,
//       name: user.name,
//     });

//     // 2. Create Subscription
//     const priceId = planType === 'annually'
//       ? process.env.STRIPE_ANNUAL_PRICE_ID
//       : process.env.STRIPE_MONTHLY_PRICE_ID;

//     const subscription = await stripe.subscriptions.create({
//       customer: customer.id,
//       items: [{ price: priceId }],
//       payment_behavior: 'default_incomplete',
//       expand: ['latest_invoice.payment_intent'],
//     });

//     // 3. Save Payment Info to DB
//     const payment = new paymentModel({
//       userId,
//       stripeCustomerId: customer.id,
//       stripeSubscriptionId: subscription.id,
//       planType,
//       status: subscription.status,
//       currentPeriodEnd: new Date(subscription.current_period_end * 1000),
//     });

//     await payment.save();

//     // 4. Mark user as premium
//     await userModel.findByIdAndUpdate(userId, { isPremium: true });

//     // 5. Return client secret
//     const clientSecret = subscription.latest_invoice.payment_intent.client_secret;

//     res.json({ success: true, clientSecret });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// export { createSubscription };



// -----------------------------------------


import Stripe from "stripe";
import userModel from "../models/userModel.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// ✅ Create a Stripe Checkout Session
// export const createCheckoutSession = async (req, res) => {
//   try {
//     const { planType } = req.body; // "monthly" or "annually"
//     const userId = req.user._id;

//     // Pick priceId based on planType
//     const priceId =
//       planType === "annually"
//         ? process.env.STRIPE_ANNUAL_PRICE_ID
//         : process.env.STRIPE_MONTHLY_PRICE_ID;

//     if (!priceId) {
//       return res.status(400).json({ success: false, message: "Invalid plan type" });
//     }

//     // Create Checkout Session
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       mode: "subscription",
//       line_items: [{ price: priceId, quantity: 1 }],
//       customer_email: req.user.email, // auto-fill Stripe checkout with user’s email
//       success_url: `${process.env.FRONTEND_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
//       cancel_url: `${process.env.FRONTEND_URL}/pricing`,
//       metadata: { userId }, // store for later
//     });

//     res.json({ success: true, id: session.id, url: session.url });
//   } catch (error) {
//     console.error("Stripe session error:", error.message);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };


export const createCheckoutSession = async (req, res) => {
  try {
    const { planType } = req.body; // "monthly" or "annually"
    const userId = req.user?._id;
    const userEmail = req.user?.email;

    // Pick priceId based on planType
    const priceId =
      planType === "annually"
        ? process.env.STRIPE_ANNUAL_PRICE_ID
        : process.env.STRIPE_MONTHLY_PRICE_ID;

    if (!priceId) {
      return res.status(400).json({ success: false, message: "Invalid plan type" });
    }

    // ✅ Create Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      customer_email: userEmail,
      success_url: `${process.env.FRONTEND_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/pricing`,
      metadata: { userId: String(userId) },
    });

    res.json({ success: true, id: session.id });
  } catch (error) {
    console.log("testing");
    console.error("Stripe session error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};


export const webhookHandler = async (req, res) => {
  const sig = req.headers["stripe-signature"];

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Webhook signature error:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // ✅ Handle subscription activation
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    const userId = session.metadata.userId;
    if (userId) {
      await userModel.findByIdAndUpdate(userId, { isPremium: true });
      console.log(`✅ User ${userId} upgraded to Premium`);
    }
  }

  res.json({ received: true });
};


// ✅ Verify Checkout Session from frontend
export const verifyCheckoutSession = async (req, res) => {
  try {
    const { session_id } = req.query;
    if (!session_id) {
      return res.status(400).json({ success: false, message: "Missing session_id" });
    }

    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (session && session.payment_status === "paid") {
      return res.json({ success: true, session });
    }

    res.json({ success: false, message: "Payment not completed" });
  } catch (error) {
    console.error("Verify session error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};