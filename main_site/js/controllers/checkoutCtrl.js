app.controller('checkoutCtrl', ['$scope', '$http', '$stateParams', 'ngCart', '$filter', '$state', '$location', function($scope, $http, $stateParams, ngCart, $filter, $state, $location) {

	$scope.userDetails = $scope.currentUserDetails;
	console.log($scope.currentUserDetails); 

	$scope.orderSubmit = function(){
		return 0;
	}
}]);