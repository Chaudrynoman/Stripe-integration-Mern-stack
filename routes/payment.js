const express = require ('express');
const router = express.Router();
const controller = require('../controllers/payment');
const { body } = require('express-validator');

router.post('/payments', [

] , controller.savePayment);


module.exports = router;
