
app.controller('mainCtrl', ['$scope', '$location', 'ProductService',
  function ($scope, $location, ProductService) {
    console.log("Start controller");

    $scope.categories = [];
    $scope.searchText = "";

    $scope.init = function () {
      var type = $location.path().split('/')[1];
      var name = $location.path().split('/')[2];
      if (type == "search")
        $scope.searchText = name;
      else
        $scope.searchText = "";

      ProductService.getCategories(function (err, data) {
        if (err)
          console.error(err);
        else
          $scope.categories = data;
      });
    }

    $scope.onSignUpCLick = function() {
        
    }
  }]);

