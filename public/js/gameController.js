(function(){
  angular.module('GameChamp')
  .controller('GameController', GameController);

  GameController.$inject = ['$http', '$state'];

  function GameController($http, $state) {
    var self = this;

    //=================================
    // ALL PRODUCTS FROM DB
    // ================================
    this.getAllProducts = function() {
      $http.get('/api/products')
      .catch(function(error){
        console.log(error);
      })
      .then(function(response){
        console.log('These are all of the products ',response.data.products);
      })
      .catch(function(error){
        console.log(error);
      });
    }
  }

})()

console.log('GameController is connected');
