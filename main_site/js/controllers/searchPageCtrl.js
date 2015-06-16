app.controller('searchPageCtrl', ['$scope', '$http','$stateParams', 'ngCart', '$filter','$state','$location', function($scope, $http, $stateParams, ngCart, $filter,$state,$location) {
     
      $scope.windowHeight = window.innerHeight;
      $scope.windowWidth = $(window).width();
      $scope.contentHeight = $scope.windowHeight - $('#header').height();
      $scope.contentWidth = $('#content').width();
      $scope.rId = $stateParams.routeId ;
      $scope.sortTypeLable = ['Price (high to low)','Price (low to high)','Rating (high to low)','Rating (low to high)'];
      $scope.selectedSortType = $scope.sortTypeLable[0];      
      $scope.priceFilters = ['below-100','100-200','200-above'];
      $scope.priceFiltersLabels = ['Below 100','100-200','Above 200'];
      $scope.searchCategory = 'All products';
// $scope.brandFilters = ['Makrana','Somany','M K Wood','Satyam Exports','Johnson'];
$scope.brandFilters= ['Makrana','Somany','M K Wood','Satyam Exports','Johnson'];

 $http.get('api/slim.php/shiningfloor/colors').then(function (resp) {
      // console.log(resp.data);          
          $scope.colors = resp.data.colors[0].product_colors; 
          $scope.totalColorsCount = $scope.colors.length;
           
    $scope.setInitialParameters =  function(urlString, filterName){

          if(typeof urlString != 'undefined'){
         
              if( urlString.indexOf(filterName)!=-1){
                var index1 =  urlString.indexOf(filterName);
                var l = urlString.length;
                if(urlString.substring(index1).indexOf('&')==-1)
                     var index2 = urlString.length;
                else
                    var index2 = index1 +  urlString.substring(index1).indexOf('&');
                var tmp = urlString.substring(index1,l).indexOf('=')+1; 
                var oldFilters = urlString.substring(index1+tmp,index2).split(',');
                
                // console.log(oldColorFilters);

                var len = oldFilters.length;
                var i ,j; 
                if(filterName=='color'){
                   
                  $scope.selectedColors = [];
                  for(j=0;j<$scope.totalColorsCount;j++)
                  {
                    $scope.selectedColors[j] =  false;
                  } 
                  for(i=0;i<len;i++){
                    for(j=0;j<$scope.totalColorsCount;j++)
                    {
                      
                      if($scope.colors[j]==oldFilters[i]){
                         
                        $scope.selectedColors[j] =  true;
                        break;
                      }

                    }                  
                  }

                }
                else if(filterName == 'price_range'){                
                  $scope.selectedPrices = [];
                  for(j=0;j<3;j++)
                  {
                    $scope.selectedPrices[j] =  false;
                  }

                  for(i=0;i<len;i++){
                      for(j=0;j<3;j++)
                      {
                         
                         if($scope.priceFilters[j]== oldFilters[i]){                            
                            $scope.selectedPrices[j] =  true;
                            break; 
                         }                     
                      }                  
                  }
                }
                else if(filterName=='brand_name'){
                   
                  $scope.selectedBrands = [];
                  $scope.totalBrandsCount = $scope.brandFilters.length;
                  for(j=0;j<$scope.totalBrandsCount;j++)
                  {
                    $scope.selectedBrands[j] =  false;
                  }
                   
                  for(i=0;i<len;i++){
                    for(j=0;j<$scope.totalBrandsCount;j++)
                    {
                      
                      if($scope.brandFilters[j]==oldFilters[i]){
                         
                        $scope.selectedBrands[j] =  true;
                        break;
                      }

                    }                  
                  }

                }                                   
              }
          }
      };
      
      $scope.setInitialParameters($scope.url,'color');
      $scope.setInitialParameters($scope.url,'price_range');
      $scope.setInitialParameters($scope.url,'brand_name');
      $scope.pageNo = $scope.findpageNo();
      console.log($scope.pageNo);
      if($scope.pageNo != 1){
          $scope.url = $scope.url.replace('pageNo='+$scope.pageNo , 'pageNo=1');        
          $location.path('shiningFloor/search/'+ $stateParams.routeId +'/' + $scope.url);
      }
      $('#PrevPage').addClass("disabled");  
             
       

      if($stateParams.query === '' && $scope.searchQuery.text ===''){
          
          $location.path('shiningFloor/search/'+ $stateParams.routeId +'/' + '?pageNo=1');
          $scope.url = '?pageNo=1';
          $http.get('api/slim.php/shiningfloor/products/'+'search/'+ $stateParams.routeId + '/'  + '?pageNo=1').then(function (resp) {
           
                  $scope.searchResults = resp.data.product_data;
                   
                  $scope.sortBy ='product_price';
              });

        }
        else{

            $http.get('api/slim.php/shiningfloor/products/'+'search/'+ $stateParams.routeId + '/'+ $scope.url ).then(function (resp) {
                $scope.searchResults = resp.data.product_data; 
                 
                  $scope.sortBy ='product_price';

                  if($scope.searchResults.length!= 20){
             
                      if(!$('#NextPage').hasClass('disabled')){
                                $('#NextPage').addClass("disabled");                              
                            }                   
                  }
                  else{
                    if($('#NextPage').hasClass('disabled')){
                      $('#NextPage').removeClass("disabled");
                    }
                  }
                 // $('#search-items').addClass('hidden');
               // $scope.searchQuery.text = '';   
          });
        }

      });

$scope.searchQuery = {
        text: '',
        word: /^\s*\w*\s*$/
      };
      // url for changing product in search page. 


$scope.findpageNo = function(){
       
        var i = $scope.url.indexOf('pageNo=');
        var pageNo = 1;
        if(i!=-1)
        {
                   
          var  l =  $scope.url.length;
          var tmp1 = $scope.url.substring(i,l);       
          var tmpIndex1 =  tmp1.indexOf('=') ;
          var tmp2 = tmp1.substring(tmpIndex1,l);
          var tmpIndex2 =  tmp2.indexOf('&') ;
          
          //console.log(tmp1 +' ' + tmpIndex1 + ' '+ tmp2 +' ' + tmpIndex2);         
    
           if(tmpIndex2 ==-1)
               pageNo =  tmp2.substring(1,tmp2.length);
          else
              pageNo = tmp2.substring(1,tmpIndex2);
        }        
        return pageNo; 
};

$scope.fetchNextPageData = function(){

  console.log($scope.url);

    if($stateParams.query.indexOf('?')==0){
      query = '';
    }
    else{
      query = $stateParams.query.replace(0,$stateParams.query.indexOf('?'));
    }
    $scope.pageNo = $scope.findpageNo();
             
        if($('#PrevPage').hasClass('disabled'))            
            $('#PrevPage').removeClass("disabled");                     
    
    $scope.url = $scope.url.replace('pageNo='+$scope.pageNo , 'pageNo='+(Number($scope.pageNo)+1));
  //  console.log($scope.pageNo);
    console.log($scope.url);
    $location.path('shiningFloor/search/'+ $stateParams.routeId +'/' +  $scope.url);
    
     
    $http.get('api/slim.php/shiningfloor/products/'+'search/'+ $stateParams.routeId+ '/' + $scope.url ).then(function (resp) {       
        $scope.searchResults = resp.data.product_data;
 
        if($scope.searchResults.length!= 20){
             
            if(!$('#NextPage').hasClass('disabled')){
                      $('#NextPage').addClass("disabled");                              
                  }                   
        }
        else{
          if($('#NextPage').hasClass('disabled')){
            $('#NextPage').removeClass("disabled");
          }
        }

  });

}

$scope.fetchPrevPageData = function(){

    $scope.pageNo = $scope.findpageNo();
    console.log($scope.pageNo);
    if($('#NextPage').hasClass('disabled')){
      console.log('disabled');
        $('#NextPage').removeClass("disabled");                              
    }

          $scope.url = $scope.url.replace('pageNo='+$scope.pageNo , 'pageNo='+(Number($scope.pageNo)-1));
        //  console.log($scope.pageNo);
          $location.path('shiningFloor/search/'+ $stateParams.routeId +'/' + $scope.url);
          $http.get('api/slim.php/shiningfloor/products/'+'search/'+ $stateParams.routeId+ '/' + $scope.url).then(function (resp) {       
              $scope.searchResults = resp.data.product_data;
              
              $scope.pageNo = $scope.findpageNo();
              if($scope.pageNo == 1){
                
                  if(!$('#PrevPage').hasClass('disabled')){
                           $('#PrevPage').addClass("disabled");                              
                        }                                          
              }
              else{
                if($('#NextPage').hasClass('disabled')){
                           $('#NextPage').removeClass("disabled");                              
                        }   
              }
        });            
    
}

$scope.url = $stateParams.query;
//console.log($scope.url); 
$scope.selectSearchCategory = function(searchType){
    if(searchType == 'all')
      $scope.searchCategory = 'All Products' ;
    else if(searchType == 'tiles')
      $scope.searchCategory = 'Tiles' ;
    else if(searchType == 'marble')
      $scope.searchCategory = 'Marbles' ;
    else if(searchType == 'wood')
      $scope.searchCategory = 'Woods' ;
    else if(searchType == 'artificial')
      $scope.searchCategory = 'Artificials' ;
    else if(searchType == 'stone')
      $scope.searchCategory = 'Stones' ;
    else if(searchType == 'wallpaper')
      $scope.searchCategory = 'Wallpapers' ;
};

$scope.searchProductResults = function(query , searchType){

    $stateParams.routeId = searchType ;
    queryStr= $scope.url.substring(0,$scope.url.indexOf('?')) ;
    // console.log(queryStr);
    $scope.selectSearchCategory(searchType);     
    $scope.url = $scope.url.replace(queryStr, query);
     
    $location.path('shiningFloor/search/'+ searchType +'/'  +$scope.url);
    $http.get('api/slim.php/shiningfloor/products/'+'search/'+ $stateParams.routeId+ '/' + $scope.url).then(function (resp) {       
        $scope.searchResults = resp.data.product_data;

        if($scope.searchResults.length!= 20){

          if(!$('#NextPage').hasClass('disabled')){
                   $('#NextPage').addClass("disabled");                              
                }            
        }
        else{
          if($('#NextPage').hasClass('disabled')){
                   $('#NextPage').removeClass("disabled");                              
                }  
        }

    });

    $scope.searchQuery.text = '';

}; 
$scope.applySelectedFilter =  function(filter, filterIndex, filterType){    // filterType for type of filter like color, brand or price. 

    $scope.filterUrl = '&'+filter;
    $scope.filterName = filter.substring(filter.indexOf('=')+1, filter.length);
    
        if(typeof $scope.url === 'undefined')
          $scope.url = '?pageNo=1' ;              // For first time landing on the page
        else{
          if($scope.url.indexOf(filterType)==-1 && $scope.url.indexOf('pageNo')==-1)
            $scope.url = '?pageNo=1'  + $scope.url ;      // For first time click with no other filter present
        }  

        $scope.pageNo = $scope.findpageNo();
        $scope.url = $scope.url.replace('pageNo='+$scope.pageNo , 'pageNo=1');
        if(!$('#PrevPage').hasClass('disabled')){
            $('#PrevPage').addClass("disabled");                              
        }

        if($scope.url.indexOf(filterType)==-1){    // check whether filter is price or color or price 
          $scope.url += $scope.filterUrl;           
        }  
        else if($scope.url.indexOf(filterType)!=-1){
          
          index1 = $scope.url.indexOf(filterType);
          var index2  = $scope.url.length ;
          var l = $scope.url.length ; 
            // If color is the last filter
          if($scope.url.substring(index1).indexOf('&')==-1){              
                $scope.url = updateUrl($scope.url,index1,index2,l,1,filterType)  ;                              
          }    
            // Other wise  
          else{ 
            index2 = index1 + $scope.url.substring(index1).indexOf('&');
            $scope.url = updateUrl($scope.url,index1,index2,l,0,filterType) ;
          }          
        }

        if(filterType=='color'){     
          if($('#colorId'+filterIndex).hasClass('color-selected')){
             $('#colorId'+filterIndex).removeClass("color-selected");                              
          }
          else
           $('#colorId'+filterIndex).addClass("color-selected"); 
        }
        else if(filterType=='price_range'){
                if($('#price'+filterIndex).hasClass('price-selected')){
                   $('#price'+filterIndex).removeClass("price-selected");                              
                }
                else
                   $('#price'+filterIndex).addClass("price-selected");
        }
        else if(filterType=='brand_name'){
                if($('#brand'+filterIndex).hasClass('brand-selected')){
                   $('#brand'+filterIndex).removeClass("brand-selected");                              
                }
                else
                   $('#brand'+filterIndex).addClass("brand-selected");
        }

    //'/shiningFloor/search/tiles/'
    $location.path('shiningFloor/search/'+ $stateParams.routeId +'/' + $scope.url);
    $http.get('api/slim.php/shiningfloor/products/'+'search/'+ $stateParams.routeId+ '/'+$scope.url).then(function (resp) {       
         $scope.searchResults = resp.data.product_data;
          
         if($scope.searchResults.length!= 20){

            if(!$('#NextPage').hasClass('disabled')){
                     $('#NextPage').addClass("disabled");                              
                  }            
          }
          else{
            if($('#NextPage').hasClass('disabled')){
                     $('#NextPage').removeClass("disabled");                              
                  }  
          }


  });
  
  
};

updateUrl = function(urlString,index1,index2,l,isLastFilter,filterType){
       // type variable for chosing whether color filter is last or not
        var tmp = urlString.substring(index1,l).indexOf('=')+1;
        var oldSelectedFilters = urlString.substring(index1+tmp,index2).split(',');
        var countSelectedFilters = oldSelectedFilters.length;
        // console.log(oldColorFilters[0]);
        var i = 0, flag;
        // console.log(urlString);
        while(i<countSelectedFilters)
        {
          // console.log('old color='+oldColorFilters[i]+'new color='+$scope.colorName);
          flag= 0
          if(oldSelectedFilters[i]==$scope.filterName){
            flag=1;
            i++;
            //console.log('old color found');
            break;
          }
          i++;

        }
        if(flag){     
            flag=0;
            if(countSelectedFilters==1){
              // if(filterType=='color')
                urlString = urlString.replace('&'+filterType+'=','');
              // else if(filterType=='price_range')
              //   urlString = urlString.replace('&price_range=','');
                
              urlString = urlString.replace($scope.filterName , '');
              // console.log($scope.url); // for single old color
            }
            else if(i ==1){                
                urlString = urlString.replace($scope.filterName + ',', '');
            } 

            else{
             urlString = urlString.replace(','+ $scope.filterName,''); 
            }
         }
        else{

            if(isLastFilter){
              urlString = urlString.substring(0,l)+ ','+ $scope.filterName;  //filter.substring(filter.indexOf('=')+1,filter.length)              
            }
            else{
                   
                  var url1 = urlString.substring(0,index1);
                  var url2 = urlString.substring(index1,index2);  
                  var url3 = urlString.substring(index2,l);         
                  urlString = url1 + url2+ ','+ $scope.filterName + url3 ;
            }
        }
    return urlString;     
};



$scope.showLeftSideFilters = function(){
    // console.log(event);
    // console.log("sdsdsa");
   
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
   // console.log($scope.categories[0].details.type);

  });
   
}]);

app.controller('searchCtrl', ['$scope', '$http','$stateParams', '$filter', function($scope, $http, $stateParams,$filter) {
    $scope.currentpage = $stateParams.routeId;
}]);
