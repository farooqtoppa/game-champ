(function(){
  angular.module('GameChamp')
  .controller('GameController', GameController);

  GameController.$inject = ['$http', '$state', '$cart', '$scope'];

  function GameController($http, $state, $cart, $scope) {

    this.all = [];

    // refers back to controller
    var self = this;

    //save user data on log in
    $scope.$on('UserLoggedIn', function(eventObj, data){
      self.user = data;
    });

    //make sure to empty cart when user logs out
    $scope.$on('UserLoggedOut', function(eventObj){
      self.cart = [];
      self.user = null;
    });

    // boolean for empty cart
    this.cartHasItems = false;
    this.cartTotal = 0;
    this.existingOrders = false;

    // Initialize search value to '' to return all products in database
    this.searchStr = '';

    // used for reseting quantity in dropdown menu of product page
    this.quantityAtShopIndex = {};

    // used for reseting quantity in dropdown menu of cart page
    this.quantityAtCartIndex = {};
    this.cart = [];

    //=================================
    // ALL PRODUCTS FROM DB
    // ================================
    this.getProducts = function(searchStr,categoryOrName) {
      $http.get('/api/products/')
      .catch(function(error){
        console.log(error);
      })
      .then(function(response){
        if (categoryOrName === 'name') {
          self.all = response.data.products.filter(
            function(el)  {
            return el.name.toLowerCase().indexOf(self.searchStr.toLowerCase()) !== -1;
            // return this product if the name contains the search string
          });
        }
        if (categoryOrName === 'category') {
          self.all = response.data.products.filter(
            function(el)  {
            return el.category.toLowerCase().indexOf(searchStr.toLowerCase()) !== -1;
            // return this product if the name contains the search string
          });
        }
      })
      .catch(function(error){
        console.log(error);
      });
    }

  } // ends GameController

})()

console.log('GameController is connected');
