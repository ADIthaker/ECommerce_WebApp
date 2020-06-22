const express = require('express');
const path = require('path');
const app = express();
const shopRoutes = require('./routes/shop');

app.set('view-engine', 'ejs');
app.use(shopRoutes);
app.use((req, res, next) => {
    res.status(404).render('404.ejs');
});

app.listen(5000, () => {
    console.log("Listening on port 5000")
});