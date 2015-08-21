app.controller('selectedCtrl', ['$scope', '$http','$stateParams','$q','$state','$location','toaster','$log', function($scope, $http, $stateParams,$q,$state,$location,toaster,$log) {
   $scope.bigCurrentPage = 1;

//var id = $stateParams.seller_id;

  //   $http.get('../api/slim.php/shiningfloor/selectedproducts/'+id+'?page='+$scope.bigCurrentPage).
  // then(function(response) {
  //   $scope.product =  response.data.product_data ;

  //     $scope.bigTotalItems = response.data.totalResults ;

  // });
     $scope.totalItems = 64;

     $scope.findAndRemove = function(array, property, value) {
         var indexno;
        $.each(array, function(index, result) {
          if(result[property] == value) {
                 indexno = index;
            }
           //   else
        });
        array.splice(indexno,1)
     };
      $scope.deleteproduct = function(id){
         //console.log($scope.product);
         console.log('sssss');
        $http.delete('../api/slim.php/shiningfloor/seller/deleteproduct/'+id).then(function (resp) {
          toaster.pop('success', 'Product Deleted', 'Sellers Products Updated');
          $scope.findAndRemove($scope.product, "product_id" ,id);
          $scope.bigTotalItems--;
       });

     };

  $scope.selectproduct = function(product){
    //console.log($scope.product);
    var data = {
     // sellers_id : id,
     products_id: product.product_id,
     price: product.seller_product_price,
     seller_product_code :product.seller_product_code,
     comments:product.seller_product_comments,
     total_quantity :product.seller_total_quantity,
     minimum_boxes : product.seller_minimum_boxes
    }

   $http.put('../api/slim.php/shiningfloor/seller/products/update_product',data).then(function (resp) {
     toaster.pop('success', 'Product Selected', 'Product Informaton Updated');
  //   $scope.findAndRemove($scope.product, "product_id" ,product['product_id']);

   $scope.data = resp;

});


  };


       $scope.setPage = function (pageNo) {
    //  console.log("dasda");
      $scope.currentPage = pageNo;
    };

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
//        console.log(url);
        return url;
    };
$scope.selectedcategory = function(value){
  for(i=0;i<$scope.selectedCategory.length;i++){
    console.log(i + ' ' + value);
    if( i !=value)
      $scope.selectedCategory[i] = false ;
    }
  $scope.selectedCategory[value] = !$scope.selectedCategory[value] ;

}
     $scope.updateUrlChanges = function() {

        $location.search("pageNo", '1');
        if ($scope.colorUrl = $scope.makeUrl($scope.selectedColors, $scope.colors)) {

            $location.search('color', $scope.colorUrl);
        } else $location.search('color', null);
        if ($scope.priceUrl = $scope.makeUrl($scope.selectedPrices, $scope.priceFilters)) {
            $location.search('price_range', $scope.priceUrl);
        } else $location.search('price_range', null);

        if ($scope.brandUrl = $scope.makeUrl($scope.selectedBrands, $scope.brandFilters)) {
            $location.search('brand_name', $scope.brandUrl);
        } else $location.search('brand_name', null);

        if ($scope.finishTypesUrl = $scope.makeUrl($scope.selectedFinishTypes, $scope.finishTypeFilters)) {
            $location.search('finish_types', $scope.finishTypesUrl);
        } else $location.search('finish_types', null);

        if ($scope.applicationUrl = $scope.makeUrl($scope.selectedApplications, $scope.applicationFilters)) {
            $location.search('applications', $scope.applicationUrl);
        } else $location.search('applications', null);

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
    $scope.applicationHTML =  (typeof $location.search().applications == 'undefined') ? '' : '| Applications = '+ $location.search().applications   ;
    $scope.colorHTML =  (typeof $location.search().color == 'undefined') ? '' : '| Colors = '+ $location.search().color    ;
    $scope.finishTypeHTML =  (typeof $location.search().finish_types == 'undefined') ? '' : '| Finish Types = '+ $location.search().finish_types   ;

        $scope.requestToSearchAPI();

    };

   $scope.pagechange = function(value) {
        console.log('pagechangeval =  ' + value);
         console.log(typeof($scope.pageNo))
    //   if(value != 1){
        $location.search('pageNo', value);
        // $scope.updateUrlChanges();
        $scope.requestToSearchAPI();
      }
  //  };

$scope.requestToSearchAPI = function() {
      final='';
      final += $location.url().replace($location.path(), '') ;

      $http.get('../api/slim.php/shiningfloor/seller/selectedproducts'+final).then(function(resp) {
            $scope.product = resp.data.product_data;
            $scope.bigTotalItems = resp.data.totalResults;
            console.log($scope.bigTotalItems);
            $scope.totalPages = resp.data.totalResults;
            $scope.start = resp.data.start;
            $scope.last = resp.data.last;

        });
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
    // console.log(typeof $scope.FilterUrl.category);
    $scope.categoryHTML =  (typeof $location.search().category == 'undefined') ? '' : '| Category = '+ $location.search().category    ;
    $scope.brandHTML =  (typeof $location.search().brand_name == 'undefined') ? '' : '| Brands = '+ $location.search().brand_name    ;
    $scope.applicationHTML =  (typeof $location.search().applications == 'undefined') ? '' : '| Applications = '+ $location.search().applications   ;
    $scope.colorHTML =  (typeof $location.search().color == 'undefined') ? '' : '| Colors = '+ $location.search().color    ;
    $scope.finishTypeHTML =  (typeof $location.search().finish_types == 'undefined') ? '' : '| Finish Types = '+ $location.search().finish_types   ;

    $scope.priceFilters = ['below-100', '100-200', '200-above'];
    $scope.priceFiltersLabels = ['Below 100', '100-200', 'Above 200'];

    $scope.categoryFilters = ['tiles', 'marble', 'wood','artificial','stone','wallpaper'];

    $scope.selectedColors = [false, false, false, false, false, false, false, false, false];
    $scope.selectedPrices = [false, false, false];
    $scope.selectedBrands = [false, false, false, false, false, false];
    $scope.selectedFinishTypes = [false, false, false, false, false, false,false, false, false, false, false, false,false, false, false, false, false, false]
    $scope.selectedApplications = [false, false] ;
    $scope.selectedCategory = [false,false,false,false,false,false];
    $scope.selectedDropdown = [false,false,false,false,false];

    // if(typeof $scope.FilterUrl.category != 'undefined')
    //   $scope.selectedCategory = $scope.FilterUrl.category ;
    // else
    //   $scope.selectedCategory = '';

    $scope.finishTypeFilters = ["Roto Matt" ,"Satin" ,"Stone" ,"Sugar Hone" ,"Polished" ,"Rustic" ,"Satin / Rustic" ,"Satin / Rustic / Metal" ,"Polished Wood" ,"Real Wood" ,"Wood" ,"Lappato" ,"Matt" ,"Satin Matt","Glossy" ,"Natural" ,"Marble" ,"Super Glossy"]
    $scope.applicationFilters = ["WALL","FLOOR"] ;
    $scope.brandFilters = ['Kajaria', 'Somany', 'Nitco' , 'Hindware', 'Keromosa', 'Johnson'];
    $scope.colors = ["red", "black", "green", "white", "pink", "blue", "orange", "grey", "yellow"];
    $scope.findandselect($scope.categoryFilters, 'category', $scope.selectedCategory, $scope.FilterUrl);
    $scope.findandselect($scope.brandFilters, 'brand_name', $scope.selectedBrands, $scope.FilterUrl);
    $scope.findandselect($scope.finishTypeFilters, 'finish_types', $scope.selectedFinishTypes, $scope.FilterUrl);
    $scope.findandselect($scope.applicationFilters, 'applications', $scope.selectedApplications, $scope.FilterUrl);
    $scope.findandselect($scope.priceFilters, 'price_range', $scope.selectedPrices, $scope.FilterUrl);
    $scope.findandselect($scope.colors, 'color', $scope.selectedColors, $scope.FilterUrl)
    $scope.pageNo = $scope.findpageNo();
    $scope.bigCurrentPage =  $scope.pageNo;
    if ($scope.pageNo == undefined) {

        $location.search('pageNo', '1');
    }
    $location.search('query',null);
    $scope.searchQuery='';
    $scope.requestToSearchAPI();
    $scope.isProductColor = 1;

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
    $scope.resetFinishTypes = function() {
        $scope.selectedFinishTypes = [false, false, false, false, false, false,false, false, false, false, false, false,false, false, false, false, false, false];
         $scope.updateUrlChanges();
        $scope.requestToSearchAPI();
    };
    $scope.resetApplications = function() {
        $scope.selectedApplications = [false, false];
         $scope.updateUrlChanges();
        $scope.requestToSearchAPI();
    };
    $scope.resetAll = function() {

        $scope.selectedColors = [false, false, false, false, false, false, false, false, false];
        $scope.selectedPrices = [false, false, false];
        $scope.selectedBrands = [false, false, false, false, false, false];
        $scope.selectedFinishTypes = [false, false, false, false, false, false,false, false, false, false, false, false,false, false, false, false, false, false]
        $scope.selectedApplications = [false, false] ;
        $scope.selectedCategory = [false,false,false,false,false,false];
        $scope.selectedDropdown = [false,false,false,false,false];

        $scope.updateUrlChanges();
        $scope.requestToSearchAPI();
    };

    $scope.chooseDropdown = function(index){
      // $scope.selectedDropdown = [false,false,false,false,false];
      $scope.selectedDropdown[index] = !$scope.selectedDropdown[index];
      for(i=0;i<$scope.selectedDropdown.length ;i++){
        if(i!=index)
          $scope.selectedDropdown[i] =false;
      }
    }


}]);
