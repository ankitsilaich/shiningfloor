'use strict';

/* Controllers */

  // Form controller
app.controller('FormDemoCtrl', ['$scope','$http','toaster','$timeout' ,'$state',  function($scope,$http,toaster , $timeout , $state) {

    $scope.submitform = function(seller){

       var defaulseller = {
              name : "",
              address : "",
              phone: "",
              email: "",
              storename :"",
              comments:""
          };

   $http.post('../main_site/api/slim.php/shiningfloor/sellers',seller).
        success(function(data, status) {
            toaster.pop('success', 'Successfully added', 'Redirecting to all sellers ...');
          $scope.status = status;
          $scope.data = data;
          console.log($scope.data);
          $timeout($scope.rediretToHome, 3000);
        });


    };
    $scope.rediretToHome = function(){
      $state.go('app.all.tenants');
    }

   }

]);
