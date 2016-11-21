(function(){
  angular.module('GameChamp')
  .controller('AuthController', AuthController);

  AuthController.$inject = ['$http', '$state', '$scope', 'Flash'];

  function AuthController($http, $state, $scope, Flash) {

    this.user = null;

    // refers back to controller
    var self = this;

    // =====================================
    // FLASH MESSAGES
    // =====================================
    this.signupSuccess = function() {
      var message = 'You successfully signed up. Please log in!';
      Flash.create('signup', message);
    };
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
          self.signupSuccess();
          $state.go('login', {url: '/login'});
      });
      console.log('sign up function called');
    }



  } // ends AuthController





})(); // ends IIFEE

console.log('authController.js')
