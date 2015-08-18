app.controller('sellerCtrl', ['$scope', '$http','$modal','$stateParams','$log','$filter','$state','FileUploader','$timeout','$rootScope' ,'$window',function($scope, $http, $modal, $stateParams,$log,$filter,$state,FileUploader,$timeout,$rootScope,$window) {
    $http.get('../api/slim.php/shiningfloor/seller/info').then(function (resp) {
                                     $scope.seller = resp.data.seller_data;
                                      // console.log(resp.data);
                                      if($scope.seller.img=='') 
                                        $scope.seller.img = 'img/a0.jpg';   
                                    // $scope.sellerImage = $scope.seller.img;
               $scope.seller.img = $scope.seller.img+ '?_ts=' + new Date().getTime(); 

      });
    // $scope.getImage = function () {
    //     $http.get($scope.seller.img, {
    //         cache: false
    //     }).success(function (data, status, headers, config) {
    //         console.log($scope.seller.img );
    //         $scope.seller.img = $scope.sellerImage + '?_ts='  + new Date().getTime();
    //         console.log($scope.seller.img );
    //     });
    // };

   

    $scope.myImage='';
    $scope.myCroppedImage='';
    $scope.cropType="circle";

    var handleFileSelect=function(evt) {
      var file=evt.currentTarget.files[0];
      var reader = new FileReader();
      reader.onload = function (evt) {
        $scope.$apply(function($scope){
          $scope.myImage=evt.target.result;
        });
     


      };
      reader.readAsDataURL(file);
    };
    angular.element(document.querySelector('#fileInput')).on('change',handleFileSelect);

 
$scope.uploadProfilePhoto = function(){
   
    var dataURItoBlob = function(dataURI){
      var binary = atob(dataURI.split(',')[1]);
      var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
      var array = [];
      for(i=0;i<binary.length;i++){
        array.push(binary.charCodeAt(i));
      }
      return new Blob([new Uint8Array(array)],{type:'image/jpeg'});
    }
    var blob = dataURItoBlob($scope.myCroppedImage);
    console.log(blob);
    uploader.addToQueue(blob);
  
    // $scope.seller.img = blob;
    
//    $scope.uploadTime = new Date().getTime();
      // $scope.seller.img += '?ts=' + $scope.uploadTime;
    
    $scope.showpopup= false;
    $scope.p= false;
    $scope.myImage='';
    $scope.myCroppedImage='';
    uploader.uploadAll();
    // $scope.getImage();
    // $location.path('/app/seller/details');
      
};
 

var uploader = $scope.uploader = new FileUploader({
      url: '../api/slim.php/seller/uploadprofile'

  });
 
  uploader.filters.push({
      name: 'customFilter',
      fn: function(item /*{File|FileLikeObject}*/, options) {
          return this.queue.length < 5;
      }
  });
   uploader.onAfterAddingFile = function(fileItem) {
      console.info('onAfterAddingFile', fileItem);
      // uploader.uploadAll();
  };
    uploader.onCompleteAll = function() {
      console.info('uploaded succesfully');
      $window.location.reload();
 
   };
  
}]);
 