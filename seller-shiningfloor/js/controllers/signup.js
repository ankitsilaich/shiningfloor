'use strict';

// signup controller
app.controller('SignupFormController', ['$scope', '$http', '$state', function($scope, $http, $state) {

      
   
    $scope.login = function(user){
     // console.log($scope.user);
    if(!$rootScope.isLoggedIn) {
      LoginService.login($scope.user, $scope);
      $scope.user = "";
    }
    else $location.path('/home');
  }
  

    $scope.user = {};
    $scope.authError = null;
    $scope.signup = function(user) {
      $scope.authError = null;
      // Try to create
      $http.post('../main_site/api/slim.php/auth/signup/seller', {name: $scope.user.name, email: $scope.user.email, password: $scope.user.password})
      .then(function(response) {

        if ( response.data.signup_success == 'false') {
//          $scope.authError = response;
          console.log('Error in signup');
        }else{
          $state.go('access.signin');
        }
      });

    };

  }]);