'use strict';

app.factory('ProductService', ['$http',
  function (http) {
    return {
      getProduct: function(name, pageIndex, cb) {
        http({
          method: "GET",
          url: "/product/" + name + "/" + pageIndex
        }).then(function(answ) {
           cb(null, answ.data); 
        }, function(err) {
          cb(err, null);
        });
      }, 

      getProductById: function(id, cb) {
         http({
          method: "GET",
          url: "/product",
          params: {
            id: id
          } 
        }).then(function(answ) {
           cb(null, answ.data); 
        }, function(err) {
          cb(err, null);
        });
      }, 

      getCategories: function(cb) {
         http({
          method: "GET",
          url: "/categories"
        }).then(function(answ) {
           cb(null, answ.data); 
        }, function(err) {
          cb(err, null);
        });
      },

      getSearchResualt: function(name, cb) {
         http({
          method: "GET",
          url: "/search/" + name
        }).then(function(answ) {
           cb(null, answ.data); 
        }, function(err) {
          cb(err, null);
        });
      }
    }
  }]);