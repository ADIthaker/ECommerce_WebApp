const express = require('express');
const Shop = require('../controllers/shopController');
const router = express.Router();

router.get('/',Shop.getHome);



module.exports = router; 