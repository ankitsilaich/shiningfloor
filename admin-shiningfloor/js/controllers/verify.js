app.controller('tableCtrl', ['$scope', '$http','$modal','$stateParams','$log','$filter','toaster', function($scope, $http, $modal, $stateParams,$log,$filter,toaster) {
    
   $http.get('api/shiningfloor.php/tenants').then(function (resp) {

  $scope.tenants = resp.data.aaData;
  console.log($scope.tenants);
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




 
 
    
 
   });
   $scope.verify = function(tenant){


$http.put('api/shiningfloor.php/tenantverify/'+tenant.id).
        success(function(data, status) {
        alert("verified");
           //toaster.pop('success','Update House', 'Successfully updated House');
          
          $scope.status = status;
          $scope.data = data;
          console.log($scope.data);
        }).
        error(function(data, status) {
          $scope.data = data || "Request failed";
          $scope.status = status;
      });



}
    
}]);
