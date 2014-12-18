var controllers = angular.module('controllers', ['services']);

controllers.controller('DockerController', ['$scope', 'DockerService', function ($scope, DockerService) {
    $scope.daemon = {};
    $scope.daemon.host = '127.0.0.1';
    $scope.daemon.port = '4243';

    $scope.connectDaemon = function (host, port) {
        $scope.daemon.host = host;
        $scope.daemon.port = port;
    };

    $scope.refreshInfo = function (successCallback, errorCallback) {
        console.log("- controller.DockerController.refreshInfo()");
        DockerService.callGithub(
            function (data) {
                console.log("controller.DockerController.refreshInfo().callGitHub.successCallback");
                $scope.daemon.info = data;
                if (successCallback) {
                    successCallback();
                }
            }, function (data) {
                console.log("controller.DockerController.refreshInfo().callGitHub.errorCallback");
                if (errorCallback) {
                    errorCallback();
                }
            }
        );

    };

}]);
