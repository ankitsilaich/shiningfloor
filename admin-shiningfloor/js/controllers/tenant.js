app.controller('tenantCtrl', ['$scope', '$http','$modal','$stateParams','$log','$filter','$state', function($scope, $http, $modal, $stateParams,$log,$filter,$state) {
    var id = $stateParams.seller_id;
    $scope.url = id;
   $http.get('api/shiningfloor.php/sellers/'+id).then(function (resp) {

  $scope.seller = resp.data.aaData;
  
  $scope.Days = function (date) {

       var _date = $filter('date')(new Date(), 'yyyy-MM-dd');
     
       if(_date === undefined || date === undefined){
                    
                }else{

         var dt1 = _date.split('-'),
            dt2 = date.split('-');

           var  one = new Date(dt1[0], dt1[1], dt1[2]),
            two = new Date(dt2[0], dt2[1], dt2[2]);

        
        var millisecondsPerDay = 1000 * 60 * 60 * 24;
        var millisBetween = two.getTime() - one.getTime();
        var days = millisBetween / millisecondsPerDay;
    
        return Math.floor(days); }     
    };

 $scope.totaldepositpaid = function (data) {
    if(data != undefined){
     var total = 0;
    for(var i = 0; i < data.length; i++){
        var product = data[i];
        if(product.status == '1'){
        total += parseInt(product.rent);}
    }    }
    return total;
    };

 $scope.payinstallment = function(deposit){
         $http.put('api/homigo.php/tenants/deposits/' + deposit.id).
            success(function(data, status) {
               
             
                
           deposit['status']=1;
               
                $scope.status = status;
                $scope.data = data;

            });

        };
$scope.deletetenant = function(){
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
$scope.deletesecuritydeposit = function(deposit){
     if (confirm("Are you sure you want to delete this deposit") == true) {
      $http.delete('api/homigo.php/securitytenant/' +deposit.id).
            success(function(data, status) {
               
                $scope.findAndRemove($scope.tenant.deposits,'id',deposit.id);
              //  $scope.tenant.deposits.splice(deposit.id,1);
            
               console.log($scope.tenant.deposits);
                $scope.status = status;
                $scope.data = data;

            });
    } else {
        
    }
        
         

        };

    


    
 
    

 // $scope.tenants = $scope.house.tenants;
  


 
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
app.controller('ModalInstanceCtrl', ['$scope', '$modalInstance','$http', 'items', function($scope, $modalInstance,$http, items) {
    $scope.items = items;
    $scope.selected = {
      item: $scope.items[0]
    };

    $scope.ok = function () {
       var currentdate =  $scope.items.entry_date;
       var test =  currentdate.split("-");
        var newmonth=test[1];
        var newyear = test[2];
       if(newmonth<12){
        newmonth++;
        
     ;}else{
        var newmonth= 1;
        newyear++;
      }
       var newdate = test[0] +"-"+newmonth+"-"+newyear;
       $scope.items.entry_date = newdate;
      
       //$scope.items['_METHOD'] = "PUT";
       $http.put('api/homigo.php/tenants/'+items.id,items).
        success(function(data, status) {
           $modalInstance.close($scope.selected.item);

            //toaster.pop('success', 'Add Tenant', 'Successfully added New Tenant');
          $scope.status = status;
          $scope.data = data;
          //console.log($scope.data);
        }).
        error(function(data, status) {
          $scope.data = data || "Request failed";
          $scope.status = status;
      });
     
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  }])
  ; 
  app.controller('installmentInstanceCtrl', ['$scope', '$modalInstance', '$http', 'items', function($scope, $modalInstance, $http, items) {
    $scope.items = items;
    $scope.tenant = items;
    //console.log()

    $scope.ok = function(installment) {

        var installment = {
            
                          rent : installment.rent,
                          date: $('#installment_date').val(),
                          status: '0'

        }
      
        //console.log($scope.house);

        $http.post('api/homigo.php/deposits', installment).
        success(function(data, status) {



            $scope.data = data;
           installment['id'] = data;
           var detail={
            tenants_id :items.id,
            deposits_id: data 
           }
          // console.log(installment);
            $http.post('api/homigo.php/tenants_deposits', detail).
            success(function(data, status) {
                $modalInstance.close();
                   $scope.tenant['deposits'].push(installment);
               // console.log($scope.tenant);
               // toaster.pop('success', 'Add Tenant', 'Successfully added House Owner');
                $scope.status = status;
                $scope.data = data;

            });

        });



    };

    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    };
}]);