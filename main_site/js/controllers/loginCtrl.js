app.controller('loginController', ['$scope', '$http', '$filter', '$location', '$rootScope','LoginService', '$state',function($scope, $http, $filter, $location,$rootScope,LoginService,$state) {
  $scope.showModal = false;
  $scope.showLogin = false;
  $scope.showSignup = false;
  $scope.resetPass = false;
  $scope.loginError = "";
  $scope.signupError = "";
  $scope.currentUser = $rootScope.loggedInUser;
  $scope.currentUserDetails = $rootScope.loggedInUserDetails;
  // console.log($scope.currentUser);
  // console.log($rootScope.loggedInUserDetails);
  
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

$scope.login = function(user) {
      if(!$rootScope.isLoggedIn) {
          LoginService.login(user, $scope).then(function(){ 
              if($rootScope.isLoggedIn){
                  console.log('Login Successful');
                  
                  $scope.currentUser = $rootScope.loggedInUser;
                  $scope.currentUserDetails = $rootScope.loggedInUserDetails;
                  $scope.showModal = false;
                  $scope.showLogin = false;
                  $scope.showSignup = false;                 
                  
                  console.log($scope.currentUser);
                  console.log($rootScope.loggedInUserDetails);
  
                  // $window.location.reload();                  
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
      $scope.signupMsg = "";
      // Try to create
      $http.post('../api/slim.php/auth/signup/user', {username: user.name, email: user.email, password: user.password})
      .then(function(response) {
        if ( response.data.signup_success == 'false') {
            console.log('signup error ' + response.data);
            $scope.signupError = "Email already registered! ";
            // toaster.pop('error', 'Seller existed', 'Please login with this email...'); 
        }else{
           console.log('signup success ' + response.data);
           // $scope.currentUser = $rootScope.loggedInUser;
           // $scope.currentUserDetails = $rootScope.loggedInUserDetails;
           // console.log($scope.currentUser);
           //  console.log($scope.loggedInUserDetails);
           $("input#signup-username").val(null) ;
           $("input#signup-email").val(null);
           $("input#signup-password").val(null);
           // $scope.showModal = false;
            // $scope.showLogin = false;
            // $scope.showSignup = false;
           // $state.go($state.current, {}, {reload: true});
            // $window.location.reload();
            $http.post('../api/slim.php/shiningfloor/email_verification/'+ user.email ).then(function(response) {
            
    if(response.data.status==='success'){ 
console.log('email sent');            
              $scope.signupError = "";            
              $scope.signupMsg = "An email sent to your email-id, please verify your account! ";
              }
              
            });
            
        }
      });         
  };

  $scope.sendConfirmation= function(useremail){
  console.log(useremail);
      $http.post('../api/slim.php/user/forgotpwd/' + useremail) 
        .then(function(response) {
 
          if(response.data.status==='success'){

            $scope.forgotpwdResp = 'password reset link sent to your email address, please check your email!';
          }
          else{
            $scope.forgotpwdResp = 'email not registered!';
          }
      });
 
    };

  $scope.logout = function(){
    $http.get('../api/slim.php/auth/logout/user').
      success(function() {
        $rootScope.isLoggedIn = false;
        $rootScope.loggedInUser = "";
        $rootScope.loggedInUserDetails = "";
        $scope.currentUser = "";
        $scope.currentUserDetails = {};
        console.log('logout called');
        LoginService.logout(); 
        $scope.user={};
        $scope.newuser={};
        $scope.loginError = "";
        $scope.loginError = "";
        $scope.signupError = "";
        // console.log($scope.currentUser);
        // console.log($scope.loggedInUserDetails);
      });
    };
    // console.log($rootScope.loggedInUser);
}]);