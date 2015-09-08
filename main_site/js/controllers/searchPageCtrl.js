app.controller('searchPageCtrl', ['$scope', '$http', '$stateParams', 'ngCart', '$filter', '$state', '$location','$timeout','$location', function($scope, $http, $stateParams, ngCart, $filter, $state, $location,$timeout,$location) {
  $scope.brandcollapse = false ;  
  $scope.finishcollapse = true ;
  $scope.materialcollapse = true ;
  $scope.pricecollapse = false ;
  $scope.lookcollapse = true ;
  $scope.shapecollapse = true ;
  $scope.colorcollapse = false ;
  $scope.applicationcollapse = false ;
  $scope.usagecollapse = true;

 
 $scope.slider = {
    min: 0,
    max: 1000
};
if($location.search().priceRange){
  $location.search('priceRange',null);
}
$scope.boxPrice = function(width,height,unit,priceSqFt){
//  console.log(width + height +  priceSqFt);
  unit = unit.trim().toLowerCase(); 
  if(unit ==='mm')
    return Math.round((0.00328084*width)*(0.00328084*height)* priceSqFt) ;
  else if(unit ==='cm')
    return Math.round((0.0328084*width)*(0.0328084*height)* priceSqFt) ;
  else if(unit ==='inch')
    return Math.round((width*height * priceSqFt)/12) ;
  else if(unit ==='ft')
    return Math.round(width*height*priceSqFt) ;
} 
$scope.makeUrl = function(selected, original) {
        //this function is used to make the url
        //console.log(selected);
        var url, count = 0;
        angular.forEach(selected, function(item, index) {
            if (item == true && count != 0) {
                url = url + ',' + original[index]
            };
            if (item == true && count == 0) {
                url = original[index];
                count++;
            }
        });
        //console.log(count);
        return url;
    };
    $scope.pagechange = function(value) {
         console.log(typeof($scope.pageNo))
       if(value != 1){
        $location.search('pageNo', $scope.temp);
        // $scope.updateUrlChanges();
        $scope.requestToSearchAPI();}
    };
     $scope.requestToSearchAPI = function() {

        if ($stateParams.query) {
            final = $stateParams.query + $location.url().replace($location.path(), '');
        } else final = $location.url().replace($location.path(), '');
        $http.get('../api/slim.php/shiningfloor/products/' + 'search/' + $stateParams.routeId + '/' + final).then(function(resp) {
            $scope.searchResults = resp.data.product_data;
            $scope.totalResults = resp.data.totalResults;
            $scope.start = resp.data.start;
            $scope.last = resp.data.last;

        });
    };
    $scope.selectSortType = function(index){
        $scope.selectedSortIndex = index;
    };

      $scope.updateUrlChanges = function() {
        $location.search("pageNo", '1');     
        
        $scope.sortBy = $scope.sortTypeFilters[$scope.selectedSortIndex] ;
                               
        $location.search('sortBy', $scope.sortBy);        
        $scope.priceRangeUrl = $scope.slider.min+'-'+$scope.slider.max ;         
        $location.search('priceRange', $scope.priceRangeUrl);
           
        if ($scope.brandUrl = $scope.makeUrl($scope.selectedBrands, $scope.brandFilters)) {
            $location.search('brand_name', $scope.brandUrl);
        } else $location.search('brand_name', null);

        if ($scope.finishTypesUrl = $scope.makeUrl($scope.selectedFinishTypes, $scope.finishTypeFilters)) {
            $location.search('finish_types', $scope.finishTypesUrl);
        } else $location.search('finish_types', null);

        if ($scope.materialsUrl = $scope.makeUrl($scope.selectedMaterials, $scope.materialFilters)) {
            $location.search('materials', $scope.materialsUrl);
        } else $location.search('materials', null);

        if ($scope.looksUrl = $scope.makeUrl($scope.selectedLooks, $scope.lookFilters)) {
            $location.search('looks', $scope.looksUrl);
        } else $location.search('looks', null);

        if ($scope.applicationsUrl = $scope.makeUrl($scope.selectedApplications, $scope.applicationFilters)) {
            $location.search('applications', $scope.applicationsUrl);
        } else $location.search('applications', null);

        if ($scope.usagesUrl = $scope.makeUrl($scope.selectedUsages, $scope.usageFilters)) {
            $location.search('usages', $scope.usagesUrl);
        } else $location.search('usages', null);


        if ($scope.colorsUrl = $scope.makeUrl($scope.selectedColors, $scope.colorFilters)) {
            $location.search('colors', $scope.colorsUrl);
        } else $location.search('colors', null);

        if ($scope.shapesUrl = $scope.makeUrl($scope.selectedShapes, $scope.shapeFilters)) {
            $location.search('shapes', $scope.shapesUrl);
        } else $location.search('shapes', null);


        if ($scope.categoryUrl = $scope.makeUrl($scope.selectedCategory, $scope.categoryFilters)) {
            $location.search('category', $scope.categoryUrl);
        } else $location.search('category', null);
        //console.log($scope.searchQuery);
        if ($scope.searchQuery!=''){
            $scope.queryUrl = $scope.searchQuery ;
            $location.search('query', $scope.queryUrl);
        } else $location.search('query', null);

        $scope.categoryHTML =  (typeof $location.search().category == 'undefined') ? '' : '| Category = '+ $location.search().category    ;
        $scope.brandHTML =  (typeof $location.search().brand_name == 'undefined') ? '' : '| Brands = '+ $location.search().brand_name    ;
        $scope.finishTypeHTML =  (typeof $location.search().finish_types == 'undefined') ? '' : '| Finish Types = '+ $location.search().finish_types   ;
        $scope.materialHTML =  (typeof $location.search().materials == 'undefined') ? '' : '| Material Types = '+ $location.search().materials   ;
        $scope.lookHTML =  (typeof $location.search().looks == 'undefined') ? '' : '|  = Looks'+ $location.search().looks   ;
        $scope.applicationusageHTML =  (typeof $location.search().applications == 'undefined') ? '' : '| Applications = '+ $location.search().applications   ;
        $scope.usageHTML =  (typeof $location.search().usages == 'undefined') ? '' : '|  Usages = '+ $location.search().usages   ;
        $scope.shapeHTML =  (typeof $location.search().shapes == 'undefined') ? '' : '| Shapes = '+ $location.search().shapes   ;
        $scope.colorHTML =  (typeof $location.search().colors == 'undefined') ? '' : '| Colors = '+ $location.search().colors   ;
        
        $scope.requestToSearchAPI();

    };

    $scope.findandselect = function(allitems, filter, emptyitems, url) {
        //this function is used to select the already selected filters on refreshing the page

        if (url[filter]) {
            var items = url[filter].split(',');
            angular.forEach(allitems, function(item, i) {
                var index = items.indexOf(item);
                if (index != -1)
                    emptyitems[i] = true;
                else emptyitems[i] = false;
            });
        // console.log(emptyitems)
        }

    };
   
     
    $scope.findpageNo = function() {
        var params = $location.search();
        if (params['pageNo']) {
            return params['pageNo'];
        }
    };

     
    $scope.FilterUrl = $location.search();
    $scope.categoryHTML =  (typeof $location.search().category == 'undefined') ? '' : '| Category = '+ $location.search().category    ;
    $scope.brandHTML =  (typeof $location.search().brand_name == 'undefined') ? '' : '| Brands = '+ $location.search().brand_name    ;
    $scope.finishTypeHTML =  (typeof $location.search().finish_types == 'undefined') ? '' : '| Finish Types = '+ $location.search().finish_types   ;
    $scope.materialHTML =  (typeof $location.search().materials == 'undefined') ? '' : '| Material Types = '+ $location.search().materials ;
    $scope.lookHTML =  (typeof $location.search().looks == 'undefined') ? '' : '| Looks = '+ $location.search().looks   ;
    $scope.usageHTML =  (typeof $location.search().applications == 'undefined') ? '' : '| Applications = '+ $location.search().applications   ;
    $scope.applicationHTML =  (typeof $location.search().usages == 'undefined') ? '' : '|  Usages = '+ $location.search().usages   ;
    $scope.shapeHTML =  (typeof $location.search().shapes == 'undefined') ? '' : '| Shapes = '+ $location.search().shapes   ;
    $scope.colorHTML =  (typeof $location.search().colors == 'undefined') ? '' : '| Colors = '+ $location.search().colors   ;

  //  console.log($scope.FilterUrl);
    $scope.windowHeight = window.innerHeight;
    $scope.windowWidth = $(window).width();
    $scope.contentHeight = $scope.windowHeight - $('#header').height();
    $scope.contentWidth = $('#content').width();
    $scope.rId = $stateParams.routeId;
    // $scope.selectSearchCategory = function() {
    //     if ($stateParams.routeId == 'tiles')
    //         $scope.searchCategory = 'Tiles';
    //     else if ($stateParams.routeId == 'marble')
    //         $scope.searchCategory = 'Marbles';
    //     else if ($stateParams.routeId == 'wood')
    //         $scope.searchCategory = 'Woods';
    //     else if ($stateParams.routeId == 'artificial')
    //         $scope.searchCategory = 'Artificials';
    //     else if ($stateParams.routeId == 'stone')
    //         $scope.searchCategory = 'Stones';
    //     else if ($stateParams.routeId == 'wallpaper')
    //         $scope.searchCategory = 'Wallpapers';
    //     else
    //         $scope.searchCategory = 'All Products';
    //     return $scope.searchCategory;
    // };
    // $scope.searchCategory = $scope.selectSearchCategory();


      $http.get('../api/slim.php/shiningfloor/' + $stateParams.routeId + '/brands').then(function(resp) {
          $scope.brandFilters = resp.data.brands;
           
          var index = $scope.brandFilters.indexOf("Other");
          $scope.brandFilters.splice(index, 1);
          $scope.brandFilters.push("Other"); // put other to last in filter
          $scope.totalBrands = $scope.brandFilters.length;            
          $scope.selectedBrands = [];
          for (i = 0; i < $scope.totalBrands; i++)
              $scope.selectedBrands[i] = false;
          $scope.findandselect($scope.brandFilters, 'brand_name', $scope.selectedBrands, $scope.FilterUrl);      
      });

        $http.get('../api/slim.php/shiningfloor/'+'materials').then(function(resp) {
          $scope.materialFilters = resp.data.materials;
          $scope.materialsLength = $scope.materialFilters.length;
          $scope.selectedMaterials = [];
              for (i = 0; i < $scope.materialsLength; i++)
                  $scope.selectedMaterials[i] = false;         
              $scope.findandselect($scope.materialFilters, 'materials', $scope.selectedMaterials, $scope.FilterUrl);    

        });
        $http.get('../api/slim.php/shiningfloor/looks').then(function(resp) {
          $scope.lookFilters = resp.data.looks;
          $scope.looksLength = $scope.lookFilters.length;
          console.log($scope.looksLength);
          $scope.selectedLooks = [];
              for (i = 0; i < $scope.looksLength; i++)
                  $scope.selectedLooks[i] = false;         
              $scope.findandselect($scope.lookFilters, 'looks', $scope.selectedLooks, $scope.FilterUrl);
        });
        $http.get('../api/slim.php/shiningfloor/applications').then(function(resp) {
          $scope.applicationFilters = resp.data.applications;
          $scope.applicationsLength = $scope.applicationFilters.length;
           
          $scope.selectedApplications = [];
              for (i = 0; i < $scope.applicationsLength; i++)
                  $scope.selectedApplications[i] = false;         
              $scope.findandselect($scope.applicationFilters, 'applications', $scope.selectedApplications, $scope.FilterUrl);
        });
        $http.get('../api/slim.php/shiningfloor/usages').then(function(resp) {
          $scope.usageFilters = resp.data.usages;
          $scope.usagesLength = $scope.usageFilters.length;
        
          $scope.selectedUsages = [];
              for (i = 0; i < $scope.usagesLength; i++)
                  $scope.selectedUsages[i] = false;         
              $scope.findandselect($scope.usageFilters, 'usages', $scope.selectedUsages, $scope.FilterUrl);
        });        
        $http.get('../api/slim.php/shiningfloor/colors').then(function(resp) {
          $scope.colorFilters = resp.data.colors;
          $scope.colorsLength = $scope.colorFilters.length;
          
          $scope.selectedColors = [];
              for (i = 0; i < $scope.colorsLength; i++)
                  $scope.selectedColors[i] = false;         
              $scope.findandselect($scope.colorFilters, 'colors', $scope.selectedColors, $scope.FilterUrl);
        });
        $http.get('../api/slim.php/shiningfloor/finish_types').then(function(resp) {
            $scope.finishTypeFilters = resp.data.finish_types;
              $scope.finish_typesLength = $scope.finishTypeFilters.length;
              $scope.selectedFinishTypes = [];
              for (i = 0; i < $scope.finish_typesLength; i++)
                  $scope.selectedFinishTypes[i] = false;         
             $scope.findandselect($scope.finishTypeFilters, 'finish_types', $scope.selectedFinishTypes, $scope.FilterUrl);    
        });
        $http.get('../api/slim.php/shiningfloor/shapes').then(function(resp) {
          $scope.shapeFilters = resp.data.shapes;
          $scope.shapesLength = $scope.shapeFilters.length;
           
          $scope.selectedShapes = [];
              for (i = 0; i < $scope.shapesLength; i++)
                  $scope.selectedShapes[i] = false;         
              $scope.findandselect($scope.shapeFilters, 'shapes', $scope.selectedShapes, $scope.FilterUrl);
        });

    // $scope.sortTypeLable = ['Price (high to low)', 'Price (low to high)', 'Rating (high to low)', 'Rating (low to high)'];
    // $scope.selectedSortType = $scope.sortTypeLable[0];
    // $scope.priceFilters = ['below-100', '100-200', '200-above'];
    // $scope.priceFiltersLabels = ['Below 100', '100-200', 'Above 200'];
    // $scope.selectedColors = [false, false, false, false, false, false, false, false, false];
    // $scope.selectedPrices = [false, false, false];
    // $scope.selectedBrands = [false, false, false, false, false, false];
    // $scope.brandFilters = ['Kajaria', 'Somany', 'Nitco' , 'Hindware', 'Keromosa', 'Johnson'];
    // $scope.colors = ["red", "black", "green", "white", "pink", "blue", "orange", "grey", "yellow"];
    // $scope.findandselect($scope.brandFilters, 'brand_name', $scope.selectedBrands, $scope.FilterUrl);
    // $scope.findandselect($scope.priceFilters, 'price_range', $scope.selectedPrices, $scope.FilterUrl);
    // $scope.findandselect($scope.colors, 'color', $scope.selectedColors, $scope.FilterUrl)
    $scope.pageNo = $scope.findpageNo();
    $scope.temp =  $scope.pageNo;


    // $scope.categoryFilters = ['tiles', 'marble', 'wood','artificial','stone','wallpaper'];

   
    $scope.sortDropdown=true;
    $scope.selectedSortIndex = 0;    

    $scope.sortTypeFilters = ['relevance','priceAsc','priceDesc'];
    $scope.sortTypes = ['Relevance','Price  low to high','Price  high to low'];    
    $scope.selectedSortType=[]; 
    for (i = 0; i < $scope.sortTypes.length; i++)
        $scope.selectedSortType[i] = false;
    $scope.sortBy =$scope.sortTypeFilters[0];
     if ($scope.pageNo == undefined) {
        $location.search('pageNo', '1');
    }
    $location.search('sortBy', $scope.sortBy);         
    // $location.search('priceRange', $scope.slider.min+'-'+$scope.slider.max);
    $scope.requestToSearchAPI();
    // url for changing product in search page.
    $scope.url = $stateParams.query; 

    //console.log($scope.url);


    $scope.searchProductResults = function(query, searchType) {
        $stateParams.routeId = searchType;
        queryStr = $scope.url.substring(0, $scope.url.indexOf('?'));
        $scope.searchCategory = $scope.selectSearchCategory();
        $scope.resetAllUrlAndClasses();
        // var tmpIndx = $scope.url.indexOf('&');
        // if(tmpIndx !=-1)
        //     $scope.url = $scope.url.replace($scope.url.substring(tmpIndx, $scope.url.length) , '');
        $scope.url = $scope.url.replace(queryStr, query);
        $location.path('shiningFloor/search/' + searchType + '/' + $scope.url);
        $scope.requestToSearchAPI();
        $scope.searchQuery.text = '';
    };

    $scope.resetBrands = function() {
      for (i = 0; i < $scope.totalBrands; i++)
          $scope.selectedBrands[i] = false;         
         $scope.updateUrlChanges();
        $scope.requestToSearchAPI();
    };
    $scope.resetFinishTypes = function() {
        for (i = 0; i < $scope.finish_typesLength; i++)
            $scope.selectedFinishTypes[i] = false;         
     
         $scope.updateUrlChanges();
        $scope.requestToSearchAPI();
    };
    $scope.resetMaterials = function() {
        for (i = 0; i < $scope.materialsLength; i++)
            $scope.selectedMaterials[i] = false;         
     
         $scope.updateUrlChanges();
        $scope.requestToSearchAPI();
    };
    $scope.resetLooks = function() {
        for (i = 0; i < $scope.looksLength; i++)
            $scope.selectedLooks[i] = false;              
         $scope.updateUrlChanges();
        $scope.requestToSearchAPI();
    };
    $scope.resetApplications = function() {
        for (i = 0; i < $scope.applicationsLength; i++)
            $scope.selectedApplications[i] = false;              
         $scope.updateUrlChanges();
        $scope.requestToSearchAPI();
    };
    $scope.resetUsages = function() {
        for (i = 0; i < $scope.usagesLength; i++)
            $scope.selectedUsages[i] = false;              
         $scope.updateUrlChanges();
        $scope.requestToSearchAPI();
    };
    $scope.resetColors = function() {
        for (i = 0; i < $scope.colorsLength; i++)
            $scope.selectedColors[i] = false;              
         $scope.updateUrlChanges();
        $scope.requestToSearchAPI();
    };
    $scope.resetShapes = function() {
        for (i = 0; i < $scope.shapesLength; i++)
            $scope.selectedShapes[i] = false;         
     
         $scope.updateUrlChanges();
        $scope.requestToSearchAPI();
    };
    $scope.resetAll = function() {
         
        $scope.selectedCategory = [false];
        for (i = 0; i < $scope.totalBrands; i++)
          $scope.selectedBrands[i] = false;
        for (i = 0; i < $scope.finish_typesLength; i++)
            $scope.selectedFinishTypes[i] = false;                  
        for (i = 0; i < $scope.materialsLength; i++)
            $scope.selectedMaterials[i] = false;                  
        for (i = 0; i < $scope.looksLength; i++)
            $scope.selectedLooks[i] = false;
        for (i = 0; i < $scope.applicationsLength; i++)
            $scope.selectedApplications[i] = false;
        for (i = 0; i < $scope.usagesLength; i++)
            $scope.selectedUsages[i] = false;

        for (i = 0; i < $scope.colorsLength; i++)
            $scope.selectedColors[i] = false;
                 
        for (i = 0; i < $scope.shapesLength; i++)
            $scope.selectedShapes[i] = false;                      

        $scope.updateUrlChanges();
        $scope.requestToSearchAPI();
    };


    $scope.showLeftSideFilters = function() {
        if ($('#leftSide').hasClass('expanded')) {
            $("#leftSide").removeClass("expanded");
            $("#leftSide").addClass("hidden");
            $(".logo").removeClass("expanded");
        } else {
            if ($('#leftSide').hasClass('hidden'))
                $("#leftSide").removeClass("hidden");
            $("#leftSide").addClass("expanded");
            $(".logo").addClass("expanded");
        }
    };
    $scope.fetchProduct = function(product){

          $scope.showLoader = false;
          $scope.popupProduct = {}
          $scope.showpopup = true;
            $scope.popupProduct = product;
      // $timeout(function(){
      //     $scope.showLoader = false;

      // }, 3000);




    };
    
    $scope.showHideColors = $scope.showHidePrices = $scope.showHideBrands = 1;
    $scope.showSuggestions = function() {
        $('#search-items').removeClass('hidden');
        if ($scope.searchQuery.text == '')
            $('#search-items').addClass('hidden');
    };
    $(document).ready(function() {
        $(".counter").html(ngCart.getTotalItems());
    });
}]);
app.controller('productSearchCtrl', ['$scope', '$http', '$stateParams', '$filter', function($scope, $http, $stateParams, $filter) {
    $http.get('data/tyle_filter.json').then(function(resp) {
        $scope.categories = resp.data.categories;
        // console.log($scope.categories[0].details.type);
    });
}]);
app.controller('searchCtrl', ['$scope', '$http', '$stateParams', '$filter', function($scope, $http, $stateParams, $filter) {
    $scope.currentpage = $stateParams.routeId;
}]);
