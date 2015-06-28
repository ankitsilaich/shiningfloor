'use strict';

/* Controllers */

  // Form controller
app.controller('FormDemoCtrl', ['$scope','$http','toaster','$stateParams', function($scope,$http,toaster,$stateParams) {
    // var id = $stateParams.seller_id;
  
   $http.get('../main_site/api/slim.php/shiningfloor/seller/info').then(function (resp) {
   $scope.seller = resp.data.seller_data;
  console.log($scope.seller);
});
 
 $scope.update = function(seller){

  $http.put('../main_site/api/slim.php/shiningfloor/sellers/update',seller).
        success(function(data, status) {
            toaster.pop('success', 'Update Seller', 'Successfully updated Seller');
          $scope.status = status;
          $scope.data = data;
          console.log($scope.data);
        }).
        error(function(data, status) {
          $scope.data = data || "Request failed";
          $scope.status = status;
      });

//console.log(tenant);

 }

  }]);
 