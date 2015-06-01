app.controller('searchPageCtrl', ['$scope', '$http','$stateParams', 'ngCart', '$filter', function($scope, $http, $stateParams, ngCart, $filter) {
     
      $scope.windowHeight = window.innerHeight;
      $scope.windowWidth = $(window).width();
      $scope.contentHeight = $scope.windowHeight - $('#header').height();
      $scope.contentWidth = $('#content').width();
      console.log($scope.contentHeight);

    console.log('type = '+ $stateParams.routeId + 'query = '+  $stateParams.query);
//    if($stateParams.query === '') console.log('empty');
    $scope.rId = $stateParams.routeId ;
  $http.get('data/productPage_data.json').then(function (resp) {

     $scope.productPage_data = resp.data.productPage_data;
     $scope.indx = -1; 
  //   console.log('adada');
     console.log($stateParams.routeId);

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

   // console.log($scope.productPage_data[1].routeId) ;
  // console.log($scope.productPage_data[0]);
   $scope.mainTagline = $scope.productPage_data[$scope.indx].product_data.mainTagline;
   $scope.subtitle = $scope.productPage_data[$scope.indx].product_data.subTitle;

// console.log($state.current.name);

  
    
  });

$scope.searchQuery = {
        text: '',
        word: /^\s*\w*\s*$/
      };

if($stateParams.query === '' & $scope.searchQuery.text ===''){
 
  $http.get('api/slim.php/shiningfloor/products/'+ $stateParams.routeId).then(function (resp) {
          
          $scope.searchResults = resp.data.product_data;
          $scope.sortBy ='-product_price';
      });

}
else{

    $http.get('api/slim.php/shiningfloor/products/'+ $stateParams.routeId+'/search/'+$stateParams.query).then(function (resp) {
       $scope.searchResults = resp.data.product_data;
         console.log('search data ' + resp.data);
       // $('#search-items').addClass('hidden');
       // $scope.searchQuery.text = '';   
  });
}

$scope.showSuggestions = function(){

  $('#search-items').removeClass('hidden');
  if($scope.searchQuery.text=='')
        $('#search-items').addClass('hidden');
 };




$scope.test = function(){

console.log('clicked');

 };

  $( document ).ready(function() {
      $(".counter").html (ngCart.getTotalItems()) ;

});



}]);

app.controller('productSearchCtrl', ['$scope', '$http','$stateParams', '$filter', function($scope, $http, $stateParams,$filter) {

  $http.get('data/tyle_filter.json').then(function (resp) {

    $scope.categories = resp.data.categories;
    console.log('productSearchCtrl');
   // console.log($scope.categories[0].details.type);

  });
  
  // function fetchProductInfo(){
  //     console.log('fetching each product info ');
  //   //   $http.get('api/slim.php/shiningfloor/products/'+ $stateParams.routeId)+'/'+ product_id.then(function (resp) {
  //   //   $scope.searchResults = resp.data.product_data;
  //   //      console.log($scope.searchResults);
  //   // });  
  // }

}]);

app.controller('searchCtrl', ['$scope', '$http','$stateParams', '$filter', function($scope, $http, $stateParams,$filter) {
    $scope.currentpage = $stateParams.routeId;
}]);


