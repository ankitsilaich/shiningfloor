app.controller('selectedCtrl', ['$scope', '$http','$stateParams','$q','$state','$log', function($scope, $http, $stateParams,$q,$state,$log) {
   $scope.bigCurrentPage = 1;
var deferredAbort = $q.defer();
var id = $stateParams.seller_id;
    $http.get('api/shiningfloor.php/selectedproducts/'+id+'?page='+$scope.bigCurrentPage,{timeout : deferredAbort.promise}).
  then(function(response) {
    $scope.product = response.data.aaData.data;
    $scope.bigTotalItems = response.data.aaData.totalresults ;
    angular.forEach($scope.product, function(item) {
    
    // then we set the value for each item
    if (item.product_id < 484) {
    	var old = item.product_image;
    	console.log(old);
      item.product_image = 'http://www.kajariaceramics.com'+ old;
    } 

  });
    console.log(response);
  });
     $scope.totalItems = 64;
    

    $scope.setPage = function (pageNo) {
    	console.log("dasda");
      $scope.currentPage = pageNo;
    };

    $scope.pageChanged = function() {
    	$http.get('api/shiningfloor.php/selectedproducts/'+id+'?page='+$scope.bigCurrentPage,{timeout : deferredAbort.promise}).
  then(function(response) {
    $scope.product = response.data.aaData.data;
    $scope.bigTotalItems = response.data.aaData.totalresults ;
    angular.forEach($scope.product, function(item) {
    
    // then we set the value for each item
    if (item.product_id < 484) {
    	var old = item.product_image;
      item.product_image = 'http://www.kajariaceramics.com'+old;
    } 

  });
    
    console.log(response);
  });
      $log.info('Page changed to: ' + $scope.bigCurrentPage);
    };

    $scope.maxSize = 10;
   
    
   
 
}]);