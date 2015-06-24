app.controller('houseCtrl', ['$scope', '$http','$stateParams', function($scope, $http, $stateParams) {
    
 $http.get('api/shiningfloor.php/sellers').
  success(function(data, status, headers, config) {
    $scope.seller = data.aaData;
    console.log("data loaded");
  }).
  error(function(data, status, headers, config) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  });
    
   
}]);