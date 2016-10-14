
app.controller('categoriesCtrl', ['$scope', '$location', 'ProductService',
  function ($scope, $location, ProductService) {
    var nameCategories = "";
    var pageIndex = 0;
    $scope.model = [];

    function onNextPageLoad(name, pageIndex) {
      ProductService.getProduct(name, pageIndex, function (err, data) {
        if (!err) {
          console.log(data);
          data.forEach(function (value, indx, arr) {
            $scope.model.push(value);
          });
          pageIndex ++;
        } else
          console.error(err);
      });
    }

    $scope.init = function () {
      var urlData = $location.path().split('/');
      nameCategories = urlData[2];
      onNextPageLoad(nameCategories, pageIndex++);
    }

    $scope.onNextClick = function () {
      onNextPageLoad(nameCategories, pageIndex++);
    }

    $scope.onItemClick = function(item) {
      document.location.href = "#/categories/" + item.categories + "/" + item._id;
    }
  }]);

