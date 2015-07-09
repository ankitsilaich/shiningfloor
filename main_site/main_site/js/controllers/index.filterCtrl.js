app.controller('templateCtrl', ['$scope', '$http', '$filter','$location', function($scope, $http, $filter,$location) {
  $scope.sliderOptions = {
  autoPlay: true,
  center: true,
  items : 5,
  itemsDesktop : [1000,5],
  itemsDesktopSmall : [900,3],
  itemsTablet: [600,2],
  itemsMobile : [600,1],
  pagination:false,
  navigation:true,
  navigationText:["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"]
  };

  $scope.product_categories = [{name: 'Any',current:false},{name: 'Tiles',current:true,url:'tiles'},{name: 'Marbles',current:false,url:'marble'},{name: 'Woods',current:false,url:'wood'},{name: 'Stones',current:false},{name: 'Wallpapers',current:false},{name: 'Artificial',current:false}]
  $scope.Brands= [{name:'Any',current:true},{name:'Kajaria',current:false,url:'kajaria'},{name:'Somany',current:false,url:'Somany'}]
  $scope.Sizes= [{name:'Any',current:false},{name:'300 * 300',current:true},{name:'600 * 600',current:false}]
    $scope.Colors= [{name:'Any',current:false},{name:'Red',current:true},{name:'Black',current:false}]
  $scope.product_name = 'Tiles';
   $scope.Brand_name = 'Any';
   $scope.Size_name = '300 * 300';
   $scope.Color_name = 'Red';
   $scope.categoryurl = 'tiles'
  $scope.selectProductCategory = function(category){
     angular.forEach($scope.product_categories, function(item) {
      item.current = false;

    });
   $scope.product_name = category.name;
   category.current = true;
 $scope.categoryurl= category.url;
  }
    $scope.selectProductBrands = function(brand){
     angular.forEach($scope.Brands, function(item) {
      item.current = false;

    });
   $scope.Brand_name = brand.name;
   brand.current = true;
   $scope.brandurl= brand.url;

  }
  $scope.selectProductSizes = function(size){
   angular.forEach($scope.Sizes, function(item) {
    item.current = false;

  });
 $scope.Size_name = size.name;
 size.current = true;

}
$scope.selectProductColors = function(color){
 angular.forEach($scope.Colors, function(item) {
  item.current = false;

});
$scope.Color_name = color.name;
color.current = true;


}
$scope.superSearch = function(){
  console.log($scope.categoryurl)
  $location.path("Buildcorner/search/"+$scope.categoryurl+"/").search({brand_name:$scope.brandurl});


}
  $http.get('data/filter.json').then(function (resp) {

    $scope.products = resp.data.products;
    $scope.product_no = $scope.products[0];
    $scope.selectedProduct = $scope.products[0].product_name;

    // console.log($scope.product_no);
       // console.log($scope.products);
    $scope.product_no.selected = true;

    $scope.locations =  $scope.product_no.locations;

    $scope.locations =  $scope.product_no.locations;

      $scope.location_no = $scope.locations[0];
      $scope.selectedLocation = $scope.locations[0].location;
      // console.log($scope.selectedLocation);
      $scope.location_no.selected = true;


  //  console.log($scope.selectedLocation);
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


app.controller('allcategoryCtrl', ['$scope', '$http', '$filter', function($scope, $http, $filter) {
    $http.get('data/allcategories.json').then(function (resp) {

    $scope.categories = resp.data.categories;
       console.log($scope.categories);});

 //   console.log($scope.categories[0].details.type);

  }]);

// app.controller('emailConfirmCtrl', ['$scope', '$http', '$filter', '$templateCache', function($scope, $http, $filter, $templateCache) {
// //     $http.post('api/slim.php/shiningfloor/email_verification', {email : 'sahil@gmail.com'}).then(function (resp) {

// //     $scope.emailResponse = resp.data.categories;
// //     console.log(resp.data);
// //  //   console.log($scope.categories[0].details.type);
// // });

//   $http({
//       method: 'POST',
//       url: 'api/slim.php/shiningfloor/email_verification',
//       data: $.param({'email' : 'sahil@gmail.com'}),
//       headers: {'Content-Type': 'application/x-www-form-urlencoded'},
//       cache: $templateCache
//     }).
//     success(function(response) {
//         $scope.codeStatus = response.data;
//     }).
//     error(function(response) {
//         $scope.codeStatus = response || "Request failed";
//     });

//   }]);


app.controller('emailConfirmCtrl', function ($scope, $http) {
/*
* This method will be called on click event of button.
* Here we will read the email and password value and call our PHP file.
*/
$scope.check_credentials = function (email) {


var request = $http({
    method: 'POST',
    url: 'api/slim.php/shiningfloor/email_verification/'+email,

    headers : {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8' }
});

/* Check whether the HTTP Request is successful or not. */
request.success(function (data) {
    console.log('email sent successfully');
    console.log(data);
});
}
});
