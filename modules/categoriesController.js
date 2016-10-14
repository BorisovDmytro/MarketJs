'use strict'

const Model = require('./mongoConnection.js').Categories;

exports.add = function (name, img, cb) {
  var item = new Model({
    name: name,
    imgUrl: img
  });

  item.save((err) => {
    if (!err)
      cb(null, item);
    else
      cb(err, null);
  });
}

exports.update = function (id, name, img, cb) {
  Model.findById(id, (err, doc) => {
    if (err)
      cb(err, null);
    else {
      doc.name = name;
      doc.imgUrl = img;
      doc.save((err) => {
        if (!err)
          cb(null, doc);
        else
          cb(err, null);
      });
    }
  });
}

exports.remove = function (id, cb) {
  Model.findById(id, (err, doc) => {
    if (err)
      cb(err);
    else {
      doc.remove((err) => {
        if (!err)
          cb(null);
        else
          cb(err);
      });
    }
  });
}

exports.getAll = function (cb) {
  Model.find({}, (err, docs) => {
    if(err)
      cb(err, null);
      else
      cb(null, docs);
  });
}
