'use strict'

const mongoose = require('mongoose');
const config = require('./../config');

mongoose.connect(config.get("databaseUrl"));
const db = mongoose.connection;

db.on('error', function (err) {
  console.error('connection error:', err.message);
});
db.once('open', function callback() {
  console.log("Connected to database done");
});

var Schema = mongoose.Schema;

var Categories = new Schema({
  name: {
    type: String,
    require: true
  },

  imgUrl: {
    type: String,
    require: true
  }
});

var Product = new Schema({
  name: {
    type: String,
    require: true
  },
  count: {
    type: String,
    require: true
  },
  manufacturer: {
    type: String,
    require: true
  },

  shortDesc: {
    type: String,
    require: true
  },

  desc: {
    type: String,
    require: true
  },

  price: {
    type: String,
    require: true
  },

  categories: {
    type: String,
    require: true
  },

  imgUrl: {
    type: Array,
    require: true
  }
});


var Basket = new Schema({
  items: {
    type: Array,
    require: true
  }
});

var Order = new Schema({
  items: {
    type: Array,
    require: true
  },
  date: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  },
  name: {
    type: String,
    require: true
  },
  secondName: {
    type: String,
    require: true
  },
  address: {
    type: String,
    require: true
  },
  phone: {
    type: String,
    require: true
  },

  progress: {
    type: String,
    require: true
  }
});

var Account = new Schema({
  date: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  name: {
    type: String,
    require: true
  },
  secondName: {
    type: String,
    require: true
  },
  address: {
    type: String,
    require: true
  },
  phone: {
    type: String,
    require: true
  }
});

exports.Categories = mongoose.model('Categories', Categories);
exports.Products = mongoose.model('Product', Product);
exports.Baskets = mongoose.model('Basket', Basket);
exports.Order = mongoose.model('Order', Order);
exports.Account = mongoose.model('Account', Account);