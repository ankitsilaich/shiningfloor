app.controller('loginController', ['$scope', '$http', '$filter', '$location', function($scope, $http, $filter, $location) {
  $scope.showModal = false;
  $scope.showLogin = false;
  $scope.showSignup = false;
  $scope.resetPass = false;
  $scope.signup = function() {

    $scope.showModal = true;
    $scope.showSignup = true;
    $scope.showLogin = false;
    $scope.signupTab = true;
    $scope.loginTab = false;
    $scope.resetPass = false;
  };
  $scope.login = function() {
    $scope.showModal = true;
    $scope.showSignup = false;
    $scope.showLogin = true;
    $scope.loginTab = true;
    $scope.signupTab = false;
    $scope.resetPass = false;

  }
  $scope.close = function(event) {
    alert("ESC")
    if (event.keyCode == 27) {
      alert("ESC")
    }

  }
  $scope.resetPassword = function() {
    $scope.showSignup = false;
    $scope.showLogin = false;
    $scope.resetPass = true;
  }
}]);
