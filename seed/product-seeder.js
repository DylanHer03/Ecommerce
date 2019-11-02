var Product = require('../models/product');
var mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/shopping');

var products = [
    new Product ({
        imagePath:'/images/product-1.png',
        title:'Google Pixel - Black',
        description: 'Awesome Phone!!!!',
        price: 16
    }),
    new Product ({
        imagePath:'/images/product-2.png',
        title:'Samsung S7',
        description: 'Awesome Phone!!!!',
        price: 16
    }),
    new Product ({
        imagePath:'/images/product-3.png',
        title:'HTC 10 - Black',
        description: 'Awesome Phone!!!!',
        price: 16
    }),
    new Product ({
        imagePath:'/images/product-4.png',
        title:'HTC 10 - White',
        description: 'Awesome Phone!!!!',
        price: 16
    }),
    new Product ({
        imagePath:'/images/product-5.png',
        title:'HTC Desire 626s',
        description: 'Awesome Phone!!!!',
        price: 16
    }),
    new Product ({
        imagePath:'/images/product-6.png',
        title:'Vintage Iphone',
        description: 'Awesome Phone!!!!',
        price: 16
    })
];

var done = 0;
for (var i = 0; i< products.length; i++) {
    products[i].save(function(err,result){
        done++;
        if(done === products.length){
            exit();
        }
    });
}

function exit() {
    mongoose.disconnect();
}
