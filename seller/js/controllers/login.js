app.controller('loginCtrl', ['$scope','$state', '$http','$stateParams', function($scope,$state, $http, $stateParams) {

   $scope.checklogin = function(password){
   	var data = {email:'admin@shiningfloor.com',
   	password: password}
    
   	$http.post('api/shiningfloor.php/auth/process/admin',data).then(function (resp) {
console.log(resp.data.login_success)
  if(resp.data.login_success=='true'){
     $state.go("app.all.houses");
    

  }
  



   });
   



   };
    
   
   
 
}]);