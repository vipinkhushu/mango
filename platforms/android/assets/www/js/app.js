// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: '/add',
    views: {
      'menuContent': {
        templateUrl: 'templates/add.html'
      }
    }
  })
  .state('app.request', {
    url: '/request',
    views: {
      'menuContent': {
        templateUrl: 'templates/request.html'
      }
    }
  })
    .state('app.volunteer', {
    url: '/volunteer',
    views: {
      'menuContent': {
        templateUrl: 'templates/volunteer.html'
      }
    }
  })
    .state('app.playlists', {
      url: '/home',
      views: {
        'menuContent': {
          templateUrl: 'templates/home.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })

  .state('app.single', {
    url: '/find',
    views: {
      'menuContent': {
        templateUrl: 'templates/find.html',
        controller: 'MapCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
})
.controller('MapCtrl', function($scope,$http, $state, $cordovaGeolocation,$ionicLoading) {
  var options = {timeout: 10000, enableHighAccuracy: true};
  $ionicLoading.show({
    content: 'Loading',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0
  });
  $cordovaGeolocation.getCurrentPosition(options).then(function(position){
 
    var latLng = new google.maps.LatLng(-31.9044, 115.916);
 
    var mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    $http.get('http://192.168.1.168:3000/getToilets/-31.9044/115.916').then(function(result){
      var data=result.data;
      for(var i=0;i<data.length;i++){
        var latLng = new google.maps.LatLng(data[i].location.coordinates[1], data[i].location.coordinates[0]);
        var marker = new google.maps.Marker({
            map: $scope.map,
            position: latLng
        });
      }
      $ionicLoading.hide();
    });
    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
    google.maps.event.addListenerOnce($scope.map, 'idle', function(){
 
      var marker = new google.maps.Marker({
          map: $scope.map,
          animation: google.maps.Animation.DROP,
          position: latLng,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 10
          }
      });    
      var infoWindow = new google.maps.InfoWindow({
            content: "My Location"
        });
       
        google.maps.event.addListener(marker, 'click', function () {
            infoWindow.open($scope.map, marker);
        });

    });
  }, function(error){
    console.log("Could not get location");
  });
});