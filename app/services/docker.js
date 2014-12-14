var services = angular.module('services', []);

services.service('DockerService', function ($http) {
    return {
        getInfo: function () {
            return {
                "Containers": 11,
                "Images": 16,
                "Driver": "btrfs",
                "ExecutionDriver": "native-0.1",
                "KernelVersion": "3.12.0-1-amd64",
                "Debug": false,
                "NFd": 11,
                "NGoroutines": 21,
                "NEventsListener": 0,
                "InitPath": "/usr/bin/docker",
                "IndexServerAddress": ["https://index.docker.io/v1/"],
                "MemoryLimit": true,
                "SwapLimit": false,
                "IPv4Forwarding": true
            }
        },
        getVersion: function () {
            return {
                "ApiVersion": "1.12",
                "Version": "0.2.2",
                "GitCommit": "5a2a5cc+CHANGES",
                "GoVersion": "go1.0.3"
            }
        },
        callGithub: function() {
            return $http.get('https://api.github.com/users/fsamin');
        }
    };
});