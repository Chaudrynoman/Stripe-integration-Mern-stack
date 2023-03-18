import React, { useState } from 'react';
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';
const apiKey = process.env.REACT_APP_STRIPE_PUBLIC_KEY;

const PaymentForm = () => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState('');

  const handleToken = async (token) => {
    try {
      // Send a request to the server to create a new payment
const headers = {
  'Authorization': `Bearer ${apiKey}`,
  'Content-Type': 'application/json'
};
console.log(token);

axios.post(`${process.env.REACT_APP_SERVER_URL}/payments`, {
  amount: parseInt(amount * 100),
  description,
  email,
  stripeToken: token.id,
}, { headers })
.then((res) => {
  console.log(res.data.data);
  console.log(res.data.msg);
})
.catch((err) => {
  console.error(err);
});

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center space-x-4 space-y-4 text-center">
  <div className="relative w-64">
    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
      $
    </span>
    <input className="w-full rounded-md pl-10 pr-4 py-2 border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-2 ring-blue-200" type="text" placeholder="Amount in Dollar" value={amount} onChange={(e) => setAmount(e.target.value)} />
  </div>
  <input className="w-64 rounded-md px-4 py-2 border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-2 ring-blue-200" type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
  <input className="w-64 rounded-md px-4 py-2 border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-2 ring-blue-200" type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
  <StripeCheckout stripeKey={apiKey} token={handleToken} amount={parseInt(amount * 100)} name="Payment Form" email={email} />
</div>


  );
}

export default PaymentForm;