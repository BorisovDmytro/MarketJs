
app.controller('basketCtrl', ['$scope', '$location', 'basketService', 'OrderService', 'AccountService',
  function ($scope, $location, basketService, OrderService, AccountService) {
    $scope.allPrice = 0;
    $scope.items = [];
    $scope.isNotEmpty = true;
    $scope.model = {
      email: "",
      name: "",
      secondName: "",
      address: "",
      phone: ""
    };

    if(AccountService.getUser()) {
      var user = AccountService.getUser();
      $scope.model.email = user.email;
      $scope.model.name = user.name;
      $scope.model.secondName = user.secondName;
      $scope.model.address = user.address;
      $scope.model.phone = user.phone;
    }

    $scope.isFinish = false;
    $scope.errorVisible = false;

    function updateAllPrice() {
      $scope.allPrice = 0;
      $scope.items.forEach(function (item, index, arr) {
        $scope.allPrice += parseInt(item.price, 10);
      });
    }

     function validate() {
      errors = [];
      var model = $scope.model;
      if (!model.email) 
        errors.push('invalid email');
      if (!model.name) 
        errors.push('invalid name');
      if (!model.secondName) 
        errors.push('invalid second name');
      if (!model.address) 
        errors.push('invalid address');
      if (!model.phone) 
        errors.push('invalid phone');
      return errors;
    }

    $scope.init = function () {
      basketService.getItems(function (err, data) {
        if (err)
          console.error(err);
        else {
          if (data.length == 0) {
            $scope.isNotEmpty = false;
          } else {
            $scope.isNotEmpty = true;
            $scope.items = data;
            updateAllPrice();
          }
        }
      });
    }

    $scope.onRemove = function (item) {
      basketService.removeItem(item._id, function (err, data) {
        if (err)
          console.error("Error remove item from basket ", err);
        else
          $scope.init();
      });
    }  

    $scope.onCreate = function () {
      $scope.errors = validate();
      if ($scope.errors.length != 0)
        $scope.errorVisible = true;
      else {
        $scope.errorVisible = false;
        $scope.model.price =  $scope.allPrice;
        OrderService.add($scope.model, function (err, data) {
          if (!err) {
            console.log(data);
            $scope.finishData = data;
            $scope.isFinish = true;
          } else {
            console.error(err);
          }
        });
      }
    }
  }]);

