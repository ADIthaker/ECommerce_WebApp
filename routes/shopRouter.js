const express = require('express');
const Shop = require('../controllers/shopController');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.render('homepage');
});


module.exports = router;