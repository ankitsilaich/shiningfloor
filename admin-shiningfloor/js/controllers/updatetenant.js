'use strict';

/* Controllers */

  // Form controller
app.controller('FormDemoCtrl', ['$scope','$http','toaster','$stateParams', function($scope,$http,toaster,$stateParams) {
    var id = $stateParams.seller_id;
  
   $http.get('api/shiningfloor.php/sellers/'+id).then(function (resp) {

  $scope.seller = resp.data.aaData;
  $scope.ds = $scope.tenant.entry_date;
  console.log($scope.tenant);
  
});
 
 $scope.update = function(seller){

  $http.put('api/shiningfloor.php/updatetenants/'+seller.id,seller).
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

console.log(tenant);

 }

  }]);
 