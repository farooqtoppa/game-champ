(function(){
  angular.module('GameChamp')
  .controller('AuthController', AuthController);

  AuthController.$inject = ['$http', '$state','$scope', '$user', '$stateParams', 'Flash'];

  function AuthController($http, $state, $scope, $user, $stateParams, Flash) {

    // user
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
        $scope.$emit('UserLoggedIn', self.user);
      })
      .catch(function(error){
        console.log(error);
      })
      .then(function(){
          self.signupMsg();
          $state.go('login', {url: '/login'});
      });
      console.log('sign up function called');
    } // ends signup

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
        self.errMsg();
      })
      .then(function(response){
        //if(response.data == "Unauthorized") {
         // self.signupMsg();
        //}
        //else{

          if (self.user = response.data.user) {
            console.log(response);
            self.loginMsg();
            $scope.$emit('UserLoggedIn', self.user);
            $state.go('home', {url: '/home', user: response.data.user});
          }

        //}
      })
    } // ends login

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
        $scope.$emit('UserLoggedOut');
        console.log('logged out');
        self.user = null;
        $state.go('index', {url: '/index'});
      })
      .catch(function(error){
        console.log(error);
      });
    } // ends logout

    this.changePassword = function(password){
      if(password.password === password.passwordConfirm) {
        $http.patch(`/api/users/${self.user._id}/reset`,
        {
          password: password.password
        })
        .catch(function(error){
          console.log(error);
          $state.go('credentials');
        })
        .then(function(response){
          console.log('password has been changed')
          self.changePasswordMsg();
          $state.go('home');
        });
      }
    } // ends changePassword

    // =====================================
    // FLASH MESSAGES
    // =====================================
    this.signupMsg = function() {
      var msg = 'You have successfully signed up. Please enter username and password';
      Flash.create('signup', msg);
    }

    this.loginMsg = function() {
      var msg = 'You have logged in successfully and can shop now!';
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

    this.changePasswordMsg = function() {
      var msg = 'Password has been changed.'
      Flash.create('pass', msg);
    }



  } // ends AuthController





})(); // ends IIFEE

console.log('authController.js is connected')
