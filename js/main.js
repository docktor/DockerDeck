angular.module('test', ['ngMaterial'])
.controller('DemoController', function($scope) {
    $scope.user = {
       title:     "Technical Program Manager",
       email:     "ipsum@lorem.com",
       firstName: "Naomi",
       lastName:  "" ,
       company:   "Google" ,
       address:   "1600 Amphitheatre Pkwy" ,
       city:      "Mountain View" ,
       state:     "CA" ,
       country:   "USA" ,
       postalCode : "94043"
    };
  });


var dockerDaemonController = function ($scope) {
  
  $scope.init = function(host, port) {
    $scope.daemon.host = host;
    $scope.daemon.port = port;
  };

  $scope.daemon.setInfo = function() {
    $http.get('http://' + host +':' + port + '/info')
      .success(function(data, status, headers, config) {

    }).error(function(data, status, headers, config) {

    });
  }; 

   $scope.daemon.setVersion = function() {
    $http.get('http://' + host +':' + port + '/version')
      .success(function(data, status, headers, config) {

    }).error(function(data, status, headers, config) {

    });
  }; 

}