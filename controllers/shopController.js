const express = require('express');
const User = require('../models/user');
const Product =require('../models/product');
const ITEMS_PER_PAGE=15;

exports.getProducts = (req,res,next)=>{
   res.render('shop/products');
}
