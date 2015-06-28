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
                var routesPermission = ['/signup'];
                $rootScope.isLoggedIn = false;
                $rootScope.processGoingOn = false;

                $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
                    // check if the user is logged in or not and the root scope variable according to that
                    $state.current = toState;
                    console.log($state.current);
                    var connected = LoginService.isLoggedIn();
                    connected.then(function(msg) {

                        // console.log('s '+ msg.data);
                        if (msg.data) {
                            //  user is logged in and it will also handle the page refresh
                            $rootScope.isLoggedIn = true;
                            console.log(msg.data);
                            // $location.path('/home');
                        } else {
                                // console.log(toString($location.path()));
                             if ($location.path().indexOf('access/signup') != 1) {
                                console.log("not logged in");
                               $location.path('/access/signin');
                                
                            }

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
                    .otherwise('/app/seller/details');
                $stateProvider
                    .state('app', {
                        abstract: true,
                        url: '/app',
                        templateUrl: 'tpl/app.html'
                    })
                    // .state('app.dashboard-v1', {
                    //     url: '/dashboard-v1',
                    //     templateUrl: 'tpl/app_dashboard_v1.html',
                    //     resolve: {
                    //         deps: ['$ocLazyLoad',
                    //             function($ocLazyLoad) {
                    //                 return $ocLazyLoad.load(['js/controllers/chart.js']);
                    //             }
                    //         ]
                    //     }
                    // })

                .state('app.seller', {
                        url: '/seller',
                        template: '<div ui-view class="fade-in-up"></div>'
                    })
                    .state('app.seller.details', {
                        url: '/details',
                        templateUrl: 'tpl/seller_profile.html',
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load('js/controllers/seller.js');
                                }
                            ]
                        }
                    })


                // table

                .state('app.all', {
                    url: '/all',
                    template: '<div ui-view></div>'
                })

                // .state('app.all.houses', {
                //         url: '/allproducts',
                //         templateUrl: 'tpl/all_products.html',
                //         resolve: {
                //             deps: ['$ocLazyLoad',
                //                 function($ocLazyLoad) {
                //                     return $ocLazyLoad.load(['js/controllers/all_products.js']);
                //                 }
                //             ]
                //         }
                //     })
                
 
                .state('app.all.choosedproducts', {
                        url: '/choosedproducts',
                        templateUrl: 'tpl/selected_products.html',
                        
                        resolve: {
                            deps: ['$ocLazyLoad', 'uiLoad',
                                function($ocLazyLoad, uiLoad) {
                                    return $ocLazyLoad.load('toaster').then(
                                        function() {
                                            return uiLoad.load(
                                                ['http://www.appelsiini.net/projects/lazyload/jquery.lazyload.js?v=1.9.1',
                                                'js/controllers/selected_products.js'])
                                        }
                                    );
                                }
                            ]
                        }
                    })
                .state('app.all.products', {
                        url: '/selectproducts',
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

                    .state('app.update', {
                        url: '/update',
                        template: '<div ui-view class="fade-in"></div>',

                    })
                    .state('app.update.tenants', {
                        url: '/sellers',
                        templateUrl: 'tpl/update_sellers.html',
                        resolve: {
                            deps: ['$ocLazyLoad', 'uiLoad',
                                function($ocLazyLoad, uiLoad) {
                                    return $ocLazyLoad.load('toaster').then(
                                        function() {
                                            return uiLoad.load(
                                                'js/controllers/updateseller.js')
                                        }
                                    );
                                }
                            ]
                        }
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
                    // .state('app.house.detail', {
                    //     url: '/details/:house_id',
                    //     templateUrl: 'tpl/page_profile.html',
                    //     resolve: {
                    //         deps: ['$ocLazyLoad',
                    //             function($ocLazyLoad) {
                    //                 return $ocLazyLoad.load('toaster').then(
                    //                     function() {
                    //                         return $ocLazyLoad.load('js/controllers/houses.js');
                    //                     }
                    //                 );
                    //             }
                    //         ]
                    //     }
                    // })
                    
                    .state('access', {
                        url: '/access',
                        template: '<div ui-view class="fade-in-right-big smooth"></div>'
                    })
                    .state('access.signin', {
                        url: '/signin',
                        templateUrl: 'tpl/admin_signin.html',
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