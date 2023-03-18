const paymentModel = require('../models/payment');
const { validationResult } = require('express-validator');
const dotenv = require('dotenv')
dotenv.config()
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const err= new Error();

exports.savePayment = async(req,res)=> {
    try {
      const { amount, description, email, stripeToken } = req.body;
      console.log(req.body);
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        err.status=422;
        err.message=errors.array()[0].msg;
        throw err;
      }
      // Charge the customer using the Stripe API
      const charge = await stripe.charges.create({
        amount,
        description,
        currency: 'usd',
        source: stripeToken,
      });
      console.log("charge",charge);
  
      // Save the payment to MongoDB
      const payment = new paymentModel({
        amount,
        description,
        email,
        stripeToken,
      });
      await payment.save();
      res.status(201).json({success:true, msg:"Payment successful", data:charge});
      return;
    } catch (e) {
        console.log('error', e)
        return res.status(e.status || 500).json({ success: false, msg: 'Payment failed', data: {} })
    }
  }