(function(){
  angular.module('GameChamp')
  .controller('GameController', GameController);

  GameController.$inject = ['$http', '$state'];

  function GameController($http, $state) {

  }

})()

console.log('gameController is connected');
