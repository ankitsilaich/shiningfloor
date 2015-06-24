app.controller('deadlineCtrl', ['$scope', '$http','$modal','$stateParams','$log','$filter', function($scope, $http, $modal, $stateParams,$log,$filter) {

    var id = $stateParams.tenant_id;
    $scope.url = id;
   $http.get('api/shiningfloor.php/tenants').then(function (resp) {

  $scope.tenants = resp.data.aaData;
  $scope.Days = function (date) {

       var _date = $filter('date')(new Date(), 'yyyy-MM-dd');
       console.log(_date);
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
}]);
