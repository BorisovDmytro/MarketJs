'use strict'

const Model = require('./mongoConnection.js').Baskets;
const Products = require('./productController.js')

exports.getById = function (id, cb) {
  Model.findById(id, (err, doc) => {
    if (err)
      cb(err, null);
    else
      cb(null, doc);
  });
}

exports.create = function (cb) {
  var item = new Model({
    items: []
  });

  item.save(function (err) {
    if (!err)
      cb(null, item);
    else
      cb(err, null);
  });
}

exports.getProducts = function (id, cb) {
  exports.getById(id, (err, doc) => {
    if (err)
      cb(err, null);
    else {
      Products.getByIdList(doc.items, cb);
    }
  });
}

exports.addItem = function (id, idProduct, cb) {
  exports.getById(id, (err, doc) => {
    if (err)
      cb(err, null);
    else {
      doc.items.push(idProduct);
      doc.save((err) => {
        if (err)
          cb(err, null);
        else
          cb(null, doc);
      });
    }
  });
}

exports.removeItem = function (id, idProduct, cb) {
  exports.getById(id, (err, doc) => {
    if (err)
      cb(err, null);
    else {
      var index = doc.items.indexOf(idProduct);
      if (index == -1)
        cb("not found item", null);
      else {
        doc.items.splice(index, 1);
        doc.save((err) => {
          if (err)
            cb(err, null);
          else
            cb(null, doc);
        });
      }
    }
  });
}
