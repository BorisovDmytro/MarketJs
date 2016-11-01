'use strict';
var app = angular.module('app', ["ngRoute"]);

app.config(function ($routeProvider) {
  $routeProvider
    .when('/', { template: '' })
    .when("/categories/:name", {
      templateUrl: "./view/categories.html",
      controller: "categoriesCtrl"
    }).when("/categories/:name/:id", {
      templateUrl: "./view/product.html",
      controller: "productCtrl"
    }).when("/search/:name", {
      templateUrl: "./view/categories.html",
      controller: "searchCtrl"
    }).when("/basket", {
      templateUrl: "./view/basket.html",
      controller: "basketCtrl"
    }).when("/orders", {
      templateUrl: "./view/orders.html",
      controller: "ordersCtrl"
    });
});

