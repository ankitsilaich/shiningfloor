
app.controller('productPageCtrl', ['$scope', '$http','$stateParams', '$filter', function($scope, $http, $stateParams,$filter) {
  $http.get('js/controllers/productPage_data.json').then(function (resp) {

     $scope.productPage_data = resp.data.productPage_data;
     $scope.indx = -1; 
     console.log($scope.productPage_data);

  if($stateParams.routeId == 'tiles'){
    $scope.indx = 0; 
  }

  if($stateParams.routeId == 'marble'){
    $scope.indx = 1; 
  }
  if($stateParams.routeId == 'wood'){
    $scope.indx = 2; 
  }
  if($stateParams.routeId == 'wallpaper'){
    $scope.indx = 3; 
  }
  if($stateParams.routeId == 'stone'){
    $scope.indx = 4; 
  }
  if($stateParams.routeId == 'artificial'){
    $scope.indx = 5; 
  }

    console.log($scope.productPage_data[1].routeId) ;
  // console.log($scope.productPage_data[0]);
   $scope.mainTagline = $scope.productPage_data[$scope.indx].product_data.mainTagline;
   $scope.subtitle = $scope.productPage_data[$scope.indx].product_data.subTitle;

// console.log($state.current.name);


  $scope.isRecentProductSection = function() {
    
    if ($scope.productPage_data[$scope.indx].product_data.recentProductSection  == "true")
      return true;
    else 
      return false;
    
  };
  $scope.isTestimonialSection = function() {
    
    if ($scope.productPage_data[$scope.indx].product_data.TestimonialSection  == "true")
      return true;
    else 
      return false;
    
  };

  });

 

}]);



// app.controller('productPageCtrl', ['$scope', '$http','$stateParams', '$filter', function($scope, $http, $stateParams,$filter) {
//   $http.get('js/controllers/productPage_data.json').then(function (resp) {

//      $scope.productPage_data = resp.data.productPage_data;
//      $scope.indx = -1; 
//      console.log("sahil s");

//   });

//   if($stateParams.routeId == 'tiles'){
//     $scope.indx = 0; 
//   }

//   if($stateParams.routeId == 'marble'){
//     $scope.indx = 1; 
//   }
//   if($stateParams.routeId == 'wood'){
//     $scope.indx = 2; 
//   }
//   if($stateParams.routeId == 'wallpaper'){
//     $scope.indx = 3; 
//   }
//   if($stateParams.routeId == 'stone'){
//     $scope.indx = 4; 
//   }
//   if($stateParams.routeId == 'artificial'){
//     $scope.indx = 5; 
//   }

//   // console.log($scope.productPage_data) ;
//   // console.log($scope.productPage_data[$scope.indx]);
//   $scope.mainTagline = $scope.productPage_data[$scope.indx].product_data.mainTagline;
//   $scope.subtitle = $scope.productPage_data[$scope.indx].product_data.subTitle;

// // console.log($state.current.name);


// }]);


