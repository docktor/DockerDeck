describe('Controller : DockerController', function () {
    var $scope;

    // excuted before each "it" is run.
    beforeEach(function () {
        module('controllers');
    });

    beforeEach(inject(function ($rootScope, $controller) {
        $scope = $rootScope.$new();
        $controller('DockerController', {
            $scope: $scope
        });
    }));


    it('should have a daemon host and port', function () {
        expect($scope.daemon.host).toBe("127.0.0.1");
    });

    it('should have a connectDaemon Function', function () {
        expect($scope.connectDaemon).toBeDefined();
        expect(angular.isFunction($scope.connectDaemon)).toBe(true);
    });

    it('should have a refreshInfo Function', function () {
        expect($scope.refreshInfo).toBeDefined();
        expect(angular.isFunction($scope.refreshInfo)).toBe(true);
    });

    it('should not have info set yet', function () {
        expect($scope.daemon.info).toBeUndefined();
    })

    it('should call the refreshInfo function', function () {
        spyOn($scope, 'refreshInfo');
        $scope.refreshInfo();
        expect($scope.refreshInfo).toHaveBeenCalled();
    });
});

describe("Controller: DockerController function ", function () {
    var $scope;

    beforeEach(function () {
        module('controllers');
    });

    beforeEach(inject(function ($rootScope, $controller) {
        $scope = $rootScope.$new();
        $controller('DockerController', {
            $scope: $scope
        });
    }));

    var callRefreshInfo = function (callback) {
        console.log("$scope.refreshInfo(...)");
        $scope.refreshInfo(callback);
    };

    beforeEach(function (done) {
        console.log("callRefresh info");
        console.log(done);
        callRefreshInfo(done);
    });

    it('should set daemon.info when calling refreshInfo async function', function () {
        console.log("will expect something...");
        expect($scope.daemon.info).toBeDefined();
    });
});
