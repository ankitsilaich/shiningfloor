'use strict';

/* Controllers */

  // Form controller
app.controller('FormDemoCtrl', ['$scope','$http','toaster','FileUploader','$sce','$q', '$state','$timeout',function($scope,$http,toaster,FileUploader,$sce,$q,$state,$timeout) {

  $scope.dirty = {};

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
// $scope.product_types = [{'value':'1','name':'Tile'},{'value':'2','name':'Wood'},{'value':'7','name':'Mosiac'},{'value':'8','name':'Vinyl & Linoleum'},{'value':'9','name':'Carpet & Rugs'},{'value': '10','name':'Accessories'}];
//$scope.product_types = [{'value':'1','name':'Tile'},{'value':'2','name':'Wood'},{'value':'3','name':'Marble'},{'value':'4','name':'Stone'},{'value':'5','name':'Wallpaper'},{'value': '6','name':'Artificial'}];
$scope.product_types = [{'value':'1','name':'Tile'}];

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


  var uploader = $scope.uploader = new FileUploader({
      url: '../api/slim.php/seller/uploadfile' 

  });
 
  // FILTERS
  uploader.filters.push({
      name: 'customFilter',
      fn: function(item /*{File|FileLikeObject}*/, options) {
          return this.queue.length < 5;
      }
  });
  
$scope.isFormOk = function(){
  $scope.usagesFieldOk = false;
  $scope.applicationsFieldOk = false;
  $scope.colorsFieldOk = false;
  for(i=0;i<$scope.usagesLength;i++)
  {   
      if($scope.selectedUsages[i]==true){
         $scope.usagesFieldOk = true ; break;
     }
  }
  for(i=0;i<$scope.applicationsLength;i++)
  {   
      if($scope.selectedApplications[i]==true){
         $scope.applicationsFieldOk = true ; break;
     }
  }
  for(i=0;i<$scope.colorsLength;i++)
  {   
      if($scope.selectedColors[i]==true){
         $scope.colorsFieldOk = true ; break;
     }
  }
  if($scope.usagesFieldOk && $scope.applicationsFieldOk && $scope.colorsFieldOk) 
      return true;
  else
      return false;
}

  $scope.submitform = function(product){
  
    uploader.uploadAll();
    console.log($scope.selectedUsages);     
    for(i=0;i<$scope.usagesLength;i++)
    {
      if($scope.selectedUsages[i]==true)
      {
        if(product.usages!="")
          product.usages +=","+$scope.usages[i];
        else
          product.usages = $scope.usages[i];
      }
    }

    for(i=0;i<$scope.applicationsLength;i++)
    {
      if($scope.selectedApplications[i]==true)
      {
        if(product.applications!="")
          product.applications +=","+$scope.applications[i];
        else
          product.applications = $scope.applications[i];
      }
    } 
    for(i=0;i<$scope.colorsLength;i++)
    {
      if($scope.selectedColors[i]==true)
      {
        if(product.colors!="")
          product.colors +=","+$scope.colors[i];
        else
          product.colors = $scope.colors[i];
      }
    }
    console.log(product);   
    console.log(JSON.stringify(product));
   $http.post('../api/slim.php/shiningfloor/seller/addproduct',product).
        success(function(data, status) {
            toaster.pop('success', 'New Product', 'Product Added Successfully');         
          $timeout(reloadState, 3000);
        });
    };

    function reloadState() {
       $state.go('app.all.newproduct',{},{reload:true});
    }

   }

]);
