
'use strict'

const Model = require('./mongoConnection.js').Order;
const Products = require('./productController.js');
const Basket = require('./basketController.js');
const async = require("async");

exports.add = function (idBasket, email, name, secondName, address, phone, cb) {
  var date = new Date().toISOString();
  Basket.getById(idBasket, (err, doc) => {
    if (err)
      cb(err, null);
    else {
      var order = new Model({
        items: doc.items,
        date: date,
        email: email,
        name: name,
        secondName: secondName,
        address: address,
        phone: phone,
        progress: "completed"
      });

      order.save((err, order_save) => {
        if (err)
          cb(err, null);
        else {
          Products.getByIdList(doc.items, (err, products) => {
            if (err)
              cb(err, null);
            else {
              async.map(products,
                (item, callback) => {
                  if (item.count == 0)
                    callback("not available ");
                  else {
                    item.count--;
                    item.save((err) => {
                      if (err)
                        callback(err);
                      else
                        callback(null);
                    });
                  }
                },
                (err) => {
                  if (err)
                    cb(err);
                  else {
                    doc.items = [];
                    doc.save((err) => {
                      if (err)
                        cb(err, null);
                      else
                        cb(null, order_save);
                    });
                  }
                });
            }
          });
        }
      });
    }
  });
}

exports.getByEmail = function (email, cb) {
  Model.find({ email: email }, (err, docs) => {
    if (err)
      cb(err, null);
    else
      cb(null, docs);
  });
}
