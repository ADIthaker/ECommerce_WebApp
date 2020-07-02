const express = require('express');
const router = express.Router();
const Admin =require('../controllers/adminController');
const isAuth = require('../middleware/isauth');

router.get('/add-product',isAuth.issellerauth,Admin.getAddProducts);

router.get('/products',isAuth.issellerauth,Admin.getAdminProducts);

router.post('/add-product',isAuth.issellerauth,Admin.postAddProducts);

router.get('/product/:prodId',isAuth.issellerauth,Admin.getProdDetails);

router.get('/edit-product/:prodId',isAuth.issellerauth,Admin.getEditProduct);

router.post('/edit-product',isAuth.issellerauth,Admin.postEditProduct);

router.post('/deleteprod',isAuth.issellerauth,Admin.postDeleteProduct);

module.exports = router;