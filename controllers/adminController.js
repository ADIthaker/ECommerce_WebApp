const Product = require('../models/product');

const fileHelper = require('../util/file');

exports.getAddProducts=(req,res,next)=>{
    res.render('admin/add-product',{
        isAuthenticatedSeller : req.session.isSellerLoggedIn,
        isAuthenticatedUser : req.session.isLoggedIn,
        csrfToken:req.csrfToken(),
        pageTitle:'Add Products',
    });
}

exports.getAdminProducts=(req,res,next)=>{
    const name = req.seller.name;
    Product.find({sellerId:req.seller._id})
    .then(prods=>{
            return res.render('admin/admin-products',{
                products:prods,
                pageTitle:`${name}'s Products`,
         
            })
        
        })
    .catch(err=>{
       
        const error = new Error(err);
        error.httpStatusCode=500;
        return next(error);
    })
}

exports.postAddProducts = (req,res,next)=>{
    const name = req.body.product_name;
    const price = req.body.price;
    const desc = req.body.desc;
    const avail = req.body.avail;
    const cp = req.body.cost_price;
    const images = req.files;
    let imgUrl = [];
    images.forEach(img=>imgUrl.push({url:img.path}));
    const sellerId = req.seller._id;
    const product = new Product({
        name:name,
        availability:avail,
        description:desc,
        price:price, 
        costPrice:cp,
        images:imgUrl,
        sellerId:sellerId
    })
    product.save()
    .then (result=>{
       
       
        console.log("\nCreated Product");
       
        res.redirect('/admin/products');
        
    })
    .catch(err=>
        { 
            const error = new Error(err);
            error.httpStatusCode=500;
            return next(error);
    });

}