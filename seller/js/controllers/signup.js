'use strict';

// signup controller
app.controller('SignupFormController', ['$scope', '$http', '$state','toaster','$timeout', function($scope, $http, $state,toaster,$timeout) {

      
   
    $scope.login = function(user){
      console.log('ss');      
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
      $http.post('../api/slim.php/auth/signup/seller', {name: $scope.user.name, email: $scope.user.email, password: $scope.user.password})
      .then(function(response) {

        if ( response.data.signup_success == 'false') {
 
            toaster.pop('error', 'Seller existed', 'Please login with this email...'); 
        }else{
          toaster.pop('success', 'Seller added', 'Redirecting to update seller details ...');         
          $timeout(redirectState, 3000);
          // $state.go('app.update.seller');
        }

      });
      function redirectState() {
       $state.go('app.update.seller',{},{reload:true});
    }
    };

  }]);