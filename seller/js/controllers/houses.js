app.controller('houseviewCtrl', ['$scope', '$http', '$stateParams', '$modal', '$log','$filter', function($scope, $http, $stateParams, $modal, $log,$filter) {
    var id = $stateParams.house_id;
    $scope.url = id;
$scope.findAndRemove = function(array, property, value) {
   $.each(array, function(index, result) {
      if(result[property] == value) {
          //Remove from array
          array.splice(index, 1);
      }    
   });
};
$scope.deletesecurityhouse = function(deposit){
     if (confirm("Are you sure you want to delete this deposit") == true) {
      $http.delete('api/shiningfloor.php/securityhouse/' +deposit.id).
            success(function(data, status) {
               
                $scope.findAndRemove($scope.house.deposits,'id',deposit.id);
              //  $scope.tenant.deposits.splice(deposit.id,1);
            
               console.log($scope.tenant.deposits);
                $scope.status = status;
                $scope.data = data;

            });
    } else {
        
    }
        
         

        };
$scope.deletehousetenant = function(tenant){
     if (confirm("Are you sure you want to delete this tenant") == true) {
      $http.delete('api/shiningfloor.php/deletehousetenant/' +tenant.id).
            success(function(data, status) {
               
                $scope.findAndRemove($scope.house.tenants,'id',tenant.id);
              //  $scope.tenant.deposits.splice(deposit.id,1);
            
              // console.log($scope.tenant.deposits);
                $scope.status = status;
                $scope.data = data;

            });
    } else {
        
    }
        
         

        };
    $http.get('api/shiningfloor.php/houses/' + id).then(function(resp) {

        $scope.house = resp.data.aaData;
      console.log($scope.house.tenants);

    });
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
   $scope.Days = function (date) {
        var _date = $filter('date')(new Date(), 'yyyy-MM-dd');
      
       if(_date === undefined || date === undefined ){
                    
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
    console.log($scope.Days('2015-06-25'));
    $scope.payinstallment = function(deposit){
         $http.put('api/shiningfloor.php/houses/deposits/' + deposit.id).
            success(function(data, status) {
               
             
                
           deposit['status']=1;
               
                $scope.status = status;
                $scope.data = data;

            });

        };

    


    
 
    $scope.open = function(size, type) {

        $scope.house['type'] = type;
        switch (type) {
            case 'rent':
                $scope.house['dateto_update'] = $scope.house.house_entry_date;
                break;
            case 'electricity':
                $scope.house['dateto_update'] = $scope.house.house_powerbilldate;
                break;
            case 'dth':
                $scope.house['dateto_update'] = $scope.house.house_dthbilldate;
                break;
            case 'wifi':
                $scope.house['dateto_update'] = $scope.house.house_wifibilldate;
                break;
        }

        console.log($scope.house);
        var modalInstance = $modal.open({
            templateUrl: 'myModalContent.html',
            controller: 'ModalInstanceCtrl',
            size: size,
            resolve: {
                items: function() {
                    return $scope.house;
                },
                type: function() {
                    return type;
                }

            }
        });

        modalInstance.result.then(function(selectedItem) {
            $scope.selected = selectedItem;
        }, function() {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };
    $scope.openownerform = function(size) {

        var modalInstancenew = $modal.open({
            templateUrl: 'myhouseContent.html',
            controller: 'ownerInstanceCtrl',
            size: size,
            resolve: {
                items: function() {
                    return $scope.house;
                }

            }
        });
        modalInstancenew.result.then(function(selectedItem) {
            $scope.selected = selectedItem;
        }, function() {
            $log.info('Modal dismissed at: ' + new Date());
        });

    };
    $scope.addnewInstallment = function(size) {

        var modalInstancenew = $modal.open({
            templateUrl: 'myinstallmentContent.html',
            controller: 'installmentInstanceCtrl',
            size: size,
            resolve: {
                items: function() {
                    return $scope.house;
                }

            }
        });
        modalInstancenew.result.then(function(selectedItem) {
            $scope.selected = selectedItem;
        }, function() {
            $log.info('Modal dismissed at: ' + new Date());
        });

    };
    $scope.openownerselect = function(size) {

        var modalInstancenew = $modal.open({
            templateUrl: 'ownerselect.html',
            controller: 'selectownerInstanceCtrl',
            size: size,
            resolve: {
                items: function() {
                    return $scope.house;
                }

            }
        });
        modalInstancenew.result.then(function(selectedItem) {
            $scope.selected = selectedItem;
        }, function() {
            $log.info('Modal dismissed at: ' + new Date());
        });

    };
    $scope.opentenantselect = function(size) {

        var modalInstancenew = $modal.open({
            templateUrl: 'tenantselect.html',
            controller: 'selecttenantInstanceCtrl',
            size: size,
            resolve: {
                items: function() {
                    return $scope.house;
                },
                tenants: function() {
                    return $scope.tenants;
                },
                tenantshow: function() {
                    return $scope.tenantshow;
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
app.controller('ModalInstanceCtrl', ['$scope', '$modalInstance', '$http', 'items', 'type', function($scope, $modalInstance, $http, items, type) {
    $scope.items = items;
    $scope.selected = {
        item: $scope.items[0]
    };

    $scope.ok = function() {
        var currentdate = $scope.items.dateto_update;
        var test = currentdate.split("-");
        var newmonth = test[1];
        var newyear = test[2];
        if (newmonth < 12) {
            newmonth++;

            ;
        } else {
            var newmonth = 1;
            newyear++;
        }
        var newdate = test[0] + "-" + newmonth + "-" + newyear;
        $scope.items.entry_date = newdate;
         switch (items.type) {
            case 'rent':
                $scope.items['house_entry_date'] = newdate;
                break;
            case 'electricity':
                $scope.items['house_powerbilldate'] = newdate;
                break;
            case 'dth':
                $scope.items['house_dthbilldate'] = newdate;
                break;
            case 'wifi':
                $scope.items['house_wifibilldate'] = newdate;
                break;
        }




        //$scope.items['_METHOD'] = "PUT";
        $http.put('api/shiningfloor.php/houses/' + items.type + '/' + items.house_id, items).
        success(function(data, status) {
            $modalInstance.close($scope.selected.item);

            //toaster.pop('success', 'Add Tenant', 'Successfully added New Tenant');
            $scope.status = status;
            $scope.data = data;
            console.log($scope.data);
        }).
        error(function(data, status) {
            $scope.data = data || "Request failed";
            $scope.status = status;
        });

    };

    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    };
}]);
app.controller('ownerInstanceCtrl', ['$scope', '$modalInstance', '$http', 'items', 'toaster', function($scope, $modalInstance, $http, items, toaster) {
    $scope.items = items;
    $scope.house = items;

    $scope.ok = function(owner) {
        $http.post('api/shiningfloor.php/owners', owner).
        success(function(data, status) {



            $scope.data = data;
            items['owners_id'] = data;
            $http.put('api/shiningfloor.php/houses/owner/' + items.house_id, items).
            success(function(data, status) {
                $modalInstance.close();
                console.log($scope.house)
                $scope.house['house_owner'] = {
                    name: owner.owner_name,
                    address: owner.owner_address,
                    phone: owner.owner_phone,
                    email: owner.owner_email

                };

                toaster.pop('success', 'Add Tenant', 'Successfully added House Owner');
                $scope.status = status;
                $scope.data = data;

            });

        });



    };

    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    };
}]);
app.controller('selectownerInstanceCtrl', ['$scope', '$modalInstance', '$http', 'items', 'toaster', function($scope, $modalInstance, $http, items, toaster) {
    $scope.items = items;
    $scope.house = items;

    console.log($scope.house);


    $scope.ok = function(owner) {
        $http.post('api/shiningfloor.php/owners', owner).
        success(function(data, status) {



            $scope.data = data;
            items['owners_id'] = data;
            $http.put('api/shiningfloor.php/houses/owner/' + items.house_id, items).
            success(function(data, status) {
                $modalInstance.close();
                console.log($scope.house)
                $scope.house['house_owner'] = {
                    name: owner.owner_name,
                    address: owner.owner_address,
                    phone: owner.owner_phone,
                    email: owner.owner_email

                };

                toaster.pop('success', 'Add Tenant', 'Successfully added House Owner');
                $scope.status = status;
                $scope.data = data;

            });

        });



    };
    $scope.searchowners = function(query) {


        $http.get('api/shiningfloor.php/owners/search/' + query).
        success(function(data, status) {

            $scope.results = data.aaData;
            console.log($scope.results)



        });



    };
    $scope.sethouseowner = function(result) {
        var details = {
            owners_id: result.id
        }
        $http.put('api/shiningfloor.php/houses/owner/' + items.house_id, details).
        success(function(data, status) {
            $modalInstance.close();
            console.log($scope.house)
            $scope.house['house_owner'] = {
                name: result.name,
                address: result.address,
                phone: result.phone,
                email: result.email

            };
        });


    };


    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    };
}]);
app.controller('selecttenantInstanceCtrl', ['$scope', '$modalInstance', '$http', 'items', 'toaster', 'tenants', function($scope, $modalInstance, $http, items, toaster, tenants) {
    $scope.items = items;
    $scope.house = items;
    $scope.tenants = tenants;



    $scope.searchowners = function(query) {
        var toomit = [];
        angular.forEach($scope.house.tenants, function(value, key) {
            toomit.push(value.id);

        });
        $http.get('api/shiningfloor.php/tenants/search/' + query).
        success(function(data, status) {

            $scope.results = data.aaData;
            console.log(toomit);
            for (var i = 0; i < $scope.results.length; i++) {
                var obj = $scope.results[i];

                if (toomit.indexOf(obj.id) !== -1) {

                    $scope.results.splice(i, 1);
                    i--;
                }
            }
        });


    };
    $scope.sethouseowner = function(result) {
        
        var details = {
            tenants_id: result.id,
            houses_id: items.house_id
        }
        var tenant = {
            id: result.id,
            name: result.name,
            address: result.address,
            phone: result.phone,
            company: result.company

        };
        
      



         $http.post('api/shiningfloor.php/houses_tenants',details).
          success(function(data, status) {
            $modalInstance.close();
           console.log("reached here");
        $scope.house.tenants.push(tenant);
  console.log($scope.house.tenants);
        }); 


    };


    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    };
}]);
app.controller('installmentInstanceCtrl', ['$scope', '$modalInstance', '$http', 'items', 'toaster', function($scope, $modalInstance, $http, items, toaster) {
    $scope.items = items;
    $scope.house = items;

    $scope.ok = function(installment) {

        var installment = {
            
                          rent : installment.rent,
                          date: $('#installment_date').val(),
                          status: '0'

        }
      
        console.log($scope.house);

        $http.post('api/shiningfloor.php/deposits', installment).
        success(function(data, status) {



            $scope.data = data;
           installment['id'] = data;
           var detail={
            houses_id :items.house_id,
            deposits_id: data 
           }
           console.log(installment);
            $http.post('api/shiningfloor.php/houses_deposits', detail).
            success(function(data, status) {
                $modalInstance.close();
                   $scope.house['deposits'].push(installment);
                
                toaster.pop('success', 'Add Tenant', 'Successfully added House Owner');
                $scope.status = status;
                $scope.data = data;

            });

        });



    };

    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    };
}]);