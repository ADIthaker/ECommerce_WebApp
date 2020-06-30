const express = require('express');
const User = require('../models/user');
const Product =require('../models/product');
const ITEMS_PER_PAGE=15;

exports.getProducts = (req,res,next)=>{
   res.render('shop/products',{
      isAuthenticatedUser: req.session.isLoggedIn,
      isAuthenticatedSeller:req.session.isSellerLoggedIn,
   });
}
exports.getHome=(req, res, next) => {
   res.render('homepage',{
       isAuthenticatedUser:req.session.isLoggedIn,
       isAuthenticatedSeller:req.session.isSellerLoggedIn,
    });
}
