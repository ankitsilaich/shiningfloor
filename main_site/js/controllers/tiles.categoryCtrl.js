app.controller('categoryCtrl', ['$scope', '$http', '$filter', function($scope, $http, $filter) {
  $http.get('data/tyle_filter.json').then(function (resp) {

    $scope.categories = resp.data.categories;
       // console.log($scope.categories);

   // console.log($scope.categories[0].details.type);

  });

  // $http.get('js/controllers/productPage_data.json').then(function (resp) {

  //    $scope.productPage_data = resp.data.productPage_data;
  //    $scope.indx = -1; 
  //    console.log($scope.productPage_data);

  // });
  
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



