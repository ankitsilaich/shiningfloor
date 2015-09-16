app.controller('contactusCtrl', ['$scope', '$http', '$filter', '$location', '$rootScope','LoginService', '$state',function($scope, $http, $filter, $location,$rootScope,LoginService,$state) {
     $scope.contactQuery = function(userInfo){
    
      var form_data = {'name':userInfo.name , 'email': userInfo.email,'phone':userInfo.phone, 'msg': userInfo.msg};
      if(userInfo.name&&userInfo.email&&userInfo.phone){
        $http.post("../api/slim.php/shiningfloor/contactus",form_data).success(function(resp){
          console.log(resp);
            if(resp ==='success'){
               $scope.contactusResp = "Thanks, We will contact you soon!";
               // $scope.person = {};
            }
            else{ 
            }
        });
      }
  }

}]);
