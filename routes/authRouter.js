const express = require('express');
const Auth = require('../controllers/authController');

const router = express.Router();


router.get('/login',Auth.getLogin);

router.post('/login',Auth.postLogin);

router.get('/signup',Auth.getSignup);

router.post('/signup',Auth.postSignup);

router.get('/newselller',Auth.getSellerId);


module.exports = router;