exports.isuserauth =(req,res,next)=>{
    if(!req.session.isLoggedIn){
        return res.redirect('/login');
    }
  next();
}
exports.issellerauth =(req,res,next)=>{
    if(!req.session.isSellerLoggedIn){
        return res.redirect('/loginseller');
    }
 next();
}