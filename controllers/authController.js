const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs');


exports.getLogin = (req,res,next)=>{
    return res.render('auths/login');
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
       return res.render('auths/login');
   })
        
})
    .catch(err=>{
        const error = new Error(err);
        error.httpStatusCode =500;
        return next(error);
    });

}

exports.getSignup =(req,res,next)=>{
    return res.render('auths/signup');
}

exports.postSignup = (req,res,next)=>{
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
     return res.send("SIGNED UP SUCCESSFULLY")})
   .catch(err=>{
       console.log(err);
    const error = new Error(err);
    error.httpStatusCode =500;
    return next(error);
});
}

exports.getSellerId=(req,res,next)=>{
    
}