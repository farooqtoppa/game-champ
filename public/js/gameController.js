(function(){
  angular.module('GameChamp')
  .controller('GameController', GameController);

  GameController.$inject = ['$http', '$state', '$cart', '$scope', 'Flash'];

  function GameController($http, $state, $cart, $scope, Flash) {

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

    // =================================
    // CART TOTAL
    // =================================
    this.getCartTotal = function() {
      var sum = 0;
        this.cart.forEach(function(el){
        sum += el.product.price * el.quantity;
      });
      return sum;
    }

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
    } // ends getProducts

    this.addToCart = function(id, quantity, index){
      if (!quantity) {
        self.quantityMsg();
        $state.go('home', {url: '/home'})
        .catch(function(error){
          console.log(error);
        });
      } else {
        this.cartHasItems = true;
        var indexOfProductInCart = -1;
        if (self.cart.length > 0) { // if cart is not empty, check to see if product is already in cart
          indexOfProductInCart = self.cart.findIndex(function(el,i) {
            return el.product._id === id;
          });
        }
        if (indexOfProductInCart === -1) {
          $http.get(`/api/products/${id}`)
          .catch(function(error){
            console.log(error);
          })
          .then(function(response){
            self.cart.push({product: response.data, quantity: Number(quantity)})
            $state.go('cart', {url: '/cart'});
            self.addToCartMsg();
            console.log(self.cart);
          });
        } else {
          self.cart[indexOfProductInCart].quantity += Number(quantity);
        }
        self.quantityAtShopIndex[index] = 0;
      }
    } // ends addToCart

    this.updateCart = function(newQuantity,index) {
      self.cart[index].quantity = newQuantity;
      self.quantityAtCartIndex[index] = 0;
      self.updateCartMsg();
    } // ends updateCart

    this.deleteFromCart = function(index){
      self.cart.splice(index,1);
      self.deleteFromMsg();
    } // ends deleteFromCart

    this.placeOrder = function(order,user){
      this.existingOrders = true;
      $http.post(`/api/orders`, {order: order, user: user})
      .then(function(response){
        self.cart = [];
        self.getOrders();
        self.placeOrderMsg();
        $state.go('orders', {url: '/orders'});
      });
    } // ends deleteFromCart

    this.getOrders = function() {
      $http.get(`/api/orders/${self.user._id}`,{
        user: self.user
      })
      .catch(function(error){
        console.log(error);
      })
      .then(function(response){
        return self.orders = response.data;
      })
      .then(function(orders){
        $state.go('orders',{url: '/orders'});
      });
    } // ends getOrders
    this.getProducts('','name');

    // ==============================
    //FLASH MSG
    // ==============================
    this.addToCartMsg = function() {
      var msg = 'Item added to your cart';
      Flash.create('addToCart', msg);
    }

    this.quantityMsg = function() {
      var msg = 'Please select quantity in order to add item.'
      Flash.create('quantity', msg);
    }

    this.updateCartMsg = function() {
      var msg = 'Cart has been updated.'
      Flash.create('cartupd', msg);
    }

    this.deleteFromMsg = function() {
      var msg = 'Item has been deleted from your cart'
      Flash.create('deleteFrom', msg);
    }

    this.placeOrderMsg = function() {
      var msg = 'Order has been placed'
      Flash.create('place', msg);
    }

  } // ends GameController

})() // ends IIFEE

console.log('GameController is connected');
