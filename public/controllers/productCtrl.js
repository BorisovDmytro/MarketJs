
app.controller('productCtrl', ['$scope', '$location', 'ProductService', 'basketService',
  function ($scope, $location, ProductService, basketService) {
    $scope.visible = true;
    $scope.currentIndexImg = 0;

    $scope.init = function () {
      $scope.id = $location.path().split('/')[3];
      ProductService.getProductById($scope.id, function (err, data) {
        if (!err)
          basketService.getBacket(function (err, backet) {
            if (backet.items.indexOf(data._id) != -1) {
              $scope.inBasket = true;
            } else {
              $scope.inBasket = false;
            }
            $scope.model = data;
          });
        else
          console.error(err);
      });
    }

    $scope.addToBasket = function () {
      basketService.addItem($scope.model._id, function (err, done) {
        if (err)
          alert("Error add to backet");
        else
          $scope.inBasket = true;
      });
    }

    $scope.onViewBasket = function () {
      window.location = "#/basket"
    }

    $scope.onImgClick = function (index) {
      $scope.currentIndexImg = index;
    }
  }]);

