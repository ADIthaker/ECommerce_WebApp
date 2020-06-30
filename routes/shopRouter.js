const express = require('express');
const Shop = require('../controllers/shopController');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.render('homepage',{
        isAuthenticated:req.session.isLoggedIn,
     });
});
router.get('/products',(req, res, next) => {
    res.render('shop/products',{
        isAuthenticated:req.session.isLoggedIn,
     });
});

module.exports = router;