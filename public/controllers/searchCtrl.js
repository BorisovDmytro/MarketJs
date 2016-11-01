
app.controller('searchCtrl', ['$scope', '$location', 'ProductService', 
function($scope, $location, ProductService) {
  console.log("Start controller");
  
  $scope.model = [];
  $scope.init = function() {
    $scope.name = $location.path().split('/')[2];

    ProductService.getSearchResualt($scope.name, function(err, data) {
      if(!err) {
        $scope.model = data;
      } else 
        console.error(err);
    });
  }

}]);

