app.controller('hnewCtrl', ['$scope', '$http','$stateParams','$q','$state','$log','$location','toaster', function($scope, $http, $stateParams,$q,$state,$log,$location,toaster) {
  $scope.numPages = 5;
   // var id = $stateParams.seller_id;
   $('#choosen').on('change', function(e) {
    // triggers when whole value changed
         $('select').trigger("chosen:updated");
  });
//    console.log('hghgh');
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
     $scope.fetchProduct = function(product){

          $scope.showLoader = false;
          $scope.popupProduct = {}
          $scope.showpopup = true;
           console.log(product);    
           console.log($scope.seller);
          $scope.product= {"name":product.product_name , "type":product.product_type_id ,"brand":product.product_brand   ,"look":product.product_look ,"width":product.product_width,"height":product.product_height,"thickness":product.product_thickness,"w_unit":product.product_w_unit,"t_unit":product.product_t_unit ,"finish_type":product.product_finish_type,
              "total_boxes":product.product_,"colors":product.product_colors, "origin_country":product.product_origin_country,"variation":product.product_variation,"shape":product.product_shape,"price":product.product_price,"items_per_box":product.product_ ,"material":product.product_material,
            "minimum_boxes":product.product_, "seller_product_code":product.product_, "image":product.product_images ,"comments":product.product_comments ,"features":product.product_features,"usages":product.product_usages,"applications":product.product_applications
       } ;

    };

  $scope.selectproduct = function(product){
    //console.log($scope.product);
     
    var data = {
     // sellers_id : id,
     products_id: product.product_id,
     price: product.price,
     items_per_box: product.product_items_per_box,
     seller_product_code :product.seller_product_code,      
     comments:product.product_comments,
     minimum_boxes : product.minimum_boxes

    }
   $http.post('../api/slim.php/shiningfloor/seller/sellers_products',data).then(function (resp) {
     toaster.pop('success', 'Product Selected', 'Product added to Seller account');
     $scope.findAndRemove($scope.product, "product_id" ,product['product_id']);
   
   
     $scope.bigTotalItems--;
    // console.log($scope.bigCurrentPage);
    $scope.data = resp;
//    console.log($scope.data);
//console.log(resp);

});
     

  };
   $scope.bigCurrentPage = 1;
  
var deferredAbort = $q.defer();
$http.get('../api/slim.php/shiningfloor/seller/info').then(function (resp) {
$scope.seller = resp.data.seller_data;

});
    
     $scope.totalItems = 64;
   

    $scope.maxSize = 10;
    
// $http.get('../api/slim.php/shiningfloor/chooseproducts/'+id+'?pageNo='+$scope.bigCurrentPage).
//   then(function(resp) {

//     $scope.product = resp.data.product_data;
//     $scope.bigTotalItems = resp.data.totalResults;
// // console.log($scope.bigTotalItems);
//     $scope.start = resp.data.start;
//     $scope.last = resp.data.last;  
//   });

     $scope.totalItems = 64;
    

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
        // console.log('pagechangeval =  ' + value);
        //  console.log(typeof($scope.pageNo))
    //   if(value != 1){
        $location.search('pageNo', value);
        // $scope.updateUrlChanges();
        $scope.requestToSearchAPI();
      }
       
 $scope.requestToSearchAPI = function() {
       final=''; 
 

        final += $location.url().replace($location.path(), '') ;
        console.log(final)
//        
//        console.log(final);
      $http.get('../api/slim.php/shiningfloor/seller/chooseproducts'+ final).then(function(resp) {
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
 
    $scope.selectType =function(val){
//  console.log('44');
  switch(val){
    case "1":
      $scope.selectedType = 'tiles' ;
      break;
    case "2":
      $scope.selectedType = 'wood';
      break;
    case "7":
      $scope.selectedType = 'mosiac';
      break;
    case "8":
      $scope.selectedType = 'vinyl-and-linoleum';
      break;
    case "9":
      $scope.selectedType = 'carpet-and-rugs';
      break;
    case "10":
      $scope.selectedType = 'accessories';
      break;
  }
  $http.get('../api/slim.php/shiningfloor/'+$scope.selectedType + '/brands').then(function(resp) {
      $scope.brands = resp.data.brands;
      $scope.totalBrands = $scope.brands.length;
      if(!$scope.$$phase) {
  $scope.$apply();
}

  });
}

 $http.get('../api/slim.php/shiningfloor/colors').then(function(resp) {
      $scope.colors = resp.data.colors;
      $scope.colorsLength = $scope.colors.length;
      $scope.selectedColors=[];
      for(i=0;i<$scope.colorsLength;i++)
        $scope.selectedColors[i] = false;
    });
 
    function suggest_brand(term) { 
      var q = term.toLowerCase().trim();

      var results = [];
       
      for (var i = 0; i < $scope.brands.length && results.length < 10; i++) {
        var state = $scope.brands[i];

        if (state.toLowerCase().indexOf(q) === 0)
          results.push({
            label: state ,  value: state });
      }

      return results;
    }
    $scope.brand_options = {
      suggest: suggest_brand
    };

$scope.selectedTypeValue = "1";
$scope.selectedType = 'tiles';
$scope.selectType();
$scope.product_types = [{'value':'1','name':'Tile'},{'value':'2','name':'Wood'},{'value':'7','name':'Mosiac'},{'value':'8','name':'Vinyl & Linoleum'},{'value':'9','name':'Carpet & Rugs'},{'value': '10','name':'Accessories'}];
//$scope.product_types = [{'value':'1','name':'Tile'},{'value':'2','name':'Wood'},{'value':'3','name':'Marble'},{'value':'4','name':'Stone'},{'value':'5','name':'Wallpaper'},{'value': '6','name':'Artificial'}];


$scope.product= {"name":"" , "type":"1" ,"brand":""   ,"look":"" ,"width":"","height":"","thickness":"","w_unit":"ft","t_unit":"mm" ,"finish_type":"",
            "url":"", "total_boxes":"","colors":"", "origin_country":"","variation":"","shape":"","price":"","items_per_box":"" ,"material":"",
            "minimum_boxes":"", "seller_product_code":"", "image":"" ,"comments":"" ,"features":"","usages":"","applications":""
   } ;

$http.get('../api/slim.php/shiningfloor/'+$scope.selectedType + '/brands').then(function(resp) {
    $scope.brands = resp.data.brands;
    $scope.totalBrands = $scope.brands.length;
});

$http.get('../api/slim.php/shiningfloor/sizes').then(function(resp) {
    $scope.sizes = resp.data.sizes;
    function suggest_size(term) {
      var q = term.toLowerCase().trim();
      var results = [];
      for (var i = 0; i < $scope.sizes.length && results.length < 10; i++) {
        var state = $scope.sizes[i];

        if (state.toLowerCase().indexOf(q) === 0)
          results.push({
            label: state ,  value: state });
      }
      return results;
    }
    $scope.size_options = {
      suggest: suggest_size
    };

});
 
    function suggest_material(term) {
      var q = term.toLowerCase().trim();
      var results = [];
      for (var i = 0; i < $scope.materials.length && results.length < 10; i++) {
        var state = $scope.materials[i];

        if (state.toLowerCase().indexOf(q) === 0)
          results.push({
            label: state ,  value: state });
      }
      return results;
    }
    $scope.material_options = {
      suggest: suggest_material
    };
 

$scope.usages = ["Floor","Wall","Commericial","Residential","Outdoor"];
$scope.usagesLength= $scope.usages.length;
$scope.selectedUsages = [];
for(var i =0; i<$scope.usagesLength;i++)
  $scope.selectedUsages[i]= false;

$scope.applications=["Bedroom Wall","Bedroom Floor","Bathroom Wall","Bathroom Floor","Kitchen Wall","Kitchen Floor","Living Room Wall","Living Room Floor","Outdoor"];
$scope.applicationsLength= $scope.applications.length;
$scope.selectedApplications = [];
for(var i =0; i<$scope.applicationsLength;i++)
  $scope.selectedApplications[i]= false;

$scope.materials= ["Travertine","Marble","Slate","Ceramic","Vitrified","Porcelain","Faux Wood","Quartzite","Granite","Stone & Pebbles",
  "Onyx","Limestone","SandStone","Glass","Stone","Metal","Porcelain","Laminate Flooring","Hardwood Flooring","Engineered Hardwood Floors",
  "Bamboo Flooring","Cork Flooring","Vinly Plank","Vinly Tile","Linoleum Flooring","Carpet tile","Area Rugs","Mats","Adhesives","Floor care",
  "Underlay"];
$scope.materialsLength= $scope.materials.length;  
// $http.get('../api/slim.php/shiningfloor/finish_types').then(function(resp) {
    // $scope.finish_types = resp.data.finish_types;
  $scope.finish_types= ["Embossed","Glazed","Glossy","Matte", "Specialty","Square","Natural","Polished","Slight Texture","Slightly Embossed","Smooth","Textured",
    "Glossy", "HD","Lapato","Marble","Matte","Matt & Rustic","Metallic","Rustic","Stone", "Sugar Hone",
    "Glazed","Unpolished","Eclat","Full Nano Polished","Full Polished & Semi Polished","Satin","Satin Matte","Stain Free Nano Polished","Wodden"
    ];
$scope.finish_typesLength= $scope.finish_types.length;  
    function suggest_finish_type(term) {
      var q = term.toLowerCase().trim();
      var results = [];
      for (var i = 0; i < $scope.finish_types.length && results.length < 10; i++) {
        var state = $scope.finish_types[i];

        if (state.toLowerCase().indexOf(q) === 0)
          results.push({
            label: state ,  value: state });
      }
      return results;
    }
    $scope.finish_type_options = {
      suggest: suggest_finish_type
    };
// });
//$scope.countries = ["Afghanistan", "Albania", "Algeria", "American Samoa", "Andorra", "Angola", "Anguilla", "Antarctica", "Antigua and Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia and Herzegowina", "Botswana", "Bouvet Island", "Brazil", "British Indian Ocean Territory", "Brunei Darussalam", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central African Republic", "Chad", "Chile", "China", "Christmas Island", "Cocos (Keeling) Islands", "Colombia", "Comoros", "Congo", "Congo, the Democratic Republic of the", "Cook Islands", "Costa Rica", "Cote d'Ivoire", "Croatia (Hrvatska)", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "East Timor", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands (Malvinas)", "Faroe Islands", "Fiji", "Finland", "France", "France Metropolitan", "French Guiana", "French Polynesia", "French Southern Territories", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guadeloupe", "Guam", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Heard and Mc Donald Islands", "Holy See (Vatican City State)", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran (Islamic Republic of)", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, Democratic People's Republic of", "Korea, Republic of", "Kuwait", "Kyrgyzstan", "Lao, People's Democratic Republic", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libyan Arab Jamahiriya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia, The Former Yugoslav Republic of", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Martinique", "Mauritania", "Mauritius", "Mayotte", "Mexico", "Micronesia, Federated States of", "Moldova, Republic of", "Monaco", "Mongolia", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Niue", "Norfolk Island", "Northern Mariana Islands", "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Pitcairn", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russian Federation", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Seychelles", "Sierra Leone", "Singapore", "Slovakia (Slovak Republic)", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Georgia and the South Sandwich Islands", "Spain", "Sri Lanka", "St. Helena", "St. Pierre and Miquelon", "Sudan", "Suriname", "Svalbard and Jan Mayen Islands", "Swaziland", "Sweden", "Switzerland", "Syrian Arab Republic", "Taiwan, Province of China", "Tajikistan", "Tanzania, United Republic of", "Thailand", "Togo", "Tokelau", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks and Caicos Islands", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "United States Minor Outlying Islands", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela", "Vietnam", "Virgin Islands (British)", "Virgin Islands (U.S.)", "Wallis and Futuna Islands", "Western Sahara", "Yemen", "Yugoslavia", "Zambia", "Zimbabwe"];

$scope.countries = ["Afghanistan", "Albania", "Algeria", "American Samoa", "Andorra", "Angola", "Anguilla", "Antarctica", "Antigua and Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia and Herzegowina", "Botswana", "Bouvet Island", "Brazil", "British Indian Ocean Territory", "Brunei Darussalam", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central African Republic", "Chad", "Chile", "China", "Christmas Island", "Cocos (Keeling) Islands", "Colombia", "Comoros", "Congo", "Congo, the Democratic Republic of the", "Cook Islands", "Costa Rica", "Cote d'Ivoire", "Croatia (Hrvatska)", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "East Timor", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands (Malvinas)", "Faroe Islands", "Fiji", "Finland", "France", "France Metropolitan", "French Guiana", "French Polynesia", "French Southern Territories", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guadeloupe", "Guam", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Heard and Mc Donald Islands", "Holy See (Vatican City State)", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran (Islamic Republic of)", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, Democratic People's Republic of", "Korea, Republic of", "Kuwait", "Kyrgyzstan", "Lao, People's Democratic Republic", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libyan Arab Jamahiriya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia, The Former Yugoslav Republic of", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Martinique", "Mauritania", "Mauritius", "Mayotte", "Mexico", "Micronesia, Federated States of", "Moldova, Republic of", "Monaco", "Mongolia", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Niue", "Norfolk Island", "Northern Mariana Islands", "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Pitcairn", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russian Federation", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Seychelles", "Sierra Leone", "Singapore", "Slovakia (Slovak Republic)", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Georgia and the South Sandwich Islands", "Spain", "Sri Lanka", "St. Helena", "St. Pierre and Miquelon", "Sudan", "Suriname", "Svalbard and Jan Mayen Islands", "Swaziland", "Sweden", "Switzerland", "Syrian Arab Republic", "Taiwan, Province of China", "Tajikistan", "Tanzania, United Republic of", "Thailand", "Togo", "Tokelau", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks and Caicos Islands", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "United States Minor Outlying Islands", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela", "Vietnam", "Virgin Islands (British)", "Virgin Islands (U.S.)", "Wallis and Futuna Islands", "Western Sahara", "Yemen", "Yugoslavia", "Zambia", "Zimbabwe"];
   
function suggest_country(term) {
    var q = term.toLowerCase().trim();
    var results = [];
    for (var i = 0; i < $scope.countries.length && results.length < 10; i++) {
      var state = $scope.countries[i];

      if (state.toLowerCase().indexOf(q) === 0)
        results.push({
          label: state ,  value: state });
    }
    return results;
}
$scope.country_options = {
    suggest: suggest_country
};

$scope.shapes = ["Hexagon","Octagon","Oval","Rectangle","Round","Square","Pebble"];
    function suggest_shape(term) {

      var q = term.toLowerCase().trim();       
      var results = [];
      for (var i = 0; i < $scope.shapes.length && results.length < 10; i++) {
        var state = $scope.shapes[i];

        if (state.toLowerCase().indexOf(q) === 0)
          results.push({
            label: state ,  value: state });
      }
      return results;
    }
  
    $scope.shape_options = {
      suggest: suggest_shape
    };
$http.get('../api/slim.php/shiningfloor/looks').then(function(resp) {
    $scope.looks = resp.data.looks;
    function suggest_look(term) {
      var q = term.toLowerCase().trim();
      var results = [];
      for (var i = 0; i < $scope.looks.length && results.length < 10; i++) {
        var state = $scope.looks[i];

        if (state.toLowerCase().indexOf(q) === 0)
          results.push({
            label: state ,  value: state });
      }
      return results;
    }
    $scope.look_options = {
      suggest: suggest_look
    };
});


}]);