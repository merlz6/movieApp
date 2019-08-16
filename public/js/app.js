const app = angular.module('MovieApp', []);

app.controller('MainController', ['$http', function($http){
  const controller = this;
  this.indexOfEdit = null;

//still need to add CRUD for addable movies


this.searchForMovie = function(){
  $http({

  }).then(function(response){
      console.log(response);
  }, function(error){
    console.log(error);
  })
}



// Create user
this.createUser = function(){
  $http({
    method: 'POST',
    url: '/users',
    data: {
      username: this.username,
      password: this.password
    }
  }).then(function(response){
    console.log(response);
    controller.username = null;
    controller.password = null;
  }, function(error){
    console.log(error);
  })
}



// Login Function
  this.logIn = function(){
    $http({
      method: 'POST',
      url: '/sessions',
      data: {
        username: this.username,
        password: this.password
      }
    }).then(function(response){
      console.log(response);
      controller.username = null;
      controller.password = null;
      controller.loggedInUsername = response.data.userData.username
      // controller.getMovie when created
    }, function(error){
      console.log(error);
    })
  }

  // Logout Function
  this.logOut = function(){
    $http({
      method: 'DELETE',
      url: '/sessions',
      data: {
        username: this.username,
        password: this.password
      }
    }).then(function(response){
      console.log(response);
      controller.loggedInUsername = undefined;
    }, function(error){
      console.log(error);
    })
  }



  }])
