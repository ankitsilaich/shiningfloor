app.controller('loginController', ['$scope', '$http', '$filter', '$location', '$rootScope','LoginService', '$state','$stateParams',function($scope, $http, $filter, $location,$rootScope,LoginService,$state,$stateParams) {
  $scope.showModal = false;
  $scope.showLogin = false;
  $scope.showSignup = false;
  $scope.resetPass = false;
  $scope.loginError = "";
  $scope.signupError = "";
  
  $scope.showsignupModel = function() {

    $scope.showModal = true;
    $scope.showSignup = true;
    $scope.showLogin = false;
    $scope.signupTab = true;
    $scope.loginTab = false;
    $scope.resetPass = false;
  };
  $scope.showloginModel = function() {
    $scope.showModal = true;
    $scope.showSignup = false;
    $scope.showLogin = true;
    $scope.loginTab = true;
    $scope.signupTab = false;
    $scope.resetPass = false;

  }
  $scope.close = function(event) {
    // alert("ESC");
    // if (event.keyCode == 27) {
//      alert("ESC")
    // }
  $scope.showModal = false;
  $scope.showLogin = false;
  $scope.showSignup = false;
  $scope.resetPass = false;

  }
  $scope.resetPassword = function() {
    $scope.showSignup = false;
    $scope.showLogin = false;
    $scope.resetPass = true;
  }

 
  $http.get('../api/slim.php/auth/process/user').then(function(resp) {
      $scope.user = resp.data;
      console.log($scope.user);
    });  

$scope.login = function(user) {
      if(!$rootScope.isLoggedIn) {
          LoginService.login(user, $scope).then(function(){ 
              if($rootScope.isLoggedIn){
                  // toaster.pop('success', 'Seller Login Successful', 'Redirecting to home page...');         
                  // $timeout(redirectState, 3000);
                  console.log('Login Successful');
                  $state.go('app.home', {}, {reload: true});

              }
              else{
                  // toaster.pop('error', 'Login Error', 'Either email or password incorrect');
                  $scope.loginError = "Either email or password incorrect!"
                  // console.log('Either email or password incorrect');
                }
          }); 
      }          
  };
  $scope.signup = function(user) {
      $scope.authError = null;
      // Try to create
      $http.post('../api/slim.php/auth/signup/user', {name: user.name, email: user.email, password: user.password})
      .then(function(response) {
        if ( response.data.signup_success == 'false') {
            console.log('signup error ' + response.data);
            $scope.signupError = "Email already registered! ";
            // toaster.pop('error', 'Seller existed', 'Please login with this email...'); 
        }else{

          // toaster.pop('success', 'Seller added', 'Redirecting to update seller details ...');         
          // $timeout(redirectState, 3000);
           console.log('signup success ' + response.data);
           $state.transitionTo($state.current, $stateParams, {
              reload: true,
              inherit: false,
              notify: true
           });
        }
      });         
  };


  $scope.logout = function(){
    $http.get('../api/slim.php/auth/logout/user').
      success(function() {
        $rootScope.isLoggedIn = false;
        console.log('logout called');
        LoginService.logout(); 
        $state.go('app.home', {}, {reload: true});

      });
    };

}]);
