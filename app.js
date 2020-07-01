const express = require('express');
const path = require('path');
const app = express();
const session = require('express-session');
const bodyparser =require('body-parser');
const mongodbstore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const mongoose = require('mongoose');
const User = require('./models/user');
const Seller = require('./models/seller');
const errorController=require('./controllers/errorController');
const MONGODB_URI = "mongodb+srv://Aditya:AoM18W3BFXbQ8ehG@cluster0-cws37.mongodb.net/test?retryWrites=true&w=majority";
const multer = require('multer');
const flash = require('connect-flash');

app.set('view engine', 'ejs');
const store = new mongodbstore({
    uri: MONGODB_URI,
    collection: 'sessions',
});

app.use(express.static(path.join(__dirname, 'public')));
app.use('/images',express.static(path.join(__dirname, 'images')));

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        cb(null,new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
    },
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg') {
        cb(null, true);
    } else {
        cb(null, false);
    }

}

app.use(bodyparser.urlencoded({extended:false}));
app.use(multer({ storage: fileStorage, fileFilter: fileFilter}).array('image',2));


app.use(
    session({ 
secret: 'my secret',
resave: false,
saveUninitialized: false,
store: store,
}));
const csrfProtection = csrf();
app.use(csrfProtection);


const shopRoutes = require('./routes/shopRouter');
const authRoutes = require('./routes/authRouter');
const adminRoutes = require('./routes/adminRouter');

app.use((req, res, next) => {
    if (!req.session.user) {
        return next();
    }
User.findById(req.session.user._id)
.then(user => {
            if(!user){
                return next();
        }
            req.user = user;
            next();
        })
        .catch(err => {
            next(new Error(err));
        });
    
});
//have to move this above all reqs 
app.use((req,res,next)=>{
    if(!req.session.seller){
        return next();
    }
Seller.findById(req.session.seller._id)
        .then(seller=>{
            if(!seller) {
                 return next();
            }
            req.seller=seller;
            next();
        })
        .catch(err => {
            next(new Error(err));
        });
    
});
app.use((req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    res.locals.isAuthenticatedUser = req.session.isLoggedIn;
    res.locals.isAuthenticatedSeller =  req.session.isSellerLoggedIn;
    next();
});
app.use('/admin',adminRoutes);
app.use(authRoutes);
app.use(shopRoutes);
app.get('/500',errorController.get500);
app.use(errorController.get404);
app.use((error,req,res,next)=>{
    console.log(error);
   res.render('500');
})



mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => {
        app.listen(5000, () => {
            console.log("Listening on port 5000")
        });
    })
    .catch(err => console.log(err));