const express = require('express');
const User = require('../models/user');
const Seller = require('../models/seller');
const bcrypt = require('bcryptjs');
const session = require('express-session');

exports.getLogin = (req,res,next)=>{
    return res.render('auths/login',{
        isAuthenticatedUser:req.session.isLoggedIn,
        isAuthenticatedSeller : req.session.isSellerLoggedIn,
        
     });
}

exports.postLogin = (req,res,next)=>{
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({email:email})
    .then(user=>{
   if (!user){
      return  res.send("Invalid!!!");
   }
   bcrypt.compare(password,user.password)
   .then(doMatch=>{
       if(doMatch){
        req.session.isLoggedIn = true;
        req.session.user = user;
           
           return  req.session
           .save(err=>{
            console.log(err);
            res.redirect('/');;
       });
       }
       return res.render('auths/login',{
        isAuthenticatedUser:req.session.isLoggedIn,
        isAuthenticatedSeller : req.session.isSellerLoggedIn,
     });
   })
        
})
    .catch(err=>{
        const error = new Error(err);
        error.httpStatusCode =500;
        return next(error);
    });

}

exports.getSignup =(req,res,next)=>{
    return res.render('auths/signup',{
        isAuthenticatedUser:req.session.isLoggedIn,
        isAuthenticatedSeller : req.session.isSellerLoggedIn,
     });
}

exports.postSignup = (req,res,next)=>{
   const email= req.body.email;
   const pwd = req.body.password;
   const lat = req.body.lat;
   const long = req.body.long;
   const state = req.body.state;
   const name = req.body.fullname;
   const city = req.body.city;
   const address =req.body.address;
   const pincode =req.body.pin_code;
   bcrypt.hash(pwd,12).then(hashedPwd=>{
      const user = new User({
          name:name,
           email:email,
           password:hashedPwd,
           location:{
               type:'Point',
               coordinates:[long,lat]
           },
           Address:address,
           City:city,
           State:state,
           PinCode:pincode
       });
       return user.save();

   })
   .then(result=>{
    console.log(result)
     return res.redirect('/',{
        isAuthenticatedUser:req.session.isLoggedIn,
        isAuthenticatedSeller : req.session.isSellerLoggedIn,
     })
   
}).catch(err=>{
    console.log(err);
 const error = new Error(err);
 error.httpStatusCode =500;
 return next(error);;
});
}


exports.postLogout=(req,res,next)=>{
    req.session.destroy(err => {
        console.log(err);
        res.redirect('/');
      });
}

exports.getSellerSignUp = (req,res,next)=>{
        res.render('auths/sellersignup',{
            isAuthenticatedUser:req.session.isLoggedIn,
            isAuthenticatedSeller : req.session.isSellerLoggedIn,
        })
}
exports.postSellerSignup = (req,res,next)=>{
    const email=req.body.email;
    const pwd =req.body.password;
    const lat = req.body.lat;
    const long =req.body.long;
    const state =req.body.state;
    const name =req.body.fullname;
    const city = req.body.city;
    const address =req.body.address;
    const pincode =req.body.pin_code;
    bcrypt.hash(pwd,12).then(hashedPwd=>{
       const seller = new Seller({
           name:name,
            email:email,
            password:hashedPwd,
            location:{
                type:'Point',
                coordinates:[long,lat]
            },
            Address:address,
            City:city,
            State:state,
            PinCode:pincode
        });
        return seller.save();
 
    })
    .then(result=>{
     console.log(result)
      return res.redirect('/');
    
 }).catch(err=>{
     console.log(err);
  const error = new Error(err);
  error.httpStatusCode =500;
  return next(error);
 });
}
exports.getSellerLogIn=(req,res,next)=>{
    res.render('auths/loginseller',{
        isAuthenticatedSeller : req.session.isSellerLoggedIn,
        isAuthenticatedUser:req.session.isLoggedIn,
       
    });
}

exports.postSellerLogIn = (req,res,next)=>{
    const email = req.body.email;
    const password = req.body.password;
    Seller.findOne({email:email})
    .then(seller=>{
   if (!seller){
      return  res.send("Invalid!!!");
   }
   console.log('above pass');
   bcrypt.compare(password,seller.password)
   .then(doMatch=>{
       if(doMatch){
        req.session.isSellerLoggedIn = true;
        req.session.seller = seller;
           console.log('made it');
           return req.session
           .save(err=>{
            console.log(err);
            res.redirect('/');;
       });
       }
       return res.render('auths/loginseller',{
        isAuthenticatedUser:req.session.isLoggedIn,
        isAuthenticatedSeller : req.session.isSellerLoggedIn,
     });
   })
})
.catch(err=>{
    console.log(err);
 const error = new Error(err);
 error.httpStatusCode =500;
 return next(error);;
});
}
