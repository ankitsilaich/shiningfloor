app.controller('checkoutCtrl', ['$scope', '$http', '$stateParams', 'ngCart', '$filter', '$state', '$location', function($scope, $http, $stateParams, ngCart, $filter, $state, $location) {

	// $scope.userDetails = $scope.currentUserDetails;
	console.log($scope.currentUserDetails); 
	$scope.clickedMe = function(){
		alert('ssss');
	};
	$scope.orderSubmit = function(){
		if($scope.detailsForm.$invalid){
			console.log('invalid');
			return false;
		}
		else{
			
		}
	};
}]);