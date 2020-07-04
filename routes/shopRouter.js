const express = require('express');
const Shop = require('../controllers/shopController');
const router = express.Router();
const isAuth = require('../middleware/isauth');
router.get('/',Shop.getHome);

router.get('/prodinfo/:prodId',Shop.getprodinfo);

router.get('/cart',isAuth.isuserauth,Shop.getCart);

router.post('/cart',isAuth.isuserauth,Shop.postCart);

router.post('/cart-delete-item',isAuth.isuserauth,Shop.postCartDeleteProduct);

router.post('/checkout',isAuth.isuserauth,Shop.postCheckout);

module.exports = router; 