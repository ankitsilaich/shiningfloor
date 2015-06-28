'use strict';

// signup controller
app.controller('SignupFormController', ['$scope', '$http', '$state','toaster', '$timeout',function($scope, $http, $state , toaster, $timeout) {
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
      $http.post('../main_site/api/slim.php/auth/signup/admin', {name: $scope.user.name, email: $scope.user.email, password: $scope.user.password})
      .then(function(response) {

        if ( response.data.signup_success == 'false') {
//          $scope.authError = response;
          toaster.pop('success', 'Error in Signup', ' Provide details again.');
          console.log('Error in signup');
        }else{
          toaster.pop('success', 'Admin Added Succesfully', 'Redirecting to Signin page...');
           console.log('admin added');
          $state.go('access.signin');

        }
      });

    };
    //
    // $scope.rediretToLogin = function(){
    //   $state.go('access.signin');
    // }


  }]);
