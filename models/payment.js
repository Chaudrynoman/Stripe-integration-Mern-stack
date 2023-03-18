const mongoose = require('mongoose');
// Create a MongoDB schema for storing payments
const PaymentSchema = new mongoose.Schema({
    amount: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    stripeToken: {
      type: String,
      required: true,
    },
  }, {
    timestamps: true,
  });
  
  // Create a MongoDB model for payments
  const Payment = mongoose.model('Payment', PaymentSchema);

  module.exports = Payment;
  