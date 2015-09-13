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
.factory('LoginService', ['$http', '$location', '$rootScope', function($http,$location, $rootScope){
  return {
    login: function(user, scope){
      $rootScope.processGoingOn = true;
      return $http.post('../api/slim.php/auth/process/user', user).then(function(msg) {
        var responseData = msg.data;
        console.log(responseData);
        if(responseData['login_success'] == 'true'){
          $rootScope.isLoggedIn = true;            
          $rootScope.loggedInUser = responseData['login_attempt_by'];                 
          return $http.get('../api/slim.php//buildcorner/user/info').then(function(resp){
            $rootScope.loggedInUserDetails = resp.data.user_data;                              
            console.log($rootScope.loggedInUserDetails);                              
              $rootScope.processGoingOn = false;
                return;
          });  
        }
        else{
          $rootScope.isLoggedIn = false;
          $rootScope.processGoingOn = false;
          scope.user = ""; 
          return;
        }
        
      });
    },
    logout: function(){
      console.log('logout user');
     // var $promise = SessionService.destroy('user');
   
      //$promise.then(function(){
          $rootScope.isLoggedIn = false;
          $rootScope.loggedInUser = "";
         $rootScope.loggedInUserDetails="";
     // });
    },
    isLoggedIn: function(){

     var $checkSessionServer = $http.get('../api/slim.php/auth/process/user');
        return $checkSessionServer;
      // return true;
    }

  }
}])
