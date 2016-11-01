
app.controller('mainCtrl', ['$scope', '$location', 'ProductService', 'AccountService',
  function ($scope, $location, ProductService, AccountService) {
    $scope.signUpError = false;
    $scope.loginError = false;
    $scope.categories = [];
    $scope.searchText = "";
    $scope.isLogin = false;

    $scope.signUpModel = {
      email: "",
      pass: "",
      name: "",
      secondName: "",
      address: "",
      phone: ""
    }

    $scope.login = {
      email: "",
      pass: ""
    }

    $scope.loginLog = "account";

    AccountService.autoLogin(function(user) {
      if(user) {
        $scope.loginLog = user.name;
        $scope.isLogin = true;
      } else {
        $scope.isLogin = false;
        console.log('not loged');
      }
    });

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

    $scope.onShowSignUpDlg = function () {
      $scope.signUpModel = {
        email: "",
        pass: "",
        name: "",
        secondName: "",
        address: "",
        phone: ""
      }
      $('#signUpModal').modal('show');
    }

    $scope.onShowLoginDlg = function () {
      $scope.login = {
        email: "",
        pass: ""
      }
      $('#loginDlg').modal('show');
    }

    $scope.onSignUpCLick = function () {
      var res = AccountService.signUpModelValidate($scope.signUpModel);
      if (res) {
        $scope.signUpErrorMessage = res;
        $scope.signUpError = true;
      } else {
        AccountService.signUp($scope.signUpModel, function (err, data) {
          if (err) {
            $scope.signUpError = true;
            $scope.signUpErrorMessage = err;
          } else {
            console.log(data);
            $scope.signUpError = false;
            $('#signUpModal').modal('hide');
          }
        });
      }
    }

    $scope.onLoginClick = function () {
      var res = AccountService.loginValidator($scope.login);
      if (res) {
        $scope.loginErrorMessage = res;
        $scope.loginError = true;
      } else {
        AccountService.login($scope.login, function (err, data) {
          if(err) {
            $scope.loginErrorMessage = "Invalid password or email";
            $scope.loginError = true;
            $scope.isLogin = false;
          } else {
            $scope.loginLog = data.name;
            $scope.isLogin = true;
            $scope.loginError = false;
            $('#loginDlg').modal('hide');
          }
        });
      }
    }

    $scope.onLogOut = function() {
      AccountService.logOut(function(err) {
        if(err)
          console.error(err);
        else {
          $scope.loginLog = "account";
          $scope.isLogin = false;
        }  
      });
    } 

  }]);

