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

                        if (msg.data) {
                            //  user is logged in and it will also handle the page refresh
                            $rootScope.isLoggedIn = true;
                            console.log(msg.data);
                            // $location.path('/home');
                        } else {
                               $location.path('/access/signin');
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
                    .otherwise('/app/admin/all/allproducts');
                $stateProvider
                    .state('app', {
                        abstract: true,
                        url: '/app',
                        templateUrl: 'tpl/app.html'

                    })
                     

                .state('app.seller', {
                        url: '/seller',
                        template: '<div ui-view class="fade-in-up"></div>'
                    })
                    .state('app.seller.details', {
                        url: '/details/:seller_id',
                        templateUrl: 'tpl/seller_profile.html',
                        resolve: {
                            deps: ['$ocLazyLoad', 'uiLoad',
                                function($ocLazyLoad, uiLoad) {
                                    return $ocLazyLoad.load('toaster').then(
                                        function() {
                                            return uiLoad.load(
                                                ['http://www.appelsiini.net/projects/lazyload/jquery.lazyload.js?v=1.9.1',
                                                'js/controllers/seller.js'])
                                        }
                                    );
                                }
                            ]
                        }
                    })

                // table

                .state('app.all', {
                    url: '/admin/all',
                    template: '<div ui-view></div>'
                })

                .state('app.all.products', {
                        url: '/allproducts',
                        templateUrl: 'tpl/all_products.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load(['js/controllers/all_products.js']);
                                }
                            ]
                        }
                    })
                .state('app.all.sellers_products', {
                        url: '/sellersproducts',
                        templateUrl: 'tpl/sellers_products.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load(['js/controllers/sellers_products.js']);
                                }
                            ]
                        }
                    })
                .state('app.all.new_products', {
                        url: '/newproducts',
                        templateUrl: 'tpl/new_sellerProducts.html',                         
                        resolve: {
                            deps: ['$ocLazyLoad', 'uiLoad',
                                function($ocLazyLoad, uiLoad) {
                                    return $ocLazyLoad.load('toaster').then(
                                        function() {
                                            return uiLoad.load(
                                                'js/controllers/new_sellerProducts.js')
                                        }
                                    );
                                }
                            ]
                        }

                    })
                .state('app.all.edited_products', {
                        url: '/editedproducts',
                        templateUrl: 'tpl/edited_sellerProducts.html',
                        resolve: {
                            deps: ['$ocLazyLoad', 'uiLoad',
                                function($ocLazyLoad, uiLoad) {
                                    return $ocLazyLoad.load('toaster').then(
                                        function() {
                                            return uiLoad.load(
                                                'js/controllers/edited_sellerProducts.js')
                                        }
                                    );
                                }
                            ]
                        }
                    })
                .state('app.all.add_product', {
                        url: '/addproduct',
                        templateUrl: 'tpl/add_product.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load(['js/controllers/add_product.js']);
                                }
                            ]
                        }
                    })
                .state('app.all.edit_product', {
                        url: '/editproduct(/:id)',
                        templateUrl: 'tpl/edit_product.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load(['js/controllers/edit_product.js']);
                                }
                            ]
                        }
                    })
                .state('app.all.selectedproducts', {
                        url: '/selectedproducts/:seller_id',
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
                .state('app.all.chooseproducts', {
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
                .state('app.all.reviewnewproduct', {
                            url: '/review/new/:productId',
                            templateUrl: 'tpl/reviewNewProduct.html',
                             
                            resolve: {
                                deps: ['$ocLazyLoad', 'uiLoad',
                                    function($ocLazyLoad, uiLoad) {
                                        return $ocLazyLoad.load(['angularFileUpload','toaster']).then(
                                            function() {
                                                return uiLoad.load(
                                                    [ 
                                                    'vendor/modules/angular-file-upload/angular-file-upload.min.js',
                                                    'js/controllers/reviewNewProduct.js'])
                                            }
                                        );
                                    }
                                ]
                            }

                        })
                    .state('app.all.revieweditedproduct', {
                            url: '/review/edit/:productId',
                            templateUrl: 'tpl/reviewEditedProduct.html',
                             
                            resolve: {
                                deps: ['$ocLazyLoad', 'uiLoad',
                                    function($ocLazyLoad, uiLoad) {
                                        return $ocLazyLoad.load(['angularFileUpload','toaster']).then(
                                            function() {
                                                return uiLoad.load(
                                                    [ 
                                                    'vendor/modules/angular-file-upload/angular-file-upload.min.js',
                                                    'js/controllers/reviewEditedProduct.js'])
                                            }
                                        );
                                    }
                                ]
                            }

                        })
                    .state('app.all.sellers', {
                        url: '/sellers',
                        templateUrl: 'tpl/all_sellers.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load(['js/controllers/all_sellers.js']);
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
                                                'js/controllers/add_seller.js')
                                        }
                                    );
                                }
                            ]
                        }

                    })
                 .state('app.add.sellers', {
                        url: '/sellers',
                        templateUrl: 'tpl/add_seller.html'
                    })
                 .state('app.add.houses', {
                        url: '/houses',
                        templateUrl: 'tpl/add_houses.html'
                    })

                    .state('app.update', {
                        url: '/update',
                        template: '<div ui-view class="fade-in"></div>',



                    })
                    .state('app.update.tenants', {
                        url: '/sellers/:seller_id',
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
                   
                    .state('access.404', {
                        url: '/404',
                        templateUrl: 'tpl/page_404.html'
                    })
 

            }
        ]
    );
