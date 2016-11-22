(function(){
  angular.module('GameChamp', ['ui.router', 'ngFlash'])
  .config(MainRouter);

  function MainRouter($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/home');

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
    .state('home',{
      url: '/home',
      templateUrl: '../partials/home.html'
    })
    .state('cart',{
      url: '/cart',
      templateUrl: '../partials/cart.html'
    });


  } // ends MainRouter

})() // ends IIFEE
console.log('APP.js is connected');
