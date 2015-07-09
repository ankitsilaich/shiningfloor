app.controller('SubjectCtrl', ['$scope', '$http', '$filter', 'Subject', function($scope, $http, $filter, Subject) {

  $http.get('api/index.php/subject').then(function (resp) {
    $scope.items = resp.data.subject;

    $scope.item = $filter('orderBy')($scope.items, 'name')[0];
    $scope.item.selected = true;
  });

  
  
 
  

 

  $scope.selectItem = function(item){   
  
    angular.forEach($scope.items, function(item) {
      item.selected = false;
      item.editing = false;
    });
    $scope.item = item;
    $scope.item.selected = true;
  };

  $scope.deleteItem = function(item){
    $scope.items.splice($scope.items.indexOf(item), 1);
    $scope.item = $filter('orderBy')($scope.items, 'Subject_id')[0];
    if($scope.item) $scope.item.selected = true;
  };

  $scope.createItem = function(){
    var item = {
      name: '',
      class_id:''
    };
    $scope.items.push(item);
    $scope.selectItem(item);
    $scope.item.editing = true;
  };

  $scope.editItem = function(item){
    if(item && item.selected){
      item.editing = true;
    }
  };

  $scope.doneEditing = function(item){
    item.editing = false;
    var data = {
     name : item.name,
     subject_id : item.subject_id

    };
    if(item.subject_id == null){
 $http.post("api/index.php/subject", data).success(function(data, status) {
            $scope.hello = data;
        });

    }else{
       Subject.update({subject_id:data.subject_id},data);
      

    }
    
    

  };

}]);