'use strict';

/**
 * Config for the router
 */
angular.module('app')
  .run(
    [          '$rootScope', '$state', '$stateParams',
      function ($rootScope,   $state,   $stateParams) {
        
          $rootScope.$state = $state;
          $rootScope.$stateParams = $stateParams;   
          $rootScope.$on('$stateChangeSuccess',
  function(event, toState, toParams, fromState, fromParams) {
    console.log("fdsfdsfsf");
    $rootScope.currentstate = toState;
  }
)         
      }
    ]
  )
  .config(
    [          '$stateProvider', '$urlRouterProvider',
      function ($stateProvider,   $urlRouterProvider) {
          
          $urlRouterProvider
              .otherwise('/shiningFloor/home');
          $stateProvider
              .state('app', {
                  abstract: true,
                  url: '/shiningFloor',
                  template : '<div ui-view></div>',

                  resolve: {
                      deps: ['$ocLazyLoad', 'uiLoad',
                        function( $ocLazyLoad, uiLoad ){
                          return uiLoad.load(
                            [ 
                              
                              'js/others/jquery.elevatezoom.js',

                              'js/others/jquery.cookie.js',
                              'js/others/jquery.slimscroll.min.js',
                              'js/others/jquery.touchSwipe.min.js',
                              'js/others/bootstrap.js'                              
                             
                              
                              ]
                          )
                      }]
                  }
              })
              .state('app.home', {
                  url: '/home',
                  templateUrl: 'tpl/app.html',
                    resolve: {
                      deps: ['$ocLazyLoad', 'uiLoad',
                        function( $ocLazyLoad, uiLoad ){
                          return uiLoad.load(
                            [ 
                              'js/controllers/index.filterCtrl.js',
                             
                              'js/others/app.js'
                              ]
                          )
                      }]
                  }
                    
                 
                  
              })
              .state('app.products', {
                 abstract: true,
                  url: '/products',
                  template: '<div ui-view></div>',

                  resolve: {
                      deps: ['$ocLazyLoad', 'uiLoad',
                        function( $ocLazyLoad, uiLoad ){
                          return uiLoad.load(
                            [
                              'js/controllers/index.filterCtrl.js',                              
                              'js/controllers/productpageCtrl.js',

                              'js/others/bootstrap.js'
                              ]
                          ).then(
                            function(){
                              return $ocLazyLoad.load('ui.calendar');
                            }
                          )
                      }]
                  }
                    
                 
                  
              })
              .state('app.products.type', {
                  url: '/:routeId',
                  templateUrl: 'tpl/products.html',
                 
                  resolve: {
                    
                      deps: ['$ocLazyLoad', 'uiLoad',
                        function( $ocLazyLoad, uiLoad ){
                          return uiLoad.load(
                            [
                              'js/controllers/index.filterCtrl.js',
                              'js/controllers/productpageCtrl.js'
                              
                              ]
                          ).then(
                            function(){
                              return $ocLazyLoad.load('ui.calendar');
                            }
                          )
                      }]
                  }                  
              })

              .state('app.search', {
                
                  url: '/search',
                   template: '<div ui-view></div>',

                  resolve: {
                      deps: ['$ocLazyLoad', 'uiLoad',
                        function( $ocLazyLoad, uiLoad ){
                          return uiLoad.load(
                            [
                                
                              'js/controllers/searchPageCtrl.js'  ,
                              'js/controllers/index.filterCtrl.js'    ,
                              'js/others/search.js'   
                                                   
                              ]
                          )
                      }]
                  }
                  
              })

              .state('app.search.type', {
                  url: '/:routeId',
                  templateUrl : 'tpl/search.html',
                
                 
                  resolve: {
                    
                      deps: ['$ocLazyLoad', 'uiLoad',
                        function( $ocLazyLoad, uiLoad ){
                          return uiLoad.load(
                            [
                            'js/controllers/index.filterCtrl.js'    ,
                              'js/controllers/searchPageCtrl.js'
                              
                              ]
                          )
                      }]
                  }                  
              })


              
      }
    ]
  );