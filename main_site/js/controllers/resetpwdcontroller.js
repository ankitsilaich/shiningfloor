app.controller('resetpwdCtrl', ['$scope', '$http', '$filter', '$location', '$state','$stateParams','$timeout',function($scope, $http, $filter, $location,$state,$stateParams,$timeout) {

$scope.resetpwdError = "";
$filters = $location.search();
 
$scope.emailId =  $stateParams.email ;
console.log($scope.emailId);
if(!($state.params.email&&$state.params.token))
  $state.go('app.home');
else{

  function redirectToHome() {
      $state.go('app.home');
  }
  $scope.successmsg = '';
  $scope.failuremsg = '';
              $scope.resetpwd = function(){ 
        if($scope.resetpwdForm.$invalid){
        // console.log('form invalid');
          if($scope.resetpwdForm.password.$required)
            $scope.resetpwdError = 'password is required';
          else
            $scope.resetpwdError='password length must be atleast 7';
        }
        else{
        $scope.resetpwdError = "";
         $http.post('../api/slim.php/user/resetpwd', {email: $state.params.email,token: $state.params.token,pwd: $scope.resetaccount.password})     .then(function(response) {
          if(response.data.status=='success'){
            $scope.successmsg = 'pwd changed, please login with new password.';
            $scope.failuremsg = '';
             $timeout(redirectToHome, 3000);
          }
          else{
            $scope.successmsg = '';
            $scope.failuremsg = 'email not registred or url is outdated';
            $timeout(redirectToHome, 3000);
          }
        });
        }
      };
     

}

 
}]);