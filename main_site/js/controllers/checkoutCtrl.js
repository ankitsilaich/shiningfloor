app.controller('checkoutCtrl', ['$scope', '$http', '$stateParams', 'ngCart', '$filter', '$state', '$location', function($scope, $http, $stateParams, ngCart, $filter, $state, $location) {
// $indian_states = ['Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Goa','Gujarat','Haryana','Himachal Pradesh','Jammu & Kashmir','Jharkhand','Karnataka','Kerala','Madhya Pradesh','Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Punjab','Rajasthan','Sikkim','Tamil Nadu','Tripura','Uttarakhand','Uttar Pradesh','West Bengal','Andaman & Nicobar','Chandigarh','Dadra and Nagar Haveli','Daman & Diu','Delhi','Lakshadweep','Puducherry'];
$scope.cities = ['Noida','Delhi NCR' , 'East Delhi' , 'New Delhi' , 'North Delhi'  , 'South Delhi' ,  'West Delhi']; 	

	// $scope.userDetails = $scope.currentUserDetails;
	console.log($scope.currentUserDetails); 
	$scope.clickedMe = function(){
		alert('ssss');
	};
	
if($scope.currentUser){
  $http.get('../api/slim.php//buildcorner/user/info').then(function(resp){
    console.log(resp);
    $scope.currentUserDetails = resp.data.user_data;
    $scope.currentUserDetails.timeSlot= "04-06 pm";
  }); 

}
$scope.currentUserDetails.prefereddate = "";
$scope.currentUserDetails.landmark = "";
$scope.currentUserDetails.phone2 = ""; 	
 $scope.today = function() {
    $scope.dt = new Date();
  };
  $scope.today();

  $scope.clear = function () {
    $scope.dt = null;
  };

  // Disable weekend selection
  $scope.disabled = function(date, mode) {
    return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
  };

  $scope.toggleMin = function() {
    $scope.minDate = $scope.minDate ? null : new Date();
  };
  $scope.toggleMin();
  $scope.maxDate = new Date(2020, 5, 22);

  $scope.open = function($event) {
    $scope.status.opened = true;
  };

  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
  };

  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];

  $scope.status = {
    opened: false
  };

  var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  var afterTomorrow = new Date();
  afterTomorrow.setDate(tomorrow.getDate() + 2);
  $scope.events =
    [
      {
        date: tomorrow,
        status: 'full'
      },
      {
        date: afterTomorrow,
        status: 'partially'
      }
    ];

  $scope.getDayClass = function(date, mode) {
    if (mode === 'day') {
      var dayToCheck = new Date(date).setHours(0,0,0,0);

      for (var i=0;i<$scope.events.length;i++){
        var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

        if (dayToCheck === currentDay) {
          return $scope.events[i].status;
        }
      }
    }

    return '';
  };

	$scope.orderSubmit = function(userDetails){
		if($scope.detailsForm.$invalid){
			console.log('invalid');
			return false;
		}
		else{
      $scope.yyyymmdd = function(d) {
         var yyyy = d.getFullYear().toString();
         var mm = (d.getMonth()+1).toString(); // getMonth() is zero-based
         var dd  = d.getDate().toString();
         return yyyy + '-'+(mm[1]?mm:"0"+mm[0]) +'-'+ (dd[1]?dd:"0"+dd[0]); // padding
        };
         
      userDetails.prefereddate  = $scope.yyyymmdd(userDetails.prefereddate) ;     
      console.log(userDetails.prefereddate);

			var orderDetails = {'userInfo':userDetails , 'items':ngCart.getItems(),'orderTotal':ngCart.totalCost()};
			$http.post('../api/slim.php/buildcorner/submitOrder', orderDetails).success(function(data, status) {
        console.log(data);

        if(data.orderStatus=='success'){
          ngCart.empty();
          console.log('order done');
          $scope.showLoader = false;
          $scope.showpopupSuccess = true;
        }
			});
		}
	};
}]);