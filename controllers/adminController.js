const Product = require('../models/product');

const fileHelper = require('../util/file');

exports.getAddProducts=(req,res,next)=>{
    res.render('admin/add-product',{
        isAuthenticatedSeller : req.session.isSellerLoggedIn,
        isAuthenticatedUser : req.session.isLoggedIn,
        csrfToken:req.csrfToken()
    });
}

exports.postAddProducts = (req,res,next)=>{
    const name = req.body.product_name;
    const price = req.body.price;
    const desc = req.body.desc;
    const avail = req.body.avail;
    const cp = req.body.cost_price;
    const images = req.files;
    let imgurl =[];
    imgUrl= images.map(img=>img.path);
    const sellerId = req.seller._id;
    const product = new Product({
        name:name,
        availability:avail,
        imageUrl:imgurl,
        description:desc,
        price:price,
        costPrice:cp,
        sellerId:sellerId
    })
    product.save()
    .then (result=>{
        console.log(result);
        console.log("\nCreated Product");
        res.redirect('/');
    })
    .catch(err=>
        { 
        console.log(err); 
        
    });

}