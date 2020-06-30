const express = require('express');
const path = require('path');
const app = express();
const session = require('express-session');
const bodyparser =require('body-parser');
const mongodbstore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const mongoose = require('mongoose');
const User = require('./models/user');
const errorController=require('./controllers/errorController');

const MONGODB_URI = "mongodb+srv://Aditya:AoM18W3BFXbQ8ehG@cluster0-cws37.mongodb.net/test?retryWrites=true&w=majority";

app.set('view engine', 'ejs');
const store = new mongodbstore({
    uri: MONGODB_URI,
    collection: 'sessions',
});

const csrfProtection = csrf();


app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyparser.urlencoded({extended:false}));

const shopRoutes = require('./routes/shopRouter');
const authRoutes = require('./routes/authRouter');


// all this shit has to be moved up
app.use(
    session({ 
secret: 'my secret',
resave: false,
saveUninitialized: false,
store: store,
}));
app.use((req, res, next) => {
    if (!req.session.user) {
        return next();
    }
    User.findById(req.session.user._id)
        .then(user => {
            if (!user) {
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



app.use(shopRoutes);
app.use(authRoutes);
// app.get('/500',errorController.get505);
app.use(errorController.get404);

app.use((error,req,res,next)=>{
    console.log(error);
    res.status(500).render('500', {
        pageTitle: "Error!",
        // path: '/500',
        isAuthenticated: req.session.isLoggedIn,
    });
})



mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => {
        app.listen(5000, () => {
            console.log("Listening on port 5000")
        });
    })
    .catch(err => console.log(err));