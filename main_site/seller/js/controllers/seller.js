app.controller('tenantCtrl', ['$scope', '$http','$modal','$stateParams','$log','$filter','$state', function($scope, $http, $modal, $stateParams,$log,$filter,$state) {
//    var id = $stateParams.seller_id;
//    $scope.url = id;
   $http.get('../api/slim.php/shiningfloor/seller/info').then(function (resp) {

  $scope.seller = resp.data.seller_data;
  
   
$scope.deleteseller = function(){
     if (confirm("Are you sure you want to delete this Tenant") == true) {
      $http.delete('api/homigo.php/tenants/' +id).
            success(function(data, status) {
               
            
                $state.go('app.all.tenants');
           
               
                $scope.status = status;
                $scope.data = data;

            });
    } else {
        
    }};
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
$scope.addnewInstallment = function(size) {

        var modalInstancenew = $modal.open({
            templateUrl: 'myinstallmentContent.html',
            controller: 'installmentInstanceCtrl',
            size: size,
            resolve: {
                items: function() {
                    return $scope.tenant;
                }

            }
        });
        modalInstancenew.result.then(function(selectedItem) {
            $scope.selected = selectedItem;
        }, function() {
            $log.info('Modal dismissed at: ' + new Date());
        });

    };
}]);
 