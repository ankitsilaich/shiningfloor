'use strict';

/* Controllers */

  // Form controller
app.controller('FormCtrl', ['$scope','$http','toaster','$stateParams', function($scope,$http,toaster,$stateParams) {
    var id = $stateParams.house_id;
  
   $http.get('api/shiningfloor.php/houses/'+id).then(function (resp) {

  var temp = resp.data.aaData;
  console.log(temp);
  $scope.house = {
  id : temp['house_id'],
  name : temp['house_name'],
  address: temp['house_address'],
  totalrooms: temp['house_no_of_rooms'],
  rent : temp['house_rent'],
  dthbill : temp['house_dthbill'],
  powerbill: temp['house_powerbill'],
  totaldeposit : temp['house_totaldeposit'],
  depositleft : temp['house_totaldepositleft'],
  wifibill : temp['house_wifibill'],
  dthdate : temp['house_dthbilldate'],
  powerdate : temp['house_powerbilldate'],
  wifidate : temp['house_wifibilldate'],
  entrydate : temp['house_entry_date']


  }
 
  console.log($scope.house);
  
});
 
 $scope.update = function(house){
  $http.put('api/shiningfloor.php/updatehouses/'+house.id,house).
        success(function(data, status) {
            toaster.pop('success','Update House', 'Successfully updated House');
          $scope.status = status;
          $scope.data = data;
          console.log($scope.data);
        }).
        error(function(data, status) {
          $scope.data = data || "Request failed";
          $scope.status = status;
      });

console.log(house);

 }

  }]);
 