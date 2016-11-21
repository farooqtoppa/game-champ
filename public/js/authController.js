(function(){
  angular.module('GameChamp')
  .controller('AuthController', AuthController);

  AuthController.$inject = ['$http', '$state'];

  function AuthController($http, $state) {

    this.user = null;

    // refers back to controller
    var self = this;

    // ==============================
    // SIGN UP
    // ===============================
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
        // self.signupMsg();
        // $state.go('home', {url: '/home'});
      });
      console.log('sign up function called');
    }
  } // ends AuthController





})(); // ends IIFEE

console.log('authController.js')
