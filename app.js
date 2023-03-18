const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();
const payment = require('./routes/payment');
require('./dbCon');
const app = express();
app.use(express.json());
const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions))
app.use(bodyParser.urlencoded({ extended: true }))
// Define a route for creating a new payment
app.use(payment);
// Start the server
const port = process.env.HTTPS_PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
