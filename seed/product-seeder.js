const product = require('../models/product');
const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/shop',{useNewUrlParser:true});


const products = [
    new product({
        imagePath:"https://www.hindimeaning.com/wp-content/uploads/2012/12/Bitter-Gourd.jpg" ,
        title:'Bitter Gourd, Charantis – (Momordica charantia)e' ,
        description: 'it is a vegitable with very bitter in nature',
        price: 10
    }),
    new product({
        imagePath: "https://www.hindimeaning.com/wp-content/uploads/2012/12/green-cabbage.jpg",
        title: 'Cabbage, Brussel sprout – (Brassica oleracea var. capitata)',
        description: 'adipolli thoran  indakkam pattum',
        price: 100
    }),
    new product({
        imagePath: "https://www.hindimeaning.com/wp-content/uploads/2012/12/carrots-vegetables.jpg",
        title:"Carrot – (Daucus carota subsp. sativus)",
        description:"ithu oru kiddukkschi sadhana ithill kure vitamins in like vitamin A like more oin this",
        price:30
    }),
    new product({
        imagePath: "https://www.hindimeaning.com/wp-content/uploads/2012/12/black-pepper.jpg",
        title: 'Black pepper– (Piper nigrum)',
        description: 'poli erivulla thing  in this field',
        price: 60
    })

];

let done = 0;
for (let i = 0; i < products.length; i++) {
    products[i].save(function (err, result) {
        done++;
        if (done === products.length) {
            exit();
        }
    });
}

function exit() {
    mongoose.disconnect();
}

