'use strict';

/* Controllers */

  // Form controller
app.controller('FormDemoCtrl', ['$scope','$http','toaster', function($scope,$http,toaster) {

    $scope.submitform = function(seller){

       var defaulseller = {
              name : "",
              address : "",
              phone: "",
              email: "",
              storename :"",
              comments:""
          };

   $http.post('../api/slim.php/shiningfloor/admin/addseller',seller).
        success(function(data, status) {
            toaster.pop('success', 'Add seller', 'Successfully added New Seller');
          $scope.status = status;
          $scope.data = data;
          console.log($scope.data);
        });


    };

   }

]);
