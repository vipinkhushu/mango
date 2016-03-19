angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})

.controller('VolunteerCtrl', function($scope, $state,$http, $ionicLoading) {

  
  $scope.data = {};

 
  $scope.volunteerLogin = function() {
    console.log('Doing login', $scope.data);
    var email = $scope.data.email;
    var password = $scope.data.password;
     var address = $scope.data.address;
    console.log('Doing volunteer', $scope.data);
       $ionicLoading.show({ template: 'you can now surveillance loos', noBackdrop: true, duration: 2000 });
    $http({
        method : "post",
        url : "getToiletForVolunteer",
        data: { 'email': email , 'password':password ,'address':address }
    }).then(function mySucces(response) {
        console.log(" volunteer success");
         $ionicLoading.show({ template: 'you can now surveillance loos', noBackdrop: true, duration: 2000 });
    }, function myError(response) {
        console.log(" error in requesting as volunteer");
       // $ionicLoading.show({ template: 'you can now surveillance loos', noBackdrop: true, duration: 2000 });
    });

    $state.go('app.issues');

   
   
  };
})

.controller('RequestCtrl', function($scope, $state,$http, $ionicLoading) {

  $scope.data = {};
 
  $scope.request = function() {

    console.log('Doing requesting', $scope.data);
    var email = $scope.data.email;


   
     var address = $scope.data.address;

     $ionicLoading.show({ template: 'request  added', noBackdrop: true, duration: 2000 });

    

    $http({
        method : "post",
        url : "requestToilet",
        data: { 'email': email ,'address':address }
    }).then(function mySucces(response) {
        console.log(" requesting success");
        $ionicLoading.show({ template: 'request  added', noBackdrop: true, duration: 2000 });
    }, function myError(response) {
        console.log(" error in requesting as volunteer");
       // $ionicLoading.show({ template: 'request  added', noBackdrop: true, duration: 2000 });
    });

   // $state.go('app.issues');
     
   $state.go('app.playlists');

   
  };
})
.controller('IssuesCtrl', function($scope) {
  
  $scope.issues = [
    { title: 'toilet is not clean  , taps are also not working ', id: 1 },
    { title: 'there is no wash basin the washroom', id: 2 },
    { title: 'washroom is very dirty and very unhygiene', id: 3 },
    { title: 'washrooms are not cleaned on the daily ', id: 4 }
    
  ];




})

.controller('AddCtrl', function($scope,$state,$http, $ionicLoading) {
  
  $scope.loginData = {};

  $scope.addLogin = function() {
     var email = $scope.loginData.email;
     var address = $scope.loginData.address;

  $ionicLoading.show({ template: 'added in the database', noBackdrop: true, duration: 2000 });

   $http({
        method : "post",
        url : "addToilet",
        data: { 'email': email , 'address':address }
    }).then(function mySucces(response) {
        console.log(" toilet  will be added in the db after checking");
        $ionicLoading.show({ template: 'added in the database', noBackdrop: true, duration: 2000 });
    }, function myError(response) {
        console.log(" error in adding  toilets in adding toilets");
        $ionicLoading.show({ template: 'added in the database', noBackdrop: true, duration: 2000 });
    });
  
  
      $state.go('app.playlists');
   
  };
  
})
.controller('All_issuesCtrl', function($scope,$http,$ionicLoading) {
  var add='123 Beechboro Rd S, Bayswater WA 6053, Australia';
  console.log("checking");
  $scope.issues = [
    { title: ' 123 Beechboro Rd S, Bayswater WA 6053, Australia', id: 1 },
    { title: ' 246 Beechboro Rd S, Bayswater WA 6053, Australia', id: 2 },
    { title: ' Bayswater WA 6053, Australia', id: 3 },
    { title: '  street Bayswater WA 6053, Australia ', id: 4 }
    
  ];
  $ionicLoading.show({ template: 'List of nearby toilet', noBackdrop: true, duration: 2000 });
  $http({
        method : "get",
        url : "getToiletForVolunteer/"+ add,
        
    }).then(function mySucces(response) {
        console.log(" requesting success" , response);
        $ionicLoading.show({ template: 'request  added', noBackdrop: true, duration: 2000 });
    }, function myError(response) {
        console.log(" error in requesting as volunteer");
       // $ionicLoading.show({ template: 'request  added', noBackdrop: true, duration: 2000 });
    });

      

});



