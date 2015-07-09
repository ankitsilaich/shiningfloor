app.controller('tenantCtrl', ['$scope', '$http','$modal','$stateParams','$log','$filter','$state','toaster', '$timeout',function($scope, $http, $modal, $stateParams,$log,$filter,$state , toaster, $timeout) {
    var id = $stateParams.seller_id;
    $scope.url = id;
   $http.get('../api/slim.php/shiningfloor/sellers/'+id).then(function (resp) {

  $scope.seller = resp.data.seller_data;


$scope.deleteseller = function(){
     if (confirm("Are you sure you want to delete this Tenant") == true) {
      $http.delete('../api/slim.php/shiningfloor/admin/deleteseller/' +id).
            success(function(data, status) {
              toaster.pop('success', 'Seller Removed Succesfully', 'Redirecting to sellers page...');
               $timeout($scope.rediretToHome, 3000);
                // $scope.status = status;
                // $scope.data = data;
            });
    } else {}

    };
    $scope.rediretToHome = function(){
      $state.go('app.all.tenants');
    }
   $scope.findAndRemove = function(array, property, value) {
   $.each(array, function(index, result) {
      if(result[property] == value) {
          //Remove from array
          array.splice(index, 1);
      }
   });
};


    $scope.open = function (size) {
      var modalInstance = $modal.open({
        templateUrl: 'myModalContent.html',
        controller: 'ModalInstanceCtrl',
        size: size,
        resolve: {
          items: function () {
            return $scope.tenant;
          }
        }
      });

      modalInstance.result.then(function (selectedItem) {
        $scope.selected = selectedItem;
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };

   });

}]);
