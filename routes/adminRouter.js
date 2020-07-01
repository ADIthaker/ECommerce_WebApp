const express = require('express');
const router = express.Router();
const Admin =require('../controllers/adminController');
const isAuth = require('../middleware/isauth');

router.get('/add-product',isAuth.issellerauth,Admin.getAddProducts);
router.post('/add-product',isAuth.issellerauth,Admin.postAddProducts)

module.exports = router;