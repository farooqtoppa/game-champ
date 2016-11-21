(function(){
  angular.module('GameChamp')
  .controller('AuthController', AuthController);

  AuthController.$inject = ['$http', '$state', '$scope', 'Flash'];

  function AuthController($http, $state, $scope, Flash) {

    this.user = null;

    // refers back to controller
    var self = this;


    // ===================================
    // SIGN UP
    // ===================================
    this.signup = function(userInfo) {
      $http.post('/api/users/signup',
      {
        username: userInfo.username,
        password: userInfo.password
      })
      .catch(function(error){
        console.log(error);
        $state.go('signup', {url: '/signup'});
      })
      .then(function(response){
        console.log('res is', response);
        self.user = response.data.user;
      })
      .catch(function(error){
        console.log(error);
      })
      .then(function(){
          self.signupMsg();
          $state.go('login', {url: '/login'});
      });
      console.log('sign up function called');
    }

    // ===================================
    // LOG IN
    // ===================================
    this.login = function(userInfo) {
      $http.post('/api/users/login',
      {
        username: userInfo.username,
        password: userInfo.password
      })
      .catch(function(error){
        console.log(error);
      })
      .then(function(response){
        //if(response.data == "Unauthorized") {
         // self.signupMsg();
        //}
        //else{
          console.log(response);
          self.loginMsg();
          self.user = response.data.user;
          $state.go('testing', {url: '/testing', user: response.data.user});
        //}
      })
    }

    // ================================
    // LOGOUT
    // ================================
    this.logout = function() {
      $http.delete('/api/users/logout')
      .then(function(response){
        console.log(response);
      })
      .then(function(){
        self.logoutMsg();
        console.log('logged out');
        self.user = null;
        $state.go('testing', {url: '/index'});
      })
      .catch(function(error){
        console.log(error);
      });
    }

    // =====================================
    // FLASH MESSAGES
    // =====================================
    this.signupMsg = function() {
      var msg = 'You have successfully signed up. Please enter username and password';
      Flash.create('signup', msg);
    }

    this.loginMsg = function() {
      var msg = 'You have logged in successfully';
      console.log(msg);
      Flash.create('login', msg);
    }

    this.errMsg = function() {
      var msg = 'Username and password dont match. Please try again.'
      Flash.create('err', msg);
    }

    this.logoutMsg = function() {
      var msg = 'You have logged out.'
      Flash.create('logout', msg);
    }



  } // ends AuthController





})(); // ends IIFEE

console.log('authController.js')
