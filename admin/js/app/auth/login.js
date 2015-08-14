app.controller('loginCtrl', ['$scope', 'LoginService', '$rootScope','$location', function($scope, LoginService, $rootScope, $location){
	$scope.cU = function(){
		$scope.cP = $location.$$path.split('/')[1];
	}
	$scope.logginGoingOn = false;
	$scope.loginReturn = "";
	$scope.login = function(user){
		if(!$rootScope.isLoggedIn) {
			LoginService.login(user, $scope);
			$scope.user = "";
		}
		else $location.path('/home');
	}
	$scope.logout = function(){
		LoginService.logout();
	}
}]);