'use strict';

/* Controllers */

  // Form controller
app.controller('updateownersCtrl', ['$scope','$http','toaster','$stateParams', function($scope,$http,toaster,$stateParams) {
    var id = $stateParams.owner_id;
  
   $http.get('api/shiningfloor.php/owners/'+id).then(function (resp) {

  var temp = resp.data.aaData[0];
  console.log(temp);
  $scope.owner = {
  id : temp['id'],
  name : temp['name'],
  address: temp['address'],
  phone: temp['phone'],
   email: temp['email']
  


  }
 
  console.log($scope.owner);
  
});
 
 $scope.update = function(owner){
  $http.put('api/shiningfloor.php/updateowners/'+owner.id,owner).
        success(function(data, status) {
            toaster.pop('success','Update Owner', 'Successfully updated Owner');
          $scope.status = status;
          $scope.data = data;
          console.log($scope.data);
        }).
        error(function(data, status) {
          $scope.data = data || "Request failed";
          $scope.status = status;
      });



 }

  }]);
 