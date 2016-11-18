(function(){
  angular.module('GameChamp', ['ui.router'])
  .config(MainRouter);

  function MainRouter($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/index');

    $stateProvider
    .state('index', {
      url: '/index',
      params: {
        user: null
      },
    });
  }

})() // ends IIFEE
console.log('app.js');
