app.controller('productPageCtrl', ['$scope', '$http','$stateParams', '$filter', function($scope, $http, $stateParams,$filter) {
 /* $http.get('js/controllers/tyle_filter.json').then(function (resp) {

    $scope.categories = resp.data.categories;
        console.log($scope.categories);

    console.log($scope.categories[0].details.type);

  });*/
  if($stateParams.routeId == 'tiles'){
  
  $scope.mainTagline ="Look at our "+$stateParams.routeId+ " Bro";
  $scope.subtitle = "Discover some unique tiles from our site";


  }
   if($stateParams.routeId == 'marble'){
  
  $scope.mainTagline ="Look at our "+$stateParams.routeId+ " Bro";
  $scope.subtitle = "Discover white marble used in TajMahal from Makrana";


  }
  $scope.mainTagline ="Look at our "+$stateParams.routeId+ " Bro";
// console.log($state.current.name);


}]);