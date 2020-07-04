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
 

exports.getprodinfo =(req,res,next)=>{
      const prodId = req.params.prodId;
      Product.findOne({_id:prodId})
      .then(prod=>{
          if(prod){
              const name = prod.name;
              const price=prod.price;
              const description=prod.description;
              const imgsurl =prod.images.map(img=>img.url);
              return  res.render('shop/prodinfo',{
               prodId:prodId,
               price:price,
               description:description,
               imgurls:imgsurl,
               name:name,
               pageTitle:`${name}`,
              
           })
       }
       res.send('cant get it!');
       
   })
  .catch(err=>{
       const error = new Error(err);
       error.httpStatusCode=500;
       return next(error);
  });
}

exports.getCart=(req,res,next)=>{
   req.user
   .populate('cart.items.productId')
   .execPopulate()
   .then(user=>{
      const products = user.cart.items;
        res.render('shop/cart', {
                        path: "/cart",
                        pageTitle: `${req.user.name}'s Cart`,
                        products: products,
                        isAuthenticatedUser : req.session.isLoggedIn 
                    });
      
     })
     .catch(err=>{const error = new Error (err);
        error.httpStatusCode = 500;
        return next(error);});
   

}

exports.postCart =(req,res,next)=>{
   const prodId = req.body.prodId;
   Product.findById(prodId)
   .then(
       product=>{

           return req.user.addToCart(product);
       }
   ).then(result => {
         res.redirect('/cart')
   }).catch(err=>{const error = new Error (err);
      error.httpStatusCode = 500;  
      return next(error);
  }); ;

}
exports.postCartDeleteProduct = (req, res, next) => {
   const prodId = req.body.productId;
  req.user
  .removeFromCart(prodId)
   .then(result=>{
       res.redirect('/cart');
   })
   .catch(err=>{const error = new Error (err);
       error.httpStatusCode = 500;  
       return next(error);
   }); 
};
exports.postCheckout=(req,res,next)=>{
   
}