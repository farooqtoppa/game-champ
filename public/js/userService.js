(function(){

  angular.module('GameChamp')
  .factory('$user', UserService);

  UserService.$inject = ['$http','$rootScope'];

  function UserService($http, $rootScope) {
    var user = {};
    user.getUser = function() {
      $http.get('/api/users/get-user')
      .then(function(response) {
        if (response.data.user) {
          $rootScope.loggedIn = true;
          user = response.data.user;
        } else {
          $rootScope.loggedIn = false;
        }
      })
      .catch(function(error){
        console.log(error);
      })
    }
    user.getOrders = function() {
      $http.get('/api/orders')
    }

    return user;

  }

})()
console.log('UserService.js');
