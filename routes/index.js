var express = require('express');
var router = express.Router();
var Product= require('../models/product');
var csrf= require('csurf');

var csrfProtection = csrf();
router.use(csrfProtection);

router.get('/', function(req, res, next) {
  Product.find((err, docs)=>{
    let productChunks = [];
    let chunkSize = 4;
    for (let i = 0; i < docs.length; i += chunkSize) {
      productChunks.push(docs.slice(i, i + chunkSize));
    }
    res.render('shop/index', { title: 'Atul T Varghese Shopping Cart', products: productChunks});
  });
});


router.get('/user/signup',function (req,res,next) {
  res.render('user/signup',{csrfToken: req.csrfToken()});

});
router.post('/user/signup',function (req, res, next) {
    res.redirect('/');

});

module.exports = router;
          