app.controller('searchPageCtrl', ['$scope', '$http', '$stateParams', 'ngCart', '$filter', '$state', '$location', function($scope, $http, $stateParams, ngCart, $filter, $state, $location) {
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
        $http.get('api/slim.php/shiningfloor/products/' + 'search/' + $stateParams.routeId + '/' + final).then(function(resp) {
            $scope.searchResults = resp.data.product_data;
            $scope.totalResults = resp.data.totalResults;
            $scope.start = resp.data.start;
            $scope.last = resp.data.last;
            
        });
    };
 $scope.updateUrlChanges = function() {
        $location.search("pageNo", '1');
        console.log('fff');
        if ($scope.colorUrl = $scope.makeUrl($scope.selectedColors, $scope.colors)) {
            $location.search('color', $scope.colorUrl);
        } else $location.search('color', null);
        if ($scope.priceUrl = $scope.makeUrl($scope.selectedPrices, $scope.priceFilters)) {
            $location.search('price_range', $scope.priceUrl);
        } else $location.search('price_range', null);
        if ($scope.brandUrl = $scope.makeUrl($scope.selectedBrands, $scope.brandFilters)) {
            $location.search('brand_name', $scope.brandUrl);
        } else $location.search('brand_name', null);
        $scope.requestToSearchAPI();
    };   
  // $scope.pageChange = function(pageNo){
   //$location.search('pageNo',pageNo);
     //    $scope.updateUrlChanges();
       // $scope.requestToSearchAPI();


  //}  
 
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
         console.log(emptyitems)
        }
      
    };
    
    $scope.findpageNo = function() {
        var params = $location.search();
        if (params['pageNo']) {
            return params['pageNo'];
        }
    };
    $scope.FilterUrl = $location.search();
    console.log($scope.FilterUrl);
    $scope.windowHeight = window.innerHeight;
    $scope.windowWidth = $(window).width();
    $scope.contentHeight = $scope.windowHeight - $('#header').height();
    $scope.contentWidth = $('#content').width();
    $scope.rId = $stateParams.routeId;
    $scope.sortTypeLable = ['Price (high to low)', 'Price (low to high)', 'Rating (high to low)', 'Rating (low to high)'];
    $scope.selectedSortType = $scope.sortTypeLable[0];
    $scope.priceFilters = ['below-100', '100-200', '200-above'];
    $scope.priceFiltersLabels = ['Below 100', '100-200', 'Above 200'];
    $scope.selectedColors = [false, false, false, false, false, false, false, false, false];
    $scope.selectedPrices = [false, false, false];
    $scope.selectedBrands = [false, false, false, false, false, false];
    $scope.brandFilters = ['Kajaria', 'Somany', 'Nitco' , 'Hindware', 'Keromosa', 'Johnson'];
    $scope.colors = ["red", "black", "green", "white", "pink", "blue", "orange", "grey", "yellow"];
    $scope.findandselect($scope.brandFilters, 'brand_name', $scope.selectedBrands, $scope.FilterUrl);
    $scope.findandselect($scope.priceFilters, 'price_range', $scope.selectedPrices, $scope.FilterUrl);
    $scope.findandselect($scope.colors, 'color', $scope.selectedColors, $scope.FilterUrl)
    $scope.pageNo = $scope.findpageNo();
     
    $scope.temp =  $scope.pageNo;
   
   
    if ($scope.pageNo == undefined) {
        
        $location.search('pageNo', '1');
    }
    $scope.requestToSearchAPI();
    // url for changing product in search page. 
    $scope.url = $stateParams.query;
    //console.log($scope.url); 
    $scope.selectSearchCategory = function() {
        if ($stateParams.routeId == 'tiles')
            $scope.searchCategory = 'Tiles';
        else if ($stateParams.routeId == 'marble')
            $scope.searchCategory = 'Marbles';
        else if ($stateParams.routeId == 'wood')
            $scope.searchCategory = 'Woods';
        else if ($stateParams.routeId == 'artificial')
            $scope.searchCategory = 'Artificials';
        else if ($stateParams.routeId == 'stone')
            $scope.searchCategory = 'Stones';
        else if ($stateParams.routeId == 'wallpaper')
            $scope.searchCategory = 'Wallpapers';
        else
            $scope.searchCategory = 'All Products';
        return $scope.searchCategory;
    };
    $scope.searchCategory = $scope.selectSearchCategory();
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
   
    $scope.resetColors = function() {
        $scope.selectedColors = [false, false, false, false, false, false, false, false, false];
         $scope.updateUrlChanges();
        $scope.requestToSearchAPI();
    };
  
    
    $scope.resetPrices = function() {
        $scope.selectedPrices = [false, false, false];
        $scope.updateUrlChanges();
        $scope.requestToSearchAPI();
    };
    $scope.resetBrands = function() {
        $scope.selectedBrands = [false, false, false, false, false, false];
         $scope.updateUrlChanges();
        $scope.requestToSearchAPI();
    };
    $scope.resetAll = function() {
        $scope.selectedColors = [false, false, false, false, false, false, false, false, false];
         $scope.selectedPrices = [false, false, false];
         $scope.selectedBrands = [false, false, false, false, false, false];
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
