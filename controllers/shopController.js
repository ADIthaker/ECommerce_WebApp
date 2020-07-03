const express = require('express');
const User = require('../models/user');
const Product =require('../models/product');
const ITEMS_PER_PAGE=15;

exports.getHome=(req, res, next) => {
   Product.find({})
   .then(prods=>{
      res.render('homepage',{
         isAuthenticatedUser:req.session.isLoggedIn,
         isAuthenticatedSeller:req.session.isSellerLoggedIn,
         csrfToken:req.csrfToken(),
         pageTitle:"eMarket : Home",
         products:prods,
         
      });
   })
   .catch(err=>{
      const error = new Error(err);
      error.httpStatusCode=500;
      return next(error);
   })
   
}
 