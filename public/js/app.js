const app = angular.module('MovieApp', []);

app.controller('MainController', ['$http', function($http){
  const controller = this;
  this.indexOfEdit = null;
  this.showMovieCard = false;
  this.foundMovie;
  this.showWatchList = false;

this.searchForMovie = function(){
  $http({
    method:'GET',
    url:"http://www.omdbapi.com/?t=" + this.search + "&apikey="
  }).then(function(response){
      console.log(response.data);
      controller.foundMovie = response.data

      controller.showMovieCard = true;
  }, function(error){
    console.log(error);
  })
}

this.getAllMovies = function(){
  $http({
  method:'GET',
  url: '/movie'
}).then(function(response){
  console.log(response.data);
  controller.allMovies = response.data
}, error=>{
        console.log(error);
    })
}

// toggle watchlist
this.toggleWatchList = function(){

  controller.showWatchList = !controller.showWatchList
  this.showMovieCard =  false;
  console.log(this.showMovieCard)
  controller.getAllMovies()
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
      // console.log(response);
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


// CREATE ROUTE
this.saveMovie = function(){
  $http({
    method:'POST',
    url:'/movie',
    data:{
      Title:controller.foundMovie.Title,
    Year:controller.foundMovie.Year,
    Rated:controller.foundMovie.Rated,
    Released:controller.foundMovie.Released,
    RunTime:controller.foundMovie.Runtime,
    Genre:controller.foundMovie.Genre,
    Actors:controller.foundMovie.Actors,
    Poster:controller.foundMovie.Poster,
    Ratings:controller.foundMovie.Ratings,
    Plot:controller.foundMovie.Plot
    }
  }).then(function(response){
    console.log(response)
  }, function(error){
    console.log(error)
  })
}

this.deleteMovie = function(movie){
  $http({
    method:'DELETE',
    url:'/movie/'+ movie._id
  }).then(function(response){
    console.log('deleted')
    // controller.getMovies();
  })
}




this.getAllMovies()

  }])
