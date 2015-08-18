'use strict';

/* Controllers */
  // signin controller
app.controller('SigninFormController', ['$rootScope', '$scope', '$http', '$state','$location','LoginService','toaster','$timeout' ,function($rootScope,$scope, $http, $state, $location,LoginService,toaster,$timeout) {
    $scope.user = {};
    $scope.authError = null;
  if($rootScope.isLoggedIn){
    $location.path('/home');
  } 
 $scope.login = function(user) {
    if(!$rootScope.isLoggedIn) {
        LoginService.login($scope.user, $scope).then(function(){
//            console.log($rootScope.isLoggedIn);
            if($rootScope.isLoggedIn){
                toaster.pop('success', 'Seller Login Successful', 'Redirecting to home page...');         
                $timeout(redirectState, 3000);
            }
            else{
                toaster.pop('error', 'Login Error', 'Either email or password incorrect');
              }
        }); 
    } else { 
        $location.path('/home');
    }          
}

function redirectState() {
       $location.path('/home');
    }
  
  $scope.logout = function(){
    console.log('logout called');
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