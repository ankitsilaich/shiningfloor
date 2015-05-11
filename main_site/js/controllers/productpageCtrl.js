
app.controller('productPageCtrl', ['$scope', '$http','$stateParams', '$filter', function($scope, $http, $stateParams,$filter) {
  $http.get('data/productPage_data.json').then(function (resp) {

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

app.controller('pageCtrl', ['$scope', '$http','$stateParams', '$filter', function($scope, $http, $stateParams,$filter) {
    $scope.currentpage = $stateParams.routeId;


    // $scope.currentpage.selected = true;
    

}]);



app.controller('categoryCtrl', ['$scope', '$http', '$filter', function($scope, $http, $filter) {
  $http.get('data/tyle_filter.json').then(function (resp) {

    $scope.categories = resp.data.categories;
       // console.log($scope.categories);

   // console.log($scope.categories[0].details.type);

  });

  $scope.budgets = [ 0 , 1 , 2 , 3, 4, 5];


 
  $scope.dropdownHandle= function(){
    $('#dropdowndisplay').toggleClass('customClass');
   console.log('sfsfs');
  };

  

  $scope.selectProduct = function(product){ 
    angular.forEach($scope.products, function(product_no) {
      product_no.selected = false;

    });
    $scope.product_no = product;
    $scope.product_no.selected = true;

    $scope.selectedProduct = $scope.product_no.product_name;

    $scope.locations =  $scope.product_no.locations;
      $scope.location_no = $scope.locations[0];
      $scope.selectedLocation = $scope.locations[0].location;
       console.log($scope.selectedLocation);
      $scope.location_no.selected = true;
    


  };

  $scope.selectLocation = function(location){ 

    angular.forEach($scope.locations, function(location_no) {
      location_no.selected = false;

    });
    $scope.location_no = location;
    $scope.location_no.selected = true;

    $scope.selectedLocation= $scope.location_no.location;

  };


 

}]);



// app.controller('ScrollCtrl', ['$scope', '$http', '$filter', function($scope, $http, $filter) {
//     $scope.scrollToProducts = function(){
//        console.log('csada');
//       $('html, body').animate({
//         scrollTop: $("#ourProducts").offset().top -65
//       }, 2000);
//     console.log("working");
//   };


// }]);



