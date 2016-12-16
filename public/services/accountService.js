'use strict';

app.factory('AccountService', ['$http',
  function (http) {

    var user = null;

    return {
      getUser: function() {
        return user;
      },

      signUp: function (model, cb) {
        http({
          method: "PUT",
          url: "/account",
          params: model
        }).then(function (answ) {
          cb(null, answ.data);
        }, function (err) {
          cb(err, null);
        });
      },

      signUpModelValidate: function (model) {
        if (!model.email) {
          return "invalid email";
        }

        if (!model.pass || model.pass.length < 6) {
          return "invalid password";
        }

        if (!model.secondName) {
          return "invalid second name";
        }

        if (!model.name) {
          return "invalid name";
        }

        if (!model.address) {
          return "invalid address";
        }

        if (!model.phone) {
          return "invalid phone";
        }

        return null;
      },

     loginValidator: function(model) {
       if(!model.email)
        return "invalid email or password";
       if(!model.pass || model.pass.length < 6)
        return "invalid email or password";
      return null;
     },

     login: function(model, cb) {
       http({
          method: "POST",
          url: "/account",
          data: model
        }).then(function (answ) {
          user = answ.data;
          cb(null, answ.data);
        }, function (err) {
          user = null;
          cb(err, null);
        });
     },

     autoLogin: function(cb) {
        http({
          method: "GET",
          url: "/account"
        }).then(function (answ) {
          user = answ.data;
          cb(user);
        }, function (err) {
          cb(null);
        });
     },

     logOut: function(cb) {
       http({
         method: "DELETE",
         url: "/account"
       }).then(function(answ) {
         cb();
       }, function(err) {
         cb(err);
       });
     }
    }
  }]);
