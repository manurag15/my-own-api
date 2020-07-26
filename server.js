var express = require('express');
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/my-own-api');
var app = express();
var bodyParser = require('body-parser');
var Product = require('./models/product');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.get('/', function(req, res) {
  res.send("this is the get request");
});

app.post('/', function(req, res) {
  res.send("this is the post request");
});

app.post('/product', function(req, res) {
  var product = new Product();
  product.title = req.body.title;
  product.price = req.body.price;
  // product.id = mongoose.Types.ObjectId;

  product.save(function(err, savedProduct) {
    if (err) {
      res.status(500).send({
        error: "Object not saved"
      });
    } else {
      res.status(200).send(savedProduct);
    }
  });
});

// code to fetch from db
app.get('/product/:objectTitle', function(req, res) {
  res.status(200).json({
    objects: []
  });
})

// app.post('/product', function(req, res) {
//
//   var product = new Product();
//   // res.send("Post request")
//
//   product.title = req.body.title;
//   product.price = req.body.price;
//
//   product.save(function(err, savedProduct) {
//     if (err) {
//       res.status(500).send({
//         error: "Could not save product"
//       });
//     } else {
//       res.status(200).send(savedProduct);
//     }
//
//   });
//
// });

app.listen(3000, function() {
  console.log("This is my own api");
});