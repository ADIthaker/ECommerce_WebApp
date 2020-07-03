const Product = require('../models/product');

const fileHelper = require('../util/file');
const { render } = require('ejs');

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
        sellerId:sellerId,
        sold:0,
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
exports.getProdDetails=(req,res,next)=>{
    const prodId = req.params.prodId;
    Product.findOne({_id:prodId})
    .then(prod=>{
        if(prod){
            const name = prod.name;
            const price=prod.price;
            const avail=prod.availability;
            const sellerId =prod.sellerId;
            const costPrice =prod.costPrice;
            const description=prod.description;
            const sold=prod.sold;
            const imgsurl =prod.images.map(img=>img.url);
           return  res.render('admin/prod-details',{
                prodId:prodId,
                price:price,
                avail:avail,
                sellerId:sellerId,
                costPrice:costPrice,
                description:description,
                imgurls:imgsurl,
                name:name,
                sold:sold,
                pageTitle:`${req.seller.name} : ${name}`,
               
            })
        }
        res.send('cant get it!');
        
    })
   .catch(err=>{
        const error = new Error(err);
        error.httpStatusCode=500;
        return next(error);
   });
};



exports.getEditProduct =(req,res,next)=>{
    const prodId =req.params.prodId;
    Product.findOne({_id:prodId})
    .then(prod=>{
        if(prod){
            const name = prod.name;
            const price=prod.price;
            const avail=prod.availability;
            const sellerId =prod.sellerId;
            const costPrice =prod.costPrice;
            const description=prod.description;
            const imgsurl =prod.images.map(img=>img.url);
        
        return  res.render('admin/edit-product',{
            prodId:prodId,
            price:price,
            avail:avail,
            sellerId:sellerId,
            costPrice:costPrice,
            description:description,
            name:name,
            pageTitle:`${req.seller.name} : ${name}`,
        });
    }
        res.send('cant get it!');
    })
    .catch(err=>{
        const error = new Error(err);
        error.httpStatusCode=500;
        return next(error);
   });   
};

exports.postEditProduct =(req,res,next)=>{
    const prodId = req.body.prodId;
    let imgUrl=[];
    Product.findById(prodId).then(product=>{
        if(product.sellerId.toString() !== req.seller._id.toString()){
           return res.redirect('/admin/products');
        }
       product.name = req.body.product_name;
       product.price =  req.body.price;
       product.availability = req.body.avail;
       product.description = req.body.desc;
       product.costPrice = req.body.cost_price;
       for (img of product.images){
            fileHelper.deleteFile(img.url);
       }
       req.files.forEach(img=>imgUrl.push({url:img.path}));
       product.images=imgUrl;
       return product.save().then(result=>{
           console.log('Updated Product!!');
           res.redirect('/admin/products');
       });
    }) 
       .catch(err=>{
           const error = new Error(err);
           error.httpStatusCode = 500;
           return next(error);
       });

}

exports.postDeleteProduct = (req,res,next)=>{
  const prodId = req.body.prodId;
  Product.findOne({_id:prodId})
  .then(product=>{
      if(!product){
          return res.send('no prod found!');
      }
for (img of product.images){
        fileHelper.deleteFile(img.url);
   }
   return Product.findByIdAndRemove({_id:prodId,sellerId:req.seller._id})

  })
  .then(result=>{
      console.log(result);
      console.log('\nDeleted Product!');
      res.redirect('/admin/products');
  })
  .catch(err=>{
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
});
}