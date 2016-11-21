(function(){

  angular.module('GameChamp')
  .controller('indexController', indexController);

  indexController.$inject = ['$user','$rootScope'];

  function indexController($user,$rootScope) {
    this.setLogIn = function() {

      this.loggedIn = $rootScope.loggedIn;
      console.log(this.loggedIn);
    }

  };

})();
console.log('indexController.js');
