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
    case "3":
      $scope.selectedType = 'marble';
      break;
    case "4":
      $scope.selectedType = 'stone';
      break;
    case "5":
      $scope.selectedType = 'wallpaper';
      break;
    case "6":
      $scope.selectedType = 'artificial';
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

// $http.get('../api/slim.php/shiningfloor/'+$scope.selectedType + '/brands').then(function(resp) {
//     $scope.brands = resp.data.brands;
    
//     if(!$scope.$$phase) {
//       $scope.$apply();
//     }
//   });

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
$scope.product_types = [{'value':'1','name':'Tile'},{'value':'2','name':'Wood'},{'value':'3','name':'Marble'},{'value':'4','name':'Stone'},{'value':'5','name':'Wallpaper'},{'value': '6','name':'Artificial'}];


$scope.product= {"name":"" , "type":"1" ,"brand":"" ,"material":"" ,"application":"" ,"look":"" ,"size":"" ,"finish_type":"", "url":"",
"price":"0","items_per_box":"0" ,"minimum_boxes":"0", "seller_product_code":"0", "image":"" ,"comments":"" ,"features":""} ;

$http.get('../api/slim.php/shiningfloor/'+$scope.selectedType + '/brands').then(function(resp) {
    $scope.brands = resp.data.brands;
    $scope.totalBrands = $scope.brands.length;
});

$scope.addNewBrandInList = function(){
  // if($scope.product.brand!=''){
  //     $scope.brands[$scope.totalBrands] = $scope.product.brand;
  // }
  // console.log(JSON.stringify($scope.brands));
};
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

$http.get('../api/slim.php/shiningfloor/applications').then(function(resp) {
    $scope.applications = resp.data.applications;
    function suggest_application(term) {
      var q = term.toLowerCase().trim();
      var results = [];
      for (var i = 0; i < $scope.applications.length && results.length < 10; i++) {
        var state = $scope.applications[i];

        if (state.toLowerCase().indexOf(q) === 0)
          results.push({
            label: state ,  value: state });
      }
      return results;
    }
    $scope.application_options = {
      suggest: suggest_application
    };

});

$http.get('../api/slim.php/shiningfloor/materials').then(function(resp) {
    $scope.materials = resp.data.materials;
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

});

$http.get('../api/slim.php/shiningfloor/finish_types').then(function(resp) {
    $scope.finish_types = resp.data.finish_types;
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
});

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
          return this.queue.length < 10;
      }
  });

  // CALLBACKS

  uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
      console.info('onWhenAddingFileFailed', item, filter, options);
  };
  uploader.onAfterAddingFile = function(fileItem) {
      console.info('onAfterAddingFile', fileItem);
  };
  uploader.onAfterAddingAll = function(addedFileItems) {
      console.info('onAfterAddingAll', addedFileItems);
  };
  uploader.onBeforeUploadItem = function(item) {
      console.info('onBeforeUploadItem', item);
  };
  uploader.onProgressItem = function(fileItem, progress) {
      console.info('onProgressItem', fileItem, progress);
  };
  uploader.onProgressAll = function(progress) {
      console.info('onProgressAll', progress);
  };
  uploader.onSuccessItem = function(fileItem, response, status, headers) {
      console.info('onSuccessItem', fileItem, response, status, headers);
  };
  uploader.onErrorItem = function(fileItem, response, status, headers) {
      console.info('onErrorItem', fileItem, response, status, headers);
  };
  uploader.onCancelItem = function(fileItem, response, status, headers) {
      console.info('onCancelItem', fileItem, response, status, headers);
  };
  uploader.onCompleteItem = function(fileItem, response, status, headers) {
      console.info('onCompleteItem', fileItem, response, status, headers);
  };
  uploader.onCompleteAll = function() {
      console.info('onCompleteAll');
  };

  console.info('uploader', uploader);

  $scope.submitform = function(product){
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
