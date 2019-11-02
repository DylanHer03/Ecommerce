var express = require('express');
var router = express.Router();
var Cart = require('../models/cart');
var Products = require('../models/product');
const stripe = require('stripe')('sk_test_B64eqFKTRqc8aGSI4LtsEkjo00iH3rqUqF');


/* GET home page. */
router.get('/', function(req, res, next) {
  Products.find(function(err,docs){
    var productChuncks = [];
    var chunkSize = 3;
    for(var i = 0 ; i < docs.length; i+= chunkSize){
        productChuncks.push(docs.slice(i,i+chunkSize));
    }
      res.render('shop/index', { title: 'Shopping Cart', products: productChuncks });
  });
  
});

router.get('/add-to-cart/:id', function (req, res, next) {
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});

  Products.findById(productId, function(err, product){
    if(err){
      return res.redirect('/')
    }
    cart.add(product, product.id);
    req.session.cart = cart;
    console.log(req.session.cart);
    res.redirect('/');
  })

});

router.get('/dati', function(req,res,next){
  Products.find(function(err,docs){
    var productChuncks = [];
    var chunkSize = 3;
    for(var i = 0 ; i < docs.length; i+= chunkSize){
        productChuncks.push(docs.slice(i,i+chunkSize));
    }
      res.render('shop/dati', { title: 'Dati', products: productChuncks });
  });
  
})

router.post('/checkout', async(req, res)=>{
  console.log(req.body);
  res.render('shop/checkout');
})

router.get('/info', function(req, res, next){
  res.render('shop/info');
});

router.get('/shopping-cart', function(req, res, next){
  if(!req.session.cart){
     return res.render('shop/shopping-cart', {products:null});

  }
  var cart = new Cart(req.session.cart);
  res.render('shop/shopping-cart', {products: cart.generateArray(), totalPrice: cart.totalPrice});
});

router.get('/checkout', function(req, res, next){
    if(!req.session.cart){
      return res.redirect('/shopping-cart');
    }
    var cart = new Cart(req.session.cart);
    res.render('shop/checkout', {total: cart.totalPrice});
});



module.exports = router;
