const express = require('express');
const path = require('path');
const app = express();

const mongoose = require('mongoose');

const MONGODB_URI = "mongodb+srv://Aditya:AoM18W3BFXbQ8ehG@cluster0-cws37.mongodb.net/test?retryWrites=true&w=majority";

app.set('view engine', 'ejs');


app.use(express.static(path.join(__dirname, 'public')));


const shopRoutes = require('./routes/shop');
app.use(shopRoutes);


app.use((req, res, next) => {
    res.status(404).render('404.ejs');
});


mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => {
        app.listen(5000, () => {

            console.log(result)
            console.log("Listening on port 5000\n")
        });
    })
    .catch(err => console.log(err));