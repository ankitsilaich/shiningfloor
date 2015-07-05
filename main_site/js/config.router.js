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
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    console.log(event);
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

                              'js/others/jquery.elevatezoom.js',



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
              .state('app.home.checkout', {
                 url: '/checkout',
                 templateUrl: 'tpl/checkout.html',
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
                              'js/controllers/index.filterCtrl.js'    ,
                              'js/others/search.js'

                              ]
                          )
                      }]
                  }

              })

              .state('app.home.search.type', {
                  url: '/:routeId/:query',
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
