'use strict';

/**
 * Config for the router
 */
angular.module('app')
  .run(
    [          '$rootScope', '$state', '$stateParams','LoginService','$http','$location',
      function ($rootScope,   $state,   $stateParams,LoginService,$http,$location) {

          $rootScope.$state = $state;
          $rootScope.$stateParams = $stateParams;
          $rootScope.isLoggedIn = false;
          $rootScope.loggedInUser = "";
          $rootScope.loggedInUserDetails = "";
          $rootScope.processGoingOn = false;
          // var routesPermission = ['/userAccount'];
          
          // $rootScope.setUserDetails = function(){
            //   var connected = LoginService.isLoggedIn();
            //   connected.then(function(msg){
            //   if(msg.data){
            //     console.log('connected');
            //     $rootScope.isLoggedIn = true;
            //     $rootScope.loggedInUser = msg.data ;                 
            //     return $http.get('../api/slim.php//buildcorner/user/info').then(function(resp){
            //       $rootScope.loggedInUserDetails = resp.data.user_data;   
            //       console.log(resp.data.user_data);                
            //       return;
            //     }); 
            //   }              
            // });
          // };
          $rootScope.$on('$stateChangeStart', function() { 
              var connected = LoginService.isLoggedIn();
              connected.then(function(msg){
                if(msg.data){
                  console.log('connected');
                  $rootScope.isLoggedIn = true;
                  $rootScope.loggedInUser = msg.data ;

                  var userData = LoginService.getloginData();  
                  userData.success(function(resp){
                    console.log(resp);
                      $rootScope.loggedInUserDetails = resp.user_data;                              
                      console.log($rootScope.loggedInUserDetails);                              
                      $rootScope.processGoingOn = false;
                      return;
                  });
                 }      
                }); 
              
           });

          $rootScope.$on('$stateChangeSuccess',  function(event, toState, toParams, fromState, fromParams) {
            document.body.scrollTop = document.documentElement.scrollTop = 0;
            console.log(event);
            $rootScope.currentstate = toState;
          });
      }
    ]
  )
  .config(
    [          '$stateProvider', '$urlRouterProvider',
      function ($stateProvider,   $urlRouterProvider) {

          $urlRouterProvider
              .otherwise('/Buildcorner/home');
          $stateProvider
              .state('app', {
                  abstract: true,
                  url: '/Buildcorner',
                  template : '<div ui-view></div>',

                  resolve: {
                      deps: ['$ocLazyLoad', 'uiLoad',
                        function( $ocLazyLoad, uiLoad ){
                          return uiLoad.load(
                            [

                              'js/others/jquery.elevatezoom.min.js',
                              'js/others/header.js'

                              ]
                          )
                      }]
                  }
              })
              .state('app.home', {

                  templateUrl: 'tpl/app.html',
                    resolve: {
                      deps: ['$ocLazyLoad', 'uiLoad',
                        function( $ocLazyLoad, uiLoad ){
                          return uiLoad.load(
                            [
                              'js/controllers/index.filterCtrl.js',
                              'js/controllers/loginCtrl.js'

                              ]
                          )
                      }]
                  }



              })
               .state('app.home.site', {
                  url: '/home',
                  templateUrl: 'tpl/index.html',
                    resolve: {
                      deps: ['$ocLazyLoad', 'uiLoad',
                        function( $ocLazyLoad, uiLoad ){
                          return uiLoad.load(
                            [
                              'js/controllers/index.filterCtrl.js',


                              ]
                          )
                      }]
                  }



              })
               .state('app.home.cart', {
                  url: '/shoppingcart',
                  templateUrl: 'tpl/cart.html',
                    resolve: {
                      deps: ['$ocLazyLoad', 'uiLoad',
                        function( $ocLazyLoad, uiLoad ){
                          return uiLoad.load(
                            [
                              'js/controllers/index.filterCtrl.js',
                              'js/controllers/cartcontroller.js'


                              ]
                          )
                      }]
                  }



              })
              .state('app.home.contact', {
                 url: '/contacts',
                 templateUrl: 'tpl/contact.html',
                   resolve: {
                     deps: ['$ocLazyLoad', 'uiLoad',
                       function( $ocLazyLoad, uiLoad ){
                         return uiLoad.load(
                           [
                              'https://maps.googleapis.com/maps/api/js?callback=initialize',
                              'js/others/contact.js'


                             ]
                         )
                     }]
                 }



             })
             .state('app.home.faq', {
                url: '/faqs',
                templateUrl: 'tpl/faq.html',
                  resolve: {
                    deps: ['$ocLazyLoad', 'uiLoad',
                      function( $ocLazyLoad, uiLoad ){
                        return uiLoad.load(
                          [
                            'css/faq.css',
                             'js/others/faq.js'


                            ]
                        )
                    }]
                }



            })
              .state('app.home.checkout', {
                 url: '/checkout',
                 templateUrl: 'tpl/checkout.html',
                   resolve: {
                     deps: ['$ocLazyLoad', 'uiLoad',
                       function( $ocLazyLoad, uiLoad ){
                         return uiLoad.load(
                           [
                             'js/controllers/index.filterCtrl.js',
                             'js/controllers/checkoutCtrl.js'
                             ]
                         )
                     }]
                 }



             })
             .state('app.home.tiles', {
                url: '/tiles',
                templateUrl: 'tpl/tiles.html',
                  resolve: {
                    deps: ['$ocLazyLoad', 'uiLoad',
                      function( $ocLazyLoad, uiLoad ){
                        return uiLoad.load(
                          [
                            'js/controllers/index.filterCtrl.js'



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

              .state('app.home.search', {

                  url: '/search',
                  template: '<div ui-view></div>',

                  resolve: {
                      deps: ['$ocLazyLoad', 'uiLoad',
                        function( $ocLazyLoad, uiLoad ){
                          return uiLoad.load(
                            [

                              'js/controllers/searchPageCtrl.js'  ,
                              'js/controllers/index.filterCtrl.js'


                              ]
                          )
                      }]
                  }

              })

              .state('app.home.search.type', {
                  url: '/:routeId/:query?pageNo&priceRange&brand_name&usages&applications&colors&finish_types&materials&looks&shapes&sortBy',
                  templateUrl : 'tpl/searchwithfilters.html',
                  reloadOnSearch:false,

                  resolve: {

                      deps: ['$ocLazyLoad', 'uiLoad',
                        function( $ocLazyLoad, uiLoad ){
                          return uiLoad.load(
                            [
                            'js/controllers/index.filterCtrl.js'
                             ,'js/controllers/searchPageCtrl.js'
                              ]
                          )
                      }]
                  }
              })

      }
    ]
  );
