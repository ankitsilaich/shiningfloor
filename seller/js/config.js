// config

var app =  
angular.module('app')
  .config(
    [        '$controllerProvider', '$compileProvider', '$filterProvider', '$provide',
    function ($controllerProvider,   $compileProvider,   $filterProvider,   $provide) {
        
        // lazy controller, directive and service
        app.controller = $controllerProvider.register;
        app.directive  = $compileProvider.directive;
        app.filter     = $filterProvider.register;
        app.factory    = $provide.factory;
        app.service    = $provide.service;
        app.constant   = $provide.constant;
        app.value      = $provide.value;
    }
  ])
  .config(['$translateProvider', function($translateProvider){
    // Register a loader for the static files
    // So, the module will search missing translation tables under the specified urls.
    // Those urls are [prefix][langKey][suffix].
    $translateProvider.useStaticFilesLoader({
      prefix: 'l10n/',
      suffix: '.js'
    });
    // Tell the module what language to use by default
    $translateProvider.preferredLanguage('en');
    // Tell the module to store the language in the local storage
    $translateProvider.useLocalStorage();
  }])
  .factory('Subject', ['$resource', function($resource) {
return $resource('api/index.php/subject/:subject_id', null,
    {
        'update': { method:'PUT' }
    });
}])
.factory('LoginService', ['$http', '$location', '$rootScope', function($http,$location, $rootScope){
  return {
    login: function(user, scope){
      // console.log(user);
      $rootScope.processGoingOn = true;
      return $http.post('../api/slim.php/auth/process/seller', user).then(function(msg) {
                var responseData = msg.data;
        console.log(responseData);
        if(responseData['login_success'] == 'true'){
         // console.log(responseData);
          $rootScope.isLoggedIn = true;                    
          $rootScope.processGoingOn = false;
//          $('#login-modal').modal('hide');
//          $location.path('/home');
            return;
        }
        else{
          $rootScope.isLoggedIn = false;
          $rootScope.processGoingOn = false;
//          alert(responseData['message']);
         // $location.path('/access/signin');
          scope.user = ""; 
          return;
        }
        
      });
    },
    logout: function(){
      console.log('logout me');
     var $promise = SessionService.destroy('seller');
      $promise.then(function(){
        $rootScope.isLoggedIn = false;
        $rootScope.loggedInUserDetails = "";
        $rootScope.loggedInUser = "";
        
        $location.path('/access/signin');
      });
    },
    isLoggedIn: function(){

     var $checkSessionServer = $http.get('../api/slim.php/auth/process/seller');
    
      return $checkSessionServer;
    }
  }
}])
