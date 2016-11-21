(function(){
  angular.module('GameChamp', ['ui.router', 'ngFlash'])
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
    })
    .state('login',{
      url: '/login',
      templateUrl: '../partials/login.html'
    })
    .state('testing',{
      url: '/testing',
      templateUrl: '../partials/testing.html'
    });


  } // ends MainRouter

})() // ends IIFEE
console.log('APP.js is connected');
