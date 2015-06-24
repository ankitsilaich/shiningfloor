'use strict';

/**
 * Config for the router
 */
angular.module('app')
    .run(
        ['$rootScope', '$state', '$stateParams', '$location', 'LoginService',
            function($rootScope, $state, $stateParams, $location, LoginService) {
                $rootScope.$state = $state;

                $rootScope.$stateParams = $stateParams;

                $rootScope.isLoggedIn = false;
                $rootScope.processGoingOn = false;

                $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
                    // check if the user is logged in or not and the root scope variable according to that
                    $state.current = toState;
                    console.log($state.current);
                    var connected = LoginService.isLoggedIn();
                    connected.then(function(msg) {


                        if (msg.data) {
                            //  user is logged in and it will also handle the page refresh
                            $rootScope.isLoggedIn = true;
                        } else {

                            // user is not logged in and now check is the user is on login required page or not
                            // if not, redirect him to the login page
                            $location.path('/lockme');
                            // if ((routesPermission.indexOf($state.current.name) != -1)) {
                            //    
                            // }

                        }
                    })

                });
                $rootScope.$on('$stateChangeSuccess', function() {

                });
            }
        ]
    )
    .config(
        ['$stateProvider', '$urlRouterProvider',
            function($stateProvider, $urlRouterProvider) {

                $urlRouterProvider
                    .otherwise('/app/all/allproducts');
                $stateProvider
                    .state('app', {
                        abstract: true,
                        url: '/app',
                        templateUrl: 'tpl/app.html'
                    })
                    .state('app.dashboard-v1', {
                        url: '/dashboard-v1',
                        templateUrl: 'tpl/app_dashboard_v1.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load(['js/controllers/chart.js']);
                                }
                            ]
                        }
                    })

                .state('app.seller', {
                        url: '/seller',
                        template: '<div ui-view class="fade-in-up"></div>'
                    })
                    .state('app.seller.details', {
                        url: '/details/:seller_id',
                        templateUrl: 'tpl/tenant_profile.html',
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load('js/controllers/tenant.js');
                                }
                            ]
                        }
                    })




                // table

                .state('app.all', {
                    url: '/all',
                    template: '<div ui-view></div>'
                })

                .state('app.all.houses', {
                        url: '/allproducts',
                        templateUrl: 'tpl/all_houses.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load(['js/controllers/allhouses.js']);
                                }
                            ]
                        }
                    })
                
              //   .state('app.all.houses.type', {
              //     url: '/:query',
              //     templateUrl: 'tpl/all_houses.html',
              //     reloadOnSearch:false,
                  
              //      resolve: {
              //               deps: ['$ocLazyLoad',
              //                   function($ocLazyLoad) {
              //                       return $ocLazyLoad.load(['js/controllers/allhouses.js']);
              //                   }
              //               ]
              //           }                  
              // })

                .state('app.all.selectedproducts', {
                        url: '/selectedproducts/:seller_id',
                        templateUrl: 'tpl/selected_products.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load(['js/controllers/selected_products.js']);
                                }
                            ]
                        }
                    })
                .state('app.all.products', {
                        url: '/chooseproducts/:seller_id',
                        templateUrl: 'tpl/select_products.html',
                        resolve: {
                            deps: ['$ocLazyLoad', 'uiLoad',
                                function($ocLazyLoad, uiLoad) {
                                    return $ocLazyLoad.load('toaster').then(
                                        function() {
                                            return uiLoad.load(
                                                ['http://www.appelsiini.net/projects/lazyload/jquery.lazyload.js?v=1.9.1',
                                                'js/controllers/selectproducts.js'])
                                        }
                                    );
                                }
                            ]
                        }
                        
                    })

                    .state('app.all.tenants', {
                        url: '/sellers',
                        templateUrl: 'tpl/all_tenants.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load(['js/controllers/alltenants.js']);
                                }
                            ]
                        }
                    })

                .state('app.add', {
                        url: '/add',
                        template: '<div ui-view class="fade-in"></div>',

                        resolve: {
                            deps: ['$ocLazyLoad', 'uiLoad',
                                function($ocLazyLoad, uiLoad) {
                                    return $ocLazyLoad.load('toaster').then(
                                        function() {
                                            return uiLoad.load(
                                                'js/controllers/form.js')
                                        }
                                    );
                                }
                            ]
                        }

                    })
                    .state('app.update', {
                        url: '/update',
                        template: '<div ui-view class="fade-in"></div>',



                    })
                    .state('app.update.tenants', {
                        url: '/sellers/:seller_id',
                        templateUrl: 'tpl/update_tenants.html',
                        resolve: {
                            deps: ['$ocLazyLoad', 'uiLoad',
                                function($ocLazyLoad, uiLoad) {
                                    return $ocLazyLoad.load('toaster').then(
                                        function() {
                                            return uiLoad.load(
                                                'js/controllers/updatetenant.js')
                                        }
                                    );
                                }
                            ]
                        }
                    })
                    .state('app.update.houses', {
                        url: '/houses/:house_id',
                        templateUrl: 'tpl/update_houses.html',
                        resolve: {
                            deps: ['$ocLazyLoad', 'uiLoad',
                                function($ocLazyLoad, uiLoad) {
                                    return $ocLazyLoad.load('toaster').then(
                                        function() {
                                            return uiLoad.load(
                                                'js/controllers/updatehouse.js')
                                        }
                                    );
                                }
                            ]
                        }
                    })
                    .state('app.update.owners', {
                        url: '/owners/:owner_id',
                        templateUrl: 'tpl/update_owners.html',
                        resolve: {
                            deps: ['$ocLazyLoad', 'uiLoad',
                                function($ocLazyLoad, uiLoad) {
                                    return $ocLazyLoad.load('toaster').then(
                                        function() {
                                            return uiLoad.load(
                                                'js/controllers/updateowner.js')
                                        }
                                    );
                                }
                            ]
                        }
                    })
                    .state('app.add.tenants', {
                        url: '/sellers',
                        templateUrl: 'tpl/add_tenants.html'
                    })
                    .state('app.add.houses', {
                        url: '/houses',
                        templateUrl: 'tpl/add_houses.html'
                    })
                    // form
                    .state('app.form', {
                        url: '/form',
                        template: '<div ui-view class="fade-in"></div>',
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load('js/controllers/form.js');
                                }
                            ]
                        }
                    })


                .state('app.house', {
                        url: '/house',
                        template: '<div ui-view class="fade-in-down"></div>'
                    })
                    .state('app.house.detail', {
                        url: '/details/:house_id',
                        templateUrl: 'tpl/page_profile.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load('toaster').then(
                                        function() {
                                            return $ocLazyLoad.load('js/controllers/houses.js');
                                        }
                                    );
                                }
                            ]
                        }
                    })
                    .state('app.deadlines', {
                        url: '/deadlines',
                        template: '<div ui-view></div>'
                    })

                .state('app.deadlines.houses', {
                        url: '/houses',
                        templateUrl: 'tpl/deadline_houses.html',
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load(['js/controllers/table.js']);
                                }
                            ]
                        }
                    })
                 .state('app.verify', {
                        url: '/verify',
                        template: '<div ui-view></div>',
                        resolve: {
                            deps: ['$ocLazyLoad', 'uiLoad',
                                function($ocLazyLoad, uiLoad) {
                                    return $ocLazyLoad.load('toaster').then(
                                        function() {
                                            return uiLoad.load(
                                                'js/controllers/verify.js')
                                        }
                                    );
                                }
                            ]
                        }
                    })

                .state('app.verify.tenants', {
                        url: '/tenants',
                        templateUrl: 'tpl/verify_tenants.html'
                        
                    })
                    .state('app.deadlines.tenants', {
                        url: '/tenants',
                        templateUrl: 'tpl/deadline_tenants.html',
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load(['js/controllers/deadlines.js']);
                                }
                            ]
                        }
                    })



                // others

                .state('lockme', {
                        url: '/lockme',
                        templateUrl: 'tpl/page_lockme.html',
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load(['js/controllers/login.js']);
                                }
                            ]
                        }
                    })
                    .state('access', {
                        url: '/access',
                        template: '<div ui-view class="fade-in-right-big smooth"></div>'
                    })
                    .state('access.signin', {
                        url: '/signin',
                        templateUrl: 'tpl/page_signin.html',
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load(['js/controllers/signin.js']);
                                }
                            ]
                        }
                    })
                    .state('access.signup', {
                        url: '/signup',
                        templateUrl: 'tpl/page_signup.html',
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load(['js/controllers/signup.js']);
                                }
                            ]
                        }
                    })
                    .state('access.forgotpwd', {
                        url: '/forgotpwd',
                        templateUrl: 'tpl/page_forgotpwd.html'
                    })
                    .state('access.404', {
                        url: '/404',
                        templateUrl: 'tpl/page_404.html'
                    })

                // fullCalendar




            }
        ]
    );