'use strict';

app.factory('basketService', ['$http', function (http) {
    return {
      getBacket: function (cb) {
        http({
          method: "GET",
          url: "/basket"
        }).then(function (answ) {
          cb(null, answ.data);
        }, function (err) {
          cb(err, null);
        });
      },

      addItem: function (idProduct, cb) {
        http({
          method: "POST",
          url: "/basket",
          params: {
            id: idProduct
          }
        }).then(function (answ) {
          cb(null, answ.data);
        }, function (err) {
          cb(err, null);
        });
      },

      removeItem: function (idProduct, cb) {
        http({
          method: "DELETE",
          url: "/basket",
          params: {
            id: idProduct
          }
        }).then(function (answ) {
          cb(null, answ.data);
        }, function (err) {
          cb(err, null);
        });
      },

      getItems: function (cb) {
        http({
          method: "GET",
          url: "/basket/items"
        }).then(function (answ) {
          cb(null, answ.data);
        }, function (err) {
          cb(err, null);
        });
      }
    }
  }]);