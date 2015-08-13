'use strict';

/* Controllers */

  // Form controller
app.controller('FormDemoCtrl', ['$scope','$http','toaster','$stateParams','$state','$timeout' , function($scope,$http,toaster,$stateParams,$state,$timeout) {
    // var id = $stateParams.seller_id;
  
   $http.get('../api/slim.php/shiningfloor/seller/info').then(function (resp) {
   $scope.seller = resp.data.seller_data;
  console.log($scope.seller);
});
 
 
 $scope.update = function(seller){

  $http.put('../api/slim.php/shiningfloor/sellers/update',seller).
        success(function(data, status) {
            toaster.pop('success', 'Update Seller', 'Successfully updated Seller');
          $scope.status = status;
          $scope.data = data;
          console.log($scope.data);
          $timeout($scope.rediretToHome, 3000);
        }).
        error(function(data, status) {
          $scope.data = data || "Request failed";
          $scope.status = status;
      });
$scope.rediretToHome = function(){
      $state.go('app.seller.details');
    }
//console.log(tenant);

 }



  }]);
 