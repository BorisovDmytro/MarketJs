'use strict';

app.factory('OrderService', ['$http',
  function (http) {
    return {
      add: function(model, cb) {
        http({
          method: "POST",
          url: "/order",
          params: model 
        }).then(function(answ) {
           cb(null, answ.data); 
        }, function(err) {
          cb(err, null);
        });
      }
    }
  }]);