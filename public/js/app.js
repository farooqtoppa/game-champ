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
    })
    .state('signup',{
      url: '/signup',
      templateUrl: '../partials/signup.html',
    });


  } // ends MainRouter

})() // ends IIFEE
console.log('APP.js is connected');
