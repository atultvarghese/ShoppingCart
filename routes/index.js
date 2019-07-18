var express = require('express');
var router = express.Router();
var  Cart = require('../models/cart');

var Product= require('../models/product');

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

router.get('/add-to-cart/:id', function (req, res, next) {
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});

  Product.findById(productId, function (err, product) {
    if (err) {
      return res.redirect('/');
    }
    cart.add(product, product.id);
    req.session.cart = cart;
    console.log(req.session.cart);
    res.redirect('/');
  });
});
module.exports = router;
