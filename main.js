'use strict'

const express = require('express');
const session = require('express-session');
const path = require('path');
const config = require('./config');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser')

const MongoSessionStore = require('connect-mongo')(session);

const Categories = require("./modules/categoriesController.js");
const Products = require("./modules/productController.js");
const Basket = require("./modules/basketController.js");
const Order = require("./modules/orderController.js");
const Account = require("./modules/accountContrller.js");

const app = express();

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.json())

app.use(session({
  name: 'session_id',
  secret: 'faeb4453e5d14fe6f6d04637f9753c76c73d1b4',
  proxy: true,
  resave: true,
  saveUninitialized: true,
  store: new MongoSessionStore({ url: config.get('databaseUrl') })
}));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/product/:categories/:pageIndex', (req, res) => {
  var name = req.params.categories;
  var pageIndex = req.params.pageIndex;
  if (!name)
    res.status(404).send("undefined name");
  else
    Products.getByCategoriesName(name, pageIndex, (err, docs) => {
      if (err)
        res.status(404).send(err);
      else
        res.send(docs);
    });
});

app.get('/product', (req, res) => {
  var id = req.query.id;
  Products.getById(id, function (err, obj) {
    if (err)
      res.status(404).send("not found");
    else
      res.send(obj);
  });
});

app.get('/categories', (req, res) => {
  Categories.getAll((err, docs) => {
    if (err)
      res.status(404).send("not found items " + err);
    else
      res.send(docs);
  });
});

app.get('/search/:name', (req, res) => {
  var name = req.params.name;
  if (!name)
    res.status(404).send("undefined name");
  else
    Products.getSearch(name, (err, docs) => {
      if (err)
        res.status(404).send("Error search, " + err);
      else
        res.send(docs);
    });
});

app.get('/basket', (req, res) => {
  var id = req.session.idBasket;
  if (id) {
    Basket.getById(id, (err, doc) => {
      res.send(doc);
    });
  } else {
    Basket.create((err, doc) => {
      if (err)
        res.status(404).send("Error get  basket, " + err);
      else {
        req.session.idBasket = doc._id;
        res.send(doc);
      }
    });
  }
});

app.post('/basket', (req, res) => {
  var id = req.query.id;
  var idBasket = req.session.idBasket;
  Basket.addItem(idBasket, id, (err, doc) => {
    if (err)
      res.status(404).send("Error get  basket" + err);
    else
      res.send(doc);
  });
});

app.get('/basket/items', (req, res) => {
  var idBasket = req.session.idBasket;
  Basket.getProducts(idBasket, (err, docs) => {
    if (err)
      res.status(404).send("Error get items " + err);
    else
      res.send(docs);
  });
});

app.delete('/basket', (req, res) => {
  var id = req.query.id;
  var idBasket = req.session.idBasket;
  Basket.removeItem(idBasket, id, (err, doc) => {
    if (err)
      res.status(404).send("Error get  basket" + err);
    else
      res.send("OK");
  });
});

app.post('/order', (req, res) => {
  var idBasket = req.session.idBasket;
  Order.add(idBasket, req.query.email, req.query.name,
    req.query.secondName, req.query.address, req.query.phone,
    (err, data) => {
      if (err)
        res.status(404).send("Error get  basket" + err);
      else
        res.send(data);
    });
});

app.get('/order/:email', (req, res) => {
  var email = req.params.email;
  if(!email) {
     res.status(404).send("Error get orders " + err);
  } else {
    Order.getByEmail(email, (err, data) => {
      if(err)
        res.status(404).send("Error get orders " + err);
      else 
        res.send(data);
    });
  }
  
});

app.put('/account', (req, res) => {
  var data = req.query;
  Account.signUp(data.email, data.pass, data.name, data.secondName, data.address, data.phone,
    (err, doc) => {
      if (err)
        res.status(404).send(err);
      else
        res.send(doc);
    });
});

app.get('/account', (req, res) => {
  if (req.session.user) {
    var account = req.session.user;
    Account.autoLogin(account.email, account.password, (err, doc) => {
      if (err)
        res.status(404).send("not login");
      else
        res.send(doc)
    });
  } else {
    res.status(404).send("not login");
  }
});

app.post('/account', (req, res) => {
  console.log(req.body);
  Account.manualLogin(req.body.email, req.body.pass, (err, doc) => {
    if (err) {
      console.log('Error', err);
      res.status(404).send("invalid-data");
    } else {
      req.session.user = doc;
      res.send(doc);
    }
  });
});

app.delete('/account', (req, res) => {
  req.session.user = null;
  res.send('Ok');
});

app.listen(config.get("port"), config.get("host"), () => {
  console.log('Express server listening on ', config.get("host"), config.get("port"));
});
