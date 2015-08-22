'use strict';

/* Controllers */

angular.module('app')
  .controller('AppCtrl', ['$scope', '$translate', '$localStorage', '$window','$http','$state','$rootScope',
    function(              $scope,   $translate,   $localStorage,   $window, $http ,$state,$rootScope ) {
      // add 'ie' classes to html
      var isIE = !!navigator.userAgent.match(/MSIE/i);
      isIE && angular.element($window.document.body).addClass('ie');
      isSmartDevice( $window ) && angular.element($window.document.body).addClass('smart');

      // config
      $scope.app = {
        name: 'BuildCorner',
        version: '1.0.0',
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
      };

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
      $scope.langs = {en:'English', de_DE:'German', it_IT:'Italian',hi_HI:'Hindi'};
      $scope.selectLang = $scope.langs[$translate.proposedLanguage()] || "English";

     $http.get('../api/slim.php/auth/process/seller').then(function(resp) {
        $scope.user = resp.data;
       // console.log(resp);
      });
// Info needed in whole app
      // $http.get('../api/slim.php/shiningfloor/seller/info').then(function (resp) {
      //    $scope.seller = resp.data.seller_data;
      //     console.log(resp.data);
      //     if($scope.seller.img=='')
      //     $scope.seller.img = 'img/a0.jpg';
      // });

      $scope.logout = function(){

      $http.get('../api/slim.php/auth/logout/seller').
        success(function() {

            $rootScope.isLoggedIn = false;

           $state.go('access.signin');
        });

      };

      $scope.getNewTimeStamp = function(){
        return new Date().getTime();
      };
      $scope.setLang = function(langKey) {
        // set the current lang
        $scope.selectLang = $scope.langs[langKey];
        // You can change the language during runtime
        $translate.use(langKey);
        $scope.lang.isopen = !$scope.lang.isopen;
      };

      function isSmartDevice( $window )
      {
          // Adapted from http://www.detectmobilebrowsers.com
          var ua = $window.navigator.userAgent || $window.navigator.vendor || $window.opera;
          // Checks for iOs, Android, Blackberry, Opera Mini, and Windows mobile devices
          return (/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/).test(ua);
      }

  }]);
app.filter('adjustDatepicker', ['$filter', function($filter){
    var dateFilter = $filter('date');
    return function(dateToFix){
        var localDate, localTime, localOffset, adjustedDate;

        localDate       = new Date(dateToFix);
        localTime       = localDate.getTime();
        localOffset     = localDate.getTimezoneOffset() * 60000;
        adjustedDate    = new Date(localTime + localOffset);

        return dateFilter(adjustedDate, 'MM/dd/yyyy');
    };
}]);


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

app.directive('ngThumb', ['$window', function($window) {
        var helper = {
            support: !!($window.FileReader && $window.CanvasRenderingContext2D),
            isFile: function(item) {
                return angular.isObject(item) && item instanceof $window.File;
            },
            isImage: function(file) {
                var type =  '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
        };

        return {
            restrict: 'A',
            template: '<canvas/>',
            link: function(scope, element, attributes) {
                if (!helper.support) return;

                var params = scope.$eval(attributes.ngThumb);

                if (!helper.isFile(params.file)) return;
                if (!helper.isImage(params.file)) return;

                var canvas = element.find('canvas');
                var reader = new FileReader();

                reader.onload = onLoadFile;
                reader.readAsDataURL(params.file);

                function onLoadFile(event) {
                    var img = new Image();
                    img.onload = onLoadImage;
                    img.src = event.target.result;
                }

                function onLoadImage() {
                    var width = params.width || this.width / this.height * params.height;
                    var height = params.height || this.height / this.width * params.width;
                    canvas.attr({ width: width, height: height });
                    canvas[0].getContext('2d').drawImage(this, 0, 0, width, height);
                }
            }
        };
    }]);
