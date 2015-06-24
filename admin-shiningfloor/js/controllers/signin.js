'use strict';

/* Controllers */
  // signin controller
app.controller('SigninFormController', ['$rootScope', '$scope', '$http', '$state','LoginService', function($rootScope,$scope, $http, $state, LoginService) {
    $scope.user = {};
    $scope.authError = null;
   
    $scope.login = function(user){
     // console.log($scope.user);
    if(!$rootScope.isLoggedIn) {
      LoginService.login($scope.user, $scope);
      $scope.user = "";
    }
    else $location.path('/home');
  }
  $scope.logout = function(){
    LoginService.logout();
  }
   /* $scope.login = function() {
      $scope.authError = null;
      // Try to login
      $http.post('api/login', {email: $scope.user.email, password: $scope.user.password})
      .then(function(response) {
        if ( !response.data.user ) {
          $scope.authError = 'Email or Password not right';
        }else{
          $state.go('app.dashboard-v1');
        }
      }, function(x) {
        $scope.authError = 'Server Error';
      });
    };*/
  }])
;