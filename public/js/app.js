(function(global,undefined){

  global.app = angular.module("App",["ui.router","ui.select", "ngSanitize"]);

  app.config(function($stateProvider, $urlRouterProvider) {
    //
    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise("/fullname");
    //
    // Now set up the states
    $stateProvider
      .state("fullname", {
        url: "/fullname",
        templateUrl: "pages/fullname.html",
        controller: "FullnameCtrl"
      })
      .state("address", {
        url: "/address",
        templateUrl: "pages/address.html",
        controller: "AddressCtrl"
      })
      .state("note", {
        url: "/note",
        templateUrl: "pages/note.html"
      });
  });

  app.run(function($rootScope, $view, $state, uiSelectConfig, $timeout, $http) {

    uiSelectConfig.theme = 'bootstrap';

    $rootScope.tabs = [
      { state : "fullname", label : "П.І.Б." },
      { state : "address", label : "Адреса" },
      { state : "note", label : "Примітки" }
    ];


    $rootScope.tabClass = function(tab) {
      return $state.current.name == tab.state ? "active" : "";
    };

    $rootScope.user = {
      persona: {
        firstName:"One",
        lastName:"Second",
        middleName: "Middle"
      },
      address:{
        country: null,
        town: null,
        street: null,
        houseNum: null
      },
      notice: ""
    };

    function indicateLoading(){
      $rootScope.isLoadingData = true;
      $timeout(function(){
        $rootScope.isLoadingData = false;
      },300);
    }


    $http.get('/user').success(function(data, status, headers, config) {
      $rootScope.masterUser = data.user;
      $rootScope.user = angular.copy($rootScope.masterUser );
    });


    $rootScope.clearData = function(){
      $rootScope.user = angular.copy($rootScope.masterUser );
      indicateLoading();
    };

    $rootScope.saveData = function(){
      var currScope = $("[ui-view]").scope();
      if( currScope.validate && ! currScope.validate() ){
        alert("заповніть поля");
      } else {
        $http.post('/user',{user:$rootScope.user }).success(function (data, status, headers, config) {

        });
      }
    };

    $rootScope.$on("$stateChangeStart",function(event, toState, toParams, fromState, fromParams){
        var currScope = $("[ui-view]").scope();
        if( currScope.validate && ! currScope.validate() ){
          event.preventDefault();
          alert("заповніть поля");
        } else {
          indicateLoading();
        }
    });




  });


})(window);