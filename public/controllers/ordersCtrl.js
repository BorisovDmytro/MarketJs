
app.controller('ordersCtrl', ['$scope', '$location', 'OrderService', 'AccountService',
  function ($scope, $location, OrderService, AccountService) {
    var self = this;

    $scope.onInit = function () {
      var user = AccountService.getUser();
      if (!user)
        window.location.href = "/";
      else {
        OrderService.getAll(user.email, function (err, data) {
          if(err) 
            console.error(err);  
          else {
            $scope.items = data;
            console.log(data);
          } 
        });
      }
    }
  }]);

