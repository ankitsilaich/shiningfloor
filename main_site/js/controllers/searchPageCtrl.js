app.controller('searchPageCtrl', ['$scope', '$http','$stateParams', 'ngCart', '$filter','$state', function($scope, $http, $stateParams, ngCart, $filter,$state) {
     
      $scope.windowHeight = window.innerHeight;
      $scope.windowWidth = $(window).width();
      $scope.contentHeight = $scope.windowHeight - $('#header').height();
      $scope.contentWidth = $('#content').width();

//    if($stateParams.query === '') console.log('empty');
      $scope.rId = $stateParams.routeId ;

  $http.get('data/productPage_data.json').then(function (resp) {

     $scope.productPage_data = resp.data.productPage_data;
     $scope.indx = -1; 
  //   console.log('adada');

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

 $http.get('api/slim.php/shiningfloor/colors').then(function (resp) {
          
          $scope.colors = resp.data.colors[0].product_colors;
          console.log($scope.colors) ;
      });

$scope.searchQuery = {
        text: '',
        word: /^\s*\w*\s*$/
      };
      // url for changing product in search page. 

if($stateParams.query === '' && $scope.searchQuery.text ===''){
 
  $http.get('api/slim.php/shiningfloor/products/'+ $stateParams.routeId).then(function (resp) {
          console.log('first time result with no query');
          $scope.searchResults = resp.data.product_data;
          $scope.sortBy ='-product_price';
      });

}
else{

    $http.get('api/slim.php/shiningfloor/products/'+'search/'+ $stateParams.routeId + '/'+ $stateParams.query).then(function (resp) {
       $scope.searchResults = resp.data.product_data;
       console.log(' result with some query = '+ $stateParams.query); 
       // $('#search-items').addClass('hidden');
       // $scope.searchQuery.text = '';   
  });
}
$scope.pageSearchData = function(pageNo){
        
       $addQuery = '/'+$stateParams.query+'?pageNo='+pageNo ;
       $http.get('api/slim.php/shiningfloor/products/'+'search/'+ $stateParams.routeId + $addQuery).then(function (resp) {
             $scope.searchResults = resp.data.product_data;
               
           });
};

$scope.url = $stateParams.query;
$scope.applyPriceFilter =  function(filter){
    $scope.priceRange = '&'+filter;
    console.log('1st url = '+$scope.url);
    if(typeof $scope.url === 'undefined')
      $scope.url = '?pageNo=1' ;
    else{
      if($scope.url.indexOf('price_range')==-1 && $scope.url.indexOf('pageNo')==-1)
        $scope.url = '?pageNo=1'  + $scope.url ;
        console.log('cond1 true');
    }   

    if($scope.url.indexOf('price_range')==-1){    
      $scope.url += $scope.priceRange;
    }  
    else if($scope.url.indexOf('price_range')!=-1){
      
      index1 = $scope.url.indexOf('price_range');

      if($scope.url.substring(index1).indexOf('&')==-1){
         // index2 = index1 + $scope.url.substring(index1).indexOf('');
         
        $scope.url = $scope.url.replace($scope.url.substring(index1,$scope.url.length),filter);
        console.log('cond2 true');
        }
      else{  
        index2 = index1 + $scope.url.substring(index1).indexOf('&');
         
        $scope.url = $scope.url.replace($scope.url.substring(index1,index2),filter);
        console.log('cond3 true');
      }          
    }

    console.log('url = '+ $scope.url); 
};

// $http.get('api/slim.php/shiningfloor/products/'+'search/'+ $stateParams.routeId+ '/'+$stateParams.query+$scope.url).then(function (resp) {       
//          // $scope.searchResults = resp.data.product_data;
//          console.log(resp.data);
//   });

$scope.applyColorFilter =  function(filter){
  // event.preventDefault();
  //   $('#colorId3').attr('src', 'images/colors/color-8.png');
  //   console.log($('#colorId3').attr('src'));
     $scope.colorName = '&'+filter;
    console.log('1st url = '+$scope.url);
    if(typeof $scope.url === 'undefined')
      $scope.url = '?pageNo=1' ;
    else{
      if($scope.url.indexOf('color')==-1 && $scope.url.indexOf('pageNo')==-1)
        $scope.url = '?pageNo=1'  + $scope.url ;

    }  
         
    if($scope.url.indexOf('color')==-1){    
      $scope.url += $scope.colorName;
      console.log('cond1 true');
    }  
    else if($scope.url.indexOf('color')!=-1){
      
      index1 = $scope.url.indexOf('color');

      if($scope.url.substring(index1).indexOf('&')==-1){
         // index2 = index1 + $scope.url.substring(index1).indexOf('');
         // console.log($scope.url.replace($scope.url.substring(index1,$scope.url.length),filter));

        $scope.url = $scope.url.replace($scope.url.substring(index1,$scope.url.length),filter);
        // $scope.url = $scope.url.substring(0,l)+ ','+ filter.substring(filter.indexOf('=')+1,filter.length);
        
        console.log('cond2 true');
        }
      else{  

         // console.log($scope.url.replace($scope.url.substring(index1,index2),filter));
        


        index2 = index1 + $scope.url.substring(index1).indexOf('&');
         // console.log($scope.url.replace($scope.url.substring(index1,index2),filter));
          var color =  $scope.url.substring(index1,index2);
          var l = $scope.url.length;
         // $scope.url = $scope.url.substring(0,index2)+ ','+ filter.substring(filter.indexOf('=')+1,filter.length)+ $scope.url.substring(index2,l);
        // $scope.url = $scope.url.replace(color,filter);
         $scope.url = $scope.url.replace($scope.url.substring(index1,index2),filter);
        // console.log('cond3 true ' + $scope.url.substring(0,index2) + ' '+filter.substring(filter.indexOf('=')+1,filter.length));
      }          
    }
    // $state.go('app.search.type({routeId:$scope.rId,  query: $scope.url })');
  //  $state.go('app.search.type',{routeId:$scope.rId,  query: $scope.url });
    
    console.log('url = '+ $scope.url);



};

$scope.showLeftSideFilters = function(){
    console.log(event);
    console.log("sdsdsa");
   
if($('#leftSide').hasClass('expanded')){
   $("#leftSide").removeClass("expanded");
   $("#leftSide").addClass("hidden");
   $(".logo").removeClass("expanded");
}
else{
  if($('#leftSide').hasClass('hidden'))
       $("#leftSide").removeClass("hidden");


   $("#leftSide").addClass("expanded");
   $(".logo").addClass("expanded");

}
       
};

$scope.handleColors = function(){
   
  if($("#colors").hasClass("hidden"))
      $("#colors").removeClass("hidden");
    else
          $("#colors").addClass("hidden");
             
};
$scope.handlePrices = function(){
   
  if($("#prices").hasClass("hidden"))
      $("#prices").removeClass("hidden");
    else
          $("#prices").addClass("hidden");
             
};

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


