const express = require('express');
const Shop = require('../controllers/shopController');
const router = express.Router();

router.get('/',Shop.getHome);
router.get('/products',Shop.getProducts);


module.exports = router;