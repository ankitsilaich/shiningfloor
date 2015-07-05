'use strict';

/* Controllers */

angular.module('app')

  .controller('AppCtrl', ['$scope', '$rootScope', '$translate', 'ngCart', '$localStorage', '$window', 
    function(              $scope, $rootScope,  $translate, ngCart,  $localStorage,   $window ) {
      // add 'ie' classes to html
      var isIE = !!navigator.userAgent.match(/MSIE/i);
      isIE && angular.element($window.document.body).addClass('ie');
      isSmartDevice( $window ) && angular.element($window.document.body).addClass('smart');

      // config
      $scope.app = {
        name: 'Angulr',
        version: '1.3.3',
        // for chart colors
        color: {
          primary: '#7266ba',
          info:    '#23b7e5',
          success: '#27c24c',
          warning: '#fad733',
          danger:  '#f05050',
          light:   '#e8eff0',
          dark:    '#3a3f51',
          black:   '#1c2b36'
        },
        settings: {
          themeID: 1,
          navbarHeaderColor: 'bg-black',
          navbarCollapseColor: 'bg-white-only',
          asideColor: 'bg-black',
          headerFixed: true,
          asideFixed: false,
          asideFolded: false,
          asideDock: false,
          container: false
        }
      }

      // save settings to local storage
      if ( angular.isDefined($localStorage.settings) ) {
        $scope.app.settings = $localStorage.settings;
      } else {
        $localStorage.settings = $scope.app.settings;
      }
      $scope.$watch('app.settings', function(){
        if( $scope.app.settings.asideDock  &&  $scope.app.settings.asideFixed ){
          // aside dock and fixed must set the header fixed.
          $scope.app.settings.headerFixed = true;
        }
        // save to local storage
        $localStorage.settings = $scope.app.settings;
      }, true);

      // angular translate
      $scope.lang = { isopen: false };
      $scope.langs = {en:'English', de_DE:'German', it_IT:'Italian'};
      $scope.selectLang = $scope.langs[$translate.proposedLanguage()] || "English";
      $scope.setLang = function(langKey, $event) {
        // set the current lang
        $scope.selectLang = $scope.langs[langKey];
        // You can change the language during runtime
        $translate.use(langKey);
        $scope.lang.isopen = !$scope.lang.isopen;
      };

      function isSmartDevice( $window )
      {
          // Adapted from http://www.detectmobilebrowsers.com
          var ua = $window['navigator']['userAgent'] || $window['navigator']['vendor'] || $window['opera'];
          // Checks for iOs, Android, Blackberry, Opera Mini, and Windows mobile devices
          return (/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/).test(ua);
      }

      $scope.scrollToProducts = function(){
     
      $('body,html').animate({
        scrollTop: $("#ourProducts").offset().top-65
      }, 1000);
    
    };
   


      $scope.showCounter = function(){
        
      $("#dropdown_cart").toggleClass('hidden dropdown');

    //  console.log( ngCart.getTotalItems() );
      $(".counter").html (ngCart.getTotalItems()) ;

      };

      
     $scope.fetchProductInfo = function(product){
       $scope.selected_product = product; 
       $scope.selected_product_id =                        product.product_id;
       $scope.selected_product_brand =                     product.product_brand;
       $scope.selected_product_name =                      product.product_name;
       $scope.selected_product_type_id =                   product.type_id;
       $scope.selected_product_desc =                      product.product_desc;
       $scope.selected_product_img =                       product.product_img;
       $scope.selected_product_usage =                     product.usages_area;
       $scope.selected_product_design =                    product.designs;
       $scope.selected_product_subtype =                   product.subtypes;
       $scope.selected_product_surface_type =              product.surface_types;
       $scope.selected_product_color =                     product.colors;
       $scope.selected_product_feature =                   product.features;
       $scope.selected_product_price =                     product.product_price;
       $scope.selected_product_rating =                    product.product_rating ;
       $scope.selected_product_supplierID =                product.supplierID ;
       $scope.selected_product_isDiscountAvailable =       product.isDiscountAvailable;
       $scope.selected_product_isProductAvailable =        product.isProductAvailable;        

    };
     // format {total_items: 5 , Items: {{item1_info} , {item2_info}}}
   
    $scope.selectImg = function(img){
        $scope.selected_product_img = img;
 };

   $scope.types=['tiles','wood','marble','stone','wallpaper','artificial']
   // For search page left side navigation 


   
    $scope.scrollToTop = function(){
     
      $('body,html').animate({
        scrollTop: 0
      }, 1500);
    
    };

  }]);
app.directive('ngElevateZoom', function() {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {

      //Will watch for changes on the attribute
      attrs.$observe('zoomImage',function(){
        linkElevateZoom();
      })

      function linkElevateZoom(){
        //Check if its not empty
        if (!attrs.zoomImage) return;
        element.attr('data-zoom-image',attrs.zoomImage);
        $(element).elevateZoom();
      }

      linkElevateZoom();

    }
  };
});
app.directive('zoomContainer', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            scope.$on('$routeChangeSuccess', function() {

                var target = element.children('div.zoomContainer').remove();
            })
        }
    }

});
app.directive(
            "uiIf",
            function() {
                return {
                    transclude: 'element',
                    priority: 1000,
                    terminal: true,
                    restrict: 'A',
                    compile: function (element, attr, linker) {
                        return function (scope, iterStartElement, attr) {
                            iterStartElement[0].doNotMove = true;
                            var expression = attr.uiIf;
                            var lastElement;
                            var lastScope;
                            scope.$watch(expression, function (newValue) {
                                if (lastElement) {
                                    lastElement.remove();
                                    lastElement = null;
                                }
                                if (lastScope) {
                                    lastScope.$destroy();
                                    lastScope = null;
                                }
                                if (newValue) {
                                    lastScope = scope.$new();
                                    linker(lastScope, function (clone) {
                                        lastElement = clone;
                                        iterStartElement.after(clone);
                                    });
                                }
                                iterStartElement.parent().trigger("$childrenChanged");
                            });
                        };
                    }
                };
            }
        );

// app.controller('ScrollCtrl', ['$scope', '$http', '$filter', function($scope, $http, $filter) {
    

 
 
 
//  }]);
