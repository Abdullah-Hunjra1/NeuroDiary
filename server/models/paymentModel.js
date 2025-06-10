import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  stripeCustomerId: {
    type: String,
    required: true
  },
  stripeSubscriptionId: {
    type: String,
    required: true
  },
  planType: {
    type: String, // "monthly" or "annually"
    required: true
  },
  status: {
    type: String, // "active", "cancelled", "past_due", etc.
    required: true
  },
  currentPeriodEnd: {
    type: Date // Subscription renewal date
  },
}, { timestamps: true });

const paymentModel = mongoose.models.payment || mongoose.model('payments', paymentSchema);

export default paymentModel;
