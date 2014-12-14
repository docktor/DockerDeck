var controllers = angular.module('controllers', ['services']);

controllers.controller('DockerController', ['$scope', 'DockerService', function ($scope, DockerService) {
    $scope.daemon = {};
    $scope.daemon.host = '127.0.0.1';
    $scope.daemon.port = '4243';

    $scope.connectDaemon = function (host, port) {
        $scope.daemon.host = host;
        $scope.daemon.port = port;
    }

    $scope.refreshInfo = function (callback) {
        DockerService.callGithub().success(function(data, status, headers, config) {
            $scope.daemon.info = data;
            callback();
        });
    };

}]);
