const express = require('express');
const Shop = require('../controllers/shopController');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.render('homepage');
});
router.get('/products',(req, res, next) => {
    res.render('shop/products');
});

module.exports = router;