app.controller('filterCtrl', ['$scope', '$http', '$filter', function($scope, $http, $filter) {
  $http.get('js/controllers/filter.json').then(function (resp) {

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
       console.log($scope.selectedLocation);
      $scope.location_no.selected = true;
  
    
    console.log($scope.selectedLocation);
  });

  $scope.budgets = [ 0 , 1 , 2 , 3, 4, 5];


  $scope.filter = '';
  $scope.groups = [
    {name: 'Coworkers'}, 
    {name: 'Family'}, 
    {name: 'Friends'}, 
    {name: 'Partners'}, 
    {name: 'Group'}
  ];

  $scope.dropdownHandle= function(){
    $('#dropdowndisplay').toggleClass('customClass');
   console.log('sfsfs');
  };

  $scope.checkItem = function(obj, arr, key){
    var i=0;
    angular.forEach(arr, function(item) {
      if(item[key].indexOf( obj[key] ) == 0){
        var j = item[key].replace(obj[key], '').trim();
        if(j){
          i = Math.max(i, parseInt(j)+1);
        }else{
          i = 1;
        }
      }
    });
    return obj[key] + (i ? ' '+i : '');
  };

  $scope.deleteGroup = function(item){
    $scope.groups.splice($scope.groups.indexOf(item), 1);
  };

  $scope.selectGroup = function(item){    
    angular.forEach($scope.groups, function(item) {
      item.selected = false;
    });
    $scope.group = item;
    $scope.group.selected = true;
    $scope.filter = item.name;
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


  $scope.deleteItem = function(item){
    $scope.items.splice($scope.items.indexOf(item), 1);
    $scope.item = $filter('orderBy')($scope.items, 'first')[0];
    if($scope.item) $scope.item.selected = true;
  };

  $scope.createItem = function(){
    var item = {
      group: 'Friends',
      avatar:'img/a0.jpg'
    };
    $scope.items.push(item);
    $scope.selectItem(item);
    $scope.item.editing = true;
  };

  $scope.editItem = function(item){
    if(item && item.selected){
      item.editing = true;
    }
  };

  $scope.doneEditing = function(item){
    item.editing = false;
  };

}]);



app.controller('ScrollCtrl', ['$scope', '$http', '$filter', function($scope, $http, $filter) {
    $scope.scrollToProducts = function(){
       console.log('csada');
      $('html, body').animate({
        scrollTop: $("#ourProducts").offset().top -65
      }, 2000);
    
  };


}]);
app.controller('allcategoryCtrl', ['$scope', '$http', '$filter', function($scope, $http, $filter) {
    $http.get('data/allcategories.json').then(function (resp) {

    $scope.categories = resp.data.categories;
       console.log($scope.categories);

 //   console.log($scope.categories[0].details.type);

  });



}]);