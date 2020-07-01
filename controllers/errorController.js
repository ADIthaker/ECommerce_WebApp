exports.get404 =(req,res,next)=>{
    res.status(404).render('404',
    {pageTitle :"404 : Page Not Found",path:'/400',
    isAuthenticatedUser : req.session.isLoggedIn,
    isAuthenticatedSeller : req.session.isSellerLoggedIn,
    csrfToken:req.csrfToken()
});
};
exports.get500 = (req,res,next)=>{
    res.status(500).render('500',
    {pageTitle :"Error!",path:'/500',
     isAuthenticatedUser : req.session.isLoggedIn,
     isAuthenticatedSeller : req.session.isSellerLoggedIn,
     csrfToken:req.csrfToken()
});
};