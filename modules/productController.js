'use strict'

const Model = require('./mongoConnection.js').Products;

exports.add = function (name, manufacturer, count, shortDesc, desc, price, categories, imgUrl, cb) {
  var item = new Model({
    name: name,
    manufacturer: manufacturer,
    shortDesc: shortDesc,
    desc: desc,
    price: price,
    count: count,
    categories: categories,
    imgUrl: imgUrl
  });

  item.save(function (err) {
    if (!err)
      cb(null, item);
    else
      cb(err, null);
  });
}

exports.getById = function (id, cb) {
  Model.findById(id, function (err, obj) {
    if (err)
      cb(err, null);
    else
      cb(null, obj);
  });
}

exports.getByCategoriesName = function (name, pageIndex, cb) {
  Model.find({ categories: name }, function (err, docs) {
    if (err)
      cb(err, null);
    else
      cb(null, docs);
  }).skip(pageIndex * 10).limit(10);
}

exports.remove = function (id, cb) {
  Model.findById(id, function (err, item) {
    if (err)
      cb(err);
    if (!item)
      cb("not found");
    else {
      item.remove(function (err) {
        if (err)
          cb(err);
        else
          cb(null);
      });
    }
  });
}

exports.getSearch = function (name, cb) {
  Model.find({ name: new RegExp(name, 'i') }, function (err, docs) {
    if (err)
      cb(err, null);
    else
      cb(null, docs);
  });
}

exports.getByIdList = function(idList, cb) {
  Model.find({_id: {$in: idList}}, (err, docs) => {
    if(err) 
      cb(err, null);
    else 
      cb(null, docs);  
  });
}