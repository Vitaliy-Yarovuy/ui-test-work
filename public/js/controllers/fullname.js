app.controller('FullnameCtrl',function($rootScope, $scope ) {
  $scope.validate = function(){
    $("[ui-view] input").removeClass("ng-untouched").addClass("ng-touched");
    return !$scope.form.$invalid;
  };
});