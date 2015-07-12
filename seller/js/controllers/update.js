'use strict';

/* Controllers */

  // Form controller
app.controller('FormDemoCtrl', ['$scope','$http','toaster','$stateParams', function($scope,$http,toaster,$stateParams) {
    var id = $stateParams.tenant_id;
  
   $http.get('api/shiningfloor.php/sellers/'+id).then(function (resp) {

  $scope.tenant = resp.data.aaData;
  console.log($scope.tenant);
  
});
 
 

  }]);
 