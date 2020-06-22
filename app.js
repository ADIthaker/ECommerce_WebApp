const express = require('express');

const app = express();

app.get('/', (req, res, next) => {
    res.send("Hello");
})

app.listen(5000, () => {
    console.log("Listening on port 5000")
});